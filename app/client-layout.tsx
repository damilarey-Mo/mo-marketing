"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { cn } from "@/app/lib/utils";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [pathname]); // Re-check when pathname changes
  
  // Only hide navbar on auth pages (login/signup)
  const shouldShowNavbar = !pathname.startsWith("/auth");
  
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main className={cn(
        "min-h-screen",
        shouldShowNavbar ? "pt-16" : ""
      )}>
        {children}
      </main>
      <Footer />
    </>
  );
} 