"use client";

import { motion } from "framer-motion";
import { Star } from "@gravity-ui/icons";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

const REVIEWS = [
  {
    name: "Nusrat Jahan",
    location: "Dhaka",
    text: "The AI concierge found me a Sajek trip within my budget in under a minute. Booked it the same day — the sunrise above the clouds was everything they promised.",
  },
  {
    name: "Tanvir Hasan",
    location: "Chattogram",
    text: "I asked for a beach trip under 30,000 taka and got three real options instantly, with links. This is how every travel site should work.",
  },
  {
    name: "Farhana Rahman",
    location: "Sylhet",
    text: "As someone who organizes group tours, listing trips is effortless — the AI even writes the descriptions. My Sundarbans safari filled up in a week.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <motion.div
        className="mb-10 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-secondary">Community</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">What travelers say</h2>
        <p className="mt-2 text-slate-500">Real experiences from our community</p>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-3"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {REVIEWS.map((r) => (
          <motion.figure
            key={r.name}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex gap-0.5 text-secondary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {r.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{r.name}</p>
                <p className="text-xs text-slate-400">{r.location}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}