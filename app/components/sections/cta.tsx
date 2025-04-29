"use client";

import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <div className="bg-primary-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to boost your productivity?
            <br />
            Get started with our platform today.
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of satisfied customers who have transformed their workflow
            with our powerful SaaS platform.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-primary-50"
            >
              Get started
            </Button>
            <Button variant="link" className="text-white">
              Learn more <span aria-hidden="true">→</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 