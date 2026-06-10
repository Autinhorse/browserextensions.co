import {NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';
import {
  normalizeFeedbackApp,
  normalizeFeedbackPlatform,
  normalizeFeedbackType,
} from '@/lib/feedback-options';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const VERSION_RE = /^[a-zA-Z0-9._-]{0,40}$/;
const MAX_FILE_COUNT = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const STORAGE_BUCKET = 'feedback-attachments';

function text(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

async function hashIp(value: string) {
  const salt = process.env.FEEDBACK_IP_HASH_SALT;
  if (!salt || !value) return null;

  const bytes = new TextEncoder().encode(`${salt}:${value}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function displayFileName(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 200) || 'attachment';
}

function fileExtension(value: string) {
  const match = value.match(/\.([a-zA-Z0-9]{1,12})$/);
  return match ? `.${match[1].toLowerCase()}` : '';
}

async function readPayload(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    return {
      payload: {
        type: form.get('type'),
        app: form.get('app'),
        version: form.get('version'),
        lang: form.get('lang'),
        platform: form.get('platform'),
        email: form.get('email'),
        title: form.get('title'),
        message: form.get('message'),
        pageUrl: form.get('pageUrl'),
        issueUrl: form.get('issueUrl'),
      },
      files: form
        .getAll('attachments')
        .filter((value): value is File => value instanceof File && value.size > 0),
    };
  }

  const body = await request.json();
  return {
    payload: body && typeof body === 'object' ? (body as Record<string, unknown>) : null,
    files: [],
  };
}

export async function POST(request: Request) {
  let parsed: Awaited<ReturnType<typeof readPayload>>;
  try {
    parsed = await readPayload(request);
  } catch {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  if (!parsed.payload) {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  const {payload, files} = parsed;
  const title = text(payload.title, 200);
  const message = text(payload.message, 6000);
  const email = text(payload.email, 320);
  const version = text(payload.version, 40);

  if (title.length < 2 || message.length < 10) {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  if (version && !VERSION_RE.test(version)) {
    return NextResponse.json({error: 'invalid'}, {status: 400});
  }

  if (files.length > MAX_FILE_COUNT || files.some((file) => file.size > MAX_FILE_SIZE)) {
    return NextResponse.json({error: 'file-too-large'}, {status: 400});
  }

  const ip = text(
    request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip'),
    200,
  );

  const record = {
    type: normalizeFeedbackType(payload.type),
    app: normalizeFeedbackApp(payload.app),
    version: version || null,
    lang: text(payload.lang, 20) || null,
    platform: normalizeFeedbackPlatform(payload.platform) || null,
    email: email || null,
    title,
    message,
    page_url: text(payload.pageUrl, 2000) || null,
    issue_url: text(payload.issueUrl, 2000) || null,
    user_agent: text(request.headers.get('user-agent'), 1000) || null,
    referrer: text(request.headers.get('referer'), 2000) || null,
    ip_hash: await hashIp(ip),
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    const supabase = createClient(url, key, {db: {schema: 'browserext'}});
    const {data, error} = await supabase
      .from('feedback')
      .insert(record)
      .select('id')
      .single();
    if (error) {
      console.error('[feedback] Supabase insert failed:', error);
      return NextResponse.json({error: 'db'}, {status: 500});
    }

    if (files.length > 0) {
      const attachments = [];
      for (const file of files) {
        const originalName = displayFileName(file.name);
        const storagePath = `${data.id}/${crypto.randomUUID()}${fileExtension(file.name)}`;
        const {error: uploadError} = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(storagePath, file, {
            contentType: file.type || 'application/octet-stream',
            upsert: false,
          });

        if (uploadError) {
          console.error('[feedback] Supabase upload failed:', uploadError);
          return NextResponse.json({error: 'upload'}, {status: 500});
        }

        attachments.push({
          feedback_id: data.id,
          storage_bucket: STORAGE_BUCKET,
          storage_path: storagePath,
          original_filename: originalName,
          content_type: file.type || null,
          size_bytes: file.size,
        });
      }

      const {error: attachmentError} = await supabase
        .from('feedback_attachments')
        .insert(attachments);
      if (attachmentError) {
        console.error('[feedback] Attachment insert failed:', attachmentError);
        return NextResponse.json({error: 'db'}, {status: 500});
      }
    }
  } else {
    console.warn('[feedback] Supabase not configured; feedback not stored:', {
      record,
      attachments: files.map((file) => ({name: file.name, size: file.size, type: file.type})),
    });
  }

  return NextResponse.json({ok: true});
}
