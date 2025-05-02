"use client";

import { useState } from "react";
import { Fingerprint, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface AuthTestResult {
  success: boolean;
  vulnerabilities: {
    type: string;
    description: string;
    severity: "high" | "medium" | "low";
    recommendation: string;
  }[];
  score: number;
  testDetails: {
    testName: string;
    status: "pass" | "fail";
    details: string;
  }[];
}

export default function AuthenticationTester() {
  const [url, setUrl] = useState("");
  const [authType, setAuthType] = useState("basic");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<AuthTestResult | null>(null);
  const [error, setError] = useState("");

  const runAuthTest = async () => {
    if (!url) {
      setError("Please enter a URL to test");
      return;
    }

    try {
      setError("");
      setResult(null);
      setTesting(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate mock test results
      const mockResult = generateMockTestResults(url, authType);
      setResult(mockResult);
    } catch (err) {
      setError("An error occurred during testing. Please try again.");
    } finally {
      setTesting(false);
    }
  };

  const generateMockTestResults = (targetUrl: string, authMethod: string): AuthTestResult => {
    const vulnerabilities: AuthTestResult["vulnerabilities"] = [];
    const testDetails: AuthTestResult["testDetails"] = [];
    let score = 100;

    // Brute Force Protection Test
    const hasBruteForceProtection = Math.random() > 0.3;
    if (!hasBruteForceProtection) {
      vulnerabilities.push({
        type: "Brute Force",
        description: "No protection against brute force attacks detected",
        severity: "high",
        recommendation: "Implement rate limiting and account lockout policies"
      });
      score -= 25;
      testDetails.push({
        testName: "Brute Force Protection",
        status: "fail",
        details: "No rate limiting or account lockout detected after multiple failed attempts"
      });
    } else {
      testDetails.push({
        testName: "Brute Force Protection",
        status: "pass",
        details: "Rate limiting and account lockout policies are in place"
      });
    }

    // SSL/TLS Test
    const hasStrongSSL = Math.random() > 0.2;
    if (!hasStrongSSL) {
      vulnerabilities.push({
        type: "Weak SSL/TLS",
        description: "Weak SSL/TLS configuration detected",
        severity: "high",
        recommendation: "Upgrade to TLS 1.3 and disable older protocols"
      });
      score -= 20;
      testDetails.push({
        testName: "SSL/TLS Security",
        status: "fail",
        details: "Outdated SSL/TLS protocols or weak cipher suites detected"
      });
    } else {
      testDetails.push({
        testName: "SSL/TLS Security",
        status: "pass",
        details: "Strong SSL/TLS configuration with modern protocols"
      });
    }

    // Session Management Test
    const hasSecureSession = Math.random() > 0.25;
    if (!hasSecureSession) {
      vulnerabilities.push({
        type: "Session Management",
        description: "Insecure session management practices detected",
        severity: "medium",
        recommendation: "Implement secure session handling with proper timeout and rotation"
      });
      score -= 15;
      testDetails.push({
        testName: "Session Management",
        status: "fail",
        details: "Session tokens are not properly secured or rotated"
      });
    } else {
      testDetails.push({
        testName: "Session Management",
        status: "pass",
        details: "Secure session management practices implemented"
      });
    }

    // Password Policy Test
    const hasStrongPasswordPolicy = Math.random() > 0.4;
    if (!hasStrongPasswordPolicy) {
      vulnerabilities.push({
        type: "Weak Password Policy",
        description: "Password policy does not meet security standards",
        severity: "medium",
        recommendation: "Enforce stronger password requirements"
      });
      score -= 15;
      testDetails.push({
        testName: "Password Policy",
        status: "fail",
        details: "Weak passwords are accepted by the system"
      });
    } else {
      testDetails.push({
        testName: "Password Policy",
        status: "pass",
        details: "Strong password policy is enforced"
      });
    }

    // 2FA Availability Test
    const has2FA = Math.random() > 0.5;
    if (!has2FA) {
      vulnerabilities.push({
        type: "Missing 2FA",
        description: "Two-factor authentication is not available",
        severity: "medium",
        recommendation: "Implement 2FA support for enhanced security"
      });
      score -= 10;
      testDetails.push({
        testName: "2FA Support",
        status: "fail",
        details: "Two-factor authentication is not implemented"
      });
    } else {
      testDetails.push({
        testName: "2FA Support",
        status: "pass",
        details: "Two-factor authentication is available"
      });
    }

    return {
      success: true,
      vulnerabilities,
      score: Math.max(0, score),
      testDetails
    };
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

  const getScoreColor = (score: number) => {
    if (score < 50) return "text-red-500";
    if (score < 70) return "text-orange-500";
    if (score < 90) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700 rounded-lg shadow-md p-6 text-white mb-8"
      >
        <h1 className="text-2xl font-bold flex items-center">
          <Fingerprint className="mr-2 h-6 w-6" />
          Authentication Tester
        </h1>
        <p className="mt-2">
          Test authentication mechanisms for common security vulnerabilities and weaknesses
        </p>
      </motion.div>

      {/* Test Configuration */}
      <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-violet-900/20 overflow-hidden mb-8">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-violet-400 mb-2">
                Target URL
              </label>
              <Input
                type="url"
                placeholder="https://example.com/login"
                value={url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                className="bg-gray-50 dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-violet-400 mb-2">
                Authentication Type
              </label>
              <select
                value={authType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAuthType(e.target.value)}
                className="bg-gray-50 dark:bg-gray-900 block w-full border border-gray-300 dark:border-violet-900/20 rounded-md py-2 px-3 text-gray-900 dark:text-violet-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="basic">Basic Auth</option>
                <option value="form">Form-based</option>
                <option value="oauth">OAuth</option>
                <option value="jwt">JWT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-violet-400 mb-2">
                Test Credentials (Optional)
              </label>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="mt-6">
            <Button
              onClick={runAuthTest}
              disabled={testing || !url}
              className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white w-full"
            >
              {testing ? "Running Tests..." : "Start Authentication Testing"}
            </Button>
          </div>

          {testing && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-violet-500"></div>
            </div>
          )}
        </div>
      </div>

      {/* Test Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Overall Score */}
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-violet-900/20 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-violet-400">
                  Security Score
                </h2>
                <div className="flex items-center">
                  <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}/100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Vulnerabilities */}
          {result.vulnerabilities.length > 0 && (
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-violet-900/20 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-violet-400 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-500 dark:text-red-400" />
                  Detected Vulnerabilities
                </h2>

                <div className="space-y-4">
                  {result.vulnerabilities.map((vuln, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-md"
                    >
                      <div className="flex items-center mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                          {vuln.severity}
                        </span>
                        <h3 className="ml-3 font-medium text-gray-900 dark:text-violet-400">
                          {vuln.type}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-violet-400/70 mb-2">
                        {vuln.description}
                      </p>
                      <div className="flex items-start mt-2">
                        <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600 dark:text-violet-400/70">
                          <span className="font-medium">Recommendation:</span> {vuln.recommendation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Test Details */}
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-violet-900/20 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-violet-400 mb-4">
                Test Details
              </h2>

              <div className="space-y-4">
                {result.testDetails.map((test, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-gray-50 dark:bg-gray-900/50 rounded-md"
                  >
                    {test.status === "pass" ? (
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 dark:text-violet-400">
                        {test.testName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-violet-400/70">
                        {test.details}
                      </p>
                    </div>
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