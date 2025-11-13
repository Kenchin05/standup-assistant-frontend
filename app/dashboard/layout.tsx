"use client";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      router.push("/login");
      return;
    }
    if (!token) {
      // rehydrate store from localStorage
      setAuth(null, savedToken);
    }
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-6">
    <h1
      onClick={() => router.push("/dashboard")}
      className="font-bold text-lg text-blue-600 cursor-pointer"
    >
      AI Standup Assistant
    </h1>
    <button
      onClick={() => router.push("/dashboard/team")}
      className="text-gray-700 hover:text-blue-600"
    >
      Team
    </button>
    <button
  onClick={() => router.push("/dashboard/history")}
  className="text-gray-700 hover:text-blue-600"
>
  History
</button>

  </div>
      </nav>
      <main className="flex-1 p-6 flex justify-center">{children}</main>
    </div>
  );
}
