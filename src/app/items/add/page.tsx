"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { MapPin, Clock, Comment, Star } from "@gravity-ui/icons";
import { Protected } from "@/components/auth/Protected";
import { GenerateDescription } from "@/components/ai/GenerateDescription";
import { useCreateTrip } from "@/hooks/useTripMutations";
import { CATEGORY_LABELS } from "@/lib/constants";
import { EASE } from "@/lib/motion";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&auto=format&fit=crop";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors duration-150 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function SectionCard({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={item}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {step}
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-900">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

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
        imageUrl: form.imageUrl.trim() || FALLBACK_IMAGE,
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

  const previewImage = form.imageUrl.trim() || FALLBACK_IMAGE;
  const hasPreviewContent = form.title || form.destination || form.shortDescription;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-8"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-secondary">Host a trip</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          Add a new trip
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          Fill in the basics — let the AI write the descriptions for you, then review the live
          preview before you publish.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <motion.form
          onSubmit={submit}
          className="space-y-5"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <SectionCard step={1} title="Destination & category">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" /> Destination *
                </label>
                <input
                  value={form.destination}
                  onChange={set("destination")}
                  className={inputClass}
                  placeholder="Bali, Indonesia"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Category *</label>
                <select value={form.category} onChange={set("category")} className={inputClass}>
                  <option value="">Select category</option>
                  {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </SectionCard>

          <SectionCard step={2} title="Trip logistics" description="Price, length, and departure date">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Price (৳) *</label>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={set("price")}
                  className={inputClass}
                  placeholder="25000"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <Clock className="h-3.5 w-3.5 text-slate-400" /> Duration (days) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={form.durationDays}
                  onChange={set("durationDays")}
                  className={inputClass}
                  placeholder="4"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Start date *</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={set("startDate")}
                  className={inputClass}
                />
              </div>
            </div>
          </SectionCard>

          <motion.div
            variants={item}
            className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-5 sm:p-6"
          >
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Comment className="h-3.5 w-3.5" />
              </span>
              <div>
                <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  Let AI write it for you
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                    Optional
                  </span>
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Uses the destination, category, and duration above to draft both descriptions.
                </p>
              </div>
            </div>
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
          </motion.div>

          <SectionCard step={3} title="Title & descriptions">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Title *</label>
                <input
                  value={form.title}
                  onChange={set("title")}
                  className={inputClass}
                  placeholder="Bali Beach & Temple Week"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">Short description *</label>
                  <span
                    className={`text-xs ${
                      form.shortDescription.length > 200 ? "font-medium text-red-500" : "text-slate-400"
                    }`}
                  >
                    {form.shortDescription.length}/200
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={form.shortDescription}
                  onChange={set("shortDescription")}
                  className={inputClass}
                  placeholder="One-line hook shown on the trip card"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Full description *</label>
                <textarea
                  rows={7}
                  value={form.fullDescription}
                  onChange={set("fullDescription")}
                  className={inputClass}
                  placeholder="The complete overview shown on the details page"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard step={4} title="Media" description="Optional — a default photo is used if left blank">
            <input
              value={form.imageUrl}
              onChange={set("imageUrl")}
              className={inputClass}
              placeholder="https://images.unsplash.com/..."
            />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Preview"
                className="mt-3 h-36 w-full rounded-xl object-cover ring-1 ring-slate-200"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
            )}
          </SectionCard>

          <motion.div variants={item} className="flex items-center gap-3 pt-1">
            <motion.button
              type="submit"
              disabled={isPending}
              whileHover={{ scale: isPending ? 1 : 1.02 }}
              whileTap={{ scale: isPending ? 1 : 0.98 }}
              className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
            >
              {isPending ? "Publishing..." : "Publish trip"}
            </motion.button>
            <p className="text-xs text-slate-400">You can edit or remove this anytime from Manage Trips.</p>
          </motion.div>
        </motion.form>

        {/* Live preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          className="lg:sticky lg:top-24"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            Live preview
          </p>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src={previewImage}
                alt="Trip preview"
                className="h-full w-full object-cover"
                onError={(e) => ((e.target as HTMLImageElement).src = FALLBACK_IMAGE)}
              />
              {form.category && (
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur">
                  {CATEGORY_LABELS[form.category as keyof typeof CATEGORY_LABELS]}
                </span>
              )}
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                <Star className="h-3 w-3 text-secondary" /> New
              </span>
            </div>
            <div className="p-4">
              {hasPreviewContent ? (
                <>
                  <h3 className="line-clamp-1 font-bold text-slate-900">
                    {form.title || "Your trip title"}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {form.shortDescription || "Short description will appear here."}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="line-clamp-1">{form.destination || "Destination"}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {form.durationDays || "—"}d
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                    <p className="text-lg font-extrabold tracking-tight text-primary">
                      ৳{form.price ? Number(form.price).toLocaleString() : "0"}
                    </p>
                    <span className="rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-400">
                      Preview
                    </span>
                  </div>
                </>
              ) : (
                <p className="py-4 text-center text-sm text-slate-400">
                  Start filling in the form to see your trip card here.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
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