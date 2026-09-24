import { supabaseServer } from "@/lib/supabaseServer";
import AboutClient, { AboutClientProps } from "./AboutClient";

export const dynamic = "force-dynamic";

// ——— Fallback Defaults ———
const DEFAULT_HERO = {
    subtitle: "The Hevaniya Story",
    heading: "Our Legacy",
    description: "Crafting extraordinary experiences in nature's most majestic settings for over two decades.",
    side_text: "Excellence In Every Detail • Since 1999",
    image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
};

const DEFAULT_PHILOSOPHY = {
    tag: "Our Philosophy",
    heading: "Nature Meets\nArtistry",
    quote: "We don't just find locations; we discover the soul of a celebration.",
    mantra: "Our Mantra",
    paragraph_1: "At HEVANIYA, we believe that a venue is more than just a location; it is the canvas upon which life's most beautiful memories are painted.",
    paragraph_2: "Founded with a vision to redefine luxury celebrations, we offer access to exclusive, nature-immersed plots that blend breathtaking scenery with seamless hospitality. Every project we undertake is a testament to our commitment to environmental harmony and architectural elegance.",
    feature_1_title: "Artistic Vision",
    feature_1_desc: "Every detail is curated to create a visually stunning experience.",
    feature_2_title: "Heritage",
    feature_2_desc: "Decades of expertise in managing high-end destination events.",
    image_url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
};

const DEFAULT_STATS = [
    { label: "Years of Experience", value: "25+", icon_name: "Award" },
    { label: "Events Hosted", value: "150+", icon_name: "Calendar" },
    { label: "Industry Awards", value: "40+", icon_name: "Star" },
];

const DEFAULT_VALUES = [
    {
        title: "Uncompromising Quality",
        description: "We set the highest standards for every event, ensuring excellence in every detail from decor to service.",
        icon_name: "Target",
    },
    {
        title: "Nature Integrated",
        description: "Our venues are designed to harmoniously blend with their natural surroundings, preserving the beauty of nature.",
        icon_name: "Leaf",
    },
    {
        title: "Client-Centric",
        description: "We put our clients at the heart of everything we do, crafting experiences that reflect their unique personality.",
        icon_name: "Heart",
    },
];

const DEFAULT_TEAM = [
    {
        name: "Mukund Sharma",
        role: "Founder & Creative Director",
        image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
        bio: "With over 20 years in luxury event management, Mukund brings a unique vision of elegance and nature-integrated celebrations.",
    },
    {
        name: "Aisha Verma",
        role: "Head of Event Planning",
        image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
        bio: "Aisha transforms complex logistical challenges into seamless, unforgettable experiences for our most discerning clients.",
    },
    {
        name: "David Ross",
        role: "Venue Curator",
        image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        bio: "David's keen eye for breathtaking locations ensures that every HEVANIYA plot offers a unique and majestic backdrop.",
    },
];

const DEFAULT_CTA = {
    tag: "Start Your Story",
    heading: "Ready to Create\nYour Legacy?",
    button_primary: "Enquire Now",
    button_secondary: "View Portfolios",
    image_url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop",
};

export default async function AboutPage() {
    let sectionRows: any[] = [];
    try {
        const { data, error } = await supabaseServer
            .from("section_content")
            .select("*")
            .in("section", [
                "about_hero",
                "about_philosophy",
                "about_stats",
                "about_values",
                "about_team",
                "about_cta",
            ])
            .order("created_at", { ascending: true });

        if (!error && data) {
            sectionRows = data;
        }
    } catch (err) {
        console.error("Error fetching about page CMS data:", err);
    }

    // Group rows by section
    const grouped: Record<string, any[]> = {
        about_hero: [],
        about_philosophy: [],
        about_stats: [],
        about_values: [],
        about_team: [],
        about_cta: [],
    };

    sectionRows.forEach(row => {
        if (grouped[row.section]) {
            grouped[row.section].push(row.content_json);
        }
    });

    // 1. Hero
    const rawHero = grouped.about_hero[0] || {};
    const hero = {
        subtitle: rawHero.subtitle || DEFAULT_HERO.subtitle,
        heading: rawHero.heading || DEFAULT_HERO.heading,
        description: rawHero.description || DEFAULT_HERO.description,
        side_text: rawHero.side_text || DEFAULT_HERO.side_text,
        image_url: rawHero.image_url || DEFAULT_HERO.image_url,
    };

    // 2. Philosophy
    const rawPhil = grouped.about_philosophy[0] || {};
    const philosophy = {
        tag: rawPhil.tag || DEFAULT_PHILOSOPHY.tag,
        heading: rawPhil.heading || DEFAULT_PHILOSOPHY.heading,
        quote: rawPhil.quote || DEFAULT_PHILOSOPHY.quote,
        mantra: rawPhil.mantra || DEFAULT_PHILOSOPHY.mantra,
        paragraph_1: rawPhil.paragraph_1 || DEFAULT_PHILOSOPHY.paragraph_1,
        paragraph_2: rawPhil.paragraph_2 || DEFAULT_PHILOSOPHY.paragraph_2,
        feature_1_title: rawPhil.feature_1_title || DEFAULT_PHILOSOPHY.feature_1_title,
        feature_1_desc: rawPhil.feature_1_desc || DEFAULT_PHILOSOPHY.feature_1_desc,
        feature_2_title: rawPhil.feature_2_title || DEFAULT_PHILOSOPHY.feature_2_title,
        feature_2_desc: rawPhil.feature_2_desc || DEFAULT_PHILOSOPHY.feature_2_desc,
        image_url: rawPhil.image_url || DEFAULT_PHILOSOPHY.image_url,
    };

    // 3. Stats
    const stats = grouped.about_stats.length > 0
        ? grouped.about_stats.map((item, idx) => ({
            value: item.value || DEFAULT_STATS[idx]?.value || "",
            label: item.label || DEFAULT_STATS[idx]?.label || "",
            icon_name: item.icon_name || DEFAULT_STATS[idx]?.icon_name || "Award",
        }))
        : DEFAULT_STATS;

    // 4. Values
    const values = grouped.about_values.length > 0
        ? grouped.about_values.map((item, idx) => ({
            title: item.title || DEFAULT_VALUES[idx]?.title || "",
            description: item.description || DEFAULT_VALUES[idx]?.description || "",
            icon_name: item.icon_name || DEFAULT_VALUES[idx]?.icon_name || "Target",
        }))
        : DEFAULT_VALUES;

    // 5. Team
    const team = grouped.about_team.length > 0
        ? grouped.about_team.map((item, idx) => ({
            name: item.name || DEFAULT_TEAM[idx]?.name || "",
            role: item.role || DEFAULT_TEAM[idx]?.role || "",
            bio: item.bio || DEFAULT_TEAM[idx]?.bio || "",
            image_url: item.image_url || DEFAULT_TEAM[idx]?.image_url || "",
        }))
        : DEFAULT_TEAM;

    // 6. CTA
    const rawCta = grouped.about_cta[0] || {};
    const cta = {
        tag: rawCta.tag || DEFAULT_CTA.tag,
        heading: rawCta.heading || DEFAULT_CTA.heading,
        button_primary: rawCta.button_primary || DEFAULT_CTA.button_primary,
        button_secondary: rawCta.button_secondary || DEFAULT_CTA.button_secondary,
        image_url: rawCta.image_url || DEFAULT_CTA.image_url,
    };

    return (
        <AboutClient
            hero={hero}
            philosophy={philosophy}
            stats={stats}
            values={values}
            team={team}
            cta={cta}
        />
    );
}
