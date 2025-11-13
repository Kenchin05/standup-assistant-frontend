"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

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
      <Card className="text-center">
        <p className="animate-pulse text-black">Loading...</p>
      </Card>
    );

  // Read-only mode
  if (hasEntry && !editing) {
    return (
      <Card className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">
            Today&apos;s Standup Summary
          </h2>
          <Button 
            onClick={() => setEditing(true)}
            variant="secondary"
            className="text-sm"
          >
            Edit
          </Button>
        </div>

        <p className="text-gray-700">
          <b className="text-black">Yesterday:</b> {form.yesterday || "—"}
        </p>
        <p className="text-gray-700">
          <b className="text-black">Today:</b> {form.today || "—"}
        </p>
        <p className="text-gray-700">
          <b className="text-black">Blockers:</b> {form.blockers || "None"}
        </p>

        {form.aiFeedback && (
          <div className="mt-2 text-sm  border-t pt-2">
            <p className="text-gray-700">
              <b className="text-black">Tone:</b> {form.aiFeedback.tone}
            </p>
            <p className="text-gray-700">
              <b className="text-black">Vagueness Score:</b> {form.aiFeedback.vague_score}/10
            </p>
            <p className="text-gray-700">
              <b className="text-black">Suggestion:</b> {form.aiFeedback.suggestion}
            </p>
          </div>
        )}

        {form.updatedAt && (
          <p className="text-xs text-gray-600 italic mt-2">
            Last updated: {new Date(form.updatedAt).toLocaleTimeString()}
          </p>
        )}
      </Card>
    );
  }

  // 🧩 Editable mode
  return (
    <Card>
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {hasEntry ? "Edit Standup" : "Submit Standup"}
        </h2>
        {hasEntry && (
          <Button
            type="button"
            onClick={() => setEditing(false)}
            variant="secondary"
            className="text-sm"
          >
            Cancel
          </Button>
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

      <Button 
        type="submit" 
        variant={hasEntry ? "secondary" : "primary"}
        className="w-full"
      >
        {hasEntry ? "Update Standup" : "Submit Standup"}
      </Button>
    </form>
    </Card>
  );
}
