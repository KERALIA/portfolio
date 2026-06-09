import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rate-limit';

function logEvent(event: string, meta: Record<string, unknown>) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    event,
    ...meta,
  }));
}

function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')   // strip HTML tags (XSS)
    .replace(/['";\\]/g, '')    // strip SQL special chars
    .trim();
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported media type' }, { status: 415 });
  }

 const origin = req.headers.get('origin') ?? '';
  
  // Clean up origin (remove trailing slash if it exists)
  const cleanOrigin = origin.replace(/\/$/, '');
  
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? '',
    'http://localhost:3000',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : ''
  ];

  // Check if the clean origin matches any of our allowed origins
  const isAllowed = allowedOrigins.some(o => o !== '' && cleanOrigin === o);

  if (!isAllowed) {
    // We add a console.log here so if it ever fails again, it will explicitly tell us WHY in Vercel Logs!
    console.log(`SECURITY BLOCK: Origin '${cleanOrigin}' not found in allowed list:`, allowedOrigins);
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 16);

  const { allowed, remaining, resetIn } = checkRateLimit(ipHash);

  if (!allowed) {
    logEvent('RATE_LIMIT_HIT', { ipHash, path: '/api/contact' });
    return NextResponse.json(
      { error: `Too many requests. Try again in ${resetIn}s.` },
      {
        status: 429,
        headers: {
          'Retry-After': String(resetIn),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const cleanName = sanitize(body.name ?? '');
  const cleanEmail = sanitize(body.email ?? '').toLowerCase();
  const cleanMsg = sanitize(body.message ?? '');

  if (!cleanName || cleanName.length > 100) {
    logEvent('VALIDATION_FAILED', { reason: 'invalid_name', ipHash });
    return NextResponse.json(
      { success: false, error: 'Invalid name.' },
      { status: 400 }
    );
  }

  if (!emailRe.test(cleanEmail)) {
    logEvent('VALIDATION_FAILED', { reason: 'invalid_email', ipHash });
    return NextResponse.json(
      { success: false, error: 'Invalid email.' },
      { status: 400 }
    );
  }

  if (!cleanMsg || cleanMsg.length > 2000) {
    logEvent('VALIDATION_FAILED', { reason: 'invalid_message', ipHash });
    return NextResponse.json(
      { success: false, error: 'Invalid message.' },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from('contact_messages').insert({
      name: cleanName,
      email: cleanEmail,
      message: cleanMsg,
      ip_hash: ipHash,
    });

    if (error) {
      logEvent('DB_ERROR', { error: error.message, path: '/api/contact' });
      return NextResponse.json(
        { success: false, error: 'Server error.' },
        { status: 500 }
      );
    }
  } catch (err: any) {
    logEvent('DB_ERROR', { error: err.message, path: '/api/contact' });
    return NextResponse.json(
      { success: false, error: 'Server error.' },
      { status: 500 }
    );
  }

  logEvent('CONTACT_SAVED', { ipHash });
  return NextResponse.json({ success: true, message: 'Message sent!' });
}
