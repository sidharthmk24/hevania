"use client";

import React from "react";
import ContactForm from "@/components/ContactForm";
import ContactMap from "@/components/ContactMap";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export type ContactClientProps = {
    info: {
        heading: string;
        description: string;
        query_label: string;
        phone: string;
        phone_tel: string;
        email: string;
    };
    map: {
        embed_url: string;
        map_title?: string;
    };
};

export default function ContactClient({ info, map }: ContactClientProps) {
    return (
        <>
            <Navbar theme="dark" />
            <section className="min-h-screen pt-32 pb-16">
                <div className="mx-auto px-6 md:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 md:gap-24 lg:gap-32 mb-20">
                        {/* Left Column: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col space-y-12"
                        >
                            <div className="space-y-8">
                                <h1 className="text-[48px] md:text-[56px] leading-[1.05] font-sans font-light text-[#2F3E2F] whitespace-pre-line">
                                    {info.heading}
                                </h1>

                                <p className="text-[16px] text-[#2F3E2F] font-sans font-light max-w-sm leading-relaxed">
                                    {info.description}
                                </p>
                            </div>

                            <div className="pt-12 border-t border-gray-200">
                                <p className="text-[14px] text-[#2F3E2F] font-sans font-light mb-6">
                                    {info.query_label}
                                </p>
                                <div className="space-y-2">
                                    {info.phone && (
                                        <a
                                            href={`tel:${info.phone_tel || info.phone.replace(/\s+/g, "")}`}
                                            className="block text-[18px] font-sans font-semibold text-[#C6A75E] hover:opacity-80 transition-opacity"
                                        >
                                            {info.phone}
                                        </a>
                                    )}
                                    {info.email && (
                                        <a
                                            href={`mailto:${info.email}`}
                                            className="block text-[18px] font-sans font-semibold text-[#C6A75E] hover:opacity-80 transition-opacity"
                                        >
                                            {info.email}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Contact Form */}
                        <div className="pt-4">
                            <ContactForm />
                        </div>
                    </div>

                    {/* Bottom: Map */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <ContactMap embedUrl={map.embed_url} />
                    </motion.div>
                </div>
            </section>
        </>
    );
}
