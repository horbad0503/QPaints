"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { formatNaira } from "@/lib/format";
import { TrendingUp, ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [data, setData] = useState<{ stats: any, recentOrders: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api<{ stats: any, recentOrders: any[] }>("admin/stats");
        setData(res);
      } catch (err) {
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <div className="text-sm font-bold text-gray-500">Loading dashboard...</div>;
  if (!data) return null;

  // Mock data for charts (in a real app, you'd calculate these from the DB)
  const areaChartPath = "M0,100 C50,80 100,120 150,60 C200,0 250,80 300,40 C350,0 400,20 450,10 L450,150 L0,150 Z";
  
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Row: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Monthly Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-bold text-gray-800">Monthly Statistics</h3>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] text-gray-500 mb-1">Total Revenue</p>
              <p className="font-nexa text-2xl font-black text-black">{formatNaira(data.stats.sales)}</p>
              <p className="text-[10px] font-bold text-green-500 flex items-center mt-1"><TrendingUp size={12} className="mr-1"/> +12.5%</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 mb-1">Total Orders</p>
              <p className="font-nexa text-xl font-black text-black">{data.stats.orders}</p>
              <p className="text-[10px] font-bold text-green-500 flex items-center justify-end mt-1"><TrendingUp size={12} className="mr-1"/> +8.2%</p>
            </div>
          </div>
          {/* Mini Area Chart SVG */}
          <div className="h-16 w-full mt-auto">
            <svg viewBox="0 0 450 150" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FD79A8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FD79A8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaChartPath} fill="url(#gradient)" />
              <path d="M0,100 C50,80 100,120 150,60 C200,0 250,80 300,40 C350,0 400,20 450,10" fill="none" stroke="#FD79A8" strokeWidth="3" />
            </svg>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-6">Revenue Breakdown</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-gray-500 mb-1">Products</p>
              <p className="font-nexa text-lg font-black text-black">{data.stats.products}</p>
              <p className="text-[10px] font-bold text-gray-400">In Inventory</p>
            </div>
            <div className="h-12 w-16 flex items-end justify-end gap-1">
               {/* Bar Chart Representation */}
               <div className="w-2 bg-brand/20 rounded-t h-full"></div>
               <div className="w-2 bg-brand/40 rounded-t h-3/4"></div>
               <div className="w-2 bg-brand rounded-t h-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div>
              <p className="text-[10px] text-gray-500 mb-1">Pending Quotes</p>
              <p className="font-nexa text-lg font-black text-black">{data.stats.quotes}</p>
              <p className="text-[10px] font-bold text-gray-400">Needs review</p>
            </div>
            <div className="h-12 w-16 flex items-end justify-end gap-1">
               <div className="w-2 bg-orange-200 rounded-t h-1/2"></div>
               <div className="w-2 bg-orange-400 rounded-t h-3/4"></div>
               <div className="w-2 bg-orange-500 rounded-t h-full"></div>
            </div>
          </div>
        </div>

        {/* User Rating */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-4">User Rating</h3>
          <div className="flex text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
              <span className="w-2">5</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-green-500 rounded-full w-4/5"></div></div>
              <span>80%</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
              <span className="w-2">4</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-yellow-400 rounded-full w-1/2"></div></div>
              <span>50%</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
              <span className="w-2">3</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full"><div className="h-full bg-red-400 rounded-full w-1/4"></div></div>
              <span>25%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Large Revenue Area Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-800">Revenue Overview</h3>
            <select className="text-xs border border-gray-200 rounded-md px-2 py-1 outline-none text-gray-500">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1B50C1" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#1B50C1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,150 C100,100 150,180 250,120 C350,60 400,100 500,50 C600,0 700,80 800,20 L800,200 L0,200 Z" fill="url(#gradient2)" />
              <path d="M0,150 C100,100 150,180 250,120 C350,60 400,100 500,50 C600,0 700,80 800,20" fill="none" stroke="#1B50C1" strokeWidth="3" />
            </svg>
          </div>
        </div>

        {/* Donut Charts */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-800">Revenue Target</h3>
          </div>
          <div className="flex justify-around items-center flex-1">
            
            {/* Donut 1 */}
            <div className="relative flex flex-col items-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#1B50C1" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="100" className="transition-all duration-1000" />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-xs font-black text-gray-800">65%</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-2">Sales</p>
            </div>

            {/* Donut 2 */}
            <div className="relative flex flex-col items-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#FFBE00" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="60" className="transition-all duration-1000" />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-xs font-black text-gray-800">80%</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-2">Target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-nexa text-lg font-bold text-black">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs font-bold text-brand hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-50">
                <th className="pb-3 font-bold">Reference</th>
                <th className="pb-3 font-bold">Customer</th>
                <th className="pb-3 font-bold">Amount</th>
                <th className="pb-3 font-bold">Status</th>
                <th className="pb-3 font-bold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="py-4 text-sm font-bold text-brand">{order.reference}</td>
                  <td className="py-4 text-sm text-gray-700">{order.full_name}</td>
                  <td className="py-4 text-sm font-bold text-black">{formatNaira(order.total_amount)}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-gray-500 text-right">{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}