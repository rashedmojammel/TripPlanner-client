export const TRIP_CATEGORIES = [
  "adventure",
  "beach",
  "cultural",
  "city-break",
  "nature",
] as const;
export type TripCategory = (typeof TRIP_CATEGORIES)[number];

export interface Trip {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  destination: string;
  price: number;
  durationDays: number;
  category: TripCategory;
  rating: number;
  startDate: string;
  createdBy: string;
  createdAt: string;
}

export interface PaginatedTrips {
  data: Trip[];
  total: number;
  page: number;
  totalPages: number;
}

export interface TripDetails {
  data: Trip;
  related: Trip[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}