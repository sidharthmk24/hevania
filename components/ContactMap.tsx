"use client";

import React from "react";
import { MapPin, Clock, TreePine } from "lucide-react";

const TRAVEL_DISTANCES = [
    {
        from: "Kochi (Ernakulam)",
        time: "~1 hr 30 min",
    },
    {
        from: "Kottayam",
        time: "~45 min",
    },
    {
        from: "Alappuzha",
        time: "~50 min",
    },
    {
        from: "Cochin Airport",
        time: "~2 hr",
    },
];

export default function ContactMap({ embedUrl }: { embedUrl?: string }) {
    const src =
        embedUrl ||
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.743128919672!2d76.3912187!3d9.7456721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b087f9c2d1b0d2d%3A0x1d5d14e0e22f281e!2sVaikom%2C%20Kerala!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin";

    return (
        <div className="w-full overflow-hidden  border border-[#2F3E2F]/10 grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[520px] bg-[#465644]">
            {/* Left Panel: Strategically Connected & Travel Distances */}
            <div className="bg-[#465644] text-white lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center gap-6 font-sans">
                {/* Header Block */}
                <div>
                    {/* LOCATED IN Pill Badge */}
                    <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 mb-4 shadow-sm w-fit">
                        <div className="w-5 h-5 rounded-full bg-[#1A2A1A] text-[#A8C3A0] flex items-center justify-center shrink-0">
                            <MapPin className="w-3 h-3" />
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C6A75E] font-semibold">
                                LOCATED IN
                            </span>
                            <span className="text-white/40">•</span>
                            <span className="font-medium text-white tracking-wide text-xs">
                                Vaikom, Kottayam
                            </span>
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal leading-[1.12] tracking-tight mb-2 text-white">
                        Strategically<br />Connected
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-[13px] text-white/75 font-light leading-relaxed max-w-sm">
                        Arrive in less than an hour from most parts of central Kerala.
                    </p>
                </div>

                {/* Compact 2x2 Travel Distance Cards */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {TRAVEL_DISTANCES.map((item) => (
                        <div
                            key={item.from}
                            className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 rounded-xl py-2.5 px-3 sm:py-3 sm:px-3.5 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow"
                        >
                            <div>
                                <span className="text-[9px] uppercase font-semibold tracking-[0.2em] text-[#C6A75E] block leading-none mb-1">
                                    FROM
                                </span>
                                <h4 className="text-xs sm:text-[13px] font-medium text-white leading-tight tracking-tight">
                                    {item.from}
                                </h4>
                            </div>
                            <div className="mt-2 flex items-center gap-1 text-white/70 text-[11px] font-light">
                                <Clock className="w-3 h-3 text-[#C6A75E] shrink-0" />
                                <span>{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Interactive Styled Map */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full bg-[#E5E5E0]">
                <iframe
                    src={src}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hevaniya Location Map"
                    className="w-full h-full min-h-[380px] lg:min-h-[520px] grayscale contrast-[1.08] brightness-[0.96] opacity-95 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />

                {/* Center Location Pin Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-[#1A2A1A]/90 text-white flex items-center justify-center shadow-2xl border-2 border-white/40 backdrop-blur-sm">
                        <TreePine className="w-5 h-5 text-[#A8C3A0]" />
                    </div>
                    <div className="mt-2 bg-[#1A2A1A]/90 text-white text-[10px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-full shadow-lg backdrop-blur-sm border border-white/20 whitespace-nowrap">
                        HEVANIYA ESTATE
                    </div>
                </div>
            </div>
        </div>
    );
}
