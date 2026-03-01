

"use client";

// ============= Component Imports =============
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ============= Types & Interfaces =============
type Direction = "left" | "right";
type ContentItem = {
    title: string;
    description: string;
};

interface Images {
    desktop: string[];
    mobile: string[];
}

interface Props {
    images: Images;
    content: {
        desktop: ContentItem[][];
        mobile: ContentItem[];
    };
}

// ============= Constants =============
const CAROUSEL_CONFIG = {
    totalSlides: 3,
    transitionDuration: 800,
    autoplayInterval: 6000,
    dimensions: {
        desktop: { width: 1932, height: 1088 },
        mobile: { width: 326, height: 568 },
    },
};

export default function FtCarous({ images, content }: Props) {
    // ============= State =============
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<Direction>("right");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // ============= Handlers =============
    const handleTransition = useCallback(
        (newDirection: Direction) => {
            if (isAnimating) return;
            setIsAnimating(true);
            setDirection(newDirection);
            const nextIndex =
                newDirection === "right"
                    ? (currentIndex + 1) % CAROUSEL_CONFIG.totalSlides
                    : (currentIndex - 1 + CAROUSEL_CONFIG.totalSlides) % CAROUSEL_CONFIG.totalSlides;
            setCurrentIndex(nextIndex);
            setTimeout(() => setIsAnimating(false), CAROUSEL_CONFIG.transitionDuration);
        },
        [currentIndex, isAnimating]
    );

    // ============= Effects =============
    useEffect(() => {
        const timer = setInterval(() => handleTransition("right"), CAROUSEL_CONFIG.autoplayInterval);
        return () => clearInterval(timer);
    }, [handleTransition, currentIndex]); // Reset on manual nav

    // ============= Render Helpers =============
    const renderDesktopSection = (section: ContentItem, index: number) => (
        <div
            key={index}
            className="flex-1 group/section relative cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/section:opacity-100 transition-all duration-700 " />

            {/* Section content */}
            <div className="absolute inset-x-0 bottom-0 p-10 text-white z-[1]">
                <h2
                    className="font-serif text-white text-center text-xl md:text-2xl lg:text-2xl tracking-widest uppercase mb-4"
                >
                    {section.title}
                </h2>
                {/* Hover description */}
                <div className="overflow-hidden max-h-0 group-hover/section:max-h-40 transition-all duration-700 ease-in-out">
                    <p className="font-light mt-4 text-cream/90 text-center text-sm md:text-base lg:text-sm leading-relaxed max-w-xs mx-auto">
                        {section.description}
                    </p>
                    <div className="w-12 h-[1px] bg-muted-gold mx-auto mt-6 opacity-0 group-hover/section:opacity-100 transition-opacity duration-700" />
                </div>
            </div>
        </div>
    );

    return (
        <section className="relative w-full">
            {/* Navigation Arrows - Shared across layouts but positioned specifically */}
            <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 px-6 justify-between pointer-events-none">
                {/* <button
                    onClick={() => handleTransition("left")}
                    className="p-4 rounded-full border border-white/20 bg-black/10 backdrop-blur-md text-white hover:bg-muted-gold hover:text-dark-forest hover:border-muted-gold transition-all duration-500 pointer-events-auto group"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
                <button
                    onClick={() => handleTransition("right")}
                    className="p-4 rounded-full border border-white/20 bg-black/10 backdrop-blur-md text-white hover:bg-muted-gold hover:text-dark-forest hover:border-muted-gold transition-all duration-500 pointer-events-auto group"
                >
                    <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button> */}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <div className="bg-dark-forest sm:p-0">
                    {/* Desktop Version */}
                    <div className="overflow-hidden hidden md:block shadow-2xl xl:h-[100vh] w-[100%] aspect-[2/1] relative">
                        {/* Image container */}
                        <div className="absolute inset-0">
                            <AnimatePresence mode="popLayout">
                                {images.desktop.map((src, index) => (
                                    currentIndex === index && (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <Image
                                                src={src}
                                                alt={`Slide ${index + 1}`}
                                                width={CAROUSEL_CONFIG.dimensions.desktop.width}
                                                height={CAROUSEL_CONFIG.dimensions.desktop.height}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
                        </div>

                        {/* Vertical dividing lines */}
                        <div className="absolute inset-0 flex pointer-events-none z-10 opacity-30">
                            <div className="flex-1 border-r border-white/40"></div>
                            <div className="flex-1 border-r border-white/40"></div>
                            <div className="flex-1"></div>
                        </div>

                        {/* Sections with titles and hover descriptions */}
                        <div className="absolute inset-0 flex z-20">
                            {content.desktop[currentIndex].map((section, index) => renderDesktopSection(section, index))}
                        </div>
                    </div>

                    {/* Mobile Version */}
                    <div className="block md:hidden relative overflow-hidden shadow-xl min-h-[70vh]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction === "right" ? -50 : 50 }}
                                transition={{ duration: 0.6 }}
                                className="relative w-full h-[70vh]"
                            >
                                <Image
                                    src={images.mobile[currentIndex]}
                                    alt={`Slide ${currentIndex + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile Arrows */}
                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-30">
                            {/* <button
                                onClick={() => handleTransition("left")}
                                className="p-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm text-white shadow-lg"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleTransition("right")}
                                className="p-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm text-white shadow-lg"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button> */}
                        </div>

                        <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-8 pb-16 z-20">
                            <motion.div
                                key={`content-${currentIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="font-serif text-white text-3xl uppercase tracking-widest mb-4">
                                    {content.mobile[currentIndex].title}
                                </h2>
                                <p className="font-light text-cream/90 text-sm leading-relaxed mb-8">
                                    {content.mobile[currentIndex].description}
                                </p>
                            </motion.div>

                            <div className="flex space-x-6">
                                {content.mobile.map((_, dotIndex) => (
                                    <button
                                        key={dotIndex}
                                        disabled={isAnimating}
                                        onClick={() => {
                                            if (dotIndex !== currentIndex) {
                                                handleTransition(dotIndex > currentIndex ? "right" : "left");
                                            }
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${dotIndex === currentIndex ? "bg-muted-gold scale-150" : "bg-white/40"
                                            }`}
                                        aria-label={`Go to slide ${dotIndex + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

