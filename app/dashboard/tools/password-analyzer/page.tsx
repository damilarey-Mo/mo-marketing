"use client";

import { useState } from "react";
import { Lock, ShieldAlert, CheckCircle, AlertTriangle, Info, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";

interface PasswordAnalysisResult {
  password: string;
  score: number; // 0-100
  strength: "very weak" | "weak" | "moderate" | "strong" | "very strong";
  timeToBreak: string;
  issues: {
    type: string;
    description: string;
    severity: "high" | "medium" | "low";
  }[];
  suggestions: string[];
  breached: boolean;
  breachDetails?: {
    count: number;
    websites: string[];
    firstFound: string;
    lastFound: string;
  };
}

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<PasswordAnalysisResult | null>(null);
  const [error, setError] = useState("");

  const analyzePassword = async () => {
    // Validate password
    if (!password) {
      setError("Please enter a password to analyze");
      return;
    }

    try {
      // Clear previous results
      setError("");
      setResult(null);
      
      // Start analyzing
      setAnalyzing(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate mock analysis results
      const mockResult = generateMockAnalysisResult(password);
      setResult(mockResult);
      setAnalyzing(false);
    } catch (err) {
      setError("An error occurred during analysis. Please try again.");
      setAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      analyzePassword();
    }
  };

  const generateMockAnalysisResult = (pwd: string): PasswordAnalysisResult => {
    // Password scoring logic
    const length = pwd.length;
    const hasLowercase = /[a-z]/.test(pwd);
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);
    const isCommon = ["password", "123456", "qwerty", "admin", "welcome", "letmein"].includes(pwd.toLowerCase());
    
    // Calculate base score
    let score = 0;
    
    // Length score (up to 40 points)
    score += Math.min(length * 4, 40);
    
    // Character variety (up to 40 points)
    if (hasLowercase) score += 10;
    if (hasUppercase) score += 10;
    if (hasDigit) score += 10;
    if (hasSpecial) score += 10;
    
    // Penalties
    if (isCommon) score = Math.max(score - 50, 0);
    if (length < 8) score = Math.max(score - 10, 0);
    if (!hasLowercase || !hasUppercase) score = Math.max(score - 10, 0);
    if (!hasDigit && !hasSpecial) score = Math.max(score - 20, 0);
    
    // Optional: For demo purposes, make "test-breach@1234" always appear as breached
    const simulateBreached = pwd === "test-breach@1234" || Math.random() < 0.2;
    
    // Determine strength category
    let strength: "very weak" | "weak" | "moderate" | "strong" | "very strong";
    if (score < 20) strength = "very weak";
    else if (score < 40) strength = "weak";
    else if (score < 60) strength = "moderate";
    else if (score < 80) strength = "strong";
    else strength = "very strong";
    
    // Generate time to break estimate
    let timeToBreak: string;
    if (score < 20) timeToBreak = "instantly";
    else if (score < 40) timeToBreak = "a few minutes";
    else if (score < 60) timeToBreak = "a few days";
    else if (score < 80) timeToBreak = "a few months";
    else timeToBreak = "hundreds of years";
    
    // Generate issues
    const issues = [];
    
    if (length < 8) {
      issues.push({
        type: "Length",
        description: "Password is too short",
        severity: "high" as const
      });
    }
    
    if (!hasUppercase || !hasLowercase) {
      issues.push({
        type: "Case",
        description: "Missing uppercase or lowercase letters",
        severity: "medium" as const
      });
    }
    
    if (!hasDigit) {
      issues.push({
        type: "Digits",
        description: "No numbers in your password",
        severity: "medium" as const
      });
    }
    
    if (!hasSpecial) {
      issues.push({
        type: "Special Characters",
        description: "No special characters (e.g., !@#$%)",
        severity: "medium" as const
      });
    }
    
    if (isCommon) {
      issues.push({
        type: "Common Password",
        description: "This is a commonly used password",
        severity: "high" as const
      });
    }
    
    // Generate suggestions
    const suggestions = [];
    if (length < 12) suggestions.push("Use at least 12 characters");
    if (!hasUppercase || !hasLowercase) suggestions.push("Mix uppercase and lowercase letters");
    if (!hasDigit) suggestions.push("Add numbers to your password");
    if (!hasSpecial) suggestions.push("Include special characters like !@#$%^&*");
    if (isCommon) suggestions.push("Avoid common words and patterns");
    
    // Generate breach details if needed
    let breachDetails;
    if (simulateBreached) {
      const websites = ["examplesite.com", "compromised-email.net"];
      if (Math.random() > 0.5) websites.push("another-breach.org");
      if (Math.random() > 0.7) websites.push("hacked-database.com");
      
      breachDetails = {
        count: websites.length,
        websites,
        firstFound: "January 2022",
        lastFound: "September 2023"
      };
    }
    
    return {
      password: pwd,
      score,
      strength,
      timeToBreak,
      issues,
      suggestions,
      breached: simulateBreached,
      breachDetails
    };
  };

  const getScoreColor = (score: number) => {
    if (score < 20) return "text-red-500";
    if (score < 40) return "text-orange-500";
    if (score < 60) return "text-yellow-500";
    if (score < 80) return "text-green-500";
    return "text-emerald-500";
  };

  const getScoreBgColor = (score: number) => {
    if (score < 20) return "bg-red-500";
    if (score < 40) return "bg-orange-500";
    if (score < 60) return "bg-yellow-500";
    if (score < 80) return "bg-green-500";
    return "bg-emerald-500";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-500 bg-red-100 dark:bg-red-900/20 dark:text-red-400";
      case "medium": return "text-orange-500 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400";
      case "low": return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400";
      default: return "text-gray-500 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const resetAnalysis = () => {
    setPassword("");
    setResult(null);
    setError("");
  };

  const generateRandomStrongPassword = () => {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}:<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setPassword(password);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-lg shadow-md p-6 text-white mb-8"
      >
        <h1 className="text-2xl font-bold flex items-center">
          <Lock className="mr-2 h-6 w-6" />
          Password Analyzer
        </h1>
        <p className="mt-2">
          Check your password strength, analyze security issues, and check for data breaches
        </p>
      </motion.div>

      {/* Password Input */}
      <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden mb-8">
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-yellow-400 mb-2">
              Enter a password to analyze
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="bg-gray-50 dark:bg-gray-900 block w-full border border-gray-300 dark:border-yellow-900/20 rounded-md py-2 px-3 text-gray-900 dark:text-yellow-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={analyzing}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-yellow-400/50 hover:text-gray-500 dark:hover:text-yellow-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={analyzePassword}
              disabled={analyzing || !password}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white flex-1"
            >
              {analyzing ? "Analyzing..." : "Analyze Password"}
            </Button>
            
            <Button
              onClick={generateRandomStrongPassword}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-yellow-400"
            >
              Generate Strong Password
            </Button>
          </div>

          {analyzing && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
            </div>
          )}
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
          {/* Password Strength Score */}
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-yellow-400 mb-2">
                    Password Strength
                  </h2>
                  <p className="text-gray-500 dark:text-yellow-400/70">
                    Your password would take <span className="font-semibold">{result.timeToBreak}</span> to crack
                  </p>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center">
                  <div className="relative h-20 w-20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}
                      </span>
                    </div>
                    <svg className="h-20 w-20" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#EEEEEE"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getScoreBgColor(result.score).replace('bg-', '#').replace('-500', '')}
                        strokeWidth="3"
                        strokeDasharray={`${result.score}, 100`}
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <span className={`font-medium capitalize ${getScoreColor(result.score)}`}>
                      {result.strength}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Strength bar */}
              <div className="mt-6">
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-2 ${getScoreBgColor(result.score)}`} 
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-yellow-400/50">
                  <span>Very Weak</span>
                  <span>Weak</span>
                  <span>Moderate</span>
                  <span>Strong</span>
                  <span>Very Strong</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Issues */}
          {result.issues.length > 0 && (
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-yellow-400 mb-4 flex items-center">
                  <ShieldAlert className="h-5 w-5 mr-2 text-red-500 dark:text-red-400" />
                  Security Issues
                </h2>
                
                <div className="space-y-3">
                  {result.issues.map((issue, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md"
                    >
                      <div className={`px-2 py-1 rounded text-xs font-medium mr-3 ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-yellow-400">{issue.type}</h3>
                        <p className="text-sm text-gray-500 dark:text-yellow-400/70">{issue.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Improvement Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-yellow-400 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                  Suggestions
                </h2>
                
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-yellow-400/90">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Data Breach Check */}
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-yellow-400 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500 dark:text-orange-400" />
                Data Breach Check
              </h2>
              
              {result.breached ? (
                <div className="p-4 border border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10 rounded-md">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400 mr-2" />
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-400">
                      Password found in data breaches
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 dark:text-yellow-400/90 mb-3">
                    This password has been found in {result.breachDetails?.count} data breach{result.breachDetails && result.breachDetails.count !== 1 ? 'es' : ''}.
                    It is strongly recommended that you change this password immediately on any sites where you use it.
                  </p>
                  
                  {result.breachDetails && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800 dark:text-yellow-400 mb-2">Breach details:</h4>
                      <ul className="list-disc list-inside text-gray-700 dark:text-yellow-400/90 space-y-1">
                        <li>Found in {result.breachDetails.count} breach{result.breachDetails.count !== 1 ? 'es' : ''}</li>
                        <li>Affected websites: {result.breachDetails.websites.join(", ")}</li>
                        <li>First found: {result.breachDetails.firstFound}</li>
                        <li>Last found: {result.breachDetails.lastFound}</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 border border-green-200 bg-green-50 dark:border-green-900/30 dark:bg-green-900/10 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 mr-2" />
                    <h3 className="text-lg font-medium text-green-800 dark:text-green-400">
                      Password not found in known data breaches
                    </h3>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-yellow-400/90">
                    Good news! This password doesn't appear in our database of known breaches. However, this doesn't guarantee complete security.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Reset button */}
          <div className="flex justify-center">
            <Button
              onClick={resetAnalysis}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-yellow-400"
            >
              Check Another Password
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 