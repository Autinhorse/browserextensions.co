import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {getDoc, getDocNav, getDocProducts, getDocSlugs} from '@/lib/docs';
import {getProduct} from '@/lib/products';
import {Markdown} from '@/components/markdown';
import {DocsSidebar} from '@/components/docs-sidebar';

const SITE_URL = 'https://browserextensions.co';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getDocProducts().flatMap((product) =>
      getDocSlugs(product).map((slug) => ({locale, product, slug})),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; product: string; slug: string}>;
}): Promise<Metadata> {
  const {product, slug} = await params;
  const doc = getDoc(product, slug);
  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    alternates: {canonical: `/docs/${product}/${slug}`},
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{locale: string; product: string; slug: string}>;
}) {
  const {locale, product, slug} = await params;
  setRequestLocale(locale);

  const doc = getDoc(product, slug);
  if (!doc) {
    notFound();
  }

  const t = await getTranslations('Docs');
  const tp = await getTranslations('Products');
  const groups = getDocNav(product);
  const productMeta = getProduct(product);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: doc.title,
    description: doc.description,
    mainEntityOfPage: `${SITE_URL}/docs/${product}/${slug}`,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      <div className="mb-8 text-sm text-muted">
        <Link href="/docs" className="transition hover:text-foreground">
          {t('title')}
        </Link>
        <span className="px-2" aria-hidden>
          /
        </span>
        <Link
          href={`/docs/${product}`}
          className="transition hover:text-foreground"
        >
          {productMeta ? tp(`${product}.name`) : product}
        </Link>
      </div>

      <div className="gap-10 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="mb-10 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <DocsSidebar
              product={product}
              groups={groups}
              currentSlug={slug}
            />
          </div>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <header>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {doc.group}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {doc.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{doc.description}</p>
          </header>
          <div className="mt-10">
            <Markdown content={doc.content} />
          </div>
        </article>
      </div>
    </div>
  );
}
