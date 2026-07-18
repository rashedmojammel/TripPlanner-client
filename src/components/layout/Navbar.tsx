"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "@/lib/auth-client";
import { NAV_PUBLIC, NAV_PRIVATE } from "@/lib/constants";
import { Bars, Xmark } from "@gravity-ui/icons";
import { EASE } from "@/lib/motion";

export function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = session ? NAV_PRIVATE : NAV_PUBLIC;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleLogout() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          Trip<span className="text-secondary">Planner</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 hover:text-primary ${
                  active ? "text-primary" : "text-slate-600"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                )}
              </Link>
            );
          })}

          {isPending ? null : session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">
                Hi, {session.user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/login"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-primary-dark"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="cursor-pointer text-slate-700 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.2 }}
            className="block"
          >
            {open ? <Xmark className="h-5 w-5" /> : <Bars className="h-5 w-5" />}
          </motion.span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="px-4 py-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 text-sm font-medium ${
                    pathname === l.href ? "text-primary" : "text-slate-700"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              {session ? (
                <button
                  onClick={handleLogout}
                  className="cursor-pointer py-2 text-sm font-medium text-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-primary"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}