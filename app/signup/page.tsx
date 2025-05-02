"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock, User, AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useAuth } from "@/app/contexts/auth-context";
import Image from "next/image";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll simulate a successful signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful signup and login
      login({
        isAdmin: false,
        userName: name
      });
      
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setIsLoading(true);

    try {
      // Here you would implement Google OAuth
      // For demo purposes, we'll simulate a successful signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login({
        isAdmin: false,
        userName: "Google User"
      });
      
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to sign up with Google");
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-yellow-400/70">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-yellow-400 hover:text-yellow-500"
            >
              Sign in
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

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-yellow-400/50" />
                </div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-black/50 border-yellow-400/20 text-yellow-400 placeholder:text-yellow-400/50 focus:border-yellow-400 focus:ring-yellow-400"
                  placeholder="Full name"
                />
              </div>
            </div>
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-black/50 border-yellow-400/20 text-yellow-400 placeholder:text-yellow-400/50 focus:border-yellow-400 focus:ring-yellow-400"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-yellow-400/50" />
                </div>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-black/50 border-yellow-400/20 text-yellow-400 placeholder:text-yellow-400/50 focus:border-yellow-400 focus:ring-yellow-400"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:bg-yellow-400/50"
            >
              {isLoading ? "Creating account..." : "Create account"}
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
              onClick={handleGoogleSignup}
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
              Sign up with Google
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 