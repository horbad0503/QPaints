"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { formatNaira, asset } from "@/lib/format";
import { CheckCircle2, ArrowRight, Download, MapPin, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [data, setData] = useState<{ order: any, items: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ref) return;
    async function fetchOrder() {
      try { const res = await api<{ order: any, items: any[] }>(`orders/get_by_ref?ref=${ref}`); setData(res); } catch (err: any) { toast.error("Could not load order details"); } finally { setIsLoading(false); }
    }
    fetchOrder();
  }, [ref]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-sm md:text-base font-bold text-gray-500">Loading receipt...</div>;
  if (!data || !data.order) return <div className="min-h-screen flex flex-col items-center justify-center"><h2 className="text-lg md:text-2xl font-bold mb-4">Order Not Found</h2><Link href="/products" className="text-brand text-sm md:text-base underline">Go back to shop</Link></div>;

  const { order, items } = data;

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-6 md:py-12 px-4 md:px-4 print:bg-white print:py-0 print:px-0">
      <div className="mx-auto max-w-2xl print:max-w-none">
        <div className="rounded-2xl md:rounded-3xl bg-white shadow-xl overflow-hidden print:shadow-none print:border-none">
          
          <div className="p-5 md:p-8 border-b border-gray-100 print:hidden">
            <p className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase mb-3 md:mb-6">Order Confirmation</p>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex h-9 w-9 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600"><CheckCircle2 size={20} className="md:w-7 md:h-7" /></div>
              <div>
                <h1 className="font-nexa text-base md:text-xl font-black text-black">Thank you for shopping with us</h1>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">ID: <span className="font-mono font-bold text-black">{order.reference}</span></p>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-8 border-b border-gray-100 print:p-0 print:border-b-2 print:border-black print:mt-4">
            <div className="hidden print:block mb-4 md:mb-6"><h2 className="font-nexa text-xl md:text-2xl font-black text-black">QUALITAS ECO PAINTS</h2><p className="text-xs md:text-sm text-gray-500">Order Receipt</p></div>
            <div className="space-y-3 md:space-y-4">
              {items.map((item: any) => (
                <div key={item.id} className="flex gap-3 md:gap-4 border-b border-gray-50 pb-3 md:pb-4 last:border-0 last:pb-0">
                  <img src={asset(item.image_url)} alt={item.product_name} className="h-12 w-12 md:h-16 md:w-16 rounded-lg bg-gray-50 object-cover print:h-10 print:w-10" />
                  <div className="flex-1">
                    <p className="font-bold text-xs md:text-sm text-black line-clamp-1">{item.product_name}</p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                    <p className="text-xs md:text-sm font-bold text-black mt-0.5 md:mt-1">{formatNaira(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 md:p-8 space-y-4 md:space-y-6 print:p-0 print:mt-6">
            <div>
              <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-1.5 md:mb-2 flex items-center gap-1.5 md:gap-2"><MapPin size={14} className="md:w-4 md:h-4 text-brand" /> Delivery Address</h3>
              <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 text-xs md:text-sm text-gray-600 print:bg-white print:p-0 print:border-l-2 print:border-gray-300 print:pl-4">
                <p className="font-bold text-black">{order.fullname}</p><p>{order.phone}</p><p>{order.address}, {order.city}, {order.state}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-1.5 md:mb-2 flex items-center gap-1.5 md:gap-2"><CreditCard size={14} className="md:w-4 md:h-4 text-brand" /> Payment Method</h3>
              <div className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 text-xs md:text-sm text-gray-600 print:bg-white print:p-0 print:border-l-2 print:border-gray-300 print:pl-4">
                <p>Paid Online via Paystack</p><p className="font-bold text-black mt-0.5 md:mt-1">Total: {formatNaira(order.total_amount)}</p>
              </div>
            </div>
            <div className="print:hidden">
              <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-2 md:mb-3">How would you rate your shopping experience?</h3>
              <div className="flex justify-between gap-1 md:gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button key={num} className="flex flex-col items-center gap-1 group">
                    <span className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-200 md:border-2 text-xs md:text-sm font-bold transition group-hover:bg-gray-50 ${num === 4 || num === 5 ? 'border-green-500 text-green-600' : 'border-gray-200 text-gray-400'}`}>{num}</span>
                    <span className="text-[8px] md:text-[10px] text-gray-500">{['Very Poor', 'Poor', 'Average', 'Good', 'Great'][num-1]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 md:p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 md:gap-4 print:hidden">
            <button onClick={() => window.print()} className="flex flex-1 items-center justify-center gap-1.5 md:gap-2 rounded-lg md:rounded-xl bg-white border border-gray-200 md:border-2 md:border-gray-200 py-2.5 md:py-3.5 font-bold text-xs md:text-base text-gray-700 transition hover:border-gray-300 hover:bg-gray-100"><Download size={14} className="md:w-[18px] md:h-[18px]" /> Download Receipt</button>
            <Link href="/products" className="flex flex-1 items-center justify-center gap-1.5 md:gap-2 rounded-lg md:rounded-xl bg-[#FFBE00] py-2.5 md:py-3.5 font-bold text-xs md:text-base text-black shadow-sm transition hover:bg-[#ffd95b]">Continue Shopping <ArrowRight size={14} className="md:w-[18px] md:h-[18px]" /></Link>
          </div>
        </div>
        <p className="text-center text-[10px] md:text-xs text-gray-400 mt-4 md:mt-6 print:hidden">Need help? Visit our Help Center or Contact Us.</p>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm md:text-base font-bold">Loading...</div>}><SuccessContent /></Suspense>
  );
}