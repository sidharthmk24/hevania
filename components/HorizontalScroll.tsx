"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const VENUES = [
    {
        id: 1,
        name: "The Royal Lawn",
        location: "Lonavala, MH",
        price: "₹1,50,000 / day",
        image: "https://images.unsplash.com/photo-1519225468316-7484aaaf0278?q=80&w=1974&auto=format&fit=crop",
        status: "Available"
    },
    {
        id: 2,
        name: "Lakeside Pavilion",
        location: "Pawna Lake, MH",
        price: "₹85,000 / day",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
        status: "Booked Soon"
    },
    {
        id: 3,
        name: "Forest Retreat",
        location: "Mahabaleshwar, MH",
        price: "₹2,00,000 / day",
        image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2070&auto=format&fit=crop",
        status: "Limited Dates"
    },
    {
        id: 4,
        name: "Sunset Ridge",
        location: "Khandala, MH",
        price: "₹1,20,000 / day",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop",
        status: "Available"
    }
];

export default function HorizontalScroll() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const isDesktop = window.matchMedia("(min-width: 768px)").matches;

            if (isDesktop && containerRef.current && sectionRef.current) {
                const totalWidth = containerRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;

                gsap.to(containerRef.current, {
                    x: -(totalWidth - viewportWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: `+=${totalWidth}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="properties"
            ref={sectionRef}
            className="relative md:h-screen bg-dark-forest text-cream overflow-hidden py-24 md:py-0"
        >
            <div className="absolute top-10 left-10 md:left-20 z-10">
                <h2 className="text-4xl md:text-6xl font-serif">Exclusive Venues</h2>
                <p className="mt-2 text-gray-400 max-w-sm font-light">
                    Breathtaking backdrops for your most cherished celebrations.
                </p>
            </div>

            <div
                ref={containerRef}
                className="flex flex-col md:flex-row gap-12 md:gap-0 px-6 md:px-0 md:h-full md:items-center"
            >
                {/* Adds padding to start of track on desktop */}
                <div className="hidden md:block w-screen flex-shrink-0" />

                {VENUES.map((venue) => (
                    <div
                        key={venue.id}
                        className="w-full md:w-[600px] flex-shrink-0 md:px-8 group"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-900 shadow-2xl">
                            <Image
                                src={venue.image}
                                alt={venue.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <span className={`inline-block px-3 py-1 text-xs uppercase tracking-widest bg-cream text-dark-forest rounded-full w-fit mb-4 font-medium`}>
                                    {venue.status}
                                </span>
                                <h3 className="text-3xl font-serif text-white">{venue.name}</h3>
                                <p className="text-gray-300 font-light mb-2">{venue.location}</p>
                                <p className="text-muted-gold text-xl font-medium">{venue.price}</p>
                            </div>
                        </div>

                        {/* Mobile-only text below image */}
                        <div className="md:hidden mt-4">
                            <h3 className="text-2xl font-serif text-white">{venue.name}</h3>
                            <p className="text-gray-400 font-light">{venue.location}</p>
                            <p className="text-muted-gold mt-1">{venue.price}</p>
                        </div>
                    </div>
                ))}

                {/* Adds padding to end of track on desktop */}
                <div className="hidden md:block w-40 flex-shrink-0" />
            </div>
        </section>
    );
}
