import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { asset } from "@/lib/format";

const testimonials = [
  { text: "Return your empty paint containers and earn points towards your next purchase. Together, we can reduce", name: "Collins Igisogba", role: "COO, Shoprite Inc Lekki", image: "/testimonials/Group 1000007357.png" },
  { text: "Return your empty paint containers and earn points towards your next purchase. Together, we can reduce", name: "Collins Igisogba", role: "COO, Shoprite Inc Lekki", image: "/testimonials/Group 1000007357.png" },
  { text: "Return your empty paint containers and earn points towards your next purchase. Together, we can reduce", name: "Collins Igisogba", role: "COO, Shoprite Inc Lekki", image: "/testimonials/Group 1000007357.png" },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#FFF7E4] py-10 md:py-20">
      <div className="container-shop">
        <h2 className="text-center font-nexa text-2xl md:text-4xl font-black italic text-[#1B50C1]">Testimonials</h2>
        <p className="mt-2 md:mt-3 text-center font-nexa text-sm md:text-xl text-black">What our customers say about us!</p>
        <div className="mt-6 md:mt-14 grid gap-3 md:gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl bg-white p-4 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <p className="font-nexa text-xs md:text-[17px] leading-relaxed text-gray-900">{t.text}</p>
              <div className="mt-4 md:mt-8 flex items-center gap-3 md:gap-4">
                <img src={asset(t.image)} alt={t.name} className="h-10 w-10 md:h-14 md:w-14 rounded-full object-cover bg-gray-200" />
                <div>
                  <p className="font-nexa text-xs md:text-[17px] font-bold text-gray-900">{t.name}</p>
                  <p className="font-nexa text-[10px] md:text-[15px] text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 md:mt-14 flex justify-center">
          <Link href="/testimonials" className="group inline-flex items-center gap-2 md:gap-4 rounded-lg md:rounded-xl bg-brand-cta px-6 md:px-10 py-3 md:py-4 font-nexa text-sm md:text-lg font-bold text-black shadow-cta transition hover:animate-[bounceHover_0.6s_ease-in-out_infinite] hover:bg-brand-cta-hover hover:shadow-cta-hover">
            View More Testimonials <ArrowRight size={16} className="md:w-[22px] md:h-[22px] transition-transform group-hover:translate-x-1 md:group-hover:translate-x-2" />
          </Link>
        </div>
        <div className="mx-auto mt-10 md:mt-20 max-w-3xl rounded-2xl bg-brand-cta p-5 md:p-12 shadow-[0_10px_30px_rgba(255,190,0,0.2)]">
          <h3 className="text-center font-nexa text-base md:text-2xl font-bold text-black">Subscribe and get exclusive deals &amp; offers.</h3>
          <form className="mt-4 md:mt-8 flex flex-col md:flex-row items-center rounded-lg md:rounded-xl bg-white p-1.5 md:p-2 shadow-inner">
            <input type="email" placeholder="Enter your email" className="flex-1 w-full bg-transparent px-3 md:px-4 py-2 md:py-3 font-nexa text-sm md:text-lg text-gray-700 outline-none placeholder:text-gray-400" />
            <button type="submit" className="mt-2 md:mt-0 flex w-full md:w-auto items-center justify-center gap-2 rounded md:rounded-lg bg-[#b8b8b8]/50 px-6 md:px-8 py-2 md:py-3 font-nexa text-sm md:text-lg font-bold text-black transition hover:bg-[#b8b8b8]/80 hover:scale-[1.02] active:scale-95">
              Subscribe <ArrowRight size={14} className="md:w-[18px] md:h-[18px]" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}