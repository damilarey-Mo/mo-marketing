"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isToolDetail = pathname !== "/dashboard/tools";

  useEffect(() => {
    // Add scroll detection
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      {/* Back button for tool detail pages */}
      {isToolDetail && (
        <div className={`
          sticky top-16 z-40 
          bg-white dark:bg-black border-b border-gray-200 dark:border-yellow-900/20
          py-2 px-4 sm:px-6 lg:px-8
          ${scrolled ? "shadow-sm" : ""}
        `}>
          <div className="max-w-7xl mx-auto">
            <Link href="/dashboard/tools" passHref>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-600 dark:text-yellow-400 hover:text-gray-900 dark:hover:text-yellow-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      <main className="pt-4">
        {children}
      </main>
    </div>
  );
} 