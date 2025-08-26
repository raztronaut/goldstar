import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gold Star Tracker - Celebrate Achievements",
  description: "Track and celebrate achievements with our gold star system. Add people, give stars, and see who's performing best.",
  keywords: ["star tracker", "achievements", "recognition", "team management", "performance"],
  authors: [{ name: "StickerApp Team" }],
  openGraph: {
    title: "Gold Star Tracker - Celebrate Achievements",
    description: "Track and celebrate achievements with our gold star system. Add people, give stars, and see who's performing best.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
