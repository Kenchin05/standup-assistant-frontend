"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Users, Clock, BarChart2, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/lib/store";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'History', href: '/dashboard/history', icon: Clock },
  { name: 'Insights', href: '/dashboard/insights', icon: BarChart2 },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen w-64 border-r border-gray-200 bg-white p-4">
      <div className="flex flex-col flex-1">
        <div className="flex items-center h-16 px-4">
          <h1 className="text-xl font-bold text-gray-900">AI Standup</h1>
        </div>
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-black">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
