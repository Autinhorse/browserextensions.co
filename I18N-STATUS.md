# i18n status

Tracks which pages are fully translated, which only have a localized shell, and
which are still English-only. **When you add or change a page, update the table
below.** We batch the actual translation work (see "Pending upgrades") and run it
periodically rather than per-page.

## Setup (done)

- Locales enabled in `src/i18n/routing.ts`: `en` (default, unprefixed), `fr`, `es`,
  `ru`, `zh`, `ja`, `ko`, `ar` (RTL).
- UI copy lives in `messages/<locale>.json`; `en.json` is the source of truth.
  Missing keys fall back to English (`src/i18n/request.ts`).
- The language switcher (`src/components/locale-switcher.tsx`) auto-shows once
  `locales.length >= 2`. RTL (`dir`) is set automatically for `ar` in the layout.
- **Global chrome** — header, nav, footer, locale switcher, 404 — is fully
  localized on every page via `messages`.

## Legend

- ✅ **Full** — all 8 locales, content comes from `messages/*.json`.
- ⚠️ **Shell only** — page chrome is localized, but embedded list items / labels
  pulled from content files (MDX frontmatter) are still English.
- ❌ **Body English** — page shell is localized, but the main body is English
  MDX/Markdown. Needs content localization (a separate, larger effort).
- 🔶 **Custom / partial** — localized by an ad-hoc mechanism, not `messages`;
  should be migrated to next-intl.
- ➖ **N/A** — internal/admin page, not intended for public localization.

## Pages

| Route | File (`src/app/[locale]/…`) | Content source | Status |
|---|---|---|---|
| `/` (home) | `page.tsx` | `messages` | ✅ Full |
| `/products/[slug]` | `products/[slug]/page.tsx` | `messages` | ✅ Full |
| `/privacy` (index) | `privacy/page.tsx` | `messages` | ✅ Full |
| `/terms` | `terms/page.tsx` | `messages` | ✅ Full |
| `/about` | `about/page.tsx` | `messages` | ✅ Full |
| 404 | `not-found` | `messages` | ✅ Full |
| `/docs` (index) | `docs/page.tsx` | `messages` + doc list | ⚠️ Shell only (list titles are English MDX) |
| `/docs/[product]` (index) | `docs/[product]/page.tsx` | `messages` + list | ⚠️ Shell only |
| `/guides` (index) | `guides/page.tsx` | `messages` + list | ⚠️ Shell only |
| `/blog` (index) | `blog/page.tsx` | `messages` + list | ⚠️ Shell only |
| `/privacy/[product]` (ai-chat-snapper, web-snapper) | `privacy/[product]/page.tsx` | per-product Markdown (see `src/lib/privacy.ts`) | ❌ Body English (bilingual sources are stripped to English) |
| `/docs/[product]/[slug]` | `docs/[product]/[slug]/page.tsx` | MDX | ❌ Body English |
| `/guides/[slug]` | `guides/[slug]/page.tsx` | MDX | ❌ Body English |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | MDX | ❌ Body English |
| `/feedback` | `feedback/page.tsx` | hardcoded `en`/`zh` ternary | 🔶 Custom — only EN + ZH, not via `messages` |
| `/admin/feedback` | `admin/feedback/page.tsx` | hardcoded English | ➖ N/A (internal) |
| `/admin/waitlist` | `admin/waitlist/page.tsx` | hardcoded English | ➖ N/A (internal) |

## Pending upgrades (do in a batch later)

1. **Content localization (❌ Body English).** Translate the MDX under
   `content/docs`, `content/guides`, `content/blog`, plus `privacy-policy.md`,
   into the 7 non-English locales. Largest item; content is still changing often,
   so hold until it stabilizes.
2. **List metadata (⚠️ Shell only).** Localize titles/excerpts that the index
   pages read from MDX frontmatter (depends on #1 / a per-locale content scheme).
3. **`/feedback` (🔶).** Migrate the hardcoded `en`/`zh` strings to a
   `Feedback` namespace in `messages/*.json` so it covers all 8 locales.
   - Stale key: `Privacy.comingSoon` was reworded in `en.json` (no longer names
     Web Snapper, which has launched); the 7 non-English copies still name it.
     Re-translate in the next batch.
4. **SEO.** `src/app/sitemap.ts` does not yet emit per-locale URLs / `hreflang`
   alternates — add when content localization lands.

## How to update this file

- New page whose copy comes from `messages/*.json` → add a row, mark ✅.
- New page that renders MDX/Markdown body → add a row, mark ❌, and list its
  content path under "Pending upgrades."
- Internal/admin page → mark ➖.
