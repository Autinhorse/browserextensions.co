import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Privacy'});

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Privacy');

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </header>

      <div className="mt-10 space-y-8">
        <p className="leading-7 text-muted">{t('intro')}</p>

        <Link
          href="/privacy/ai-chat-snapper"
          className="block rounded-lg border border-border bg-surface/40 p-5 transition hover:bg-surface"
        >
          <h2 className="text-lg font-semibold">{t('aiChatSnapper.title')}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {t('aiChatSnapper.description')}
          </p>
        </Link>

        <p className="leading-7 text-muted">{t('comingSoon')}</p>
        <p className="leading-7 text-muted">{t('contact')}</p>
      </div>
    </article>
  );
}
