"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

interface TeamSummary {
  summary: string;
  common_blockers: string[];
  suggested_collaborations: string[];
  risks: string[];
}

export default function TeamSummaryCard() {
  const [summary, setSummary] = useState<TeamSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosClient.get("/standup/team/insights");
        setSummary(res.data);
      } catch (err) {
        toast.error("Failed to load team summary");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="bg-white shadow-md p-6 rounded-2xl w-full text-center">
        <p className="text-gray-500 animate-pulse">Loading team summary...</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-white shadow-md p-6 rounded-2xl w-full text-center">
        <p className="text-gray-500">No team summary available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md p-6 rounded-2xl w-full mt-6">
      <h2 className="text-xl font-semibold mb-3 text-black">
        Team Summary (AI)
      </h2>
      <p className="mb-4 text-gray-700">{summary.summary}</p>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <b className="text-black font-bold">Common Blockers:</b>{" "}
          {summary.common_blockers.length
            ? summary.common_blockers.join(", ")
            : "None"}
        </p>
        <p>
          <b className="text-black font-bold">Collaborations:</b>{" "}
          {summary.suggested_collaborations.length
            ? summary.suggested_collaborations.join(", ")
            : "None"}
        </p>
        <p>
          <b className="text-black font-bold">Risks:</b>{" "}
          {summary.risks.length ? summary.risks.join(", ") : "None"}
        </p>
      </div>
    </div>
  );
}
