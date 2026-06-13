import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

const sectionKeys = ['mission', 'products', 'privacy', 'contact'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'About'});

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {canonical: '/about'},
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('About');
  const tNav = await getTranslations('Nav');

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
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

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/feedback"
          className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
        >
          {tNav('feedback')}
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-foreground/5"
        >
          {tNav('blog')}
        </Link>
      </div>
    </article>
  );
}
