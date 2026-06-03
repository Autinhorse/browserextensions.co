'use client';

import {useTransition} from 'react';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {locales, localeNames, type Locale} from '@/i18n/routing';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Nothing to switch between while the site is single-language.
  if (locales.length < 2) return null;

  return (
    <select
      aria-label="Language"
      defaultValue={locale}
      disabled={isPending}
      onChange={(event) => {
        const next = event.target.value as Locale;
        startTransition(() => {
          router.replace(pathname, {locale: next});
        });
      }}
      className="cursor-pointer rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-muted outline-none transition hover:text-foreground"
    >
      {locales.map((value) => (
        <option key={value} value={value} className="bg-surface text-foreground">
          {localeNames[value]}
        </option>
      ))}
    </select>
  );
}
