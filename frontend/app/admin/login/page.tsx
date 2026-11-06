"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api("admin/login", { method: "POST", body: form });
      toast.success("Access Granted");
      router.push("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1B50C1] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo/quali 1.svg`} alt="Qualitas" className="h-12 mx-auto mb-4" />
          <h1 className="font-nexa text-2xl font-black text-black">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Secure access for authorized personnel only</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-brand outline-none"
                placeholder="admin"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-brand outline-none"
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
              />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-brand-cta py-3 font-nexa font-bold text-black shadow-sm transition hover:bg-brand-cta-hover disabled:opacity-50">
            {isLoading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}