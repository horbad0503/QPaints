"use client";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { formatNaira, asset } from "@/lib/format";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth";

export function ProductCard({ product, onLikeToggle }: { product: any, onLikeToggle: (id: number, liked: boolean, count: number) => void }) {
  const { refresh } = useSession();
  const [isLiked, setIsLiked] = useState(product.is_liked === 1);
  const [isAdding, setIsAdding] = useState(false);

  const handleLike = async () => {
    try {
      const newAction = isLiked ? 'unlike' : 'like';
      const res = await api<{ status: string, wishlist_count: number }>('products/like', {
        method: 'POST',
        body: { product_id: product.id, action: newAction }
      });
      setIsLiked(!isLiked);
      onLikeToggle(product.id, !isLiked, res.wishlist_count);
      toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await api('cart/add', {
        method: 'POST',
        body: { product_id: product.id, quantity: 1 }
      });
      toast.success('Added to cart');
      refresh(); 
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  const isOutOfStock = product.stock_status !== 'In Stock';

  return (
    <div className="group flex flex-col bg-white">
      <div className="relative mb-2 md:mb-4 aspect-[4/3] w-full overflow-hidden bg-gray-50 rounded-lg">
        <img 
          src={asset(product.image_url)} 
          alt={product.product_name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="font-nexa text-sm md:text-[22px] font-bold text-[#1E1E1E] line-clamp-1">{product.product_name}</h3>
        
        <div className="mt-1 md:mt-2 space-y-0.5 md:space-y-1.5 text-[10px] md:text-[15px] text-[#555]">
          <span className="flex items-center gap-1 md:gap-2">
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="md:w-4 md:h-4"><path d="M12.5 2.5H1.5C1.22386 2.5 1 2.72386 1 3V11C1 11.2761 1.22386 11.5 1.5 11.5H12.5C12.7761 11.5 13 11.2761 13 11V3C13 2.72386 12.7761 2.5 12.5 2.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 1.5V3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 1.5V3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 5.5H13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {product.category}
          </span>
          <span className="flex items-center gap-1 md:gap-2">
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="md:w-4 md:h-4"><path d="M12.5 7.5C12.5 8.16304 12.2366 8.79893 11.7678 9.26777C11.2989 9.73661 10.663 10 10 10C9.33696 10 8.70107 9.73661 8.23223 9.26777C7.76339 8.79893 7.5 8.16304 7.5 7.5C7.5 6.83696 7.76339 6.20107 8.23223 5.73223C8.70107 5.26339 9.33696 5 10 5C10.663 5 11.2989 5.26339 11.7678 5.73223C12.2366 6.20107 12.5 6.83696 12.5 7.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 7.5H10.005" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.5 3.5H5.5V11.5H1.5V3.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {product.size}
          </span>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="h-2.5 w-2.5 md:h-4 md:w-4 rounded-full border border-gray-300" style={{ backgroundColor: product.color.toLowerCase() }}></span>
            <span className="capitalize">{product.color}</span>
          </div>
        </div>

        <div className="my-2 md:my-4 border-t border-gray-200"></div>

        <p className="text-[10px] md:text-[15px] italic text-[#555] line-clamp-1">Up to <strong>{product.warranty_years} Years</strong> Warranty</p>

        <div className="mt-1 md:mt-2 flex items-center gap-1 md:gap-1.5 text-[10px] md:text-[15px] text-[#555]">
          <span className="text-[#FFC831] text-sm md:text-xl leading-none">★</span>
          <span className="font-bold text-[#1E1E1E]">{parseFloat(product.rating).toFixed(1)}</span>
          <span className="hidden sm:inline">({product.review_count} Reviews)</span>
        </div>

        <div className="mt-2 md:mt-4 flex flex-col md:flex-row md:items-center justify-between gap-1">
          <p className="font-nexa text-sm md:text-[22px] font-black text-black">{formatNaira(product.price)}</p>
          <span className={`text-[10px] md:text-[15px] font-bold ${isOutOfStock ? 'text-red-500' : 'text-[#2E7D32]'}`}>
            {product.stock_status}
          </span>
        </div>

        <div className="mt-3 md:mt-5 flex gap-1.5 md:gap-2">
          <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
            className="flex h-8 md:h-[48px] flex-1 items-center justify-center gap-1 md:gap-2 rounded bg-[#1E1E1E] font-nexa text-[10px] md:text-[15px] font-bold text-white transition hover:bg-black disabled:opacity-50"
          >
            <Plus size={12} className="md:w-4 md:h-4" />
            {isAdding ? '...' : 'Add To Cart'}
          </button>
          
          <button 
            onClick={handleLike}
            className={`flex h-8 w-8 md:h-[48px] md:w-[48px] shrink-0 items-center justify-center rounded border transition hover:bg-gray-50 ${isLiked ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-black'}`}
          >
            <Heart size={14} className="md:w-5 md:h-5" fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}