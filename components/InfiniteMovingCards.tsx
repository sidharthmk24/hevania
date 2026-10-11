import { cn } from "@/lib/utils";
import React from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: {
    items: {
        id: number;
        comment: string;
        name: string;
        rating: number;
        image_url?: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    // Guarantee that the base set has at least 8 items so that half the track easily exceeds
    // the screen width on any display size (mobile up to 4K), preventing any empty gap.
    const displayItems = React.useMemo(() => {
        if (!items || items.length === 0) return [];
        let base = [...items];
        while (base.length < 8) {
            base = [...base, ...items];
        }
        return [...base, ...base];
    }, [items]);

    if (!items || items.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    direction === "left" ? "animate-scroll-left" : "animate-scroll-right",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
                style={{
                    "--animation-duration": speed === "fast" ? "25s" : speed === "normal" ? "40s" : "60s",
                } as React.CSSProperties}
            >
                {displayItems.map((item, idx) => (
                    <li
                        className="w-[85vw] sm:w-[320px] md:w-[380px] lg:w-[400px] min-h-[180px] relative border-[#2F3E2F]/20 border-[1px] bg-[#F5F5F0]/60 backdrop-blur-sm pt-[24px] sm:pt-[28px] pb-[20px] sm:pb-[24px] px-[18px] sm:px-[22px] shrink-0"
                        key={idx}
                    >
                        <blockquote>
                            <div>
                                <div className="relative z-20 flex flex-row items-center gap-4">
                                    <div className="h-14 w-14 rounded-full overflow-hidden border border-[#2F3E2F]/10 shadow-sm shrink-0 bg-stone-100 flex items-center justify-center">
                                        {item.image_url ? (
                                            <img 
                                                src={item.image_url} 
                                                alt={item.name} 
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" 
                                            />
                                        ) : (
                                            <span className="text-[#2F3E2F]/30 text-xl font-freightNeoSemibold">
                                                {item.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <div className="text-lg sm:text-xl text-customBrown font-freightNeoSemibold tracking-tight">{item.name}</div>
                                        <div className="text-xs sm:text-sm text-[#2F3E2F]/70 flex mt-1">
                                            {Array.from({ length: item.rating }).map((_, index) => (
                                                <span key={index} className="text-yellow-500/90 text-xs">
                                                    ★
                                                </span>
                                            ))}
                                            {Array.from({ length: 5 - item.rating }).map((_, index) => (
                                                <span key={index} className="text-gray-300 text-xs">
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-5">
                                <p className="mt-2 text-sm sm:text-base font-FreightNeoProNormal 2xl:text-md text-[#2F3E2F]">{item.comment}</p>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
