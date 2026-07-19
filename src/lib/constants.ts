export const DEMO_CREDS = {
  email: "demo1@gmail.com",
  password: "demo1@gmail.com",
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