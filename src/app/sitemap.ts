import type {MetadataRoute} from 'next';
import {products} from '@/lib/products';
import {getAllPostSlugs} from '@/lib/blog';

const SITE_URL = 'https://browserextensions.co';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    '',
    '/feedback',
    '/blog',
    '/privacy',
    '/privacy/ai-chat-snapper',
    '/terms',
  ];
  const productPaths = products.map((product) => `/products/${product.slug}`);
  const blogPaths = getAllPostSlugs().map((slug) => `/blog/${slug}`);

  return [...staticPaths, ...productPaths, ...blogPaths].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));
}
