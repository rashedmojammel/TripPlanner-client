"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface GenerateInput {
  destination: string;
  durationDays: number;
  category: string;
  tone: string;
  length: string;
}

export interface GeneratedContent {
  shortDescription: string;
  fullDescription: string;
}

export function useGenerateContent() {
  return useMutation({
    mutationFn: async (input: GenerateInput) =>
      (await api.post<{ data: GeneratedContent }>("/ai/generate", input)).data.data,
  });
}