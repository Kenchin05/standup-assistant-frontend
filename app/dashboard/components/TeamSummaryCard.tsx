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
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-100 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          <div className="h-4 bg-gray-100 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-700">No team summary available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Insights</h2>
      
      <div className="space-y-5">
        <div>
          <h3 className="font-medium text-gray-800">Summary</h3>
          <p className="text-gray-700 mt-1.5 leading-relaxed">{summary.summary}</p>
        </div>

        {summary.common_blockers && summary.common_blockers.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-800">Common Blockers</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1.5 mt-1.5 pl-1">
              {summary.common_blockers.map((blocker, index) => (
                <li key={index} className="leading-relaxed">{blocker}</li>
              ))}
            </ul>
          </div>
        )}

        {summary.suggested_collaborations && summary.suggested_collaborations.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-800">Collaboration Opportunities</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1.5 mt-1.5 pl-1">
              {summary.suggested_collaborations.map((collab, index) => (
                <li key={index} className="leading-relaxed">{collab}</li>
              ))}
            </ul>
          </div>
        )}

        {summary.risks && summary.risks.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-800">Potential Risks</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1.5 mt-1.5 pl-1">
              {summary.risks.map((risk, index) => (
                <li key={index} className="leading-relaxed">{risk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
