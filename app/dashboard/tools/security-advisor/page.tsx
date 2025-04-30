"use client";

import { useState, useRef, useEffect } from "react";
import { Shield, Send, Bot, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

// Pre-defined security-focused questions
const exampleQuestions = [
  "What are the best practices for securing a web application?",
  "How can I protect my website against XSS attacks?",
  "What are the most common security vulnerabilities in 2023?",
  "How should I implement proper authentication in my app?",
  "What security headers should I add to my website?",
  "How can I securely store user passwords?",
  "What's the difference between authentication and authorization?",
  "How can I implement a Content Security Policy?",
  "What are the security risks of using third-party libraries?",
  "How can I secure my API endpoints?"
];

export default function SecurityAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI Security Advisor. Ask me any security related question or choose one of the example questions below to get started.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Add loading message
    const loadingMessageId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      {
        id: loadingMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isLoading: true
      }
    ]);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateSecurityResponse(userMessage.content);
      
      // Replace loading message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessageId
          ? {
              id: loadingMessageId,
              role: "assistant",
              content: aiResponse,
              timestamp: new Date(),
              isLoading: false
            }
          : msg
      ));
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
    // Optional: Automatically send the question
    // setInput(question);
    // setTimeout(() => handleSendMessage(), 100);
  };

  const generateSecurityResponse = (query: string): string => {
    // This is a client-side mock function that returns predefined responses
    // based on keywords in the user's query. In a real application, this would
    // be replaced with a call to an AI service API.
    
    query = query.toLowerCase();
    
    // XSS protection
    if (query.includes("xss") || query.includes("cross-site scripting")) {
      return `# Cross-Site Scripting (XSS) Protection

To protect against XSS attacks, implement these measures:

1. **Input Validation**: Validate all user inputs on both client and server sides
2. **Output Encoding**: Always encode user-generated content before rendering it
3. **Content Security Policy (CSP)**: Implement a strong CSP header
4. **Use HttpOnly and Secure Flags** for cookies to prevent access via JavaScript
5. **Sanitize HTML** with libraries like DOMPurify when you need to allow HTML input
6. **Use framework protections** like React's JSX escaping or Angular's built-in sanitization

Example of implementing a basic CSP header:
\`\`\`
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com;
\`\`\`

For more information, check the [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).`;
    }
    
    // Authentication best practices
    else if (query.includes("authentication") || query.includes("login") || query.includes("auth")) {
      return `# Authentication Best Practices

Here are key authentication security practices:

1. **Use strong password policies**:
   - Minimum 8 characters (preferably 12+)
   - Mix of uppercase, lowercase, numbers, and special characters
   - Check against compromised password databases

2. **Implement Multi-Factor Authentication (MFA)**
   - SMS (less secure but better than nothing)
   - Authenticator apps (preferred)
   - Hardware keys (most secure)

3. **Secure session management**:
   - Use secure, HttpOnly cookies
   - Implement proper session timeouts
   - Regenerate session IDs after login

4. **Rate limiting and account lockouts**:
   - Prevent brute force attacks
   - Progressive delays between attempts
   - Notify users of failed login attempts

5. **Consider passwordless options** like WebAuthn/FIDO2 where possible

For implementation, consider established libraries and services rather than building authentication from scratch.`;
    }
    
    // Password storage
    else if (query.includes("password") && (query.includes("store") || query.includes("hash") || query.includes("storage"))) {
      return `# Secure Password Storage

Never store passwords in plaintext! Here's how to store them securely:

1. **Use modern hashing algorithms specifically designed for passwords**:
   - Argon2id (recommended first choice)
   - bcrypt (widely supported)
   - PBKDF2 (compliant with many standards)

2. **Include these components**:
   - Salt: Random data added to each password before hashing
   - Pepper: Application-wide secret key (stored separately)
   - Work factor: Makes the hash computation intentionally slow

3. **Example implementation with bcrypt**:
\`\`\`javascript
// Node.js example
const bcrypt = require('bcrypt');
const saltRounds = 12; // Higher is slower but more secure

// Hashing a password
async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, saltRounds);
}

// Verifying a password
async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
\`\`\`

4. **Regularly increase work factors** as computing power increases.

Remember: Even with proper hashing, implement additional security measures like MFA and rate limiting.`;
    }
    
    // Security headers
    else if (query.includes("security header") || query.includes("http header")) {
      return `# Essential Security Headers

Add these HTTP headers to enhance your web application security:

1. **Content-Security-Policy (CSP)**
   Controls which resources can be loaded
   \`\`\`
   Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-domain.com;
   \`\`\`

2. **Strict-Transport-Security (HSTS)**
   Enforces HTTPS connections
   \`\`\`
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   \`\`\`

3. **X-Content-Type-Options**
   Prevents MIME-type sniffing
   \`\`\`
   X-Content-Type-Options: nosniff
   \`\`\`

4. **X-Frame-Options**
   Protects against clickjacking
   \`\`\`
   X-Frame-Options: DENY
   \`\`\`

5. **Permissions-Policy**
   Controls browser features
   \`\`\`
   Permissions-Policy: camera=(), microphone=(), geolocation=()
   \`\`\`

6. **Referrer-Policy**
   Controls referrer information
   \`\`\`
   Referrer-Policy: strict-origin-when-cross-origin
   \`\`\`

Use tools like [securityheaders.com](https://securityheaders.com/) to test your implementation.`;
    }
    
    // API security
    else if (query.includes("api") && (query.includes("secur") || query.includes("protect"))) {
      return `# API Security Best Practices

Protect your APIs with these security measures:

1. **Authentication & Authorization**
   - Use industry standards: OAuth 2.0, JWT, API keys
   - Implement proper scopes and permissions
   - Consider token-based auth with short expiry times

2. **Rate Limiting & Throttling**
   - Prevent abuse and DoS attacks
   - Implement per-user and global limits
   - Use exponential backoff for repeated failures

3. **Input Validation**
   - Validate all parameters (query, path, body)
   - Use schemas to enforce data types and formats
   - Implement proper error handling without leaking info

4. **HTTPS Only**
   - Encrypt all API traffic
   - Implement HSTS headers
   - Keep TLS configurations up to date

5. **Sensitive Data**
   - Filter sensitive data from logs
   - Use proper HTTP status codes
   - Implement data minimization

6. **Security Headers**
   - Apply appropriate CORS policies
   - Set Content-Security-Policy
   - Use caching controls for sensitive data

7. **Monitoring & Logging**
   - Track unusual patterns and potential attacks
   - Log authentication events
   - Set up alerts for suspicious activities`;
    }
    
    // Web application security general
    else if (query.includes("web") && (query.includes("secur") || query.includes("protect"))) {
      return `# Web Application Security Best Practices

Here's a comprehensive approach to securing web applications:

## 1. Secure Design & Development
- Follow secure coding standards (OWASP ASVS)
- Conduct regular security training for developers
- Implement security requirements from the start
- Use automated security testing in CI/CD

## 2. Authentication & Access Control
- Implement strong authentication with MFA
- Use proper authorization (RBAC, ABAC)
- Secure session management
- Implement least privilege principle

## 3. Data Protection
- Encrypt sensitive data in transit and at rest
- Implement proper key management
- Sanitize all data inputs/outputs
- Protect against injection attacks (SQL, XSS, etc.)

## 4. Infrastructure Security
- Keep all systems and libraries updated
- Use WAF (Web Application Firewall)
- Implement proper network segmentation
- Set up secure configuration for servers

## 5. Monitoring & Response
- Maintain comprehensive logging
- Implement intrusion detection
- Create an incident response plan
- Conduct regular security assessments

## 6. Third-Party Components
- Regularly scan for vulnerabilities in dependencies
- Establish a process for evaluating third-party code
- Maintain an inventory of all components

Remember to stay current with the [OWASP Top Ten](https://owasp.org/www-project-top-ten/) vulnerabilities list.`;
    }
    
    // Common vulnerabilities
    else if (query.includes("vulnerabilit") || query.includes("common attack")) {
      return `# Common Security Vulnerabilities in 2023

The most prevalent security vulnerabilities to defend against:

## 1. Injection Attacks
- SQL Injection: Sanitize inputs and use parameterized queries
- XSS (Cross-Site Scripting): Encode outputs and implement CSP
- Command Injection: Validate inputs and use allowlists

## 2. Broken Authentication
- Credential stuffing: Implement MFA and rate limiting
- Session hijacking: Use secure cookies and token management
- Weak passwords: Enforce strong password policies

## 3. Sensitive Data Exposure
- Inadequate encryption: Use strong algorithms (AES-256, RSA-2048)
- Missing access controls: Implement proper authorization
- Unintended data leakage: Audit data flows and implement minimization

## 4. API Security Flaws
- Broken access control: Implement proper authentication and authorization
- Mass assignment: Restrict allowed properties
- Improper error handling: Avoid leaking sensitive information

## 5. Supply Chain Attacks
- Compromised dependencies: Use SCA tools to detect vulnerable packages
- Malicious packages: Verify package signatures and sources
- Build system compromises: Secure CI/CD pipelines

## 6. Cloud Misconfigurations
- Excessive permissions: Follow least privilege principle
- Public data exposure: Audit public-facing resources regularly
- Insecure defaults: Establish secure baselines for deployments

Stay vigilant by following security advisories and implementing defense in depth.`;
    }
    
    // Auth vs Authz
    else if ((query.includes("auth") || query.includes("authentication")) && (query.includes("author") || query.includes("authz"))) {
      return `# Authentication vs Authorization

These are two distinct but related security concepts:

## Authentication (AuthN)
**Verifies WHO you are**

- Confirms user identity through credentials
- Examples: Login with username/password, biometrics, SSO
- Answers: "Are you who you claim to be?"
- Technologies: OAuth (partly), SAML, LDAP, JWT (for storing claims)

## Authorization (AuthZ)
**Determines WHAT you can access**

- Controls permissions after authentication
- Examples: Role-based access, permissions, ACLs
- Answers: "Are you allowed to do/access this?"
- Technologies: RBAC, ABAC, OAuth (scopes), XACML

## Key Differences

| Authentication | Authorization |
|----------------|---------------|
| Verifies identity | Grants permissions |
| Happens first | Happens after authentication |
| User/subject-focused | Resource/object-focused |
| Visible to user | Often invisible to user |

## Implementation Best Practices

- Separate authentication and authorization concerns
- Use proven frameworks rather than building from scratch
- Implement least privilege principle
- Design for fine-grained permissions
- Log both authentication and authorization events
- Consider just-in-time access for sensitive operations`;
    }
    
    // Content Security Policy
    else if (query.includes("csp") || query.includes("content security policy")) {
      return `# Implementing Content Security Policy (CSP)

Content Security Policy is a powerful browser security mechanism that helps prevent XSS and other code injection attacks.

## Basic Implementation

Add the CSP header to your HTTP responses:

\`\`\`
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-scripts.com;
\`\`\`

## Key Directives

- **default-src**: Fallback for other resource types
- **script-src**: Controls JavaScript sources
- **style-src**: Controls CSS sources
- **img-src**: Controls image sources
- **connect-src**: Controls fetch, XHR, WebSocket
- **font-src**: Controls font loading
- **frame-src**: Controls iframes
- **object-src**: Controls plugins (Flash, Java)
- **media-src**: Controls audio/video

## Implementation Strategies

1. **Start with Report-Only mode**:
   \`\`\`
   Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-violations
   \`\`\`

2. **Analyze violations** and adjust policy

3. **Gradually restrict** from most permissive to least

4. **Remove 'unsafe-inline'** by using nonces or hashes:
   \`\`\`
   script-src 'self' 'nonce-randomStringHere';
   <script nonce="randomStringHere">/* your JS */</script>
   \`\`\`

5. **Test thoroughly** across browsers

## Common Challenges

- Third-party scripts often require 'unsafe-inline'
- Legacy applications may need significant refactoring
- Inline event handlers need to be replaced

Tools like [CSP Evaluator](https://csp-evaluator.withgoogle.com/) can help analyze your policies.`;
    }
    
    // Generic response for other security questions
    else {
      return `Thank you for your security question. Here are some general cybersecurity best practices:

1. **Implement defense in depth** - Use multiple layers of security controls
2. **Follow the principle of least privilege** - Give users only the access they need
3. **Keep all systems updated** with the latest security patches
4. **Use strong encryption** for sensitive data at rest and in transit
5. **Implement proper authentication and authorization** controls
6. **Regular security testing** through penetration tests and vulnerability scanning
7. **Security monitoring and logging** to detect potential breaches
8. **Have an incident response plan** ready before you need it
9. **Train users** on security awareness and best practices
10. **Follow established security frameworks** like NIST CSF, ISO 27001, or CIS Controls

For more specific guidance on your question about "${query}", I recommend consulting the OWASP Foundation resources (owasp.org) or the NIST Cybersecurity Framework.`;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 rounded-lg shadow-md p-6 text-white mb-8"
      >
        <h1 className="text-2xl font-bold flex items-center">
          <Shield className="mr-2 h-6 w-6" />
          AI Security Advisor
        </h1>
        <p className="mt-2">
          Get expert guidance on security best practices, vulnerability mitigation, and threat protection
        </p>
      </motion.div>

      <div className="flex flex-col h-[calc(100vh-300px)] min-h-[500px]">
        {/* Example questions */}
        <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden mb-4 p-4">
          <h2 className="text-sm font-medium text-gray-700 dark:text-yellow-400 mb-3 flex items-center">
            <Sparkles className="h-4 w-4 mr-1 text-teal-500" />
            Example Security Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                className="text-left px-3 py-2 text-sm rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20 text-gray-700 dark:text-yellow-400 flex items-center"
                onClick={() => handleQuestionClick(question)}
              >
                <ArrowRight className="h-3 w-3 mr-2 text-teal-500" />
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-grow bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden mb-4">
          <div className="p-4 h-full flex flex-col">
            <div className="flex-grow overflow-y-auto p-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.role === "assistant" ? "mr-12" : "ml-12"
                  }`}
                >
                  <div
                    className={`flex items-start ${
                      message.role === "assistant" ? "" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 rounded-full w-8 h-8 flex items-center justify-center ${
                        message.role === "assistant"
                          ? "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="h-5 w-5" />
                      ) : (
                        <div className="h-5 w-5 rounded-full bg-gray-400 dark:bg-gray-600" />
                      )}
                    </div>
                    <div
                      className={`mx-2 px-4 py-3 rounded-lg ${
                        message.role === "assistant"
                          ? "bg-teal-50 dark:bg-teal-900/20 text-gray-700 dark:text-yellow-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400"
                      }`}
                    >
                      {message.isLoading ? (
                        <div className="flex items-center">
                          <div className="dot-typing"></div>
                        </div>
                      ) : (
                        <div className="markdown-content">
                          {message.content.split("\n").map((line, i) => {
                            // Check if the line is a heading (starts with #)
                            if (line.startsWith("# ")) {
                              return (
                                <h2 key={i} className="text-lg font-bold mt-2 mb-2">
                                  {line.substring(2)}
                                </h2>
                              );
                            } else if (line.startsWith("## ")) {
                              return (
                                <h3 key={i} className="text-base font-semibold mt-2 mb-1">
                                  {line.substring(3)}
                                </h3>
                              );
                            } else if (line.startsWith("- ")) {
                              return (
                                <div key={i} className="ml-2 flex items-start mb-1">
                                  <span className="mr-2">•</span>
                                  <span>{line.substring(2)}</span>
                                </div>
                              );
                            } else if (line.startsWith("```")) {
                              return (
                                <pre key={i} className="bg-gray-100 dark:bg-gray-900 p-2 rounded my-2 font-mono text-xs overflow-x-auto">
                                  <code>{line.substring(3)}</code>
                                </pre>
                              );
                            } else if (line.trim() === "") {
                              return <div key={i} className="h-2"></div>;
                            } else {
                              return <p key={i} className="mb-1">{line}</p>;
                            }
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="bg-white dark:bg-black shadow-md rounded-lg border border-gray-200 dark:border-yellow-900/20 overflow-hidden">
          <div className="p-4">
            <div className="flex">
              <Textarea
                placeholder="Ask a security question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-grow min-h-[60px] resize-none bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-yellow-900/20 rounded-l-md py-2 px-3 text-gray-900 dark:text-yellow-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white rounded-r-md flex items-center justify-center px-4"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dot-typing {
          position: relative;
          left: -9999px;
          width: 8px;
          height: 8px;
          background-color: #8b8b8b;
          color: #8b8b8b;
          border-radius: 5px;
          box-shadow: 9984px 0 0 0 #8b8b8b, 9998px 0 0 0 #8b8b8b, 10012px 0 0 0 #8b8b8b;
          animation: dot-typing 1.5s infinite linear;
        }

        @keyframes dot-typing {
          0% {
            box-shadow: 9984px 0 0 0 #8b8b8b, 9998px 0 0 0 #8b8b8b, 10012px 0 0 0 #8b8b8b;
          }
          16.667% {
            box-shadow: 9984px -10px 0 0 #8b8b8b, 9998px 0 0 0 #8b8b8b, 10012px 0 0 0 #8b8b8b;
          }
          33.333% {
            box-shadow: 9984px 0 0 0 #8b8b8b, 9998px 0 0 0 #8b8b8b, 10012px 0 0 0 #8b8b8b;
          }
          50% {
            box-shadow: 9984px 0 0 0 #8b8b8b, 9998px -10px 0 0 #8b8b8b, 10012px 0 0 0 #8b8b8b;
          }
          66.667% {
            box-shadow: 9984px 0 0 0 #8b8b8b, 9998px 0 0 0 #8b8b8b, 10012px 0 0 0 #8b8b8b;
          }
          83.333% {
            box-shadow: 9984px 0 0 0 #8b8b8b, 9998px 0 0 0 #8b8b8b, 10012px -10px 0 0 #8b8b8b;
          }
          100% {
            box-shadow: 9984px 0 0 0 #8b8b8b, 9998px 0 0 0 #8b8b8b, 10012px 0 0 0 #8b8b8b;
          }
        }
      `}</style>
    </div>
  );
} 