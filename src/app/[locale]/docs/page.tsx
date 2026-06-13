import type {Metadata} from 'next';
import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getDocProducts, getFirstDoc} from '@/lib/docs';
import {getProduct} from '@/lib/products';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Docs'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {canonical: '/docs'},
  };
}

export default async function DocsLandingPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Docs');
  const tp = await getTranslations('Products');
  const products = getDocProducts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </header>

      {products.length === 0 ? (
        <p className="mt-10 text-muted">{t('empty')}</p>
      ) : (
        <div className="mt-10 space-y-4">
          {products.map((slug) => {
            const product = getProduct(slug);
            const first = getFirstDoc(slug);
            if (!first) return null;
            return (
              <Link
                key={slug}
                href={`/docs/${slug}`}
                className="flex items-center gap-4 rounded-lg border border-border bg-surface/40 p-6 transition hover:bg-surface"
              >
                {product && (
                  <Image
                    src={product.iconSrc}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">
                    {tp(`${slug}.name`)}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {tp(`${slug}.tagline`)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
