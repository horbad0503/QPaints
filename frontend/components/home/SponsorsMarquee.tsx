import { asset } from "@/lib/format";

export function SponsorsMarquee() {
  const logos = ["/partners/Jumia-Logo 1.png", "/partners/TGI-LOGO-Edited 1.png", "/partners/forscout 1.png"];
  const doubled = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];
  return (
    <section className="overflow-hidden bg-white py-4 md:py-8">
      <div className="flex w-max animate-marquee items-center gap-10 md:gap-24 px-6 md:px-12">
        {doubled.map((src, i) => <img key={i} src={asset(src)} alt="Partner" className="h-6 md:h-12 w-auto object-contain" />)}
        {doubled.map((src, i) => <img key={`dup-${i}`} src={asset(src)} alt="Partner" className="h-6 md:h-12 w-auto object-contain" />)}
      </div>
    </section>
  );
}