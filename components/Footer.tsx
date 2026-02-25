"use client";

import Link from "next/link";
import React, { useState } from "react";

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
        <footer className="relative bg-[#F5F5F0] overflow-hidden pt-24 md:pt-32 pb-6 w-full z-10 font-sans border-t border-[#425042]/50">

            {/* Background radial glow matching the image */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] max-w-[2000px] h-[800px] pointer-events-none -z-10"
                style={{
                    background: "radial-gradient(ellipse at bottom, rgba(92, 128, 33, 0.15) 0%, rgba(92, 128, 33, 0.15) 35%, rgba(13,10,10,0) 70%)"
                }}
            ></div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col justify-between min-h-[500px]">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between w-full">
                    {/* Left Column (Main Text & Form) */}
                    <div className="max-w-xl w-full mb-16 lg:mb-0">
                         
                            <p className="text-lg sm:text-xl lg:text-[22px] font-light text-[#425042]/70 leading-[1.3] mb-10">
                                Where your celebrations find their perfect home.
                            </p>

                        {/* Luxurious Form */}
                        {status === "success" ? (
                            <div className="mt-12 py-10 px-6 border border-[#425042]/20 text-center rounded-sm bg-[#425042]/5 backdrop-blur-sm">
                                <h3 className="text-2xl font-serif text-[#425042] mb-3">Thank you!</h3>
                                <p className="text-[#425042]/80 font-light">Your enquiry has been received. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-10 max-w-lg">
                                <div className="flex flex-col sm:flex-row gap-10">
                                    <div className="relative w-full group">
                                        <input
                                            type="text"
                                            id="footer-name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="peer w-full bg-transparent border-b border-[#425042]/30 text-[#425042] placeholder-transparent focus:outline-none focus:border-[#425042] transition-colors pb-2 text-sm"
                                            placeholder="Name"
                                        />
                                        <label htmlFor="footer-name" className="absolute left-0 -top-4 text-[#425042]/60 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#425042] cursor-text">Name</label>
                                    </div>
                                    <div className="relative w-full group">
                                        <input
                                            type="email"
                                            id="footer-email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="peer w-full bg-transparent border-b border-[#425042]/30 text-[#425042] placeholder-transparent focus:outline-none focus:border-[#425042] transition-colors pb-2 text-sm"
                                            placeholder="Email"
                                        />
                                        <label htmlFor="footer-email" className="absolute left-0 -top-4 text-[#425042]/60 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#425042] cursor-text">Email</label>
                                    </div>
                                </div>
                                <div className="relative w-full group">
                                    <input
                                        type="tel"
                                        id="footer-phone"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="peer w-full bg-transparent border-b border-[#425042]/30 text-[#425042] placeholder-transparent focus:outline-none focus:border-[#425042] transition-colors pb-2 text-sm"
                                        placeholder="Phone"
                                    />
                                    <label htmlFor="footer-phone" className="absolute left-0 -top-4 text-[#425042]/60 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#425042] cursor-text">Phone</label>
                                </div>
                                <div className="relative w-full group">
                                    <textarea
                                        id="footer-message"
                                        rows={1}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="peer w-full bg-transparent border-b border-[#425042]/30 text-[#425042] placeholder-transparent focus:outline-none focus:border-[#425042] transition-colors pb-2 text-sm resize-none"
                                        placeholder="Project Details"
                                    ></textarea>
                                    <label htmlFor="footer-message" className="absolute left-0 -top-4 text-[#425042]/60 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#425042] cursor-text">Message / Enquiry</label>
                                </div>
                                <div className="mt-2 flex flex-col gap-2">
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-fit text-[13px] tracking-[0.2em] uppercase border border-[#425042] text-[#425042] px-10 py-4 hover:bg-[#425042] hover:text-[#F5F5F0] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === "submitting" ? "Sending..." : "Submit Enquiry"}
                                    </button>
                                    {status === "error" && (
                                        <p className="text-red-500 text-xs mt-2">Something went wrong. Please try again.</p>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Right Columns Container */}
                    <div className="flex flex-col sm:flex-row gap-16 lg:gap-32 w-full lg:w-auto lg:min-w-[400px]">
                        {/* Navigation Section */}
                        <div className="flex-1">
                            <h4 className="text-[11px] uppercase tracking-wider text-black/40 mb-4">Navigation</h4>
                            <ul className="space-y-2">
                                <li><Link href="/about" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">About Us</Link></li>
                                <li><Link href="/blog" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">Event Journal</Link></li>
                                <li><Link href="/#properties" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">Venues</Link></li>
                                <li><Link href="/contact" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div className="flex-1">
                            <h4 className="text-[11px] uppercase tracking-wider text-black/40 mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li className="text-[15px] font-light text-[#425042]">123 Luxury Lane</li>
                                <li className="text-[15px] font-light text-[#425042]">Mumbai, MH 400001</li>
                                <li className="text-[15px] font-light text-[#425042]">+91 98765 43210</li>
                                <li><a href="mailto:inquiry@hevania.com" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">inquiry@hevania.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Giant Text Section */}
                <div className="w-full mt-32 md:mt-48 relative flex flex-col items-center">

                    {/* The giant text + custom geometric shape matching the reference */}
                    <div className="w-full flex items-center justify-center overflow-hidden mb-8 lg:mb-12">
                        <span className="text-[20vw] lg:text-[18vw] font-light tracking-tighter text-[#425042] leading-[0.75] select-none">
                            HEVANIA
                        </span>
                    </div>

                    {/* Footer Bottom Line */}
                    <div className="w-full border-t border-[#425042]/10 pt-6 pb-2 flex flex-col justify-center items-center">
                        <p className="text-[10px] md:text-sm text-[#425042] font-light text-center">
                            A Product of HEVANIA | All Rights Reserved HEVANIA ©{new Date().getFullYear()}
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
