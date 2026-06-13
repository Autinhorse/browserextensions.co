import type {MetadataRoute} from 'next';
import {products} from '@/lib/products';
import {getAllPostSlugs} from '@/lib/blog';
import {getAllGuideSlugs} from '@/lib/guides';
import {getDocProducts, getDocSlugs} from '@/lib/docs';

const SITE_URL = 'https://browserextensions.co';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    '',
    '/about',
    '/feedback',
    '/docs',
    '/guides',
    '/blog',
    '/privacy',
    '/privacy/ai-chat-snapper',
    '/terms',
  ];
  const productPaths = products.map((product) => `/products/${product.slug}`);
  const blogPaths = getAllPostSlugs().map((slug) => `/blog/${slug}`);
  const guidePaths = getAllGuideSlugs().map((slug) => `/guides/${slug}`);
  const docPaths = getDocProducts().flatMap((product) =>
    getDocSlugs(product).map((slug) => `/docs/${product}/${slug}`),
  );

  return [
    ...staticPaths,
    ...productPaths,
    ...blogPaths,
    ...guidePaths,
    ...docPaths,
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));
}
