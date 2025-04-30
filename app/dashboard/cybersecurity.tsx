"use client";

import { useState, useEffect } from "react";
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Eye,
  EyeOff,
  UserX,
  Clock,
  BarChart2,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";

// Mock data for security incidents
const securityIncidents = [
  { id: 1, type: "Suspicious Login", severity: "high", location: "Tokyo, Japan", time: "10 minutes ago", resolved: false },
  { id: 2, type: "Brute Force Attempt", severity: "critical", location: "Moscow, Russia", time: "2 hours ago", resolved: false },
  { id: 3, type: "Multiple Failed Logins", severity: "medium", location: "Berlin, Germany", time: "4 hours ago", resolved: true },
  { id: 4, type: "Data Access Anomaly", severity: "high", location: "Beijing, China", time: "Yesterday", resolved: true },
  { id: 5, type: "API Key Misuse", severity: "low", location: "New York, USA", time: "2 days ago", resolved: true },
];

// Mock data for vulnerabilities
const vulnerabilities = [
  { id: 1, name: "Cross-Site Scripting (XSS)", risk: "high", affected: "User Authentication Form", status: "open" },
  { id: 2, name: "SQL Injection", risk: "critical", affected: "Search API", status: "in-progress" },
  { id: 3, name: "Outdated Dependencies", risk: "medium", affected: "Frontend Libraries", status: "open" },
  { id: 4, name: "Insecure File Upload", risk: "medium", affected: "Profile Image Upload", status: "resolved" },
];

// Mock data for security score
const securityScoreData = {
  overall: 78,
  categories: [
    { name: "Authentication", score: 85 },
    { name: "Data Encryption", score: 92 },
    { name: "Access Control", score: 64 },
    { name: "Vulnerability Management", score: 73 },
  ]
};

// Mock data for security events over time
const securityEvents = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 8 },
  { day: "Wed", count: 15 },
  { day: "Thu", count: 23 },
  { day: "Fri", count: 17 },
  { day: "Sat", count: 6 },
  { day: "Sun", count: 4 },
];

export default function CybersecurityDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSecurityScan, setActiveSecurityScan] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [securityScore, setSecurityScore] = useState(securityScoreData);
  const [incidents, setIncidents] = useState(securityIncidents);
  const [threatMap, setThreatMap] = useState({ active: true });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle starting a security scan
  const startSecurityScan = () => {
    setActiveSecurityScan(true);
    setScanProgress(0);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveSecurityScan(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // After scan completes, simulate finding a new threat
    setTimeout(() => {
      const newIncident = {
        id: Math.floor(Math.random() * 1000),
        type: "Potential Data Exfiltration",
        severity: "high",
        location: "Unknown Location",
        time: "Just now",
        resolved: false
      };
      
      setIncidents(prev => [newIncident, ...prev]);
    }, 6000);
  };

  // Handle resolving a security incident
  const resolveIncident = (id: number) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === id ? { ...incident, resolved: true } : incident
    ));
  };

  // Handle toggling the threat map
  const toggleThreatMap = () => {
    setThreatMap(prev => ({ active: !prev.active }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with security score */}
      <motion.div 
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 rounded-lg shadow-md p-6 text-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Shield className="mr-2 h-6 w-6" />
              Mosecure Command Center
            </h1>
            <p className="mt-1">Monitor and manage your security posture</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{securityScore.overall}%</div>
            <div className="text-sm">Security Score</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-4 gap-2">
          {securityScore.categories.map((category) => (
            <div key={category.name} className="bg-black/10 rounded p-2 text-center">
              <div className="text-sm font-medium">{category.name}</div>
              <div className={`text-lg font-semibold ${
                category.score >= 80 ? 'text-green-800' : 
                category.score >= 60 ? 'text-yellow-800' : 
                'text-red-800'
              }`}>
                {category.score}%
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button
            onClick={startSecurityScan}
            disabled={activeSecurityScan}
            className="bg-black text-yellow-400 hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900"
            size="sm"
          >
            {activeSecurityScan ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Scanning... {scanProgress}%
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Run Security Scan
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Incidents */}
        <motion.div 
          className="bg-black dark:bg-black rounded-lg shadow-md p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-yellow-400">Security Incidents</h2>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 py-1 px-2 rounded-full">
              {incidents.filter(i => !i.resolved).length} Active
            </span>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {incidents.map((incident) => (
              <div 
                key={incident.id} 
                className={`p-3 rounded-lg border ${
                  incident.resolved 
                    ? 'bg-gray-900/10 border-gray-700' 
                    : incident.severity === 'critical'
                    ? 'bg-red-900/20 border-red-800'
                    : incident.severity === 'high'
                    ? 'bg-orange-900/20 border-orange-800'
                    : 'bg-yellow-900/20 border-yellow-800'
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {incident.severity === 'critical' && <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />}
                    {incident.severity === 'high' && <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />}
                    {incident.severity === 'medium' && <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />}
                    {incident.severity === 'low' && <AlertTriangle className="h-5 w-5 text-green-500 mr-2" />}
                    <span className="font-medium text-yellow-400">{incident.type}</span>
                  </div>
                  {!incident.resolved && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 text-xs text-yellow-400 border-yellow-500"
                      onClick={() => resolveIncident(incident.id)}
                    >
                      Resolve
                    </Button>
                  )}
                  {incident.resolved && (
                    <span className="text-xs bg-green-900/20 text-green-500 py-1 px-2 rounded-full flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Resolved
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-yellow-400/80">
                  <div className="flex justify-between">
                    <span>{incident.location}</span>
                    <span className="text-yellow-400/60">{incident.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vulnerability Management */}
        <motion.div 
          className="bg-black dark:bg-black rounded-lg shadow-md p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-yellow-400">Vulnerabilities</h2>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 py-1 px-2 rounded-full">
              {vulnerabilities.filter(v => v.status !== 'resolved').length} Open
            </span>
          </div>
          
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-800">
              <thead>
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-yellow-400/70 uppercase tracking-wider">Vulnerability</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-yellow-400/70 uppercase tracking-wider">Risk</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-yellow-400/70 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {vulnerabilities.map((vuln) => (
                  <tr key={vuln.id} className="hover:bg-gray-900/30">
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-yellow-400">{vuln.name}</div>
                      <div className="text-xs text-yellow-400/60">{vuln.affected}</div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span className={`text-xs py-1 px-2 rounded-full ${
                        vuln.risk === 'critical' ? 'bg-red-900/20 text-red-500' :
                        vuln.risk === 'high' ? 'bg-orange-900/20 text-orange-500' :
                        'bg-yellow-900/20 text-yellow-500'
                      }`}>
                        {vuln.risk}
                      </span>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span className={`text-xs py-1 px-2 rounded-full ${
                        vuln.status === 'resolved' ? 'bg-green-900/20 text-green-500' :
                        vuln.status === 'in-progress' ? 'bg-blue-900/20 text-blue-500' :
                        'bg-red-900/20 text-red-500'
                      }`}>
                        {vuln.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between">
            <Button
              className="bg-yellow-500 text-black hover:bg-yellow-400 dark:bg-yellow-500 dark:hover:bg-yellow-400"
              size="sm"
            >
              <Shield className="mr-2 h-4 w-4" />
              Run Vulnerability Scan
            </Button>
            
            <Button
              variant="outline"
              className="text-yellow-400 border-yellow-500"
              size="sm"
            >
              View All
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Security analytics */}
      <motion.div 
        className="bg-black dark:bg-black rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-yellow-400">Security Analytics</h2>
          <Button
            variant="outline"
            className="text-yellow-400 border-yellow-500"
            size="sm"
            onClick={toggleThreatMap}
          >
            {threatMap.active ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {threatMap.active ? 'Hide Threat Map' : 'Show Threat Map'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event chart */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-400 mb-3">Security Events (7 days)</h3>
              <div className="h-40 flex items-end justify-between">
                {securityEvents.map((day) => (
                  <div key={day.day} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-yellow-500 hover:bg-yellow-400 transition-all rounded-t"
                      style={{ height: `${(day.count / 24) * 100}%` }}
                    ></div>
                    <div className="text-xs text-yellow-400 mt-2">{day.day}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm text-yellow-400/70">85 total security events this week</span>
              </div>
            </div>
          </div>
          
          {/* Threat map */}
          <div className="lg:col-span-2">
            {threatMap.active ? (
              <div className="bg-gray-900/50 rounded-lg p-4 h-full">
                <h3 className="text-sm font-medium text-yellow-400 mb-3">Live Threat Map</h3>
                <div className="bg-gray-900 rounded-lg h-40 relative overflow-hidden">
                  {/* World map background - simplified representation */}
                  <div className="absolute inset-0 opacity-20 bg-yellow-500/10">
                    {/* This would be your actual map in a real implementation */}
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-yellow-400/50 text-xs">World Map Visualization</span>
                    </div>
                  </div>
                  
                  {/* Threat points - these would be positioned on the map */}
                  <div className="absolute h-2 w-2 bg-red-500 rounded-full animate-ping" style={{ top: '30%', left: '20%' }}></div>
                  <div className="absolute h-2 w-2 bg-red-500 rounded-full animate-ping" style={{ top: '40%', left: '75%' }}></div>
                  <div className="absolute h-2 w-2 bg-orange-500 rounded-full animate-ping" style={{ top: '60%', left: '45%' }}></div>
                  <div className="absolute h-2 w-2 bg-yellow-500 rounded-full animate-ping" style={{ top: '25%', left: '50%' }}></div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-2 right-2 bg-black/60 rounded p-1 text-xs">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-red-500 rounded-full mr-1"></div>
                      <span className="text-red-400">Critical</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-orange-500 rounded-full mr-1"></div>
                      <span className="text-orange-400">High</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></div>
                      <span className="text-yellow-400">Medium</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm text-yellow-400/70">
                  <div>4 active threats detected</div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Live updating
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900/50 rounded-lg p-4 h-full flex items-center justify-center">
                <Button
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                  onClick={toggleThreatMap}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Show Threat Map
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Security recommendations */}
      <motion.div 
        className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-start">
          <div className="bg-yellow-500/20 rounded-full p-2 mr-3">
            <Lock className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-yellow-400 font-medium">Security Recommendations</h3>
            <ul className="mt-2 space-y-2 text-sm text-yellow-400/80">
              <li className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-2 text-yellow-400" />
                Enable multi-factor authentication for all administrator accounts
              </li>
              <li className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-2 text-yellow-400" />
                Update your Node.js dependencies to address 3 critical vulnerabilities
              </li>
              <li className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-2 text-yellow-400" />
                Review user access permissions - 5 users have excessive privileges
              </li>
            </ul>
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm"
                className="text-yellow-400 border-yellow-500 hover:bg-yellow-500/10"
              >
                View All Recommendations
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 