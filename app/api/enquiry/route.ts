export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // 1. Validation (Basic)
        if (!data.name || !data.email || !data.phone) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // 2. Integration with Google Apps Script Webhook
        // NOTE: The user needs to provide the WEBHOOK_URL. 
        // If not provided, we'll simulate a success for the demo.
        const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

        if (WEBHOOK_URL) {
            await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } else {
            console.log("Mock Submission:", data);
        }

        return new Response(JSON.stringify({ success: true, message: "Enquiry received" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
