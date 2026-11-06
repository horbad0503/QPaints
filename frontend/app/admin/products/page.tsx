"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { formatNaira } from "@/lib/format";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api<{ products: any[] }>("admin/products").then(res => setProducts(res.products)).catch(() => toast.error("Failed to load products")).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="text-sm font-bold text-gray-500">Loading products...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-nexa text-2xl md:text-3xl font-black text-black">Products Inventory</h1>
        <button className="rounded bg-brand px-4 py-2 text-xs font-bold text-white">+ Add Product</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-bold">Product</th>
              <th className="p-4 font-bold">Category</th>
              <th className="p-4 font-bold">Price</th>
              <th className="p-4 font-bold">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p: any) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image_url} alt={p.product_name} className="h-10 w-10 rounded bg-gray-50 object-cover" />
                  <span className="text-sm font-bold text-gray-800">{p.product_name}</span>
                </td>
                <td className="p-4 text-sm text-gray-600">{p.category}</td>
                <td className="p-4 text-sm font-bold text-black">{formatNaira(p.price)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${p.stock_status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{p.stock_status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}