import Image from "next/image";

export default function ExperienceSection() {
    return (
        <section className="pt-24 pb-12 md:pb-0 md:pt-32 w-full overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                <h2 className="text-4xl md:text-5xl lg:text-8xl tracking-wide text-[#2F3E2F]/90 text-left mb-16 lg:mb-24 font-normal w-full leading-[1.1]">
                    Where Exceptional Experiences Take Shape
                </h2>

                <div className="flex flex-col lg:flex-row justify-between relative mt-16 lg:mt-32">

                    {/* Left Text Content */}
                    <div className="lg:w-[40%] flex flex-col justify-start z-20 xl:pl-10 mb-16 lg:mb-0 relative lg:top-12">
                        <div className="text-[#2F3E2F] space-y-8 text-lg md:text-xl lg:text-[1.35rem] leading-relaxed tracking-wide font-light max-w-md">
                            <p>
                                They unfold seamlessly<br />
                                & take your breath away.
                            </p>
                            <p>
                                But the truly exceptional moments<br />
                                are immersive experiences - unlike any other.
                            </p>
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="lg:w-[60%] relative h-[500px] sm:h-[600px] lg:h-[700px] xl:h-[800px] w-full">
                        {/* Back Image (Top Right) */}
                        <div className="absolute top-[-10%] sm:top-[-15%] md:top-[-10%] right-0 w-[75%] sm:w-[70%] h-[70%] sm:h-[65%] z-0 select-none">
                            <Image
                                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
                                alt="Luxury bedroom interior"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 75vw, 45vw"
                                priority
                            />
                        </div>

                        {/* Front Image (Bottom Left, Overlapping) */}
                        <div className="absolute bottom-[5%] sm:bottom-[30%] left-0 lg:left-[-10%] w-[80%] sm:w-[75%] lg:w-[65%] h-[60%] sm:h-[35%] z-10 shadow-2xl select-none">
                            <Image
                                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
                                alt="Modern luxury bedroom interior"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 80vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}