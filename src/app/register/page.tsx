"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";
import { AuthShell } from "@/components/auth/AuthShell";
import { Person, Briefcase, Envelope, Lock, Eye, EyeSlash } from "@gravity-ui/icons";

type Role = "traveler" | "organizer";

const ROLES: { value: Role; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    value: "traveler",
    label: "Traveler",
    desc: "Discover and book curated trips",
    icon: <Person className="h-5 w-5" />,
  },
  {
    value: "organizer",
    label: "Trip Organizer",
    desc: "Create and manage trip listings",
    icon: <Briefcase className="h-5 w-5" />,
  },
];

const inputWrap =
  "flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-colors";
const inputEl = "w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("traveler");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate(): string | null {
    if (!name.trim() || !email.trim() || !password || !confirm)
      return "Please fill in all fields";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirm) return "Passwords do not match";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);

    setLoading(true);
    const { error } = await signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      userRole: role,
    } as Parameters<typeof signUp.email>[0] & { userRole: string });
    setLoading(false);

    if (error) return toast.error(error.message ?? "Registration failed, please try again");

    toast.success(`Welcome to TripPlanner, ${name.trim().split(" ")[0]}!`);
    router.push(role === "organizer" ? "/items/add" : "/trips");
    router.refresh();
  }

  async function handleGoogle() {
    await signIn.social({
      provider: "google",
      callbackURL: window.location.origin + "/trips",
    });
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join TripPlanner and start planning smarter trips"
    >
      {/* Role selection */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          I want to join as
        </label>
        <div className="grid grid-cols-2 gap-3">
          {ROLES.map((r) => {
            const active = role === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                aria-pressed={active}
                className={`cursor-pointer rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                  active
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span
                  className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                    active ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {r.icon}
                </span>
                <p className="text-sm font-semibold text-slate-900">{r.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{r.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
          <div className={inputWrap}>
            <Person className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputEl}
              placeholder="Rahim Ahmed"
              autoComplete="name"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <div className={inputWrap}>
            <Envelope className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputEl}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <div className={inputWrap}>
              <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputEl}
                placeholder="6+ characters"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Confirm</label>
            <div className={inputWrap}>
              <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type={showPw ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={inputEl}
                placeholder="Repeat password"
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
        >
          {loading ? "Creating account..." : `Create ${role === "organizer" ? "organizer" : "traveler"} account`}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs font-medium text-slate-400">
        <div className="h-px flex-1 bg-slate-200" /> OR CONTINUE WITH{" "}
        <div className="h-px flex-1 bg-slate-200" />
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
    </AuthShell>
  );
}