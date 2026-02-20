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
                        className="fixed inset-0 m-auto z-50 w-full max-w-lg h-fit bg-cream/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20 p-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif text-dark-forest">Book a Venue</h2>
                            <button onClick={onClose} className="text-dark-forest/60 hover:text-dark-forest transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mb-6">Venue Interest: <span className="font-semibold text-dark-forest">{propertyName}</span></p>

                        {status === "success" ? (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-serif text-green-700 mb-2">Thank you!</h3>
                                <p className="text-gray-600">We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-muted-gold focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-muted-gold focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-muted-gold focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:ring-2 focus:ring-muted-gold focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
                                        placeholder="I am interested in..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full bg-dark-forest text-cream py-3 rounded-lg font-medium tracking-wide hover:bg-opacity-90 transition-all disabled:opacity-50 mt-4"
                                >
                                    {status === "submitting" ? "Sending..." : "Send Enquiry"}
                                </button>
                                {status === "error" && (
                                    <p className="text-red-500 text-sm text-center mt-2">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
