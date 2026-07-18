"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Trip } from "@/types";

export function useMyTrips() {
  return useQuery({
    queryKey: ["myTrips"],
    queryFn: async () => (await api.get<{ data: Trip[] }>("/trips/mine")).data.data,
  });
}

export interface CreateTripInput {
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  destination: string;
  price: number;
  durationDays: number;
  category: string;
  startDate: string;
}

export function useCreateTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateTripInput) =>
      (await api.post<{ data: Trip }>("/trips", input)).data.data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trips"] });
      qc.invalidateQueries({ queryKey: ["myTrips"] });
    },
  });
}

export function useDeleteTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => (await api.delete(`/trips/${id}`)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trips"] });
      qc.invalidateQueries({ queryKey: ["myTrips"] });
    },
  });
}