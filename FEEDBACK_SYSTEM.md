# Feedback System Notes

Last updated: 2026-06-03

## Current Status

The site has a feedback system for bug reports and feature requests.

User entry:

```text
/feedback
```

Example extension links:

```text
/feedback?type=feature&app=aichatsnapper&v=0.17.13&lang=zh
/feedback?type=bug&app=aichatsnapper&v=0.17.13&platform=chatgpt&lang=zh
```

Admin entry:

```text
/admin/feedback
```

The admin page asks for `FEEDBACK_ADMIN_TOKEN`.

## Implemented Features

- Feedback page for bug reports and feature requests.
- Query param prefill:
  - `type=bug|feature`
  - `app=aichatsnapper|websnapper|reviewsnapper`
  - `v=<version>`
  - `platform=chatgpt|gemini|claude|grok|mistral|doubao|qianwen|kimi|perplexity|deepseek`
  - `lang=zh` switches the feedback form copy to Chinese.
- Related URL field for the page where the issue or requirement applies.
- Optional email field.
- Attachment upload:
  - Up to 5 files.
  - Up to 10 MB each.
  - Intended for saved HTML, screenshots, generated/exported files, or error files.
  - UI asks users to upload only when files do not contain private data.
- Supabase persistence:
  - `feedback` stores the main report.
  - `feedback_attachments` stores attachment metadata.
  - `feedback-attachments` private Storage bucket stores uploaded files.
- Storage paths use UUID-only ASCII names to avoid Supabase Storage key errors with Chinese or special filenames.
- Original filenames are preserved in `feedback_attachments.original_filename`.
- Admin page can:
  - List latest feedback.
  - View related URL and submitter browser metadata.
  - Open attachment signed URLs.
  - Update status: `new`, `triaged`, `planned`, `closed`.

## Key Files

```text
src/app/[locale]/feedback/page.tsx
src/components/feedback-form.tsx
src/app/api/feedback/route.ts
src/lib/feedback-options.ts

src/app/[locale]/admin/feedback/page.tsx
src/components/feedback-admin.tsx
src/app/api/admin/feedback/route.ts

supabase/schema.sql
.env.example
src/proxy.ts
src/i18n/routing.ts
```

## Supabase Setup

Create a Supabase project, then run the full SQL in:

```text
supabase/schema.sql
```

It creates or updates:

```text
public.waitlist
public.feedback
public.feedback_attachments
storage bucket: feedback-attachments
```

The bucket is private. API routes use the server-side service role key to insert rows, upload files, and create short-lived signed URLs.

## Environment Variables

Local `.env.local` and production hosting must include:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
FEEDBACK_ADMIN_TOKEN=
FEEDBACK_IP_HASH_SALT=
```

Notes:

- `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed in browser code.
- `FEEDBACK_ADMIN_TOKEN` is the password/token for `/admin/feedback`; it is not a Supabase password.
- `FEEDBACK_IP_HASH_SALT` is used to hash IPs when available. It can be any long random string.

## Local Testing

Start local server:

```bash
npm run dev
```

Feedback page:

```text
http://127.0.0.1:3000/feedback?type=bug&app=aichatsnapper&v=0.17.13&platform=chatgpt&lang=zh
```

Admin page:

```text
http://127.0.0.1:3000/admin/feedback
```

API sanity checks that were run successfully:

```text
/feedback returns 200
/admin/feedback returns 200
/api/admin/feedback without token returns 401
multipart /api/feedback submit returns 200
Chinese filename attachment upload returns 200
npm run lint passes
npm run build passes
```

## Known Notes

- If feedback succeeds without Supabase configured, local API logs a warning and does not persist data.
- If an attachment upload fails with `Invalid key`, check that `src/app/api/feedback/route.ts` still uses UUID storage paths rather than raw filenames.
- If SQL was run before `issue_url` existed, rerun `supabase/schema.sql`; it includes `alter table public.feedback add column if not exists issue_url text`.
- Current admin auth is a simple bearer token. For stronger security, consider Supabase Auth, GitHub OAuth, or another real login layer later.

## Suggested Next Steps

1. Confirm test rows in Supabase Table Editor:
   - `feedback`
   - `feedback_attachments`
2. Confirm files exist in private Storage bucket:
   - `feedback-attachments`
3. Open `/admin/feedback`, enter `FEEDBACK_ADMIN_TOKEN`, and confirm attachment signed URLs download.
4. Deploy to production and configure the same env vars in the hosting provider.
5. Consider adding filters/search to the admin page once real feedback volume grows.
