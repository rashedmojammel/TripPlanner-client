import { Star } from "@gravity-ui/icons";

const REVIEWS = [
  {
    name: "Nusrat Jahan",
    location: "Dhaka",
    text: "The AI concierge found me a Sajek trip within my budget in under a minute. Booked it the same day — the sunrise above the clouds was everything they promised.",
  },
  {
    name: "Tanvir Hasan",
    location: "Chattogram",
    text: "I asked for a beach trip under 30,000 taka and got three real options instantly, with links. This is how every travel site should work.",
  },
  {
    name: "Farhana Rahman",
    location: "Sylhet",
    text: "As someone who organizes group tours, listing trips is effortless — the AI even writes the descriptions. My Sundarbans safari filled up in a week.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">What travelers say</h2>
        <p className="mt-2 text-slate-500">Real experiences from our community</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex gap-0.5 text-secondary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
              "{r.text}"
            </blockquote>
            <figcaption className="mt-4 border-t border-slate-100 pt-3">
              <p className="text-sm font-bold text-slate-900">{r.name}</p>
              <p className="text-xs text-slate-400">{r.location}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}