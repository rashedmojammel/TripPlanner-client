"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORY_LABELS } from "@/lib/constants";
import { fadeUp, scaleIn, staggerContainer, viewport } from "@/lib/motion";

const CATEGORY_IMAGES: Record<string, string> = {
  adventure: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80&auto=format&fit=crop",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&auto=format&fit=crop",
  cultural: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80&auto=format&fit=crop",
  "city-break": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80&auto=format&fit=crop",
  nature: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop",
};

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <motion.div
        className="mb-10 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-secondary">Browse</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Find your style</h2>
        <p className="mt-2 text-slate-500">Whatever kind of traveler you are, we've got you</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-4 md:grid-cols-5"
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
          <motion.div key={value} variants={scaleIn}>
            <Link
              href={`/trips?category=${value}`}
              className="group relative block h-40 cursor-pointer overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg"
            >
              <img
                src={CATEGORY_IMAGES[value]}
                alt={label}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent transition-opacity duration-300 group-hover:from-slate-900/85" />
              <p className="absolute bottom-3 left-3 font-bold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                {label}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}