"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Magnifier } from "@gravity-ui/icons";

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function search(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/trips?search=${encodeURIComponent(q.trim())}` : "/trips");
  }

  return (
    <section className="relative flex h-[65vh] min-h-[480px] items-center overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary/60">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.3),transparent_50%)]" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 animate-pulse rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        <div className="max-w-2xl text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            ✨ AI-powered trip planning
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-6xl">
            Where do you want to go next?
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Curated trips across Bangladesh and beyond — with an AI concierge
            that matches your budget, dates, and travel style.
          </p>

          <form
            onSubmit={search}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl"
          >
            <Magnifier className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try 'Sajek', 'Bali', or 'beach'..."
              className="w-full bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-secondary px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-orange-700"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex gap-4 text-sm">
            <Link href="/trips" className="font-semibold text-white underline-offset-4 hover:underline">
              Browse all trips →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}