import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import AboutPreview from "@/components/AboutPreview";
import BlogPreview from "@/components/BlogPreview";
import FtCarouselSection from "@/components/FtCarouselSection";
import SvgOutline from "@/components/SvgOutline";
import Testimonials from "@/components/Testimonials";

export default function Home() {

  const images = {
    desktop: [
     '/images/heroImages/carousel2.jpg',
    '/images/heroImages/carousel4.webp',
    '/images/heroImages/carousel3.avif'
    ],
    mobile: [
      "/images/heroImages/carousel2.jpg",
      "/images/heroImages/carousel4.webp",
      "/images/heroImages/carousel3.avif",
    ],
  };

  const rawContent = [
    {
      title: "The Grandeur of the Alps",
      description: "Experience the majestic beauty of the Swiss Alps with our exclusive luxury packages. From breathtaking views to world-class amenities, we bring you the best of Switzerland.",
    },
    {
      title: "The Serenity of the Maldives",
      description: "Discover the turquoise waters and pristine beaches of the Maldives. Our luxury villas offer the perfect blend of relaxation and adventure.",
    },
    {
      title: "The Magic of Santorini",
      description: "Explore the iconic white-washed villages and stunning sunsets of Santorini. A romantic getaway like no other.",
    },
    {
      title: "The Adventure of Costa Rica",
      description: "Immerse yourself in the lush rainforests and vibrant wildlife of Costa Rica. An eco-luxury experience you won't forget.",
    },
    {
      title: "The Elegance of Paris",
      description: "Indulge in the timeless charm of Paris. From iconic landmarks to gourmet dining, experience the city of love in style.",
    },
  ];

  // Reformat content to match the structure expected by FtCarouselSection
  // Destkop format requires 3 arrays (slides) of 3 items (columns)
  // Mobile format requires 3 items (slides)
  const content = {
    desktop: [
      [rawContent[0], rawContent[1], rawContent[2]],
      [rawContent[3], rawContent[4], rawContent[0]],
      [rawContent[1], rawContent[2], rawContent[3]],
    ],
    mobile: [
      rawContent[0],
      rawContent[1],
      rawContent[2],
    ],
  };
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <SvgOutline button="Explore" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-12 md:pt-32  ">
        <h2 className="text-4xl md:text-5xl lg:text-7xl  tracking-wide text-[#1A1A1A] text-center mb-16 lg:mb-24 font-normal w-full leading-[1.1]">

          Curated Decor & Modern  <br className="hidden md:block" />Rental Solutions
        </h2>
      </div>
      <FtCarouselSection images={images} content={content} />
      {/* <Testimonials /> */}

      {/* <AboutPreview /> */}
      {/* <BlogPreview /> */}
    </>
  );
}
