"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

interface Team {
  _id: string;
  name: string;
  createdAt: string;
}

export default function TeamOverview() {
  const [team, setTeam] = useState<Team | null>(null);

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

  if (!team) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-gray-500">You are not part of any team yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Team: {team.name}
      </h2>
      <p className="text-sm text-gray-600">
        Created on: {new Date(team.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
