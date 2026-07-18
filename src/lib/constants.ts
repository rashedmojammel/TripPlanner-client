export const DEMO_CREDS = {
  email: "demo@tripplanner.com",
  password: "Demo1234!",
};

export const NAV_PUBLIC = [
  { label: "Home", href: "/" },
  { label: "Explore Trips", href: "/trips" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const NAV_PRIVATE = [
  ...NAV_PUBLIC,
  { label: "Add Trip", href: "/items/add" },
  { label: "Manage Trips", href: "/items/manage" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  adventure: "Adventure",
  beach: "Beach",
  cultural: "Cultural",
  "city-break": "City Break",
  nature: "Nature",
};