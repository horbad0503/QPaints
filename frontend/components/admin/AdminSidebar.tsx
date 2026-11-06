"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, FileText, MessageSquare, Calculator, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/php/admin/logout");
    toast.success("Logged out");
    router.push("/admin/login");
  };

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/products", label: "Products", icon: FileText },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "/admin/quotes", label: "Quote Requests", icon: Calculator },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 hidden md:flex flex-col shadow-sm">
      <div className="flex h-20 items-center justify-start px-6 border-b border-gray-50">
        <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo/quali 1.svg`} alt="Qualitas" className="h-8" />
        <span className="ml-3 font-nexa text-lg font-black text-brand">Admin</span>
      </div>
      
      <nav className="flex-1 space-y-1 p-4 mt-2">
        <p className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu</p>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold transition-all ${
                isActive 
                  ? "bg-brand/5 text-brand" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-brand" : "text-gray-400"} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
}