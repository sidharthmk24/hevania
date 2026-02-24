import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="relative bg-[#F5F5F0] overflow-hidden pt-24 md:pt-32 pb-6 w-full z-10 font-sans">
        

            {/* Background radial glow matching the image */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] max-w-[2000px] h-[800px] pointer-events-none -z-10"
                style={{
                    background: "radial-gradient(ellipse at bottom, rgba(92, 128, 33, 0.15) 0%, rgba(92, 128, 33, 0.15) 35%, rgba(13,10,10,0) 70%)"
                }}
            ></div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col justify-between min-h-[500px]">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between w-full">
                    {/* Left Column (Main Text & Button) */}
                    <div className="max-w-xl w-full mb-16 lg:mb-0">
                        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-light text-[#425042] leading-[1.3] mb-1">
                            Curating unforgettable experiences in nature's finest settings.
                        </h2>
                        <p className="text-2xl sm:text-3xl lg:text-[36px] font-light text-[#425042] leading-[1.3] mb-10">
                            Where your celebrations find their perfect home.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-8 py-3 lg:px-10 lg:py-4 border border-white/30 text-[#425042] text-sm lg:text-base font-medium hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Let's Talk
                        </Link>
                    </div>

                    {/* Right Columns Container */}
                    <div className="flex flex-col sm:flex-row gap-16 lg:gap-32 w-full lg:w-auto lg:min-w-[400px]">
                        {/* Navigation Section */}
                        <div className="flex-1">
                            <h4 className="text-[11px] uppercase tracking-wider text-white/40 mb-4">Navigation</h4>
                            <ul className="space-y-2">
                                <li><Link href="/about" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">About Us</Link></li>
                                <li><Link href="/blog" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">Event Journal</Link></li>
                                <li><Link href="/#properties" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">Venues</Link></li>
                                <li><Link href="/contact" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div className="flex-1">
                            <h4 className="text-[11px] uppercase tracking-wider text-white/40 mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li className="text-[15px] font-light text-[#425042]">123 Luxury Lane</li>
                                <li className="text-[15px] font-light text-[#425042]">Mumbai, MH 400001</li>
                                <li className="text-[15px] font-light text-[#425042]">+91 98765 43210</li>
                                <li><a href="mailto:inquiry@mukundrealty.com" className="text-[15px] font-light text-[#425042] hover:text-[#F3B6A7] transition-colors">inquiry@mukundrealty.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Giant Text Section */}
                <div className="w-full mt-32 md:mt-48 relative flex flex-col items-center">

                    {/* The giant text + custom geometric shape matching the reference */}
                    <div className="w-full flex items-center justify-center overflow-hidden mb-8 lg:mb-12">
                        <span className="text-[20vw] lg:text-[18vw] font-bold tracking-tighter text-[#425042] leading-[0.75] select-none">
                            HEVANIA
                        </span>
                    </div>

                    {/* Footer Bottom Line */}
                    <div className="w-full border-t border-white/10 pt-6 pb-2 flex flex-col justify-center items-center">
                        <p className="text-[10px] md:text-sm text-[#425042] font-light text-center">
                            A Product of HEVANIA | All Rights Reserved HEVANIA ©{new Date().getFullYear()}
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
