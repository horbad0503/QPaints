"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatNaira, asset } from "@/lib/format";
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth";

export default function CartPage() {
  const { refresh } = useSession();
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api<{ items: any[], total: number }>("cart/get");
      setItems(res.items);
      setTotal(res.total);
    } catch (err: any) {
      if (err.status === 401) window.location.href = "/login";
      else toast.error("Failed to load cart");
    } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQuantity = async (cart_id: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      setItems(prev => prev.map(item => item.cart_id === cart_id ? { ...item, quantity: newQty, subtotal: item.price * newQty } : item));
      setTotal(prev => { const item = items.find(i => i.cart_id === cart_id); if (!item) return prev; return prev + (item.price * newQty) - item.subtotal; });
      await api("cart/update", { method: "POST", body: { cart_id, quantity: newQty } });
      refresh(); 
    } catch (err) { toast.error("Failed to update quantity"); fetchCart(); }
  };

  const removeItem = async (cart_id: number) => {
    try {
      setItems(prev => prev.filter(i => i.cart_id !== cart_id));
      await api("cart/remove", { method: "POST", body: { cart_id } });
      toast.success("Item removed"); fetchCart(); refresh(); 
    } catch (err) { toast.error("Failed to remove item"); fetchCart(); }
  };

  if (isLoading) return <div className="container-shop py-20 text-center text-sm font-bold text-gray-500">Loading...</div>;

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-6 md:py-16">
      <div className="container-shop max-w-6xl">
        <div className="mb-6 md:mb-12 flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-bold text-gray-400">
          <span className="text-brand">Cart</span><div className="h-px w-8 md:w-16 bg-gray-300"></div>
          <span>Address</span><div className="h-px w-8 md:w-16 bg-gray-300"></div><span>Payment</span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 md:p-20 text-center shadow-sm border border-gray-100">
            <ShoppingBag size={40} className="mx-auto text-gray-200 mb-4 md:w-16 md:h-16" />
            <h2 className="text-lg md:text-2xl font-nexa font-bold text-black mb-1 md:mb-2">Your cart is empty</h2>
            <p className="text-xs md:text-base text-gray-500 mb-6 md:mb-8">Looks like you haven't added anything yet.</p>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-lg bg-brand-cta px-6 md:px-8 py-2.5 md:py-3 font-nexa text-sm md:text-base font-bold text-black transition hover:bg-brand-cta-hover">
              Continue Shopping <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-5 md:gap-8 items-start">
            <div className="w-full lg:w-[65%] rounded-xl md:rounded-2xl bg-white p-4 md:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:pb-6 mb-4 md:mb-6">
                <h1 className="font-nexa text-lg md:text-2xl font-black text-black flex items-center gap-2"><ShoppingBag size={18} className="md:w-6 md:h-6" /> Shopping Cart</h1>
                <span className="font-bold text-xs md:text-base text-gray-500">{items.length} Items</span>
              </div>
              <div className="space-y-4 md:space-y-6">
                {items.map(item => (
                  <div key={item.cart_id} className="flex flex-row items-center gap-3 md:gap-6 border-b border-gray-100 pb-4 md:pb-6 last:border-0 last:pb-0">
                    <div className="h-16 w-16 md:h-24 md:w-24 shrink-0 rounded-lg md:rounded-xl bg-gray-50 overflow-hidden">
                      <img src={asset(item.image_url)} alt={item.product_name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-nexa text-xs md:text-lg font-bold text-black line-clamp-1">{item.product_name}</h3>
                      <p className="text-[10px] md:text-sm text-gray-500 mt-0.5 md:mt-1">{item.category} â€¢ {item.size}</p>
                      <p className="font-bold text-black text-xs md:text-base mt-1 md:mt-2">{formatNaira(item.price)}</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-6">
                      <div className="flex items-center rounded-md md:rounded-lg border border-gray-200 bg-white scale-90 md:scale-100">
                        <button onClick={() => updateQuantity(item.cart_id, item.quantity - 1)} className="p-1.5 md:p-2 text-gray-500 hover:text-brand"><Minus size={12} className="md:w-4 md:h-4" /></button>
                        <span className="w-6 md:w-8 text-center font-bold text-xs md:text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cart_id, item.quantity + 1)} className="p-1.5 md:p-2 text-gray-500 hover:text-brand"><Plus size={12} className="md:w-4 md:h-4" /></button>
                      </div>
                      <div className="flex flex-col items-end gap-1 md:gap-3 min-w-[70px] md:min-w-[100px]">
                        <p className="font-black text-sm md:text-lg text-black">{formatNaira(item.subtotal)}</p>
                        <button onClick={() => removeItem(item.cart_id)} className="text-gray-400 hover:text-red-500 transition"><Trash2 size={14} className="md:w-[18px] md:h-[18px]" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 md:mt-8">
                <Link href="/products" className="inline-flex items-center gap-1.5 md:gap-2 text-xs md:text-base font-bold text-brand hover:underline"><ArrowRight size={14} className="md:w-[18px] md:h-[18px] rotate-180" /> Continue Shopping</Link>
              </div>
            </div>

            <div className="w-full lg:w-[35%] rounded-xl md:rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden sticky top-24 md:top-28">
              <div className="bg-brand-dark px-4 md:px-6 py-3 md:py-4"><h2 className="font-nexa text-base md:text-lg font-bold text-white">Order Summary</h2></div>
              <div className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4 text-xs md:text-[15px] text-gray-600 border-b border-gray-100 pb-4 md:pb-6">
                  <div className="flex justify-between"><span>Total MRP ({items.length} items)</span><span className="font-bold text-black">{formatNaira(total)}</span></div>
                  <div className="flex justify-between"><span>Discount on MRP</span><span className="text-green-600 font-bold">- â‚¦0.00</span></div>
                  <div className="flex justify-between"><span>Shipping Fee</span><span className="text-green-600 font-bold">Free</span></div>
                </div>
                <div className="mt-4 md:mt-6 flex justify-between text-base md:text-lg font-black text-black"><span>Total Amount</span><span>{formatNaira(total)}</span></div>
                <Link href="/checkout" className="mt-4 md:mt-6 flex w-full items-center justify-center rounded-lg bg-brand-cta py-2.5 md:py-3.5 font-nexa text-sm md:text-base font-bold text-black shadow-sm transition hover:bg-brand-cta-hover">Place Order</Link>
                <div className="mt-4 md:mt-6 flex items-center justify-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-gray-500"><ShieldCheck size={14} className="md:w-4 md:h-4 text-brand" /> Safe and Secure Payments. 100% Authentic products.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}