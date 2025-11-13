"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";

interface Team {  
  _id: string;
  name: string;
  code: string;
  createdAt: string;
}

export default function TeamOverview() {
  const [team, setTeam] = useState<Team | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axiosClient.get("/team/me");
        setTeam(res.data);
      } catch {
        toast.error("Could not fetch team details");
      }
    };
    fetchTeam();
  }, []);

  const copyCode = async () => {
    if (!team?.code) return;
    await navigator.clipboard.writeText(team.code);
    setCopied(true);  
    toast.success("Copied join code!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!team) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-gray-500">You are not part of any team yet.</p>
      </div>
    );
  }

  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-black">
          Team: {team.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created on:{" "}
          {new Date(team.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md border border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1">Join Code</p>
          <span className="font-mono text-sm text-gray-800">
            {team.code}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          <Copy size={14} className="inline mr-1" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
        Share this code with teammates to join your team.
      </p>
    </div>
  );
}