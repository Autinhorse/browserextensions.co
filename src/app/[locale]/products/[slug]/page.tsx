import Image from 'next/image';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {products, getProduct} from '@/lib/products';
import {routing} from '@/i18n/routing';
import {WaitlistForm} from '@/components/waitlist-form';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({locale, slug: product.slug})),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const t = await getTranslations({locale, namespace: 'Products'});
  return {
    title: t(`${slug}.name`),
    description: t(`${slug}.tagline`),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const product = getProduct(slug);
  if (!product) {
    notFound();
  }

  const t = await getTranslations('Products');
  const tw = await getTranslations('Home.waitlist');
  const featureNumbers = [1, 2, 3] as const;

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.15),transparent)]" />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center">
            <Image
              src={product.iconSrc}
              alt=""
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{t(`${slug}.name`)}</h1>
          <div className="mt-4">
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {t(`status.${product.status}`)}
            </span>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            {t(`${slug}.tagline`)}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            {t(`${slug}.description`)}
          </p>
          <div className="mt-8">
            {product.status === 'coming-soon' ? (
              <a
                href="#waitlist"
                className="inline-flex rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
              >
                {t('joinWaitlist')}
              </a>
            ) : product.chromeUrl ? (
              <a
                href={product.chromeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                {t('getExtension')}
              </a>
            ) : (
              <a
                href="#waitlist"
                className="inline-flex rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
              >
                {t('joinWaitlist')}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <h2 className="mb-12 text-center text-2xl font-bold">{t('featuresTitle')}</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {featureNumbers.map((n) => (
            <div
              key={n}
              className="rounded-2xl border border-border bg-surface/40 p-6"
            >
              <h3 className="font-semibold">{t(`${slug}.feature${n}Title`)}</h3>
              <p className="mt-2 text-sm text-muted">
                {t(`${slug}.feature${n}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="scroll-mt-20 border-t border-border/60">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold">{tw('title')}</h2>
          <p className="mt-3 max-w-xl text-muted">{tw('subtitle')}</p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </article>
  );
}
