"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Shield,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Bell
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/contexts/auth-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, isAdmin, userName, logout } = useAuth();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "Tools", href: "/#tools" },
    ...(isLoggedIn ? [{ name: "Dashboard", href: "/dashboard" }] : []),
    ...(isAdmin ? [{ name: "Admin", href: "/admin" }] : []),
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-black/95 border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Shield className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl font-bold text-yellow-400">Mosecure</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-yellow-400 ${
                  pathname === item.href ? "text-yellow-400" : "text-yellow-400/70"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
                  asChild
                >
                  <Link href="/login">Log In</Link>
                </Button>
                <Button
                  className="bg-yellow-400 text-black hover:bg-yellow-500"
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className="p-2 text-yellow-400/70 hover:text-yellow-400"
                    onClick={() => {}}
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                  <button
                    className="flex items-center space-x-2 text-yellow-400/70 hover:text-yellow-400"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <User className="h-5 w-5" />
                    <span>{userName || "User"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black border border-yellow-400/20"
                  >
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/10"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/10"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/10"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-yellow-400/70 hover:text-yellow-400"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black border-b border-yellow-400/20">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "text-yellow-400 bg-yellow-400/10"
                    : "text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!isLoggedIn ? (
              <div className="space-y-2 pt-2">
                <Button
                  variant="outline"
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
                  asChild
                >
                  <Link href="/login">Log In</Link>
                </Button>
                <Button
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  href="/profile"
                  className="flex items-center px-3 py-2 text-base text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/5"
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-3 py-2 text-base text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/5"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-base text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/5"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
} 