"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { TripDetails } from "@/types";

export function useTrip(id: string) {
  return useQuery({
    queryKey: ["trip", id],
    queryFn: async () => (await api.get<TripDetails>(`/trips/${id}`)).data,
    enabled: !!id,
  });
}