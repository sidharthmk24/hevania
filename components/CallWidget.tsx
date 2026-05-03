"use client";

import { Phone } from "lucide-react";

export default function CallWidget() {
    return (
        <a
            href="tel:+918907252255"
            className="fixed z-[9999] flex items-center justify-center w-[60px] h-[60px] rounded-full bg-[#2C3A2C] text-[#EDEAE3] shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:scale-105 hover:bg-[#1A2A1A] transition-all duration-300 md:hidden"
            style={{ bottom: "100px", right: "20px" }}
            aria-label="Call Us"
        >
            <Phone className="w-6 h-6" strokeWidth={1.5} fill="currentColor" />
        </a>
    );
}
