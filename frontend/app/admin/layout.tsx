"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { api } from "@/lib/api";
import { Search, Bell } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (pathname === "/admin/login") {
        setIsLoading(false);
        return;
      }
      try {
        const res = await api<{ authenticated: boolean }>("admin/session");
        if (res.authenticated) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [pathname, router]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 font-bold">Checking admin access...</div>;
  if (pathname === "/admin/login") return <>{children}</>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
          <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 w-full max-w-md">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-gray-400"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
              <div className="h-9 w-9 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-bold text-gray-800">Admin User</p>
                <p className="text-[10px] text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}