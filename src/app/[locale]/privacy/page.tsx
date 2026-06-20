import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {products} from '@/lib/products';
import {hasPrivacyPolicy} from '@/lib/privacy';

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
  const tp = await getTranslations('Products');

  const withPolicy = products.filter((p) => hasPrivacyPolicy(p.slug));
  const upcoming = products.filter((p) => !hasPrivacyPolicy(p.slug));

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </header>

      <div className="mt-10 space-y-8">
        <p className="leading-7 text-muted">{t('intro')}</p>

        <div className="space-y-4">
          {withPolicy.map((product) => (
            <Link
              key={product.slug}
              href={`/privacy/${product.slug}`}
              className="block rounded-lg border border-border bg-surface/40 p-5 transition hover:bg-surface"
            >
              <h2 className="text-lg font-semibold">{tp(`${product.slug}.name`)}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {tp(`${product.slug}.tagline`)}
              </p>
            </Link>
          ))}
        </div>

        {upcoming.length > 0 && (
          <p className="leading-7 text-muted">{t('comingSoon')}</p>
        )}
        <p className="leading-7 text-muted">{t('contact')}</p>
      </div>
    </article>
  );
}
