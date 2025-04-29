import HeroSection from "@/app/components/sections/hero";
import FeaturesSection from "@/app/components/sections/features";
import TestimonialsSection from "@/app/components/sections/testimonials";
import PricingSection from "@/app/components/sections/pricing";
import CTASection from "@/app/components/sections/cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
