"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyName?: string;
}

export default function EnquiryModal({ isOpen, onClose, propertyName = "General Enquiry" }: EnquiryModalProps) {
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
            // Sending 'venue' instead of 'property' in payload if you want, or keep 'property' for compatibility
            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, venue: propertyName }),
            });

            if (response.ok) {
                setStatus("success");
                setTimeout(() => {
                    onClose();
                    setStatus("idle");
                    setFormData({ name: "", email: "", phone: "", message: "" });
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto z-50 w-[95%] max-w-5xl h-fit max-h-[90vh] bg-[#F5F5F0] shadow-2xl overflow-y-auto rounded-none flex flex-col md:flex-row"
                    >
                        {/* Left Side - Informational/Brand Area */}
                        <div className="w-full md:w-2/5 bg-[#1F2922] p-10 md:p-14 text-[#F5F5F0] flex flex-col justify-between relative overflow-hidden">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#cda776] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10">
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#cda776] mb-6">Hevania Estates</h3>
                                <h2 className="text-3xl md:text-5xl font-freightNeoMedium leading-tight">
                                    Begin Your <br />
                                    <span className="text-[#cda776] italic font-light">Preparation</span>
                                </h2>
                                <p className="mt-6 text-sm md:text-base font-light text-white/60 leading-relaxed">
                                    Enquire about {propertyName}. Our concierge will be in touch shortly to discuss your bespoke requirements.
                                </p>
                            </div>

                            <div className="mt-12 md:mt-0 relative z-10">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Direct Contact</p>
                                        <p className="font-light text-sm text-[#F5F5F0]">concierge@hevania.com</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Telephone</p>
                                        <p className="font-light text-sm text-[#F5F5F0]">+91 98765 43210</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form Area */}
                        <div className="w-full md:w-3/5 p-10 md:p-16 relative">
                            <button onClick={onClose} className="absolute top-6 right-6 md:top-8 md:right-8 text-[#425042]/40 hover:text-[#425042] transition-colors bg-[#425042]/5 hover:bg-[#425042]/10 rounded-full p-3">
                                <X size={20} strokeWidth={1.5} />
                            </button>

                            <div className="mb-12">
                                <h2 className="text-2xl font-freightNeoMedium text-[#425042] tracking-wide mb-2">Details</h2>
                                <div className="w-8 h-[1px] bg-[#cda776]"></div>
                            </div>

                            {status === "success" ? (
                                <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                                    <div className="w-16 h-16 rounded-full border border-[#cda776] flex items-center justify-center mb-6">
                                        <svg className="w-6 h-6 text-[#cda776]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-freightNeoMedium text-[#425042] mb-4">Request Received</h3>
                                    <p className="text-[#425042]/70 font-light max-w-sm">Thank you for your interest. A member of our team has been notified and will contact you directly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                className="w-full px-0 py-3 bg-transparent border-b border-[#425042]/20 focus:border-[#cda776] outline-none transition-colors peer placeholder-transparent font-light rounded-none focus:ring-0 text-[#425042]"
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                            <label htmlFor="name" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-widest text-[#425042]/50 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#425042]/50 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#cda776]">
                                                Title & Full Name *
                                            </label>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                className="w-full px-0 py-3 bg-transparent border-b border-[#425042]/20 focus:border-[#cda776] outline-none transition-colors peer placeholder-transparent font-light rounded-none focus:ring-0 text-[#425042]"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-widest text-[#425042]/50 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#425042]/50 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#cda776]">
                                                Email Address *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-[calc(50%-1.25rem)] relative group">
                                        <input
                                            type="tel"
                                            id="phone"
                                            required
                                            className="w-full px-0 py-3 bg-transparent border-b border-[#425042]/20 focus:border-[#cda776] outline-none transition-colors peer placeholder-transparent font-light rounded-none focus:ring-0 text-[#425042]"
                                            placeholder="Phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        <label htmlFor="phone" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-widest text-[#425042]/50 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#425042]/50 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#cda776]">
                                            Telephone *
                                        </label>
                                    </div>

                                    <div className="relative group pt-4">
                                        <textarea
                                            id="message"
                                            rows={2}
                                            className="w-full px-0 py-3 bg-transparent border-b border-[#425042]/20 focus:border-[#cda776] outline-none transition-colors peer placeholder-transparent resize-none font-light rounded-none focus:ring-0 text-[#425042] min-h-[40px]"
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                        <label htmlFor="message" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-widest text-[#425042]/50 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#425042]/50 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#cda776]">
                                            Additional Information or Requests
                                        </label>
                                    </div>

                                    <div className="pt-8 flex items-center justify-between flex-col md:flex-row gap-6">
                                        {status === "error" && (
                                            <p className="text-red-500 text-sm font-light w-full text-center md:text-left">An error occurred. Please try again or contact us directly.</p>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full md:w-auto px-12 md:px-16 py-4 border border-[#425042] text-[#425042] hover:bg-[#425042] hover:text-[#F5F5F0] transition-colors duration-500 font-light tracking-[0.2em] uppercase text-[10px] disabled:opacity-50 ml-auto group flex items-center justify-center gap-4"
                                        >
                                            {status === "submitting" ? "Processing..." : "Submit"}
                                            {!status && (
                                                <span className="w-6 h-[1px] bg-[#425042] group-hover:bg-[#F5F5F0] transition-colors duration-500 block"></span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
