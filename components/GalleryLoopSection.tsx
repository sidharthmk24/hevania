"use client";

import React from "react";
import LogoLoop from "./LogoLoop";

interface GalleryLoopSectionProps {
  images?: string[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_IMAGES = [
  "/images/scroll1.webp",
  "/images/scroll2.webp",
  "/images/scrollprime.avif",
  "/images/scrollsecure.webp",
  "/images/heroImages/carousel1.jpeg",
  "/images/heroImages/carousel2.jpg",
  "/images/heroImages/carousel3.avif",
  "/images/heroImages/carousel4.webp",
];

export default function GalleryLoopSection({ 
  images = DEFAULT_IMAGES, 
  title = "Glimpses of Hevaniya",
  subtitle = "Explore the elegance and charm of our premium event spaces."
}: GalleryLoopSectionProps) {
  
  const logoItems = (images.length > 0 ? images : DEFAULT_IMAGES).map((src) => ({
    src,
    alt: "Gallery Image",
  }));

  return (
    <section className="pb-16 md:pb-32 w-full overflow-hidden">
      <div className="relative">
        <LogoLoop 
          logos={logoItems}
          speed={35}
          logoHeight={340}
          logoWidth={500}
          gap={30}
          fadeOut
          fadeOutColor="white"
        />
      </div>
    </section>
  );
}
