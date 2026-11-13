"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar } from "lucide-react";

const EVENT_TYPES = [
    "Wedding",
    "Haldi / Mehendi",
    "Engagement",
    "Private Celebration",
    "Corporate Event",
    "Staycation",
    "Other",
];

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        preferredDate: "",
        comments: "",
        consent: false,
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const formattedMessage = [
                formData.eventType ? `Event Type: ${formData.eventType}` : "",
                formData.preferredDate ? `Preferred Date: ${formData.preferredDate}` : "",
                formData.comments ? `Notes: ${formData.comments}` : "",
            ]
                .filter(Boolean)
                .join(" | ");

            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formattedMessage || "General Contact Inquiry",
                    venue: formData.eventType ? `Contact - ${formData.eventType}` : "Contact Form",
                }),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    eventType: "",
                    preferredDate: "",
                    comments: "",
                    consent: false,
                });
                setTimeout(() => setStatus("idle"), 4000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 4000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <div className="w-full font-sans">
            {status === "error" && (
                <div className="p-4 mb-6 bg-red-50 text-red-700 text-xs -xl font-sans border border-red-200">
                    Something went wrong submitting your enquiry. Please try again or reach out directly via WhatsApp or Call.
                </div>
            )}

            {status === "success" ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-[#EAF5ED] text-[#2F3E2F] -2xl text-center font-sans border border-[#25D366]/20"
                >
                    <h4 className="font-semibold text-lg mb-2 text-[#1A2A1A]">Thank You!</h4>
                    <p className="text-sm text-[#425042]/80 font-light leading-relaxed">
                        Your inquiry has been received. Our concierge team will connect with you shortly.
                    </p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Your Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="name"
                                className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#7A6B5D]"
                            >
                                YOUR NAME
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                placeholder="Full name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white border border-[#E5DFD7] hover:border-[#D1C9BE] -xl px-4 py-3.5 text-sm font-sans text-[#1A2A1A] placeholder-[#9E948A] focus:outline-none focus:border-[#BC5D43] focus:ring-2 focus:ring-[#BC5D43]/15 transition-all shadow-2xs"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#7A6B5D]"
                            >
                                EMAIL
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white border border-[#E5DFD7] hover:border-[#D1C9BE] -xl px-4 py-3.5 text-sm font-sans text-[#1A2A1A] placeholder-[#9E948A] focus:outline-none focus:border-[#BC5D43] focus:ring-2 focus:ring-[#BC5D43]/15 transition-all shadow-2xs"
                            />
                        </div>
                    </div>

                    {/* Row 2: Phone & Event Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="phone"
                                className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#7A6B5D]"
                            >
                                PHONE
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                required
                                placeholder="+91..."
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-white border border-[#E5DFD7] hover:border-[#D1C9BE] -xl px-4 py-3.5 text-sm font-sans text-[#1A2A1A] placeholder-[#9E948A] focus:outline-none focus:border-[#BC5D43] focus:ring-2 focus:ring-[#BC5D43]/15 transition-all shadow-2xs"
                            />
                        </div>

                        {/* Custom Smooth Dropdown */}
                        <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
                            <label
                                id="event-type-label"
                                className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#7A6B5D]"
                            >
                                EVENT TYPE
                            </label>
                            <button
                                type="button"
                                aria-haspopup="listbox"
                                aria-expanded={isDropdownOpen}
                                aria-labelledby="event-type-label"
                                onClick={() => setIsDropdownOpen((prev) => !prev)}
                                className={`w-full bg-white border ${
                                    isDropdownOpen ? "border-[#BC5D43] ring-2 ring-[#BC5D43]/15" : "border-[#E5DFD7] hover:border-[#D1C9BE]"
                                } -xl px-4 py-3.5 text-sm font-sans flex items-center justify-between text-left transition-all shadow-2xs`}
                            >
                                <span className={formData.eventType ? "text-[#1A2A1A] font-medium" : "text-[#9E948A]"}>
                                    {formData.eventType || "Choose an occasion"}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-[#7A6B5D] transition-transform duration-300 ease-out ${
                                        isDropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute left-0 right-0 top-full mt-2 z-50 bg-white -2xl shadow-xl border border-[#E5DFD7] p-2 space-y-1 overflow-hidden"
                                    >
                                        {EVENT_TYPES.map((type) => {
                                            const isSelected = formData.eventType === type;
                                            return (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData((prev) => ({ ...prev, eventType: type }));
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 -xl text-sm font-sans transition-all duration-150 ${
                                                        isSelected
                                                            ? "bg-[#C06248] text-white font-medium shadow-2xs"
                                                            : "text-[#2F3E2F] hover:bg-[#F7F5F0] font-normal"
                                                    }`}
                                                >
                                                    {type}
                                                </button>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Row 3: Preferred Date (under Phone) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="preferredDate"
                                className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#7A6B5D]"
                            >
                                PREFERRED DATE
                            </label>
                            <div
                                onClick={() => {
                                    try {
                                        dateInputRef.current?.showPicker?.();
                                    } catch {
                                        dateInputRef.current?.focus();
                                    }
                                }}
                                className="relative w-full bg-white border border-[#E5DFD7] hover:border-[#D1C9BE] -xl px-4 py-3.5 text-sm font-sans flex items-center gap-3 cursor-pointer shadow-2xs transition-all group focus-within:border-[#BC5D43] focus-within:ring-2 focus-within:ring-[#BC5D43]/15"
                            >
                                <Calendar className="w-4 h-4 text-[#7A6B5D] group-hover:text-[#BC5D43] transition-colors shrink-0" />
                                <span className={formData.preferredDate ? "text-[#1A2A1A] font-medium" : "text-[#9E948A]"}>
                                    {formData.preferredDate || "Pick a date"}
                                </span>
                                <input
                                    ref={dateInputRef}
                                    id="preferredDate"
                                    type="date"
                                    value={formData.preferredDate}
                                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Tell Us More */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="comments"
                            className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#7A6B5D]"
                        >
                            TELL US MORE
                        </label>
                        <textarea
                            id="comments"
                            rows={4}
                            placeholder="A little about your celebration..."
                            value={formData.comments}
                            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                            className="w-full bg-white border border-[#E5DFD7] hover:border-[#D1C9BE] -xl px-4 py-3.5 text-sm font-sans text-[#1A2A1A] placeholder-[#9E948A] focus:outline-none focus:border-[#BC5D43] focus:ring-2 focus:ring-[#BC5D43]/15 transition-all shadow-2xs resize-y min-h-[110px]"
                        />
                    </div>

                    {/* Checkbox disclaimer above the button */}
                    <div className="pt-1 flex items-start gap-2.5">
                        <input
                            id="consent"
                            type="checkbox"
                            required
                            checked={formData.consent}
                            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                            className="mt-0.5 w-4 h-4  border-[#D8D2CA] text-[#C06248] accent-[#C06248] focus:ring-[#C06248] cursor-pointer shrink-0"
                        />
                        <label
                            htmlFor="consent"
                            className="text-xs text-[#7A6B5D] font-sans font-light leading-relaxed cursor-pointer select-none"
                        >
                            By sending an inquiry you agree to be contacted by Hevaniya about your event.
                        </label>
                    </div>

                    {/* Submit button on a new line below */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="bg-[#C06248] hover:bg-[#A85038] text-white px-9 py-3.5 -full text-sm font-sans font-medium transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 whitespace-nowrap cursor-pointer"
                        >
                            {status === "submitting" ? "Sending..." : "Send Inquiry"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
