"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";
import { Trash2, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Standup {
  _id: string;
  yesterday: string;
  today: string;
  blockers: string;
  aiFeedback?: {
    key_tasks: string[];
    tone: string;
    vague_score: number;
    suggestion: string;
  };
  date: string;
  updatedAt?: string;
}

export default function StandupHistoryList() {
  const [standups, setStandups] = useState<Standup[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all standups once on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosClient.get("/standup/me");
        setStandups(res.data);
      } catch {
        toast.error("Failed to load your standup history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this standup?")) return;
    try {
      await axiosClient.delete(`/standup/${id}`);
      toast.success("Standup deleted!");
      setStandups((prev) => prev.filter((s) => s._id !== id));
    } catch {
      toast.error("Failed to delete standup");
    }
  };

  const handleEdit = (standup: Standup) => {
    const todayStr = new Date().toDateString();
    const standupDate = new Date(standup.date).toDateString();

    if (todayStr !== standupDate) {
      toast.error("You can only edit today's standup.");
      return;
    }

    // Save current standup in localStorage for dashboard prefill
    localStorage.setItem("editStandup", JSON.stringify(standup));
    toast("Redirecting to edit your standup...");
    router.push("/dashboard");
  };

  if (loading)
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <p className="animate-pulse text-gray-700">Loading history...</p>
      </div>
    );

  if (!standups.length)
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <p className="text-gray-700">No standup entries yet.</p>
      </div>
    );

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">My Standup History</h2>

      {standups.map((s) => (
        <div
          key={s._id}
          className="bg-white p-5 rounded-xl shadow-sm hover:shadow transition border border-gray-100"
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-gray-700 font-medium">
                {new Date(s.date).toLocaleDateString("en-IN", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </h2>
              <p className="text-xs text-gray-600">
                Last updated:{" "}
                {s.updatedAt
                  ? new Date(s.updatedAt).toLocaleTimeString()
                  : "—"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleEdit(s)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit3 size={18} />
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="text-sm space-y-2 text-gray-800">
            <p className="text-gray-700"  >
              <span className="font-medium text-gray-900">Yesterday:</span> {s.yesterday || "—"}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Today:</span> {s.today || "—"}
            </p>
            {s.blockers && (
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Blockers:</span> {s.blockers}
              </p>
            )}
          </div>

          {s.aiFeedback && (
            <div className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-700">
              <p className="mb-1">
                <span className="font-medium text-gray-900">Tone:</span>{" "}
                <span
                  className={`font-medium ${
                    s.aiFeedback.tone === "frustrated"
                      ? "text-red-600"
                      : s.aiFeedback.tone === "positive"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {s.aiFeedback.tone.charAt(0).toUpperCase() + s.aiFeedback.tone.slice(1)}
                </span>
              </p>
              <p className="mb-1 ">
                <span className="font-medium text-gray-900">Vagueness:</span>{" "}
                <span className="font-medium text-gray-700    ">
                  {s.aiFeedback.vague_score}/10
                </span>
              </p>
              <p className="text-gray-900">
                <span className="font-medium text-gray-900">Suggestion:</span>{" "}
                <span className="italic text-gray-700">{s.aiFeedback.suggestion}</span>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
