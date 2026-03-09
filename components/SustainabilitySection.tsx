"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

const cardsData = [
    {
        image: "/images/heroImages/carousel1.jpeg",
        title: "Water Conservation",
        description: "Implementing advanced rainwater harvesting and greywater recycling systems across all our properties."
    },
    {
        image: "/images/heroImages/carousel2.jpg",
        title: "Lush Greenery",
        description: "Our landscapes integrate native plants and trees, providing natural cooling and improving urban air quality."
    },
    {
        image: "/images/heroImages/carousel3.avif",
        title: "Carbon Reduction",
        description: "Striving for carbon neutrality through sustainable materials, smart energy systems, and renewable energy adoption."
    }
];

const SustainabilitySection = () => {
    // Track which mobile swiper card is currently expanded
    const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

    const toggleCard = (index: number) => {
        if (expandedCardIndex === index) {
            setExpandedCardIndex(null); // Collapse if already open
        } else {
            setExpandedCardIndex(index); // Expand this one
        }
    };

    return (
        <section className="bg-none mx-auto -16 md:py-24 overflow-hidden">
            {/* Desktop Layout - keep existing grid but hidden on mobile */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 px-6 md:px-12 lg:px-20">
                {/* Left Column */}
                <div className="flex flex-col justify-start h-full min-h-[500px]">
                    <div className="max-w-xl w-full pt-2">
                        <h2 className="text-3xl md:text-5xl lg:text-[52px] text-[#4B3D37] mb-6 font-normal leading-[1.1]">
                            Our Commitment to Sustainability
                        </h2>
                        <p className="text-[#8D827C] text-base md:text-lg leading-relaxed font-light mt-6 sm:mt-8">
                            Our commitment to sustainability drives us to create eco-friendly, energy-efficient spaces that benefit both our clients and the planet.
                        </p>
                    </div>

                    <div className="relative w-full h-[70vh] md:h-[90vh] lg:h-[100vh] rounded-[24px] overflow-hidden mt-12 md:mt-20 group">
                        <Image
                            src={cardsData[0].image}
                            alt={cardsData[0].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                        />

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            {/* Gradient overlay for text readability appearing on hover */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-0"></div>

                            {/* Text state visible on hover */}
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white z-10 flex flex-col justify-end">
                                <h3 className="text-2xl md:text-3xl font-medium mb-2 md:mb-3 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">{cardsData[0].title}</h3>
                                <p className="text-white/80 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">{cardsData[0].description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
                    <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[70vh] rounded-[24px] overflow-hidden group">
                        <Image
                            src={cardsData[1].image}
                            alt={cardsData[1].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                        />

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            {/* Gradient overlay for text readability appearing on hover */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-0"></div>

                            {/* Text state visible on hover */}
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white z-10 flex flex-col justify-end">
                                <h3 className="text-2xl md:text-3xl font-medium mb-2 md:mb-3 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">{cardsData[1].title}</h3>
                                <p className="text-white/80 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">{cardsData[1].description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-[24px] overflow-hidden group">
                        <Image
                            src={cardsData[2].image}
                            alt={cardsData[2].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                        />

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                            {/* Gradient overlay for text readability appearing on hover */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-0"></div>

                            {/* Text state visible on hover */}
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white z-10 flex flex-col justify-end">
                                <h3 className="text-2xl md:text-3xl font-medium mb-2 md:mb-3 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">{cardsData[2].title}</h3>
                                <p className="text-white/80 translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">{cardsData[2].description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout - Swiper */}
            <div className="md:hidden block">
                <div className="px-6 mb-10">
                    <h2 className="text-3xl text-[#4B3D37] mb-4 font-normal leading-[1.3]">
                        Our Commitment to Sustainability
                    </h2>
                    <p className="text-[#8D827C] text-sm leading-relaxed font-light">
                        Our commitment to sustainability drives us to create eco-friendly, energy-efficient spaces that benefit both our clients and the planet.
                    </p>
                </div>

                <div className="relative w-full overflow-visible [&_.swiper]:overflow-visible [&_.swiper-slide]:transition-all [&_.swiper-slide]:duration-400 [&_.swiper-slide]:ease-out [&_.swiper-slide]:scale-[0.85] [&_.swiper-slide]:opacity-50 [&_.swiper-slide-active]:scale-100 [&_.swiper-slide-active]:opacity-100 [&_.swiper-slide]:rounded-[20px] [&_.swiper-slide]:overflow-hidden [&_.swiper-slide]:h-auto">
                    <Swiper
                        slidesPerView={1.3}
                        centeredSlides={true}
                        spaceBetween={5}
                        loop={true}
                        className="w-full"
                        style={{ padding: '20px 0' }}
                    >
                        {cardsData.map((card, idx) => (
                            <SwiperSlide
                                key={idx}
                                className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-neutral-200 cursor-pointer"
                                onClick={() => toggleCard(idx)}
                            >
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                {/* Permanent bottom overlay for text readability */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-0"></div>

                                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10 h-full pb-8 pointer-events-none">
                                    <h3 className="text-xl sm:text-[22px] font-medium leading-snug mb-2 drop-shadow-md">
                                        {card.title}
                                    </h3>
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCardIndex === idx ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <p className="text-white/80 text-sm leading-relaxed drop-shadow-md">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default SustainabilitySection;
