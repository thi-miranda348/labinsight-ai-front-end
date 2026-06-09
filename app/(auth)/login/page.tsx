"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";

// --- NEW IMPORTS ---
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Access our Zustand store
  const login = useAuthStore((state) => state.login);

  // Setup React Hook Form with Demo Credentials
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "demo@labinsight.com",
      password: "password123",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);

    setTimeout(() => {
      // Log the user into global state using the data they typed!
      login({
        name: "Dr. Sarah Chen", // Mocking the name for the prototype
        role: "Clinical Pathologist",
        email: data.email,
      });

      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
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

      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-md space-y-8">
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

          {/* Connect Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Provider Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    {...register("email")}
                    placeholder="dr.smith@clinic.com"
                    className={`w-full h-10 bg-background border rounded-md pl-10 pr-4 text-sm outline-none focus:border-primary transition-colors ${errors.email ? "border-destructive focus:border-destructive" : "border-input"}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
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
                    {...register("password")}
                    placeholder="••••••••"
                    className={`w-full h-10 bg-background border rounded-md pl-10 pr-4 text-sm outline-none focus:border-primary transition-colors ${errors.password ? "border-destructive focus:border-destructive" : "border-input"}`}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Sign In securely"}
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="w-full border border-border bg-muted/50 text-foreground hover:bg-muted"
              disabled={isLoading}
              onClick={() => {
                // Instantly trigger the login with demo data
                onSubmit({
                  email: "demo@labinsight.com",
                  password: "password123",
                });
              }}
            >
              Quick Demo Access
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
