import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { ChatWidget } from "@/components/ai/ChatWidget";
// import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "TripPlanner — AI-Powered Travel Platform",
  description:
    "Discover curated trips across Bangladesh and beyond, with an AI travel concierge to help you choose.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <ChatWidget></ChatWidget>
        </Providers>
      </body>
    </html>
  );
}