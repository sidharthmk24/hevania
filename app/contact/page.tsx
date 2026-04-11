"use client";

import React from "react";
import ContactForm from "@/components/ContactForm";
import ContactMap from "@/components/ContactMap";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
    return (
        <>
            <Navbar theme="dark" />
            <section className=" min-h-screen pt-32 pb-16">
                <div className=" mx-auto px-6  md:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 md:gap-24 lg:gap-32 mb-20">
                        {/* Left Column: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col space-y-12"
                        >
                            <div className="space-y-8">
                                <h1 className="text-[48px] md:text-[56px] leading-[1.05] font-sans font-light text-[#2F3E2F]">
                                    Reach Out <br />
                                    <span className="text-[#2F3E2F]">to HEVANIYA</span>
                                </h1>

                                <p className="text-[16px] text-[#2F3E2F] font-sans font-light max-w-sm leading-relaxed">
                                    Whether it's a new brief or a quick question, we'd love to hear from you.
                                </p>
                            </div>

                            <div className="pt-12 border-t border-gray-200">
                                <p className="text-[14px] text-[#2F3E2F] font-sans font-light mb-6">
                                    Alternatively for your Queries contact
                                </p>
                                <div className="space-y-2">
                                    <a
                                        href="tel:+917990933700"
                                        className="block text-[18px] font-sans font-semibold text-[#C6A75E] hover:opacity-80 transition-opacity"
                                    >
                                        +91 98765 43210
                                    </a>
                                    <a
                                        href="mailto:sales@HEVANIYA.com"
                                        className="block text-[18px] font-sans font-semibold text-[#C6A75E] hover:opacity-80 transition-opacity"
                                    >
                                        HEVANIYA@gmail.com
                                    </a>
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
                        <ContactMap />
                    </motion.div>
                </div>
            </section>
        </>
    );
}
