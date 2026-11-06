import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutCard() {
  return (
    <section className="container-shop py-8 md:py-16">
      <div className="flex flex-col overflow-hidden rounded-[20px] bg-[#1B50C1] lg:flex-row lg:items-center">
        <div className="p-6 md:p-10 lg:w-1/2 lg:p-16">
          <h2 className="font-nexa text-2xl md:text-4xl font-black italic text-white lg:text-5xl">About us</h2>
          <p className="mt-3 md:mt-6 font-nexa text-sm md:text-lg font-light leading-relaxed text-white">
            At Qualitas, we believe beautiful spaces shouldn't cost the Earth. Our eco-friendly paints combine stunning aesthetics with environmental responsibility, creating a sustainable future one wall at a time.
          </p>
          <Link href="/about" className="mt-5 md:mt-8 inline-flex items-center gap-2 md:gap-3 rounded-md bg-brand-cta px-5 md:px-8 py-2.5 md:py-3 font-nexa text-sm md:text-lg font-bold text-black shadow-cta transition hover:-translate-y-0.5 hover:shadow-cta-hover">
            Learn our story <ArrowRight size={16} className="md:w-5 md:h-5" />
          </Link>
        </div>
        <div className="lg:w-1/2 p-4 md:p-6 lg:p-0 lg:pr-6 lg:py-6">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/image.png`} alt="Our team" className="h-full w-full rounded-xl object-cover" />
        </div>
      </div>
    </section>
  );
}