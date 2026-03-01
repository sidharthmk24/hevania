"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, Variants, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    const links = [
        // { name: "Home", href: "/" },
        { name: "Venues", href: "/#properties" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
    ];

    const menuVariants: Variants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: "easeInOut",
                when: "afterChildren",
            },
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const linkVariants: Variants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0 },
    };

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled || mobileMenuOpen ? "bg-cream/80 backdrop-blur-md shadow-sm" : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-50">
                    <Link
                        href="/"
                        className={`text-2xl tracking-widest transition-colors ${scrolled || mobileMenuOpen ? "text-dark-forest" : "text-[#CDCFC8]"}`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        HEVANIA
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-12">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium uppercase tracking-wider hover:text-muted-gold transition-colors relative group ${scrolled ? "text-dark-forest" : "text-[#CDCFC8]"}`}
                            >
                                {link.name}
                                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-muted-gold transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden z-50 transition-colors ${scrolled || mobileMenuOpen ? "text-dark-forest" : "text-[#CDCFC8]"}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-cream flex flex-col items-center z-40 md:hidden"
                    >
                        <div className="flex flex-col h-full w-full px-8 py-24 justify-between">
                            {/* Navigation Links */}
                            <div className="flex flex-col space-y-12 items-center justify-center flex-grow">
                                {links.map((link) => (
                                    <motion.div key={link.name} variants={linkVariants}>
                                        <Link
                                            href={link.href}
                                            className="text-dark-forest text-3xl font-serif tracking-[0.2em] uppercase hover:text-muted-gold transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Additional Info / Socials */}
                            <motion.div
                                variants={linkVariants}
                                className="flex flex-col items-center space-y-8 pt-12 border-t border-dark-forest/10"
                            >
                                <div className="flex space-x-8">
                                    <Link href="#" className="text-dark-forest/60 text-sm tracking-widest uppercase hover:text-muted-gold transition-colors">Instagram</Link>
                                    <Link href="#" className="text-dark-forest/60 text-sm tracking-widest uppercase hover:text-muted-gold transition-colors">Facebook</Link>
                                </div>
                                <div className="text-center">
                                    <p className="text-dark-forest/40 text-[10px] uppercase tracking-[0.3em]">Based in Bali, Indonesia</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
