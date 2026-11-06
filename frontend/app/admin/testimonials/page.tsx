"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminTestimonials() {
  const [data, setData] = useState<{ individual: any[], company: any[] }>({ individual: [], company: [] });
  const [activeTab, setActiveTab] = useState<"individual" | "company">("individual");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api<{ individual: any[], company: any[] }>("admin/testimonials")
      .then(res => {
        setData({
          individual: res.individual || [],
          company: res.company || []
        });
      })
      .catch(() => toast.error("Failed to load testimonials"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="text-sm font-bold text-gray-500">Loading testimonials...</div>;

  const items = activeTab === "individual" ? (data.individual || []) : (data.company || []);

  return (
    <div>
      <h1 className="font-nexa text-2xl md:text-3xl font-black text-black mb-6">Testimonials Moderation</h1>
      
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab("individual")} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === "individual" ? "bg-brand text-white" : "bg-white text-gray-600 border border-gray-200"}`}>Individual</button>
        <button onClick={() => setActiveTab("company")} className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === "company" ? "bg-brand text-white" : "bg-white text-gray-600 border border-gray-200"}`}>Company</button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 font-bold text-sm">No testimonials found for this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t: any) => (
            <div key={t.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-sm text-black">{activeTab === "individual" ? t.name : t.contact_name}</p>
                  <p className="text-xs text-gray-500">{activeTab === "individual" ? t.email : t.organization}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < t.rating ? "currentColor" : "none"} />)}
                </div>
              </div>
              <p className="text-xs text-gray-600 line-clamp-4 leading-relaxed mb-4">"{t.testimonial}"</p>
              <div className="flex gap-2">
                <button className="flex-1 rounded bg-green-50 py-1.5 text-xs font-bold text-green-600 hover:bg-green-100">Approve</button>
                <button className="flex-1 rounded bg-red-50 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}