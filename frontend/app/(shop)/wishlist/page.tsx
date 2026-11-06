"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { ProductCard } from "@/components/shop/ProductCard";
import { Heart, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await api<{ items: any[] }>("wishlist/list");
      setProducts(res.items);
    } catch (err) {
      toast.error("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchWishlist(); }, []);

  const handleLikeToggle = (id: number, liked: boolean) => {
    if (!liked) {
      // Item was unliked on the card, so remove it from the array
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Removed from wishlist");
    }
  };

  if (isLoading) return <div className="container-shop py-20 text-center font-bold text-sm md:text-base">Loading wishlist...</div>;

  return (
    <div className="container-shop py-6 md:py-16 min-h-[60vh]">
      <h1 className="font-nexa text-2xl md:text-4xl font-black text-black mb-6 md:mb-10 flex items-center gap-2 md:gap-3">
        <Heart className="text-red-500 fill-red-500 md:w-8 md:h-8" size={24} /> My Wishlist
      </h1>

      {products.length === 0 ? (
        <div className="rounded-xl md:rounded-2xl bg-white p-10 md:p-20 text-center shadow-sm border border-gray-100">
          <Heart size={40} className="mx-auto text-gray-200 mb-4 md:w-16 md:h-16" />
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">Your wishlist is empty</h2>
          <p className="text-xs md:text-base text-gray-500 mb-6 md:mb-8">Start adding products you love!</p>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-lg bg-brand-cta px-6 md:px-8 py-2.5 md:py-3 font-nexa text-xs md:text-base font-bold text-black transition hover:bg-brand-cta-hover">
            Browse Products <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {products.map(p => (
            <ProductCard key={p.id} product={{ ...p, is_liked: 1 }} onLikeToggle={handleLikeToggle} />
          ))}
        </div>
      )}
    </div>
  );
}