"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { refresh } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // Handle OAuth error redirects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (error?.startsWith("google_")) toast.error("Google authentication failed. Please try again.");
    if (error?.startsWith("facebook_")) toast.error("Facebook authentication failed. Please try again.");
    if (error) window.history.replaceState({}, "", "/login");
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api("auth/login", { method: "POST", body: form });
      toast.success("Welcome back!");
      refresh(); 
      router.push("/products"); 
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-nexa text-xl md:text-[30px] font-black text-black whitespace-nowrap tracking-tight">Welcome Back to Qualitas</h1>
      <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-500">Continue your journey towards sustainable beauty</p>

      <p className="mt-5 md:mt-8 text-center text-[10px] md:text-sm text-gray-500">Sign up with Google or your social media account</p>
      
      <div className="mt-3 md:mt-4 flex gap-2 md:gap-3">
        <a 
          href={`${process.env.NEXT_PUBLIC_API_URL || ""}/auth/google_login`} 
          className="..."
        >
          Google
        </a>
        <a 
          href={`${process.env.NEXT_PUBLIC_API_URL || ""}/auth/facebook_login`} 
          className="..."
        >
          Facebook
        </a>
        <button className="flex flex-1 items-center justify-center gap-1.5 md:gap-2 rounded border border-gray-300 py-2 text-[11px] md:text-sm font-bold text-gray-700 transition hover:bg-gray-50 opacity-50 cursor-not-allowed">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/icons8-linkedin-48.png`} className="h-3.5 w-3.5 md:h-4 md:w-4" /> LinkedIn
        </button>
      </div>

      <div className="my-5 md:my-8 flex items-center gap-2 md:gap-4 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200">
        <span className="text-[10px] md:text-sm text-gray-400">or continue with</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
        <div>
          <label className="block text-xs md:text-[15px] font-bold text-gray-700 mb-1 md:mb-2">Username/Email</label>
          <input 
            type="text" required value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })}
            className="w-full rounded border border-gray-300 py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-xs md:text-[15px] font-bold text-gray-700 mb-1 md:mb-2">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded border border-gray-300 py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              placeholder="***************"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
              {showPassword ? <EyeOff size={16} className="md:w-[18px] md:h-[18px]" /> : <Eye size={16} className="md:w-[18px] md:h-[18px]" />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="w-full rounded bg-brand-cta py-2.5 md:py-3 font-nexa text-sm md:text-lg font-bold text-black shadow-sm transition hover:bg-brand-cta-hover disabled:opacity-50">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-5 md:mt-6 text-center text-[11px] md:text-sm text-gray-600">
        New to Qualitas? <Link href="/register" className="font-bold text-brand hover:underline">Get Started</Link>
      </p>
    </div>
  );
}