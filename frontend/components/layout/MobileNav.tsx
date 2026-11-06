"use client";

import Link from "next/link";
import { X, Search, ChevronDown, User, LogOut, Heart, Package } from "lucide-react";
import { useState } from "react";
import type { Session } from "@/lib/auth";
import { useSession } from "@/lib/auth";
import { getInitials } from "@/lib/format";

const toolsLinks = [
  { href: "/estimation-calculator", label: "Estimation Calculator" },
  { href: "/ai-calculator", label: "AI Calculator" },
];

export function MobileNav({
  open,
  onClose,
  links,
  session,
}: {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  session?: Session;
}) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const { logout } = useSession();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={
          "fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />

      {/* Panel - Slides in from the right */}
      <div
        className={
          "fixed inset-y-0 right-0 z-[70] flex h-full w-[85%] max-w-[320px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        {/* Header / Close Button */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo/quali 1.svg`} alt="Qualitas" className="h-8" />
          <button
            onClick={onClose}
            className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 hover:text-black"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          
          {/* Compact Search Bar */}
          <div className="p-5 pb-2">
            <div className="flex items-center rounded-lg bg-gray-100 px-3 py-2.5">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="ml-3 w-full bg-transparent text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col px-3 py-2">
            {links.map((l) =>
              l.label === "Tools" ? (
                <div key={l.href} className="flex flex-col">
                  <button
                    onClick={() => setToolsOpen((o) => !o)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-bold text-gray-800 transition hover:bg-gray-50 hover:text-brand"
                  >
                    {l.label}
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform duration-300 ${toolsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {/* Accordion Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      toolsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="mb-2 ml-4 flex flex-col border-l-2 border-gray-100 pl-3">
                      {toolsLinks.map((t) => (
                        <Link
                          key={t.href}
                          href={t.href}
                          onClick={onClose}
                          className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-brand"
                        >
                          {t.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className="rounded-xl px-4 py-3 text-[15px] font-bold text-gray-800 transition hover:bg-gray-50 hover:text-brand"
                >
                  {l.label}
                </Link>
              )
            )}
          </div>
          
          <div className="mx-5 my-2 border-t border-gray-100"></div>

          {/* User / Auth Section */}
          <div className="mt-auto p-5">
            {session?.authenticated && session.user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-sm">
                    {session.user.profile_picture ? (
                      <img src={session.user.profile_picture} alt={session.user.username} className="h-full w-full object-cover" />
                    ) : (
                      getInitials(session.user.fullName || session.user.username)
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-bold text-gray-900">{session.user.username}</p>
                    <p className="truncate text-xs text-gray-500">{session.user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Link href="/account" onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
                    <User size={16} /> My Profile
                  </Link>
                  <Link href="/orders" onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
                    <Package size={16} /> My Orders
                  </Link>
                  <Link href="/wishlist" onClick={onClose} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50">
                    <Heart size={16} /> Wishlist
                  </Link>
                  <button onClick={handleLogout} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-xl bg-brand-cta py-3.5 font-nexa text-[15px] font-bold text-black shadow-cta transition hover:bg-brand-cta-hover"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}