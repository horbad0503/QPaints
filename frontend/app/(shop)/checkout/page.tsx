"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { formatNaira, asset } from "@/lib/format";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { session, refresh } = useSession();
  const [cart, setCart] = useState<{ items: any[], total: number }>({ items: [], total: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);

  const [form, setForm] = useState({ fullname: "", email: "", phone: "", address: "", city: "", state: "", additional_info: "" });

  useEffect(() => {
    async function loadCart() {
      try { const res = await api<{ items: any[], total: number }>("cart/get"); if (res.items.length === 0) router.push("/cart"); setCart(res); } catch (err) { router.push("/login"); }
    }
    loadCart();
  }, [router]);

  useEffect(() => {
    if (session?.user) setForm(prev => ({ ...prev, fullname: session.user?.fullName || "", email: session.user?.email || "" }));
  }, [session]);

  useEffect(() => {
    if ((window as any).PaystackPop) { setPaystackReady(true); return; }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js"; script.async = true;
    script.onload = () => setPaystackReady(true);
    script.onerror = () => toast.error("Failed to load payment gateway.");
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paystackReady || !(window as any).PaystackPop) return toast.error("Payment gateway is still loading...");
    setIsProcessing(true);

    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_3422ffd27ed24b307a1a878e22302856074802f2',
      email: form.email, amount: cart.total * 100, currency: 'NGN',
      ref: 'PSK_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: { custom_fields: [{ display_name: "Full Name", variable_name: "full_name", value: form.fullname }, { display_name: "Phone", variable_name: "phone", value: form.phone }] },
      callback: function(response: any) {
        api("checkout/verify", { method: "POST", body: { reference: response.reference, shipping: form } })
        .then(() => { refresh(); router.push(`/order_success?ref=${response.reference}`); })
        .catch((err: any) => { toast.error("Verification failed: " + err.message); setIsProcessing(false); });
      },
      onClose: function() { toast.error("Payment window closed."); setIsProcessing(false); }
    });
    handler.openIframe();
  };

  if (cart.items.length === 0) return null;

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-6 md:py-16">
      <div className="container-shop max-w-6xl">
        <div className="flex flex-col lg:flex-row rounded-xl md:rounded-2xl overflow-hidden shadow-xl bg-white min-h-[500px] md:min-h-[600px]">
          
          <div className="w-full lg:w-2/3 p-5 md:p-12">
            <div className="mb-8 flex items-center justify-between text-xs md:text-sm font-bold text-gray-400">
              <div className="flex flex-col gap-1.5 md:gap-2 w-1/3 text-center"><span className="text-black">Shipping</span><div className="h-1 w-full bg-brand rounded-full"></div></div>
              <div className="flex flex-col gap-1.5 md:gap-2 w-1/3 text-center"><span>Payment</span><div className="h-1 w-full bg-gray-200 rounded-full"></div></div>
              <div className="flex flex-col gap-1.5 md:gap-2 w-1/3 text-center"><span>Confirmation</span><div className="h-1 w-full bg-gray-200 rounded-full"></div></div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div><label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-1">Full Name</label><input type="text" name="fullname" required value={form.fullname} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 md:p-3 text-xs md:text-sm focus:border-brand outline-none" placeholder="Scott" /></div>
                <div><label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-1">Email Address</label><input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 md:p-3 text-xs md:text-sm focus:border-brand outline-none" placeholder="scott@example.com" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div><label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-1">Phone Number</label><input type="tel" name="phone" required value={form.phone} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 md:p-3 text-xs md:text-sm focus:border-brand outline-none" placeholder="08012345678" /></div>
                <div><label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-1">Street Address</label><input type="text" name="address" required value={form.address} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 md:p-3 text-xs md:text-sm focus:border-brand outline-none" placeholder="123 Main St" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div><label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-1">City</label><input type="text" name="city" required value={form.city} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 md:p-3 text-xs md:text-sm focus:border-brand outline-none" placeholder="Lagos" /></div>
                <div><label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-1">State</label><input type="text" name="state" required value={form.state} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 md:p-3 text-xs md:text-sm focus:border-brand outline-none" placeholder="Lagos State" /></div>
              </div>
              <div><label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-1">Additional Info (Optional)</label><textarea name="additional_info" rows={2} value={form.additional_info} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 md:p-3 text-xs md:text-sm focus:border-brand outline-none" placeholder="Delivery instructions..." /></div>

              <div className="flex items-center gap-2 mt-4 md:mt-8"><input type="checkbox" id="billing" defaultChecked className="h-3 w-3 md:h-4 md:w-4 rounded border-gray-300 text-brand focus:ring-brand" /><label htmlFor="billing" className="text-[10px] md:text-sm text-gray-600">My shipping and billing information is the same.</label></div>

              <div className="mt-6 md:mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-3 md:gap-4 border-t border-gray-100 pt-4 md:pt-6">
                <button type="button" onClick={() => router.push('/cart')} className="text-[10px] md:text-sm font-bold text-gray-500 hover:text-black">RETURN TO CART</button>
                <button type="submit" disabled={isProcessing} className="w-full md:w-auto flex items-center justify-center gap-2 rounded bg-green-500 px-6 md:px-10 py-2.5 md:py-3 font-bold text-white text-xs md:text-base shadow-sm transition hover:bg-green-600 disabled:opacity-50">{isProcessing ? <><Loader2 size={14} className="md:w-[18px] md:h-[18px] animate-spin" /> PROCESSING...</> : "CONTINUE"}</button>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-1/3 bg-[#1B50C1] text-white p-5 md:p-12 flex flex-col">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-8 border-b border-white/20 pb-3 md:pb-4">Shopping Cart</h2>
            <div className="flex-1 space-y-3 md:space-y-4">
              {cart.items.map((item: any) => (
                <div key={item.cart_id} className="flex justify-between items-center text-xs md:text-sm"><span className="text-white/80 line-clamp-1 flex-1 pr-4">{item.product_name}</span><span className="font-bold">{formatNaira(item.subtotal)}</span></div>
              ))}
            </div>
            <div className="mt-4 md:mt-8 space-y-3 md:space-y-4 border-t border-white/20 pt-3 md:pt-4 text-xs md:text-sm">
              <div className="flex justify-between text-white/80"><span>Shipping</span><span className="font-bold text-white">Free</span></div>
              <div className="flex justify-between text-base md:text-lg font-black mt-2 md:mt-4"><span>Total</span><span>{formatNaira(cart.total)}</span></div>
            </div>
            <div className="mt-auto pt-6 md:pt-10 flex items-center justify-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-white/60"><ShieldCheck size={14} className="md:w-4 md:h-4" /> Secured by Paystack</div>
          </div>

        </div>
      </div>
    </div>
  );
}