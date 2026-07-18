"use client";

import { useState, useEffect } from "react";
import type { TripFilters as Filters } from "@/hooks/useTrips";
import { CATEGORY_LABELS } from "@/lib/constants";
import { Magnifier, Xmark } from "@gravity-ui/icons";

const selectClass =
  "cursor-pointer rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export function TripFilters({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (u: Partial<Filters>) => void;
}) {
  const [search, setSearch] = useState(filters.search);

  // 400ms debounce on search
  useEffect(() => {
    const t = setTimeout(() => {
      if (search !== filters.search) setFilters({ search });
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasActive =
    filters.search || filters.category || filters.minPrice || filters.maxPrice;

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      {/* Search */}
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <Magnifier className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destinations or trips..."
          className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="cursor-pointer text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <Xmark className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filter (filter field #1) */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value })}
        className={selectClass}
        aria-label="Filter by category"
      >
        <option value="">All categories</option>
        {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>

      {/* Price filter (filter field #2) */}
      <select
        value={`${filters.minPrice}-${filters.maxPrice}`}
        onChange={(e) => {
          const [min, max] = e.target.value.split("-");
          setFilters({ minPrice: min, maxPrice: max });
        }}
        className={selectClass}
        aria-label="Filter by price range"
      >
        <option value="-">Any price</option>
        <option value="-10000">Under ৳10,000</option>
        <option value="10000-50000">৳10,000 – ৳50,000</option>
        <option value="50000-100000">৳50,000 – ৳100,000</option>
        <option value="100000-">৳100,000+</option>
      </select>

      {/* Sort */}
      <select
        value={filters.sort}
        onChange={(e) => setFilters({ sort: e.target.value })}
        className={selectClass}
        aria-label="Sort trips"
      >
        <option value="newest">Newest first</option>
        <option value="price_asc">Price: low to high</option>
        <option value="price_desc">Price: high to low</option>
        <option value="rating">Top rated</option>
      </select>

      {hasActive && (
        <button
          onClick={() => {
            setSearch("");
            setFilters({ search: "", category: "", minPrice: "", maxPrice: "" });
          }}
          className="cursor-pointer text-sm font-medium text-secondary hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}