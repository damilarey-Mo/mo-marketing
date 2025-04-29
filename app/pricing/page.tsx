import PricingSection from "@/app/components/sections/pricing";
import CTASection from "@/app/components/sections/cta";

export const metadata = {
  title: "Pricing - SaaSify",
  description: "Flexible pricing plans for teams of all sizes",
};

export default function PricingPage() {
  return (
    <div className="pt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that works best for you and your team. All plans come with a 14-day money-back guarantee.
          </p>
        </div>
      </div>
      <PricingSection />
      <CTASection />
    </div>
  );
} 