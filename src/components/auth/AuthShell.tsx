import Link from "next/link";

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Left: Aurora brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary/70 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.25),transparent_55%)]" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Trip<span className="text-orange-200">Planner</span>
          </Link>

          <div>
            <h2 className="max-w-md text-4xl font-extrabold leading-tight">
              Your next adventure, planned by AI.
            </h2>
            <p className="mt-4 max-w-md text-white/85">
              Discover curated trips across Bangladesh and beyond — with a
              personal AI concierge that finds the perfect trip for your budget,
              dates, and travel style.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-white/90">
              {[
                "18+ curated trips from Sajek to Santorini-level escapes",
                "AI-generated itineraries and descriptions",
                "Chat concierge that knows every trip in our catalog",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} TripPlanner — travel smarter.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center bg-slate-50 px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}