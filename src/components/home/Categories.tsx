import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/constants";

const CATEGORY_IMAGES: Record<string, string> = {
  adventure: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80&auto=format&fit=crop",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&auto=format&fit=crop",
  cultural: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80&auto=format&fit=crop",
  "city-break": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80&auto=format&fit=crop",
  nature: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop",
};

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">Browse by style</h2>
        <p className="mt-2 text-slate-500">Whatever kind of traveler you are, we've got you</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
          <Link
            key={value}
            href={`/trips?category=${value}`}
            className="group relative h-40 cursor-pointer overflow-hidden rounded-2xl"
          >
            <img
              src={CATEGORY_IMAGES[value]}
              alt={label}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
            <p className="absolute bottom-3 left-3 font-bold text-white">{label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}