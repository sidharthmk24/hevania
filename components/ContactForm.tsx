"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        comments: "",
        consent: false,
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", phone: "", comments: "", consent: false });
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    const FormField = ({ id, label, type = "text", value, onChange, textarea = false }: any) => {
        const isActive = focusedField === id || value !== "";

        return (
            <div className="relative pt-6">
                <motion.label
                    htmlFor={id}
                    className="absolute left-0 cursor-text pointer-events-none text-[#2F3E2F]/60"
                    initial={false}
                    animate={{
                        y: isActive ? -28 : 2,
                        fontSize: isActive ? "12px" : "15px",
                        opacity: isActive ? 0.8 : 0.6
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    {label}
                </motion.label>
                {textarea ? (
                    <textarea
                        id={id}
                        required
                        value={value}
                        onFocus={() => setFocusedField(id)}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => onChange(e.target.value)}
                        rows={1}
                        className="w-full bg-transparent border-b border-[#2F3E2F] py-2 text-[16px] font-sans text-black focus:outline-none transition-colors resize-none"
                    />
                ) : (
                    <input
                        id={id}
                        type={type}
                        required
                        value={value}
                        onFocus={() => setFocusedField(id)}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full bg-transparent border-b border-[#2F3E2F] py-2 text-[16px] font-sans text-black focus:outline-none transition-colors"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="w-full">
            {status === "success" ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-green-50 text-[#2F3E2F] rounded-lg text-center font-sans"
                >
                    Thank you for reaching out! We will get back to you shortly.
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="space-y-6">
                        <FormField
                            id="name"
                            label="Your Full Name *"
                            value={formData.name}
                            onChange={(val: string) => setFormData({ ...formData, name: val })}
                        />
                        <FormField
                            id="email"
                            label="Your Email *"
                            type="email"
                            value={formData.email}
                            onChange={(val: string) => setFormData({ ...formData, email: val })}
                        />
                        <FormField
                            id="phone"
                            label="Your Phone Number *"
                            type="tel"
                            value={formData.phone}
                            onChange={(val: string) => setFormData({ ...formData, phone: val })}
                        />
                        <FormField
                            id="comments"
                            label="Your Comments *"
                            value={formData.comments}
                            onChange={(val: string) => setFormData({ ...formData, comments: val })}
                            textarea
                        />
                    </div>

                    <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-start gap-2 max-w-sm">
                            <input
                                id="consent"
                                type="checkbox"
                                required
                                checked={formData.consent}
                                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                className="mt-1 w-3.5 h-3.5 rounded-none border-gray-300 text-[#009EDB] focus:ring-0 cursor-pointer"
                            />
                            <label htmlFor="consent" className="text-[11px] text-gray-400 font-sans leading-tight cursor-pointer">
                                Consent to contact me via Call, SMS, Email or Whatsapp
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="bg-[#2F3E2F] hover:bg-[#2F3E2F]/80 text-white px-12 py-3.5 text-[14px] font-medium transition-colors disabled:opacity-50 whitespace-nowrap self-end md:self-auto uppercase tracking-wide"
                        >
                            {status === "submitting" ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
