"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  clinic: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      // Save their custom name to the global store
      login({
        name: `Dr. ${data.firstName} ${data.lastName}`,
        role: "Attending Physician",
        email: data.email,
        clinic: data.clinic,
      });
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md bg-background border rounded-2xl shadow-sm p-8 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-xl mb-2">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Create an Account
          </h2>
          <p className="text-sm text-muted-foreground">
            Register your clinical credentials
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                First Name
              </label>
              <input
                {...register("firstName")}
                className={`w-full h-10 border rounded-md px-3 text-sm outline-none ${errors.firstName ? "border-destructive" : ""}`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Last Name
              </label>
              <input
                {...register("lastName")}
                className={`w-full h-10 border rounded-md px-3 text-sm outline-none ${errors.lastName ? "border-destructive" : ""}`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">
              Clinic / Organization
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                {...register("clinic")}
                className={`w-full h-10 border rounded-md pl-10 pr-3 text-sm outline-none ${errors.clinic ? "border-destructive" : ""}`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">
              Work Email
            </label>
            <input
              {...register("email")}
              className={`w-full h-10 border rounded-md px-3 text-sm outline-none ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && (
              <p className="text-[10px] text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full h-10 border rounded-md px-3 text-sm outline-none ${errors.password ? "border-destructive" : ""}`}
            />
            {errors.password && (
              <p className="text-[10px] text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex gap-3 items-start mt-6">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              By registering, you confirm that you are an authorized healthcare
              provider. All access is logged and monitored.
            </p>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
