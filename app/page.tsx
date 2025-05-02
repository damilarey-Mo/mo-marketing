"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Search, 
  Globe, 
  Server, 
  Cloud,
  Database,
  UserCheck,
  AlertTriangle,
  Network,
  Key,
  FileText,
  Code,
  Terminal,
  Wifi,
  MonitorSmartphone,
  Bug,
  Fingerprint,
  Eye,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/app/components/navbar";

const features = [
  {
    icon: Shield,
    title: "Threat Detection & Response",
    description: "Real-time monitoring and automated response to security threats across your infrastructure"
  },
  {
    icon: Lock,
    title: "Zero Trust Security",
    description: "Implement robust identity verification and access management across all network resources"
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    description: "Continuous scanning and assessment of vulnerabilities in your systems and applications"
  },
  {
    icon: Globe,
    title: "Web Application Security",
    description: "Protect your web applications from OWASP Top 10 threats and emerging vulnerabilities"
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    description: "Secure your cloud infrastructure with advanced monitoring and compliance tools"
  },
  {
    icon: Database,
    title: "Data Protection",
    description: "Encrypt and secure sensitive data with military-grade encryption standards"
  }
];

const tools = [
  "Network Security Scanner",
  "Endpoint Protection",
  "Web Application Firewall",
  "Cloud Security Posture Management",
  "Security Information and Event Management (SIEM)",
  "Identity and Access Management",
  "Vulnerability Scanner",
  "Penetration Testing Tools",
  "Malware Analysis Platform",
  "Security Awareness Training",
  "Incident Response Platform",
  "Data Loss Prevention",
  "Email Security Gateway",
  "Mobile Device Management",
  "API Security Testing",
  "Container Security",
  "Network Traffic Analysis",
  "Threat Intelligence Platform",
  "Password Management",
  "Secure File Transfer",
  "Security Compliance Manager",
  "Log Management",
  "Application Security Testing",
  "Cloud Access Security Broker",
  "Encryption Management",
  "Security Orchestration",
  "DNS Security",
  "IoT Security Monitor",
  "Secure Code Analysis",
  "Digital Forensics Platform"
];

export default function Home() {
  return (
    <>
      <Head>
        <title>MO Security - Enterprise Cybersecurity & IT Solutions</title>
        <meta name="description" content="Leading provider of enterprise-grade cybersecurity solutions. Protect your business with our suite of 30+ security tools, featuring AI-powered threat detection, zero-trust architecture, and 24/7 security monitoring." />
        <meta name="keywords" content="cybersecurity, IT security, enterprise security, threat detection, zero trust, vulnerability assessment, cloud security, SIEM, endpoint protection, network security" />
        <meta property="og:title" content="MO Security - Enterprise Cybersecurity & IT Solutions" />
        <meta property="og:description" content="Protect your business with enterprise-grade security solutions. Features 30+ security tools with AI-powered threat detection." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-6">
                Enterprise Security for the Digital Age
              </h1>
              <p className="text-xl md:text-2xl text-yellow-400/80 mb-8 max-w-3xl mx-auto">
                Protect your business with our comprehensive suite of security tools. 
                From threat detection to compliance management, we've got you covered.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-6 text-lg"
                  asChild
                >
                  <Link href="/dashboard">
                    Get Started
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 px-8 py-6 text-lg"
                >
                  Schedule Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-yellow-400 text-center mb-16">
              Comprehensive Security Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-black/50 border border-yellow-400/20 rounded-lg p-6 hover:bg-yellow-400/5 transition-colors"
                >
                  <feature.icon className="h-12 w-12 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">{feature.title}</h3>
                  <p className="text-yellow-400/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tools Section */}
        <div className="bg-black/30 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                30+ Enterprise Security Tools
              </h2>
              <p className="text-xl text-yellow-400/70 max-w-3xl mx-auto">
                Our comprehensive suite of security tools helps you protect your business
                from evolving cyber threats while ensuring regulatory compliance.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-black/50 border border-yellow-400/20 rounded-lg p-4 hover:bg-yellow-400/5 transition-colors"
                >
                  <p className="text-yellow-400/90 text-sm">{tool}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">99.9%</div>
              <p className="text-yellow-400/70">Threat Detection Rate</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <p className="text-yellow-400/70">Security Monitoring</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <p className="text-yellow-400/70">Enterprise Clients</p>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black/30 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">
                Ready to Secure Your Business?
              </h2>
              <p className="text-xl text-yellow-400/70 mb-8 max-w-2xl mx-auto">
                Join hundreds of enterprises that trust us with their security. 
                Get started with a free security assessment today.
              </p>
              <Button
                className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-6 text-lg"
              >
                Get Free Assessment
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
