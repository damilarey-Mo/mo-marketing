import { 
  Shield, 
  Search, 
  FileWarning, 
  Globe, 
  Lock, 
  Code, 
  Key, 
  Database, 
  Network, 
  AlertTriangle 
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'scan' | 'monitor' | 'protect' | 'analyze';
  color: string;
}

export const tools: Tool[] = [
  {
    id: 'vulnerability-scanner',
    name: 'Vulnerability Scanner',
    description: 'Scan your web applications for common security vulnerabilities',
    icon: Search,
    category: 'scan',
    color: 'text-blue-500'
  },
  {
    id: 'malware-detector',
    name: 'Malware Detector',
    description: 'Analyze files for potential malware and threats',
    icon: FileWarning,
    category: 'scan',
    color: 'text-red-500'
  },
  {
    id: 'url-scanner',
    name: 'URL Scanner',
    description: 'Check URLs for phishing, malware, and security threats',
    icon: Globe,
    category: 'scan',
    color: 'text-green-500'
  },
  {
    id: 'password-analyzer',
    name: 'Password Analyzer',
    description: 'Analyze password strength and check for breaches',
    icon: Lock,
    category: 'analyze',
    color: 'text-purple-500'
  },
  {
    id: 'code-scanner',
    name: 'Code Scanner',
    description: 'Scan code for security vulnerabilities and bugs',
    icon: Code,
    category: 'analyze',
    color: 'text-yellow-500'
  },
  {
    id: 'encryption-tool',
    name: 'Encryption Tool',
    description: 'Encrypt and decrypt sensitive data',
    icon: Key,
    category: 'protect',
    color: 'text-indigo-500'
  },
  {
    id: 'data-breach-monitor',
    name: 'Data Breach Monitor',
    description: 'Monitor for data breaches containing your information',
    icon: Database,
    category: 'monitor',
    color: 'text-pink-500'
  },
  {
    id: 'network-scanner',
    name: 'Network Scanner',
    description: 'Scan your network for open ports and vulnerabilities',
    icon: Network,
    category: 'scan',
    color: 'text-cyan-500'
  },
  {
    id: 'threat-intelligence',
    name: 'Threat Intelligence',
    description: 'Get real-time threat intelligence and security news',
    icon: AlertTriangle,
    category: 'monitor',
    color: 'text-orange-500'
  },
  {
    id: 'security-advisor',
    name: 'AI Security Advisor',
    description: 'Get AI-powered security recommendations',
    icon: Shield,
    category: 'analyze',
    color: 'text-teal-500'
  }
];

// Helper to get a tool by ID
export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id);
}

// Group tools by category
export function getToolsByCategory() {
  const categories = {
    scan: tools.filter(tool => tool.category === 'scan'),
    analyze: tools.filter(tool => tool.category === 'analyze'),
    protect: tools.filter(tool => tool.category === 'protect'),
    monitor: tools.filter(tool => tool.category === 'monitor')
  };
  return categories;
} 