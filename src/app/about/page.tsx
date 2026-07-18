import Link from "next/link";
import { Compass, Comment, Persons, Star } from "@gravity-ui/icons";

export const metadata = { title: "About — TripPlanner" };

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

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-accent to-secondary/60 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl">About TripPlanner</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            We started TripPlanner with a simple frustration: finding a good trip
            in Bangladesh meant scrolling through Facebook groups, comparing
            screenshots, and hoping the price was real. We thought travelers
            deserved better — and that AI could finally fix it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16">
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
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-extrabold text-slate-900">
            What we believe
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {v.icon}
                </span>
                <h3 className="mt-3 font-bold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-4xl font-extrabold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/trips"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-primary-dark"
          >
            <Star className="h-4 w-4" /> Explore our trips
          </Link>
        </div>
      </section>
    </div>
  );
}