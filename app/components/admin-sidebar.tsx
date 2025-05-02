"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle,
  LogOut,
  Shield,
  Wrench,
  Search,
  FileWarning,
  Globe,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { tools } from "@/app/lib/tools";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("tools");

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/auth/login";
  };

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-black border-r border-gray-200 dark:border-yellow-900/20 hidden md:block">
      <nav className="p-4 space-y-2">
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-yellow-400/60 uppercase tracking-wider">
          Main
        </div>
        <Link 
          href="/dashboard"
          className={cn(
            "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
            isActive("/dashboard") && !isActive("/dashboard/tools")
              ? "text-primary-700 dark:text-yellow-300 bg-primary-50 dark:bg-yellow-900/20"
              : "text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
          )}
        >
          <BarChart className={cn(
            "mr-3 h-5 w-5",
            isActive("/dashboard") && !isActive("/dashboard/tools")
              ? "text-primary-500 dark:text-yellow-400"
              : "text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400"
          )} aria-hidden="true" />
          Dashboard
        </Link>

        <div className="px-3 py-2 mt-6 text-xs font-semibold text-gray-500 dark:text-yellow-400/60 uppercase tracking-wider">
          Security Tools
        </div>
        
        {/* Tools Navigation */}
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/dashboard/tools/${tool.id}`}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                isActive(`/dashboard/tools/${tool.id}`)
                  ? "text-primary-700 dark:text-yellow-300 bg-primary-50 dark:bg-yellow-900/20"
                  : "text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
              )}
            >
              <Icon className={cn(
                "mr-3 h-5 w-5",
                isActive(`/dashboard/tools/${tool.id}`)
                  ? tool.color
                  : "text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400"
              )} aria-hidden="true" />
              {tool.name}
            </Link>
          );
        })}

        <div className="px-3 py-2 mt-6 text-xs font-semibold text-gray-500 dark:text-yellow-400/60 uppercase tracking-wider">
          Support
        </div>
        <Link 
          href="#" 
          className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
        >
          <HelpCircle className="mr-3 h-5 w-5 text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400" aria-hidden="true" />
          Help Center
        </Link>
        <Link 
          href="#" 
          className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
        >
          <Settings className="mr-3 h-5 w-5 text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400" aria-hidden="true" />
          Settings
        </Link>
        
        <div className="pt-6">
          <button
            onClick={handleLogout}
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-gray-700 dark:text-yellow-400 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400 dark:text-yellow-400/60 group-hover:text-red-500 dark:group-hover:text-red-400" aria-hidden="true" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
} 