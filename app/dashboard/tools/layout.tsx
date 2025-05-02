"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import AdminSidebar from "@/app/components/admin-sidebar";
import Notifications from "@/app/components/notifications";
import ThemeSwitcher from "@/app/components/theme-switcher";

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isToolDetail = pathname !== "/dashboard/tools";
  const [userName, setUserName] = useState("John Doe"); // Mock user data

  useEffect(() => {
    // Add scroll detection
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/auth/login";
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      {/* Header */}
      <header className={`
        fixed top-0 left-0 right-0 z-50 
        bg-white dark:bg-black border-b border-gray-200 dark:border-yellow-900/20
        ${scrolled ? "shadow-sm" : ""}
      `}>
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-600 dark:text-yellow-400 mr-8">
              Mosecure
            </Link>
            {isToolDetail && (
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-gray-600 dark:text-yellow-400 hover:text-gray-900 dark:hover:text-yellow-300"
              >
                <Link href="/dashboard/tools">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Tools
                </Link>
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Notifications />
            <ThemeSwitcher />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-yellow-400">{userName}</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://lh3.googleusercontent.com/a/ACg8ocKqZw0kJW7jBv2xx6wwZiAkZar8rrjX4iZSsqOEUrqgUvba0FMsXyiP1D2MjA8tPTDGZ8UgIODKuJBHFE6u-LwyHqDUo9YG=s576-c-no"
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        <AdminSidebar />
        <div className="flex-1">
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 