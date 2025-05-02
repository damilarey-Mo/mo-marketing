"use client";

import { AuthProvider } from "@/app/contexts/auth-context";
import { ThemeProvider } from "@/app/theme-provider";
import ClientLayout from "@/app/client-layout";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ClientLayout>
          {children}
        </ClientLayout>
      </ThemeProvider>
    </AuthProvider>
  );
} 