"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Trip } from "@/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import { Star, MapPin, Clock } from "@gravity-ui/icons";

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
    >
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={trip.imageUrl}
          alt={trip.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
          {CATEGORY_LABELS[trip.category]}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star className="h-3 w-3 text-secondary" /> {trip.rating}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-bold text-slate-900 transition-colors duration-150 group-hover:text-primary">
          {trip.title}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
          {trip.shortDescription}
        </p>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{trip.destination.split(",")[0]}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {trip.durationDays}d
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <p className="text-lg font-extrabold tracking-tight text-primary">
            ৳{trip.price.toLocaleString()}
          </p>
          <Link
            href={`/trips/${trip._id}`}
            className="cursor-pointer rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-white transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}