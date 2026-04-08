import HeroSection from "@/components/HeroSection";
// import ExperienceSection from "@/components/ExperienceSection";
// import HorizontalScroll from "@/components/HorizontalScroll";
// import AboutPreview from "@/components/AboutPreview";
// import BlogPreview from "@/components/BlogPreview";
import FtCarouselSection from "@/components/FtCarouselSection";
// import SvgOutline from "@/components/SvgOutline";
import Testimonials from "@/components/Testimonials";
// import { RenderStyledText } from "@/lib/RenderStyledText";
// import NumberCounter2ELite from "@/components/NumberCount";
import FeaturesSection from "@/components/featuresSection";
import { FeatureItem } from "@/components/featuresSection";
import FaqSection from "@/components/FaqSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import ScrollFtSection from "@/components/ScrollFtSection";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function Home() {
  const { data: galleryImages } = await supabaseServer.from('gallery').select('*').order('created_at', { ascending: true });
  const imagesBySection = (galleryImages || []).reduce((acc: any, item: any) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item.image_url);
    return acc;
  }, {});

  const FEATURES: FeatureItem[] = [
    { icon: "SwimmingPool", label: "Scenic Open-Air Ambience" },
    { icon: "GamesArea", label: "Designer Lighting Setup" },
    { icon: "Gymnasium", label: "Built-in Sound & Music System" },
    { icon: "Reflexology", label: "Dedicated Catering Zone" },
    { icon: "LeisureAreas", label: "Ample Parking Space" },
    { icon: "ChildrenPlay", label: "Custom Decor Flexibility" },
    { icon: "JacuzziSauna", label: "Dedicated Catering Zone" },
  ];

  const rawContent = [
    { title: "Weddings", description: "Elegant ceremony spaces and reception areas for your special day", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" },
    { title: "Corporate Events", description: "Conferences, retreats, and gatherings that energize teams", img: "https://images.unsplash.com/photo-1505373633572-2342c3004d3e?auto=format&fit=crop&q=80" },
    { title: "Private Parties", description: "Birthday celebrations, anniversaries, and milestone events", img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80" },
    { title: "Community Events", description: "Gala celebrations and charitable fundraisers that bring people together", img: "https://images.unsplash.com/photo-1540575861501-7ce058a877c3?auto=format&fit=crop&q=80" },
    { title: "Weekday Advantage", description: "Schedule your event for a weekday and receive special pricing—up to 15% off standard weekend rates", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" },
    { title: "All-Inclusive Options", description: "Add catering coordination, decor assistance, and event coordination services", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80" },
    { title: "Flexible Rental", description: "Half-day and full-day rental options available. Additional hours available at an hourly rate", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80" },
  ];

  // Apply dynamic images to rawContent for the Carousel if available
  const carouselImages = imagesBySection['carousel'] || [];
  const updatedRawContent = rawContent.map((item, index) => ({
    ...item,
    img: carouselImages[index] || item.img
  }));

  const images = {
    desktop: updatedRawContent.map(item => item.img!),
    mobile: updatedRawContent.map(item => item.img!)
  };

  const SECTION_DATA = [
    { id: "high-living", label: "Prime Location", description: "Conveniently located with smooth road access, making it easy for guests, vendors, and parking.", imageSrc: "/images/scrollprime.avif" },
    { id: "kitchen", label: "Ready-to-Use Event Space", description: "Flat, well-maintained land with essential facilities like electricity, water, and setup-friendly layout.", imageSrc: "/images/scroll2.webp" },
    { id: "rooftop", label: "Flexible Setup", description: "Design your event your way—whether it’s a grand wedding stage, food stalls, or a cozy outdoor celebration.", imageSrc: "/images/scroll1.webp" },
    { id: "location", label: "Secure & Private Event Space", description: "Enjoy complete privacy with a safe, enclosed area perfect for exclusive celebrations.", imageSrc: "/images/scrollsecure.webp" },
  ];

  // Apply dynamic images to scroll section if available
  const scrollImages = imagesBySection['scroll_section'] || [];
  const updatedScrollData = SECTION_DATA.map((item, index) => ({
    ...item,
    imageSrc: scrollImages[index] || item.imageSrc
  }));

  const content = {
    desktop: [
      [updatedRawContent[0], updatedRawContent[1], updatedRawContent[2]],
      [updatedRawContent[1], updatedRawContent[2], updatedRawContent[3]],
      [updatedRawContent[2], updatedRawContent[3], updatedRawContent[4]],
      [updatedRawContent[3], updatedRawContent[4], updatedRawContent[5]],
      [updatedRawContent[4], updatedRawContent[5], updatedRawContent[6]],
      [updatedRawContent[5], updatedRawContent[6], updatedRawContent[0]],
      [updatedRawContent[6], updatedRawContent[0], updatedRawContent[1]],
    ],
    mobile: [
      updatedRawContent[0], updatedRawContent[1], updatedRawContent[2], updatedRawContent[3],
      updatedRawContent[4], updatedRawContent[5], updatedRawContent[6]
    ],
  };

  return (
    <>
      <HeroSection dynamicImages={imagesBySection['hero']} />
      <div className="pb-20">
        <ScrollFtSection data={updatedScrollData} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-12 md:pt-0  ">
        <h2 className="text-2xl md:text-4xl lg:text-6xl  tracking-wide text-[#425042] md:text-center mb-10 lg:mb-10 font-normal w-full leading-[1.1]">
          <span className="font-thin">Begin Your Journey</span>
          <p className="text-base md:text-md leading-relaxed font-light mt-6 sm:mt-8">Ready to see if Hevaniya is right for your celebration? We&apos;d love to meet you and show you what we&apos;ve created.</p>
        </h2>
      </div>
      
      <FtCarouselSection images={images} content={content} />

      <FeaturesSection variant="left" features={FEATURES} heading={<><span className="font-thin">Everything Your Looking For</span></>} completed={false} />
      
      <SustainabilitySection dynamicImages={imagesBySection['sustainability']} />

      <Testimonials />

      <FaqSection />
    </>
  );
}
