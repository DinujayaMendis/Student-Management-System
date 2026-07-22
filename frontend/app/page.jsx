"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}
