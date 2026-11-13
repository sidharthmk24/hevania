"use client";

import React from "react";
import ContactForm from "@/components/ContactForm";
import ContactMap from "@/components/ContactMap";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Phone, Instagram, MapPin, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export type ContactClientProps = {
    info: {
        heading: string;
        description: string;
        query_label: string;
        phone: string;
        phone_tel: string;
        email: string;
        instagram?: string;
        venue_address?: string;
        whatsapp?: string;
    };
    map: {
        embed_url: string;
        map_title?: string;
    };
};

export default function ContactClient({ info, map }: ContactClientProps) {
    const phoneNumber = info.phone || "+91 8907 252255";
    const phoneTel = info.phone_tel || "+918907252255";
    const whatsappNumber = info.whatsapp || "918907252255";
    const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, "");
    const instagramHandle = info.instagram || "@hevaniya";
    const venueAddress = info.venue_address || "Vaikom, Kottayam, Kerala, India";

    const heading = info.heading || "Let's plan your special day";
    const description =
        info.description ||
        "Planning a wedding, reception, haldi, birthday, or a cozy stay at our riverside estate? Connect with us directly through any of the channels below.";

    const contactChannels = [
        {
            title: "WhatsApp Us",
            subtitle: "Instant message or chat",
            href: `https://wa.me/${cleanWhatsapp}?text=Hi%20Hevaniya%2C%20I%20would%20like%20to%20plan%20an%20event`,
            icon: FaWhatsapp,
            iconBg: "bg-[#EAF5ED]",
            iconColor: "text-[#25D366]",
            isExternal: true,
        },
        {
            title: "Call Us",
            subtitle: phoneNumber,
            href: `tel:${phoneTel}`,
            icon: Phone,
            iconBg: "bg-[#EEF2EC]",
            iconColor: "text-[#2F3E2F]",
            isExternal: false,
        },
        {
            title: "Instagram",
            subtitle: `Follow ${instagramHandle}`,
            href: `https://instagram.com/${instagramHandle.replace("@", "")}`,
            icon: Instagram,
            iconBg: "bg-[#FDF0F3]",
            iconColor: "text-[#E1306C]",
            isExternal: true,
        },
        {
            title: "Our Venue",
            subtitle: venueAddress,
            href: map?.embed_url ? "#venue-map" : "https://maps.google.com/?q=Hevaniya+Vaikom+Kottayam+Kerala",
            icon: MapPin,
            iconBg: "bg-[#FDF4EB]",
            iconColor: "text-[#C6A75E]",
            isExternal: !map?.embed_url,
        },
    ];

    return (
        <>
            <Navbar theme="dark" />
            <section className="min-h-screen bg-[#F7F5F0] pt-28 md:pt-36 pb-20">
                <div className="mx-auto px-6 md:px-16 lg:px-24 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                        {/* Left Column: Heading + Description + 4 Contact Channels */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 flex flex-col"
                        >

                            {/* Main Title */}
                            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold font-sans text-[#1A2A1A] tracking-tight leading-[1.18] mb-4">
                                {heading}
                            </h1>

                            {/* Description */}
                            <p className="text-sm sm:text-base text-[#425042]/75 font-sans font-light leading-relaxed max-w-xl mb-8">
                                {description}
                            </p>

                            {/* Unified 4-Quadrant Matrix Layout */}
                            <div className="border border-[#2F3E2F]/15 bg-white/80  -2xl backdrop-blur-sm overflow-hidden shadow-xs grid grid-cols-1 sm:grid-cols-2">
                                {contactChannels.map((channel, index) => {
                                    const IconComponent = channel.icon;
                                    const isTopRow = index < 2;
                                    const isLeftCol = index % 2 === 0;
                                    return (
                                        <a
                                            key={channel.title}
                                            href={channel.href}
                                            target={channel.isExternal ? "_blank" : undefined}
                                            rel={channel.isExternal ? "noopener noreferrer" : undefined}
                                            className={`group p-5 flex items-center gap-3.5 transition-all duration-300 hover:bg-white ${
                                                index < 3 ? "border-b sm:border-b-0" : ""
                                            } ${isTopRow ? "sm:border-b" : ""} ${
                                                isLeftCol ? "sm:border-r" : ""
                                            } border-[#2F3E2F]/10`}
                                        >
                                            <div
                                                className={`w-10 h-10   -xl flex items-center justify-center shrink-0 ${channel.iconBg} ${channel.iconColor} transition-transform duration-300 group-hover:scale-110 shadow-2xs`}
                                            >
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5">
                                                    <h3 className="font-sans font-semibold text-sm sm:text-[15px] text-[#1A2A1A] group-hover:text-[#2F3E2F] transition-colors truncate">
                                                        {channel.title}
                                                    </h3>
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-[#425042]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <p className="text-xs text-[#425042]/70 font-sans font-light truncate">
                                                    {channel.subtitle}
                                                </p>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Right Column: Contact Form (Spacious & Refined) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-7 w-full"
                        >
                            <div className="bg-white    -3xl border border-[#2F3E2F]/10 p-7 sm:p-9 lg:p-11 shadow-sm backdrop-blur-sm">
                                <ContactForm />
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom: Location Map */}
                    <motion.div
                        id="venue-map"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-20 pt-10 border-t border-[#2F3E2F]/10"
                    >
                        <ContactMap embedUrl={map?.embed_url} />
                    </motion.div>
                </div>
            </section>
        </>
    );
}
