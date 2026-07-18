"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnifier, ArrowRight } from "@gravity-ui/icons";
import { EASE } from "@/lib/motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80&auto=format&fit=crop",
    label: "Cox's Bazar, Bangladesh",
  },
  {
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1600&q=80&auto=format&fit=crop",
    label: "Sajek Valley, Bangladesh",
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80&auto=format&fit=crop",
    label: "Sundarbans, Bangladesh",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&q=80&auto=format&fit=crop",
    label: "Saint Martin's Island, Bangladesh",
  },
  {
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80&auto=format&fit=crop",
    label: "Bali, Indonesia",
  },
];

const AUTOPLAY_MS = 5000;

const slideVariants = {
  enter: { opacity: 0, x: 40, scale: 1.04 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -40, scale: 1.04 },
};

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  function search(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/trips?search=${encodeURIComponent(q.trim())}` : "/trips");
  }

  return (
    <section
      className="relative flex h-[70vh] min-h-[580px] items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Photo carousel */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={SLIDES[slide].src}
            src={SLIDES[slide].src}
            alt={SLIDES[slide].label}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Legibility + brand wash over the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/45 to-slate-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.18),transparent_55%)]" />

      {/* Signature: a hand-drawn flight path that draws itself in on load */}
      <svg
        viewBox="0 0 900 500"
        className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-50 lg:block"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M120 400 C 320 460, 480 120, 640 160 S 860 60, 860 60"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.4 }}
        />
        <motion.circle
          cx="860" cy="60" r="4" fill="white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4, duration: 0.4, ease: EASE }}
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        <motion.div
          className="max-w-2xl text-white"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur"
          >
            ✨ AI-powered trip planning
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Where do you want<br className="hidden sm:block" /> to go next?
          </motion.h1>

          <motion.p variants={item} className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Curated trips across Bangladesh and beyond — with an AI concierge
            that matches your budget, dates, and travel style.
          </motion.p>

          <motion.form
            variants={item}
            onSubmit={search}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-slate-900/20"
          >
            <Magnifier className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try 'Sajek', 'Bali', or 'beach'..."
              className="w-full bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer rounded-xl bg-secondary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-orange-700"
            >
              Search
            </motion.button>
          </motion.form>

          <motion.div variants={item} className="mt-6 flex gap-4 text-sm">
            <Link
              href="/trips"
              className="group inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
            >
              Browse all trips
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide indicators + current location label */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={SLIDES[slide].label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-xs font-semibold tracking-wide text-white/80"
          >
            {SLIDES[slide].label}
          </motion.p>
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-white/30"
              style={{ width: i === slide ? 28 : 8, transition: "width 0.3s ease" }}
            >
              {i === slide && (
                <motion.span
                  key={slide + (paused ? "-p" : "-a")}
                  className="absolute inset-y-0 left-0 rounded-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? "0%" : "100%" }}
                  transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}