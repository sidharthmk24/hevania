import HeroSection from "@/components/HeroSection";
import FtCarouselSection from "@/components/FtCarouselSection";
import Testimonials from "@/components/Testimonials";
import FeaturesSection from "@/components/featuresSection";
import { FeatureItem } from "@/components/featuresSection";
import FaqSection from "@/components/FaqSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import ScrollFtSection from "@/components/ScrollFtSection";
import { supabaseServer } from "@/lib/supabaseServer";
import Navbar from "@/components/Navbar";
import ExperienceSection from "@/components/ExperienceSection";
import GalleryLoopSection from "@/components/GalleryLoopSection";

export const dynamic = "force-dynamic";

// ——— Default content fallbacks ———
const DEFAULT_HERO_SLIDES = [
  {
    image: "/images/heroImages/carousel2.jpg",
    subtitle: "Where Refined Celebrations Find Their Perfect Space",
    title: "HEVANIYA",
    buttons: [
      { text: "Schedule a Tour", primary: true },
      { text: "Submit Inquiry", primary: false },
    ],
  },
  {
    image: "/images/heroImages/carousel4.webp",
    subtitle: "Experience Unparalleled Luxury and Elegance",
    title: "EXQUISITE",
    buttons: [
      { text: "Explore Spaces", primary: true },
      { text: "Book an Event", primary: false },
    ],
  },
  {
    image: "/images/heroImages/carousel3.avif",
    subtitle: "Crafting Timeless Memories in Every Detail",
    title: "MEGISTUS",
    buttons: [
      { text: "View Gallery", primary: true },
      { text: "Get in Touch", primary: false },
    ],
  },
];

const DEFAULT_SCROLL_DATA = [
  { id: "high-living", label: "Prime Location", description: "Conveniently located with smooth road access, making it easy for guests, vendors, and parking.", imageSrc: "/images/scrollprime.avif" },
  { id: "kitchen", label: "Ready-to-Use Event Space", description: "Flat, well-maintained land with essential facilities like electricity, water, and setup-friendly layout.", imageSrc: "/images/scroll2.webp" },
  { id: "rooftop", label: "Flexible Setup", description: "Design your event your way—whether it's a grand wedding stage, food stalls, or a cozy outdoor celebration.", imageSrc: "/images/scroll1.webp" },
  { id: "location", label: "Secure & Private Event Space", description: "Enjoy complete privacy with a safe, enclosed area perfect for exclusive celebrations.", imageSrc: "/images/scrollsecure.webp" },
];

const DEFAULT_RAW_CONTENT = [
  { title: "Weddings", description: "Elegant ceremony spaces and reception areas for your special day", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" },
  { title: "Corporate Events", description: "Conferences, retreats, and gatherings that energize teams", img: "https://images.unsplash.com/photo-1505373633572-2342c3004d3e?auto=format&fit=crop&q=80" },
  { title: "Private Parties", description: "Birthday celebrations, anniversaries, and milestone events", img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80" },
  { title: "Community Events", description: "Gala celebrations and charitable fundraisers that bring people together", img: "https://images.unsplash.com/photo-1540575861501-7ce058a877c3?auto=format&fit=crop&q=80" },
  { title: "Weekday Advantage", description: "Schedule your event for a weekday and receive special pricing—up to 15% off standard weekend rates", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" },
  { title: "All-Inclusive Options", description: "Add catering coordination, decor assistance, and event coordination services", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80" },
  { title: "Flexible Rental", description: "Half-day and full-day rental options available. Additional hours available at an hourly rate", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80" },
];

const DEFAULT_SUSTAINABILITY_CARDS = [
  { image: "/images/heroImages/carousel1.jpeg", title: "Water Conservation", description: "Implementing advanced rainwater harvesting and greywater recycling systems across all our properties." },
  { image: "/images/heroImages/carousel2.jpg", title: "Lush Greenery", description: "Our landscapes integrate native plants and trees, providing natural cooling and improving urban air quality." },
  { image: "/images/heroImages/carousel3.avif", title: "Carbon Reduction", description: "Striving for carbon neutrality through sustainable materials, smart energy systems, and renewable energy adoption." },
];

export default async function Home() {
  // ——— Fetch gallery images (for backwards compatibility) ———
  const { data: galleryImages, error: galleryError } = await supabaseServer
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: true });

  if (galleryError) console.error("Supabase error fetching gallery:", galleryError);

  const imagesBySection = (galleryImages || []).reduce((acc: Record<string, string[]>, item: { section: string; image_url: string }) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item.image_url);
    return acc;
  }, {});

  // ——— Fetch section content from CMS ———
  const { data: sectionContentRows, error: contentError } = await supabaseServer
    .from("section_content")
    .select("*")
    .order("created_at", { ascending: true });

  if (contentError) console.error("Supabase error fetching section_content:", contentError);

  // Group by section
  const sectionContent: Record<string, Record<string, Record<string, unknown>>> = {};
  (sectionContentRows || []).forEach((row: { section: string; key: string; content_json: Record<string, unknown> }) => {
    if (!sectionContent[row.section]) sectionContent[row.section] = {};
    sectionContent[row.section][row.key] = row.content_json;
  });

  // ——— Build Hero Slides ———
  const heroContent = sectionContent["hero"] || {};
  const heroSlides = DEFAULT_HERO_SLIDES.map((slide, i) => {
    const cmsSlide = heroContent[`slide_${i + 1}`] as Record<string, unknown> | undefined;
    return {
      image: (cmsSlide?.image_url as string) || imagesBySection["hero"]?.[i] || slide.image,
      subtitle: (cmsSlide?.top_desc as string) || slide.subtitle,
      title: (cmsSlide?.heading as string) || slide.title,
      bottom_subtitle: (cmsSlide?.bottom_subtitle as string) || slide.bottom_subtitle,
      buttons: [
        { text: (cmsSlide?.button_primary as string) || slide.buttons[0].text, primary: true },
        { text: (cmsSlide?.button_secondary as string) || slide.buttons[1].text, primary: false },
      ],
    };
  });

  // ——— Build Scroll Section Data ———
  const scrollContent = sectionContent["scroll_section"] || {};
  const scrollData = DEFAULT_SCROLL_DATA.map((item, i) => {
    const cmsItem = scrollContent[`item_${i + 1}`] as Record<string, unknown> | undefined;
    return {
      ...item,
      label: (cmsItem?.heading as string) || item.label,
      description: (cmsItem?.description as string) || item.description,
      imageSrc: (cmsItem?.image_url as string) || imagesBySection["scroll_section"]?.[i] || item.imageSrc,
    };
  });

  // ——— Build Carousel Content ———
  const carouselContent = sectionContent["carousel"] || {};
  const rawContent = DEFAULT_RAW_CONTENT.map((item, i) => {
    const cmsCard = carouselContent[`card_${i + 1}`] as Record<string, unknown> | undefined;
    return {
      title: (cmsCard?.title as string) || item.title,
      description: (cmsCard?.description as string) || item.description,
      img: (cmsCard?.image_url as string) || imagesBySection["carousel"]?.[i] || item.img,
    };
  }).slice(0, 6);

  const images = {
    desktop: rawContent.map(item => item.img!),
    mobile: rawContent.map(item => item.img!),
  };

  const content = {
    desktop: [
      [rawContent[0], rawContent[1], rawContent[2], rawContent[3], rawContent[4], rawContent[5]],
      [rawContent[1], rawContent[2], rawContent[3], rawContent[4], rawContent[5], rawContent[0]],
      [rawContent[2], rawContent[3], rawContent[4], rawContent[5], rawContent[0], rawContent[1]],
      [rawContent[3], rawContent[4], rawContent[5], rawContent[0], rawContent[1], rawContent[2]],
      [rawContent[4], rawContent[5], rawContent[0], rawContent[1], rawContent[2], rawContent[3]],
      [rawContent[5], rawContent[0], rawContent[1], rawContent[2], rawContent[3], rawContent[4]],
      [rawContent[0], rawContent[1], rawContent[2], rawContent[3], rawContent[4], rawContent[5]],
    ],
    mobile: rawContent,
  };

  // ——— Build Sustainability Cards ———
  const sustainContent = sectionContent["sustainability"] || {};
  const sustainCards = DEFAULT_SUSTAINABILITY_CARDS.map((card, i) => {
    const cmsCard = sustainContent[`card_${i + 1}`] as Record<string, unknown> | undefined;
    return {
      image: (cmsCard?.image_url as string) || imagesBySection["sustainability"]?.[i] || card.image,
      title: (cmsCard?.title as string) || card.title,
      description: (cmsCard?.description as string) || card.description,
    };
  });

  // ——— Build Experience Images ———
  const experienceContent = sectionContent["experience"] || {};
  const experienceImages = [
    (experienceContent["image_1"] as Record<string, unknown>)?.image_url as string,
    (experienceContent["image_2"] as Record<string, unknown>)?.image_url as string,
  ];

  // ——— Build LogoLoop Images ———
  const logoLoopContent = sectionContent["logoloop"] || {};
  const logoLoopImages = Object.keys(logoLoopContent)
    .sort((a, b) => {
      const numA = parseInt(a.split("_")[1] || "0");
      const numB = parseInt(b.split("_")[1] || "0");
      return numA - numB;
    })
    .map((key) => (logoLoopContent[key] as Record<string, unknown>)?.image_url as string)
    .filter(Boolean);

  // ——— Features ———
  const FEATURES: FeatureItem[] = [
    { icon: "SwimmingPool", label: "Scenic Open-Air Ambience" },
    { icon: "GamesArea", label: "Designer Lighting Setup" },
    { icon: "Gymnasium", label: "Built-in Sound & Music System" },
    { icon: "Reflexology", label: "Dedicated Catering Zone" },
    { icon: "LeisureAreas", label: "Ample Parking Space" },
    { icon: "ChildrenPlay", label: "Custom Decor Flexibility" },
    { icon: "JacuzziSauna", label: "Dedicated Catering Zone" },
  ];

  return (
    <>
      <Navbar />
      <HeroSection heroSlides={heroSlides} />
      {/* <div className="pb-20">
        <ScrollFtSection data={scrollData} />

      </div> */}
      <ExperienceSection image1={experienceImages[0]} image2={experienceImages[1]} />

      <GalleryLoopSection images={logoLoopImages.length > 0 ? logoLoopImages : undefined} />






      <div className=" mx-auto px-6 md:px-12 lg:px-20 pt-12 md:pt-0">
        <h2 className="text-2xl md:text-4xl lg:text-6xl tracking-wide text-[#425042] md:text-center mb-10 lg:mb-10 font-normal w-full leading-[1.1]">
          <span className="font-thin">Begin Your Journey</span>
          <p className="text-base md:text-md leading-relaxed font-light mt-6 sm:mt-8">
            Ready to see if Hevaniya is right for your celebration? We&apos;d love to meet you and show you what we&apos;ve created.
          </p>
        </h2>
      </div>

      <FtCarouselSection images={images} content={content} />

      <FeaturesSection
        variant="left"
        features={FEATURES}
        heading={<><span className="font-thin">Everything Your Looking For</span></>}
        completed={false}
      />

      <SustainabilitySection dynamicCards={sustainCards} />

      <Testimonials />

      <FaqSection />
    </>
  );
}
