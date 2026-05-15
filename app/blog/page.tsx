"use client";

import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Calendar, User, Tag, ChevronRight, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";
import { supabaseServer } from "@/lib/supabaseServer";

export default function BlogPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const { data, error } = await supabaseServer
                    .from('blogs')
                    .select('*')
                    .order('date', { ascending: false });
                
                if (!error && data) {
                    setBlogs(data);
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    const featuredPost = blogs.length > 0 ? blogs[0] : null;
    const otherPosts = blogs.length > 1 ? blogs.slice(1) : [];

    return (
        <div ref={containerRef} className="relative bg-cream overflow-hidden">
            {/* Global Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            
            <Navbar theme="dark" />

            {/* Immersive Hero Section */}
            <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
                <motion.div 
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1505373633572-2342c3004d3e?q=80&w=2070&auto=format&fit=crop"
                        alt="Event Journal"
                        fill
                        className="object-cover"
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
                            Our Journal
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream leading-tight tracking-wider font-normal mb-6">
                            Events & <span className="italic text-muted-gold">Inspiration</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-cream/80 text-lg font-light tracking-wide leading-relaxed">
                            Insights, trends, and inspiration from the world of luxury event planning and destination celebrations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {loading ? (
                <div className="flex justify-center py-40">
                    <Loader2 className="h-12 w-12 animate-spin text-muted-gold" />
                </div>
            ) : blogs.length === 0 ? (
                <div className="py-40 text-center">
                    <p className="text-dark-forest/40 italic">No articles found in the journal yet.</p>
                </div>
            ) : (
                <>
                    {/* Featured Post Section */}
                    {featuredPost && (
                        <section className="relative py-24 md:py-32 px-6 overflow-hidden">
                            <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="lg:col-span-7 relative group"
                                    >
                                        <Link href={`/blog/${featuredPost.slug}`}>
                                            <div className="relative aspect-[16/10] overflow-hidden rounded-none shadow-2xl">
                                                <Image
                                                    src={featuredPost.image_url || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80"}
                                                    alt={featuredPost.title}
                                                    fill
                                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-dark-forest/20 group-hover:bg-transparent transition-colors duration-500" />
                                            </div>
                                        </Link>
                                        <div className="absolute top-8 left-8 bg-muted-gold text-white px-4 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
                                            Latest Feature
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className="lg:col-span-5 space-y-8"
                                    >
                                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-muted-gold font-bold">
                                            <span className="flex items-center gap-2"><Calendar size={12} /> {new Date(featuredPost.date).toLocaleDateString()}</span>
                                            <span className="w-1 h-1 bg-muted-gold/30 rounded-full" />
                                            <span className="flex items-center gap-2"><Tag size={12} /> {featuredPost.category}</span>
                                        </div>
                                        
                                        <h2 className="text-3xl md:text-5xl font-serif text-dark-forest leading-tight group-hover:text-muted-gold transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        
                                        <p className="text-lg text-dark-forest/70 leading-relaxed font-light italic">
                                            "{featuredPost.excerpt}"
                                        </p>
                                        
                                        <div className="flex items-center gap-4 pt-4 border-t border-dark-forest/10">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-dark-forest/40">Written By</p>
                                                <p className="text-sm font-serif text-dark-forest">{featuredPost.author}</p>
                                            </div>
                                        </div>

                                        <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center gap-4 group/btn pt-6">
                                            <span className="text-xs uppercase tracking-[0.3em] font-bold text-dark-forest group-hover/btn:text-muted-gold transition-colors">Read Full Article</span>
                                            <div className="w-12 h-px bg-dark-forest/20 group-hover/btn:w-16 group-hover/btn:bg-muted-gold transition-all duration-500" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Articles Grid */}
                    {otherPosts.length > 0 && (
                        <section className="py-24 md:py-32 px-6 bg-white relative">
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dark-forest/10 to-transparent" />
                            
                            <div className="max-w-7xl mx-auto">
                                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                                    <div>
                                        <span className="text-muted-gold text-xs font-bold uppercase tracking-[0.4em] block mb-4">Past Editions</span>
                                        <h2 className="text-3xl md:text-5xl font-serif text-dark-forest leading-none">Journal <span className="text-muted-gold italic">Archive</span></h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                                    {otherPosts.map((post, index) => (
                                        <motion.article
                                            key={post.slug}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 0.6 }}
                                            className="group"
                                        >
                                            <Link href={`/blog/${post.slug}`}>
                                                <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-none shadow-lg">
                                                    <Image
                                                        src={post.image_url || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80"}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-dark-forest/10 group-hover:bg-transparent transition-colors duration-500" />
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-muted-gold text-[10px] font-bold uppercase tracking-[0.2em]">{post.category}</span>
                                                        <div className="w-1 h-1 bg-dark-forest/10 rounded-full" />
                                                        <span className="text-dark-forest/40 text-[10px] uppercase tracking-widest">{new Date(post.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <h3 className="text-xl md:text-2xl font-serif text-dark-forest group-hover:text-muted-gold transition-colors duration-300 leading-tight">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-dark-forest/60 text-sm leading-relaxed font-light line-clamp-3">
                                                        {post.excerpt}
                                                    </p>
                                                </div>
                                            </Link>
                                        </motion.article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}

            {/* Newsletter Section */}
            <section className="relative py-32 px-6 bg-dark-forest overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-muted-gold text-xs font-bold uppercase tracking-[0.5em] block mb-8">Stay Inspired</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-cream mb-10 leading-tight">Join Our Inner Circle for <br /> <span className="text-muted-gold italic">Exclusive Event Insights</span></h2>
                    <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                        <input type="email" placeholder="Your Email Address" className="flex-grow bg-white/5 border border-white/10 px-8 py-5 text-cream placeholder:text-white/20 focus:outline-none rounded-none" />
                        <button className="px-10 py-5 bg-muted-gold text-white uppercase tracking-widest text-xs font-bold hover:bg-muted-gold/90 transition-all">Subscribe</button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
