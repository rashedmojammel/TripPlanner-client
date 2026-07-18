"use client";

import { Suspense } from "react";
import { useTrips, useTripFilters } from "@/hooks/useTrips";
import { TripCard } from "@/components/trips/TripCard";
import { TripCardSkeleton } from "@/components/trips/TripCardSkeleton";
import { TripFilters } from "@/components/trips/TripFilters";
import { Pagination } from "@/components/trips/Pagination";

function ExploreContent() {
  const { filters, setFilters } = useTripFilters();
  const { data, isLoading, isError } = useTrips(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Explore Trips</h1>
        <p className="mt-1 text-sm text-slate-500">
          {data ? `${data.total} trips found` : "Discover your next adventure"}
        </p>
      </div>

      <TripFilters filters={filters} setFilters={setFilters} />

      {isError && (
        <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-semibold text-red-700">Couldn't load trips.</p>
          <p className="mt-1 text-sm text-red-500">
            Make sure the server is running, then refresh.
          </p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <TripCardSkeleton key={i} />)
          : data?.data.map((trip) => <TripCard key={trip._id} trip={trip} />)}
      </div>

      {!isLoading && data?.data.length === 0 && (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
          <p className="text-lg font-bold text-slate-700">No trips match your filters</p>
          <p className="mt-1 text-sm text-slate-500">
            Try clearing filters or searching a different destination.
          </p>
        </div>
      )}

      {data && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          onChange={(page) => setFilters({ page })}
        />
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense>
      <ExploreContent />
    </Suspense>
  );
}