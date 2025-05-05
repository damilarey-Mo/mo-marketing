"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useAuth } from "@/app/contexts/auth-context";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Format the username nicely from the email
      const userName = email.split('@')[0]
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
      
      // Simulate successful login
      login({
        isAdmin: email.includes("admin"),
        userName: userName
      });
      
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      // Here you would implement Google OAuth
      // For demo purposes, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate a Google user name
      const userName = "John Doe"; // In real implementation, this would come from Google OAuth
      
      login({
        isAdmin: false,
        userName: userName
      });
      
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-black/50 p-8 rounded-xl border border-yellow-400/20"
      >
        <div>
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-yellow-400" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-yellow-400">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-yellow-400/70">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-yellow-400 hover:text-yellow-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center text-red-400"
          >
            <AlertCircle className="h-5 w-5 mr-3" />
            {error}
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-yellow-400/50" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-black/50 border-yellow-400/20 text-yellow-400 placeholder:text-yellow-400/50 focus:border-yellow-400 focus:ring-yellow-400"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-yellow-400/50" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-black/50 border-yellow-400/20 text-yellow-400 placeholder:text-yellow-400/50 focus:border-yellow-400 focus:ring-yellow-400"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-yellow-400/20 bg-black/50 text-yellow-400 focus:ring-yellow-400"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-yellow-400/70">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-yellow-400 hover:text-yellow-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:bg-yellow-400/50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-yellow-400/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-yellow-400/70">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10"
            >
              <Image
                src="/images/google-icon.svg"
                alt="Google"
                width={18}
                height={18}
                className="mr-2"
              />
              Sign in with Google
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 