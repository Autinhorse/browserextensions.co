import {NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({email} = await request.json());
  } catch {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    const supabase = createClient(url, key);
    const {error} = await supabase.from('waitlist').insert({email});
    // 23505 = unique violation: email already on the list, treat as success.
    if (error && error.code !== '23505') {
      return NextResponse.json({error: 'db'}, {status: 500});
    }
  } else {
    // No Supabase configured yet (e.g. local dev): accept but don't persist.
    console.warn('[waitlist] Supabase not configured; email not stored:', email);
  }

  return NextResponse.json({ok: true});
}
