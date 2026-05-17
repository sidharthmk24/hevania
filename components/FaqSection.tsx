"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
    question: string;
    answer: string;
}

const EVENT_FAQS: FaqItem[] = [
    {
        question: "Can we customize the decor and layout of the wedding venue?",
        answer: "Absolutely. HEVANIYA offers complete creative flexibility, allowing you or your decorators to customize every detail from custom stages to bespoke lighting setups.",
    },
    {
        question: "What is the maximum guest capacity of your event venues?",
        answer: "Our nature-integrated lawns and luxury plots can comfortably host anywhere from intimate gatherings of 50 guests to grand celebrations of over 1,500 guests.",
    },
    {
        question: "Are there dedicated spaces for catering setup and vendor prep?",
        answer: "Yes, all of our event venues feature separate utility and prep zones with independent vendor access to ensure behind-the-scenes operations run smoothly without interrupting your guests.",
    },
    {
        question: "Do you provide event coordination or planning services?",
        answer: "We offer access to our curated network of highly experienced designers, decorators, and caterers, as well as optional in-house event coordination for a seamless experience.",
    }
];

const STAY_FAQS: FaqItem[] = [
    {
        question: "What kind of premium guest stays and accommodations are available?",
        answer: "We offer high-end bespoke cottages, heritage villas, and luxury tents fully integrated with nature, perfect for wedding families and premium guests.",
    },
    {
        question: "How does the catering and dining service work?",
        answer: "Our expert culinary team creates personalized menus ranging from high-end organic regional cuisines to international fine dining, crafted to perfectly suit your occasion.",
    },
    {
        question: "What is the booking and cancellation policy?",
        answer: "A booking deposit secures your exclusive event date. Detailed cancellation, date-postponement, and installment policies are customized and clearly outlined in our client agreements.",
    },
    {
        question: "Can we book the entire venue exclusively for a multi-day celebration?",
        answer: "Yes, HEVANIYA specializes in exclusive buyouts. You can reserve the entire estate, including all stays, dining facilities, and event lawns for complete privacy during your celebration.",
    }
];

interface FaqSectionProps {
    heading?: string;
    subheading?: string;
    faqs?: FaqItem[];
}

export default function FaqSection({ heading, subheading, faqs }: FaqSectionProps = {}) {
    const [activeTab, setActiveTab] = useState<"events" | "stays">("events");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // If custom FAQs are passed from the CMS, split them across the two categories
    const customEvents = faqs ? faqs.slice(0, Math.ceil(faqs.length / 2)) : [];
    const customStays = faqs ? faqs.slice(Math.ceil(faqs.length / 2)) : [];

    const currentFaqs = activeTab === "events" 
        ? (faqs && customEvents.length > 0 ? customEvents : EVENT_FAQS)
        : (faqs && customStays.length > 0 ? customStays : STAY_FAQS);

    return (
        <section 
            id="faq-section"
            className="w-full bg-[#F7F5F0] py-24 md:py-36 font-sans border-t border-[#2C3A2C]/10 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                
                {/* ── Editorial Two-Column Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* ── Left Column: Sticky Editorial Context ── */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="block w-8 h-px bg-[#2C3A2C]/30" />
                            <span
                                className="text-[0.58rem] tracking-[0.32em] uppercase text-[#C6A75E] font-bold"
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                            >
                                Got Questions?
                            </span>
                        </div>
                        <h2
                            className="font-light tracking-[-0.03em] leading-[1.05] text-[#1A2A1A]"
                            style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            {heading || "Frequently Asked Questions"}
                        </h2>
                        <p className="text-[#425042]/75 text-sm md:text-base leading-relaxed font-light max-w-lg">
                            {subheading || "Find absolute clarity on our premium event venues, luxury stay accommodations, and dining experiences."}
                        </p>
                    </div>

                    {/* ── Right Column: Interactive Tabs & Accordions ── */}
                    <div className="lg:col-span-7 space-y-8 w-full">
                        
                        {/* ── Premium Sliding Pill Switcher ── */}
                        <div className="flex bg-[#EDEAE3] p-1.5 border border-[#2C3A2C]/10  max-w-md mr-auto lg:mx-0 relative">
                            <button
                                id="tab-events-button"
                                onClick={() => {
                                    setActiveTab("events");
                                    setOpenIndex(0);
                                }}
                                className={`relative flex-1 py-3.5 px-4 text-center text-[0.62rem] md:text-[0.7rem] font-bold tracking-[0.25em] uppercase transition-colors duration-300 focus:outline-none  z-10 ${
                                    activeTab === "events" ? "text-white" : "text-[#2F3E2F]/60 hover:text-[#2F3E2F]/90"
                                }`}
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                            >
                                {activeTab === "events" && (
                                    <motion.div
                                        layoutId="activeTabBackground"
                                        className="absolute inset-0 bg-[#2C3A2C]  -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                Events & Venues
                            </button>
                            <button
                                id="tab-stays-button"
                                onClick={() => {
                                    setActiveTab("stays");
                                    setOpenIndex(0);
                                }}
                                className={`relative flex-1 py-3.5 px-4 text-center text-[0.62rem] md:text-[0.7rem] font-bold tracking-[0.25em] uppercase transition-colors duration-300 focus:outline-none  z-10 ${
                                    activeTab === "stays" ? "text-white" : "text-[#2F3E2F]/60 hover:text-[#2F3E2F]/90"
                                }`}
                                style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                            >
                                {activeTab === "stays" && (
                                    <motion.div
                                        layoutId="activeTabBackground"
                                        className="absolute inset-0 bg-[#2C3A2C]  -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                Stays & Dining
                            </button>
                        </div>

                        {/* ── Accordion List ── */}
                        <div className="space-y-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="space-y-4"
                                >
                                    {currentFaqs.map((faq, index) => {
                                        const isOpen = openIndex === index;
                                        return (
                                            <div
                                                key={`${activeTab}-${index}`}
                                                className={`border transition-all duration-300 rounded-none overflow-hidden ${
                                                    isOpen 
                                                        ? "bg-[#EDEAE3] border-[#C6A75E]/30 shadow-[0_4px_20px_rgba(44,58,44,0.06)]" 
                                                        : "bg-[#EDEAE3]/40 hover:bg-[#EDEAE3]/80 border-[#2C3A2C]/5 hover:border-[#2C3A2C]/10"
                                                }`}
                                            >
                                                {/* Header Button */}
                                                <button
                                                    id={`faq-toggle-${activeTab}-${index}`}
                                                    onClick={() => toggleOpen(index)}
                                                    className="w-full flex justify-between items-start py-5 px-6 text-left focus:outline-none group"
                                                >
                                                    <div className="flex items-start">
                                                        {/* Luxury Index Number */}
                                                        <span 
                                                            className={`text-[0.62rem] md:text-xs font-bold tracking-wider mr-4 mt-[0.25rem] transition-colors duration-300 ${
                                                                isOpen ? "text-[#C6A75E]" : "text-[#2F3E2F]/40 group-hover:text-[#C6A75E]/70"
                                                            }`}
                                                            style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
                                                        >
                                                            {String(index + 1).padStart(2, '0')}
                                                        </span>
                                                        
                                                        {/* Question Text */}
                                                        <span
                                                            className={`text-[0.98rem] md:text-[1.08rem] font-medium transition-all duration-300 leading-snug ${
                                                                isOpen ? "text-[#1A2A1A] " : "text-[#2F3E2F] group-hover:text-[#C6A75E]"
                                                            }`}
                                                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                                                        >
                                                            {faq.question}
                                                        </span>
                                                    </div>

                                                    {/* Minimalist Plus-to-Minus Vector Toggle */}
                                                    <span className="ml-4 mt-[0.35rem] transition-transform duration-300 flex-shrink-0">
                                                        <div className="relative w-4 h-4 flex items-center justify-center">
                                                            {/* Horizontal Segment */}
                                                            <div 
                                                                className={`absolute w-3.5 h-[1.2px] transition-all duration-300 ${
                                                                    isOpen ? "bg-[#C6A75E] rotate-180" : "bg-[#2F3E2F]/60 group-hover:bg-[#C6A75E]"
                                                                }`} 
                                                            />
                                                            {/* Vertical Segment (collapses to 0 height when open) */}
                                                            <div 
                                                                className={`absolute h-3.5 w-[1.2px] transition-all duration-300 ${
                                                                    isOpen ? "bg-[#C6A75E] rotate-90 scale-y-0" : "bg-[#2F3E2F]/60 group-hover:bg-[#C6A75E]"
                                                                }`} 
                                                            />
                                                        </div>
                                                    </span>
                                                </button>

                                                {/* Framer Motion Height/Opacity expandable panel */}
                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.div
                                                            key="content"
                                                            initial="collapsed"
                                                            animate="open"
                                                            exit="collapsed"
                                                            variants={{
                                                                open: { opacity: 1, height: "auto" },
                                                                collapsed: { opacity: 0, height: 0 }
                                                            }}
                                                            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pb-6 pl-12 pr-6 pt-1 border-t border-[#2C3A2C]/5">
                                                                <p 
                                                                    className="text-[#425042]/85 text-sm md:text-[0.95rem] leading-relaxed font-light whitespace-pre-line"
                                                                >
                                                                    {faq.answer}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}