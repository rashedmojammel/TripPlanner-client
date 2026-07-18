"use client";

import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-1.5">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="cursor-pointer rounded-lg border border-slate-300 p-2 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-9 w-9 cursor-pointer rounded-lg text-sm font-semibold transition-colors duration-200 ${
            p === page
              ? "bg-primary text-white"
              : "border border-slate-300 text-slate-600 hover:bg-slate-100"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="cursor-pointer rounded-lg border border-slate-300 p-2 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}