import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/app/lib/utils";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { ThemeProvider } from "@/app/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaSify - Modern SaaS Marketing Template",
  description: "A modern SaaS marketing template built with Next.js, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(
        inter.className,
        "min-h-screen bg-white dark:bg-black text-gray-900 dark:text-yellow-400"
      )}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
