import {NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';

function authOk(request: Request) {
  const expected = process.env.FEEDBACK_ADMIN_TOKEN;
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  return Boolean(expected && token && token === expected);
}

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {db: {schema: 'browserext'}});
}

export async function GET(request: Request) {
  if (!authOk(request)) {
    return NextResponse.json({error: 'unauthorized'}, {status: 401});
  }

  const supabase = serviceClient();
  if (!supabase) {
    return NextResponse.json({error: 'supabase-not-configured'}, {status: 500});
  }

  const {data, error, count} = await supabase
    .from('waitlist')
    .select('id, email, source, created_at', {count: 'exact'})
    .order('created_at', {ascending: false})
    .limit(1000);

  if (error) {
    console.error('[admin waitlist] list failed:', error);
    return NextResponse.json({error: 'db'}, {status: 500});
  }

  return NextResponse.json({items: data ?? [], count: count ?? data?.length ?? 0});
}
