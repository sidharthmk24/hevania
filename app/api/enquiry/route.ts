import { supabaseServer } from '@/lib/supabaseServer';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // 1. Validation (Basic)
        if (!data.name || !data.email) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // 2. Insert into Supabase 'leads' table
        const { error: dbError } = await supabaseServer
            .from('leads')
            .insert([
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone || null,
                    message: data.message || '',
                    venue: data.venue || 'General Enquiry'
                }
            ]);

        if (dbError) {
            console.error("Supabase Error:", dbError);
            return new Response(JSON.stringify({ error: "Failed to store enquiry" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        // 3. Integration with Google Apps Script Webhook (Optional)
        const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
        if (WEBHOOK_URL) {
            fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }).catch(e => console.error("Webhook Error:", e));
        }

        return new Response(JSON.stringify({ success: true, message: "Enquiry received" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Internal Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
