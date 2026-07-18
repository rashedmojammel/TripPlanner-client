"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import type { PaginatedTrips } from "@/types";
import { TripCard } from "@/components/trips/TripCard";
import { TripCardSkeleton } from "@/components/trips/TripCardSkeleton";
import { fadeUp, staggerContainer, viewport } from "@/lib/motion";

export function PopularDestinations() {
  const { data, isLoading } = useQuery({
    queryKey: ["trips", { sort: "rating", limit: 4 }],
    queryFn: async () => (await api.get<PaginatedTrips>("/trips?sort=rating&limit=4")).data,
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <motion.div
        className="mb-10 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-secondary">Loved by travelers</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Popular right now</h2>
        <p className="mt-2 text-slate-500">Our highest-rated trips, loved by travelers</p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <TripCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {data?.data.map((t) => (
            <motion.div key={t._id} variants={fadeUp}>
              <TripCard trip={t} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}