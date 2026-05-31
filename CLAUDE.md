# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The marketing + product hub for **browserextensions.co**: a single site that
showcases a growing suite of browser extensions (currently Web Snapper, AI Chat
Snapper, Review Snapper) and will later host Pro plans, accounts, and feedback.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (config lives in `src/app/globals.css` via `@theme`)
- **next-intl** for i18n. Start with English; add fr, es, ru, zh, ja, ko, and ar (RTL) later.
- **Supabase** for data (waitlist now; auth + Pro/licensing later)
- Deploy target: **Vercel**

## Layout

```
messages/<locale>.json      UI copy. en.json is the source of truth.
src/i18n/                    routing, navigation, request config
src/middleware.ts           next-intl locale routing
src/app/[locale]/           all pages live under the locale segment
  layout.tsx                root <html>; sets lang + dir (rtl when needed)
  page.tsx                  home (hero, products, features, waitlist)
  products/[slug]/page.tsx  per-product page (statically generated)
src/app/api/waitlist/       email capture endpoint -> Supabase
src/components/              UI components
src/lib/products.ts         product registry (slug, icon, status, accent)
src/lib/supabase/           browser + server Supabase clients
supabase/schema.sql         database schema
```

## Conventions

- Add a product: add an entry to `src/lib/products.ts` and a matching block
  under `Products.<slug>` in every `messages/*.json`.
- All copy goes through next-intl; no hardcoded user-facing strings.
- Default locale (`en`) is unprefixed (`/`). Add prefixed locales (`/fr`, `/ar`) later.
- Use the `Link`/navigation helpers from `@/i18n/navigation`, not `next/link`.
- Pages that `await params` must use `getTranslations` (async), not the
  `useTranslations` hook; call `setRequestLocale(locale)` for static rendering.

## Commands

- `npm run dev`: dev server
- `npm run build`: production build
- `npm run lint`: eslint

## Not built yet (roadmap)

Pricing/Pro checkout (Paddle or Lemon Squeezy, merchant of record), user
accounts + license keys (Supabase Auth), blog/changelog (MDX), full
translations for the 7 non-English locales.
