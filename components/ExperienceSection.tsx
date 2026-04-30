"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceSectionProps {
    image1?: string;
    image2?: string;
}

export default function ExperienceSection({ image1, image2 }: ExperienceSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);
    const revealRefs = useRef<HTMLElement[]>([]);

    const addReveal = (el: HTMLElement | null) => {
        if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(revealRefs.current, {
                opacity: 0,
                y: 24,
                stagger: 0.1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 78%",
                },
            });

            gsap.to(img1Ref.current, {
                y: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            gsap.to(img2Ref.current, {
                y: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#F5F3EE] py-20 md:py-28">
            <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">

                {/* ── Top header row ─────────────────────────────── */}
                <div className="grid grid-cols-12 gap-4 mb-14 md:mb-20 border-t border-[#2F3E2F]/12 pt-8">

                    <div
                        ref={addReveal}
                        className="col-span-12 md:col-span-3 flex items-center gap-2.5 self-start"
                    >
                        <span className="h-px w-6 bg-[#2F3E2F]/35 shrink-0" />
                        <span className="text-[0.65rem] tracking-[0.28em] uppercase text-[#2F3E2F]/45 font-medium">
                            Our Philosophy
                        </span>
                    </div>

                    <h2
                        ref={addReveal}
                        className="col-span-12 md:col-span-6 text-[2.1rem] md:text-[2.9rem] lg:text-[3.4rem] font-light tracking-[-0.02em] text-[#1C2B1C] leading-[1.06]"
                    >
                        Where Exceptional<br />
                        Experiences<br />
                        <span className="text-[#2F3E2F]/40">Take Shape</span>
                    </h2>

                    <div
                        ref={addReveal}
                        className="col-span-12 md:col-span-3 flex items-start justify-end"
                    >
                        <span
                            className="text-[4.5rem] font-thin leading-none text-[#2F3E2F]/[0.09] tracking-tighter select-none"
                            aria-hidden="true"
                        >
                            01
                        </span>
                    </div>
                </div>

                {/* ── Main content grid ──────────────────────────── */}
                <div className="grid grid-cols-12 gap-4 md:gap-6 items-start">

                    {/* Col A — Tall primary image */}
                    <div ref={img1Ref} className="col-span-12 md:col-span-5 relative">
                        <div className="relative w-full aspect-[3/4] overflow-hidden">
                            <Image
                                src={image1 || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"}
                                alt="Luxury bedroom interior"
                                fill
                                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                                sizes="(max-width: 768px) 100vw, 40vw"
                                priority
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/40 to-transparent">
                                <p className="text-[0.62rem] tracking-[0.22em] uppercase text-white/70 font-medium">
                                    Living Spaces
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Col B — Text content */}
                    <div
                        ref={addReveal}
                        className="col-span-12 md:col-span-4 flex flex-col gap-8 pt-0 md:pt-3 md:px-4 lg:px-6"
                    >
                        <div className="space-y-5">
                            <p className="text-[1rem] md:text-[1.05rem] leading-[1.8] text-[#2F3E2F]/70 font-light tracking-wide">
                                They unfold seamlessly — & take your breath away.
                            </p>
                            <div className="h-px w-8 bg-[#2F3E2F]/18" />
                            <p className="text-[1rem] md:text-[1.05rem] leading-[1.8] text-[#2F3E2F]/50 font-light tracking-wide">
                                The truly exceptional moments are immersive experiences — unlike any other.
                            </p>
                        </div>

                        {/* Stat strip */}
                        <div className="flex items-center gap-4 border border-[#2F3E2F]/10 px-5 py-4 w-fit">
                            <div>
                                <p className="text-[1.6rem] font-light text-[#1C2B1C] leading-none tracking-tight">200+</p>
                                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#2F3E2F]/45 mt-1 font-medium">
                                    Curated Spaces
                                </p>
                            </div>
                            <div className="w-px h-10 bg-[#2F3E2F]/12 mx-2" />
                            <div>
                                <p className="text-[1.6rem] font-light text-[#1C2B1C] leading-none tracking-tight">12</p>
                                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#2F3E2F]/45 mt-1 font-medium">
                                    Countries
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <a href="#" className="group inline-flex items-center gap-3 w-fit mt-2">
                            <span className="text-[0.68rem] tracking-[0.24em] uppercase text-[#2F3E2F]/60 font-medium transition-colors duration-300 group-hover:text-[#2F3E2F]">
                                Explore More
                            </span>
                            <span className="block h-px w-7 bg-[#2F3E2F]/35 transition-all duration-300 group-hover:w-12 group-hover:bg-[#2F3E2F]" />
                        </a>
                    </div>

                    {/* Col C — Secondary image */}
                    <div ref={img2Ref} className="col-span-12 md:col-span-3 relative mt-0 md:mt-8">
                        <div className="relative w-full aspect-[3/4] overflow-hidden">
                            <Image
                                src={image2 || "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"}
                                alt="Modern luxury living space"
                                fill
                                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                                sizes="(max-width: 768px) 100vw, 22vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
                                <p className="text-[0.62rem] tracking-[0.22em] uppercase text-white/70 font-medium">
                                    Retreats          
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom tag strip — spans text + secondary image cols */}
                    <div
                        ref={addReveal}
                        className="col-span-12 md:col-span-7 md:col-start-6 flex flex-wrap gap-2.5 pt-4 md:pt-6 border-t border-[#2F3E2F]/10"
                    >
                        {["Interior Design", "Architecture", "Bespoke Stays", "Luxury Living", "Curated Art"].map((tag) => (
                            <span
                                key={tag}
                                className="text-[0.63rem] tracking-[0.18em] uppercase text-[#2F3E2F]/45 font-medium border border-[#2F3E2F]/12 px-3 py-1.5 hover:border-[#2F3E2F]/35 hover:text-[#2F3E2F]/65 transition-colors duration-200 cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}