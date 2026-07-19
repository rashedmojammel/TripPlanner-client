"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Protected } from "@/components/auth/Protected";
import { useMyTrips, useDeleteTrip } from "@/hooks/useTripMutations";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Trip } from "@/types";
import { Eye, TrashBin, CirclePlus, TriangleExclamation } from "@gravity-ui/icons";
import { EASE } from "@/lib/motion";

const tableContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const rowVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2, ease: EASE } },
};

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3">
      <div className="skeleton-shimmer h-12 w-16 shrink-0 rounded-lg" />
      <div className="flex-1 space-y-2">
        <div className="skeleton-shimmer h-3.5 w-1/3 rounded" />
        <div className="skeleton-shimmer h-3 w-1/5 rounded" />
      </div>
      <div className="skeleton-shimmer hidden h-6 w-20 rounded-full sm:block" />
      <div className="skeleton-shimmer hidden h-4 w-14 rounded md:block" />
      <div className="skeleton-shimmer h-8 w-16 rounded-lg" />
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

function ManageContent() {
  const { data: trips, isLoading } = useMyTrips();
  const { mutate: deleteTrip, isPending: deleting } = useDeleteTrip();
  const [confirm, setConfirm] = useState<Trip | null>(null);

  function handleDelete() {
    if (!confirm) return;
    deleteTrip(confirm._id, {
      onSuccess: () => {
        toast.success(`"${confirm.title}" deleted`);
        setConfirm(null);
      },
      onError: () => toast.error("Failed to delete trip"),
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">Your listings</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">Manage trips</h1>
          <p className="mt-1 text-sm text-slate-500">
            {trips ? `${trips.length} listing${trips.length === 1 ? "" : "s"}` : "Loading your listings..."}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/items/add"
            className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-primary-dark"
          >
            <CirclePlus className="h-4 w-4" /> Add trip
          </Link>
        </motion.div>
      </motion.div>

      {isLoading && (
        <div className="mt-8 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <RowSkeleton key={i} />
          ))}
        </div>
      )}

      {trips && trips.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center"
        >
          <p className="text-lg font-bold text-slate-700">No trips yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Publish your first trip — the AI will even write the description.
          </p>
          <Link
            href="/items/add"
            className="mt-4 inline-block cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-dark"
          >
            Add your first trip
          </Link>
        </motion.div>
      )}

      {trips && trips.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Trip</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Start date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <motion.tbody
                className="divide-y divide-slate-100"
                variants={tableContainer}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="popLayout">
                  {trips.map((t) => (
                    <motion.tr
                      key={t._id}
                      layout
                      variants={rowVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="transition-colors duration-150 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={t.imageUrl}
                            alt=""
                            className="h-12 w-16 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-900">{t.title}</p>
                            <p className="truncate text-xs text-slate-400">{t.destination}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                          {CATEGORY_LABELS[t.category]}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        ৳{t.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{t.durationDays}d</td>
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(t.startDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1.5">
                          <Link
                            href={`/trips/${t._id}`}
                            className="cursor-pointer rounded-lg border border-slate-300 p-2 text-slate-600 transition-colors duration-150 hover:border-primary hover:text-primary"
                            aria-label={`View ${t.title}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setConfirm(t)}
                            className="cursor-pointer rounded-lg border border-slate-300 p-2 text-slate-600 transition-colors duration-150 hover:border-red-400 hover:text-red-500"
                            aria-label={`Delete ${t.title}`}
                          >
                            <TrashBin className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </motion.tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {confirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => !deleting && setConfirm(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
                <TriangleExclamation className="h-5 w-5" />
              </span>
              <h2 className="mt-3 text-lg font-bold text-slate-900">Delete this trip?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                &ldquo;<span className="font-semibold text-slate-700">{confirm.title}</span>&rdquo; will
                be permanently removed. This can&apos;t be undone.
              </p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setConfirm(null)}
                  disabled={deleting}
                  className="flex-1 cursor-pointer rounded-xl border border-slate-300 py-2.5 text-sm font-semibold transition-colors duration-150 hover:bg-slate-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 cursor-pointer rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-red-700 disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ManagePage() {
  return (
    <Protected>
      <ManageContent />
    </Protected>
  );
}