import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ArrowRight} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {products} from '@/lib/products';
import {ProductCard} from '@/components/product-card';
import {WaitlistForm} from '@/components/waitlist-form';

const featureKeys = ['local', 'formats', 'privacy', 'fast'] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.18),transparent)]" />
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="inline-flex items-center rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted">
            {t('hero.badge')}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/#waitlist"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t('products.title')}</h2>
          <p className="mt-3 text-muted">{t('products.subtitle')}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
          {t('features.title')}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map((key) => (
            <div key={key}>
              <h3 className="font-semibold">{t(`features.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-muted">{t(`features.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="scroll-mt-20 border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight">{t('waitlist.title')}</h2>
          <p className="mt-3 max-w-xl text-muted">{t('waitlist.subtitle')}</p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </>
  );
}
