"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { NAV_PUBLIC, NAV_PRIVATE } from "@/lib/constants";
import { Bars, Xmark } from "@gravity-ui/icons";

export function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const links = session ? NAV_PRIVATE : NAV_PUBLIC;

  async function handleLogout() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary">
          Trip<span className="text-secondary">Planner</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === l.href ? "text-primary" : "text-slate-600"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {isPending ? null : session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">
                Hi, {session.user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <Xmark /> : <Bars />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700"
            >
              {l.label}
            </Link>
          ))}
          {session ? (
            <button onClick={handleLogout} className="py-2 text-sm font-medium text-red-600">
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-primary">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}