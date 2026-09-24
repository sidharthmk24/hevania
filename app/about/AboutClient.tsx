"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Quote, Target, Heart, Award, Star, Users, Leaf, Calendar, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
    Award,
    Calendar,
    Star,
    Heart,
    Users,
    Target,
    Leaf,
};

export type AboutClientProps = {
    hero: {
        subtitle: string;
        heading: string;
        description: string;
        side_text: string;
        image_url: string;
    };
    philosophy: {
        tag: string;
        heading: string;
        quote: string;
        mantra: string;
        paragraph_1: string;
        paragraph_2: string;
        feature_1_title: string;
        feature_1_desc: string;
        feature_2_title: string;
        feature_2_desc: string;
        image_url: string;
    };
    stats: Array<{
        value: string;
        label: string;
        icon_name: string;
    }>;
    values: Array<{
        title: string;
        description: string;
        icon_name: string;
    }>;
    team: Array<{
        name: string;
        role: string;
        bio: string;
        image_url: string;
    }>;
    cta: {
        tag: string;
        heading: string;
        button_primary: string;
        button_secondary: string;
        image_url: string;
    };
};

export default function AboutClient({
    hero,
    philosophy,
    stats,
    values,
    team,
    cta,
}: AboutClientProps) {
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

            {/* ───── Hero Section ───── */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div 
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={hero.image_url}
                        alt={hero.heading}
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
                            {hero.subtitle}
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream leading-tight tracking-wider font-normal mb-8">
                            {hero.heading}
                        </h1>
                        <p className="text-cream/90 text-sm md:text-xl font-light mb-8 max-w-3xl mx-auto leading-relaxed">
                            {hero.description}
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Side Text */}
                {hero.side_text && (
                    <div className="absolute left-10 bottom-20 hidden lg:block origin-left -rotate-90">
                        <span className="text-white/20 text-[10px] uppercase tracking-[0.5em] whitespace-nowrap">
                            {hero.side_text}
                        </span>
                    </div>
                )}

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

            {/* ───── Philosophy Section ───── */}
            <section className="relative py-24 md:py-40 px-6 overflow-hidden bg-cream">
                {/* Background Decorative Glow */}
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
                                    src={philosophy.image_url}
                                    alt="Philosophy"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-dark-forest/10 mix-blend-overlay" />
                            </div>
                            {/* Floating decorative card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="absolute -bottom-12 -left-6 md:left-12 bg-dark-forest p-8 md:p-14 text-cream shadow-2xl max-w-md"
                            >
                                <Quote className="text-muted-gold w-12 h-12 mb-6 opacity-80" />
                                <p className="text-cream/90 font-serif italic text-xl md:text-2xl leading-snug">
                                    "{philosophy.quote}"
                                </p>
                                <div className="mt-8 flex items-center gap-4">
                                    <div className="h-px w-8 bg-muted-gold" />
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-gold">
                                        {philosophy.mantra}
                                    </span>
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
                                <span className="text-muted-gold text-xs font-bold uppercase tracking-[0.4em] block">
                                    {philosophy.tag}
                                </span>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-dark-forest leading-[1.1] tracking-tight whitespace-pre-line">
                                    {philosophy.heading}
                                </h2>
                            </div>
                            
                            <div className="space-y-6">
                                <p className="text-xl text-dark-forest/80 leading-relaxed font-light">
                                    {philosophy.paragraph_1}
                                </p>
                                <p className="text-dark-forest/60 leading-relaxed text-sm">
                                    {philosophy.paragraph_2}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-10 border-t border-dark-forest/10 pt-10">
                                <div>
                                    <h4 className="text-dark-forest font-bold text-sm mb-3 uppercase tracking-wider">
                                        {philosophy.feature_1_title}
                                    </h4>
                                    <p className="text-xs text-dark-forest/50 leading-relaxed">
                                        {philosophy.feature_1_desc}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-dark-forest font-bold text-sm mb-3 uppercase tracking-wider">
                                        {philosophy.feature_2_title}
                                    </h4>
                                    <p className="text-xs text-dark-forest/50 leading-relaxed">
                                        {philosophy.feature_2_desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ───── Stats Section ───── */}
            {stats && stats.length > 0 && (
                <section className="relative py-24 bg-dark-forest overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C6A75E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                            {stats.map((stat, index) => {
                                const IconComponent = ICON_MAP[stat.icon_name] || Award;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2, duration: 0.6 }}
                                        className="flex flex-col items-center text-center py-8 md:py-0"
                                    >
                                        <div className="mb-8 p-5 rounded-none border border-muted-gold/30 bg-muted-gold/5 backdrop-blur-sm">
                                            <IconComponent className="w-6 h-6 text-muted-gold" />
                                        </div>
                                        <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif text-cream mb-2 tracking-tighter leading-none">
                                            {stat.value}
                                        </h3>
                                        <p className="text-muted-gold uppercase tracking-[0.4em] text-[10px] font-bold">
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ───── Values Section ───── */}
            {values && values.length > 0 && (
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
                            {values.map((value, index) => {
                                const IconComponent = ICON_MAP[value.icon_name] || Target;
                                return (
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
                                            <IconComponent className="w-6 h-6 text-white" />
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
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ───── Team Section ───── */}
            {team && team.length > 0 && (
                <section className="py-32 px-6 bg-cream relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 text-dark-forest/[0.02] font-serif text-[20vw] leading-none whitespace-nowrap pointer-events-none select-none">
                        VISIONARIES • LEADERS • CURATORS
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                            <div className="max-w-2xl">
                                <span className="text-muted-gold text-xs font-bold uppercase tracking-[0.4em] block mb-4">Our People</span>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-dark-forest leading-[1.1] tracking-tighter">
                                    The Minds <br /> Behind <span className="text-muted-gold italic">Hevaniya</span>
                                </h2>
                            </div>
                            <p className="text-dark-forest/70 max-w-sm mb-4 border-l-2 border-muted-gold/30 pl-8 text-lg font-light italic">
                                "A dedicated team of curators, planners, and visionaries working together to create magic in the most unexpected places."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                            {team.map((member, index) => (
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
                                            src={member.image_url}
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
                                        <h3 className="text-xl md:text-2xl font-serif text-dark-forest group-hover:text-muted-gold transition-colors duration-500">
                                            {member.name}
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <div className="h-px w-6 bg-muted-gold/50" />
                                            <p className="text-muted-gold text-[10px] uppercase tracking-[0.3em] font-bold">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ───── CTA Section ───── */}
            <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                <Image
                    src={cta.image_url}
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
                        <span className="text-muted-gold text-xs font-bold uppercase tracking-[0.6em] block mb-10">
                            {cta.tag}
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-12 leading-[1.1] tracking-tighter">
                            {cta.heading}
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <motion.a
                                href="/contact"
                                whileHover={{ scale: 1.05, backgroundColor: "#B59650" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 bg-muted-gold text-white uppercase tracking-[0.3em] text-xs font-bold transition-all shadow-2xl rounded-none inline-block text-center"
                            >
                                {cta.button_primary}
                            </motion.a>
                            <motion.a
                                href="/#gallery"
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-6 border border-white/20 text-white uppercase tracking-[0.3em] text-xs font-bold transition-all backdrop-blur-md rounded-none inline-block text-center"
                            >
                                {cta.button_secondary}
                            </motion.a>
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
