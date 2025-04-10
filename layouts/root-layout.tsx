"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthLayout from "@layouts/auth-layer";
import DashboardLayout from "@layouts/dashboard-layout";

const publicRoutes = ["/login", "/signup"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const supabase = createClient();

  console.log("RootLayout rendered with pathname:", pathname);
  console.log("Initial auth state:", isAuthenticated);

  useEffect(() => {
    console.log("useEffect triggered");

    const checkAuth = async () => {
      console.log("Checking authentication...");
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Session status:", !!session);
      setIsAuthenticated(!!session);

      // Redirect if needed
      if (!session && !publicRoutes.includes(pathname)) {
        console.log("Redirecting to login - no session and private route");
        router.push("/login");
      } else if (session && publicRoutes.includes(pathname)) {
        console.log("Redirecting to dashboard - has session on public route");
        router.push("/dashboard");
      }
    };

    checkAuth();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", !!session);
      setIsAuthenticated(!!session);
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [pathname, router, supabase]);

  if (isAuthenticated === null) {
    console.log("Rendering loading state");
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && publicRoutes.includes(pathname)) {
    console.log("Rendering AuthLayout");
    return <AuthLayout>{children}</AuthLayout>;
  }

  console.log("Rendering DashboardLayout");
  return <DashboardLayout>{children}</DashboardLayout>;
}
