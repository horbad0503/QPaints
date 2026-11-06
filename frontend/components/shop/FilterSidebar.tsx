"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Filter } from "lucide-react";

const CATEGORIES = ["All", "Matte", "Satin", "Gloss"];
const STOCKS = ["In Stock", "Out of Stock"];
const SIZES = ["Small", "Medium", "Large"];
const COLORS = [
  { name: "red", hex: "#ff0000" },
  { name: "orange", hex: "#ffa500" },
  { name: "lime", hex: "#00ff00" },
  { name: "cyan", hex: "#00ffff" },
  { name: "blue", hex: "#0000ff" },
  { name: "deeppink", hex: "#ff1493" },
  { name: "pink", hex: "#ffc0cb" },
  { name: "aquamarine", hex: "#7fffd4" },
  { name: "magenta", hex: "#ff00ff" },
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "gold", hex: "#ffd700" },
];

export function FilterSidebar({ filters, setFilters, clearFilters }: { filters: any, setFilters: any, clearFilters: any }) {
  
  const toggleFilter = (key: string, value: string) => {
    if (key === 'category' && value === 'All') {
      setFilters((prev: any) => ({ ...prev, category: [], page: 1 }));
      return;
    }
    
    setFilters((prev: any) => {
      const current = prev[key];
      const isSelected = current.includes(value);
      const updated = isSelected ? current.filter((v: string) => v !== value) : [...current, value];
      return { ...prev, [key]: updated, page: 1 };
    });
  };

  return (
    <aside className="w-full shrink-0 lg:w-[280px] border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 mb-6 lg:pb-0 lg:mb-0 lg:pr-8">
      
      <div className="flex items-center gap-2 md:gap-3 border-b border-gray-100 pb-2 md:pb-4 mb-3 md:mb-6">
        <Filter size={18} className="text-black md:w-6 md:h-6" fill="black" />
        <h2 className="font-nexa text-lg md:text-2xl font-black text-black">Filters</h2>
      </div>

      <div className="flex items-center justify-between mb-4 md:mb-8">
        <h3 className="font-nexa text-sm md:text-lg font-bold text-black">Applied Filters</h3>
        <button onClick={clearFilters} className="text-xs md:text-sm font-bold text-black underline underline-offset-4 hover:text-brand">clear all</button>
      </div>

      {/* Category */}
      <details className="group border-b border-gray-100 pb-2 md:pb-4 mb-2 md:mb-4" open>
        <summary className="flex cursor-pointer list-none items-center justify-between font-nexa text-sm md:text-lg font-bold text-black mb-2 md:mb-4">
          Category
          <span className="transition group-open:rotate-180">
            <ChevronUp size={16} className="md:w-5 md:h-5" />
          </span>
        </summary>
        <div className="space-y-2 md:space-y-4 pt-1 md:pt-2">
          {CATEGORIES.map(c => {
            const isChecked = c === 'All' ? filters.category.length === 0 : filters.category.includes(c);
            return (
              <label key={c} className="flex cursor-pointer items-center gap-3 md:gap-4 text-xs md:text-[17px] text-gray-800">
                <input 
                  type="checkbox" 
                  checked={isChecked} 
                  onChange={() => toggleFilter('category', c)}
                  className="h-5 w-5 md:h-7 md:w-7 appearance-none rounded border border-black md:border-2 checked:bg-black checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjIwIDYgOSAxNyA0IDEyIj48L3BvbHlsaW5lPjwvc3ZnPg==')] checked:bg-center checked:bg-no-repeat checked:bg-[length:12px_12px] md:checked:bg-[length:16px_16px]"
                />
                {c}
              </label>
            );
          })}
        </div>
      </details>

      {/* Stock Status */}
      <details className="group border-b border-gray-100 pb-2 md:pb-4 mb-2 md:mb-4" open>
        <summary className="flex cursor-pointer list-none items-center justify-between font-nexa text-sm md:text-lg font-bold text-black mb-2 md:mb-4">
          Stock Status
          <span className="transition group-open:rotate-180">
            <ChevronUp size={16} className="md:w-5 md:h-5" />
          </span>
        </summary>
        <div className="space-y-2 md:space-y-4 pt-1 md:pt-2">
          {STOCKS.map(s => (
            <label key={s} className="flex cursor-pointer items-center gap-3 md:gap-4 text-xs md:text-[17px] text-gray-800">
              <input 
                type="checkbox" 
                checked={filters.stock.includes(s)} 
                onChange={() => toggleFilter('stock', s)}
                className="h-5 w-5 md:h-7 md:w-7 appearance-none rounded border border-black md:border-2 checked:bg-black checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjIwIDYgOSAxNyA0IDEyIj48L3BvbHlsaW5lPjwvc3ZnPg==')] checked:bg-center checked:bg-no-repeat checked:bg-[length:12px_12px] md:checked:bg-[length:16px_16px]"
              />
              {s}
            </label>
          ))}
        </div>
      </details>

      {/* Size */}
      <details className="group border-b border-gray-100 pb-2 md:pb-4 mb-2 md:mb-4">
        <summary className="flex cursor-pointer list-none items-center justify-between font-nexa text-sm md:text-lg font-bold text-black mb-2 md:mb-4">
          Size
          <span className="transition group-open:rotate-180">
            <ChevronUp size={16} className="md:w-5 md:h-5" />
          </span>
        </summary>
        <div className="space-y-2 md:space-y-4 pt-1 md:pt-2">
          {SIZES.map(s => (
            <label key={s} className="flex cursor-pointer items-center gap-3 md:gap-4 text-xs md:text-[17px] text-gray-800">
              <input 
                type="checkbox" 
                checked={filters.size.includes(s)} 
                onChange={() => toggleFilter('size', s)}
                className="h-5 w-5 md:h-7 md:w-7 appearance-none rounded border border-black md:border-2 checked:bg-black checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjIwIDYgOSAxNyA0IDEyIj48L3BvbHlsaW5lPjwvc3ZnPg==')] checked:bg-center checked:bg-no-repeat checked:bg-[length:12px_12px] md:checked:bg-[length:16px_16px]"
              />
              {s}
            </label>
          ))}
        </div>
      </details>

      {/* Color */}
      <details className="group pb-2 md:pb-4" open>
        <summary className="flex cursor-pointer list-none items-center justify-between font-nexa text-sm md:text-lg font-bold text-black mb-2 md:mb-4">
          Color
          <span className="transition group-open:rotate-180">
            <ChevronUp size={16} className="md:w-5 md:h-5" />
          </span>
        </summary>
        <div className="flex flex-wrap gap-2 md:gap-3 pt-1 md:pt-2">
          {COLORS.map(c => (
            <button
              key={c.name}
              onClick={() => toggleFilter('color', c.name)}
              className={`relative flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border border-gray-400 transition hover:scale-110 ${filters.color.includes(c.name) ? 'ring-2 ring-black ring-offset-1 md:ring-offset-2' : ''}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            >
              {filters.color.includes(c.name) && (
                <svg width="10" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-3 md:h-2.5">
                  <path d="M4.75047 7.903L2.14797 5.3005C1.85547 5.008 1.38297 5.008 1.09047 5.3005C0.797969 5.593 0.797969 6.0655 1.09047 6.358L4.22547 9.493C4.51797 9.7855 4.99047 9.7855 5.28297 9.493L13.218 1.558C13.5105 1.2655 13.5105 0.793003 13.218 0.500503C12.9255 0.208003 12.453 0.208003 12.1605 0.500503L4.75047 7.903Z" fill={c.name === 'white' ? '#000' : '#fff'}/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </details>
    </aside>
  );
}