# TripPlanner — AI-Powered Travel Platform (Frontend)

Discover curated trips across Bangladesh and beyond, with an AI travel concierge that recommends real trips from the catalog and an AI writing assistant that generates trip listings.

**🌐 Live Site:** https://trip-planner-client-navy.vercel.app
**🔗 Backend API:** https://tripplanner-server-tclz.onrender.com
**📦 Backend Repository:** https://github.com/rashedmojammel/TripPlanner-Server

> ⏳ **Note for reviewers:** The backend runs on Render's free tier and sleeps after inactivity. The **first request may take 30–60 seconds** to wake the server — please open the site and wait a moment before testing.

---

## Demo Credentials

| Field | Value |
|---|---|
| Email | `demo@tripplanner.com` |
| Password | `Demo1234!` |

Or simply click the **"✨ Try Demo Account"** button on the login page — it auto-fills and signs in. Google login is also supported.

---

## Key Features

### Core Platform
- **Landing page** — 65vh hero with live search CTA, 7 sections (Popular Destinations, How It Works, Categories, Statistics with Recharts, Testimonials, FAQ, Newsletter + CTA), full footer
- **Explore page** — debounced search, filtering by category and price range, 4 sorting options, pagination; all filter state lives in the URL (shareable links)
- **Details page** — public, hero image, overview, key information panel, related trips
- **Protected pages** — `/items/add` (create trip) and `/items/manage` (table with View/Delete + confirm modal); logged-out users are redirected to `/login`
- **Authentication** — Better Auth with email/password, Google social login, demo auto-fill button, react-hook-form + zod inline validation, session cookies
- **Roles** — traveler / organizer chosen at registration (admin supported via Better Auth admin plugin)
- **Dark mode** — theme toggle with persistence (next-themes)
- **Fully responsive** — mobile, tablet, desktop

### Agentic AI Features
1. **AI Travel Concierge (Chat Assistant)** — a two-step agent pipeline: a fast LLM extracts structured filters from the user's message → the backend queries MongoDB for matching trips (tool use) → a larger LLM answers grounded in the real catalog with clickable links to trip pages. Streaming responses, conversation history, suggested prompts, typing indicator. Never invents trips.
2. **AI Listing Writer (Content Generator)** — organizers enter destination, duration, and category; the AI generates the title, short description, and full description with selectable tone (exciting/relaxing/luxurious/budget-friendly) and length (short/medium/long), plus one-click regenerate. All output is editable.
3. **"Ask AI about this trip"** — every details page can open the concierge pre-seeded with a question about that specific trip.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + HeroUI v3 |
| Data fetching | TanStack Query + Axios |
| Auth client | Better Auth (React client) |
| Forms | react-hook-form + zod |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Gravity UI Icons |
| Theming | next-themes |
| Deployment | Vercel |

---

## Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

In production (Vercel dashboard), set the same variable to the deployed backend URL, e.g. `https://tripplanner-server-tclz.onrender.com/api`.

---

## Run Locally

```bash
# 1. Clone
git clone <this-repo-url>
cd tripplanner-client

# 2. Install
npm install

# 3. Configure
#    create .env.local as shown above
#    (the backend must be running — see the backend repository README)

# 4. Start
npm run dev
# → http://localhost:3000
```

---

## Project Structure (short)

```
src/
├── app/            # routes: landing, trips, trips/[id], items/add, items/manage,
│                   # login, register, about, contact
├── components/     # layout (Navbar, Footer, ThemeToggle), trips (cards, filters,
│                   # pagination), ai (ChatWidget, GenerateDescription), auth, home sections
├── hooks/          # useTrips, useTrip, useTripMutations, useChat, useGenerateContent
├── context/        # ChatContext (global concierge state)
├── lib/            # api (axios), auth-client (Better Auth), constants, roles
└── types/          # shared TypeScript types
```
