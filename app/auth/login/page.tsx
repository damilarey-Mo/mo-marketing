"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Github, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "@/app/components/theme-switcher";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication process
    try {
      // In a real app, you would make an API call to your auth endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard on success
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-dark-900">
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
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-yellow-400 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent">Log in to your account</h1>
          <p className="mt-2 text-gray-600 dark:text-yellow-400/80">Enter your credentials to access your account</p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div 
              className="p-3 bg-red-100 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form 
          onSubmit={handleSubmit} 
          className="mt-8 space-y-6"
          variants={formAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4">
            <motion.div variants={itemAnimation}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-yellow-400">
                Email address
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-primary-500 dark:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-200" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 sm:text-sm dark:bg-gray-700 dark:border-yellow-500/50 dark:placeholder-yellow-500/50 dark:text-yellow-400 dark:focus:ring-yellow-400 dark:focus:border-yellow-400"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>

            <motion.div variants={itemAnimation}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-yellow-400">
                Password
              </label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-hover:text-primary-500 dark:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-200" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 sm:text-sm dark:bg-gray-700 dark:border-yellow-500/50 dark:placeholder-yellow-500/50 dark:text-yellow-400 dark:focus:ring-yellow-400 dark:focus:border-yellow-400"
                  placeholder="••••••••"
                />
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="flex items-center justify-between"
            variants={itemAnimation}
          >
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-yellow-500 dark:bg-gray-700 dark:checked:bg-yellow-500 dark:focus:ring-yellow-400"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-yellow-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/auth/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors duration-200">
                Forgot your password?
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemAnimation}>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed dark:from-yellow-500 dark:to-yellow-600 dark:text-gray-900 dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:focus:ring-yellow-400 transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white dark:text-gray-900" />
              ) : (
                <>
                  Sign in <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
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
              <div className="w-full border-t border-gray-300 dark:border-yellow-500/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-yellow-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-yellow-500/50 dark:text-yellow-400 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <Github className="h-5 w-5" />
              GitHub
            </motion.button>
          </div>
        </motion.div>

        <motion.p 
          className="mt-2 text-center text-sm text-gray-600 dark:text-yellow-400/80"
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
        >
          Don't have an account?{" "}
          <Link href="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500 dark:text-yellow-400 dark:hover:text-yellow-300 hover:underline transition-colors duration-200">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
} 