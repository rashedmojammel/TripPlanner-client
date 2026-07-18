import Link from "next/link";

const LINKS = {
  Explore: [
    { label: "All Trips", href: "/trips" },
    { label: "Beach Trips", href: "/trips?category=beach" },
    { label: "Adventure", href: "/trips?category=adventure" },
    { label: "City Breaks", href: "/trips?category=city-break" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Account: [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "Add a Trip", href: "/items/add" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-extrabold text-primary">
            Trip<span className="text-secondary">Planner</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            AI-powered trip discovery for Bangladesh and beyond.
          </p>
          <div className="mt-4 space-y-1 text-sm text-slate-500">
            <p>📧 hello@tripplanner.example</p>
            <p>📍 Dhaka, Bangladesh</p>
          </div>
        </div>

        {Object.entries(LINKS).map(([group, links]) => (
          <div key={group}>
            <p className="text-sm font-bold text-slate-900">{group}</p>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-slate-500 transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} TripPlanner. All rights reserved.
      </div>
    </footer>
  );
}