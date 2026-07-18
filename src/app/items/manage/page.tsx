"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Protected } from "@/components/auth/Protected";
import { useMyTrips, useDeleteTrip } from "@/hooks/useTripMutations";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Trip } from "@/types";
import { Eye, TrashBin, CirclePlus } from "@gravity-ui/icons";

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Manage trips</h1>
          <p className="mt-1 text-sm text-slate-500">
            {trips ? `${trips.length} listing${trips.length === 1 ? "" : "s"}` : "Your listings"}
          </p>
        </div>
        <Link
          href="/items/add"
          className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-dark"
        >
          <CirclePlus className="h-4 w-4" /> Add trip
        </Link>
      </div>

      {isLoading && (
        <div className="mt-8 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      )}

      {trips && trips.length === 0 && (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
          <p className="text-lg font-bold text-slate-700">No trips yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Publish your first trip — the AI will even write the description.
          </p>
          <Link href="/items/add" className="mt-4 inline-block cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark">
            Add your first trip
          </Link>
        </div>
      )}

      {trips && trips.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Trip</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Start date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trips.map((t) => (
                <tr key={t._id} className="transition-colors hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={t.imageUrl} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
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
                  <td className="px-4 py-3 font-semibold text-slate-800">৳{t.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600">{t.durationDays}d</td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(t.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Link
                        href={`/trips/${t._id}`}
                        className="cursor-pointer rounded-lg border border-slate-300 p-2 text-slate-600 transition-colors hover:border-primary hover:text-primary"
                        aria-label={`View ${t.title}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setConfirm(t)}
                        className="cursor-pointer rounded-lg border border-slate-300 p-2 text-slate-600 transition-colors hover:border-red-400 hover:text-red-500"
                        aria-label={`Delete ${t.title}`}
                      >
                        <TrashBin className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setConfirm(null)} />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900">Delete this trip?</h2>
            <p className="mt-2 text-sm text-slate-500">
              "<span className="font-semibold">{confirm.title}</span>" will be permanently
              removed. This can't be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="flex-1 cursor-pointer rounded-xl border border-slate-300 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 cursor-pointer rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
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