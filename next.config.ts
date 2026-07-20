import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Short URLs used in Chrome Web Store listings (e.g. /aichatsnapper) map to the
 * canonical product and privacy pages. Keep in sync with src/lib/products.ts.
 */
const shortSlugs: Record<string, string> = {
  aichatsnapper: 'ai-chat-snapper',
  websnapper: 'web-snapper',
  reviewsnapper: 'review-snapper',
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(shortSlugs).flatMap(([short, slug]) => [
      {source: `/${short}`, destination: `/products/${slug}`, permanent: true},
      {
        source: `/${short}/privacy`,
        destination: `/privacy/${slug}`,
        permanent: true,
      },
    ]);
  },
};

export default withNextIntl(nextConfig);
