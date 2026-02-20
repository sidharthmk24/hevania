"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const BLOG_POSTS = [
    {
        slug: "wedding-trends-2025",
        title: "Wedding Trends to Watch in 2025",
        excerpt: "From sustainable decor to intimate outdoor ceremonies, discover what's defining the future of nuptials.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
        date: "Dec 10, 2024"
    },
    {
        slug: "corporate-retreat-venues",
        title: "Why Nature Retreats Boost Corporate Morale",
        excerpt: "Escape the boardroom. How open-air venues and lakeside settings foster creativity and team bonding.",
        image: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2070&auto=format&fit=crop",
        date: "Nov 05, 2024"
    },
    {
        slug: "perfect-party-planning",
        title: "The Art of Hosting the Perfect Garden Party",
        excerpt: "Tips on lighting, layout, and logistics for creating a seamless outdoor event experience.",
        image: "https://images.unsplash.com/photo-1519225468316-7484aaaf0278?q=80&w=1974&auto=format&fit=crop",
        date: "Oct 20, 2024"
    }
];

export default function BlogPreview() {
    return (
        <section className="py-24 bg-cream text-dark-forest">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="block text-sm uppercase tracking-widest text-muted-gold mb-2 font-medium">Journal</span>
                        <h2 className="text-4xl md:text-5xl font-serif">Latest Insights</h2>
                    </div>
                    <Link href="/blog" className="hidden md:flex items-center gap-2 hover:text-muted-gold transition-colors font-medium">
                        View All Articles <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group cursor-pointer"
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-lg bg-gray-200">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 bg-muted-gold rounded-full" />
                                    <span>Events</span>
                                </div>
                                <h3 className="text-xl font-serif leading-snug mb-3 group-hover:text-muted-gold transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm font-light leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-dark-forest font-medium border-b border-gray-300 pb-1">
                        View All Articles <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
