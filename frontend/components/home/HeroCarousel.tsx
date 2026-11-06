"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/format";

const slides = [
  { image: "/images/Frame 1000007522.png", text: "Colour", color: "text-[#F44336]" },
  { image: "/images/Frame 1000007523.png", text: "Style", color: "text-[#FFBE00]" },
  { image: "/images/Frame 1000007524.png", text: "Beauty", color: "text-green-500" },
  { image: "/images/Frame 1000007521.png", text: "Allure", color: "text-[#F44336]" },
];

export function HeroCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-[80vh] min-h-[400px] md:min-h-[600px] overflow-hidden bg-gray-100">
      {slides.map((s, i) => (
        <img key={i} src={asset(s.image)} alt="" className={"absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 " + (i === idx ? "opacity-100" : "opacity-0")} />
      ))}
      <div className="absolute inset-0 bg-white/30" />
      <div className="container-shop relative z-10 flex h-full items-center pt-10 md:pt-20">
        <div className="max-w-3xl">
          <h1 className="font-nexa text-3xl font-black leading-[1.1] text-black md:text-[5rem]">
            Transform Your Space with{" "}
            <em className={`font-nexa font-black italic ${slides[idx].color} transition-colors duration-500`}>{slides[idx].text}</em>
            <br />and Expertise
          </h1>
          <p className="mt-3 md:mt-6 max-w-lg font-nexa text-sm md:text-xl font-normal text-black">
            Qualitas Eco Paint brings you premium sustainable paints that care for your home and our planet
          </p>
          <Link href="/services" className="mt-6 md:mt-10 inline-flex w-full max-w-xs md:max-w-md items-center justify-between rounded-md bg-brand-cta px-4 md:px-8 py-2.5 md:py-4 font-nexa text-sm md:text-xl font-bold text-black shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-cta-hover md:gap-12">
            Book a Consultation <ArrowRight size={18} className="md:w-7 md:h-7" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
      <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-10 flex items-center gap-2 md:gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={"transition-all duration-300 " + (i === idx ? "h-2 md:h-3 w-8 md:w-16 rounded-full bg-[#4D4C4C]" : "h-2 md:h-3 w-2 md:w-3 rounded-full bg-[#4D4C4C]/30 hover:bg-[#4D4C4C]/50")} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}