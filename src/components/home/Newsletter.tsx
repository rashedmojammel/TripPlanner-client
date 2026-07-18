"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Please enter a valid email");
    toast.success("Subscribed! Watch your inbox for trip deals ✈️");
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary/70 p-8 text-center text-white md:p-14">
        <h2 className="text-3xl font-extrabold">Never miss a trip deal</h2>
        <p className="mx-auto mt-2 max-w-md text-white/85">
          Get new trips and seasonal offers in your inbox. No spam, unsubscribe anytime.
        </p>
        <form onSubmit={subscribe} className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-2xl bg-white p-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="cursor-pointer whitespace-nowrap rounded-xl bg-secondary px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-orange-700"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-8 text-sm text-white/80">
          Ready to explore?{" "}
          <Link href="/trips" className="font-bold underline underline-offset-4">
            Browse all trips
          </Link>{" "}
          or{" "}
          <Link href="/register" className="font-bold underline underline-offset-4">
            create a free account
          </Link>
        </p>
      </div>
    </section>
  );
}