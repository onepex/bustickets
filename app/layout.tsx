import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: {
    default: "BusTickets.ph - Book Bus & Ferry Tickets in the Philippines",
    template: "%s | BusTickets.ph",
  },
  description: "Book bus, ferry, and van tickets online. Compare schedules and prices from Victory Liner, 2Go, OceanJet, and 50+ operators across the Philippines.",
  keywords: ["bus tickets", "ferry tickets", "Philippines", "travel", "booking", "Victory Liner", "2Go", "OceanJet", "Manila", "Cebu", "Baguio"],
  metadataBase: new URL("https://bustickets.ph"),
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "BusTickets.ph",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BusTickets.ph - Book Bus & Ferry Tickets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
          <ThemeProvider>{children}</ThemeProvider>
        </body>
    </html>
  );
}
