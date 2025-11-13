"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { Card } from "@/components/ui/Card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface ToneDistribution {
  name: string;
  value: number;
  color: string;
  [key: string]: any; 
}

interface VaguenessPoint {
  date: string;
  value: number;
}

interface MetricsData {
  totalStandups: number;
  avgVagueness: number;
  positiveTonePercent: number;
  streakDays: number;
  vaguenessTrend: VaguenessPoint[];
  toneDistribution: ToneDistribution[];
  aiSummary: string;
}
export default function InsightsPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axiosClient.get("/insights");
        setMetrics(res.data);
      } catch (err) {
        console.error("Error fetching insights:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-700 animate-pulse">
        Loading insights...
      </div>
    );

  if (!metrics)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-700">
        No insights yet. Submit a few standups to generate data!
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black tracking-tight">
          Insights Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Standups", value: metrics.totalStandups },
          { label: "Avg Vagueness", value: `${metrics.avgVagueness}/10` },
          { label: "Positive Tone %", value: `${metrics.positiveTonePercent}%` },
          { label: "Active Streak", value: `${metrics.streakDays} days` },
        ].map((m, i) => (
          <Card key={i} className="text-center p-4 hover:shadow-md">
            <p className="text-xs uppercase tracking-wide text-black font-semibold">
              {m.label}
            </p>
            <p className="text-xl font-semibold text-gray-700">
              {m.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4 text-black">Vagueness Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={metrics.vaguenessTrend}>
              <XAxis dataKey="date" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="vague_score" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Tone Distribution */}
        <Card>
  <h2 className="text-lg font-semibold mb-4 text-black">Tone Distribution</h2>
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
                data={metrics.toneDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {metrics.toneDistribution.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#2563eb", "#22c55e", "#f97316", "#ef4444"][index % 4]}
                  />
                ))}
              </Pie>
      <Tooltip 
        formatter={(value: number, name: string) => [
          value,
          name
        ]} 
      />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</Card>
      </div>

      {/* AI Insight */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 text-black">AI Summary</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {metrics.aiSummary ||
            "AI has not generated insights yet. Submit more standups for better analysis."}
        </p>
      </Card>
    </div>
  );
}
