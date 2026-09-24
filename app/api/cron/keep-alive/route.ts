import { supabaseServer } from '@/lib/supabaseServer';

export const runtime = 'edge';

// This route is called automatically by Vercel Cron (see vercel.json).
// It pings Supabase to reset the 7-day free-tier inactivity timer.
export async function GET(request: Request) {
  const timestamp = new Date().toISOString();

  // Security: only allow requests from Vercel's cron runner
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Perform a lightweight query — just fetch 1 row from any table
    const { error } = await supabaseServer
      .from('leads')
      .select('id')
      .limit(1);

    if (error) {
      console.error('[keep-alive] Supabase query error:', error.message);
      return new Response(
        JSON.stringify({ ok: false, timestamp, error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[keep-alive] ✅ Supabase pinged successfully at ${timestamp}`);
    return new Response(
      JSON.stringify({ ok: true, timestamp, message: 'Supabase keep-alive ping sent.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[keep-alive] Unexpected error:', message);
    return new Response(
      JSON.stringify({ ok: false, timestamp, error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
