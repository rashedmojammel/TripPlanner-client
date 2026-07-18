"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { PaginatedTrips } from "@/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const COLORS = ["#0ea5e9", "#ea580c", "#38bdf8", "#0284c7", "#f97316"];

export function StatsSection() {
  const { data } = useQuery({
    queryKey: ["trips", { all: true }],
    queryFn: async () => (await api.get<PaginatedTrips>("/trips?limit=24")).data,
  });

  const chartData = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    name: label,
    trips: data?.data.filter((t) => t.category === value).length ?? 0,
  }));

  const counters = [
    { value: data?.total ?? "—", label: "Curated trips" },
    { value: "12+", label: "Destinations covered" },
    { value: "4.6★", label: "Average trip rating" },
    { value: "24/7", label: "AI concierge availability" },
  ];

  return (
    <section className="bg-slate-900 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold">TripPlanner in numbers</h2>
          <p className="mt-2 text-slate-400">A growing catalog for every kind of traveler</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-6">
            {counters.map((c) => (
              <div key={c.label} className="rounded-2xl bg-white/5 p-6 text-center">
                <p className="text-4xl font-extrabold text-accent">{c.value}</p>
                <p className="mt-1 text-sm text-slate-400">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="h-72 rounded-2xl bg-white/5 p-4">
            <p className="mb-2 text-sm font-semibold text-slate-300">Trips per category</p>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "none", borderRadius: 12, color: "#fff" }}
                />
                <Bar dataKey="trips" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}