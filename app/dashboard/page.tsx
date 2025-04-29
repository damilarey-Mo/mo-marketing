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
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";

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

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setUserName("John Doe"); // This would come from your auth system
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // In a real app, you would call your logout API
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dashboard header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-600">
              SaaSify
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            <button 
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-800"
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

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 hidden md:block">
          <nav className="p-4 space-y-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </div>
            <Link 
              href="/dashboard" 
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-primary-700 bg-primary-50"
            >
              <BarChart className="mr-3 h-5 w-5 text-primary-500" aria-hidden="true" />
              Dashboard
            </Link>
            <Link 
              href="#" 
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary-700 hover:bg-gray-50"
            >
              <Users className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-500" aria-hidden="true" />
              Team
            </Link>
            <Link 
              href="#" 
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary-700 hover:bg-gray-50"
            >
              <FileText className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-500" aria-hidden="true" />
              Projects
            </Link>
            <Link 
              href="#" 
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary-700 hover:bg-gray-50"
            >
              <Calendar className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-500" aria-hidden="true" />
              Calendar
            </Link>
            
            <div className="px-3 py-2 mt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Support
            </div>
            <Link 
              href="#" 
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary-700 hover:bg-gray-50"
            >
              <HelpCircle className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-500" aria-hidden="true" />
              Help Center
            </Link>
            <Link 
              href="#" 
              className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary-700 hover:bg-gray-50"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary-500" aria-hidden="true" />
              Settings
            </Link>
            
            <div className="pt-6">
              <button
                onClick={handleLogout}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-gray-700 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" aria-hidden="true" />
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome section */}
            <motion.div 
              className="bg-primary-600 rounded-lg shadow-md p-6 text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
              <p className="mt-1">Here's what's happening with your projects today.</p>
              <div className="mt-4">
                <Button
                  className="bg-white text-primary-600 hover:bg-primary-50"
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
                  className="bg-white rounded-lg shadow-sm p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-md bg-primary-100 text-primary-600">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-500">{stat.name}</h2>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
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
                className="bg-white rounded-lg shadow-sm p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-500">{activity.action}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    View all activity
                  </Link>
                </div>
              </motion.div>

              {/* Upcoming events */}
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                          <Calendar className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 