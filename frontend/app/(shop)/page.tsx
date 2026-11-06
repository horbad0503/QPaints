import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SponsorsMarquee } from "@/components/home/SponsorsMarquee";
import { PaintCollection } from "@/components/home/PaintCollection";
import { AboutCard } from "@/components/home/AboutCard";
import { OfferGrid } from "@/components/home/OfferGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GreenRewards } from "@/components/home/GreenRewards";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <SponsorsMarquee />
      <PaintCollection />
      <AboutCard />
      <OfferGrid />
      <HowItWorks />
      <GreenRewards />
      <TestimonialsSection />
    </>
  );
}