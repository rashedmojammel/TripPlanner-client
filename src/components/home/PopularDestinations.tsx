"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { PaginatedTrips } from "@/types";
import { TripCard } from "@/components/trips/TripCard";
import { TripCardSkeleton } from "@/components/trips/TripCardSkeleton";

export function PopularDestinations() {
  const { data, isLoading } = useQuery({
    queryKey: ["trips", { sort: "rating", limit: 4 }],
    queryFn: async () => (await api.get<PaginatedTrips>("/trips?sort=rating&limit=4")).data,
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">Popular right now</h2>
        <p className="mt-2 text-slate-500">Our highest-rated trips, loved by travelers</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <TripCardSkeleton key={i} />)
          : data?.data.map((t) => <TripCard key={t._id} trip={t} />)}
      </div>
    </section>
  );
}