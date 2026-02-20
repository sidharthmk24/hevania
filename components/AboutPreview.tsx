"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPreview() {
    return (
        <section className="py-24 md:py-32 bg-cream text-dark-forest overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="block text-sm uppercase tracking-widest text-muted-gold mb-4 font-medium">
                        Our Philosophy
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">
                        Crafting Unforgettable <br /> Experiences
                    </h2>
                    <p className="text-gray-600 font-light text-lg leading-relaxed mb-8 max-w-md">
                        At Mukund Events, we believe that the perfect setting is the soul of every celebration.
                        From intimate weddings to grand corporate galas, we offer exclusive access to
                        pristine plots and luxury venues that transform moments into memories.
                    </p>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 border-b border-dark-forest pb-1 hover:text-muted-gold hover:border-muted-gold transition-colors uppercase tracking-widest text-sm font-medium"
                    >
                        Discover Our Story <ArrowRight size={16} />
                    </Link>
                </motion.div>

                {/* Image Composition */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl z-10">
                        <Image
                            src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop"
                            alt="Luxury Architecture"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -bottom-10 -left-10 w-2/3 h-2/3 bg-soft-sage/30 rounded-xl -z-0" />
                </motion.div>

            </div>
        </section>
    );
}
