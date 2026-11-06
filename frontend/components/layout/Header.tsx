"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { UserDropdown } from "./UserDropdown";
import { MobileNav } from "./MobileNav";
import { GetStartedModal } from "./GetStartedModal";
import { AnimatedLogo } from "./AnimatedLogo";

const links = [
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Product" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSession();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery(""); 
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-[#1B50C1] shadow-md border-b border-white/10">
        <div className="container-shop relative flex h-14 md:h-20 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/">
              <AnimatedLogo />
            </Link>
          </div>

          {/* Desktop Nav - Premium Redesign */}
          <nav className="hidden lg:flex h-full items-center gap-2 mx-4">
            {links.map(l => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group relative flex h-full items-center px-5 font-nexa text-[15px] tracking-wide transition-colors duration-300 ${
                    isActive ? "text-white font-bold" : "text-white/70 font-medium hover:text-white"
                  }`}
                >
                  {l.label}
                  {/* Animated Underline */}
                  <span className={`absolute bottom-0 left-0 h-[3px] w-full bg-[#FFBE00] origin-center transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              );
            })}

            {/* Tools Dropdown */}
            <li ref={toolsRef} className="relative list-none h-full flex items-center">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`group relative flex h-full items-center gap-1.5 px-5 font-nexa text-[15px] tracking-wide transition-colors duration-300 ${
                  toolsOpen ? "text-white font-bold" : "text-white/70 font-medium hover:text-white"
                }`}
              >
                Tools
                <ChevronDown size={16} className={`transition-transform duration-300 ${toolsOpen ? "rotate-180 text-[#FFBE00]" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-[3px] w-full bg-[#FFBE00] origin-center transition-transform duration-300 ease-out ${
                  toolsOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </button>
              
              {/* Premium Dropdown */}
              {toolsOpen && (
                <div className="absolute left-1/2 top-[85%] -translate-x-1/2 w-56 rounded-xl bg-white p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] ring-1 ring-black/5 animate-[slideDownSearch_0.2s_ease-out_forwards]">
                  <Link
                    href="/estimation-calculator"
                    className="block rounded-lg px-4 py-2.5 font-nexa text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-brand"
                    onClick={() => setToolsOpen(false)}
                  >
                    Estimation Calculator
                  </Link>
                  <Link
                    href="/ai-calculator"
                    className="block rounded-lg px-4 py-2.5 font-nexa text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-brand"
                    onClick={() => setToolsOpen(false)}
                  >
                    AI Calculator
                  </Link>
                </div>
              )}
            </li>
          </nav>

          {/* Right side Icons */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2 text-white transition hover:bg-white/10 hover:scale-110 active:scale-95"
              aria-label="Search"
            >
              <Search size={18} className="md:w-5 md:h-5" />
            </button>

            <Link
              href="/cart"
              className="relative rounded-full p-2 text-white transition hover:bg-white/10 hover:scale-110 active:scale-95"
              aria-label="Cart"
            >
              <ShoppingBag size={18} className="md:w-5 md:h-5" />
              {(session?.cartCount ?? 0) > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-[#FFBE00] text-[10px] md:text-xs font-bold text-brand-ink">
                  {session?.cartCount}
                </span>
              )}
            </Link>

            <div className="w-px h-6 bg-white/20 mx-1 hidden md:block"></div>

            {session?.authenticated && session.user ? (
              <UserDropdown
                user={session.user}
                cartCount={session.cartCount}
                wishlistCount={session.wishlistCount}
              />
            ) : (
              <button
                onClick={() => setModalOpen(true)}
                className="hidden md:inline-flex rounded-md bg-[#FFBE00] px-6 py-2.5 font-nexa font-extrabold text-black shadow-[0_4px_15px_rgba(255,190,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD95B] hover:shadow-[0_8px_25px_rgba(255,190,0,0.5)] active:translate-y-0"
              >
                Get Started
              </button>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2 text-white transition hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          {/* Centered Animated Search Bar Overlay */}
          {searchOpen && (
            <div className="absolute inset-0 z-50 flex w-full items-center justify-center bg-[#1B50C1] px-4 animate-[slideDownSearch_0.3s_ease-out_forwards]">
              <form onSubmit={handleSearch} className="flex w-full max-w-3xl items-center rounded-md bg-[#E5E5E5] px-4 py-2.5 shadow-2xl">
                <span className="hidden md:inline whitespace-nowrap font-nexa text-sm text-gray-700">
                  All Products
                </span>
                <div className="hidden md:block mx-4 h-5 w-px bg-gray-400"></div>
                
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..." 
                  className="flex-1 bg-transparent font-nexa text-base outline-none placeholder:text-gray-500"
                  autoFocus
                />
                
                <button type="submit" className="ml-2 text-gray-700 hover:text-black transition">
                  <Search size={20} />
                </button>
                
                <div className="mx-4 h-5 w-px bg-gray-400"></div>
                
                <button 
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }} 
                  className="text-gray-700 hover:text-black transition"
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          )}

        </div>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={[...links, { href: "/tools", label: "Tools" }]}
        session={session}
      />
      
      <GetStartedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}