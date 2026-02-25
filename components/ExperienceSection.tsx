"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(img1Ref.current, {
                y: 40,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });

            gsap.to(img2Ref.current, {
                y: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="pt-24 pb-12 md:pb-0 md:pt-32 w-full overflow-hidden ">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                <h2 className="text-4xl md:text-5xl lg:text-7xl tracking-wide text-[#2F3E2F]/90 text-left mb-16 lg:mb-24 font-normal md:max-w-[80%] leading-[1.1]">
                    <span className="font-thin">Where Exceptional</span> Experiences Take Shape
                </h2>

                <div className="flex flex-col lg:flex-row justify-between relative mt-16 lg:mt-32">

                    {/* Left Text Content */}
                    <div className="lg:w-[40%] flex flex-col justify-start z-20 xl:pl-10 mb-16 lg:mb-0 relative lg:top-12">
                        <div className="text-[#2F3E2F] space-y-8 text-lg md:text-xl lg:text-[1.35rem] leading-relaxed tracking-wide font-light max-w-md">
                            <p>
                                They unfold seamlessly<br />
                                & take your breath away.
                            </p>
                            <p>
                                But the truly exceptional moments<br />
                                are immersive experiences - unlike any other.
                            </p>
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="lg:w-[60%] relative min-h-[100vh] w-full">
                        {/* Back Image (Top Right) */}
                        <div ref={img1Ref} className="absolute top-[-10%] sm:top-[-15%] md:top-[-10%] right-0 w-[75%] sm:w-[70%] h-[70%] sm:h-[65%] z-0 select-none">
                            <Image
                                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
                                alt="Luxury bedroom interior"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 75vw, 45vw"
                                priority
                            />
                        </div>

                        {/* Front Image (Bottom Left, Overlapping) */}
                        <div ref={img2Ref} className="absolute bottom-[5%] sm:bottom-[15%] left-0 lg:left-[0%] w-[80%] sm:w-[75%] lg:w-[65%] h-[60%] sm:h-[45%] z-10 shadow-xl select-none">
                            <Image
                                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
                                alt="Modern luxury bedroom interior"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 80vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}