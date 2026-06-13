import {notFound, redirect} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getDocProducts, getFirstDoc} from '@/lib/docs';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getDocProducts().map((product) => ({locale, product})),
  );
}

/** A product's docs root redirects to its first page (lowest order). */
export default async function ProductDocsPage({
  params,
}: {
  params: Promise<{locale: string; product: string}>;
}) {
  const {product} = await params;
  const first = getFirstDoc(product);
  if (!first) {
    notFound();
  }
  redirect(`/docs/${product}/${first.slug}`);
}
