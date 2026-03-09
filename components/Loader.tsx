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
        }, 2000);

        // Allow scrolling after exit animation finishes
        const overflowTimer = setTimeout(() => {
            document.body.style.overflow = "";
            if (lenis) {
                lenis.start();
            }
        }, 3500);

        return () => {
            clearTimeout(timer);
            clearTimeout(overflowTimer);
            document.body.style.overflow = "";
            if (lenis) {
                lenis.start();
            }
        };
    }, [lenis]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream text-dark-forest"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-serif tracking-widest text-dark-forest mb-8 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1.35 }}
                        transition={{
                            duration: 1.5,
                            ease: "easeOut",
                        }}
                    >
                        HEVANIA
                    </motion.h1>


                </motion.div>
            )}
        </AnimatePresence>
    );
}
