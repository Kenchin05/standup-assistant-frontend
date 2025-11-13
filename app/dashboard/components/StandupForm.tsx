"use client";
import { useState } from "react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

interface Feedback {
  key_tasks: string[];
  tone: string;
  vague_score: number;
  suggestion: string;
}

export default function StandupForm() {
  const [form, setForm] = useState({
    yesterday: "",
    today: "",
    blockers: "",
  });
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosClient.post("/standup", form);
      setFeedback(res.data.standup.aiFeedback);
      toast.success("Standup submitted!");
    } catch (err) {
      toast.error("Failed to submit standup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-2xl w-full">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Submit Your Daily Standup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["yesterday", "today", "blockers"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-black mb-1 capitalize"
            >
              {field}
            </label>
            <textarea
              name={field}
              id={field}
              value={(form as any)[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-black focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={`What did you do ${field}?`}
              required={field !== "blockers"}
              rows={field === "blockers" ? 2 : 3}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Standup"}
        </button>
      </form>

      {feedback && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2 text-black-800">
            AI Feedback
          </h3>
          <p>
            <b>Key Tasks:</b>{" "}
            {feedback.key_tasks.length > 0
              ? feedback.key_tasks.join(", ")
              : "No tasks extracted"}
          </p>
          <p>
            <b>Tone:</b> {feedback.tone}
          </p>
          <p>
            <b>Vagueness Score:</b> {feedback.vague_score}/10
          </p>
          <p>
            <b>Suggestion:</b> {feedback.suggestion}
          </p>
        </div>
      )}
    </div>
  );
}
