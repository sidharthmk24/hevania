import type { Metadata } from "next";
import { Aboreto } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

const aboreto = Aboreto({
  variable: "--font-aboreto",
  weight: "400",
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
        className={`${aboreto.variable} antialiased bg-cream text-dark-forest font-sans`}
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
