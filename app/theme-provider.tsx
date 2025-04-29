"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark"); // Default to dark theme
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Once mounted, we can safely access the window object
    setMounted(true);

    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    
    // If it exists, use it. Otherwise use dark as default
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Set to dark by default, NOT based on system preference
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

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

  // Prevent flash of incorrect theme
  useEffect(() => {
    // On first mount, immediately add dark class to avoid flash
    document.documentElement.classList.add("dark");
  }, []);
  
  const contextValue = {
    theme,
    setTheme,
  };

  // Don't render children until after initial client-side hydration
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 