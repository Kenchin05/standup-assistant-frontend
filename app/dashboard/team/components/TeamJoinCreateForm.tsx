"use client";
import { useState } from "react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

export default function TeamJoinCreateForm() {
  const [joinCode, setJoinCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode) return toast.error("Enter a team code first!");
    try {
      setLoading(true);
      await axiosClient.post("/team/join", { code: joinCode.trim() });
      toast.success("Joined team successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to join team");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName) return toast.error("Enter a team name first!");
    try {
      setLoading(true);
      await axiosClient.post("/team/create", { name: teamName.trim() });
      toast.success("Team created!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-lg font-semibold">Join or Create a Team</h2>

      {/* Join Section */}
      <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Enter team code (e.g., TcbNIG)"
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Join
        </button>
      </form>

      <div className="text-center text-gray-400 text-sm">— OR —</div>

      {/* Create Section */}
      <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="New team name"
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}
