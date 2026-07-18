"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Envelope, MapPin, Comment, Clock } from "@gravity-ui/icons";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors";

const INFO = [
  { icon: <Envelope className="h-5 w-5" />, label: "Email", value: "hello@tripplanner.example" },
  { icon: <MapPin className="h-5 w-5" />, label: "Office", value: "Dhaka, Bangladesh" },
  { icon: <Clock className="h-5 w-5" />, label: "Response time", value: "Within 24 hours" },
  { icon: <Comment className="h-5 w-5" />, label: "Instant help", value: "Try the AI concierge (bottom right)" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [field]: e.target.value });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.subject.trim() || !form.message.trim())
      return toast.error("Please fill in all fields");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("Please enter a valid email");

    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">Get in touch</h1>
        <p className="mx-auto mt-2 max-w-xl text-slate-500">
          Question about a trip, a listing, or the platform? Send us a message —
          or ask the AI concierge for instant answers.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Contact info */}
        <div className="space-y-4">
          {INFO.map((i) => (
            <div key={i.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {i.icon}
              </span>
              <div>
                <p className="text-xs text-slate-400">{i.label}</p>
                <p className="text-sm font-semibold text-slate-800">{i.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
              <input value={form.name} onChange={set("name")} className={inputClass} placeholder="Your full name" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" value={form.email} onChange={set("email")} className={inputClass} placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
            <input value={form.subject} onChange={set("subject")} className={inputClass} placeholder="What's this about?" />
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={6}
              className={inputClass}
              placeholder="Tell us how we can help..."
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-5 w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary-dark disabled:opacity-60 sm:w-auto sm:px-8"
          >
            {sending ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}