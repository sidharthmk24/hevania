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
                    "flex min-w-full shrink-0 gap-5 py-4 w-max flex-nowrap",
                    direction === "left" ? "animate-scroll-left" : "animate-scroll-right",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
                style={{
                    "--animation-duration": speed === "fast" ? "25s" : speed === "normal" ? "40s" : "60s",
                } as React.CSSProperties}
            >
                {displayItems.map((item, idx) => {
                    const rating = Math.max(1, Math.min(5, Number(item.rating) || 5));

                    return (
                        <li
                            className="w-[85vw] sm:w-[340px] md:w-[380px] lg:w-[420px] h-[210px] sm:h-[220px] flex flex-col justify-between overflow-hidden relative rounded-2xl border border-[#2F3E2F]/15 bg-[#F5F5F0]/90 backdrop-blur-sm p-6 shrink-0 shadow-sm hover:shadow-md transition-shadow"
                            key={idx}
                        >
                            <div className="flex flex-col h-full justify-between overflow-hidden">
                                {/* Header: Avatar, Name, Rating */}
                                <div className="flex items-center gap-3.5 shrink-0">
                                    <div className="h-12 w-12 rounded-full overflow-hidden border border-[#2F3E2F]/15 shadow-sm shrink-0 bg-stone-100 flex items-center justify-center">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                        ) : (
                                            <span className="text-[#2F3E2F]/40 text-lg font-semibold uppercase">
                                                {item.name ? item.name.charAt(0) : "G"}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <div className="text-base sm:text-lg font-semibold text-[#1A2A1A] tracking-tight truncate">
                                            {item.name}
                                        </div>
                                        <div className="flex items-center gap-0.5 mt-0.5">
                                            {Array.from({ length: rating }).map((_, i) => (
                                                <span key={i} className="text-amber-500 text-xs">
                                                    ★
                                                </span>
                                            ))}
                                            {Array.from({ length: 5 - rating }).map((_, i) => (
                                                <span key={i} className="text-gray-300 text-xs">
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Body: Testimonial Comment */}
                                <div className="mt-3.5 overflow-hidden flex-1 flex items-start">
                                    <p className="text-xs sm:text-sm font-light text-[#2F3E2F]/85 leading-relaxed break-words break-all [overflow-wrap:anywhere] whitespace-normal line-clamp-4">
                                        &ldquo;{item.comment}&rdquo;
                                    </p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
