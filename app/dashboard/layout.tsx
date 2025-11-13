"use client";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      router.push("/login");
      return;
    }
    if (!token) {
      setAuth(null, savedToken);
    }
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

     <main className="flex-1 bg-gray-50 overflow-y-auto">
  <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">{children}</div>
</main>

    </div>
  );
}
