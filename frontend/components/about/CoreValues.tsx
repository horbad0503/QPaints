"use client";

import { useState, useEffect } from "react";

const values = [
  { 
    heading: "P - Professionalism", 
    statement: "We uphold the highest standards in product quality, service delivery, and customer relations." 
  },
  { 
    heading: "A - Affordability", 
    statement: "We create premium yet cost-effective painting solutions that meet modern housing demands." 
  },
  { 
    heading: "I - Innovation", 
    statement: "We leverage technology and customer insights to develop cutting-edge, customizable paint solutions." 
  },
  { 
    heading: "N - Nurturing Sustainability", 
    statement: "We champion eco-conscious practices to protect the environment and promote a greener future." 
  },
  { 
    heading: "T - Transparency", 
    statement: "We foster open communication, ensuring our clients are involved in the painting process to guarantee precision and cost efficiency." 
  }
];

export function CoreValues() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % values.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextIndex = (index + 1) % values.length;

  return (
    <div className="relative w-full">
      {/* Active Item */}
      <div 
        key={index} 
        className="animate-slide-up-values relative z-10 border-l-4 border-[#1B50C1] bg-gradient-to-r from-[#1B50C1]/10 to-transparent p-4 md:p-6 rounded-r-lg shadow-sm"
      >
        <h3 className="font-nexa font-black text-sm md:text-xl text-black mb-1 md:mb-2">
          {values[index].heading}
        </h3>
        <p className="font-nexa text-xs md:text-base text-gray-700 leading-relaxed">
          {values[index].statement}
        </p>
      </div>

      {/* Faint Next Item (Peeks from below) */}
      <div className="mt-4 md:mt-6 opacity-30 border-l-4 border-[#1B50C1]/50 pl-4 md:pl-6 py-2">
        <h3 className="font-nexa font-black text-sm md:text-xl text-black mb-1">
          {values[nextIndex].heading}
        </h3>
        <p className="font-nexa text-xs md:text-base text-gray-700 line-clamp-1">
          {values[nextIndex].statement}
        </p>
      </div>
    </div>
  );
}