import {NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';

const statuses = ['new', 'triaged', 'planned', 'closed'] as const;
type FeedbackStatus = (typeof statuses)[number];

function isStatus(value: unknown): value is FeedbackStatus {
  return typeof value === 'string' && statuses.includes(value as FeedbackStatus);
}

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

  const {data, error} = await supabase
    .from('feedback')
    .select(
      `
      id,
      type,
      app,
      version,
      lang,
      platform,
      email,
      title,
      message,
      page_url,
      issue_url,
      user_agent,
      referrer,
      status,
      created_at,
      feedback_attachments (
        id,
        storage_bucket,
        storage_path,
        original_filename,
        content_type,
        size_bytes,
        created_at
      )
    `,
    )
    .order('created_at', {ascending: false})
    .limit(100);

  if (error) {
    console.error('[admin feedback] list failed:', error);
    return NextResponse.json({error: 'db'}, {status: 500});
  }

  const items = await Promise.all(
    (data ?? []).map(async (item) => {
      const attachments = await Promise.all(
        (item.feedback_attachments ?? []).map(async (attachment) => {
          const {data: signed} = await supabase.storage
            .from(attachment.storage_bucket)
            .createSignedUrl(attachment.storage_path, 15 * 60);

          return {
            ...attachment,
            signed_url: signed?.signedUrl ?? null,
          };
        }),
      );

      return {
        ...item,
        feedback_attachments: attachments,
      };
    }),
  );

  return NextResponse.json({items});
}

export async function PATCH(request: Request) {
  if (!authOk(request)) {
    return NextResponse.json({error: 'unauthorized'}, {status: 401});
  }

  const supabase = serviceClient();
  if (!supabase) {
    return NextResponse.json({error: 'supabase-not-configured'}, {status: 500});
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  const {id, status} = body as Record<string, unknown>;
  if (typeof id !== 'string' || !isStatus(status)) {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  const {error} = await supabase.from('feedback').update({status}).eq('id', id);
  if (error) {
    console.error('[admin feedback] update failed:', error);
    return NextResponse.json({error: 'db'}, {status: 500});
  }

  return NextResponse.json({ok: true});
}
