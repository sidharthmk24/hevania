"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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

    const links = [
        // { name: "Home", href: "/" },
        { name: "Venues", href: "/#properties" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 w-full z-40 transition-colors duration-300 ${scrolled ? "bg-cream/80 backdrop-blur-md shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <Link href="/" className={`text-2xl tracking-widest ${scrolled ? "text-dark-forest" : "text-[#CDCFC8]"}`}>
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
                    className="md:hidden text-[#CDCFC8]"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-full left-0 w-full bg-cream shadow-lg p-6 flex flex-col space-y-6 md:hidden"
                >
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[#CDCFC8] text-lg font-serif tracking-wide text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    );
}
