"use client";

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, Star, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const testimonials = [
  { name: "Sarah K.", role: "Product Manager", rating: 5 },
  { name: "Michael T.", role: "Founder", rating: 5 },
  { name: "Emily R.", role: "Team Lead", rating: 4 },
];

export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
      
      {/* Colorful gradient blob */}
      <div className="absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary-200 to-secondary-200 opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary-200 to-secondary-300 opacity-20 blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <motion.div 
          className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="mt-24 sm:mt-32 lg:mt-16"
            variants={fadeIn}
          >
            <a href="#" className="inline-flex items-center space-x-6">
              <span className="rounded-full bg-gradient-to-r from-primary-600/20 to-secondary-600/20 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-600/10">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Just shipped v2.0</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </motion.div>
          <motion.h1 
            className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            variants={fadeIn}
          >
            <span className="block">
              Streamline your workflow 
            </span>
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              boost productivity
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            Join thousands of teams using our platform to improve efficiency, 
            collaborate seamlessly, and achieve better results.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex gap-4 flex-col sm:flex-row"
            variants={fadeIn}
          >
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get started for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                Sign in
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-10"
            variants={fadeIn}
          >
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex -space-x-2 overflow-hidden">
                {testimonials.map((person, index) => (
                  <img
                    key={index}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${30 + index}.jpg`}
                    alt={person.name}
                  />
                ))}
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4.7 ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill={i < 4.7 ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    4.7/5 from over 2,500+ reviews
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
            variants={fadeIn}
          >
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-primary-500 mr-2" />
              <span className="text-sm text-gray-500">Enterprise-grade security</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary-500 mr-2" />
              <span className="text-sm text-gray-500">Setup in minutes, not hours</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="absolute -top-2 -right-2 h-20 w-20 rounded-full bg-primary-600/10 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-secondary-600/10 blur-3xl"></div>
              <img
                src="https://placehold.co/800x600/eef/ccd?text=SaaS+Dashboard"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
              
              <div className="absolute -bottom-6 -right-6 sm:-bottom-16 sm:-right-16 z-0">
                <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="p-4">
                    <div className="flex items-center gap-x-4">
                      <div className="h-10 w-10 flex-none rounded-full bg-primary-100 flex items-center justify-center">
                        <ArrowRight className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">Monthly visits</p>
                        <p className="text-xs text-gray-500">+38.9% increase</p>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-3xl font-semibold text-gray-900">+1.2M</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 