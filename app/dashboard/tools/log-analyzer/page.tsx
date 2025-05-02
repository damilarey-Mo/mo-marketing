"use client";

import { useState } from "react";
import { FileText, AlertTriangle, CheckCircle, Info, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";

interface LogEvent {
  timestamp: string;
  level: "info" | "warning" | "error";
  source: string;
  message: string;
  details?: string;
}

interface SecurityThreat {
  type: string;
  description: string;
  severity: "high" | "medium" | "low";
  events: LogEvent[];
  recommendation: string;
}

interface AnalysisResult {
  totalEvents: number;
  suspiciousEvents: number;
  threats: SecurityThreat[];
  summary: {
    errors: number;
    warnings: number;
    info: number;
  };
  timeRange: {
    start: string;
    end: string;
  };
}

export default function LogAnalyzer() {
  const [logs, setLogs] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const analyzeLogs = async () => {
    if (!logs.trim()) {
      setError("Please enter or upload logs to analyze");
      return;
    }

    try {
      setError("");
      setResult(null);
      setAnalyzing(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate mock analysis results
      const mockResult = generateMockAnalysis(logs);
      setResult(mockResult);
    } catch (err) {
      setError("An error occurred during analysis. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const generateMockAnalysis = (logContent: string): AnalysisResult => {
    // Mock log parsing and analysis
    const lines = logContent.split("\n").filter(line => line.trim());
    const totalEvents = lines.length;
    
    // Generate mock events
    const events: LogEvent[] = lines.map((line, index) => {
      const timestamp = new Date(Date.now() - Math.random() * 86400000).toISOString();
      const levels: ("info" | "warning" | "error")[] = ["info", "warning", "error"];
      const level = levels[Math.floor(Math.random() * levels.length)];
      const sources = ["auth", "firewall", "system", "application", "network"];
      const source = sources[Math.floor(Math.random() * sources.length)];
      
      return {
        timestamp,
        level,
        source,
        message: line.length > 100 ? line.substring(0, 100) + "..." : line,
        details: Math.random() > 0.7 ? "Additional context: " + line : undefined
      };
    });

    // Generate mock threats
    const threats: SecurityThreat[] = [];
    
    // Failed login attempts
    const failedLogins = events.filter(e => 
      e.message.toLowerCase().includes("failed") && 
      e.message.toLowerCase().includes("login")
    );
    
    if (failedLogins.length > 3) {
      threats.push({
        type: "Brute Force Attempt",
        description: "Multiple failed login attempts detected",
        severity: "high",
        events: failedLogins,
        recommendation: "Implement account lockout policies and IP-based rate limiting"
      });
    }

    // Suspicious IP access
    const suspiciousIPs = events.filter(e => 
      e.message.toLowerCase().includes("unauthorized") || 
      e.message.toLowerCase().includes("blocked")
    );
    
    if (suspiciousIPs.length > 0) {
      threats.push({
        type: "Suspicious IP Activity",
        description: "Unauthorized access attempts from suspicious IPs",
        severity: "medium",
        events: suspiciousIPs,
        recommendation: "Review and update firewall rules, implement IP blacklisting"
      });
    }

    // System modifications
    const systemChanges = events.filter(e => 
      e.message.toLowerCase().includes("modified") || 
      e.message.toLowerCase().includes("changed") ||
      e.message.toLowerCase().includes("updated")
    );
    
    if (systemChanges.length > 5) {
      threats.push({
        type: "Unusual System Changes",
        description: "High number of system modifications detected",
        severity: "medium",
        events: systemChanges,
        recommendation: "Review change management policies and system access controls"
      });
    }

    return {
      totalEvents,
      suspiciousEvents: failedLogins.length + suspiciousIPs.length + systemChanges.length,
      threats,
      summary: {
        errors: events.filter(e => e.level === "error").length,
        warnings: events.filter(e => e.level === "warning").length,
        info: events.filter(e => e.level === "info").length
      },
      timeRange: {
        start: events[0]?.timestamp || new Date().toISOString(),
        end: events[events.length - 1]?.timestamp || new Date().toISOString()
      }
    };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setLogs(content || "");
    };
    reader.readAsText(file);
  };

  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "text-orange-500 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400";
      case "low":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getLevelColor = (level: "info" | "warning" | "error") => {
    switch (level) {
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-lg shadow-md p-6 text-white mb-8"
      >
        <h1 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2 h-6 w-6" />
          Security Log Analyzer
        </h1>
        <p className="mt-2">
          Analyze security logs to detect suspicious activities and potential threats
        </p>
      </motion.div>

      {/* Log Input */}
      <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-amber-900/20 overflow-hidden mb-8">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-amber-400 mb-2">
                Enter or Upload Log Data
              </label>
              <Textarea
                placeholder="Paste your log data here..."
                value={logs}
                onChange={(e) => setLogs(e.target.value)}
                className="h-64 font-mono text-sm bg-gray-50 dark:bg-gray-900"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={analyzeLogs}
                disabled={analyzing || !logs.trim()}
                className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white flex-1"
              >
                {analyzing ? "Analyzing..." : "Analyze Logs"}
              </Button>

              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".log,.txt"
                  className="hidden"
                  id="log-file"
                />
                <Button
                  onClick={() => document.getElementById("log-file")?.click()}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-amber-400"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Log File
                </Button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-amber-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-amber-400/70 uppercase">
                  Total Events
                </h3>
                <div className="mt-2 flex items-baseline">
                  <div className="text-3xl font-semibold text-gray-900 dark:text-amber-400">
                    {result.totalEvents}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-amber-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-amber-400/70 uppercase">
                  Suspicious Events
                </h3>
                <div className="mt-2 flex items-baseline">
                  <div className="text-3xl font-semibold text-red-600 dark:text-red-400">
                    {result.suspiciousEvents}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-amber-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-amber-400/70 uppercase">
                  Time Range
                </h3>
                <div className="mt-2 text-sm text-gray-900 dark:text-amber-400">
                  <div>From: {new Date(result.timeRange.start).toLocaleString()}</div>
                  <div>To: {new Date(result.timeRange.end).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-amber-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-amber-400/70 uppercase">
                  Event Levels
                </h3>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-red-500 dark:text-red-400">Errors:</span>
                    <span className="font-medium text-gray-900 dark:text-amber-400">
                      {result.summary.errors}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 dark:text-yellow-400">Warnings:</span>
                    <span className="font-medium text-gray-900 dark:text-amber-400">
                      {result.summary.warnings}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-500 dark:text-blue-400">Info:</span>
                    <span className="font-medium text-gray-900 dark:text-amber-400">
                      {result.summary.info}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Threats */}
          {result.threats.length > 0 && (
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-amber-900/20 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-amber-400 mb-6 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                  Detected Threats
                </h2>

                <div className="space-y-6">
                  {result.threats.map((threat, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-amber-900/20 rounded-lg overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50 dark:bg-gray-900/50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-amber-400">
                            {threat.type}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                            {threat.severity}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-amber-400/70">
                          {threat.description}
                        </p>
                        <div className="mt-2 flex items-start">
                          <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-600 dark:text-amber-400/70">
                            <span className="font-medium">Recommendation:</span> {threat.recommendation}
                          </p>
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-amber-400 mb-3">
                          Related Events
                        </h4>
                        <div className="space-y-2">
                          {threat.events.map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className="text-sm bg-gray-50 dark:bg-gray-900/30 rounded-md p-3"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-gray-500 dark:text-amber-400/70">
                                  {new Date(event.timestamp).toLocaleString()}
                                </span>
                                <span className={`font-medium ${getLevelColor(event.level)}`}>
                                  {event.level}
                                </span>
                              </div>
                              <div className="font-medium text-gray-900 dark:text-amber-400">
                                [{event.source}] {event.message}
                              </div>
                              {event.details && (
                                <div className="mt-1 text-gray-600 dark:text-amber-400/70">
                                  {event.details}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
} 