import { ArrowRight } from "lucide-react";

const offers = [
  { title: "Interior Painting", image: "/images/Group 1000007388.png", classes: "md:col-span-1" },
  { title: "Exterior Painting", image: "/images/Rectangle 6546.png", classes: "md:col-span-1" },
  { title: "Wallpaper", image: "/images/Rectangle 6540.png", classes: "md:col-span-1 md:row-span-2" },
  { title: "Wood & Metal Painting", image: "/images/Rectangle 6539.png", classes: "md:col-span-2" },
];

export function OfferGrid() {
  return (
    <section className="container-shop py-10 md:py-16">
      <h2 className="mb-6 md:mb-12 text-center font-nexa text-2xl md:text-4xl font-black italic text-brand">What We Offer</h2>
      <div className="grid gap-3 md:gap-4 md:grid-cols-3">
        {offers.map((offer, i) => (
          <div key={i} className={`group relative overflow-hidden rounded-xl ${offer.classes}`}>
            <img src={offer.image} alt={offer.title} className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10 w-[60%] cursor-pointer rounded-lg bg-[#E8E8E8]/90 p-2.5 md:p-3 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out group-hover/label:w-[250px] group-hover/label:bg-[#E8E8E8] group-hover/label:p-4 group/label">
              <h3 className="font-nexa text-[11px] md:text-[13px] font-bold text-gray-900 transition-all duration-300 group-hover/label:text-[15px]">{offer.title}</h3>
              <div className="h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover/label:mt-2 group-hover/label:h-auto group-hover/label:opacity-100">
                <p className="mb-2 md:mb-3 font-nexa text-[9px] md:text-[11px] leading-tight text-gray-700">At Qualitas, we believe beautiful spaces shouldn't...</p>
                <button className="flex items-center gap-1 md:gap-2 rounded bg-[#FFBE00] px-2 md:px-3 py-1 md:py-1.5 font-nexa text-[10px] md:text-xs font-bold text-black shadow-sm transition hover:bg-[#ffd95b]">
                  Learn More <ArrowRight size={10} className="md:w-[14px] md:h-[14px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}