"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const lenis = useLenis();

    useEffect(() => {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
        if (lenis) {
            lenis.stop();
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200);

        // Allow scrolling after exit animation finishes
        const overflowTimer = setTimeout(() => {
            document.body.style.overflow = "";
            if (lenis) {
                lenis.start();
            }
        }, 4000);

        return () => {
            clearTimeout(timer);
            clearTimeout(overflowTimer);
            document.body.style.overflow = "";
            if (lenis) {
                lenis.start();
            }
        };
    }, [lenis]);

    const HEVANIYA = "HEVANIYA".split("");

    return (
        <AnimatePresence>
            {isLoading && (
                <div className="fixed inset-0 z-[100] pointer-events-none">
                    {/* 5-Panel Sliding Curtain */}
                    <div className="absolute inset-0 flex w-full h-full">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className="h-full w-1/5 bg-[#161C16] relative border-r border-[#EDEAE3]/[0.03] last:border-r-0"
                                initial={{ y: "0%" }}
                                exit={{ y: "-100%" }}
                                transition={{ 
                                    duration: 1.2, 
                                    ease: [0.76, 0, 0.24, 1], 
                                    delay: 0.15 + (i * 0.05) 
                                }}
                            />
                        ))}
                    </div>

                    {/* Text Wrapper */}
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center pl-[0.4em]"
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="overflow-hidden flex">
                            {HEVANIYA.map((letter, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block text-[#EDEAE3] text-2xl md:text-4xl lg:text-7xl font-serif tracking-[0.4em] uppercase"
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{
                                        duration: 1.2,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: i * 0.06,
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
