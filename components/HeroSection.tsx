"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

type HeroSlide = {
    image: string;
    subtitle: string;
    title: string;
    bottom_subtitle?: string;
    buttons: { text: string; primary: boolean }[];
};

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
    {
        image: "/images/heroImages/carousel2.jpg",
        subtitle: "Where Refined Celebrations Find Their Perfect Space",
        title: "HEVANIYA",
        bottom_subtitle: "A breathtaking destination for premium events",
        buttons: [
            { text: "Schedule a Tour", primary: true },
            { text: "Submit Inquiry", primary: false },
        ],
    },
    {
        image: "/images/heroImages/carousel4.webp",
        subtitle: "Experience Unparalleled Luxury and Elegance",
        title: "EXQUISITE",
        bottom_subtitle: "Designed to host your grandest celebrations",
        buttons: [
            { text: "Explore Spaces", primary: true },
            { text: "Book an Event", primary: false },
        ],
    },
    {
        image: "/images/heroImages/carousel3.avif",
        subtitle: "Crafting Timeless Memories in Every Detail",
        title: "MEGISTUS",
        bottom_subtitle: "Versatile spaces customized to your needs",
        buttons: [
            { text: "View Gallery", primary: true },
            { text: "Get in Touch", primary: false },
        ],
    },
];

interface HeroSectionProps {
    /** Full structured slides from CMS (preferred) */
    heroSlides?: HeroSlide[];
    /** Legacy: just image URLs (still supported) */
    dynamicImages?: string[];
}

export default function     HeroSection({ heroSlides, dynamicImages }: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [hoveredButton, setHoveredButton] = useState<number | null>(null);

    // Resolve slides: prefer heroSlides prop, then apply dynamicImages fallback, then defaults
    const slides: HeroSlide[] = (heroSlides && heroSlides.length > 0)
        ? heroSlides
        : DEFAULT_HERO_SLIDES.map((slide, idx) => ({
            ...slide,
            image: dynamicImages?.[idx] || slide.image,
        }));

    const nextSlide = useCallback(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const handleManualNav = (direction: "next" | "prev") => {
        setIsAutoPlaying(false);
        if (direction === "next") nextSlide();
        else prevSlide();
        const timeout = setTimeout(() => setIsAutoPlaying(true), 10000);
        return () => clearTimeout(timeout);
    };

    const currentSlide = slides[currentSlideIndex];

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Background Image Carousel with Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentSlideIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={currentSlide.image}
                            alt={`Luxury Interior ${currentSlideIndex + 1}`}
                            fill
                            priority
                            className="object-cover"
                            unoptimized
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/60 z-10" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 py-12 md:py-16 max-w-5xl mx-auto w-[95%] md:w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlideIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-cream/90 text-sm md:text-2xl uppercase mb-4 font-semibold tracking-[0.2em]"
                        >
                            {currentSlide.subtitle}
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className={`text-5xl md:text-7xl lg:text-8xl font-serif text-cream leading-tight tracking-wider font-bold ${currentSlide.bottom_subtitle ? "mb-4" : "mb-8"}`}
                        >
                            {currentSlide.title}
                        </motion.h1>
                        {currentSlide.bottom_subtitle && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="text-cream/90 text-sm md:text-xl font-light mb-8 max-w-3xl mx-auto"
                            >
                                {currentSlide.bottom_subtitle}
                            </motion.p>
                        )}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {currentSlide.buttons.map((button, idx) => (
                                <motion.button
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                                    onMouseEnter={() => setHoveredButton(idx)}
                                    onMouseLeave={() => setHoveredButton(null)}
                                    onClick={() => setIsModalOpen(true)}
                                    className={`px-8 py-4 font-medium uppercase tracking-widest text-sm rounded-none transition-colors shadow-lg min-w-[200px] ${
                                        button.primary
                                            ? hoveredButton === idx 
                                                ? "bg-[#425042]/80 text-white" 
                                                : "bg-[#425042] text-white"
                                            : hoveredButton === idx 
                                                ? "bg-cream/80 text-[#425042]" 
                                                : "bg-cream text-[#425042]"
                                    }`}
                                >
                                    {button.text}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Desktop Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-4 md:px-8 pointer-events-none">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleManualNav("prev")}
                    className="p-4 rounded-full border border-cream/20 bg-white/5 backdrop-blur-md text-cream transition-colors pointer-events-auto group hidden md:flex"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </motion.button>

                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleManualNav("next")}
                    className="p-4 rounded-full border border-cream/20 bg-white/5 backdrop-blur-md text-cream transition-colors pointer-events-auto group hidden md:flex"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="absolute bottom-10 inset-x-0 md:hidden z-20 flex justify-center gap-8 pointer-events-none">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleManualNav("prev")}
                    className="p-3 rounded-full border border-cream/20 bg-white/5 backdrop-blur-md text-cream pointer-events-auto"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleManualNav("next")}
                    className="p-3 rounded-full border border-cream/20 bg-white/5 backdrop-blur-md text-cream pointer-events-auto"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            </div>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                propertyName={currentSlide.title}
            />
        </section>
    );
}