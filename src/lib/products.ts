export type ProductStatus = 'available' | 'beta' | 'coming-soon';

export interface Product {
  /** URL slug and i18n key under the `Products` namespace. */
  slug: string;
  /** Product icon served from public/. */
  iconSrc: string;
  /** Tailwind gradient classes used for the product's accent. */
  accent: string;
  status: ProductStatus;
  /** Chrome Web Store URL once published. */
  chromeUrl?: string;
}

export const products: Product[] = [
  {
    slug: 'ai-chat-snapper',
    iconSrc: '/ai-chat-snapper-v3.png',
    accent: 'from-sky-500 to-cyan-500',
    status: 'available',
    chromeUrl:
      'https://chromewebstore.google.com/detail/ai-chat-snapper/bnneoiofmanhbcemneehlejkmpfgoeem',
  },
  {
    slug: 'web-snapper',
    iconSrc: '/web-snapper-v3.png',
    accent: 'from-indigo-500 to-violet-500',
    status: 'coming-soon',
  },
  {
    slug: 'review-snapper',
    iconSrc: '/review-snapper-v3.png',
    accent: 'from-amber-500 to-orange-500',
    status: 'coming-soon',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
