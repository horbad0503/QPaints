import { ArrowRight } from "lucide-react";

const steps = [
  { title: "Sign up", desc: "Create an account on the Qualitas Eco Paint website to get started." },
  { title: "Choose Your Product/Service", desc: "Explore the range of eco-friendly paint services or products for your project." },
  { title: "Order Product or Request Service", desc: "Choose the products or services required for your project and submit your request." },
  { title: "Receive Price Estimation", desc: "Receive a detailed estimation for the selected products or services tailored to your project." },
];

export function HowItWorks() {
  return (
    <section className="container-shop py-10 md:py-16">
      <div className="grid items-center gap-6 md:gap-10 md:grid-cols-2">
        <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/Rectangle 6547.png`} alt="Room painting" className="w-full rounded-2xl object-cover" />
        <div>
          <h2 className="mb-5 md:mb-8 font-nexa text-2xl md:text-4xl font-black text-brand">How It Works</h2>
          <div className="space-y-4 md:space-y-6">
            {steps.map((s, i) => (
              <div key={i}>
                <p className="flex items-start gap-2 md:gap-3 font-nexa text-sm md:text-lg font-bold">
                  <ArrowRight size={16} className="mt-0.5 md:mt-1 flex-shrink-0 text-brand md:w-5 md:h-5" />
                  {s.title}
                </p>
                <p className="ml-6 md:ml-8 mt-1 font-nexa text-xs md:text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}