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
    <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">
        Team: {team.name}
      </h2>
      <p className="text-sm text-gray-600">
        Created on: {new Date(team.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
        <div>
          <p className="text-sm text-gray-700">
            <b>Join Code:</b> {team.code}
          </p>
          <p className="text-xs text-gray-500">
            Share this code with teammates to join your team
          </p>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
        >
          <Copy size={16} className="mr-1" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
