"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Protected } from "@/components/auth/Protected";
import { GenerateDescription } from "@/components/ai/GenerateDescription";
import { useCreateTrip } from "@/hooks/useTripMutations";
import { CATEGORY_LABELS } from "@/lib/constants";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors";

function AddTripForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateTrip();

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    imageUrl: "",
    destination: "",
    price: "",
    durationDays: "",
    category: "",
    startDate: "",
  });

  function set(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm({ ...form, [field]: e.target.value });
  }

  function validate(): string | null {
    if (form.title.trim().length < 3) return "Title must be at least 3 characters";
    if (form.shortDescription.trim().length < 10)
      return "Short description must be at least 10 characters";
    if (form.shortDescription.length > 200)
      return "Short description must be under 200 characters";
    if (form.fullDescription.trim().length < 30)
      return "Full description must be at least 30 characters";
    if (form.destination.trim().length < 2) return "Destination is required";
    if (!form.price || Number(form.price) < 0) return "Enter a valid price";
    if (!form.durationDays || Number(form.durationDays) < 1)
      return "Duration must be at least 1 day";
    if (!form.category) return "Please select a category";
    if (!form.startDate) return "Please pick a start date";
    return null;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);

    mutate(
      {
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        fullDescription: form.fullDescription.trim(),
        // optional image URL per requirements — fallback keeps cards uniform
        imageUrl:
          form.imageUrl.trim() ||
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&auto=format&fit=crop",
        destination: form.destination.trim(),
        price: Number(form.price),
        durationDays: Number(form.durationDays),
        category: form.category,
        startDate: form.startDate,
      },
      {
        onSuccess: (trip) => {
          toast.success("Trip published!");
          router.push(`/trips/${trip._id}`);
        },
        onError: (e: unknown) => {
          const msg =
            (e as { response?: { data?: { message?: string } } })?.response?.data
              ?.message ?? "Failed to create trip";
          toast.error(msg);
        },
      }
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900">Add a new trip</h1>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the basics — let the AI write the descriptions for you.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Destination *</label>
            <input value={form.destination} onChange={set("destination")} className={inputClass} placeholder="Bali, Indonesia" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Category *</label>
            <select value={form.category} onChange={set("category")} className={inputClass}>
              <option value="">Select category</option>
              {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Price (৳) *</label>
            <input type="number" min="0" value={form.price} onChange={set("price")} className={inputClass} placeholder="25000" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Duration (days) *</label>
            <input type="number" min="1" max="60" value={form.durationDays} onChange={set("durationDays")} className={inputClass} placeholder="4" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Start date *</label>
            <input type="date" value={form.startDate} onChange={set("startDate")} className={inputClass} />
          </div>
        </div>

        {/* AI Content Generator — reads live form values */}
        <GenerateDescription
          destination={form.destination}
          durationDays={Number(form.durationDays) || 0}
          category={form.category}
          onGenerated={(c) =>
            setForm((f) => ({
              ...f,
              shortDescription: c.shortDescription,
              fullDescription: c.fullDescription,
            }))
          }
        />

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
          <input value={form.title} onChange={set("title")} className={inputClass} placeholder="Bali Beach & Temple Week" />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Short description *</label>
            <span className={`text-xs ${form.shortDescription.length > 200 ? "text-red-500" : "text-slate-400"}`}>
              {form.shortDescription.length}/200
            </span>
          </div>
          <textarea rows={2} value={form.shortDescription} onChange={set("shortDescription")} className={inputClass} placeholder="One-line hook shown on the trip card" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full description *</label>
          <textarea rows={7} value={form.fullDescription} onChange={set("fullDescription")} className={inputClass} placeholder="The complete overview shown on the details page" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Image URL <span className="text-slate-400">(optional)</span>
          </label>
          <input value={form.imageUrl} onChange={set("imageUrl")} className={inputClass} placeholder="https://images.unsplash.com/..." />
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Preview"
              className="mt-2 h-36 w-full rounded-xl object-cover"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-dark disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {isPending ? "Publishing..." : "Publish trip"}
        </button>
      </form>
    </div>
  );
}

export default function AddTripPage() {
  return (
    <Protected>
      <AddTripForm />
    </Protected>
  );
}