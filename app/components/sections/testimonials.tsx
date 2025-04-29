"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    content:
      "This platform has completely transformed our workflow. The intuitive interface and powerful features have boosted our team's productivity by over 40%.",
    author: {
      name: "Sarah Johnson",
      role: "CTO at TechDynamics",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
  },
  {
    content:
      "After trying several different solutions, we finally found this SaaS platform. The customization options and responsive support team have made it an invaluable tool for our business.",
    author: {
      name: "Michael Chen",
      role: "Operations Director at Innovate Inc",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  },
  {
    content:
      "The analytics feature alone has helped us identify key opportunities that we were missing. Within three months, we've seen a 25% increase in conversion rates.",
    author: {
      name: "Emily Rodriguez",
      role: "Marketing Manager at GrowthFocus",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by businesses worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.map((testimonial, testimonialIdx) => (
              <motion.div
                key={testimonialIdx}
                className="pt-8 sm:inline-block sm:w-full sm:px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: testimonialIdx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <figure className="rounded-2xl bg-white p-8 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <blockquote className="text-gray-900">
                    <p>{`"${testimonial.content}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                      src={testimonial.author.image}
                      alt=""
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                      <div className="text-gray-600">{`${testimonial.author.role}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 