"use client";

import { useState } from "react";
import { Globe, AlertTriangle, CheckCircle, Info, RefreshCw, Shield, Link2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

interface SecurityThreat {
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  recommendation: string;
  details?: Record<string, string | number | boolean>;
}

interface ScanResult {
  url: string;
  scanTime: string;
  isUrlMalicious: boolean;
  threats: SecurityThreat[];
  safetyScore: number;
  details: {
    ssl_info?: {
      valid: boolean;
      issuer?: string;
      expires?: string;
      encryption?: string;
    };
    blacklist_status: {
      listed: boolean;
      total_engines: number;
      detections: number;
      engines: string[];
    };
    dns_records?: {
      a: string[];
      mx: string[];
      ns: string[];
    };
    redirects: string[];
    response_headers: {
      [key: string]: string;
    };
  };
}

export default function URLScanner() {
  const [url, setUrl] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string>("");

  const startScan = async () => {
    if (!url) {
      setError("Please enter a URL to scan");
      return;
    }

    try {
      setScanning(true);
      setError("");
      setResult(null);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockResults = generateMockResults(url);
      setResult(mockResults);
    } catch (error) {
      setError("An error occurred while scanning the URL. Please try again.");
      console.error("Scan error:", error);
    } finally {
      setScanning(false);
    }
  };

  const generateMockResults = (targetUrl: string): ScanResult => {
    const threats: SecurityThreat[] = [];
    let safetyScore = 100;

    // Randomly decide if URL is malicious
    const isMalicious = Math.random() > 0.7;

    if (isMalicious) {
      // Generate random threats
      const possibleThreats: SecurityThreat[] = [
        {
          type: "Phishing",
          severity: "critical" as const,
          description: "This URL is suspected of being a phishing site attempting to steal sensitive information",
          recommendation: "Do not visit this site or enter any personal information",
          details: {
            target_brand: "Major Financial Institution",
            phishing_confidence: "High",
            similar_domains_detected: true
          } as Record<string, string | number | boolean>
        },
        {
          type: "Malware Distribution",
          severity: "critical" as const,
          description: "This site is known to distribute malware or unwanted software",
          recommendation: "Avoid downloading any files from this site and scan your system if you've visited it",
          details: {
            malware_type: "Trojan",
            infection_method: "Drive-by Download",
            last_detected: "Recent"
          } as Record<string, string | number | boolean>
        },
        {
          type: "SSL Certificate Issues",
          severity: "high" as const,
          description: "Invalid or expired SSL certificate detected",
          recommendation: "Do not enter sensitive information on this site",
          details: {
            cert_status: "Invalid",
            expiration: "Expired",
            encryption_strength: "Weak"
          } as Record<string, string | number | boolean>
        },
        {
          type: "Suspicious Redirects",
          severity: "medium" as const,
          description: "Multiple suspicious redirects detected",
          recommendation: "Exercise caution when visiting this site",
          details: {
            redirect_chain_length: 3,
            suspicious_domains: true,
            geolocation_mismatch: true
          } as Record<string, string | number | boolean>
        }
      ];

      // Add 1-3 random threats
      const numThreats = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numThreats; i++) {
        const threat = possibleThreats[Math.floor(Math.random() * possibleThreats.length)];
        if (!threats.find(t => t.type === threat.type)) {
          threats.push(threat);
          // Reduce safety score based on severity
          if (threat.severity === "critical") safetyScore -= 40;
          else if (threat.severity === "high") safetyScore -= 25;
          else if (threat.severity === "medium") safetyScore -= 15;
        }
      }
    }

    // Ensure safety score doesn't go below 0
    safetyScore = Math.max(0, safetyScore);

    // Generate mock blacklist engines
    const blacklistEngines = [
      "Google Safe Browsing",
      "Phishtank",
      "OpenPhish",
      "Malware Domain List",
      "Spamhaus",
      "SURBL",
      "Malc0de Database",
      "PhishLabs",
      "Kaspersky",
      "BitDefender"
    ];

    // Select random engines that detected the URL if malicious
    const detectedEngines = isMalicious
      ? blacklistEngines
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 5) + 1)
      : [];

    return {
      url: targetUrl,
      scanTime: new Date().toISOString(),
      isUrlMalicious: isMalicious,
      threats,
      safetyScore,
      details: {
        ssl_info: {
          valid: Math.random() > 0.3,
          issuer: "DigiCert Inc",
          expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
          encryption: "TLS 1.3"
        },
        blacklist_status: {
          listed: detectedEngines.length > 0,
          total_engines: blacklistEngines.length,
          detections: detectedEngines.length,
          engines: detectedEngines
        },
        dns_records: {
          a: ["192.168.1.1", "192.168.1.2"],
          mx: ["mail.example.com"],
          ns: ["ns1.example.com", "ns2.example.com"]
        },
        redirects: isMalicious
          ? ["http://suspicious-domain.com", "http://malicious-site.net"]
          : [],
        response_headers: {
          "content-type": "text/html",
          "server": "nginx",
          "x-frame-options": "SAMEORIGIN",
          "x-xss-protection": "1; mode=block"
        }
      }
    };
  };

  const getSeverityColor = (severity: "critical" | "high" | "medium" | "low") => {
    switch (severity) {
      case "critical":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/20";
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900/20";
      case "medium":
        return "text-orange-500 bg-orange-100 dark:bg-orange-900/20";
      case "low":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
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
          URL Scanner
        </h1>
        <p className="mt-2">
          Scan URLs for phishing, malware, and other security threats
        </p>
      </motion.div>

      {/* URL Input */}
      <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-green-900/20 overflow-hidden mb-8">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-green-400 mb-2">
                Enter URL to Scan
              </label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={handleUrlChange}
                className="bg-gray-50 dark:bg-gray-900"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <Button
              onClick={startScan}
              disabled={scanning}
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
            >
              {scanning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Start Scan
                </>
              )}
            </Button>
          </div>
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
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-green-900/20 overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-green-400 mb-4">
                    Scan Results
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-green-400/70">URL:</span>
                      <div className="font-medium text-gray-900 dark:text-green-400 break-all">
                        {result.url}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-green-400/70">Scan Time:</span>
                      <div className="font-medium text-gray-900 dark:text-green-400">
                        {new Date(result.scanTime).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-green-400/70">Blacklist Status:</span>
                      <div className="font-medium text-gray-900 dark:text-green-400">
                        {result.details.blacklist_status.detections} detections out of {result.details.blacklist_status.total_engines} engines
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className={`text-4xl font-bold mb-2 ${getSafetyScoreColor(result.safetyScore)}`}>
                    {result.safetyScore}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-green-400/70 mb-4">
                    Safety Score
                  </div>
                  {result.isUrlMalicious ? (
                    <div className="flex items-center text-red-600 dark:text-red-400">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Threats Detected
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      URL is Safe
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SSL Information */}
          {result.details.ssl_info && (
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-green-900/20 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-green-400 mb-4">
                  SSL Certificate
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-green-400/70">Status:</span>
                    <div className={`font-medium ${result.details.ssl_info.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {result.details.ssl_info.valid ? 'Valid' : 'Invalid'}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-green-400/70">Issuer:</span>
                    <div className="font-medium text-gray-900 dark:text-green-400">
                      {result.details.ssl_info.issuer}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-green-400/70">Expires:</span>
                    <div className="font-medium text-gray-900 dark:text-green-400">
                      {new Date(result.details.ssl_info.expires || "").toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-green-400/70">Encryption:</span>
                    <div className="font-medium text-gray-900 dark:text-green-400">
                      {result.details.ssl_info.encryption}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detected Threats */}
          {result.threats.length > 0 && (
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-green-900/20 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-green-400 mb-6 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                  Detected Threats
                </h2>

                <div className="space-y-6">
                  {result.threats.map((threat, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-green-900/20 rounded-lg overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                              {threat.severity}
                            </span>
                            <h3 className="font-medium text-gray-900 dark:text-green-400">
                              {threat.type}
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-green-400">Description</h4>
                            <p className="mt-1 text-sm text-gray-600 dark:text-green-400/70">
                              {threat.description}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-green-400">Recommendation</h4>
                            <p className="mt-1 text-sm text-gray-600 dark:text-green-400/70">
                              {threat.recommendation}
                            </p>
                          </div>

                          {threat.details && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 dark:text-green-400">Additional Details</h4>
                              <div className="mt-1 space-y-1">
                                {Object.entries(threat.details).map(([key, value]) => (
                                  <div key={key} className="text-sm">
                                    <span className="text-gray-500 dark:text-green-400/70">
                                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                                    </span>
                                    <span className="ml-2 text-gray-900 dark:text-green-400">
                                      {value.toString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technical Details */}
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-green-900/20 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-green-400 mb-4">
                Technical Details
              </h2>

              {/* DNS Records */}
              {result.details.dns_records && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-green-400 mb-2">DNS Records</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-green-400/70">A Records:</span>
                      <div className="font-mono text-sm text-gray-900 dark:text-green-400">
                        {result.details.dns_records.a.join(", ")}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-green-400/70">MX Records:</span>
                      <div className="font-mono text-sm text-gray-900 dark:text-green-400">
                        {result.details.dns_records.mx.join(", ")}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-green-400/70">NS Records:</span>
                      <div className="font-mono text-sm text-gray-900 dark:text-green-400">
                        {result.details.dns_records.ns.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Redirects */}
              {result.details.redirects.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-green-400 mb-2">Redirect Chain</h3>
                  <div className="space-y-2">
                    {result.details.redirects.map((redirect, index) => (
                      <div key={index} className="flex items-center">
                        <Link2 className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="font-mono text-sm text-gray-900 dark:text-green-400">
                          {redirect}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Response Headers */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-green-400 mb-2">Response Headers</h3>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <div className="space-y-2">
                    {Object.entries(result.details.response_headers).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 font-mono text-sm text-gray-500 dark:text-green-400/70">
                          {key}:
                        </div>
                        <div className="col-span-2 font-mono text-sm text-gray-900 dark:text-green-400">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
