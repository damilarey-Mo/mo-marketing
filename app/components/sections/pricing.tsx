"use client";

import { useState } from "react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

type FrequencyOption = "monthly" | "annually";

const frequencies = [
  { value: "monthly" as FrequencyOption, label: "Monthly", priceSuffix: "/month" },
  { value: "annually" as FrequencyOption, label: "Annually", priceSuffix: "/year" },
];

type PriceTier = {
  name: string;
  id: string;
  href: string;
  price: {
    monthly: string;
    annually: string;
  };
  description: string;
  features: string[];
  mostPopular: boolean;
};

const tiers: PriceTier[] = [
  {
    name: "Starter",
    id: "starter",
    href: "#",
    price: { monthly: "$29", annually: "$290" },
    description: "Everything necessary to get started with your business.",
    features: [
      "5 team members",
      "20GB storage",
      "Basic analytics",
      "Email support",
      "Basic integration",
    ],
    mostPopular: false,
  },
  {
    name: "Business",
    id: "business",
    href: "#",
    price: { monthly: "$79", annually: "$790" },
    description: "Perfect for growing businesses that need more features.",
    features: [
      "Unlimited team members",
      "100GB storage",
      "Advanced analytics",
      "Priority email support",
      "Advanced integrations",
      "Custom workflows",
      "API access",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "enterprise",
    href: "#",
    price: { monthly: "$199", annually: "$1,990" },
    description: "Complete solution for large enterprises with advanced needs.",
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "Enterprise analytics",
      "24/7 dedicated support",
      "Enterprise integrations",
      "Custom workflows",
      "API access",
      "Custom reporting",
      "Single sign-on (SSO)",
      "Dedicated account manager",
    ],
    mostPopular: false,
  },
];

export default function PricingSection() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Plans for teams of all sizes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the perfect plan for your needs. Always flexible to grow with your business.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="relative flex rounded-full bg-gray-100 p-1">
            {frequencies.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "relative w-32 rounded-full py-2 text-sm font-semibold transition",
                  option.value === frequency.value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                )}
                onClick={() => setFrequency(option)}
              >
                {option.label}
                {option.value === frequency.value && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white"
                    layoutId="frequency-selection"
                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                tier.mostPopular
                  ? "ring-2 ring-primary-600"
                  : "ring-1 ring-gray-200",
                "rounded-3xl p-8"
              )}
            >
              <h3
                className={cn(
                  tier.mostPopular ? "text-primary-600" : "text-gray-900",
                  "text-lg font-semibold leading-8"
                )}
              >
                {tier.name}
              </h3>
              {tier.mostPopular && (
                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </p>
              )}
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.price[frequency.value]}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  {frequency.priceSuffix}
                </span>
              </p>
              <Button
                variant={tier.mostPopular ? "default" : "outline"}
                className="mt-6 w-full"
              >
                Get started
              </Button>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className={cn(
                        "h-6 w-5 flex-none",
                        tier.mostPopular ? "text-primary-600" : "text-gray-400"
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 