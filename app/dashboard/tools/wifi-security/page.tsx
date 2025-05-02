"use client";

import { useState } from "react";
import { Wifi, AlertTriangle, CheckCircle, Info, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";

interface WifiNetwork {
  ssid: string;
  bssid: string;
  encryption: string;
  signal: number;
  channel: number;
  frequency: string;
  vulnerabilities: {
    type: string;
    description: string;
    severity: "high" | "medium" | "low";
    recommendation: string;
  }[];
}

interface ScanResult {
  networks: WifiNetwork[];
  scanTime: string;
  totalNetworks: number;
  vulnerableNetworks: number;
}

export default function WifiSecurityAnalyzer() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");

  const startScan = async () => {
    try {
      setError("");
      setResult(null);
      setScanning(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock scan results
      const mockResult = generateMockScanResults();
      setResult(mockResult);
    } catch (err) {
      setError("An error occurred during the WiFi scan. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  const generateMockScanResults = (): ScanResult => {
    const networks: WifiNetwork[] = [];
    const encryptionTypes = ["WPA3", "WPA2", "WPA", "WEP", "Open"];
    const channels = Array.from({ length: 13 }, (_, i) => i + 1);
    
    // Generate 5-10 random networks
    const numNetworks = Math.floor(Math.random() * 6) + 5;
    
    for (let i = 0; i < numNetworks; i++) {
      const encryption = encryptionTypes[Math.floor(Math.random() * encryptionTypes.length)];
      const vulnerabilities: WifiNetwork["vulnerabilities"] = [];
      
      // Check for vulnerabilities based on encryption
      if (encryption === "Open") {
        vulnerabilities.push({
          type: "No Encryption",
          description: "Network is not encrypted and open to anyone",
          severity: "high" as const,
          recommendation: "Enable WPA3 or at minimum WPA2 encryption"
        });
      } else if (encryption === "WEP") {
        vulnerabilities.push({
          type: "Weak Encryption",
          description: "WEP encryption is easily crackable",
          severity: "high" as const,
          recommendation: "Upgrade to WPA3 or WPA2 encryption"
        });
      } else if (encryption === "WPA") {
        vulnerabilities.push({
          type: "Outdated Encryption",
          description: "WPA encryption has known vulnerabilities",
          severity: "medium" as const,
          recommendation: "Upgrade to WPA3 or WPA2 encryption"
        });
      }
      
      // Random chance for additional vulnerabilities
      if (Math.random() > 0.7) {
        vulnerabilities.push({
          type: "Weak Password",
          description: "Network password appears to be weak or default",
          severity: "high" as const,
          recommendation: "Use a strong, unique password with mixed characters"
        });
      }
      
      if (Math.random() > 0.8) {
        vulnerabilities.push({
          type: "WPS Enabled",
          description: "WiFi Protected Setup (WPS) is enabled and vulnerable",
          severity: "medium" as const,
          recommendation: "Disable WPS as it can be exploited"
        });
      }

      networks.push({
        ssid: `Network_${i + 1}`,
        bssid: generateRandomMAC(),
        encryption,
        signal: Math.floor(Math.random() * 100),
        channel: channels[Math.floor(Math.random() * channels.length)],
        frequency: "2.4GHz",
        vulnerabilities
      });
    }

    return {
      networks,
      scanTime: new Date().toLocaleString(),
      totalNetworks: networks.length,
      vulnerableNetworks: networks.filter(n => n.vulnerabilities.length > 0).length
    };
  };

  const generateRandomMAC = () => {
    const hexDigits = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 6; i++) {
      mac += hexDigits[Math.floor(Math.random() * 16)];
      mac += hexDigits[Math.floor(Math.random() * 16)];
      if (i < 5) mac += ":";
    }
    return mac;
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

  const getEncryptionColor = (encryption: string) => {
    switch (encryption) {
      case "WPA3":
        return "text-green-500";
      case "WPA2":
        return "text-blue-500";
      case "WPA":
        return "text-yellow-500";
      case "WEP":
        return "text-red-500";
      case "Open":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getSignalStrength = (signal: number) => {
    if (signal >= 80) return "Excellent";
    if (signal >= 60) return "Good";
    if (signal >= 40) return "Fair";
    return "Poor";
  };

  const getSignalColor = (signal: number) => {
    if (signal >= 80) return "text-green-500";
    if (signal >= 60) return "text-blue-500";
    if (signal >= 40) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-700 rounded-lg shadow-md p-6 text-white mb-8"
      >
        <h1 className="text-2xl font-bold flex items-center">
          <Wifi className="mr-2 h-6 w-6" />
          WiFi Security Analyzer
        </h1>
        <p className="mt-2">
          Scan and analyze nearby WiFi networks for security vulnerabilities
        </p>
      </motion.div>

      {/* Scan Controls */}
      <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-sky-900/20 overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-sky-400">
                WiFi Network Scanner
              </h2>
              {result && (
                <p className="text-sm text-gray-500 dark:text-sky-400/70">
                  Last scan: {result.scanTime}
                </p>
              )}
            </div>
            <Button
              onClick={startScan}
              disabled={scanning}
              className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700 text-white flex items-center"
            >
              {scanning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Start Scan
                </>
              )}
            </Button>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
      </div>

      {/* Scan Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-sky-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-sky-400 mb-4">
                  Networks Found
                </h3>
                <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                  {result.totalNetworks}
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-sky-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-sky-400 mb-4">
                  Vulnerable Networks
                </h3>
                <div className="text-3xl font-bold text-red-500 dark:text-red-400">
                  {result.vulnerableNetworks}
                </div>
              </div>
            </div>
          </div>

          {/* Network List */}
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-sky-900/20 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-sky-400 mb-6">
                Detected Networks
              </h2>

              <div className="space-y-6">
                {result.networks.map((network, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-sky-900/20 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-sky-400">
                          {network.ssid}
                        </h3>
                        <span className={`font-medium ${getEncryptionColor(network.encryption)}`}>
                          {network.encryption}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-sky-400/70">BSSID:</span>
                          <div className="font-mono text-gray-900 dark:text-sky-400">
                            {network.bssid}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-sky-400/70">Signal:</span>
                          <div className={`font-medium ${getSignalColor(network.signal)}`}>
                            {getSignalStrength(network.signal)} ({network.signal}%)
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-sky-400/70">Channel:</span>
                          <div className="text-gray-900 dark:text-sky-400">
                            {network.channel}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-sky-400/70">Frequency:</span>
                          <div className="text-gray-900 dark:text-sky-400">
                            {network.frequency}
                          </div>
                        </div>
                      </div>
                    </div>

                    {network.vulnerabilities.length > 0 && (
                      <div className="p-4 border-t border-gray-200 dark:border-sky-900/20">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-sky-400 mb-3 flex items-center">
                          <AlertTriangle className="h-4 w-4 text-red-500 dark:text-red-400 mr-2" />
                          Security Issues
                        </h4>
                        <div className="space-y-3">
                          {network.vulnerabilities.map((vuln, vIndex) => (
                            <div
                              key={vIndex}
                              className="flex items-start bg-gray-50 dark:bg-gray-900/30 rounded-md p-3"
                            >
                              <span className={`px-2 py-1 rounded text-xs font-medium mr-3 ${getSeverityColor(vuln.severity)}`}>
                                {vuln.severity}
                              </span>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-sky-400">
                                  {vuln.type}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-sky-400/70 mt-1">
                                  {vuln.description}
                                </p>
                                <div className="flex items-start mt-2">
                                  <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                                  <p className="text-sm text-gray-600 dark:text-sky-400/70">
                                    <span className="font-medium">Recommendation:</span> {vuln.recommendation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 