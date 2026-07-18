"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "@gravity-ui/icons";
import { fadeUp, staggerContainer, viewport, EASE } from "@/lib/motion";

const FAQS = [
  { q: "How does the AI concierge work?", a: "Tell it your budget, dates, or travel style in plain language. It searches our real trip catalog and recommends matching trips with direct links — it never invents trips that don't exist." },
  { q: "Are the prices per person?", a: "Yes — all listed prices are per person in Bangladeshi Taka (৳), and each trip's details page lists exactly what's included." },
  { q: "Can I list my own trips?", a: "Absolutely. Create a free account, go to Add Trip, and our AI will even write a professional description for your listing from a few basic details." },
  { q: "Do you cover international destinations?", a: "Yes — alongside the best of Bangladesh (Sajek, Sundarbans, Cox's Bazar), we feature trips to Bali, Bangkok, Istanbul, Tokyo, the Maldives, and more." },
  { q: "How do I get the best recommendations?", a: "Be specific with the concierge: mention your budget, how many days you have, and the vibe you want — like 'relaxing beach trip under ৳40,000 for 4 days'." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          className="mb-10 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">Questions</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
        </motion.div>

        <motion.div
          className="space-y-3"
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                variants={fadeUp}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-200"
                style={{ boxShadow: isOpen ? "0 4px 20px -4px rgba(15,23,42,0.08)" : "none" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-sm font-semibold text-slate-900"
                  aria-expanded={isOpen}
                >
                  {f.q}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="ml-3 shrink-0 text-slate-400"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-slate-100 p-4 text-sm leading-relaxed text-slate-600">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}