"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signIn } from "@/lib/auth-client";
import { DEMO_CREDS } from "@/lib/constants";
import { AuthShell } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { Envelope, Lock, Eye, EyeSlash } from "@gravity-ui/icons";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });

  async function doLogin(creds: FormData) {
    const { error } = await signIn.email(creds);
    if (error) {
      toast.error(error.message ?? "Invalid email or password");
      return false;
    }
    toast.success("Welcome back!");
    router.push("/trips");
    router.refresh();
    return true;
  }

  async function handleDemo() {
    setDemoLoading(true);
    setValue("email", DEMO_CREDS.email);
    setValue("password", DEMO_CREDS.password);
    await doLogin(DEMO_CREDS);
    setDemoLoading(false);
  }

  async function handleGoogle() {
    await signIn.social({ provider: "google", callbackURL: window.location.origin + "/trips" });
  }

  return (
    <AuthShell title="Welcome back" subtitle="Log in to continue planning your next trip">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <form className="space-y-4" onSubmit={handleSubmit(doLogin)} noValidate>
          <FormField
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            icon={<Envelope className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <FormField
            label="Password"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
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

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <motion.button
          onClick={handleDemo}
          disabled={demoLoading || isSubmitting}
          whileTap={{ scale: 0.98 }}
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-secondary/50 bg-secondary/5 py-3 text-sm font-bold text-secondary transition-colors duration-200 hover:bg-secondary/10 disabled:opacity-60"
        >
          {demoLoading ? "Logging in..." : "✨ Try Demo Account (auto-fill)"}
        </motion.button>

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
          No account yet?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </AuthShell>
  );
}