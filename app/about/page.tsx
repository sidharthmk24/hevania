"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TEAM = [
    {
        name: "Mukund Sharma",
        role: "Founder & Creative Director",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Aisha Verma",
        role: "Head of Event Planning",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
    },
    {
        name: "David Ross",
        role: "Venue Curator",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    }
];

const STATS = [
    { label: "Years of Experience", value: "25+" },
    { label: "Events Hosted", value: "150+" },
    { label: "Industry Awards", value: "40+" }
];

export default function AboutPage() {
    return (
        <div className="bg-cream text-dark-forest">
            {/* Hero */}
            <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
                <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
                    alt="About Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-5xl md:text-7xl font-serif text-cream text-center"
                >
                    Our Legacy
                </motion.h1>
            </section>

            {/* Story */}
            <section className="py-24 px-6 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="block text-sm uppercase tracking-widest text-muted-gold mb-6 font-medium">Who We Are</span>
                    <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700">
                        At HEVANIA, we believe that a venue is more than just a location;
                        it is the canvas upon which life's most beautiful memories are painted.
                        Founded with a vision to redefine celebrations, we offer access to
                        exclusive, nature-immersed plots that blend breathtaking scenery with
                        seamless hospitality.
                    </p>
                </motion.div>
            </section>

            {/* Stats */}
            <section className="py-24 bg-dark-forest text-cream">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                        >
                            <h3 className="text-6xl md:text-7xl font-serif text-muted-gold mb-2">{stat.value}</h3>
                            <p className="text-sm uppercase tracking-widest font-light">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h2 className="text-4xl font-serif text-center mb-16">The Visionaries</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {TEAM.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="text-center group"
                        >
                            <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-serif">{member.name}</h3>
                            <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
