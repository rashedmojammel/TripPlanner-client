import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ai/ChatWidget";

export const metadata: Metadata = {
  title: "TripPlanner — AI-Powered Travel Platform",
  description:
    "Discover curated trips across Bangladesh and beyond, with an AI travel concierge to help you choose the perfect trip for your budget and dates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-white text-slate-800 antialiased transition-colors dark:bg-slate-950 dark:text-slate-200">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          {/* <Footer /> */}
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}