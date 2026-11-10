"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth";
import { getInitials, asset } from "@/lib/format";
import { useState } from "react";
import { ChevronDown, Heart, LogOut, Package, User, Bell } from "lucide-react";

export function UserDropdown({
  user,
  cartCount = 0,
  wishlistCount = 0,
}: {
  user: { username: string; fullName: string; email: string; profile_picture?: string };
  cartCount?: number;
  wishlistCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const { logout } = useSession();

  const initials = getInitials(user.fullName || user.username);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 p-1 md:pl-1.5 md:pr-3 backdrop-blur-sm transition hover:bg-white/20"
        onClick={() => setOpen(o => !o)}
      >
        <div className="relative">
          <div className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs md:text-sm font-bold text-white">
            {user.profile_picture ? (
              <img src={asset(user.profile_picture)} alt={user.username} className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <span className="absolute bottom-0 right-0 h-2 w-2 md:h-2.5 md:w-2.5 rounded-full border border-brand bg-green-400" />
        </div>
        <span className="hidden md:inline font-nexa font-bold text-sm text-white">
          {user.username}
        </span>
        <ChevronDown
          size={12}
          className={`hidden md:block text-white/70 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full pt-2 z-50">
          <div className="w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-base font-bold text-white">
                {user.profile_picture ? (
                  <img src={asset(user.profile_picture)} alt={user.username} className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate font-nexa font-bold text-sm text-gray-900">
                  {user.username}
                </p>
                <p className="truncate text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-around border-b border-gray-100 bg-gray-50 px-4 py-3">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{cartCount}</p>
                <p className="text-xs text-gray-500">Cart</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{wishlistCount}</p>
                <p className="text-xs text-gray-500">Wishlist</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">0</p>
                <p className="text-xs text-gray-500">Orders</p>
              </div>
            </div>

            {/* Links */}
            <nav className="p-2">
              <DropLink href="/account" icon={<User size={18} />} label="My Profile" />
              <DropLink href="/account?tab=orders" icon={<Package size={18} />} label="My Orders" />
              <DropLink href="/wishlist" icon={<Heart size={18} />} label="Wishlist" />
              <DropLink href="/account?tab=notifications" icon={<Bell size={18} />} label="Notifications" />
            </nav>

            {/* Logout */}
            <div className="border-t border-gray-100 p-2">
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DropLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-brand"
    >
      {icon}
      {label}
    </Link>
  );
}