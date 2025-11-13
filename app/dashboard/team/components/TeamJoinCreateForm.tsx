"use client";
import { useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { toast } from "react-hot-toast";

export default function TeamJoinCreateForm() {
  const [joinCode, setJoinCode] = useState("");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!joinCode.trim()) return toast.error("Enter a team code!");
    try {
      setLoading(true);
      await axiosClient.post("/team/join", { code: joinCode.trim() });
      toast.success("Joined team successfully!");
    } catch {
      toast.error("Invalid or expired team code.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!teamName.trim()) return toast.error("Enter a team name!");
    try {
      setLoading(true);
      await axiosClient.post("/team/create", { name: teamName.trim() });
      toast.success("Team created successfully!");
      setTeamName("");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Join Section */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-black">
          Join Existing Team
        </p>
        <div className="flex gap-3">
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Enter team code (e.g., TcbNIG)"
            className="input flex-1 bg-gray-100"
          />
          <button
            onClick={handleJoin}
            disabled={loading}
            className="btn btn-primary px-4 py-2"
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center text-black text-xs">
        — OR —
      </div>

      {/* Create Section */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-black">
          Create New Team
        </p>
        <div className="flex gap-3">
          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="New team name"
            className="input flex-1 bg-gray-100"
          />
          <button
            onClick={handleCreate}
            disabled={loading}
            className="btn btn-secondary px-4 py-2"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
