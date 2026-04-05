"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export interface HighLivingSectionItem {
    id: string;
    label: string;
    description: string;
    imageSrc: string;
}

interface ProjectHighLivingProps {
    data: HighLivingSectionItem[];
}

export default function ScrollFtSection({ data }: ProjectHighLivingProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
    const descriptionsRef = useRef<(HTMLParagraphElement | null)[]>([]);

    // Store the timeline instance to access it for click scroll calculations
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // State to track the active section
    // Use data[0] safely
    const [activeId, setActiveId] = useState(data?.[0]?.id);

    // Mobile View State
    const activeData = data?.find((item) => item.id === activeId) || data?.[0];

    // Format text helper (if needed in future, currently just returns text)
    const formatText = (text: string) => text;

    // --- Desktop Scroll Animation ---
    useEffect(() => {
        if (!containerRef.current || !data || data.length === 0) return;

        let mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=400%", // Adjust scroll length as needed
                    scrub: 1,
                    pin: true,
                    snap: {
                        snapTo: "labels", // Snap to labels defined in timeline
                        duration: { min: 0.2, max: 0.8 },
                        delay: 0,
                        ease: "power2.inOut"
                    },
                    onUpdate: (self) => {
                        // Determine active section based on progress
                        const p = self.progress;
                        const total = data.length;
                        // Avoid division by zero if data.length is 1
                        if (total <= 1) return;

                        // Calculate index based on progress (0 to total-1)
                        // Using a slightly more tolerant checking than exact matching
                        let index = Math.round(p * (total - 1));
                        index = Math.max(0, Math.min(total - 1, index));

                        setActiveId((prev) => {
                            const newId = data[index].id;
                            return prev !== newId ? newId : prev;
                        });
                    }
                }
            });

            timelineRef.current = tl;

            // Define labels for snapping
            data.forEach((_, i) => {
                tl.addLabel(`section${i}`, i);
            });

            // --- Animations ---
            // For each section after the first one, animate it in
            for (let i = 0; i < data.length - 1; i++) {
                const nextIndex = i + 1;

                // Image Transition (Clip Path)
                // Note: imagesRef.current[0] is strictly visible initially. 
                // We animate imagesRef.current[nextIndex] into view on top of current.
                tl.to(imagesRef.current[nextIndex], {
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "none",
                    duration: 1
                }, i);

                // Title Transition
                // Fade out current title style
                tl.to(titlesRef.current[i], {
                    opacity: 0.5,
                    fontWeight: 100, // Thin
                    duration: 0.5
                }, i);

                // Fade in next title style
                tl.to(titlesRef.current[nextIndex], {
                    opacity: 1,
                    fontWeight: 500, // Medium
                    duration: 0.5
                }, i + 0.5); // Start halfway through image transition for smoother feel

                // Description Transition
                tl.to(descriptionsRef.current[i], {
                    opacity: 0,
                    y: -20,
                    duration: 0.5
                }, i);

                tl.fromTo(descriptionsRef.current[nextIndex],
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    i + 0.5
                );
            }

        }, containerRef);

        return () => mm.revert();
    }, [data]);

    // --- Click Handler ---
    const handleTabClick = (id: string, index: number) => {
        // Desktop: Smooth Scroll
        if (window.innerWidth >= 1024 && timelineRef.current && timelineRef.current.scrollTrigger) {
            const st = timelineRef.current.scrollTrigger;
            const totalDistance = st.end - st.start;
            const totalSections = data.length - 1; // 0 to 3 is 3 steps

            if (totalSections > 0) {
                // Calculate progress (0 to 1) for the target index
                const targetProgress = index / totalSections;

                // Calculate scroll position
                const scrollPos = st.start + (totalDistance * targetProgress);

                gsap.to(window, {
                    scrollTo: scrollPos,
                    duration: 1.5,
                    ease: "power3.inOut"
                });
            }
        }
        // Mobile: Instant Switch
        else {
            setActiveId(id);
        }
    };

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <>
            {/* Desktop View */}
            <div ref={containerRef} className="hidden md:flex relative w-full h-screen overflow-hidden flex-col md:flex-row bg-[#0097DC]">

                {/* --- Left Panel: Images --- */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-10 bg-black">
                    {data.map((item, index) => (
                        <div
                            key={item.id}
                            ref={el => { if (el) imagesRef.current[index] = el; }}
                            className="absolute inset-0 w-full h-full"
                            style={{
                                zIndex: 10 + index,
                                // First image visible, others clipped initially
                                clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)"
                            }}
                        >
                            <Image
                                src={item.imageSrc}
                                alt={item.label}
                                fill
                                sizes="50vw"
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* --- Right Panel: Content --- */}
                <div className="relative w-full md:w-[calc(50%+1px)] h-1/2 md:h-full z-20 flex flex-col justify-start pt-20 pb-10  bg-[#425042] md:-ml-[1px]">

                    {/* Titles List - Aligned Right with significant padding */}
                    <div className="flex flex-col items-end gap-12 w-full pr-8 md:pr-20 mb-20">
                        {data.map((item, index) => (
                            <h2
                                key={item.id}
                                ref={el => { if (el) titlesRef.current[index] = el; }}
                                onClick={() => handleTabClick(item.id, index)}
                                className="transition-colors duration-300 text-right leading-none cursor-pointer"
                                style={{
                                    // Initial state explicitly set for GSAP to handle
                                    opacity: index === 0 ? 1 : 0.5,
                                    color: "#ffffff",
                                    fontWeight: index === 0 ? 500 : 100, // Medium vs Thin
                                }}
                            >
                                <span className="text-4xl md:text-4xl lg:text-4xl tracking-wide block hover:opacity-100 transition-opacity">
                                    {item.label}
                                </span>
                            </h2>
                        ))}
                    </div>

                    {/* Descriptions - Aligned Left at the bottom */}
                    {/* 'bottom-20' and 'left-20' positions it exactly like the screenshot */}
                    <div className="absolute bottom-10 md:bottom-20 left-8 md:left-10 lg:left-20 w-full max-w-[90%] md:max-w-sm pointer-events-none">
                        {data.map((item, index) => (
                            <p
                                key={item.id}
                                ref={el => { if (el) descriptionsRef.current[index] = el; }}
                                className="absolute bottom-0 left-0 text-white/90 text-sm md:text-[15px] font-light leading-relaxed tracking-wide text-left"
                                style={{
                                    opacity: index === 0 ? 1 : 0,
                                    transform: index === 0 ? "translateY(0)" : "translateY(20px)",
                                    width: '100%'
                                }}
                            >
                                {item.description}
                            </p>
                        ))}
                    </div>

                </div>

            </div>

            {/* Mobile View - UNCHANGED logic from previous step, ensure consistent handlers */}
            <div className="md:hidden relative w-full bg-[#0097DC]">
                <section className="relative z-20 bg-[#0097DC] px-3 pt-20">
                    <div className="relative w-full h-[65vh] ">
                        <Image
                            src={activeData?.imageSrc || ""}
                            alt={activeData?.label || ""}
                            fill
                            sizes="100vw"
                            className="object-cover transition-opacity duration-500"
                            unoptimized
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0097DC]/90 via-[#0097DC]/40 to-transparent pointer-events-none z-10" />

                        {/* Tabs */}
                        <div className="absolute bottom-6 left-0 w-full px-4 z-20">
                            <div className="flex justify-between w-full items-end gap-2">
                                {data.map((item, index) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleTabClick(item.id, index)}
                                        className="flex flex-col gap-2 flex-1 group"
                                    >
                                        <span
                                            className={`uppercase text-[8px] md:text-lg tracking-widest font-medium transition-all text-center ${activeId === item.id
                                                ? "text-[#FFFAF6]"
                                                : "text-[#FFFAF6]/70 group-hover:text-[#FFFAF6]/80"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                        <div className="w-full h-[2px] bg-[#FFFAF6]/50 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-white transition-all duration-500 ${activeId === item.id ? "w-full" : "w-0"
                                                    }`}
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="px-3 pt-8 pb-16 bg-[#0097DC] max-w-md">
                        <h3 className="font-theSeasons text-3xl mb-4 text-[#E0E0E0]">{activeData?.label}</h3>
                        <div className="text-[#FFFAF6] text-sm leading-tight ">
                            {formatText(activeData?.description || "")}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}