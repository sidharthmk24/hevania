import { cn } from "@/lib/utils";
import React from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        id: number;
        comment: string;
        name: string;
        rating: number;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative w-full max-w-full 2xl:max-w-[150rem] xl:max-w-[100rem] lg:max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    direction === "left" ? "animate-scroll-left" : "animate-scroll-right",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
                style={{
                    "--animation-duration": speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s",
                } as React.CSSProperties}
            >
                {[...items, ...items].map((item, idx) => (
                    <li
                        className="md:w-[20vw] sm:w-[20vw] 2xl:w-[30vw] w-[82vw] max-w-[340px] sm:max-w-none min-h-[30vh] relative border-[#2F3E2F] border-[1px] pt-[24px] sm:pt-[30px] pb-[20px] sm:pb-[26px] px-[16px] sm:px-[21px] shrink-0"
                        key={idx}
                    >
                        <blockquote>
                            <div>
                                <div className="relative z-20 flex flex-row items-center">
                                    <span className="flex flex-row gap-5">
                                        <div className="flex flex-col leading-8">
                                            <div className="text-lg sm:text-xl text-customBrown font-freightNeoSemibold">{item.name}</div>
                                            <div className="text-sm text-[#2F3E2F] flex">
                                                {Array.from({ length: item.rating }).map((_, index) => (
                                                    <span key={index} className="text-yellow-500">
                                                        ★
                                                    </span>
                                                ))}
                                                {Array.from({ length: 5 - item.rating }).map((_, index) => (
                                                    <span key={index} className="text-gray-300">
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </span>
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
