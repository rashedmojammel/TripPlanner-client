"use client";

import { motion } from "framer-motion";
import { Magnifier, Comment, MapPin } from "@gravity-ui/icons";
import { fadeUp, staggerContainer, viewport, EASE } from "@/lib/motion";

const STEPS = [
  {
    icon: <Magnifier className="h-6 w-6" />,
    title: "Discover",
    desc: "Browse curated trips with powerful filters for category, budget, and destination.",
  },
  {
    icon: <Comment className="h-6 w-6" />,
    title: "Ask our AI concierge",
    desc: "Tell the chat assistant your budget and dates — it recommends real trips from our catalog.",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Travel",
    desc: "Pick your trip, check the details, and you're ready for your next adventure.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="mb-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">The route</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">How it works</h2>
          <p className="mt-2 text-slate-500">From dream to departure in three steps</p>
        </motion.div>

        <div className="relative">
          {/* Signature flight-path connecting the sequence — desktop only */}
          <svg
            viewBox="0 0 800 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-0 right-0 top-9 hidden h-10 w-full md:block"
            aria-hidden="true"
          >
            <motion.path
              d="M 130 20 H 670"
              stroke="currentColor"
              className="text-primary/25"
              strokeWidth="2"
              strokeDasharray="1 12"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewport}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
          </svg>

          <motion.div
            className="relative grid gap-6 md:grid-cols-3"
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {s.icon}
                </span>
                <p className="mt-3 text-xs font-bold tracking-wide text-secondary">STEP {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}