"use client";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeRedirect() {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (token) router.push("/dashboard");
    else router.push("/login");
  }, [token]);

  return <div className="text-center mt-20 text-gray-500">Redirecting...</div>;
}
    