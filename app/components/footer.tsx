"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Send,
  Check
} from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const navigation = {
  product: [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Integrations", href: "#" },
    { name: "Updates", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Community", href: "#" },
    { name: "Support", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "GitHub",
      href: "#",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Top section with logo and newsletter */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-primary-600">SaaSify</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-md">
              Streamline your workflow and boost productivity with our comprehensive 
              platform designed for modern teams.
            </p>
          </div>
          
          <div className="lg:ml-auto lg:max-w-md">
            <h3 className="text-base font-semibold text-gray-900">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Get the latest updates, articles, and resources delivered to your inbox.
            </p>
            
            {submitted ? (
              <div className="mt-4 flex items-center text-sm text-green-600">
                <Check className="mr-2 h-5 w-5" />
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 sm:flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:flex-shrink-0">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center"
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                    {!loading && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Main navigation columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul role="list" className="mt-4 space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900">Headquarters</h3>
            <address className="mt-4 not-italic text-sm text-gray-600">
              123 Market Street<br />
              Suite 456<br />
              San Francisco, CA 94103<br />
              United States
            </address>
            <p className="mt-4 text-sm text-gray-600">
              <strong>Contact:</strong><br />
              <a href="mailto:info@saasify.com" className="hover:text-primary-600 transition-colors">
                info@saasify.com
              </a><br />
              <a href="tel:+15551234567" className="hover:text-primary-600 transition-colors">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>
        
        {/* Bottom section with social icons and copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-center text-xs leading-5 text-gray-500 md:order-1 md:mt-0 md:text-left">
              &copy; {new Date().getFullYear()} SaaSify, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}