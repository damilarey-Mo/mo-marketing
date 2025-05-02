"use client";

import { useState } from "react";
import { Mail, AlertTriangle, CheckCircle, Info, Send, Users, Target, ChartBar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

interface CampaignTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  difficulty: "easy" | "medium" | "hard";
  type: "credential" | "attachment" | "link" | "urgency";
  indicators: string[];
}

interface CampaignResult {
  totalSent: number;
  clicked: number;
  reported: number;
  compromised: number;
  timeStarted: string;
  status: "running" | "completed";
  userStats: {
    department: string;
    sent: number;
    clicked: number;
    reported: number;
  }[];
}

const TEMPLATES: CampaignTemplate[] = [
  {
    id: "password-reset",
    name: "Password Reset Alert",
    subject: "Urgent: Your Password Will Expire Today",
    content: "Your account password will expire in 2 hours. Click here to reset your password immediately to avoid account lockout.",
    difficulty: "easy",
    type: "credential",
    indicators: [
      "Urgency in subject line",
      "Generic greeting",
      "Suspicious link",
      "Request for immediate action"
    ]
  },
  {
    id: "invoice-payment",
    name: "Invoice Payment Request",
    subject: "Invoice #38291 - Immediate Payment Required",
    content: "Please find attached the invoice for recent services. Payment is required within 24 hours to avoid late fees.",
    difficulty: "medium",
    type: "attachment",
    indicators: [
      "Unexpected invoice",
      "Attachment included",
      "Pressure tactics",
      "Financial theme"
    ]
  },
  {
    id: "ceo-request",
    name: "CEO Wire Transfer",
    subject: "Confidential Request - Urgent Action Required",
    content: "I need you to process an urgent wire transfer for a new business opportunity. This is confidential. Let me know when you're available.",
    difficulty: "hard",
    type: "urgency",
    indicators: [
      "Authority figure impersonation",
      "Confidentiality emphasis",
      "Unusual request",
      "Time pressure"
    ]
  }
];

export default function PhishingSimulator() {
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const [customSubject, setCustomSubject] = useState("");
  const [customContent, setCustomContent] = useState("");
  const [targetGroups, setTargetGroups] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<CampaignResult | null>(null);
  const [error, setError] = useState("");

  const startCampaign = async () => {
    if (!selectedTemplate && (!customSubject || !customContent)) {
      setError("Please select a template or create custom content");
      return;
    }

    if (targetGroups.length === 0) {
      setError("Please select at least one target group");
      return;
    }

    try {
      setError("");
      setResult(null);
      setRunning(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate mock campaign results
      const mockResult = generateMockResults();
      setResult(mockResult);
    } catch (err) {
      setError("An error occurred while starting the campaign. Please try again.");
    } finally {
      setRunning(false);
    }
  };

  const generateMockResults = (): CampaignResult => {
    const totalSent = Math.floor(Math.random() * 100) + 50;
    const clicked = Math.floor(totalSent * (Math.random() * 0.4));
    const reported = Math.floor(clicked * (Math.random() * 0.6));
    const compromised = Math.floor(clicked * (Math.random() * 0.3));

    const departments = ["IT", "HR", "Finance", "Marketing", "Sales"];
    const userStats = departments.map(dept => ({
      department: dept,
      sent: Math.floor(totalSent / departments.length),
      clicked: Math.floor(Math.random() * (totalSent / departments.length) * 0.4),
      reported: Math.floor(Math.random() * (totalSent / departments.length) * 0.2)
    }));

    return {
      totalSent,
      clicked,
      reported,
      compromised,
      timeStarted: new Date().toISOString(),
      status: "completed",
      userStats
    };
  };

  const getClickRate = (clicked: number, total: number) => {
    return ((clicked / total) * 100).toFixed(1) + "%";
  };

  const getReportRate = (reported: number, total: number) => {
    return ((reported / total) * 100).toFixed(1) + "%";
  };

  const getDifficultyColor = (difficulty: "easy" | "medium" | "hard") => {
    switch (difficulty) {
      case "easy":
        return "text-green-500 bg-green-100 dark:bg-green-900/20";
      case "medium":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
      case "hard":
        return "text-red-500 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-600 dark:to-rose-700 rounded-lg shadow-md p-6 text-white mb-8"
      >
        <h1 className="text-2xl font-bold flex items-center">
          <Mail className="mr-2 h-6 w-6" />
          Phishing Simulator
        </h1>
        <p className="mt-2">
          Create and run phishing simulation campaigns to test and train users
        </p>
      </motion.div>

      {/* Campaign Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Template Selection */}
        <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-rose-900/20 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-rose-400 mb-4">
              Select Template
            </h2>
            <div className="space-y-4">
              {TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id
                      ? "border-rose-500 dark:border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                      : "border-gray-200 dark:border-gray-800 hover:border-rose-300 dark:hover:border-rose-700"
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-rose-400">
                      {template.name}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-rose-400/70 mb-2">
                    {template.subject}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-rose-400/50">
                    Type: {template.type}
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-rose-400 mb-2">
                  Or Create Custom Template
                </h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Email Subject"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-900"
                  />
                  <Textarea
                    placeholder="Email Content"
                    value={customContent}
                    onChange={(e) => setCustomContent(e.target.value)}
                    className="h-32 bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Configuration */}
        <div className="space-y-6">
          {/* Target Groups */}
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-rose-900/20 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-rose-400 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Target Groups
              </h2>
              <div className="space-y-2">
                {["IT Department", "HR Department", "Finance", "Marketing", "Sales"].map((group) => (
                  <label
                    key={group}
                    className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                      checked={targetGroups.includes(group)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTargetGroups([...targetGroups, group]);
                        } else {
                          setTargetGroups(targetGroups.filter(g => g !== group));
                        }
                      }}
                    />
                    <span className="ml-2 text-gray-900 dark:text-rose-400">{group}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Campaign Actions */}
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-rose-900/20 overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <Button
                  onClick={startCampaign}
                  disabled={running}
                  className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700 text-white flex items-center justify-center"
                >
                  {running ? (
                    <>
                      <Send className="mr-2 h-4 w-4 animate-pulse" />
                      Starting Campaign...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Start Campaign
                    </>
                  )}
                </Button>

                {selectedTemplate && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-rose-400 mb-2">
                      Phishing Indicators
                    </h3>
                    <div className="space-y-2">
                      {selectedTemplate.indicators.map((indicator, index) => (
                        <div
                          key={index}
                          className="flex items-start text-sm text-gray-600 dark:text-rose-400/70"
                        >
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                          {indicator}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-rose-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-rose-400/70 uppercase">
                  Emails Sent
                </h3>
                <div className="mt-2 flex items-baseline">
                  <div className="text-3xl font-semibold text-gray-900 dark:text-rose-400">
                    {result.totalSent}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-rose-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-rose-400/70 uppercase">
                  Click Rate
                </h3>
                <div className="mt-2 flex items-baseline">
                  <div className="text-3xl font-semibold text-yellow-600 dark:text-yellow-400">
                    {getClickRate(result.clicked, result.totalSent)}
                  </div>
                  <div className="ml-2 text-sm text-gray-500 dark:text-rose-400/70">
                    ({result.clicked} users)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-rose-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-rose-400/70 uppercase">
                  Report Rate
                </h3>
                <div className="mt-2 flex items-baseline">
                  <div className="text-3xl font-semibold text-green-600 dark:text-green-400">
                    {getReportRate(result.reported, result.totalSent)}
                  </div>
                  <div className="ml-2 text-sm text-gray-500 dark:text-rose-400/70">
                    ({result.reported} reports)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-rose-900/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-rose-400/70 uppercase">
                  Compromised
                </h3>
                <div className="mt-2 flex items-baseline">
                  <div className="text-3xl font-semibold text-red-600 dark:text-red-400">
                    {result.compromised}
                  </div>
                  <div className="ml-2 text-sm text-gray-500 dark:text-rose-400/70">
                    users
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Stats */}
          <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-rose-900/20 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-rose-400 mb-6 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Department Statistics
              </h2>

              <div className="space-y-6">
                {result.userStats.map((stat, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-rose-900/20 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 dark:text-rose-400">
                        {stat.department}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-rose-400/70">
                        {stat.sent} emails sent
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-rose-400/70">Clicked</span>
                          <span className="font-medium text-yellow-600 dark:text-yellow-400">
                            {getClickRate(stat.clicked, stat.sent)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 dark:bg-yellow-400"
                            style={{ width: `${(stat.clicked / stat.sent) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-rose-400/70">Reported</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {getReportRate(stat.reported, stat.sent)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 dark:bg-green-400"
                            style={{ width: `${(stat.reported / stat.sent) * 100}%` }}
                          />
                        </div>
                      </div>
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