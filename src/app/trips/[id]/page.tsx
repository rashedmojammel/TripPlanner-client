"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTrip } from "@/hooks/useTrip";
import { TripCard } from "@/components/trips/TripCard";
import { CATEGORY_LABELS } from "@/lib/constants";
import { Star, MapPin, Clock, Calendar, Tag, ChevronLeft, TriangleExclamation } from "@gravity-ui/icons";
import { fadeUp, staggerContainer, viewport, EASE } from "@/lib/motion";

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="skeleton-shimmer mb-4 h-4 w-20 rounded" />
      <div className="skeleton-shimmer h-72 rounded-3xl sm:h-96" />
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <div className="skeleton-shimmer h-6 w-1/3 rounded" />
          <div className="skeleton-shimmer h-4 w-full rounded" />
          <div className="skeleton-shimmer h-4 w-full rounded" />
          <div className="skeleton-shimmer h-4 w-5/6 rounded" />
        </div>
        <div className="skeleton-shimmer h-64 rounded-2xl" />
      </div>
      <style jsx>{`
        .skeleton-shimmer {
          background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 37%, #e2e8f0 63%);
          background-size: 400% 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

export default function TripDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Next 15: params is a Promise
  const { data, isLoading, isError } = useTrip(id);

  if (isLoading) return <DetailsSkeleton />;

  if (isError || !data)
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="mx-auto max-w-5xl px-4 py-24 text-center"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          <TriangleExclamation className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Trip not found</h1>
        <p className="mt-1 text-sm text-slate-500">
          It may have been removed, or the link might be incorrect.
        </p>
        <Link
          href="/trips"
          className="mt-4 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4" /> Back to all trips
        </Link>
      </motion.div>
    );

  const trip = data.data;
  const specs = [
    { icon: <Tag className="h-4 w-4" />, label: "Category", value: CATEGORY_LABELS[trip.category] },
    { icon: <MapPin className="h-4 w-4" />, label: "Destination", value: trip.destination },
    { icon: <Clock className="h-4 w-4" />, label: "Duration", value: `${trip.durationDays} days` },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: "Start date",
      value: new Date(trip.startDate).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      }),
    },
    { icon: <Star className="h-4 w-4" />, label: "Rating", value: `${trip.rating} / 5` },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <Link
          href="/trips"
          className="group mb-4 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-slate-500 transition-colors duration-150 hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          All trips
        </Link>
      </motion.div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden rounded-3xl"
      >
        <img src={trip.imageUrl} alt={trip.title} className="h-72 w-full object-cover sm:h-96" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />
        <motion.div
          className="absolute bottom-0 p-6 text-white"
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur"
          >
            {CATEGORY_LABELS[trip.category]}
          </motion.span>
          <motion.h1 variants={fadeUp} className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {trip.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
            <MapPin className="h-4 w-4" /> {trip.destination}
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Overview</h2>
          <div className="mt-3 space-y-4 leading-relaxed text-slate-600">
            {trip.fullDescription.split("\n").filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* Key information */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24"
        >
          <p className="text-3xl font-extrabold tracking-tight text-primary">
            ৳{trip.price.toLocaleString()}
            <span className="text-sm font-medium text-slate-400"> / person</span>
          </p>
          <motion.div
            className="mt-4 space-y-3"
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="visible"
          >
            {specs.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="flex items-center gap-3 text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {s.icon}
                </span>
                <div>
                  <p className="text-xs text-slate-400">{s.label}</p>
                  <p className="font-semibold text-slate-800">{s.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.aside>
      </div>

      {/* Related trips */}
      {data.related.length > 0 && (
        <div className="mt-14">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            Similar trips
          </motion.h2>
          <motion.div
            className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {data.related.map((t) => (
              <motion.div key={t._id} variants={fadeUp}>
                <TripCard trip={t} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}