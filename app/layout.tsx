import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootWrapper from "@/app/components/root-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mosecure - Advanced Cybersecurity Platform",
  description: "A cutting-edge cybersecurity platform for enterprise security monitoring and threat detection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-black text-gray-900 dark:text-yellow-400`}>
        <RootWrapper>
          {children}
        </RootWrapper>
      </body>
    </html>
  );
}
