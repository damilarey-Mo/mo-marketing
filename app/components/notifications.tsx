"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, AlertTriangle, Shield, Activity } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  timestamp: string;
  read: boolean;
  projectId?: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Security Alert",
        message: "Multiple failed login attempts detected from IP 192.168.1.1",
        type: "warning",
        timestamp: new Date().toISOString(),
        read: false,
        projectId: "1"
      },
      {
        id: "2",
        title: "Critical Security Issue",
        message: "SQL Injection attempt blocked on Customer Portal",
        type: "error",
        timestamp: new Date().toISOString(),
        read: false,
        projectId: "2"
      }
    ];

    setNotifications(mockNotifications);
    updateUnreadCount(mockNotifications);
  }, []);

  const updateUnreadCount = (notifs: Notification[]) => {
    setUnreadCount(notifs.filter(n => !n.read).length);
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <Shield className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <Activity className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5 text-gray-600 dark:text-yellow-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-96 bg-white dark:bg-black border border-gray-200 dark:border-yellow-900/20 rounded-lg shadow-lg z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-yellow-900/20 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-yellow-400">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-sm text-gray-600 dark:text-yellow-400 hover:text-gray-900 dark:hover:text-yellow-300"
                  >
                    Mark all as read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-600 dark:text-yellow-400 hover:text-gray-900 dark:hover:text-yellow-300"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-yellow-400/60">
                  No notifications
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-yellow-900/20">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-yellow-900/10 cursor-pointer ${
                        !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-yellow-400">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-yellow-400/60">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-400 dark:text-yellow-400/40">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 