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
    img?: string;
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

    const totalSlides = content.mobile.length;
    const desktopSlides = content.desktop.length;

    // ============= Handlers =============
    const handleTransition = useCallback(
        (newDirection: Direction) => {
            if (isAnimating) return;
            setIsAnimating(true);
            setDirection(newDirection);

            const nextIndex =
                newDirection === "right"
                    ? (currentIndex + 1) % totalSlides
                    : (currentIndex - 1 + totalSlides) % totalSlides;
            setCurrentIndex(nextIndex);
            setTimeout(() => setIsAnimating(false), CAROUSEL_CONFIG.transitionDuration);
        },
        [currentIndex, isAnimating, totalSlides]
    );

    // ============= Effects =============
    useEffect(() => {
        // IMPORTANT: If a user is hovering over a section, we exit early and don't start the timer.
        // This keeps the carousel completely still while they read.
        if (hoveredIndex !== null) return;

        const timer = setInterval(() => handleTransition("right"), CAROUSEL_CONFIG.autoplayInterval);
        return () => clearInterval(timer);
    }, [handleTransition, currentIndex, hoveredIndex]); // Added hoveredIndex as a dependency

    // ============= Render Helpers =============
    const renderDesktopSection = (section: ContentItem, index: number) => {
        const isHovered = hoveredIndex === index;

        return (
            <div
                key={index}
                className="flex-1 relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* Hover overlay gradient */}
                <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-700 ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`} 
                />

                {/* Section content - Remains still, only the hovered one expands its text */}
                <div className="absolute inset-x-0 bottom-0 p-10 text-white z-[1]">
                    <h2 className="font-serif text-white text-center text-xl md:text-2xl lg:text-2xl tracking-widest uppercase mb-4">
                        {section.title}
                    </h2>
                    
                    {/* Hover description expands, but parent stays in place */}
                    <div 
                        className={`overflow-hidden transition-all duration-700 ease-in-out ${
                            isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <p className="font-light mt-4 text-cream/90 text-center text-sm md:text-base lg:text-sm leading-relaxed max-w-xs mx-auto">
                            {section.description}
                        </p>
                        <div 
                            className={`w-12 h-[1px] bg-muted-gold mx-auto mt-6 transition-opacity duration-700 ${
                                isHovered ? "opacity-100" : "opacity-0"
                            }`} 
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="relative w-full">
            {/* Navigation Arrows */}
            <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 px-6 justify-between pointer-events-none">
                {/* Your arrow buttons go here */}
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
                            {/* Base Slide Images */}
                            <AnimatePresence mode="popLayout">
                                {images.desktop.map((src, index) => (
                                    currentIndex === index && (
                                        <motion.div
                                            key={`slide-${index}`}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <Image
                                                src={src}
                                                alt={`Slide ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                loading="lazy"
                                            />
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>

                            {/* Section Specific Hover Images */}
                            <AnimatePresence>
                                {hoveredIndex !== null && content.desktop[currentIndex][hoveredIndex]?.img && (
                                    <motion.div
                                        key={`hover-${currentIndex}-${hoveredIndex}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="absolute inset-0 w-full h-full z-[5]"
                                    >
                                        <Image
                                            src={content.desktop[currentIndex][hoveredIndex].img!}
                                            alt={content.desktop[currentIndex][hoveredIndex].title}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none" />
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

                    {/* Mobile Version stays identical */}
                    <div className="block md:hidden relative overflow-hidden shadow-xl min-h-[70vh]">
                        {/* ... Mobile content ... */}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}