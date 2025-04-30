"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BarChart, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Calendar,
  MessageSquare,
  Clock,
  HelpCircle,
  LogOut,
  Shield,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import ThemeSwitcher from "@/app/components/theme-switcher";
import CybersecurityDashboard from "@/app/dashboard/cybersecurity";
import { cn } from "@/app/lib/utils";

// Mock data
const stats = [
  { name: "Total Users", value: "2,543", icon: Users, change: "+12.3%" },
  { name: "Active Projects", value: "48", icon: FileText, change: "+5.4%" },
  { name: "Completion Rate", value: "87%", icon: BarChart, change: "+2.7%" },
  { name: "Support Tickets", value: "14", icon: MessageSquare, change: "-3.2%" },
];

const recentActivities = [
  { id: 1, user: "John Smith", action: "Created a new project", time: "2 hours ago" },
  { id: 2, user: "Sarah Johnson", action: "Added a comment", time: "4 hours ago" },
  { id: 3, user: "David Wilson", action: "Completed a task", time: "yesterday" },
  { id: 4, user: "Emma Brown", action: "Uploaded a file", time: "yesterday" },
  { id: 5, user: "Michael Davis", action: "Updated project status", time: "2 days ago" },
];

const upcomingEvents = [
  { id: 1, title: "Team Meeting", date: "Today, 3:00 PM", type: "meeting" },
  { id: 2, title: "Project Deadline", date: "Tomorrow, 6:00 PM", type: "deadline" },
  { id: 3, title: "Client Call", date: "Thursday, 11:00 AM", type: "call" },
];

// New mock data for security alerts
const securityAlertsData = [
  { id: 1, type: "Suspicious Login", severity: "high", time: "10 minutes ago" },
  { id: 2, type: "Multiple Failed Logins", severity: "medium", time: "1 hour ago" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [alertsCount, setAlertsCount] = useState(2);
  const [showAlerts, setShowAlerts] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(securityAlertsData);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Get user data from localStorage if available
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      } else {
        setUserName("John Doe"); // Default fallback
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Add scroll detection
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // In a real app, you would call your logout API
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    router.push("/auth/login");
  };

  const handleDismissAlert = (id: number) => {
    setAlertsCount(prev => prev - 1);
    setSecurityAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      {/* Dashboard header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur-sm dark:bg-black/95 dark:shadow-yellow-900/20"
          : "bg-white dark:bg-black border-b border-gray-200 dark:border-yellow-900/20"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-600 dark:text-yellow-400">
              SaaSify
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <div className="relative">
              <button 
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-yellow-400 dark:hover:text-yellow-300 focus:outline-none"
                onClick={() => setShowAlerts(!showAlerts)}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                {alertsCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-black"></span>
                )}
              </button>
              
              {/* Alerts dropdown */}
              {showAlerts && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-black rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-yellow-900/20">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-yellow-900/20">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-yellow-400">Security Alerts</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {securityAlerts.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-yellow-400/70">
                        No new alerts
                      </div>
                    ) : (
                      securityAlerts.map(alert => (
                        <div key={alert.id} className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-yellow-900/10">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <AlertTriangle className={`h-4 w-4 mr-2 ${
                                alert.severity === 'high' ? 'text-red-500' : 
                                alert.severity === 'medium' ? 'text-orange-500' : 
                                'text-yellow-500'
                              }`} />
                              <span className="text-sm font-medium text-gray-700 dark:text-yellow-400">{alert.type}</span>
                            </div>
                            <button 
                              className="text-gray-400 hover:text-gray-500 dark:text-yellow-400/50 dark:hover:text-yellow-400"
                              onClick={() => handleDismissAlert(alert.id)}
                            >
                              <span className="sr-only">Dismiss</span>
                              <span className="text-xs">×</span>
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-yellow-400/70 mt-1">{alert.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-yellow-900/20">
                    <Link 
                      href="#"
                      className="text-xs font-medium text-primary-600 dark:text-yellow-400 hover:text-primary-500 dark:hover:text-yellow-300"
                      onClick={() => {
                        setActiveTab("security");
                        setShowAlerts(false);
                      }}
                    >
                      View all alerts
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-yellow-400 hover:text-gray-800 dark:hover:text-yellow-300"
              onClick={handleLogout}
            >
              <span>{userName}</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User avatar"
              />
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white dark:bg-black border-r border-gray-200 dark:border-yellow-900/20 hidden md:block">
          <nav className="p-4 space-y-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-yellow-400/60 uppercase tracking-wider">
              Main
            </div>
            <button 
              onClick={() => setActiveTab("overview")}
              className={`group flex w-full items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "overview" 
                  ? "text-primary-700 dark:text-yellow-300 bg-primary-50 dark:bg-yellow-900/20" 
                  : "text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
              }`}
            >
              <BarChart className={`mr-3 h-5 w-5 ${
                activeTab === "overview" 
                  ? "text-primary-500 dark:text-yellow-400" 
                  : "text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400"
              }`} aria-hidden="true" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`group flex w-full items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === "security" 
                  ? "text-primary-700 dark:text-yellow-300 bg-primary-50 dark:bg-yellow-900/20"
                  : "text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
              }`}
            >
              <Shield className={`mr-3 h-5 w-5 ${
                activeTab === "security" 
                  ? "text-primary-500 dark:text-yellow-400" 
                  : "text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400"
              }`} aria-hidden="true" />
              Security
              {alertsCount > 0 && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                  {alertsCount}
                </span>
              )}
            </button>
            <Link 
              href="#" 
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
            >
              <Users className="mr-3 h-5 w-5 text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400" aria-hidden="true" />
              Team
            </Link>
            <Link 
              href="#" 
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
            >
              <FileText className="mr-3 h-5 w-5 text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400" aria-hidden="true" />
              Projects
            </Link>
            <Link 
              href="#" 
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
            >
              <Calendar className="mr-3 h-5 w-5 text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400" aria-hidden="true" />
              Calendar
            </Link>
            
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

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {activeTab === "overview" && (
              <>
                {/* Welcome section */}
                <motion.div 
                  className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-yellow-600 dark:to-yellow-700 rounded-lg shadow-md p-6 text-white dark:text-black mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
                  <p className="mt-1">Here's what's happening with your projects today.</p>
                  
                  {alertsCount > 0 && (
                    <div className="mt-3 p-2 bg-red-500/20 dark:bg-black/20 rounded-md flex items-center">
                      <AlertTriangle className="h-5 w-5 text-white dark:text-black mr-2" />
                      <span className="text-sm">
                        You have {alertsCount} security {alertsCount === 1 ? 'alert' : 'alerts'} that require your attention
                      </span>
                      <Button
                        className="ml-auto bg-white/20 hover:bg-white/30 text-white dark:bg-black/30 dark:hover:bg-black/40 dark:text-black text-xs"
                        size="sm"
                        onClick={() => setActiveTab("security")}
                      >
                        View Alerts
                      </Button>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Button
                      className="bg-white text-primary-600 hover:bg-primary-50 dark:bg-black dark:hover:bg-gray-900 dark:text-yellow-400"
                      size="sm"
                    >
                      Create New Project
                    </Button>
                  </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                  {stats.map((stat, index) => (
                    <motion.div 
                      key={stat.name}
                      className="bg-white dark:bg-black rounded-lg shadow-sm dark:shadow-yellow-900/20 p-6 border border-gray-100 dark:border-yellow-900/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-3 rounded-md bg-primary-100 dark:bg-yellow-500/20 text-primary-600 dark:text-yellow-400">
                          <stat.icon className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <h2 className="text-sm font-medium text-gray-500 dark:text-yellow-400/70">{stat.name}</h2>
                          <p className="text-2xl font-semibold text-gray-900 dark:text-yellow-400">{stat.value}</p>
                          <p className={`text-sm ${
                            stat.change.startsWith('+') 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {stat.change}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Two column layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Recent activity */}
                  <motion.div 
                    className="bg-white dark:bg-black rounded-lg shadow-sm dark:shadow-yellow-900/20 p-6 border border-gray-100 dark:border-yellow-900/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h2 className="text-lg font-medium text-gray-900 dark:text-yellow-400 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 dark:bg-yellow-400"></div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-yellow-400">{activity.user}</p>
                            <p className="text-sm text-gray-500 dark:text-yellow-400/80">{activity.action}</p>
                            <p className="text-xs text-gray-400 dark:text-yellow-400/60">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link href="#" className="text-sm font-medium text-primary-600 dark:text-yellow-400 hover:text-primary-500 dark:hover:text-yellow-300">
                        View all activity
                      </Link>
                    </div>
                  </motion.div>

                  {/* Upcoming events */}
                  <motion.div 
                    className="bg-white dark:bg-black rounded-lg shadow-sm dark:shadow-yellow-900/20 p-6 border border-gray-100 dark:border-yellow-900/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h2 className="text-lg font-medium text-gray-900 dark:text-yellow-400 mb-4">Upcoming Events</h2>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className={`p-2 rounded-md ${
                              event.type === 'meeting' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                              event.type === 'deadline' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                              'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            }`}>
                              <Calendar className="h-4 w-4" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-yellow-400">{event.title}</p>
                            <p className="text-sm text-gray-500 dark:text-yellow-400/70">{event.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link href="#" className="text-sm font-medium text-primary-600 dark:text-yellow-400 hover:text-primary-500 dark:hover:text-yellow-300">
                        View calendar
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <CybersecurityDashboard />
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 