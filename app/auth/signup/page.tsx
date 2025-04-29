"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Github, Mail, Lock, User, ArrowRight, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "@/app/components/theme-switcher";

export default function SignupPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formState.password) {
      newErrors.password = "Password is required";
    } else if (formState.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      // In a real app, you would make an API call to your auth endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard on success
      router.push("/dashboard");
    } catch (error) {
      setErrors({ form: "An error occurred during signup. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicators
  const passwordStrengthChecks = [
    { 
      label: "At least 8 characters", 
      check: formState.password.length >= 8,
    },
    { 
      label: "Contains a number", 
      check: /\d/.test(formState.password),
    },
    { 
      label: "Contains uppercase & lowercase", 
      check: /[A-Z]/.test(formState.password) && /[a-z]/.test(formState.password),
    },
  ];

  const formAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-dark-900">
      <motion.div
        className="absolute top-4 right-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ThemeSwitcher />
      </motion.div>
      <motion.div 
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:shadow-dark-lg dark:border dark:border-yellow-500/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <motion.div 
          className="text-center"
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-yellow-400 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-yellow-400/80">
            Start your free 14-day trial, no credit card required
          </p>
        </motion.div>

        <AnimatePresence>
          {errors.form && (
            <motion.div 
              className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-4 rounded-md text-sm border border-red-200 dark:border-red-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.form}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          variants={formAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4">
            <motion.div variants={itemAnimation}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full name
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.name ? "border-red-300 ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400"
                  } rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 sm:text-sm`}
                  placeholder="John Doe"
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemAnimation}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-300 ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400"
                  } rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 sm:text-sm`}
                  placeholder="you@example.com"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemAnimation}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formState.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? "border-red-300 ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400"
                  } rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {formState.password && (
                  <motion.div 
                    className="mt-2 space-y-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {passwordStrengthChecks.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <motion.div 
                          className={`flex-shrink-0 ${item.check ? 'text-green-500 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: item.check ? 1 : 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="h-4 w-4" />
                        </motion.div>
                        <p className={`ml-2 text-xs ${item.check ? 'text-green-700 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemAnimation}>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm password
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" aria-hidden="true" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.confirmPassword ? "border-red-300 ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400"
                  } rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200 sm:text-sm`}
                  placeholder="••••••••"
                />
              </div>
              <AnimatePresence>
                {errors.confirmPassword && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div className="flex items-center" variants={itemAnimation}>
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
              I agree to the{" "}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">
                Privacy Policy
              </a>
            </label>
          </motion.div>

          <motion.div variants={itemAnimation}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-md text-white font-medium bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed dark:from-yellow-500 dark:to-yellow-600 dark:text-gray-900 dark:hover:from-yellow-400 dark:hover:to-yellow-500"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white dark:text-gray-900" />
              ) : (
                "Create account"
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        <motion.div 
          className="mt-6"
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-8"
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
        >
          <p className="text-sm text-gray-600 dark:text-yellow-400/80">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors duration-200">
              Sign in <ArrowRight className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 