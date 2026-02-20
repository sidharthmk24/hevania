import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// In a real app, you'd fetch this data based on the slug
const POST = {
    title: "The Future of Luxury Living: Sustainable & Smart",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2076&auto=format&fit=crop",
    date: "Oct 12, 2024",
    content: `
      <p class="mb-6">
        The definition of luxury is evolving. No longer just about opulence and grandeur, modern luxury is increasingly defined by sustainability, intelligence, and conscious living.
      </p>
      <p class="mb-6">
        Smart homes are becoming the norm, with integrated systems that control everything from lighting to climate, ensuring optimal comfort while minimizing energy consumption. 
        But beyond technology, there is a return to nature. Biophilic design—integrating natural elements into the built environment—is reshaping how we think about high-end interiors.
      </p>
      <h3 class="text-2xl font-serif my-6">Eco-Conscious Materials</h3>
      <p class="mb-6">
        From reclaimed wood to energy-efficient glass, the materials used in luxury construction are changing. 
        Homeowners are seeking properties that not only look beautiful but also leave a lighter footprint on the planet.
      </p>
      <p>
        At Mukund Realty, we are committed to this vision, curating properties that offer the pinnacle of comfort without compromising on our responsibility to the environment.
      </p>
    `
};

export default function BlogPost({ params }: { params: { slug: string } }) {
    // In a real app we would use params.slug to fetch data

    return (
        <div className="bg-cream min-h-screen text-dark-forest pt-32 pb-24 px-6">
            <article className="max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-dark-forest transition-colors mb-8 uppercase tracking-wider">
                    <ArrowLeft size={16} /> Back to Journal
                </Link>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8">
                    {POST.title}
                </h1>

                <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider text-gray-500 mb-8 border-y border-gray-200 py-4">
                    <span>{POST.date}</span>
                    <span className="w-1 h-1 bg-muted-gold rounded-full" />
                    <span>Mukund Realty</span>
                    <span className="w-1 h-1 bg-muted-gold rounded-full" />
                    <span>5 Min Read</span>
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-12 shadow-lg">
                    <Image
                        src={POST.image}
                        alt={POST.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div
                    className="prose prose-lg prose-headings:font-serif prose-p:text-gray-600 prose-p:font-light prose-a:text-muted-gold hover:prose-a:text-dark-forest max-w-none"
                    dangerouslySetInnerHTML={{ __html: POST.content }}
                />
            </article>
        </div>
    );
}
