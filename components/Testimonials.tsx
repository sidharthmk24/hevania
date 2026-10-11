"use client";

import React, { useEffect, useState } from "react";
// import Typography from "@/components/Typography/Typography";
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";
import { createClient } from "@/lib/supabase";

import testimonialDataJson from "@/lib/data/testimonials.json";

// Types definition for testimonial data
interface TestimonialData {
  id: number;
  name: string;
  comment: string;
  rating: number;
  image_url?: string;
}

interface TestimonialsProps {
  heading?: string;
}

/**
 * Testimonial Component
 * Displays client testimonials in an infinite scrolling carousel.
 */
export default function Testimonial({ heading }: TestimonialsProps = {}): React.ReactElement {
  const [testimonialData, setTestimonialData] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setTestimonialData(data);
        } else {
          setTestimonialData(testimonialDataJson);
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
        setTestimonialData(testimonialDataJson);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  // Ensure both rows have items even when there are few testimonials
  const desktopDataLeft =
    testimonialData.length >= 4
      ? testimonialData.slice(0, Math.ceil(testimonialData.length / 2))
      : testimonialData;

  const desktopDataRight =
    testimonialData.length >= 4
      ? testimonialData.slice(Math.ceil(testimonialData.length / 2))
      : testimonialData.length > 1
      ? [...testimonialData].reverse()
      : testimonialData;

  return (
    <>
      <section className="lg:mt-0 mt-12 w-full overflow-hidden">
        {/* Testimonial Header Section */}
        <header className="flex items-center justify-center flex-col lg:mb-10 mb-9 px-4 md:px-0 text-center">
          <h2 className="sr-only">Client Testimonials</h2>
          <h2 className="text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[90px] whitespace-pre-line">
            {heading || "What Our Clients Say"}
          </h2>
        </header>

        {loading ? (
          <div className="flex justify-center p-12 text-[#2D2D2D]/60 animate-pulse">
            Loading testimonials...
          </div>
        ) : testimonialData.length > 0 ? (
          <div className="w-full space-y-4">
            {/* Desktop Testimonial Carousel - Right Direction */}
            <div className="hidden md:flex rounded-md flex-col antialiased items-center justify-center relative overflow-hidden w-full">
              <InfiniteMovingCards
                items={desktopDataRight}
                direction="right"
                speed="normal"
              />
            </div>

            {/* Desktop Testimonial Carousel - Left Direction */}
            <div className="hidden md:flex rounded-md flex-col antialiased items-center justify-center relative overflow-hidden w-full">
              <InfiniteMovingCards
                items={desktopDataLeft}
                direction="left"
                speed="normal"
              />
            </div>

            {/* Mobile Testimonial Carousel */}
            <div className="flex md:hidden rounded-md flex-col antialiased items-center justify-center relative overflow-hidden w-full">
              <InfiniteMovingCards
                items={testimonialData}
                direction="left"
                speed="normal"
              />
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
