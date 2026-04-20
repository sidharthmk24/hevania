import type { Metadata } from "next";
import { Aboreto, Geist } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import WhatsappChatWidget from "@/components/WhatsappChatWidget";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const aboreto = Aboreto({
  variable: "--font-aboreto",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HEVANIYA | Luxury Event Venues",
  description: "Exquisite plots and venues for weddings, parties, and corporate events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${aboreto.variable} antialiased bg-cream text-dark-forest font-sans`}
      >
        <ReactLenis root>
          <WhatsappChatWidget/>
          <Loader />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
