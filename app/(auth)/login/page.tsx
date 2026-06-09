"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an authentication request
    setTimeout(() => {
      setIsLoading(false);
      router.push("/"); // Redirect to dashboard after login
    }, 1500);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left Side - Brand/Hero (Hidden on mobile) */}
      <div className="hidden md:flex flex-col justify-between bg-primary/5 p-12 border-r">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl tracking-tight text-primary">
            LabInsight AI
          </span>
        </div>
        <div className="space-y-6 max-w-sm">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Next-generation clinical diagnostics.
          </h1>
          <p className="text-muted-foreground text-lg">
            Access AI-powered lab summaries, patient histories, and predictive
            risk analysis in seconds.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 LabInsight Systems. HIPAA Compliant.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 md:hidden justify-center mb-8">
            <Activity className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl tracking-tight text-primary">
              LabInsight AI
            </span>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">
              Provider Login
            </h2>
            <p className="text-muted-foreground">
              Enter your credentials to access the portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Provider Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    placeholder="dr.smith@clinic.com"
                    className="w-full h-10 bg-background border border-input rounded-md pl-10 pr-4 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-10 bg-background border border-input rounded-md pl-10 pr-4 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Sign In securely"}
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Request clinic access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
