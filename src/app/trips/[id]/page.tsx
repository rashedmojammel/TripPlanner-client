"use client";

import { use } from "react";
import Link from "next/link";
import { useTrip } from "@/hooks/useTrip";
import { TripCard } from "@/components/trips/TripCard";
import { CATEGORY_LABELS } from "@/lib/constants";
import { Star, MapPin, Clock, Calendar, Tag, ChevronLeft } from "@gravity-ui/icons";

export default function TripDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Next 15: params is a Promise
  const { data, isLoading, isError } = useTrip(id);

  if (isLoading)
    return (
      <div className="mx-auto max-w-5xl animate-pulse px-4 py-8">
        <div className="h-80 rounded-3xl bg-slate-200" />
        <div className="mt-6 h-8 w-2/3 rounded bg-slate-200" />
        <div className="mt-4 h-4 w-full rounded bg-slate-100" />
        <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
      </div>
    );

  if (isError || !data)
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Trip not found</h1>
        <Link href="/trips" className="mt-4 inline-block font-semibold text-primary hover:underline">
          ← Back to all trips
        </Link>
      </div>
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
      <Link
        href="/trips"
        className="mb-4 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> All trips
      </Link>

      {/* Hero image */}
      <div className="relative overflow-hidden rounded-3xl">
        <img src={trip.imageUrl} alt={trip.title} className="h-72 w-full object-cover sm:h-96" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
            {CATEGORY_LABELS[trip.category]}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{trip.title}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
            <MapPin className="h-4 w-4" /> {trip.destination}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Overview */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">Overview</h2>
          <div className="mt-3 space-y-4 leading-relaxed text-slate-600">
            {trip.fullDescription.split("\n").filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Key information */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-3xl font-extrabold text-primary">
            ৳{trip.price.toLocaleString()}
            <span className="text-sm font-medium text-slate-400"> / person</span>
          </p>
          <div className="mt-4 space-y-3">
            {specs.map((s) => (
              <div key={s.label} className="flex items-center gap-3 text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {s.icon}
                </span>
                <div>
                  <p className="text-xs text-slate-400">{s.label}</p>
                  <p className="font-semibold text-slate-800">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Related trips */}
      {data.related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Similar trips</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.related.map((t) => <TripCard key={t._id} trip={t} />)}
          </div>
        </div>
      )}
    </div>
  );
}