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
            gsap.from(headerRef.current, {
                opacity: 0,
                x: -50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            gsap.from(rightRef.current, {
                opacity: 0,
                x: 50,
                duration: 1,
                ease: "power3.out",
                delay: 0.15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const metrics = content?.metrics && content.metrics.length > 0
        ? content.metrics
        : [
            { value: "200+", label: "Curated Spaces" },
            { value: "12", label: "Countries" },
            { value: "25+", label: "Years of Excellence" },
            { value: "150+", label: "Events Hosted" },
        ];

    const tags = content?.tags
        ? content.tags.split(",").map((t) => t.trim())
        : ["Interior Design", "Architecture", "Bespoke Stays", "Luxury Living", "Curated Art"];

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#F7F5F0] py-24 md:py-36 overflow-hidden"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
            <div className="mx-auto px-6 md:px-12 lg:px-20">
                {/* ── Centered header ─────────────────────────────── */}
              

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* ── LEFT: Auto Carousel ──────────────────────────────── */}
                    <div ref={headerRef} className="lg:col-span-7 relative">

                        {/* Main image frame */}
                        <div className="relative aspect-[16/10] overflow-hidden shadow-2xl ">
                            {carouselImages.map((src, i) => (
                                <div
                                    key={i}
                                    className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                                    style={{ opacity: activeSlide === i ? 1 : 0, zIndex: activeSlide === i ? 1 : 0 }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Experience ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 58vw"
                                        priority={i === 0}
                                    />
                                    <div className="absolute inset-0 bg-[#1A2A1A]/10 mix-blend-overlay" />
                                </div>
                            ))}

                            {/* Gradient overlay at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A1A]/50 via-transparent to-transparent z-10" />

                            {/* Slide counter */}
                            <div
                                className="absolute top-6 right-6 z-20 flex items-center gap-2"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                            >
                                <span className="text-white/50 text-[0.6rem] tracking-[0.3em] uppercase">
                                    {String(activeSlide + 1).padStart(2, "0")} / {String(carouselImages.length).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Dot navigation + progress */}
                            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                                {carouselImages.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleDotClick(i)}
                                        className="relative overflow-hidden focus:outline-none"
                                        aria-label={`Go to slide ${i + 1}`}
                                        style={{
                                            width: activeSlide === i ? "2.5rem" : "0.5rem",
                                            height: "2px",
                                            background: "rgba(255,255,255,0.3)",
                                            transition: "width 0.4s ease",
                                        }}
                                    >
                                        {activeSlide === i && (
                                            <span
                                                className="absolute left-0 top-0 h-full bg-white"
                                                style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ── Perfect For: event pills ─────────────────────── */}
                        <div className="mt-6">
                            {/* Superscript label */}
                            <div className="mb-4">
                                <span
                                    className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A75E] block"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                                >
                                    Perfect For
                                </span>
                                <div className="h-[1px] bg-gradient-to-r from-[#C6A75E] to-transparent w-[50px] mt-2" />
                            </div>

                            {/* Event type cards */}
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: "Weddings", icon: "💍" },
                                    { label: "Engagements", icon: "🥂" },
                                    { label: "Haldi Ceremonies", icon: "🌸" },
                                    { label: "Baby Showers", icon: "🍼" },
                                    { label: "Birthdays", icon: "🎂" },
                                    { label: "Corporate Events", icon: "✦" },
                                ].map((event) => (
                                    <div
                                        key={event.label}
                                        className="group flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 border border-[#2C3A2C]/12 bg-[#F7F5F0] hover:text-[#ffffff] hover:bg-[#1A2A1A] hover:border-[#1A2A1A] transition-all duration-300 cursor-default"
                                    >
                                        {/* <span className="text-base leading-none group-hover:scale-110 transition-transform duration-300">
                                            {event.icon}
                                        </span> */}
                                        <span
                                            className="text-[0.52rem] uppercase tracking-[0.12em] font-normal text-center leading-tight  transition-colors duration-300"
                                            style={{
                                                
                                                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                                            }}
                                        >
                                            {event.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Content Panel ─────────────────────────────── */}
                    <div ref={rightRef} className="lg:col-span-5 space-y-10 pt-20 lg:pt-0">

                        {/* Label + Heading */}
                        <div className="space-y-5">
                            {/* <div className="flex items-center gap-4">
                                <span className="block w-8 h-px bg-[#2C3A2C]/30" />
                                <span
                                    className="text-[0.58rem] tracking-[0.36em] uppercase text-[#C6A75E] font-semibold"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                                >
                                    {content?.heading || "Our Philosophy"}
                                </span>
                            </div> */}

                            <h2
                                className="font-light tracking-[-0.03em] leading-[1.05] text-[#1A2A1A] whitespace-pre-line "
                                style={{ fontSize: "clamp(2rem, 3.6vw, 3.4rem)" }}
                            >
                                {content?.subheading ? (
                                    <span dangerouslySetInnerHTML={{ __html: content.subheading.replace(/\n/g, "<br/>") }} />
                                ) : (
                                    <>
                                        Where Exceptional <br />
                                        Experiences{" "}
                                        <span className="italic" style={{ color: "#C6A75E" }}>
                                         <br className="md:block hidden" />   Take Shape
                                        </span>
                                    </>
                                )}
                            </h2>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 border-l-2 border-[#C6A75E]/30 pl-6">
                            <p
                                className="text-sm leading-[1.9] font-light tracking-[0.01em] whitespace-pre-line"
                                style={{ color: "rgba(44,58,44,0.70)", fontSize: "0.98rem" }}
                            >
                                {content?.description || (
                                    <>
                                        Are you looking for a beautiful riverside event venue or a nature-friendly staycation in Vaikom, Kerala? Welcome to HEVANIYA — a riverside destination made for special celebrations and peaceful getaways in the heart of nature.
                                        {"\n\n"}
                                        Llocated in Vaikom, Kottayam, HEVANIYA is one of the most loved venues in Kerala for weddings, Haldi ceremonies, engagements, private celebrations, corporate events, and staycations. With lovely river views, green surroundings, and open skies, our venue gives you a calm and beautiful setting for any occasion.
Whether you are planning a riverside wedding, a fun celebration, or a quiet nature-friendly staycation, HEVANIYA is the perfect place for you. The peaceful atmosphere here makes every moment feel truly special.
Conveniently located near Kochi (Ernakulam), Kottayam, and Alappuzha, HEVANIYA feels like a private riverside escape away from the city — making it the ideal choice for anyone looking for a unique and memorable venue in Kerala.
Our friendly team of event professionals is always here to help with all your planning and service needs. We take care of every detail, so you can simply relax and enjoy your special day.

                                    </>
                                )}
                               
                            </p>
                        </div>

                        {/* Metrics grid */}
                        {/* <div className="grid grid-cols-2 gap-px bg-[#2C3A2C]/10 border border-[#2C3A2C]/10">
                            {metrics.slice(0, 4).map((metric, i) => (
                                <div
                                    key={i}
                                    className="bg-[#F7F5F0] px-6 py-5 flex flex-col gap-1"
                                >
                                    <p
                                        className="text-[1.9rem] font-light leading-none tracking-[-0.03em]"
                                        style={{ color: "#1A2A1A" }}
                                    >
                                        {metric.value.replace(/[^0-9]/g, "")}
                                        <span
                                            className="text-[1rem]"
                                            style={{ color: "#C6A75E" }}
                                        >
                                            {metric.value.replace(/[0-9]/g, "")}
                                        </span>
                                    </p>
                                    <p
                                        className="text-[0.55rem] tracking-[0.26em] uppercase font-medium mt-1"
                                        style={{
                                            color: "rgba(44,58,44,0.38)",
                                            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                                        }}
                                    >
                                        {metric.label}
                                    </p>
                                </div>
                            ))}
                        </div> */}

                        {/* Tags + CTA row */}
                        {/* <div className="flex flex-wrap items-center gap-3 pt-2">
                            {tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[0.55rem] tracking-[0.2em] uppercase font-medium border px-3 py-1.5 cursor-default transition-all duration-200 hover:border-[#2C3A2C]/28 hover:text-[#2C3A2C]/62"
                                    style={{
                                        color: "rgba(44,58,44,0.40)",
                                        borderColor: "rgba(44,58,44,0.14)",
                                        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="ml-auto inline-flex items-center gap-4 group focus:outline-none"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                            >
                                <span
                                    className="text-[0.6rem] tracking-[0.32em] uppercase font-medium transition-colors duration-300 group-hover:text-[rgba(44,58,44,0.85)]"
                                    style={{ color: "rgba(44,58,44,0.45)" }}
                                >
                                    Enquire Now
                                </span>
                                <span className="block h-px w-7 bg-[#2C3A2C]/28 transition-all duration-300 group-hover:w-14 group-hover:bg-[#2C3A2C]/55" />
                            </button>
                        </div> */}

                        {/* Two-column feature highlights */}
                        {/* <div className="grid grid-cols-2 gap-8 border-t border-[#2C3A2C]/10 pt-8">
                            <div>
                                <h4
                                    className="text-[#1A2A1A] font-semibold text-xs mb-3 uppercase tracking-wider"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                                >
                                    Artistic Vision
                                </h4>
                                <p className="text-xs leading-relaxed" style={{ color: "rgba(44,58,44,0.50)" }}>
                                    Every detail is curated to create a visually stunning experience.
                                </p>
                            </div>
                            <div>
                                <h4
                                    className="text-[#1A2A1A] font-semibold text-xs mb-3 uppercase tracking-wider"
                                    style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                                >
                                    Heritage
                                </h4>
                                <p className="text-xs leading-relaxed" style={{ color: "rgba(44,58,44,0.50)" }}>
                                    Decades of expertise in managing high-end destination events.
                                </p>
                            </div>
                        </div> */}
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
