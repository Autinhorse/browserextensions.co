export type ProductStatus = 'available' | 'beta' | 'coming-soon';

export interface Product {
  /** URL slug and i18n key under the `Products` namespace. */
  slug: string;
  /** lucide-react icon name. */
  icon: 'Camera' | 'MessageSquare' | 'Star';
  /** Tailwind gradient classes used for the product's accent. */
  accent: string;
  status: ProductStatus;
  /** Chrome Web Store URL once published. */
  chromeUrl?: string;
}

export const products: Product[] = [
  {
    slug: 'web-snapper',
    icon: 'Camera',
    accent: 'from-indigo-500 to-violet-500',
    status: 'beta',
  },
  {
    slug: 'ai-chat-snapper',
    icon: 'MessageSquare',
    accent: 'from-sky-500 to-cyan-500',
    status: 'beta',
  },
  {
    slug: 'review-snapper',
    icon: 'Star',
    accent: 'from-amber-500 to-orange-500',
    status: 'coming-soon',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
