"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Using the same data for demo, could be moved to a shared constant or fetched
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
    },
    {
        slug: "eco-friendly-events",
        title: "Planning an Eco-Friendly Celebration",
        excerpt: "Zero-waste catering, digital invites, and sustainable venues. How to celebrate responsibly without compromising on style.",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
        date: "Sept 15, 2024"
    }
];

export default function BlogPage() {
    return (
        <div className="bg-cream min-h-screen text-dark-forest pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">Event Journal</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto font-light">
                        Insights, trends, and inspiration from the world of luxury event planning.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
                    {BLOG_POSTS.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group"
                        >
                            <Link href={`/blog/${post.slug}`} className="block">
                                <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-xl">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 bg-muted-gold rounded-full" />
                                    <span>Article</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-serif mb-3 group-hover:text-muted-gold transition-colors">{post.title}</h2>
                                <p className="text-gray-600 font-light leading-relaxed">{post.excerpt}</p>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}
