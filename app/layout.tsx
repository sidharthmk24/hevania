import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mukund Events | Luxury Event Venues",
  description: "Exquisite plots and venues for weddings, parties, and corporate events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-cream text-dark-forest font-sans`}
      >
        <ReactLenis root>
          <Loader />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
