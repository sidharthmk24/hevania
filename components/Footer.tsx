"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, venue: "Footer Enquiry" }),
            });

            if (response.ok) {
                setStatus("success");
                setTimeout(() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", phone: "", message: "" });
                }, 3000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <footer className="relative bg-[#F5F5F0] pt-20 md:pt-32 md:pb-12 w-full z-10 border-t border-[#2F3E2F]/20">
            <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 w-full">

                {/* Top Section: Three Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 mb-24">

                    {/* Brand Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-[24px] font-aboreto text-[#2F3E2F] mb-8 tracking-widest uppercase">
                            HEVANIA
                        </h2>
                        <p className="text-[14px] font-light text-[#425042] leading-relaxed max-w-sm mb-10">
                            Curating extraordinary experiences in the world's most exquisite settings. Every detail, a testament to elegance.
                        </p>

                        <div className="flex gap-6 items-center hover:opacity-100 transition-opacity duration-500">
                            {[
                                { icon: Instagram, href: "#" },
                                { icon: Facebook, href: "#" },
                                { icon: Mail, href: "mailto:inquiry@hevania.com" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="text-[#2F3E2F] hover:text-[#C6A75E] transition-colors">
                                    <social.icon size={16} strokeWidth={1} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Discovery Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h4 className="text-md uppercase text-[#425042] tracking-widest mb-8 font-semibold">Discovery</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "The Atelier", href: "/about" },
                                { name: "Curated Venues", href: "/#properties" },
                                { name: "Event Journal", href: "/blog" },
                                { name: "Private Viewings", href: "/contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-[14px] font-light text-[#425042] hover:text-[#2F3E2F] transition-colors relative group block w-fit">
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-[#2F3E2F] transition-all duration-500 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Concierge Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <h4 className="text-md uppercase text-[#2F3E2F] tracking-widest mb-8 font-semibold">Concierge</h4>
                        <ul className="space-y-5 text-[14px] font-light text-[#425042]">
                            <li className="flex flex-col gap-1">
                                <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#C6A75E]">Localisation</span>
                                123 Luxury Lane, Mumbai, MH 400001
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#C6A75E]">Direct Line</span>
                                +91 98765 43210
                            </li>
                            <li>
                                <a href="mailto:inquiry@hevania.com" className="hover:text-[#2F3E2F] transition-colors">inquiry@hevania.com</a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Middle Section: Minimal Enquiry Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="w-full max-w-2xl pt-16 border-t border-[#2F3E2F]/5"
                >
                    <h4 className="text-[12px] uppercase tracking-[0.2em] font-semibold text-[#C6A75E] mb-10">Inquiries</h4>

                    {status === "success" ? (
                        <div className="py-8">
                            <p className="text-[14px] font-light text-[#2F3E2F] italic">Thank you. We will reach out shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                {[
                                    { id: "name", label: "Full Name", type: "text" },
                                    { id: "email", label: "Email Address", type: "email" },
                                    { id: "phone", label: "Phone Number", type: "tel" },
                                    { id: "message", label: "Event Details", type: "text" }
                                ].map((field) => (
                                    <div key={field.id} className="relative group">
                                        <input
                                            type={field.type}
                                            required
                                            value={formData[field.id as keyof typeof formData]}
                                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                                            className="w-full bg-transparent border-b border-[#2F3E2F]/10 py-2 text-[13px] text-[#2F3E2F] focus:outline-none focus:border-[#C6A75E] transition-all placeholder-[#2F3E2F]"
                                            placeholder={field.label}
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="text-[11px] uppercase tracking-[0.4em] font-semibold text-[#2F3E2F] border border-[#2F3E2F]/20 px-12 py-5 hover:bg-[#2F3E2F] hover:text-white transition-all duration-700 disabled:opacity-30"
                            >
                                {status === "submitting" ? "Processing..." : "Submit Enquiry"}
                            </button>
                        </form>
                    )}
                </motion.div>

                {/* Bottom Section: Original Giant Text & Legal */}
                <div className="w-full mt-32 md:mt-48 relative flex flex-col items-center">
                    {/* The giant text matching original specifications */}
                    <div className="w-full flex items-center justify-center overflow-hidden mb-8 lg:mb-12">
                        <span className="text-[20vw] lg:text-[18vw] font-light tracking-tighter text-[#425042] leading-[0.75] select-none">
                            HEVANIA
                        </span>
                    </div>

                    {/* Footer Bottom Line */}
                    <div className="w-full border-t border-[#425042]/10 pt-6 pb-4 flex flex-col justify-center items-center">
                        <p className="text-[10px] md:text-sm text-[#425042] font-light text-center">
                            A Product of HEVANIA | All Rights Reserved HEVANIA ©{new Date().getFullYear()}
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
