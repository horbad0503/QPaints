"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { asset } from "@/lib/format";

const cards = [
  { image: "/category/Rectangle 6511.png", title: "Sahel Sunrise" },
  { image: "/category/Rectangle 6512.png", title: "Interior Harmony" },
  { image: "/category/Rectangle 6513.png", title: "Interior Harmony" },
];

export function PaintCollection() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => { ref.current?.scrollBy({ left: dir * 280, behavior: "smooth" }); };

  return (
    <section className="container-shop py-10 md:py-16">
      <h2 className="mb-6 md:mb-12 text-center font-nexa text-2xl md:text-4xl font-black italic text-brand">Premium Eco-Collection</h2>
      <div className="relative">
        <div ref={ref} className="flex snap-x snap-mandatory gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {cards.map((c, i) => (
            <div key={i} className="w-[240px] md:w-[320px] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition hover:shadow-lg">
              <img src={asset(c.image)} alt={c.title} className="aspect-[4/3] w-full object-cover" />
              <div className="p-4 md:p-6">
                <h3 className="font-nexa text-lg md:text-xl font-bold text-brand">{c.title}</h3>
                <p className="mt-1 md:mt-2 font-nexa text-xs md:text-sm text-gray-600">Professional Painting Services<br/>That Care</p>
                <div className="mt-4 md:mt-6 flex justify-end">
                  <Link href="/products" className="text-brand transition hover:translate-x-1"><ArrowRight size={20} className="md:w-6 md:h-6" strokeWidth={2} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 md:mt-6 flex justify-end gap-2 md:gap-3">
          <button onClick={() => scroll(-1)} className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#7B7B7B] text-white opacity-70 transition hover:bg-brand hover:opacity-100"><ChevronLeft size={20} className="md:w-6 md:h-6" /></button>
          <button onClick={() => scroll(1)} className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#7B7B7B] text-white opacity-70 transition hover:bg-brand hover:opacity-100"><ChevronRight size={20} className="md:w-6 md:h-6" /></button>
        </div>
      </div>
    </section>
  );
}