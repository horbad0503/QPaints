import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GreenRewards() {
  return (
    <section className="bg-brand-cream py-10 md:py-16">
      <div className="container-shop">
        <div className="grid items-center gap-6 md:gap-8 overflow-hidden rounded-2xl bg-white p-5 md:p-8 md:p-12 md:grid-cols-2">
          <div>
            <h2 className="font-nexa text-2xl md:text-4xl font-black text-brand-ink">
              Join Qualitas<br />Green Rewards
            </h2>
            <p className="mt-3 md:mt-4 font-nexa text-sm md:text-base font-light text-gray-700">
              Return your empty paint containers and earn points towards your next purchase. Together, we can reduce waste and create a more sustainable future.
            </p>
            <Link href="/register" className="mt-5 md:mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-cta px-5 md:px-6 py-2.5 md:py-3 font-nexa text-sm md:text-base font-bold text-brand-ink shadow-cta transition hover:-translate-y-0.5 hover:shadow-cta-hover">
              Join Now <ArrowRight size={16} className="md:w-4 md:h-4" />
            </Link>
          </div>
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/Rectangle 6511.png`} alt="Green rewards" className="w-full rounded-xl object-cover" />
        </div>
      </div>
    </section>
  );
}