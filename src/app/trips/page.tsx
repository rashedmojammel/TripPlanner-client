"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTrips, useTripFilters } from "@/hooks/useTrips";
import { TripCard } from "@/components/trips/TripCard";
import { TripCardSkeleton } from "@/components/trips/TripCardSkeleton";
import { TripFilters } from "@/components/trips/TripFilters";
import { Pagination } from "@/components/trips/Pagination";
import { TriangleExclamation } from "@gravity-ui/icons";
import { fadeUp, staggerContainer, EASE } from "@/lib/motion";

function ExploreContent() {
  const { filters, setFilters } = useTripFilters();
  const { data, isLoading, isError } = useTrips(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-6"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-secondary">Catalog</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">Explore Trips</h1>
        <div className="mt-1 h-5 text-sm text-slate-500">
          <AnimatePresence mode="wait">
            <motion.p
              key={data ? data.total : "loading"}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
            >
              {data ? `${data.total} trip${data.total === 1 ? "" : "s"} found` : "Discover your next adventure"}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
      >
        <TripFilters filters={filters} setFilters={setFilters} />
      </motion.div>

      {isError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
        >
          <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
            <TriangleExclamation className="h-5 w-5" />
          </span>
          <p className="mt-3 font-semibold text-red-700">Couldn't load trips.</p>
          <p className="mt-1 text-sm text-red-500">
            Make sure the server is running, then refresh.
          </p>
        </motion.div>
      )}

      {isLoading ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <TripCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.06)}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {data?.data.map((trip) => (
              <motion.div key={trip._id} layout variants={fadeUp} exit={{ opacity: 0, scale: 0.96 }}>
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!isLoading && data?.data.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center"
        >
          <p className="text-lg font-bold text-slate-700">No trips match your filters</p>
          <p className="mt-1 text-sm text-slate-500">
            Try clearing filters or searching a different destination.
          </p>
        </motion.div>
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