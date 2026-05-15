import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabaseServer } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const { data: post, error } = await supabaseServer
        .from('blogs')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <div className="relative bg-cream min-h-screen overflow-hidden">
            {/* Global Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            
            <Navbar theme="dark" />

            {/* Post Hero */}
            <section className="relative h-[60vh] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={post.image_url || "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80"}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cream via-black/20 to-black/40" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full text-white">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 hover:text-white transition-colors mb-8">
                        <ArrowLeft size={14} /> Back to Journal
                    </Link>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-muted-gold text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                            <Calendar size={12} /> {new Date(post.date).toLocaleDateString()}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8">
                        {post.title}
                    </h1>
                </div>
            </section>

            {/* Post Content */}
            <section className="py-20 px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Sidebar Info */}
                        <div className="lg:col-span-3 space-y-12">
                            <div className="space-y-4 pt-4 border-t border-dark-forest/10">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-dark-forest/40 font-bold">Author</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-serif">{post.author}</span>
                                </div>
                            </div>
                        </div>

                        {/* Article Text */}
                        <div className="lg:col-span-9">
                            <div 
                                className="prose prose-lg max-w-none prose-headings:font-serif prose-p:text-dark-forest/70 prose-p:leading-loose"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                            
                            <div className="mt-20 pt-10 border-t border-dark-forest/10 flex justify-between items-center">
                                <Link href="/blog" className="text-[10px] uppercase tracking-widest font-bold text-muted-gold hover:text-dark-forest transition-colors">
                                    Browse All Stories
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
