"use client";

// import { RenderStyledText } from "@/lib/renderStyledText";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { RenderStyledText } from "@/lib/RenderStyledText";

// ✅ Counter component (your logic)
const Counter: React.FC<{ value: string }> = ({ value }) => {
    const ref = useRef(null);
    const inView = useInView(ref);

    const isNumeric = /[0-9]/.test(value); // check if value contains a number
    const isRange = value.includes("-");

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView || !isNumeric) return;

        if (isRange) {
            const numbers = value.split("-").map((v) => parseFloat(v.replace(/[^0-9.]/g, "")));
            const start = numbers[0];
            const end = numbers[1];
            const duration = 2000;
            const incrementTime = 150;
            const steps = duration / incrementTime;
            const stepSize = Math.max(1, Math.ceil((end - start) / steps));

            setCount(start);

            const timer = setInterval(() => {
                setCount((prev) => {
                    const next = prev + stepSize;
                    if (next >= end) {
                        clearInterval(timer);
                        return end;
                    }
                    return next;
                });
            }, incrementTime);

            return () => clearInterval(timer);
        } else {
            const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
            const start = numericValue - 5 >= 0 ? numericValue - 5 : 0;
            const end = numericValue;
            const duration = 2000;
            const incrementTime = 150;
            const steps = duration / incrementTime;
            const stepSize = Math.max(1, (end - start) / steps);

            setCount(start);

            const timer = setInterval(() => {
                setCount((prev) => {
                    const next = prev + stepSize;
                    if (next >= end) {
                        clearInterval(timer);
                        return end;
                    }
                    return next;
                });
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [inView, value]);

    // Display logic
    const displayValue = !isNumeric
        ? value // show text as-is
        : isRange
            ? `${count.toLocaleString()} - ${value.split("-")[1].trim()}`
            : value.includes("+")
                ? `${count.toLocaleString()}+`
                : value.includes("sq.ft.") || value.includes("sq.m.")
                    ? `${count.toLocaleString()} ${inView ? value.match(/sq\.\w+\.?/)?.[0] || "" : ""}`
                    : count.toLocaleString();

    return (
        <motion.span ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="inline-block">
            {displayValue}
        </motion.span>
    );
};

// ✅ Main Component with counter inside
export default function NumberCounter2ELite({
    data,
    noBorder = false,
}: {
    data: {
        description: string;
        title: string;
        subtitle?: string;
        icon?: string;
    }[];
    noBorder?: boolean;
}) {
    return (
        <section className="relative min-h-[50vh] py-16 lg:py-0 flex flex-col justify-center bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/images/heroImages/carousel1.jpeg')" }}>
            <div className="absolute inset-0 bg-[#F5F5F0]/90 z-0"></div>
            <div className="container px-4 sm:px-8 md:px-12 lg:px-20 mx-auto relative z-30">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 lg:gap-y-0 lg:gap-x-8">
                    {data?.map((item, index) => (
                        <div key={index} className={`text-center space-y-2 sm:space-y-3 lg:space-y-4 lg:py-10 ${!noBorder && index !== data.length - 1 ? 'lg:border-r border-[#1C1213]/20' : ''}`}>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
                                <h3
                                    className={`text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl text-customBrown leading-tight font-CandideCondensedNormal tabular-nums animate-[pulse_0.3s_ease-out]`}
                                >
                                    {/* Split numeric and text parts */}
                                    {(() => {
                                        const match = item.title.match(/[0-9,.]+/); // get first number
                                        const numberPart = match ? match[0] : "";
                                        const textPart = match ? item.title.replace(numberPart, "") : item.title;

                                        return (
                                            <span className="flex items-center justify-center">
                                                {/* Animate only the numeric part */}
                                                {numberPart && <Counter value={numberPart} />}
                                                {/* Show remaining text */}
                                                {textPart && <span className="ml-1">{textPart}</span>}
                                            </span>
                                        );
                                    })()}
                                </h3>

                                {item.subtitle && (
                                    <h2 className="text-[13px] sm:text-base md:text-lg lg:text-xl font-freightNeoMedium font-medium text-customBrown opacity-90 sm:pt-2">
                                        {item.subtitle}
                                    </h2>
                                )}
                            </div>

                            {item.description && (
                                <p className={`font-FreightNeoProNormal text-customBrown text-sm sm:text-base lg:text-[18px] leading-snug lg:leading-[24px] px-2 sm:px-4 mx-auto max-w-[200px] sm:max-w-none`}>
                                    {RenderStyledText(item.description)}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex items-center justify-center">
                    {/* Brochure link (still commented) */}
                    {/* <Link
                        href="/brochure.pdf"
                        className="inline-block px-6 py-2 border text-[#1C1213] font-FreightNeoProNormal border-black rounded-full text-sm tracking-wider hover:bg-black hover:text-white transition"
                    >
                        DOWNLOAD BROCHURE →
                    </Link> */}
                </div>
            </div>
        </section>
    );
}
