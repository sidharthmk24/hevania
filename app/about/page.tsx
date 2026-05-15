"use client";

import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Quote, Target, Heart, Award, Star, Users, Leaf, Calendar, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

const TEAM = [
    {
        name: "Mukund Sharma",
        role: "Founder & Creative Director",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
        bio: "With over 20 years in luxury event management, Mukund brings a unique vision of elegance and nature-integrated celebrations."
    },
    {
        name: "Aisha Verma",
        role: "Head of Event Planning",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
        bio: "Aisha transforms complex logistical challenges into seamless, unforgettable experiences for our most discerning clients."
    },
    {
        name: "David Ross",
        role: "Venue Curator",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        bio: "David's keen eye for breathtaking locations ensures that every HEVANIYA plot offers a unique and majestic backdrop."
    }
];

const STATS = [
    { label: "Years of Experience", value: "25+", icon: Award },
    { label: "Events Hosted", value: "150+", icon: Calendar },
    { label: "Industry Awards", value: "40+", icon: Star }
];

const VALUES = [
    {
        title: "Uncompromising Quality",
        description: "We set the highest standards for every event, ensuring excellence in every detail from decor to service.",
        icon: Target
    },
    {
        title: "Nature Integrated",
        description: "Our venues are designed to harmoniously blend with their natural surroundings, preserving the beauty of nature.",
        icon: Leaf
    },
    {
        title: "Client-Centric",
        description: "We put our clients at the heart of everything we do, crafting experiences that reflect their unique personality.",
        icon: Heart
    }
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    return (
        <div ref={containerRef} className="relative bg-cream overflow-hidden">
            {/* Global Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            
            <Navbar />

            {/* Premium Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div 
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
                        alt="About HEVANIYA"
                        fill
                        className="object-cover scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </motion.div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="text-cream/90 text-sm md:text-2xl uppercase mb-4 font-semibold tracking-[0.2em] block">
                            The Hevaniya Story
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream leading-tight tracking-wider font-normal mb-8">
                            Our <span className="italic">Legacy</span>
                        </h1>
                        <p className="text-cream/90 text-sm md:text-xl font-light mb-8 max-w-3xl mx-auto leading-relaxed">
                            Crafting extraordinary experiences in nature's most majestic settings for over two decades.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Side Text */}
                <div className="absolute left-10 bottom-20 hidden lg:block origin-left -rotate-90">
                    <span className="text-white/20 text-[10px] uppercase tracking-[0.5em] whitespace-nowrap">Excellence In Every Detail • Since 1999</span>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Explore</span>
                    <div className="w-px h-16 bg-gradient-to-b from-muted-gold to-transparent" />
                </motion.div>
            </section>

            {/* Philosophy Section - Minimal Blank Space */}
            <section className="relative py-24 md:py-40 px-6 overflow-hidden bg-cream">
                {/* Background Decorative Element */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-soft-sage/20 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7 relative"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-sm shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                                    alt="Philosophy"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-dark-forest/10 mix-blend-overlay" />
                            </div>
                            {/* Floating decorative card - Overlapping to reduce space */}
                            <motion.div 
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="absolute -bottom-12 -left-6 md:left-12 bg-dark-forest p-8 md:p-14 text-cream shadow-2xl max-w-md"
                            >
                                <Quote className="text-muted-gold w-12 h-12 mb-6 opacity-80" />
                                <p className="text-cream/90 font-serif italic text-xl md:text-2xl leading-snug">
                                    "We don't just find locations; we discover the soul of a celebration."
                                </p>
                                <div className="mt-8 flex items-center gap-4">
                                    <div className="h-px w-8 bg-muted-gold" />
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-gold">Our Mantra</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 space-y-10 pt-12 lg:pt-0"
                        >
                            <div className="space-y-4">
                                <span className="text-muted-gold text-xs font-bold uppercase tracking-[0.4em] block">Our Philosophy</span>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-dark-forest leading-[1.1] tracking-tight">
                                    Nature Meets <br />
                                    <span className="text-muted-gold italic">Artistry</span>
                                </h2>
                            </div>
                            
                            <div className="space-y-6">
                                <p className="text-xl text-dark-forest/80 leading-relaxed font-light">
                                    At HEVANIYA, we believe that a venue is more than just a location; it is the canvas upon which life's most beautiful memories are painted. 
                                </p>
                                <p className="text-dark-forest/60 leading-relaxed text-sm">
                                    Founded with a vision to redefine luxury celebrations, we offer access to exclusive, nature-immersed plots that blend breathtaking scenery with seamless hospitality. Every project we undertake is a testament to our commitment to environmental harmony and architectural elegance.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-10 border-t border-dark-forest/10 pt-10">
                                <div>
                                    <h4 className="text-dark-forest font-bold text-sm mb-3 uppercase tracking-wider">Artistic Vision</h4>
                                    <p className="text-xs text-dark-forest/50 leading-relaxed">Every detail is curated to create a visually stunning experience.</p>
                                </div>
                                <div>
                                    <h4 className="text-dark-forest font-bold text-sm mb-3 uppercase tracking-wider">Heritage</h4>
                                    <p className="text-xs text-dark-forest/50 leading-relaxed">Decades of expertise in managing high-end destination events.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Impact Stats Section - Dark and Immersive */}
            <section className="relative py-24 bg-dark-forest overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C6A75E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="flex flex-col items-center text-center py-8 md:py-0"
                            >
                                <div className="mb-8 p-5 rounded-none border border-muted-gold/30 bg-muted-gold/5 backdrop-blur-sm">
                                    <stat.icon className="w-6 h-6 text-muted-gold" />
                                </div>
                                <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif text-cream mb-2 tracking-tighter leading-none">
                                    {stat.value}
                                </h3>
                                <p className="text-muted-gold uppercase tracking-[0.4em] text-[10px] font-bold">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values - Dense Grid */}
            <section className="py-32 px-6 bg-white relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-dark-forest/20 to-transparent" />
                
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-muted-gold text-xs font-bold uppercase tracking-[0.5em] block mb-6"
                        >
                            The Hevaniya Way
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-serif text-dark-forest leading-tight"
                        >
                            Core Values <br /> <span className="text-muted-gold italic">Defining Us</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {VALUES.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.7 }}
                                className="p-16 hover:bg-cream/20 transition-all duration-700 group relative"
                            >
                                <div className="absolute top-8 right-8 text-gray-100 font-serif text-6xl group-hover:text-muted-gold/10 transition-colors duration-700 select-none">
                                    0{index + 1}
                                </div>
                                <div className="w-16 h-16 rounded-none bg-dark-forest flex items-center justify-center mb-10 group-hover:bg-muted-gold transition-colors duration-500">
                                    <value.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-serif text-dark-forest mb-6">{value.title}</h3>
                                <p className="text-dark-forest/60 leading-relaxed font-light">
                                    {value.description}
                                </p>
                                <div className="mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="flex items-center gap-3 text-muted-gold font-bold text-[10px] uppercase tracking-widest">
                                        Learn More <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visionaries Section - Large Premium Cards */}
            <section className="py-32 px-6 bg-cream relative overflow-hidden">
                {/* Decorative Text background */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 text-dark-forest/[0.02] font-serif text-[20vw] leading-none whitespace-nowrap pointer-events-none select-none">
                    VISIONARIES • LEADERS • CURATORS
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                        <div className="max-w-2xl">
                            <span className="text-muted-gold text-xs font-bold uppercase tracking-[0.4em] block mb-4">Our People</span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-dark-forest leading-[1.1] tracking-tighter">The Minds <br /> Behind <span className="text-muted-gold italic">Hevaniya</span></h2>
                        </div>
                        <p className="text-dark-forest/70 max-w-sm mb-4 border-l-2 border-muted-gold/30 pl-8 text-lg font-light italic">
                            "A dedicated team of curators, planners, and visionaries working together to create magic in the most unexpected places."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        {TEAM.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="group relative"
                            >
                                <div className="relative aspect-[3/4] mb-10 overflow-hidden rounded-none shadow-2xl">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-forest/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                    
                                    <div className="absolute inset-0 flex flex-col justify-end p-10 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                        <p className="text-cream/70 text-sm leading-relaxed mb-6 font-light">
                                            {member.bio}
                                        </p>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-muted-gold hover:border-muted-gold transition-colors cursor-pointer">
                                                <Users size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl md:text-2xl font-serif text-dark-forest group-hover:text-muted-gold transition-colors duration-500">{member.name}</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="h-px w-6 bg-muted-gold/50" />
                                        <p className="text-muted-gold text-[10px] uppercase tracking-[0.3em] font-bold">{member.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Immersive CTA - No Gaps */}
            <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                <Image
                    src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop"
                    alt="Footer CTA"
                    fill
                    className="object-cover scale-105"
                />
                <div className="absolute inset-0 bg-dark-forest/90 backdrop-blur-sm" />
                
                {/* Decorative animated rings */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="w-[120vh] h-[120vh] border border-white/5 rounded-full"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[100vh] h-[100vh] border border-white/5 rounded-full"
                    />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-muted-gold text-xs font-bold uppercase tracking-[0.6em] block mb-10">Start Your Story</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-12 leading-[1.1] tracking-tighter">Ready to Create <br /> Your <span className="text-muted-gold italic underline decoration-1 underline-offset-8">Legacy?</span></h2>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "#B59650" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 bg-muted-gold text-white uppercase tracking-[0.3em] text-xs font-bold transition-all shadow-2xl rounded-none"
                            >
                                Enquire Now
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 border border-white/20 text-white uppercase tracking-[0.3em] text-xs font-bold transition-all backdrop-blur-md rounded-none"
                            >
                                View Portfolios
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
                
                {/* Bottom decorative bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-muted-gold to-transparent opacity-50" />
            </section>

            <Footer />
        </div>
    );
}
