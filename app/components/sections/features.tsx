"use client";

import { motion } from "framer-motion";
import { 
  Zap, Shield, BarChart, Clock, Users, Settings
} from "lucide-react";

const features = [
  {
    name: "Lightning Fast",
    description:
      "Our platform is built for performance, ensuring quick load times and responsive interactions for a seamless user experience.",
    icon: Zap,
  },
  {
    name: "Enterprise Security",
    description:
      "Bank-level security with end-to-end encryption, regular security audits, and compliance with industry standards to keep your data safe.",
    icon: Shield,
  },
  {
    name: "Advanced Analytics",
    description:
      "Gain valuable insights with comprehensive dashboards and reporting tools that help you make data-driven decisions.",
    icon: BarChart,
  },
  {
    name: "Time Saving",
    description:
      "Automate repetitive tasks and streamline workflows to save your team valuable time and focus on what matters most.",
    icon: Clock,
  },
  {
    name: "Team Collaboration",
    description:
      "Built-in collaboration features that make it easy for teams to work together, share information, and stay aligned.",
    icon: Users,
  },
  {
    name: "Fully Customizable",
    description:
      "Adapt the platform to your specific needs with extensive customization options and flexible configuration settings.",
    icon: Settings,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FeaturesSection() {
  return (
    <div id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            Powerful Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to boost your productivity
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive suite of features is designed to help your business grow 
            and succeed in today's competitive landscape.
          </p>
        </div>
        <motion.div 
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div 
                key={feature.name} 
                className="flex flex-col"
                variants={item}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
} 