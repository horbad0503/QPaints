"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { formatNaira } from "@/lib/format";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api<{ orders: any[] }>("admin/orders").then(res => setOrders(res.orders)).catch(() => toast.error("Failed to load orders")).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="text-sm font-bold text-gray-500">Loading orders...</div>;

  return (
    <div>
      <h1 className="font-nexa text-2xl md:text-3xl font-black text-black mb-6">Orders Management</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-bold">Reference</th>
              <th className="p-4 font-bold">Customer</th>
              <th className="p-4 font-bold">Total</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((o: any) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="p-4 text-sm font-bold text-brand">{o.reference}</td>
                <td className="p-4 text-sm text-gray-800">{o.fullname}</td>
                <td className="p-4 text-sm font-bold text-black">{formatNaira(o.total_amount)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${o.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{o.status}</span>
                </td>
                <td className="p-4 text-xs text-gray-500">{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}