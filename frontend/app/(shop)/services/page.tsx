import { VideoHero } from "@/components/services/VideoHero";
import { asset } from "@/lib/format";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="bg-[#f9f9f9]">
      
      {/* 1. Hire a Professional */}
      <VideoHero
        title="Hire a Professional Today"
        description="Transform your space with Qualitas certified painters. Our experts bring years of experience and eco-conscious techniques to every project."
        buttonText="Book a Consultation Now"
        thumbnailUrl={asset("/thumbnails/Rectangle 6511.png")}
        videoUrl="/videos/[Waploaded_40115]Gran_Turismo_2023.mkv"
        bgColor="bg-[#FFF7E4]"
      />

      {/* 2. Paint a Greener Future */}
      <VideoHero
        title="Paint a Greener Future"
        description="Join our innovative recycling program and help us reduce paint waste while earning rewards for your eco-conscious choices."
        buttonText="Join Us Today"
        thumbnailUrl={asset("/thumbnails/Rectangle 6512.png")}
        videoUrl="/videos/Taken_2_2012[_45009]-1.mkv"
        bgColor="bg-[#f9f9f9]"
      />

      {/* 3. Why Choose Us & Stats */}
      <section className="bg-[#FFF7E4] py-16 md:py-24">
        <div className="container-shop text-center">
          <h2 className="font-nexa text-2xl md:text-4xl font-black italic text-[#1B50C1] mb-10 md:mb-16">
            Why Choose Us
          </h2>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-24 max-w-5xl mx-auto">
            {[
              { img: "/images/Rectangle 6556 (1).png", title: "Eco-Certified Excellence", desc: "All Qualitas products meet international environmental standards" },
              { img: "/images/Rectangle 6556 (2).png", title: "Expert Application", desc: "Professionally trained painters with attention to detail" },
              { img: "/images/Rectangle 6556 (3).png", title: "Lifetime Color Support", desc: "Free color consultation and touch-up advice" }
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={benefit.img} alt={benefit.title} className="w-full max-w-[330px] h-[220px] md:h-[250px] object-cover rounded-2xl mb-4 md:mb-6 shadow-sm" />
                <h3 className="font-nexa font-bold text-base md:text-lg text-[#1b3b2e] mb-2">{benefit.title}</h3>
                <p className="font-nexa text-xs md:text-sm text-gray-700 max-w-[280px] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats Box */}
          <div className="bg-[#0047B3] rounded-xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-around py-8 md:py-12 px-4 shadow-lg">
            <div className="text-white text-center mb-6 md:mb-0">
              <h3 className="font-nexa text-3xl md:text-5xl font-black mb-2">100 +</h3>
              <p className="font-nexa text-sm md:text-lg font-light">House Painted</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/30"></div>
            <div className="text-white text-center mb-6 md:mb-0">
              <h3 className="font-nexa text-3xl md:text-5xl font-black mb-2">10 Years</h3>
              <p className="font-nexa text-sm md:text-lg font-light">of Global Experience</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/30"></div>
            <div className="text-white text-center">
              <h3 className="font-nexa text-3xl md:text-5xl font-black mb-2">25 +</h3>
              <p className="font-nexa text-sm md:text-lg font-light">Cities Across Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="bg-white py-16 md:py-24">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-nexa text-2xl md:text-4xl font-black italic text-black mb-2">Testimonials</h2>
          <p className="font-nexa text-sm md:text-lg text-gray-600">What our customers say about us!</p>
        </div>

        {/* Gray Background Container */}
        <div className="bg-[#EBEBEB] py-12 md:py-20 px-4">
          <div className="container-shop max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex-1 max-w-md mx-auto md:mx-0">
                <p className="font-nexa text-sm md:text-base text-gray-800 leading-relaxed mb-6">
                  Return your empty paint containers and earn points towards your next purchase. Together, we can reduce
                </p>
                <div className="flex items-center gap-3">
                  <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/testimonials/Group 1000007357.png`} alt="User" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-nexa font-bold text-xs md:text-sm text-black">Collins Igisogba</p>
                    <p className="font-nexa text-[10px] md:text-xs text-gray-500">COO, Shoprite Inc Lekki</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link href="/testimonials" className="group inline-flex items-center gap-3 rounded-lg bg-brand-cta px-8 md:px-10 py-3 md:py-4 font-nexa text-sm md:text-base font-bold text-black shadow-cta transition hover:-translate-y-1 hover:bg-brand-cta-hover hover:shadow-cta-hover">
            View More Testimonials 
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

    </div>
  );
}