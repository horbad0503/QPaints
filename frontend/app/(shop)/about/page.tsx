import { CoreValues } from "@/components/about/CoreValues";
import { SponsorsMarquee } from "@/components/home/SponsorsMarquee";

export default function AboutPage() {
  return (
    <div className="bg-white">
      
      {/* 1. Hero Section */}
      <section className="bg-[#FFF7E4] py-10 md:py-20 px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-nexa text-2xl md:text-4xl font-black italic text-[#1B50C1]">About Qualitas Eco Paint</h1>
        </div>
        <div className="mx-auto max-w-5xl bg-white p-6 md:p-10 rounded-xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="flex-1">
            <p className="font-nexa text-sm md:text-lg text-gray-700 leading-relaxed text-justify">
              Founded on the principle of sustainable beauty, Qualitas Eco Paint has revolutionized the Nigerian painting industry with our commitment to environmental responsibility and premium quality. Our innovative formulations combine cutting-edge eco-friendly technology with stunning aesthetics, proving that sustainability never compromises on style.
            </p>
          </div>
          <div className="hidden md:block w-px bg-gray-100"></div>
          <div className="flex-1">
            <p className="font-nexa text-sm md:text-lg text-gray-700 leading-relaxed text-justify">
              Founded on the principle of sustainable beauty, Qualitas Eco Paint has revolutionized the Nigerian painting industry with our commitment to environmental responsibility and premium quality. Our innovative formulations combine cutting-edge eco-friendly technology with stunning aesthetics, proving that sustainability never compromises on style.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission */}
      <section className="container-shop py-10 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="w-full md:w-1/2">
          <h2 className="font-nexa text-2xl md:text-4xl font-black italic text-[#1B50C1] mb-4 md:mb-6">Vision & Mission</h2>
          <p className="font-nexa text-sm md:text-lg text-gray-700 mb-4 leading-relaxed">
            Our vision is to be Africaâ€™s leading provider of sustainable and affordable painting solutions, transforming spaces with innovation, environmental consciousness, and exceptional customer experiences.
          </p>
          <p className="font-nexa text-sm md:text-lg text-gray-700 leading-relaxed">
            Our mission is to revolutionize the painting industry by providing eco-friendly, high-quality paints and seamless painting solutions that enhance housing affordability, sustainability, and creativity. Through innovation, technology, and customer-centric services, we simplify the painting process while maintaining the highest standards of excellence.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/Rectangle 6536.png`} alt="Painter working" className="rounded-2xl w-full object-cover shadow-lg" />
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-[#FFF7E4] py-10 md:py-20">
        <div className="container-shop flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/Rectangle 6537.png`} alt="Paint cans" className="rounded-2xl w-full object-cover shadow-lg" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-nexa text-2xl md:text-4xl font-black italic text-[#1B50C1] mb-6 md:mb-8">Core Values</h2>
            <CoreValues />
          </div>
        </div>
      </section>

      {/* 4. Gallery - Corrected Layout */}
      <section className="container-shop py-10 md:py-20 text-center">
        <h2 className="font-nexa text-2xl md:text-4xl font-black italic text-[#1B50C1] mb-8 md:mb-12">Our Gallery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          
          {/* Top Left */}
          <div className="md:col-span-1 h-[250px] md:h-[320px] rounded-2xl overflow-hidden shadow-sm">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/gallery/Rectangle 6537@2x.png`} alt="Interior 1" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          
          {/* Top Middle */}
          <div className="md:col-span-1 h-[250px] md:h-[320px] rounded-2xl overflow-hidden shadow-sm">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/gallery/Rectangle 6546.png`} alt="Interior 2" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          
          {/* Right Tall (Spans 2 Rows) */}
          <div className="md:col-span-1 md:row-span-2 h-[250px] md:h-full rounded-2xl overflow-hidden shadow-sm">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/gallery/Rectangle 6540.png`} alt="Interior 3" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          
          {/* Bottom Wide (Spans 2 Columns) */}
          <div className="md:col-span-2 h-[250px] md:h-[320px] rounded-2xl overflow-hidden shadow-sm">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/gallery/Rectangle 6539.png`} alt="Art gallery room" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>

        </div>
      </section>

      {/* 5. Meet the Team */}
      <section className="bg-[#FFF7E4] py-10 md:py-20">
        <div className="container-shop text-center">
          <h2 className="font-nexa text-2xl md:text-4xl font-black italic text-[#1B50C1] mb-8 md:mb-12">Meet the team</h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-4">
            {[
              { img: "/team/Rectangle 6557.png", name: "John Doe", role: "Independent Non-Executive" },
              { img: "/team/Rectangle 6558.png", name: "Jane Smith", role: "Marketing Manager" },
              { img: "/team/Rectangle 6559.png", name: "Mike Johnson", role: "Lead Developer" },
              { img: "/team/Rectangle 65591.png", name: "Charles Victor", role: "Project Manager" }
            ].map((member, i) => (
              <div key={i} className="group relative w-full md:w-[190px] h-[350px] rounded-xl overflow-hidden transition-all duration-500 md:hover:w-[350px] shadow-sm hover:shadow-xl mx-auto md:mx-0">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-all duration-500 md:group-hover:object-fill" />
                
                {/* Info Box */}
                <div className="absolute bottom-[5%] md:bottom-[10%] left-1/2 -translate-x-1/2 w-[75%] bg-[#d0c6c4] rounded-xl p-2 md:p-3 text-center opacity-100 md:opacity-0 md:translate-y-5 md:group-hover:left-1/2 md:group-hover:-translate-y-0 md:group-hover:opacity-100 transition-all duration-500 shadow-md">
                  <h3 className="font-nexa font-black text-xs md:text-sm text-[#1B50C1] mb-1">{member.name}</h3>
                  <p className="text-[10px] text-gray-700 mb-2">{member.role}</p>
                  <div className="flex justify-center gap-2">
                    <a href="#" className="hover:scale-110 transition"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/Frame 1000007504.png`} alt="Instagram" className="w-4 h-4" /></a>
                    <a href="#" className="hover:scale-110 transition"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/Frame 1000007505.png`} alt="LinkedIn" className="w-4 h-4" /></a>
                    <a href="#" className="hover:scale-110 transition"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/Frame 1000007506.png`} alt="Facebook" className="w-4 h-4" /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sponsors Marquee */}
      <SponsorsMarquee />
      
    </div>
  );
}