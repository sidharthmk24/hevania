
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
    question: string;
    answer: string;
}

const faqs: FaqItem[] = [
    {
        question: "What types of plots do you offer for sale and rent?",
        answer: "We offer a diverse range of residential, commercial, and agricultural plots, carefully selected to provide long-term value and growth.",
    },
    {
        question: "How do you ensure the legality and clear title of the plots?",
        answer: "Every plot undergoes strict background checks, legal verification, and title authentication so you can invest with complete peace of mind.",
    },
    {
        question: "Where are your major plot listings located?",
        answer: "Our properties are strategically located in high-growth corridors, upcoming suburbs, and established commercial hubs to maximize your returns.",
    },
    {
        question: "What sets your plot services apart from other agencies?",
        answer: "We deliver transparent transactions, personalized consultation, and hassle-free documentation, making your land investment seamless and secure.",
    },
    {
        question: "Do you assist with plot resale in the future?",
        answer: "Yes, we maintain a dedicated resale support team to help our clients liquidate their assets at premium market rates when they choose.",
    },
    {
        question: "What amenities are typically available near your plots?",
        answer: "We prioritize locations with planned infrastructure, proximity to highways, educational institutions, and healthcare facilities to ensure growth.",
    }
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [showMore, setShowMore] = useState(false);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full max-w-full mx-auto px-6 md:px-12 lg:px-20 pb-30 flex flex-col md:flex-row gap-12 md:gap-24 font-sans">
            {/* Left Column */}
            <div className="md:w-[40%] flex flex-col gap-6 pt-4">
                <h2 className="text-4xl md:text-5xl font-light text-[#2F3E2F] leading-[1.1] tracking-tight">
                    Frequently Asked<br />Questions
                </h2>
                <p className="text-[#888] text-[1.05rem] leading-relaxed max-w-lg">
                    Got questions? We&apos;ve got answers no jargon,<br />just direct clarity
                </p>
            </div>

            {/* Right Column */}
            <div className="md:w-[60%] flex flex-col">
                <div className="flex flex-col">
                    {faqs.slice(0, 4).map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className="border-b border-gray-200">
                                <button
                                    onClick={() => toggleOpen(index)}
                                    className="w-full flex justify-between items-center py-6 text-left focus:outline-none transition-colors hover:text-gray-900 group"
                                >
                                    <span className={`text-[1.05rem] font-medium transition-colors ${isOpen ? 'text-[#2F3E2F]' : 'text-[#2F3E2F] group-hover:text-[#2F3E2F]'}`}>
                                        {faq.question}
                                    </span>
                                    <span className="ml-6 transition-transform duration-300 grid place-items-center">
                                        {isOpen ? (
                                            <ChevronUp strokeWidth={1.5} size={20} className="text-[#2F3E2F]" />
                                        ) : (
                                            <ChevronDown strokeWidth={1.5} size={20} className="text-[#2F3E2F]" />
                                        )}
                                    </span>
                                </button>
                                {/* Expandable answer */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[200px] opacity-100 pb-6" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="text-[#888] pr-12 text-[1rem] leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {/* Additional FAQs with smooth animation */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showMore ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                        {faqs.slice(4).map((faq, index) => {
                            const actualIndex = index + 4;
                            const isOpen = openIndex === actualIndex;
                            return (
                                <div key={actualIndex} className="border-b border-gray-200">
                                    <button
                                        onClick={() => toggleOpen(actualIndex)}
                                        className="w-full flex justify-between items-center py-6 text-left focus:outline-none transition-colors hover:text-gray-900 group"
                                    >
                                        <span className={`text-[1.05rem] font-medium transition-colors ${isOpen ? 'text-[#2F3E2F]' : 'text-[#2F3E2F] group-hover:text-[#2F3E2F]'}`}>
                                            {faq.question}
                                        </span>
                                        <span className="ml-6 transition-transform duration-300 grid place-items-center">
                                            {isOpen ? (
                                                <ChevronUp strokeWidth={1.5} size={20} className="text-[#2F3E2F]" />
                                            ) : (
                                                <ChevronDown strokeWidth={1.5} size={20} className="text-[#2F3E2F]" />
                                            )}
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[200px] opacity-100 pb-6" : "max-h-0 opacity-0"
                                            }`}
                                    >
                                        <p className="text-[#888] pr-12 text-[1rem] leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-10 flex justify-start">
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="text-[#888] hover:text-[#444] border-b border-[#888] hover:border-[#444] transition-colors pb-0.5 text-sm font-medium"
                    >
                        {showMore ? "View Less" : "View More"}
                    </button>
                </div>
            </div>
        </section>
    );
}