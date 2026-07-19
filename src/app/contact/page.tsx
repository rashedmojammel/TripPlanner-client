"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Envelope,
  MapPin,
  Comment,
  Clock,
  PaperPlane,
  LogoFacebook,
  LogoLinkedin,
  LogoGitlab,
} from "@gravity-ui/icons";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().min(3, "Please add a subject"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

const INFO = [
  { icon: <Envelope className="h-5 w-5" />, label: "Email", value: "hello@tripplanner.example" },
  { icon: <MapPin className="h-5 w-5" />, label: "Office", value: "Dhaka, Bangladesh" },
  { icon: <Clock className="h-5 w-5" />, label: "Response time", value: "Within 24 hours" },
];

const SOCIALS = [
  { icon: <LogoFacebook className="h-4 w-4" />, href: "https://facebook.com", label: "Facebook" },
  { icon: <LogoGitlab className="h-4 w-4" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <LogoLinkedin className="h-4 w-4" />, href: "https://linkedin.com", label: "LinkedIn" },
];

const inputClass =
  "w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 dark:bg-slate-900 dark:text-slate-200";
const okBorder =
  "border-slate-300 focus:border-primary focus:ring-primary/20 dark:border-slate-700";
const errBorder = "border-red-400 focus:border-red-400 focus:ring-red-100";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`Thanks, ${data.name.split(" ")[0]}! We'll reply within 24 hours.`);
    reset();
  }

  return (
    <div>
      {/* Hero band */}
      <section className="bg-gradient-to-br from-primary via-accent to-secondary/60 py-14 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-2xl px-4"
        >
          <h1 className="text-4xl font-extrabold sm:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Question about a trip, a listing, or the platform? Send us a message —
            or ask the AI concierge for instant answers.
          </p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col overflow-hidden rounded-3xl bg-slate-900 text-white dark:bg-slate-900/60 dark:ring-1 dark:ring-slate-800"
          >
            <div className="flex-1 p-7">
              <h2 className="text-xl font-bold">Contact information</h2>
              <p className="mt-1 text-sm text-slate-400">
                We usually reply the same day.
              </p>

              <div className="mt-7 space-y-5">
                {INFO.map((i) => (
                  <div key={i.label} className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent">
                      {i.icon}
                    </span>
                    <div>
                      <p className="text-xs text-slate-400">{i.label}</p>
                      <p className="text-sm font-semibold">{i.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI concierge callout */}
              <div className="mt-8 rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30 p-4">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <Comment className="h-4 w-4" /> Need an instant answer?
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Our AI concierge knows every trip in the catalog — open the chat
                  bubble at the bottom right.
                </p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 border-t border-white/10 p-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-white/10 text-white transition-all duration-200 hover:scale-110 hover:bg-white/20"
                >
                  {s.icon}
                </a>
              ))}
              <span className="ml-2 text-xs text-slate-400">Follow our journeys</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Fill in the form and we'll get back to you.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </label>
                <input
                  {...register("name")}
                  className={`${inputClass} ${errors.name ? errBorder : okBorder}`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs font-medium text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={`${inputClass} ${errors.email ? errBorder : okBorder}`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs font-medium text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Subject
              </label>
              <input
                {...register("subject")}
                className={`${inputClass} ${errors.subject ? errBorder : okBorder}`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Message
              </label>
              <textarea
                rows={6}
                {...register("message")}
                className={`${inputClass} ${errors.message ? errBorder : okBorder}`}
                placeholder="Tell us how we can help..."
              />
              {errors.message && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-400">
                Prefer email? Write to{" "}
                <a href="mailto:hello@tripplanner.example" className="font-semibold text-primary hover:underline">
                  hello@tripplanner.example
                </a>
              </p>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-dark disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <PaperPlane className="h-4 w-4" /> Send message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/50"
        >
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            While you're here — your next trip is waiting
          </p>
          <Link
            href="/trips"
            className="mt-3 inline-block cursor-pointer rounded-xl bg-secondary px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-orange-700"
          >
            Explore trips →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}