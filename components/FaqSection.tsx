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

    // If custom FAQs are passed from the CMS, split them across the two categories
    const customEvents = faqs ? faqs.slice(0, Math.ceil(faqs.length / 2)) : [];
    const customStays = faqs ? faqs.slice(Math.ceil(faqs.length / 2)) : [];

    const currentFaqs = activeTab === "events" 
        ? (faqs && customEvents.length > 0 ? customEvents : EVENT_FAQS)
        : (faqs && customStays.length > 0 ? customStays : STAY_FAQS);

    return (
        <section 
            id="faq-section"
            className="w-full bg-[#F7F5F0] py-20 md:py-28 font-sans border-t border-[#2C3A2C]/10 overflow-hidden"
        >
            <div className="mx-auto px-6 md:px-16 lg:px-24 w-full">
                
                {/* ── Centered Header ── */}
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
                    <div className="inline-flex items-center justify-center gap-3 mb-3">
                        <span className="block w-6 h-px bg-[#C6A75E]" />
                        <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#C6A75E]">
                            Got Questions?
                        </span>
                        <span className="block w-6 h-px bg-[#C6A75E]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold font-sans text-[#1A2A1A] tracking-tight leading-tight">
                        {heading || "Frequently Asked Questions (FAQ)"}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-[#425042]/75 font-sans font-light max-w-xl mx-auto leading-relaxed">
                        {subheading || "Find absolute clarity on our premium event venues, luxury stay accommodations, and dining experiences."}
                    </p>
                </div>

                {/* ── Category Pill Switcher ── */}
                <div className="flex justify-center mb-10 md:mb-12">
                    <div className="inline-flex bg-[#EDEAE3] p-1.5 border border-[#2C3A2C]/10 rounded-full shadow-2xs">
                        <button
                            id="tab-events-button"
                            onClick={() => setActiveTab("events")}
                            className={`relative py-2.5 px-6 sm:px-8 text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase transition-colors duration-300 rounded-full z-10 cursor-pointer ${
                                activeTab === "events" ? "text-white" : "text-[#2F3E2F]/65 hover:text-[#2F3E2F]"
                            }`}
                        >
                            {activeTab === "events" && (
                                <motion.div
                                    layoutId="activeFaqTab"
                                    className="absolute inset-0 bg-[#2C3A2C] rounded-full -z-10 shadow-xs"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            Events & Venues
                        </button>
                        <button
                            id="tab-stays-button"
                            onClick={() => setActiveTab("stays")}
                            className={`relative py-2.5 px-6 sm:px-8 text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase transition-colors duration-300 rounded-full z-10 cursor-pointer ${
                                activeTab === "stays" ? "text-white" : "text-[#2F3E2F]/65 hover:text-[#2F3E2F]"
                            }`}
                        >
                            {activeTab === "stays" && (
                                <motion.div
                                    layoutId="activeFaqTab"
                                    className="absolute inset-0 bg-[#2C3A2C] rounded-full -z-10 shadow-xs"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            Stays & Dining
                        </button>
                    </div>
                </div>

                {/* ── FAQ List (Matching Full Container Width) ── */}
                <div className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="space-y-6 md:space-y-8 w-full"
                        >
                            {currentFaqs.map((faq, index) => (
                                <div
                                    key={`${activeTab}-${index}`}
                                    className="w-full bg-white border border-[#E2DDD5] shadow-xs overflow-hidden transition-all duration-200 hover:shadow-sm"
                                >
                                    {/* Question Row */}
                                    <div className="relative flex items-center bg-[#F6F4EE]/90 py-5 sm:py-6 px-6 sm:px-8 md:px-10 border-b border-[#E8E4DC]">
                                        {/* Left Accent Stripe (Top Half) */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#BC5D43]" />

                                        <div className="flex items-center gap-4 sm:gap-6 w-full pl-2 sm:pl-3">
                                            {/* Large "Q." Marker */}
                                            <span className="w-8 sm:w-10 shrink-0 text-2xl sm:text-3xl font-bold font-sans text-[#BC5D43] leading-none select-none">
                                                Q.
                                            </span>
                                            {/* Question Text */}
                                            <h3 className="text-[15px] sm:text-base md:text-[18px] font-semibold font-sans text-[#1A2A1A] leading-snug">
                                                {faq.question}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Answer Row */}
                                    <div className="relative flex items-start bg-white py-5 sm:py-6 px-6 sm:px-8 md:px-10">
                                        {/* Left Neutral Stripe (Bottom Half) */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-[#D1C9BE]" />

                                        <div className="flex items-start gap-4 sm:gap-6 w-full pl-2 sm:pl-3">
                                            {/* Large "A." Marker */}
                                            <span className="w-8 sm:w-10 shrink-0 text-2xl sm:text-3xl font-bold font-sans text-[#9E948A] leading-none select-none mt-0.5">
                                                A.
                                            </span>
                                            {/* Answer Text */}
                                            <p className="text-xs sm:text-sm md:text-[15px] text-[#425042]/85 font-sans font-light leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
