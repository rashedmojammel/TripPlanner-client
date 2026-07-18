"use client";

import { useState } from "react";
import { ChevronDown } from "@gravity-ui/icons";

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
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-sm font-semibold text-slate-900"
                aria-expanded={open === i}
              >
                {f.q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <p className="border-t border-slate-100 p-4 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}