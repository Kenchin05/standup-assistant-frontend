"use client";
import StandupForm from "./components/StandupForm";
import TeamSummaryCard from "./components/TeamSummaryCard";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosClient.get("standup/team/insights");
        setSummary(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1>Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col justify-between">
          <StandupForm />
        </Card>

        <Card>
          {loading ? (
            <div className="text-sm text-gray-400 py-16 text-center animate-pulse">
              Analyzing team progress...
            </div>
          ) : summary ? (
            <TeamSummaryCard summary={summary} />
          ) : (
            <div className="text-sm text-gray-400 py-16 text-center">
              No AI summary yet.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
