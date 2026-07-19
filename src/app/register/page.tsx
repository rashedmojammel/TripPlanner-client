"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signUp, signIn } from "@/lib/auth-client";
import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { Person, Briefcase, Envelope, Lock, Eye, EyeSlash } from "@gravity-ui/icons";

const schema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "At least 6 characters")
      .regex(/[A-Za-z]/, "Must contain a letter")
      .regex(/\d/, "Must contain a number"),
    confirm: z.string(),
    role: z.enum(["traveler", "organizer"]),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type FormData = z.infer<typeof schema>;

const ROLES = [
  { value: "traveler", label: "Traveler", desc: "Discover and book trips", icon: <Person className="h-5 w-5" /> },
  { value: "organizer", label: "Organizer", desc: "Create and manage listings", icon: <Briefcase className="h-5 w-5" /> },
] as const;

function strengthOf(pw: string): { pct: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { pct: 10, label: "", color: "bg-slate-200" },
    { pct: 25, label: "Weak", color: "bg-red-400" },
    { pct: 50, label: "Fair", color: "bg-orange-400" },
    { pct: 75, label: "Good", color: "bg-yellow-400" },
    { pct: 90, label: "Strong", color: "bg-green-500" },
    { pct: 100, label: "Excellent", color: "bg-green-600" },
  ];
  return map[score];
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "traveler" },
    mode: "onTouched",
  });

  const role = watch("role");
  const password = watch("password") ?? "";
  const strength = strengthOf(password);

  async function onSubmit(data: FormData) {
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      userRole: data.role,
    } as Parameters<typeof signUp.email>[0] & { userRole: string });

    if (error) return toast.error(error.message ?? "Registration failed, please try again");

    toast.success(`Welcome to TripPlanner, ${data.name.split(" ")[0]}!`);
    router.push(data.role === "organizer" ? "/items/add" : "/trips");
    router.refresh();
  }

  async function handleGoogle() {
    await signIn.social({ provider: "google", callbackURL: window.location.origin + "/trips" });
  }

  return (
    <AuthShell title="Create your account" subtitle="Join TripPlanner and start planning smarter trips">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Role selection */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-slate-700">I want to join as</label>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((r) => {
              const active = role === r.value;
              return (
                <motion.button
                  key={r.value}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setValue("role", r.value)}
                  aria-pressed={active}
                  className={`cursor-pointer rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                    active
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span
                    className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                      active ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {r.icon}
                  </span>
                  <p className="text-sm font-semibold text-slate-900">{r.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{r.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField
            label="Full name"
            placeholder="Rahim Ahmed"
            autoComplete="name"
            icon={<Person className="h-4 w-4" />}
            error={errors.name?.message}
            {...register("name")}
          />

          <FormField
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            icon={<Envelope className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <div>
            <FormField
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="6+ characters, letters & numbers"
              autoComplete="new-password"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="cursor-pointer text-slate-400 hover:text-slate-600"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              {...register("password")}
            />
            {password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    animate={{ width: `${strength.pct}%` }}
                    transition={{ duration: 0.3 }}
                    className={`h-full rounded-full ${strength.color}`}
                  />
                </div>
                <span className="w-16 text-right text-xs font-medium text-slate-500">
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          <FormField
            label="Confirm password"
            type={showPw ? "text" : "password"}
            placeholder="Repeat your password"
            autoComplete="new-password"
            icon={<Lock className="h-4 w-4" />}
            error={errors.confirm?.message}
            {...register("confirm")}
          />

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : `Create ${role} account`}
          </motion.button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs font-medium text-slate-400">
          <div className="h-px flex-1 bg-slate-200" /> OR CONTINUE WITH <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          onClick={handleGoogle}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-100"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </AuthShell>
  );
}