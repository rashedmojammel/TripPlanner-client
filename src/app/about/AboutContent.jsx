"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Compass, Comment, Persons, Star } from "@gravity-ui/icons";

const VALUES = [
  {
    icon: <Compass className="h-6 w-6" />,
    title: "Curation over clutter",
    desc: "Every trip on TripPlanner is a real, complete listing with honest pricing and detailed itineraries — no filler, no fake deals.",
  },
  {
    icon: <Comment className="h-6 w-6" />,
    title: "AI that actually helps",
    desc: "Our concierge doesn't guess. It searches the live catalog and recommends only trips that really exist, matched to your budget and dates.",
  },
  {
    icon: <Persons className="h-6 w-6" />,
    title: "Built for organizers too",
    desc: "Local tour organizers list trips in minutes — our AI writes professional descriptions so great trips aren't held back by marketing.",
  },
];

const STATS = [
  { value: "18+", label: "Curated trips" },
  { value: "12+", label: "Destinations" },
  { value: "5", label: "Travel styles" },
  { value: "24/7", label: "AI assistance" },
];

function fadeUp(delay = 0) {
  return {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
  };
}

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// Animates "18+" -> counts 0 to 18, keeps the "+" suffix. Handles "24/7" -> 0 to 24 + "/7".
function AnimatedStat({ value }) {
  const match = value.match(/^(\d+)(.*)$/);
  const number = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1200, bounce: 0 });
  const displayRef = useRef(null);

  useEffect(() => {
    if (inView && number !== null) motionVal.set(number);
  }, [inView, number, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (displayRef.current) displayRef.current.textContent = Math.round(v);
    });
  }, [spring]);

  if (number === null) {
    return <p ref={ref} className="text-4xl font-extrabold text-primary">{value}</p>;
  }

  return (
    <p ref={ref} className="text-4xl font-extrabold text-primary">
      <span ref={displayRef}>0</span>
      {suffix}
    </p>
  );
}

export default function AboutContent() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary/60 py-16 text-center text-white">
        <motion.div
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-3xl px-4">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp(0)}
            className="text-4xl font-extrabold sm:text-5xl"
          >
            About TripPlanner
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp(0.15)}
            className="mx-auto mt-4 max-w-2xl text-lg text-white/85"
          >
            We started TripPlanner with a simple frustration: finding a good trip
            in Bangladesh meant scrolling through Facebook groups, comparing
            screenshots, and hoping the price was real. We thought travelers
            deserved better — and that AI could finally fix it.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp(0)}
        className="mx-auto max-w-3xl px-4 py-16"
      >
        <h2 className="text-2xl font-extrabold text-slate-900">Our story</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-slate-600">
          <p>
            TripPlanner is a platform where curated trips — from Sajek's cloud
            valleys to Tokyo's neon streets — live in one searchable, filterable
            catalog with transparent pricing in Taka. No screenshots, no DMs, no
            guesswork.
          </p>
          <p>
            What makes us different is the AI layer on top. Our travel concierge
            reads your request the way a good travel agent would — "something
            relaxing, under 30 thousand, 3 days" — and answers with real trips
            from the catalog, linked and ready to explore. And for the tour
            organizers who make these trips happen, our AI writing assistant
            turns a destination and a duration into a polished listing in
            seconds.
          </p>
          <p>
            We're just getting started. Reviews, bookings, and organizer
            analytics are on the roadmap — but the mission stays the same:
            make discovering your next trip the easiest part of traveling.
          </p>
        </div>
      </motion.section>

      {/* Values */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp(0)}
            className="text-center text-2xl font-extrabold text-slate-900"
          >
            What we believe
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerParent}
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp(0)}
                whileHover={{ y: -6, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {v.icon}
                </span>
                <h3 className="mt-3 font-bold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats + CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerParent}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp(0)}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <AnimatedStat value={s.value} />
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp(0.2)}
          className="mt-10 text-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href="/trips"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-primary-dark"
            >
              <Star className="h-4 w-4" /> Explore our trips
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}