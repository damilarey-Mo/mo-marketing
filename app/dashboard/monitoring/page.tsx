"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Users, 
  Shield, 
  AlertTriangle, 
  Plus,
  Trash2,
  ExternalLink,
  Bell,
  Activity,
  Clock,
  ChartBar,
  Map,
  UserCheck,
  UserX,
  Filter
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/select";

interface Project {
  id: string;
  name: string;
  url: string;
  status: "healthy" | "warning" | "critical";
  lastChecked: string;
  uptime: number;
  activeUsers: number;
  securityScore: number;
  monitoringSettings: {
    userTracking: boolean;
    securityAlerts: boolean;
    performanceMonitoring: boolean;
    notificationThreshold: NotificationThreshold;
  };
}

type NotificationThreshold = "all" | "high" | "critical";

interface SecurityEvent {
  id: string;
  projectId: string;
  type: "login" | "error" | "attack" | "vulnerability" | "user_activity";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: string;
  ip?: string;
  location?: string;
  user?: string;
  userAgent?: string;
}

interface UserActivity {
  id: string;
  projectId: string;
  userId: string;
  username: string;
  action: string;
  page: string;
  timestamp: string;
  sessionDuration?: number;
  ip: string;
  location: string;
}

export default function MonitoringDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<{
    name: string;
    url: string;
    monitoringSettings: {
      userTracking: boolean;
      securityAlerts: boolean;
      performanceMonitoring: boolean;
      notificationThreshold: NotificationThreshold;
    };
  }>({ 
    name: "", 
    url: "",
    monitoringSettings: {
      userTracking: true,
      securityAlerts: true,
      performanceMonitoring: true,
      notificationThreshold: "all"
    }
  });
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  // Mock data generation
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: "1",
        name: "Main Website",
        url: "https://example.com",
        status: "healthy",
        lastChecked: new Date().toISOString(),
        uptime: 99.9,
        activeUsers: 150,
        securityScore: 85,
        monitoringSettings: {
          userTracking: true,
          securityAlerts: true,
          performanceMonitoring: true,
          notificationThreshold: "all"
        }
      },
      {
        id: "2",
        name: "Customer Portal",
        url: "https://portal.example.com",
        status: "warning",
        lastChecked: new Date().toISOString(),
        uptime: 98.5,
        activeUsers: 75,
        securityScore: 72,
        monitoringSettings: {
          userTracking: true,
          securityAlerts: true,
          performanceMonitoring: true,
          notificationThreshold: "all"
        }
      }
    ];

    const mockEvents: SecurityEvent[] = [
      {
        id: "1",
        projectId: "1",
        type: "login",
        severity: "low",
        description: "Multiple failed login attempts",
        timestamp: new Date().toISOString(),
        ip: "192.168.1.1",
        location: "New York, US",
        user: "john.doe@example.com",
        userAgent: "Mozilla/5.0 (Macintosh)"
      },
      {
        id: "2",
        projectId: "1",
        type: "attack",
        severity: "high",
        description: "SQL Injection attempt detected",
        timestamp: new Date().toISOString(),
        ip: "45.33.22.11",
        location: "Unknown",
        userAgent: "Python-urllib/3.8"
      }
    ];

    const mockUserActivities: UserActivity[] = [
      {
        id: "1",
        projectId: "1",
        userId: "user1",
        username: "John Doe",
        action: "Logged in",
        page: "/dashboard",
        timestamp: new Date().toISOString(),
        sessionDuration: 1200,
        ip: "192.168.1.1",
        location: "New York, US"
      },
      {
        id: "2",
        projectId: "1",
        userId: "user2",
        username: "Jane Smith",
        action: "Updated profile",
        page: "/settings",
        timestamp: new Date().toISOString(),
        sessionDuration: 300,
        ip: "192.168.1.2",
        location: "Los Angeles, US"
      }
    ];

    setProjects(mockProjects);
    setEvents(mockEvents);
    setUserActivities(mockUserActivities);
  }, []);

  const handleAddProject = () => {
    if (!newProject.name || !newProject.url) return;

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      url: newProject.url,
      status: "healthy",
      lastChecked: new Date().toISOString(),
      uptime: 100,
      activeUsers: 0,
      securityScore: 100,
      monitoringSettings: newProject.monitoringSettings
    };

    setProjects([...projects, project]);
    setNewProject({ 
      name: "", 
      url: "", 
      monitoringSettings: {
        userTracking: true,
        securityAlerts: true,
        performanceMonitoring: true,
        notificationThreshold: "high"
      }
    });
    setShowAddProject(false);
  };

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "healthy": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "critical": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getSeverityColor = (severity: SecurityEvent["severity"]) => {
    switch (severity) {
      case "critical": return "text-red-500";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  const filteredEvents = events.filter(event => {
    if (filterSeverity !== "all" && event.severity !== filterSeverity) return false;
    if (filterType !== "all" && event.type !== filterType) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-yellow-400">Website Monitoring</h1>
        <Button
          onClick={() => setShowAddProject(true)}
          className="bg-black text-yellow-400 border border-yellow-400/20 hover:bg-yellow-900/10"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Add Project Modal */}
      {showAddProject && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-white dark:bg-black border border-gray-200 dark:border-yellow-900/20 rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-yellow-400">Add New Project</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-yellow-400 mb-1">Project Name</label>
              <Input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="My Website"
                className="bg-gray-50 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-yellow-400 mb-1">Website URL</label>
              <Input
                type="url"
                value={newProject.url}
                onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                placeholder="https://example.com"
                className="bg-gray-50 dark:bg-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-yellow-400">Monitoring Settings</label>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={newProject.monitoringSettings.userTracking}
                    onChange={(e) => setNewProject({
                      ...newProject,
                      monitoringSettings: {
                        ...newProject.monitoringSettings,
                        userTracking: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-yellow-400 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-yellow-400">Track User Activity</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={newProject.monitoringSettings.securityAlerts}
                    onChange={(e) => setNewProject({
                      ...newProject,
                      monitoringSettings: {
                        ...newProject.monitoringSettings,
                        securityAlerts: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-yellow-400 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-yellow-400">Enable Security Alerts</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={newProject.monitoringSettings.performanceMonitoring}
                    onChange={(e) => setNewProject({
                      ...newProject,
                      monitoringSettings: {
                        ...newProject.monitoringSettings,
                        performanceMonitoring: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-yellow-400 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-yellow-400">Monitor Performance</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-yellow-400 mb-1">
                  Notification Threshold
                </label>
                <Select
                  value={newProject.monitoringSettings.notificationThreshold}
                  onChange={(e) => setNewProject({
                    ...newProject,
                    monitoringSettings: {
                      ...newProject.monitoringSettings,
                      notificationThreshold: e.target.value as NotificationThreshold
                    }
                  })}
                  className="mt-2"
                >
                  <option value="all">All Events</option>
                  <option value="high">High Priority Only</option>
                  <option value="critical">Critical Only</option>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowAddProject(false)}
                className="border-gray-300 dark:border-yellow-900/20 dark:text-yellow-400"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProject}
                className="bg-black text-yellow-400 border border-yellow-400/20 hover:bg-yellow-900/10"
              >
                Add Project
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-black border border-gray-200 dark:border-yellow-900/20 rounded-lg shadow-sm p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-yellow-400">{project.name}</h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 dark:text-yellow-400/60 hover:text-primary-600 dark:hover:text-yellow-400 flex items-center mt-1"
                >
                  {project.url}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className={`flex items-center ${getStatusColor(project.status)}`}>
                <Activity className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium capitalize">{project.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-yellow-400/60">Uptime</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-yellow-400">{project.uptime}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-yellow-400/60">Active Users</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-yellow-400">{project.activeUsers}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-yellow-400/60">Security Score</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-yellow-400">{project.securityScore}/100</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-yellow-400/60">Last Checked</p>
                <p className="text-sm text-gray-900 dark:text-yellow-400">
                  {new Date(project.lastChecked).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-gray-600 dark:text-yellow-400">User Tracking {project.monitoringSettings.userTracking ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-gray-600 dark:text-yellow-400">Security Alerts {project.monitoringSettings.securityAlerts ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex items-center text-sm">
                <ChartBar className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-gray-600 dark:text-yellow-400">Performance Monitoring {project.monitoringSettings.performanceMonitoring ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProject(project.id)}
                className="text-gray-700 dark:text-yellow-400 border-gray-300 dark:border-yellow-900/20 hover:bg-gray-50 dark:hover:bg-yellow-900/10"
              >
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* User Activity */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-yellow-900/20 rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-yellow-900/20">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-yellow-400">Recent User Activity</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-yellow-900/20">
          {userActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <UserCheck className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-yellow-400">
                      {activity.username} - {activity.action}
                    </p>
                    <div className="mt-1 text-sm text-gray-500 dark:text-yellow-400/60">
                      <span className="mr-3">Page: {activity.page}</span>
                      <span className="mr-3">IP: {activity.ip}</span>
                      <span className="mr-3">Location: {activity.location}</span>
                      <span>{new Date(activity.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                {activity.sessionDuration && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-green-800 bg-green-100 dark:text-green-400 dark:bg-green-900/20">
                    Session: {Math.floor(activity.sessionDuration / 60)}m
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-yellow-900/20 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-yellow-900/20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-yellow-400">Recent Security Events</h2>
            <div className="flex items-center space-x-4">
              <Select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="w-32"
              >
                <option value="all">All Severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </Select>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-32 ml-2"
              >
                <option value="all">All Types</option>
                <option value="login">Login</option>
                <option value="error">Error</option>
                <option value="attack">Attack</option>
                <option value="vulnerability">Vulnerability</option>
                <option value="user_activity">User Activity</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-yellow-900/20">
          {filteredEvents.map((event) => (
            <div key={event.id} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${getSeverityColor(event.severity)}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-yellow-400">{event.description}</p>
                    <div className="mt-1 text-sm text-gray-500 dark:text-yellow-400/60">
                      <span className="mr-3">IP: {event.ip}</span>
                      <span className="mr-3">Location: {event.location}</span>
                      {event.user && <span className="mr-3">User: {event.user}</span>}
                      {event.userAgent && <span className="mr-3">Agent: {event.userAgent}</span>}
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  getSeverityColor(event.severity)
                } bg-${event.severity === 'critical' ? 'red' : event.severity === 'high' ? 'orange' : event.severity === 'medium' ? 'yellow' : 'blue'}-100 dark:bg-opacity-10`}>
                  {event.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 