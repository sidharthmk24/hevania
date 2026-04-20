"use client";

// ============= Component Imports =============
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

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
    transitionDuration: 500,
    autoplayInterval: 4000,
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState("");

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
    const renderCard = (section: ContentItem, index: number, isMobile: boolean = false) => {
        const isHovered = !isMobile && hoveredIndex === index;

        return (
            <div
                key={index}
                className="relative cursor-pointer group h-full w-full"
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                onClick={() => {
                    setSelectedProperty(section.title);
                    setIsModalOpen(true);
                }}
            >
                {/* Hover overlay - Subtle on mobile, active on desktop */}
                <div 
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${
                        isHovered ? "opacity-0" : "opacity-100"
                    }`} 
                />

                {/* Section content - Center aligned in the square */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 text-white z-[1] text-center">
                    <h2 className="font-serif text-white text-center text-[13px] sm:text-base md:text-2xl tracking-widest uppercase transition-all duration-500 group-hover:scale-105">
                        {section.title}
                    </h2>
                    
                    <div 
                        className={`overflow-hidden transition-all duration-700 ease-in-out ${
                            isHovered || isMobile ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <p className="font-light mt-2 md:mt-4 text-cream/90 text-center text-[10px] md:text-sm leading-relaxed max-w-[200px] md:max-w-[250px] mx-auto">
                            {section.description}
                        </p>
                        <div className="w-8 md:w-12 h-[1px] bg-muted-gold mx-auto mt-4 md:mt-6" />
                    </div>
                </div>
            </div>
        );
    };

    const renderDesktopSection = (section: ContentItem, index: number) => {
        return renderCard(section, index, false);
    };

    const renderMobileSection = (section: ContentItem, index: number) => {
        return renderCard(section, index, true);
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
                        <div className="absolute inset-0">
                            <AnimatePresence mode="popLayout">
                                {images.desktop.map((src, index) => (
                                    currentIndex === index && (
                                        <motion.div
                                            key={`slide-${index}`}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <Image src={src} alt="Slide" fill className="object-cover" loading="lazy" unoptimized />
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>

                            <AnimatePresence>
                                {hoveredIndex !== null && content.desktop[0][hoveredIndex]?.img && (
                                    <motion.div
                                        key={`hover-${hoveredIndex}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0 w-full h-full z-[5]"
                                    >
                                        <Image
                                            src={content.desktop[0][hoveredIndex].img!}
                                            alt="Hover"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-black/40 z-10" />
                        </div>

                        {/* 3x2 Grid with Center Horizontal Separation */}
                        <div className="absolute inset-0 pointer-events-none z-30">
                            {/* Vertical Dividers */}
                            <div className="flex h-full">
                                <div className="flex-1 border-r border-white/20"></div>
                                <div className="flex-1 border-r border-white/20"></div>
                                <div className="flex-1"></div>
                            </div>
                            {/* Horizontal Center Divider */}
                            <div className="absolute inset-0 flex flex-col">
                                <div className="flex-1 border-b border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
                                <div className="flex-1"></div>
                            </div>
                        </div>

                        {/* Sections in a 3x2 Grid */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 z-20">
                            {content.desktop[0].map((section, index) => renderDesktopSection(section, index))}
                        </div>
                    </div>

                    {/* Mobile Version - 2 Column Grid */}
                    <div className="block md:hidden relative overflow-hidden shadow-xl min-h-[90vh] h-[135vh]">
                        {/* Background Images for Mobile */}
                        <div className="absolute inset-0">
                            <AnimatePresence mode="popLayout">
                                {images.mobile.map((src, index) => (
                                    currentIndex === index && (
                                        <motion.div
                                            key={`slide-mobile-${index}`}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <Image src={src} alt="Slide" fill className="object-cover" loading="lazy" unoptimized />
                                        </motion.div>
                                    )
                                ))}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-black/50 z-10" />
                        </div>

                        {/* Mobile Grid Lines */}
                        <div className="absolute inset-0 pointer-events-none z-30">
                            <div className="flex h-full">
                                <div className="flex-1 border-r border-white/20"></div>
                                <div className="flex-1"></div>
                            </div>
                            <div className="absolute inset-0 flex flex-col">
                                <div className="flex-1 border-b border-white/20"></div>
                                <div className="flex-1 border-b border-white/20"></div>
                                <div className="flex-1"></div>
                            </div>
                        </div>

                        {/* Mobile Cards - 2x3 Grid */}
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 z-20">
                            {content.mobile.map((section, index) => renderMobileSection(section, index))}
                        </div>
                    </div>
                </div>
            </motion.div>
            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                propertyName={selectedProperty}
            />
        </section>
    );
}