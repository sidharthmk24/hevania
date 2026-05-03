"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import EnquiryModal from "./EnquiryModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceSectionProps {
    image1?: string;
    image2?: string;
    content?: {
        heading?: string;
        subheading?: string;
        description?: string;
        metrics?: { value: string; label: string }[];
        tags?: string;
    };
}

export default function ExperienceSection({ image1, image2, content }: ExperienceSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const panelRefs = useRef<HTMLElement[]>([]);

    const addPanel = (el: HTMLElement | null) => {
        if (el && !panelRefs.current.includes(el)) panelRefs.current.push(el);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 78%",
                },
            });

            tl.from(headerRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.9,
                ease: "power3.out",
            });

            tl.from(panelRefs.current, {
                opacity: 0,
                y: 22,
                stagger: 0.1,
                duration: 0.85,
                ease: "power3.out",
            }, "-=0.5");

            gsap.to(img1Ref.current, {
                y: 45,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.4,
                },
            });

            gsap.to(img2Ref.current, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.4,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-[#F7F5F0] py-24 md:py-36"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
            <div className="mx-auto  px-6 md:px-12 lg:px-20">

                {/* ── Centered header ─────────────────────────────── */}
                <div ref={headerRef} className="text-center mb-16 md:mb-20">
                    <div className="flex items-center justify-center gap-4 mb-7">
                        <span className="block w-8 h-px bg-[#2C3A2C]/30" />
                        <span
                            className="text-[0.58rem] tracking-[0.32em] uppercase text-[#2C3A2C]/45 font-medium"
                            style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                        >
                            {content?.heading || "Our Philosophy"}
                        </span>
                        <span className="block w-8 h-px bg-[#2C3A2C]/30" />
                    </div>
                    <h2
                        className="font-light tracking-[-0.03em] leading-[1.02] text-[#1A2A1A] whitespace-pre-line"
                        style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
                    >
                        {content?.subheading ? (
                            <span dangerouslySetInnerHTML={{ __html: content.subheading.replace(/\n/g, '<br/>') }} />
                        ) : (
                            <>
                                Where Exceptional Experiences <br /> Takes Shape

                            </>
                        )}
                    </h2>
                </div>

                {/* ── Main mosaic grid ─────────────────────────────── */}
                <div
                    className="grid gap-0.5"
                    style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto" }}
                >
                    {/* A — Primary image, spans both rows */}
                    <div
                        ref={addPanel}
                        className="relative overflow-hidden"
                        style={{ gridColumn: "1", gridRow: "1 / 3" }}
                    >
                        <div
                            ref={img1Ref}
                            className="relative w-full h-full"
                            style={{ aspectRatio: "3/4" }}
                        >
                            <Image
                                src={image1 || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"}
                                alt="Luxury interior"
                                fill
                                className="object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A0A]/42 via-transparent to-transparent" />
                          
                        </div>
                    </div>

                    {/* B — Text + stats panel */}
                    <div
                        ref={addPanel}
                        className="bg-[#EDEAE3] flex flex-col justify-between"
                        style={{ gridColumn: "2", gridRow: "1", padding: "48px 40px" }}
                    >
                        <div className="space-y-5">
                            <p
                                className="text-[1.03rem] leading-[1.88] font-light tracking-[0.01em] whitespace-pre-line"
                                style={{ color: "rgba(44,58,44,0.68)" }}
                            >
                                {content?.description || (
                                    <>
                                        They unfold seamlessly — and take your breath away.
                                        <br/><br/>
                                        Curated with obsessive attention to detail and a reverence for enduring craft.
                                    </>
                                )}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center items-stretch mt-10 border border-[#2C3A2C]/12 bg-[#2C3A2C]/12 gap-px overflow-hidden">
                            {(content?.metrics && content.metrics.length > 0 ? content.metrics : [
                                { value: "200+", label: "Curated Spaces" },
                                { value: "12", label: "Countries" }
                            ]).map((metric, i) => (
                                <div 
                                    key={i} 
                                    className="px-4 lg:px-7 py-5 flex-1 min-w-[40%] md:min-w-[20%] md:max-w-[25%] flex flex-col justify-center items-center text-center bg-[#EDEAE3]"
                                >
                                    <p
                                        className="text-[1.95rem] font-light leading-none tracking-[-0.03em]"
                                        style={{ color: "#1A2A1A" }}
                                    >
                                        {metric.value.replace(/[^0-9]/g, '')}
                                        <span className="text-[1rem]" style={{ color: "rgba(44,58,44,0.35)" }}>
                                            {metric.value.replace(/[0-9]/g, '')}
                                        </span>
                                    </p>
                                    <p
                                        className="text-[0.58rem] tracking-[0.26em] uppercase mt-2 font-medium"
                                        style={{
                                            color: "rgba(44,58,44,0.38)",
                                            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                                        }}
                                    >
                                        {metric.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* C — Secondary image */}
                    <div
                        ref={addPanel}
                        className="relative overflow-hidden"
                        style={{ gridColumn: "3", gridRow: "1" }}
                    >
                        <div
                            ref={img2Ref}
                            className="relative w-full h-full"
                            style={{ minHeight: "260px" }}
                        >
                            <Image
                                src={image2 || "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"}
                                alt="Luxury retreat"
                                fill
                                className="object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A0A]/42 via-transparent to-transparent" />
                           
                        </div>
                    </div>

                    {/* D — CTA panel */}
                    <div
                        ref={addPanel}
                        className="bg-[#E8E4DC] flex items-end cursor-pointer group hover:bg-[#E2DECA] transition-colors duration-500"
                        style={{ gridColumn: "2", gridRow: "2", padding: "36px 40px" }}
                        onClick={() => setIsModalOpen(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsModalOpen(true); } }}
                    >
                        <div className="inline-flex items-center gap-4 w-fit focus:outline-none">
                            <span
                                className="text-[0.6rem] tracking-[0.32em] uppercase font-medium transition-colors duration-300 group-hover:text-[rgba(44,58,44,0.85)]"
                                style={{
                                    color: "rgba(44,58,44,0.45)",
                                    fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                                }}
                            >
                                Enquire Now
                            </span>
                            <span className="block h-px w-7 bg-[#2C3A2C]/28 transition-all duration-300 group-hover:w-14 group-hover:bg-[#2C3A2C]/55" />
                        </div>
                    </div>

                    {/* E — Tags panel */}
                    <div
                        ref={addPanel}
                        className="bg-[#EDEAE3] flex items-end"
                        style={{ gridColumn: "3", gridRow: "2", padding: "36px 32px" }}
                    >
                        <div className="flex flex-wrap gap-1.5">
                            {(content?.tags ? content.tags.split(',').map(t => t.trim()) : ["Interior Design", "Architecture", "Bespoke Stays", "Luxury Living", "Curated Art"]).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[0.58rem] tracking-[0.2em] uppercase font-medium border px-2.5 py-1.5 cursor-default transition-all duration-200 hover:border-[#2C3A2C]/28 hover:text-[#2C3A2C]/62"
                                    style={{
                                        color: "rgba(44,58,44,0.38)",
                                        borderColor: "rgba(44,58,44,0.12)",
                                        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                propertyName="Experience"
            />
        </section>
    );
}