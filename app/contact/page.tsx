"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Have questions about our platform or need help getting started? 
          Our team is here to help you.
        </p>
      </div>
      
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Contact Information
          </h2>
          
          <div className="mt-8 space-y-6">
            <div className="flex gap-x-4">
              <MapPin className="h-6 w-6 flex-none text-primary-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Our Location</h3>
                <address className="mt-1 not-italic text-gray-600">
                  123 SaaS Street<br />
                  San Francisco, CA 94103<br />
                  United States
                </address>
              </div>
            </div>
            
            <div className="flex gap-x-4">
              <Phone className="h-6 w-6 flex-none text-primary-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex gap-x-4">
              <Mail className="h-6 w-6 flex-none text-primary-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">support@saasify.com</p>
              </div>
            </div>
            
            <div className="flex gap-x-4">
              <Globe className="h-6 w-6 flex-none text-primary-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Working Hours</h3>
                <p className="mt-1 text-gray-600">
                  Monday - Friday: 9am - 5pm PST<br />
                  Weekend: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Send us a message
          </h2>
          
          {isSubmitted ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Message Sent</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Thank you for contacting us! We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formState.name}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formState.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                    Phone (optional)
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}