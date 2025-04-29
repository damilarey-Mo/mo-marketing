"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

type Theme = "light" | "dark";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // On page load, check for theme in localStorage or system preference
  useEffect(() => {
    // Once mounted, we can safely access the window object
    setMounted(true);

    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    
    // If it exists, use it. Otherwise check system preference
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Check for system dark mode preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // When theme changes, update document and localStorage
  useEffect(() => {
    if (!mounted) return;
    
    // Update localStorage
    localStorage.setItem("theme", theme);
    
    // Update document class for Tailwind dark mode
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "rounded-full p-2 transition-all duration-300 shadow-md hover:shadow-lg",
        theme === "dark" 
          ? "bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-yellow-500" 
          : "bg-gray-700 text-yellow-400 hover:bg-gray-800 border border-gray-600"
      )}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, rotate: 15 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{ 
            opacity: theme === "light" ? 1 : 0,
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 90
          }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            stiffness: 200
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-5 w-5 text-yellow-400" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            opacity: theme === "dark" ? 1 : 0,
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -90
          }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            stiffness: 200
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-5 w-5 text-black" />
        </motion.div>
      </div>
    </motion.button>
  );
} 