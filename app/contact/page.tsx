import { supabaseServer } from "@/lib/supabaseServer";
import ContactClient, { ContactClientProps } from "./ContactClient";

export const dynamic = "force-dynamic";

const DEFAULT_INFO = {
    heading: "Reach Out\nto HEVANIYA",
    description: "Whether it's a new brief or a quick question, we'd love to hear from you.",
    query_label: "Alternatively for your Queries contact",
    phone: "+91 98765 43210",
    phone_tel: "+917990933700",
    email: "HEVANIYA@gmail.com",
};

const DEFAULT_MAP = {
    embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.472944065609!2d72.8465225!3d19.0176147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce9555555555%3A0x0!2zMTnCsDAxJzAzLjQiTiA3MsKwNTAnNDcuNSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    map_title: "HEVANIYA Estate",
};

export default async function ContactPage() {
    let contactInfo = { ...DEFAULT_INFO };
    let contactMap = { ...DEFAULT_MAP };

    try {
        const { data, error } = await supabaseServer
            .from("section_content")
            .select("*")
            .in("section", ["contact_info", "contact_map"])
            .order("created_at", { ascending: true });

        if (!error && data) {
            const infoRow = data.find(r => r.section === "contact_info");
            if (infoRow?.content_json) {
                contactInfo = {
                    heading: infoRow.content_json.heading || DEFAULT_INFO.heading,
                    description: infoRow.content_json.description || DEFAULT_INFO.description,
                    query_label: infoRow.content_json.query_label || DEFAULT_INFO.query_label,
                    phone: infoRow.content_json.phone || DEFAULT_INFO.phone,
                    phone_tel: infoRow.content_json.phone_tel || DEFAULT_INFO.phone_tel,
                    email: infoRow.content_json.email || DEFAULT_INFO.email,
                };
            }

            const mapRow = data.find(r => r.section === "contact_map");
            if (mapRow?.content_json) {
                contactMap = {
                    embed_url: mapRow.content_json.embed_url || DEFAULT_MAP.embed_url,
                    map_title: mapRow.content_json.map_title || DEFAULT_MAP.map_title,
                };
            }
        }
    } catch (err) {
        console.error("Error fetching contact page CMS data:", err);
    }

    return <ContactClient info={contactInfo} map={contactMap} />;
}
