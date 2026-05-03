"use client";

import React from "react";
import LogoLoop from "./LogoLoop";

interface GalleryLoopSectionProps {
  images?: string[];
  heading?: string;
  subheading?: string;
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
  heading = "Glimpses of Hevaniya",
  subheading = "Explore the elegance and charm of our premium event spaces."
}: GalleryLoopSectionProps) {

  const logoItems = (images.length > 0 ? images : DEFAULT_IMAGES).map((src) => ({
    src,
    alt: "Gallery Image",
  }));

  return (
    <section className="pb-16 md:pb-32 w-full overflow-hidden">
      <div className="text-center px-4 mb-10 md:mb-16">
        <h2 className="text-[24px] md:text-5xl lg:text-6xl text-[#425042] font-normal tracking-tight leading-tight mb-4">
          {heading}
        </h2>
        {subheading && (
          <p className="text-sm md:text-lg text-[#425042]/70 font-light max-w-2xl mx-auto">
            {subheading}
          </p>
        )}
      </div>
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
