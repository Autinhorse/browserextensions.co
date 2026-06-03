import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';

const sectionKeys = [
  'acceptance',
  'products',
  'responsibility',
  'thirdParties',
  'availability',
  'paid',
  'intellectualProperty',
  'disclaimer',
  'liability',
  'changes',
  'contact',
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Terms'});

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Terms');

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <p className="text-sm text-muted">{t('updated')}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </header>

      <div className="mt-12 space-y-10">
        {sectionKeys.map((key) => (
          <section key={key}>
            <h2 className="text-xl font-semibold">
              {t(`sections.${key}.title`)}
            </h2>
            <p className="mt-3 leading-7 text-muted">
              {t(`sections.${key}.body`)}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
