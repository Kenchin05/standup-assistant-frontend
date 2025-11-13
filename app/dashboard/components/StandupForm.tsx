"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

interface Standup {
  _id?: string;
  yesterday: string;
  today: string;
  blockers: string;
  aiFeedback?: {
    tone: string;
    vague_score: number;
    suggestion: string;
  };
  updatedAt?: string;
}

export default function StandupForm() {
  const [form, setForm] = useState<Standup>({
    yesterday: "",
    today: "",
    blockers: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [hasEntry, setHasEntry] = useState(false);

  // Fetch today's standup on mount
  useEffect(() => {
    const editData = localStorage.getItem("editStandup");
  if (editData) {
    const parsed = JSON.parse(editData);
    setForm(parsed);
    setEditing(true);
    setHasEntry(true);
    localStorage.removeItem("editStandup");
  } else {
    const fetchToday = async () => {
      try {
        const res = await axiosClient.get("/standup/me");
        const today = new Date().toDateString();
        const todayEntry = res.data.find(
          (s: any) => new Date(s.date).toDateString() === today
        );
        if (todayEntry) {
          setForm(todayEntry);
          setHasEntry(true);
        }
      } catch {
        toast.error("Couldn't load today's standup");
      } finally {
        setLoading(false);
      }
    };
    fetchToday();
  }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (hasEntry && editing) {
        await axiosClient.put("/standup/update", form);
        toast.success("Standup updated!");
      } else {
        await axiosClient.post("/standup", form);
        toast.success("Standup submitted!");
        setHasEntry(true);
      }
      setEditing(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error saving standup");
    }
  };

  if (loading)
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <p className="animate-pulse text-gray-500">Loading...</p>
      </div>
    );

  // Read-only mode
  if (hasEntry && !editing) {
    return (
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Today’s Standup Summary
          </h2>
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
        </div>

        <p>
          <b>Yesterday:</b> {form.yesterday || "—"}
        </p>
        <p>
          <b>Today:</b> {form.today || "—"}
        </p>
        <p>
          <b>Blockers:</b> {form.blockers || "None"}
        </p>

        {form.aiFeedback && (
          <div className="mt-2 text-sm text-gray-700 border-t pt-2">
            <p>
              <b>Tone:</b> {form.aiFeedback.tone}
            </p>
            <p>
              <b>Vagueness Score:</b> {form.aiFeedback.vague_score}/10
            </p>
            <p>
              <b>Suggestion:</b> {form.aiFeedback.suggestion}
            </p>
          </div>
        )}

        {form.updatedAt && (
          <p className="text-xs text-gray-400 italic mt-2">
            Last updated: {new Date(form.updatedAt).toLocaleTimeString()}
          </p>
        )}
      </div>
    );
  }

  // 🧩 Editable mode
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {hasEntry ? "Edit Standup" : "Submit Standup"}
        </h2>
        {hasEntry && (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ✖ Cancel
          </button>
        )}
      </div>

      {["yesterday", "today", "blockers"].map((field) => (
        <div key={field}>
          <label className="block text-sm text-gray-600 capitalize mb-1">
            {field}
          </label>
          <textarea
            name={field}
            value={(form as any)[field]}
            onChange={handleChange}
            placeholder={`What did you do ${field}?`}
            className="w-full border rounded-lg p-2 h-20"
          />
        </div>
      ))}

      <button
        type="submit"
        className={`w-full py-2 rounded text-white transition ${
          hasEntry
            ? "bg-yellow-600 hover:bg-yellow-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {hasEntry ? "Update Standup" : "Submit Standup"}
      </button>
    </form>
  );
}
