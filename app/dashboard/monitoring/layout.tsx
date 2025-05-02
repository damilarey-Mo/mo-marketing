"use client";

import ToolsLayout from "../tools/layout";

export default function MonitoringLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ToolsLayout>{children}</ToolsLayout>;
} 