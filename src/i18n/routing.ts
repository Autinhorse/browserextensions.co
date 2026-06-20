import {defineRouting} from 'next-intl/routing';

export const locales = ['en', 'fr', 'es', 'ru', 'zh', 'ja', 'ko', 'ar'] as const;
export type Locale = (typeof locales)[number];

/** Human-readable names shown in the language switcher (each in its own language). */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
};

/** Locales that render right-to-left. */
export const rtlLocales: Locale[] = ['ar'];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  // Default locale (en) stays unprefixed (`/`); others are prefixed (`/fr`, `/ar`).
  localePrefix: 'as-needed',
});
