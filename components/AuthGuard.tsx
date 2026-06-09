"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If the user is not authenticated, back to login
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // If they aren't authenticated, return nothing while the router redirects them
  if (!isAuthenticated) {
    return null;
  }

  // If they ARE authenticated, render the page normally
  return <>{children}</>;
}
