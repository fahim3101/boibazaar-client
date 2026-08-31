import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const BASE_URL = "https://boibazaar-client.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BoiBazaar | Buy & Sell Used Textbooks",
    template: "%s | BoiBazaar",
  },
  description:
    "BoiBazaar is a student-to-student marketplace for secondhand textbooks and study materials across Bangladeshi universities.",
  keywords: [
    "textbooks",
    "Bangladesh",
    "university",
    "secondhand books",
    "BoiBazaar",
    "used books",
    "Dhaka",
    "student marketplace",
  ],
  authors: [{ name: "MD Fahim Rana", url: "https://github.com/fahim3101" }],
  creator: "MD Fahim Rana",
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: BASE_URL,
    siteName: "BoiBazaar",
    title: "BoiBazaar | Buy & Sell Used Textbooks",
    description:
      "A peer-to-peer marketplace where students buy and sell secondhand textbooks at a fraction of the bookstore price.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BoiBazaar - Used Textbook Exchange",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BoiBazaar | Buy & Sell Used Textbooks",
    description:
      "Student-to-student marketplace for secondhand textbooks across Bangladeshi universities.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body`}
      >
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
