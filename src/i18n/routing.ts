import {defineRouting} from 'next-intl/routing';

export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];

/** Human-readable names shown in the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
};

/** Locales that render right-to-left. */
export const rtlLocales: Locale[] = [];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  // Keep locale-aware routing in place; add prefixed locales when translations exist.
  localePrefix: 'as-needed',
});
