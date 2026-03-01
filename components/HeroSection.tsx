"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

const HERO_IMAGES = [
    // '/images/heroImages/carousel1.jpeg',
    '/images/heroImages/carousel2.jpg',
    '/images/heroImages/carousel4.webp',
    '/images/heroImages/carousel3.avif'

];

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const handleManualNav = (direction: 'next' | 'prev') => {
        setIsAutoPlaying(false);
        if (direction === 'next') nextSlide();
        else prevSlide();

        // Resume autoplay after 10 seconds of inactivity
        const timeout = setTimeout(() => setIsAutoPlaying(true), 10000);
        return () => clearTimeout(timeout);
    };

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Background Image Carousel with Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={HERO_IMAGES[currentImageIndex]}
                            alt={`Luxury Interior ${currentImageIndex + 1}`}
                            fill
                            priority
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/40 z-10" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-cream/90 text-sm md:text-2xl uppercase  mb-4 font-light"
                >
                    Where Refined Celebrations Find Their Perfect Space
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-8 leading-tight"
                >
                    HEVANIA
                </motion.h1>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-muted-gold text-dark-forest font-medium uppercase tracking-widest text-sm rounded-none hover:bg-cream transition-colors shadow-lg"
                >
                    Book Your Date
                </motion.button>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-4 md:px-8 pointer-events-none">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleManualNav('prev')}
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
                    onClick={() => handleManualNav('next')}
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
                    onClick={() => handleManualNav('prev')}
                    className="p-3 rounded-full border border-cream/20 bg-white/5 backdrop-blur-md text-cream pointer-events-auto"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleManualNav('next')}
                    className="p-3 rounded-full border border-cream/20 bg-white/5 backdrop-blur-md text-cream pointer-events-auto"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            </div>

            {/* Scroll Indicator */}
            {/* <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-cream/70 text-xs tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span>SCROLL</span>
                    <div className="w-[1px] h-12 bg-cream/50 overflow-hidden relative">
                        <motion.div
                            className="w-full h-full bg-white absolute top-0"
                            initial={{ y: "-100%" }}
                            animate={{ y: "100%" }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                    </div>
                </div>
            </motion.div> */}

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                propertyName="General Interest"
            />
        </section>
    );
}