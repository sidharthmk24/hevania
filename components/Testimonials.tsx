"use client";

import React, { useEffect, useState } from "react";
// import Typography from "@/components/Typography/Typography";
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";
import { createClient } from "@/lib/supabase";

// Types definition for testimonial data
interface TestimonialData {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

/**
 * Testimonial Component
 * Displays client testimonials in an infinite scrolling carousel.
 * Contains two sections:
 * 1. Header with title
 * 2. Scrolling testimonials in both directions
 */
export default function Testimonial(): React.ReactElement {
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

        if (!error && data) {
          setTestimonialData(data);
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  // Split the data into two halves for desktop
  const midIndex = Math.ceil(testimonialData.length / 2);
  const desktopDataLeft = testimonialData.slice(0, midIndex);
  const desktopDataRight = testimonialData.slice(midIndex);

  return (
    <>
      <section className=" lg:mt-0 mt-12">
        {/* Testimonial Header Section */}
        <header className="flex items-center justify-center flex-col lg:mb-10 mb-9 px-4 md:px-0 text-center">
          <h2 className="sr-only">Client Testimonials</h2>
          <h2 className=" text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[90px] ">
            What Our Clients Say
          </h2>
        </header>

        {loading ? (
          <div className="flex justify-center p-12 text-[#2D2D2D]/60 animate-pulse">
            Loading testimonials...
          </div>
        ) : testimonialData.length > 0 ? (
          <>
            {/* Desktop Testimonial Carousel - Right Direction */}
            <div className="md:flex hidden rounded-md flex-col antialiased items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards
                items={desktopDataRight}
                direction="right"
                speed="fast"
              />
            </div>

            {/* Mobile Testimonial Carousel - Left Direction */}
            <div className="md:flex hidden rounded-md flex-col antialiased items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards
                items={desktopDataLeft}
                direction="left"
                speed="fast"
              />
            </div>
            <div className="rounded-md sm:hidden flex flex-col antialiased items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards
                items={testimonialData}
                direction="left"
                speed="fast"
              />
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}
