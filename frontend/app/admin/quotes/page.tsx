"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { formatNaira } from "@/lib/format";
import toast from "react-hot-toast";

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api<{ quotes: any[] }>("admin/quotes").then(res => setQuotes(res.quotes)).catch(() => toast.error("Failed to load quotes")).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="text-sm font-bold text-gray-500">Loading quotes...</div>;

  return (
    <div>
      <h1 className="font-nexa text-2xl md:text-3xl font-black text-black mb-6">Quote Requests</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-bold">Customer</th>
              <th className="p-4 font-bold">Project</th>
              <th className="p-4 font-bold">Plan</th>
              <th className="p-4 font-bold">Estimate</th>
              <th className="p-4 font-bold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {quotes.map((q: any) => (
              <tr key={q.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <p className="text-sm font-bold text-gray-800">{q.user_name}</p>
                  <p className="text-xs text-gray-500">{q.user_email}</p>
                </td>
                <td className="p-4 text-sm text-gray-600 capitalize">{q.project_type} ({q.building_type})</td>
                <td className="p-4 text-sm font-bold text-brand">{q.plan}</td>
                <td className="p-4 text-sm font-bold text-black">{formatNaira(q.estimated_cost)}</td>
                <td className="p-4 text-xs text-gray-500">{new Date(q.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}