"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowUpRight } from "lucide-react";
import { Icons } from "./FeaturesIcons";

// import { Icons } from "./FeatureIcons";

export type FeatureItem = {
    icon: keyof typeof Icons;
    label: string;
};

interface FeaturesSectionProps {
    features: FeatureItem[];
    heading: React.ReactNode;
    variant?: "center" | "left";
    completed?: boolean;
    galleryImages?: string[];
}
export default function FeaturesSection({ features, heading, variant = "center", completed = true, galleryImages = [] }: FeaturesSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-20 lg:pt-32 font-host">
            <div className=" mx-auto px-6 lg:px-20 xl:px-54 ">
                {/* Header */}
                {variant === "center" ? (
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#425042] font-normal md:text-center mb-16 lg:mb-28 tracking-tight leading-tight">
                        {heading}
                    </h2>
                ) : (
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 lg:mb-28">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#425042] font-normal tracking-tight leading-tight">
                            {heading}
                        </h2>
                        <button className="flex items-center gap-2 px-4 py-5 border border-[#0097DC] text-[#0097DC] hover:bg-[#0097DC]/10 transition-colors uppercase tracking-widest text-sm font-medium shrink-0">
                            <ArrowUpRight className="w-5 h-5 hover:rotate-45 transition-all duration-300" />
                            Explore Now
                        </button>
                    </div>
                )}

                {/* Features Grid */}
                <div className="grid grid-cols-1  md:grid-cols-4  gap-x-6 gap-y-10 lg:gap-x-12 xl:gap-x-20 lg:gap-y-16 mb-12 lg:mb-28">
                    {features.map((item, index) => {
                        const Icon = Icons[item.icon];
                        // Show all items on medium/large screens (md+).
                        // On mobile, show only the first 3 items unless expanded.
                        const isHiddenOnMobile = !isExpanded && index > 2;

                        return (
                            <div
                                key={index}
                                className={`group flex flex-row items-center gap-4 lg:gap-5 transition-all duration-300 ${isHiddenOnMobile ? "hidden md:flex" : "flex"
                                    }`}
                            >
                                {/* Icon Wrapper */}
                                <div className="w-10 h-10 flex items-center justify-center text-[#425042] group-hover:text-[#425042]/30  transition-all duration-300 transform group-hover:scale-110 shrink-0">
                                    <Icon />
                                </div>
                                {/* Text Label */}
                                <span className="text-[#425042] text-[15px] lg:text-[16px] leading-snug font-normal tracking-wide transition-colors duration-300 group-hover:text-[#425042]">
                                    {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Read More / Read Less Button (Mobile Only) */}
                <div className="flex justify-start md:hidden mb-20">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-[#425042] text-[15px] border-b border-[#425042] pb-0.5 hover:text-[#0097DC] hover:border-[#0097DC] transition-colors duration-300"
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </button>
                </div>


            </div>
        </section>
    );
}
