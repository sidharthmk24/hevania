"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import EnquiryModal from "./EnquiryModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const CAROUSEL_INTERVAL = 5000; // 5 seconds per slide

const DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80",
];

const DEFAULT_PILLS = [
    "Weddings",
    "Engagements",
    "Haldi & Pre-wedding",
    "Baby Showers",
    "Birthdays",
    "Corporate Events",
    "Family Get-togethers",
];

const BOTTOM_COLUMNS = [
    {
        title: "A Venue for Every Occasion",
        description:
            "Wedding mornings by the water. Haldi in the afternoon light. Engagements, baby showers, birthdays and corporate gatherings, in an open natural setting with room for your own decor, your own caterer and your own way of celebrating.",
    },
    {
        title: "A Riverside Staycation, Made for Slow Days",
        description:
            "Wake up to the river. Have chai on the porch, walk through the greenery and do nothing for a while. Made for couples, families and small groups who want a weekend away without a long journey.",
    },
    {
        title: "Close to the City, Far from the Noise",
        description:
            "A short drive from Kochi, Kottayam and Alappuzha, so guests arrive easily and still feel they have gone somewhere. Our team looks after the details, so you can enjoy the day.",
    },
];

interface ExperienceSectionProps {
    image1?: string;
    image2?: string;
    content?: {
        heading?: string;
        subheading?: string;
        description?: string;
        metrics?: { value: string; label: string }[];
        tags?: string;
    };
}

export default function ExperienceSection({ image1, image2, content }: ExperienceSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Build carousel images list from props + defaults
    const carouselImages = [
        image1 || DEFAULT_IMAGES[0],
        image2 || DEFAULT_IMAGES[1],
        DEFAULT_IMAGES[2],
    ];

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveSlide(index);
        setProgress(0);
        setTimeout(() => setIsTransitioning(false), 700);
    }, [isTransitioning]);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);

        setProgress(0);
        const tickInterval = 50;
        const steps = CAROUSEL_INTERVAL / tickInterval;

        progressRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 0;
                return prev + 100 / steps;
            });
        }, tickInterval);

        timerRef.current = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % carouselImages.length);
            setProgress(0);
        }, CAROUSEL_INTERVAL);
    }, [carouselImages.length]);

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [startTimer]);

    // Reset timer when manually changing slides
    const handleDotClick = (index: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
        goToSlide(index);
        startTimer();
    };

    // GSAP scroll animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (headerRef.current) {
                gsap.from(headerRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                });
            }

            if (rightRef.current) {
                gsap.from(rightRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.9,
                    ease: "power3.out",
                    delay: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                });
            }

            if (bottomRef.current) {
                gsap.from(bottomRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.9,
                    ease: "power3.out",
                    delay: 0.25,
                    scrollTrigger: {
                        trigger: bottomRef.current,
                        start: "top 85%",
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const pills = content?.tags
        ? content.tags.split(",").map((t) => t.trim())
        : DEFAULT_PILLS;

    const headingText = content?.subheading || content?.heading || "The River, The Sky,\nYour Moment,\nYour Way";

    const descriptionText =
        content?.description ||
        "Some places you visit. Some you remember. Hevaniya sits on the banks of the river in Vaikom, with open sky above, green all around, and the water keeping its own slow time.";

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#F7F5F0] text-[#1A2A1A] py-20 md:py-28 overflow-hidden"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
            <div className="mx-auto px-6 md:px-16 lg:px-24 w-full">
                {/* ── TOP: Perfect For label + Pills ──────────────── */}
                <div className="mb-12 md:mb-16">
                    <span
                        className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A75E] block mb-4"
                        style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                    >
                        PERFECT FOR
                    </span>
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                        {pills.map((pill) => (
                            <span
                                key={pill}
                                className="px-4 py-2 rounded-full border border-[#2C3A2C]/15 bg-white/70 text-xs sm:text-sm text-[#2C3A2C] font-normal hover:bg-[#1A2A1A] hover:text-white hover:border-[#1A2A1A] transition-all cursor-default whitespace-nowrap shadow-sm"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                            >
                                {pill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── MIDDLE: Heading on Left (with written text down), Image on Right ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
                    {/* Left: Main Heading + Written Text Down */}
                    <div ref={headerRef} className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-[-0.02em] text-[#1A2A1A] leading-[1.08] whitespace-pre-line"
                            >
                                {headingText}
                            </h2>
                        </div>

                        <div className="mt-8 lg:mt-auto pt-6 lg:pt-10">
                            <p
                                className="text-sm md:text-base leading-relaxed max-w-lg font-light"
                                style={{ color: "rgba(44,58,44,0.75)" }}
                            >
                                {descriptionText}
                            </p>
                        </div>
                    </div>

                    {/* Right: Image Frame */}
                    <div ref={rightRef} className="lg:col-span-7 flex items-center">
                        <div
                            className="relative w-full aspect-[16/10] overflow-hidden rounded-none  bg-black/10  group"
                            onClick={() => setIsModalOpen(true)}
                        >
                            {carouselImages.map((src, i) => (
                                <div
                                    key={i}
                                    className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                                    style={{
                                        opacity: activeSlide === i ? 1 : 0,
                                        zIndex: activeSlide === i ? 1 : 0,
                                    }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Experience ${i + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                        priority={i === 0}
                                    />
                                    <div className="absolute inset-0 bg-[#1A2A1A]/10 mix-blend-overlay" />
                                </div>
                            ))}

                            {/* Gradient overlay at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                            {/* Slide counter */}
                            <div
                                className="absolute top-4 right-4 z-20 flex items-center gap-2"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                            >
                                <span className="text-white/90 text-[0.65rem] tracking-[0.25em] uppercase bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                                    {String(activeSlide + 1).padStart(2, "0")} / {String(carouselImages.length).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Dot navigation + progress */}
                            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 cursor-pointer">
                                {carouselImages.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDotClick(i);
                                        }}
                                        className="relative overflow-hidden focus:outline-none rounded-full cursor-pointer"
                                        aria-label={`Go to slide ${i + 1}`}
                                        style={{
                                            width: activeSlide === i ? "2rem" : "0.5rem",
                                            height: "3px",
                                            background: "rgba(255,255,255,0.4)",
                                            transition: "width 0.4s ease",
                                        }}
                                    >
                                        {activeSlide === i && (
                                            <span
                                                className="absolute left-0 top-0 h-full bg-white "
                                                style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM: Divider line & 3 Columns ───────────────────── */}
                <div ref={bottomRef} className="mt-14 md:mt-20">
                    <div className="border-t border-[#2C3A2C]/15 pt-10 md:pt-14">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                            {BOTTOM_COLUMNS.map((col, index) => (
                                <div
                                    key={col.title}
                                    className={`flex flex-col gap-3 ${
                                        index === 0
                                            ? "md:pr-10 md:border-r md:border-[#2C3A2C]/15"
                                            : index === 1
                                            ? "md:px-10 md:border-r md:border-[#2C3A2C]/15"
                                            : "md:pl-10"
                                    }`}
                                >
                                    <h3 className="text-lg sm:text-xl font-bold text-[#1A2A1A] tracking-tight leading-snug">
                                        {col.title}
                                    </h3>
                                    <p
                                        className="text-xs sm:text-sm leading-relaxed font-light"
                                        style={{ color: "rgba(44,58,44,0.70)" }}
                                    >
                                        {col.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                propertyName="Experience"
            />
        </section>
    );
}
