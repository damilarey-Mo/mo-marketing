"use client";

import { useState } from "react";
import { Globe, AlertTriangle, CheckCircle, Link2, ShieldCheck, Lock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";

interface ScanResult {
  url: string;
  safe: boolean;
  threatType?: string;
  riskLevel?: "high" | "medium" | "low";
  details: {
    sslValid: boolean;
    malwareDetected: boolean;
    phishingDetected: boolean;
    blacklisted: boolean;
    redirects: string[];
    securityHeaders: {
      name: string;
      present: boolean;
      value?: string;
    }[];
  };
  timestamp: string;
}

export default function UrlScanner() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");

  const startScan = async () => {
    // Basic URL validation
    if (!url) {
      setError("Please enter a URL to scan");
      return;
    }

    try {
      // URL format validation (basic)
      if (!url.match(/^(http|https):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:[0-9]{1,5})?(\/.*)?$/)) {
        setError("Please enter a valid URL (e.g., https://example.com)");
        return;
      }

      // Clear previous results
      setError("");
      setScanCompleted(false);
      setResult(null);
      
      // Start scanning
      setScanning(true);
      setScanProgress(0);

      // Simulate scanning progress
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 400);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate mock scan results
      clearInterval(interval);
      setScanProgress(100);
      
      const mockResult = generateMockResult(url);
      setResult(mockResult);
      setScanCompleted(true);
      setScanning(false);
    } catch (err) {
      setError("An error occurred during scanning. Please try again.");
      setScanning(false);
    }
  };

  const generateMockResult = (url: string): ScanResult => {
    // Create some randomness but make certain domains always return safe/unsafe
    let safe = Math.random() > 0.3; // 70% chance of being safe
    let threatType = "";
    let riskLevel: "high" | "medium" | "low" = "low";
    
    // For demo purposes, certain domains will always return specific results
    if (url.includes("example.com") || url.includes("google.com") || url.includes("microsoft.com")) {
      safe = true;
    } else if (url.includes("test-malware") || url.includes("malware-test")) {
      safe = false;
      threatType = "Malware";
      riskLevel = "high";
    } else if (url.includes("phishing") || url.includes("scam")) {
      safe = false;
      threatType = "Phishing";
      riskLevel = "high";
    }

    // Random realistic security headers
    const securityHeaders = [
      {
        name: "Content-Security-Policy",
        present: Math.random() > 0.4,
        value: safe ? "default-src 'self'; script-src 'self' trusted-scripts.com" : undefined
      },
      {
        name: "X-XSS-Protection",
        present: Math.random() > 0.3,
        value: "1; mode=block"
      },
      {
        name: "X-Frame-Options",
        present: Math.random() > 0.2,
        value: "SAMEORIGIN"
      },
      {
        name: "Strict-Transport-Security",
        present: safe ? Math.random() > 0.1 : Math.random() > 0.7,
        value: "max-age=31536000; includeSubDomains"
      },
      {
        name: "X-Content-Type-Options",
        present: Math.random() > 0.3,
        value: "nosniff"
      },
      {
        name: "Referrer-Policy",
        present: Math.random() > 0.5,
        value: "strict-origin-when-cross-origin"
      }
    ];

    // Create a more detailed result structure
    const mockScanResult: ScanResult = {
      url,
      safe,
      details: {
        sslValid: url.startsWith("https") && (Math.random() > 0.2 || safe),
        malwareDetected: !safe && threatType === "Malware",
        phishingDetected: !safe && threatType === "Phishing",
        blacklisted: !safe && Math.random() > 0.6,
        redirects: safe ? [] : Math.random() > 0.7 ? [
          "https://redirect1.suspicious-domain.com",
          "https://final-destination.malicious-site.net"
        ] : [],
        securityHeaders
      },
      timestamp: new Date().toISOString()
    };

    // Only add threat info if not safe
    if (!safe) {
      mockScanResult.threatType = threatType || (Math.random() > 0.5 ? "Suspicious Behavior" : "Potentially Unwanted Program");
      mockScanResult.riskLevel = riskLevel || (Math.random() > 0.7 ? "high" : Math.random() > 0.5 ? "medium" : "low");
    }

    return mockScanResult;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-lg shadow-md p-6 text-white mb-8"
      >
        <h1 className="text-2xl font-bold flex items-center">
          <Globe className="mr-2 h-6 w-6" />
          URL Security Scanner
        </h1>
        <p className="mt-2">
          Check if a URL is safe to visit and analyze it for phishing, malware, and other security threats
        </p>
      </motion.div>

      {/* Scanner Input */}
      <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden mb-8">
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-yellow-400 mb-2">
              Enter a URL to scan
            </label>
            <div className="flex">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-gray-400 dark:text-yellow-400/50" />
                </div>
                <input
                  type="text"
                  id="url"
                  placeholder="https://example.com"
                  className="pl-10 bg-gray-50 dark:bg-gray-900 block w-full border border-gray-300 dark:border-yellow-900/20 rounded-l-md py-2 px-3 text-gray-900 dark:text-yellow-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={scanning}
                />
              </div>
              <Button
                onClick={startScan}
                disabled={scanning || !url}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-r-md"
              >
                {scanning ? "Scanning..." : "Check URL"}
              </Button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          {scanning && (
            <div className="mt-4">
              <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-yellow-400">
                <span>Scanning...</span>
                <span>{Math.round(scanProgress)}%</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                Checking URL against security databases...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scan Results */}
      {scanCompleted && result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden"
        >
          {/* Result Header */}
          <div className={`px-6 py-4 flex items-center justify-between ${
            result.safe 
              ? "bg-green-50 dark:bg-green-900/20" 
              : "bg-red-50 dark:bg-red-900/20"
          }`}>
            <div className="flex items-center">
              {result.safe ? (
                <ShieldCheck className="h-8 w-8 text-green-500 dark:text-green-400 mr-3" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400 mr-3" />
              )}
              <div>
                <h2 className={`text-lg font-semibold ${
                  result.safe 
                    ? "text-green-800 dark:text-green-400" 
                    : "text-red-800 dark:text-red-400"
                }`}>
                  {result.safe ? "Safe Website" : "Potential Threat Detected"}
                </h2>
                <p className="text-sm text-gray-600 dark:text-yellow-400/70">
                  {result.safe 
                    ? "This URL appears to be safe to visit" 
                    : `This URL may contain ${result.threatType?.toLowerCase() || "security threats"}`
                  }
                </p>
              </div>
            </div>

            {!result.safe && result.riskLevel && (
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                result.riskLevel === "high" 
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
                  : result.riskLevel === "medium"
                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              }`}>
                {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)} Risk
              </div>
            )}
          </div>

          {/* Result Details */}
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-yellow-400 mb-2">URL Information</h3>
              <div className="flex items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-md">
                <Globe className="h-5 w-5 text-gray-500 dark:text-yellow-400/70 mr-2" />
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-blue-600 dark:text-blue-400 hover:underline flex items-center ${!result.safe ? 'line-through' : ''}`}
                >
                  {result.url}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
                {!result.safe && (
                  <span className="ml-2 text-xs text-red-500 dark:text-red-400 font-medium">
                    Not recommended to visit
                  </span>
                )}
              </div>
            </div>

            {/* Security Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-yellow-400 mb-2">Security Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-md border ${
                  result.details.sslValid 
                    ? "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/10" 
                    : "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/10"
                }`}>
                  <div className="flex items-center">
                    {result.details.sslValid ? (
                      <Lock className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                    )}
                    <h4 className={`font-medium ${
                      result.details.sslValid 
                        ? "text-green-800 dark:text-green-400" 
                        : "text-red-800 dark:text-red-400"
                    }`}>
                      SSL Certificate
                    </h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-yellow-400/70">
                    {result.details.sslValid 
                      ? "Valid SSL certificate - Connection is secure" 
                      : "Invalid or missing SSL certificate - Connection is not secure"
                    }
                  </p>
                </div>

                <div className={`p-4 rounded-md border ${
                  !result.details.malwareDetected 
                    ? "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/10" 
                    : "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/10"
                }`}>
                  <div className="flex items-center">
                    {!result.details.malwareDetected ? (
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                    )}
                    <h4 className={`font-medium ${
                      !result.details.malwareDetected 
                        ? "text-green-800 dark:text-green-400" 
                        : "text-red-800 dark:text-red-400"
                    }`}>
                      Malware Detection
                    </h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-yellow-400/70">
                    {!result.details.malwareDetected 
                      ? "No malware detected on this website" 
                      : "Potential malware detected on this website"
                    }
                  </p>
                </div>

                <div className={`p-4 rounded-md border ${
                  !result.details.phishingDetected 
                    ? "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/10" 
                    : "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/10"
                }`}>
                  <div className="flex items-center">
                    {!result.details.phishingDetected ? (
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                    )}
                    <h4 className={`font-medium ${
                      !result.details.phishingDetected 
                        ? "text-green-800 dark:text-green-400" 
                        : "text-red-800 dark:text-red-400"
                    }`}>
                      Phishing Detection
                    </h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-yellow-400/70">
                    {!result.details.phishingDetected 
                      ? "No phishing indicators detected" 
                      : "This website may be a phishing attempt"
                    }
                  </p>
                </div>

                <div className={`p-4 rounded-md border ${
                  !result.details.blacklisted 
                    ? "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/10" 
                    : "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/10"
                }`}>
                  <div className="flex items-center">
                    {!result.details.blacklisted ? (
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                    )}
                    <h4 className={`font-medium ${
                      !result.details.blacklisted 
                        ? "text-green-800 dark:text-green-400" 
                        : "text-red-800 dark:text-red-400"
                    }`}>
                      Blacklist Status
                    </h4>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-yellow-400/70">
                    {!result.details.blacklisted 
                      ? "Domain is not blacklisted" 
                      : "Domain appears on security blacklists"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Redirect Chain (if any) */}
            {result.details.redirects.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-yellow-400 mb-2">Redirect Chain</h3>
                <div className="p-4 rounded-md border border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-900/10">
                  <p className="text-sm text-gray-600 dark:text-yellow-400/70 mb-2">
                    This URL redirects through potentially suspicious domains:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-gray-500 dark:text-yellow-400/70 text-sm mr-2">1. Original URL:</span>
                      <span className="text-gray-800 dark:text-yellow-400 text-sm">{result.url}</span>
                    </div>
                    {result.details.redirects.map((redirect, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-gray-500 dark:text-yellow-400/70 text-sm mr-2">{idx + 2}. Redirects to:</span>
                        <span className="text-red-600 dark:text-red-400 text-sm font-medium">{redirect}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Headers */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-yellow-400 mb-2">Security Headers</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-yellow-900/20">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400/70 uppercase tracking-wider">
                        Header
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400/70 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400/70 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-yellow-900/20">
                    {result.details.securityHeaders.map((header, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-yellow-400">
                          {header.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {header.present ? (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              Present
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                              Missing
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-yellow-400/70">
                          {header.present ? header.value : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 