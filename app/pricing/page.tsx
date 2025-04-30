import PricingSection from "@/app/components/sections/pricing";
import CTASection from "@/app/components/sections/cta";

export const metadata = {
  title: "Pricing - Mosecure",
  description: "Enterprise-grade security plans for organizations of all sizes",
};

export default function PricingPage() {
  return (
    <div className="pt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Secure your business with Mosecure
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the security plan that best fits your organization's needs. All plans include 24/7 threat monitoring and a 30-day satisfaction guarantee.
          </p>
        </div>
      </div>
      <PricingSection />
      <CTASection />
    </div>
  );
} 