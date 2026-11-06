"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { ProductCard } from "@/components/shop/ProductCard";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { ChevronDown, ChevronLeft, ChevronRight, X, ShoppingCart, ListFilter } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth";
import Link from "next/link";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const { session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState(urlSearch);
  const [filters, setFilters] = useState({
    category: [] as string[],
    stock: [] as string[],
    size: [] as string[],
    color: [] as string[],
    sort: "newest",
    page: 1,
  });

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const clearFilters = () => {
    setSearch("");
    setFilters({ category: [], stock: [], size: [], color: [], sort: "newest", page: 1 });
    router.replace("/products");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    setFilters(f => ({ ...f, page: 1 }));

    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    filters.category.forEach(c => params.append("category[]", c));
    filters.stock.forEach(s => params.append("stock[]", s));
    filters.size.forEach(s => params.append("size[]", s));
    filters.color.forEach(c => params.append("color[]", c));
    params.append("sort", filters.sort);
    params.append("page", filters.page.toString());
    return params.toString();
  }, [search, filters]);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await api<{ products: any[], total: number, totalPages: number }>(`products/list?${queryString}`);
        setProducts(res.products);
        setTotalProducts(res.total);
        setTotalPages(res.totalPages);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [queryString]);

  const handleLikeToggle = (id: number, liked: boolean) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, is_liked: liked ? 1 : 0 } : p));
  };

  return (
    <div className="container-shop py-6 md:py-10">
      
      {/* Top Search Bar & View Cart Row - Compact on Mobile */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        <div className="flex flex-1 items-center rounded-md bg-[#E5E5E5] p-1 md:p-2">
          <div className="flex items-center gap-1 whitespace-nowrap font-nexa text-[13px] md:text-[16px] text-[#1E1E1E] pr-2 md:pr-4 border-r border-[#b9b9b9]">
            Paint <ChevronDown size={14} className="md:w-4 md:h-4" />
          </div>
          <span className="hidden sm:inline whitespace-nowrap font-nexa text-[15px] text-[#1E1E1E] px-3 md:px-4 border-r border-[#b9b9b9]">
            All Products
          </span>
          <input 
            type="text" 
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="flex-1 bg-transparent px-2 md:px-4 font-nexa text-[13px] md:text-[16px] text-[#1E1E1E] outline-none placeholder:text-gray-500"
          />
          {search && (
            <button onClick={() => { setSearch(""); router.replace("/products"); }} className="p-1 text-gray-500 hover:text-black">
              <X size={16} />
            </button>
          )}
        </div>

        <Link href="/cart" className="flex h-10 md:h-[52px] shrink-0 items-center justify-center gap-2 rounded-md bg-brand-cta px-4 md:px-8 font-nexa text-sm md:text-lg font-bold text-black shadow-sm transition hover:bg-brand-cta-hover">
          <ShoppingCart size={16} className="md:w-5 md:h-5" />
          View Cart
          {(session?.cartCount ?? 0) > 0 && (
            <span className="flex h-5 min-w-5 md:h-6 md:min-w-6 items-center justify-center rounded-full bg-black px-1 text-[10px] md:text-xs text-white ml-1">
              {session?.cartCount}
            </span>
          )}
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        
        {/* Sidebar */}
        <FilterSidebar filters={filters} setFilters={setFilters} clearFilters={clearFilters} />

        {/* Main Content */}
        <div className="flex-1">
          
          {/* Header area (Breadcrumb, Title, Sort) - Compact on Mobile */}
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6">
            <div>
              <p className="text-xs md:text-[15px] text-gray-500 mb-1 md:mb-2">
                Home / Search / <span className="text-black">{search || 'All Products'}</span>
              </p>
              <div className="flex items-center gap-3 md:gap-4">
                <h1 className="font-nexa text-xl md:text-[34px] font-black italic text-black">
                  "{search || 'All Products'}"
                </h1>
                <div className="hidden md:block h-[1px] w-16 bg-black mt-2"></div>
                <span className="text-xs md:text-[15px] text-gray-600 mt-1 md:mt-2">{totalProducts} Results</span>
              </div>
            </div>

            {/* Sort Dropdown - Compact on Mobile */}
            <div className="relative">
              <select 
                value={filters.sort}
                onChange={(e) => setFilters(f => ({ ...f, sort: e.target.value, page: 1 }))}
                className="appearance-none rounded-md border border-gray-300 md:border-2 md:border-black bg-white py-1.5 md:py-2.5 pl-8 md:pl-10 pr-8 md:pr-10 font-nexa text-xs md:text-[16px] font-bold text-black focus:outline-none"
              >
                <option value="newest">Sort by</option>
                <option value="newest">Newest</option>
                <option value="name_asc">A to Z</option>
                <option value="name_desc">Z to A</option>
                <option value="price_low">Price, Low to High</option>
                <option value="price_high">Price, High to Low</option>
                <option value="popular">Popularity</option>
              </select>
              <ListFilter size={14} className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 text-black pointer-events-none md:w-5 md:h-5" />
              <ChevronDown size={14} className="absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none md:w-4 md:h-4" />
            </div>
          </div>

          {/* Grid - Tighter gaps on mobile */}
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[300px] md:h-[500px] animate-pulse rounded-xl bg-gray-100" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {products.map(p => (
                <ProductCard key={p.id} product={p} onLikeToggle={handleLikeToggle} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg md:text-xl text-gray-500 font-nexa">No products found matching your criteria.</p>
              <button onClick={clearFilters} className="mt-4 text-sm md:text-base text-brand underline font-bold">Clear filters</button>
            </div>
          )}

          {/* Pagination - Compact */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-10 md:mt-16 flex justify-center gap-1.5 md:gap-3">
              <button 
                disabled={filters.page === 1}
                onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}
                className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-300 md:border-2 font-bold text-gray-600 transition hover:border-black hover:text-black disabled:opacity-50"
              >
                <ChevronLeft size={14} className="md:w-[18px] md:h-[18px]" />
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                if (pageNum === 1 || pageNum === totalPages || (pageNum >= filters.page - 1 && pageNum <= filters.page + 1)) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setFilters(f => ({ ...f, page: pageNum }))}
                      className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full font-nexa text-xs md:text-base font-bold transition ${filters.page === pageNum ? 'bg-black text-white' : 'border border-gray-300 md:border-2 text-gray-600 hover:border-black hover:text-black'}`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (pageNum === filters.page - 2 || pageNum === filters.page + 2) {
                  return <span key={pageNum} className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center text-xs md:text-base font-bold text-gray-400">...</span>;
                }
                return null;
              })}

              <button 
                disabled={filters.page === totalPages}
                onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
                className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-gray-300 md:border-2 font-bold text-gray-600 transition hover:border-black hover:text-black disabled:opacity-50"
              >
                <ChevronRight size={14} className="md:w-[18px] md:h-[18px]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-bold">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}