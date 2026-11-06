"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatNaira } from "@/lib/format";
import { Package, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api<{ orders: any[] }>("orders/list");
        setOrders(res.orders);
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (isLoading) return <div className="container-shop py-20 text-center font-bold text-sm md:text-base">Loading orders...</div>;

  return (
    <div className="container-shop max-w-4xl py-6 md:py-16 min-h-[60vh]">
      <h1 className="font-nexa text-2xl md:text-4xl font-black text-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3">
        <Package className="md:w-8 md:h-8" size={24} /> My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-xl md:rounded-2xl bg-white p-10 md:p-20 text-center shadow-sm border border-gray-100">
          <Package size={40} className="mx-auto text-gray-200 mb-4 md:w-16 md:h-16" />
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">No orders yet</h2>
          <p className="text-xs md:text-base text-gray-500 mb-6 md:mb-8">Looks like you haven't placed any orders.</p>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-lg bg-brand-cta px-6 md:px-8 py-2.5 md:py-3 font-nexa text-xs md:text-base font-bold text-black transition hover:bg-brand-cta-hover">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {orders.map(order => (
            <Link key={order.id} href={`/orders/${order.id}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 md:p-6 transition hover:border-brand/30 hover:shadow-md">
              <div>
                <p className="font-bold text-sm md:text-base text-black">Ref: {order.reference}</p>
                <p className="text-[10px] md:text-sm text-gray-500 mt-1">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <p className="font-black text-sm md:text-base text-black">{formatNaira(order.total_amount)}</p>
                <span className={`px-3 py-1 rounded-full text-[9px] md:text-xs font-bold uppercase tracking-wider ${order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}