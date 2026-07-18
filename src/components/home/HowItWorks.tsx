import { Magnifier, Comment, MapPin } from "@gravity-ui/icons";

const STEPS = [
  {
    icon: <Magnifier className="h-6 w-6" />,
    title: "Discover",
    desc: "Browse curated trips with powerful filters for category, budget, and destination.",
  },
  {
    icon: <Comment className="h-6 w-6" />,
    title: "Ask our AI concierge",
    desc: "Tell the chat assistant your budget and dates — it recommends real trips from our catalog.",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Travel",
    desc: "Pick your trip, check the details, and you're ready for your next adventure.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
          <p className="mt-2 text-slate-500">From dream to departure in three steps</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {s.icon}
              </span>
              <p className="mt-2 text-xs font-bold text-secondary">STEP {i + 1}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}