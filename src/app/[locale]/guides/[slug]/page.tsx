import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ArrowLeft} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {formatUpdated, getAllGuideSlugs, getGuide} from '@/lib/guides';
import {Markdown} from '@/components/markdown';

const SITE_URL = 'https://browserextensions.co';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllGuideSlugs().map((slug) => ({locale, slug})),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: {canonical: `/guides/${slug}`},
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}/guides/${slug}`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const guide = getGuide(slug);
  if (!guide) {
    notFound();
  }

  const t = await getTranslations('Guides');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    ...(guide.updated ? {dateModified: guide.updated} : {}),
    mainEntityOfPage: `${SITE_URL}/guides/${slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      <Link
        href="/guides"
        className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t('backToGuides')}
      </Link>

      <header className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1>
        <p className="mt-4 text-lg text-muted">{guide.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span>{t('readingTime', {minutes: guide.readingMinutes})}</span>
          {guide.updated && (
            <>
              <span aria-hidden>·</span>
              <time dateTime={guide.updated}>
                {t('updated', {date: formatUpdated(guide.updated)})}
              </time>
            </>
          )}
        </div>
      </header>

      <div className="mt-10">
        <Markdown content={guide.content} />
      </div>
    </article>
  );
}
