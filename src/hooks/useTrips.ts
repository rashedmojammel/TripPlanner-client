"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import type { PaginatedTrips } from "@/types";

export interface TripFilters {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  page: number;
}

export function useTripFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const filters: TripFilters = {
    search: params.get("search") ?? "",
    category: params.get("category") ?? "",
    minPrice: params.get("minPrice") ?? "",
    maxPrice: params.get("maxPrice") ?? "",
    sort: params.get("sort") ?? "newest",
    page: Number(params.get("page") ?? 1),
  };

  function setFilters(update: Partial<TripFilters>) {
    const next = { ...filters, ...update };
    // any filter change (except page itself) resets to page 1
    if (!("page" in update)) next.page = 1;

    const sp = new URLSearchParams();
    if (next.search) sp.set("search", next.search);
    if (next.category) sp.set("category", next.category);
    if (next.minPrice) sp.set("minPrice", next.minPrice);
    if (next.maxPrice) sp.set("maxPrice", next.maxPrice);
    if (next.sort !== "newest") sp.set("sort", next.sort);
    if (next.page > 1) sp.set("page", String(next.page));

    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  }

  return { filters, setFilters };
}

export function useTrips(filters: TripFilters) {
  return useQuery({
    queryKey: ["trips", filters],
    queryFn: async () => {
      const sp = new URLSearchParams();
      if (filters.search) sp.set("search", filters.search);
      if (filters.category) sp.set("category", filters.category);
      if (filters.minPrice) sp.set("minPrice", filters.minPrice);
      if (filters.maxPrice) sp.set("maxPrice", filters.maxPrice);
      sp.set("sort", filters.sort);
      sp.set("page", String(filters.page));
      sp.set("limit", "8");
      return (await api.get<PaginatedTrips>(`/trips?${sp.toString()}`)).data;
    },
    placeholderData: keepPreviousData,
  });
}