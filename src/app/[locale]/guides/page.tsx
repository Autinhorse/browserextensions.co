import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getAllGuides} from '@/lib/guides';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Guides'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {canonical: '/guides'},
  };
}

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Guides');
  const guides = getAllGuides();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </header>

      {guides.length === 0 ? (
        <p className="mt-10 text-muted">{t('empty')}</p>
      ) : (
        <div className="mt-10 space-y-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block rounded-lg border border-border bg-surface/40 p-6 transition hover:bg-surface"
            >
              <h2 className="text-xl font-semibold">{guide.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
