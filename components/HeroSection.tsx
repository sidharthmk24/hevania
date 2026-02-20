"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import EnquiryModal from "./EnquiryModal";

// Dummy hero image (replace with high quality luxury interior)
const HERO_IMAGE = "https://images.unsplash.com/photo-1600596542815-27b88e5d1d40?q=80&w=2070&auto=format&fit=crop";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <Image
                    src={HERO_IMAGE}
                    alt="Luxury Interior"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-cream/90 text-sm md:text-base uppercase tracking-[0.2em] mb-4 font-light"
                >
                    Exquisite Locations for Timeless Moments
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream mb-8 leading-tight"
                >
                    Mukund Events
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

            {/* Scroll Indicator */}
            <motion.div
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
            </motion.div>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                propertyName="General Interest"
            />
        </section>
    );
}
