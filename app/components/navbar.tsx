"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/app/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./theme-switcher";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { 
    name: "Solutions", 
    href: "#",
    submenu: [
      { name: "For Teams", href: "#" },
      { name: "For Enterprise", href: "#" },
      { name: "For Startups", href: "#" },
    ] 
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleSubmenuToggle = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300 ease-in-out",
      scrolled
        ? "bg-white/95 shadow-md backdrop-blur-sm dark:bg-black dark:shadow-dark-lg"
        : "bg-white/90 border-b border-gray-100 dark:bg-black dark:border-gray-800"
    )}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <motion.div 
          className="flex lg:flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">Mosecure</span>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl font-bold text-primary-600 dark:text-yellow-400">Mosecure</span>
            </motion.div>
          </Link>
        </motion.div>
        
        <div className="flex lg:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            className="-m-2.5 ml-2 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-yellow-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <motion.div 
          className="hidden lg:flex lg:gap-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => handleSubmenuToggle(item.name)}
                    className={cn(
                      "inline-flex items-center text-sm font-semibold leading-6 text-gray-900 dark:text-yellow-400 hover:text-primary-600 dark:hover:text-yellow-300",
                      openSubmenu === item.name && "text-primary-600 dark:text-yellow-300"
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        openSubmenu === item.name ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md bg-white dark:bg-black py-2 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-yellow-500/30 focus:outline-none"
                      >
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-black/70"
                            onClick={() => setOpenSubmenu(null)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-semibold leading-6 transition-colors duration-200",
                    isActive(item.href)
                      ? "text-primary-600 dark:text-yellow-300"
                      : "text-gray-900 dark:text-yellow-400 hover:text-primary-600 dark:hover:text-yellow-300"
                  )}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div 
                      className="h-0.5 bg-primary-600 dark:bg-yellow-400 mt-0.5"
                      layoutId="navbar-active-indicator"
                    />
                  )}
                </Link>
              )}
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ThemeSwitcher />
          <Link href="/auth/login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                className="transition-all duration-300 ease-in-out dark:text-yellow-400 dark:border-yellow-500 dark:hover:bg-black hover:shadow-md"
              >
                Log in
              </Button>
            </motion.div>
          </Link>
          <Link href="/auth/signup">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="transition-all duration-300 ease-in-out bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 dark:from-yellow-500 dark:to-yellow-600 dark:text-gray-900 dark:hover:from-yellow-400 dark:hover:to-yellow-500 hover:shadow-lg"
              >
                Sign up
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:ring-yellow-500/30"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5" onClick={closeMenu}>
                  <span className="sr-only">Mosecure</span>
                  <span className="text-xl font-bold text-primary-600 dark:text-yellow-400">Mosecure</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-yellow-400"
                  onClick={closeMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10 dark:divide-yellow-500/20">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        {item.submenu ? (
                          <div>
                            <button
                              onClick={() => handleSubmenuToggle(item.name)}
                              className="flex w-full items-center justify-between rounded-lg py-2 text-base font-semibold leading-7 text-gray-900 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-dark-800"
                            >
                              {item.name}
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 transition-transform duration-200",
                                  openSubmenu === item.name ? "rotate-180" : ""
                                )}
                              />
                            </button>
                            <AnimatePresence>
                              {openSubmenu === item.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-4 mt-2 space-y-2">
                                    {item.submenu.map((subitem) => (
                                      <Link
                                        key={subitem.name}
                                        href={subitem.href}
                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-dark-800"
                                        onClick={closeMenu}
                                      >
                                        {subitem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-dark-800",
                              isActive(item.href)
                                ? "text-primary-600 dark:text-yellow-300"
                                : "text-gray-900 dark:text-yellow-400"
                            )}
                            onClick={closeMenu}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="py-6 space-y-3">
                    <Link href="/auth/login" onClick={closeMenu}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button className="w-full border-gray-300 dark:border-yellow-500 dark:text-yellow-400 dark:hover:bg-black hover:shadow-md" variant="outline">Log in</Button>
                      </motion.div>
                    </Link>
                    <Link href="/auth/signup" onClick={closeMenu}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 dark:from-yellow-500 dark:to-yellow-600 dark:text-gray-900">Sign up</Button>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 