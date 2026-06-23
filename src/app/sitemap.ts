import type {MetadataRoute} from 'next';
import {products} from '@/lib/products';
import {getAllPosts} from '@/lib/blog';
import {getAllGuides} from '@/lib/guides';
import {getDocProducts, getDocSlugs} from '@/lib/docs';
import {privacyDocs} from '@/lib/privacy';

const SITE_URL = 'https://browserextensions.co';

type Entry = {path: string; lastModified: Date};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths: Entry[] = [
    '',
    '/about',
    '/feedback',
    '/docs',
    '/guides',
    '/blog',
    '/privacy',
    '/terms',
    // Per-product privacy policies are derived from the registry so new
    // products show up automatically (see src/lib/privacy.ts).
    ...Object.keys(privacyDocs).map((slug) => `/privacy/${slug}`),
  ].map((path) => ({path, lastModified: now}));

  const productPaths: Entry[] = products.map((product) => ({
    path: `/products/${product.slug}`,
    lastModified: now,
  }));

  // Blog posts and guides carry real dates in frontmatter; use them so the
  // sitemap reports honest last-modified times instead of the build time.
  const blogPaths: Entry[] = getAllPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
  }));

  const guidePaths: Entry[] = getAllGuides().map((guide) => ({
    path: `/guides/${guide.slug}`,
    lastModified: guide.updated ? new Date(guide.updated) : now,
  }));

  const docPaths: Entry[] = getDocProducts().flatMap((product) =>
    getDocSlugs(product).map((slug) => ({
      path: `/docs/${product}/${slug}`,
      lastModified: now,
    })),
  );

  return [
    ...staticPaths,
    ...productPaths,
    ...blogPaths,
    ...guidePaths,
    ...docPaths,
  ].map(({path, lastModified}) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
