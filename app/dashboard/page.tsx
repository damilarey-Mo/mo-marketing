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
  AlertTriangle,
  Wrench as Tool,
  Search,
  FileWarning,
  Globe,
  Lock,
  Code,
  Key,
  Database,
  Network
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import ThemeSwitcher from "@/app/components/theme-switcher";
import CybersecurityDashboard from "@/app/dashboard/cybersecurity";
import { cn } from "@/app/lib/utils";
import { tools } from "@/app/lib/tools";

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
              Mosecure
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
              href="/dashboard/tools"
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-yellow-400 hover:text-primary-700 dark:hover:text-yellow-300 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
            >
              <Tool className="mr-3 h-5 w-5 text-gray-400 dark:text-yellow-400/60 group-hover:text-primary-500 dark:group-hover:text-yellow-400" aria-hidden="true" />
              Security Tools
            </Link>
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
        <div className="flex-1 min-w-0 overflow-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Dashboard heading */}
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-yellow-400">
                  Welcome back, {userName}
                </h1>
                
                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.name}
                      className="bg-white dark:bg-black overflow-hidden shadow rounded-lg border border-gray-200 dark:border-yellow-900/20"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <stat.icon className="h-6 w-6 text-gray-400 dark:text-yellow-400" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-yellow-400/60 truncate">{stat.name}</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900 dark:text-yellow-400">{stat.value}</div>
                              <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {stat.change}
                              </div>
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Security Tools */}
                <div className="bg-white dark:bg-black shadow rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-yellow-400">Security Tools</h3>
                    <Link href="/dashboard/tools" passHref>
                      <Button className="bg-black text-yellow-400 border border-yellow-400/20 hover:bg-yellow-900/10 text-sm">
                        View All Tools
                      </Button>
                    </Link>
                  </div>
                  <div className="border-t border-gray-200 dark:border-yellow-900/20 px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {tools.slice(0, 6).map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link href={`/dashboard/tools/${tool.id}`} key={tool.id} passHref>
                            <div className="p-4 border border-gray-200 dark:border-yellow-900/20 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-yellow-900/10 transition-colors duration-200 flex items-start">
                              <div className={`p-2 rounded-md ${tool.color.replace('text-', 'bg-') + '/10'} mr-3`}>
                                <Icon className={`h-5 w-5 ${tool.color}`} />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-yellow-400">{tool.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-yellow-400/70 mt-1">{tool.description}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Link href="/dashboard/tools" passHref>
                        <Button variant="outline" className="text-yellow-400 border border-yellow-400/20 hover:bg-yellow-900/10">
                          Explore All Security Tools
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activities */}
                <div className="bg-white dark:bg-black shadow rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-yellow-400">Recent Security Activities</h3>
                  </div>
                  <div className="border-t border-gray-200 dark:border-yellow-900/20">
                    <ul className="divide-y divide-gray-200 dark:divide-yellow-900/20">
                      {recentActivities.map((activity) => (
                        <li key={activity.id} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                  <span className="text-gray-500 dark:text-yellow-400 text-sm font-medium">{activity.user.charAt(0)}</span>
                                </div>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-yellow-400">{activity.user}</p>
                                <p className="text-sm text-gray-500 dark:text-yellow-400/70">{activity.action}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500 dark:text-yellow-400/60">{activity.time}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="bg-white dark:bg-black shadow rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-yellow-400">Quick Actions</h3>
                  </div>
                  <div className="border-t border-gray-200 dark:border-yellow-900/20 px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <Link href="/dashboard/tools/vulnerability-scanner" passHref>
                        <Button 
                          className="w-full flex items-center justify-center py-6 bg-black text-yellow-400 border border-yellow-400/20 hover:bg-yellow-900/10"
                        >
                          <Search className="mr-2 h-5 w-5 text-blue-500" />
                          Scan for Vulnerabilities
                        </Button>
                      </Link>
                      <Link href="/dashboard/tools/url-scanner" passHref>
                        <Button 
                          className="w-full flex items-center justify-center py-6 bg-black text-yellow-400 border border-yellow-400/20 hover:bg-yellow-900/10"
                        >
                          <Globe className="mr-2 h-5 w-5 text-green-500" />
                          Check URL Safety
                        </Button>
                      </Link>
                      <Link href="/dashboard/tools/malware-detector" passHref>
                        <Button 
                          className="w-full flex items-center justify-center py-6 bg-black text-yellow-400 border border-yellow-400/20 hover:bg-yellow-900/10"
                        >
                          <FileWarning className="mr-2 h-5 w-5 text-red-500" />
                          Scan for Malware
                        </Button>
                      </Link>
                      <Link href="/dashboard/tools/security-advisor" passHref>
                        <Button 
                          className="w-full flex items-center justify-center py-6 bg-black text-yellow-400 border border-yellow-400/20 hover:bg-yellow-900/10"
                        >
                          <Shield className="mr-2 h-5 w-5 text-teal-500" />
                          AI Security Advisor
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "security" && (
              <CybersecurityDashboard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 