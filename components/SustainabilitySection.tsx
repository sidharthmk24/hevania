"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

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
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedCardIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedCardIndex]);

    return (
        <section className="bg-none mx-auto -16 md:py-12 overflow-hidden">
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

                    <div
                        className="relative w-full h-[70vh] md:h-[90vh] lg:h-[100vh] rounded-[24px] overflow-hidden mt-12 md:mt-20 group cursor-pointer"
                        onClick={() => setSelectedCardIndex(0)}
                    >
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
                    <div
                        className="relative w-full h-[70vh] md:h-[80vh] lg:h-[70vh] rounded-[24px] overflow-hidden group cursor-pointer"
                        onClick={() => setSelectedCardIndex(1)}
                    >
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

                    <div
                        className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-[24px] overflow-hidden group cursor-pointer"
                        onClick={() => setSelectedCardIndex(2)}
                    >
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
                                onClick={() => setSelectedCardIndex(idx)}
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
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedCardIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedCardIndex(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-2xl bg-[#FDFBF9] rounded-[24px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedCardIndex(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>

                            {/* Top Half: Image */}
                            <div className="relative w-full h-64 sm:h-80 md:h-96 shrink-0">
                                <Image
                                    src={cardsData[selectedCardIndex].image}
                                    alt={cardsData[selectedCardIndex].title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-0"></div>
                            </div>

                            {/* Bottom Half: Content */}
                            <div className="p-6 sm:p-8 md:p-10 bg-white  -mt-6 relative z-10 flex flex-col min-h-[50%] flex-1 overflow-hidden">
                                <div className="flex-grow overflow-y-auto pr-2">
                                    <h3 className="text-3xl sm:text-4xl font-normal text-[#425042] mb-4">
                                        {cardsData[selectedCardIndex].title}
                                    </h3>
                                    <p className="text-[#425042] text-base md:text-md leading-relaxed font-light">
                                        {cardsData[selectedCardIndex].description}
                                    </p>
                                </div>

                                {/* Next Story Footer inside Modal */}
                                <div
                                    className="pt-6 mt-6 border-t border-[#8D827C]/20 flex items-center justify-end group cursor-pointer w-full shrink-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const nextIndex = (selectedCardIndex + 1) % cardsData.length;
                                        setSelectedCardIndex(nextIndex);
                                    }}
                                >
                                    <span className="text-[#425042] text-sm md:text-base font-medium mr-2 transition-colors group-hover:text-black">
                                         {cardsData[(selectedCardIndex + 1) % cardsData.length].title}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-[#425042]/20 border border-[#425042]/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#425042] group-hover:text-white group-hover:border-[#4B3D37]">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SustainabilitySection;
