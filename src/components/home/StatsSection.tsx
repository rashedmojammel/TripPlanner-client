"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { api } from "@/lib/api";
import type { PaginatedTrips } from "@/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { fadeUp, staggerContainer, viewport, EASE } from "@/lib/motion";

const COLORS = ["#0ea5e9", "#ea580c", "#38bdf8", "#0284c7", "#f97316"];

function AnimatedCount({ value }: { value: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => Math.round(v).toLocaleString());
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.1, ease: EASE });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  useEffect(() => display.on("change", setText), [display]);

  return <p ref={ref} className="text-4xl font-extrabold text-accent">{text}</p>;
}

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
    { value: data?.total, label: "Curated trips", numeric: typeof data?.total === "number" },
    { value: "12+", label: "Destinations covered", numeric: false },
    { value: "4.6★", label: "Average trip rating", numeric: false },
    { value: "24/7", label: "AI concierge availability", numeric: false },
  ];

  return (
    <section className="bg-slate-900 py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="mb-10 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">By the numbers</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight">TripPlanner in numbers</h2>
          <p className="mt-2 text-slate-400">A growing catalog for every kind of traveler</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {counters.map((c) => (
              <motion.div
                key={c.label}
                variants={fadeUp}
                className="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10"
              >
                {c.numeric ? (
                  <AnimatedCount value={c.value as number} />
                ) : (
                  <p className="text-4xl font-extrabold text-accent">{c.value ?? "—"}</p>
                )}
                <p className="mt-1 text-sm text-slate-400">{c.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="h-72 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="mb-2 text-sm font-semibold text-slate-300">Trips per category</p>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "none", borderRadius: 12, color: "#fff" }}
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                />
                <Bar dataKey="trips" radius={[6, 6, 0, 0]} animationDuration={900} animationEasing="ease-out">
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}