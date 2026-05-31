import {useTranslations} from 'next-intl';
import {ArrowRight, Camera, MessageSquare, Star, type LucideIcon} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import type {Product} from '@/lib/products';

const icons: Record<Product['icon'], LucideIcon> = {
  Camera,
  MessageSquare,
  Star,
};

export function ProductCard({product}: {product: Product}) {
  const t = useTranslations('Products');
  const Icon = icons[product.icon];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-surface/40 p-6 transition hover:bg-surface"
    >
      <div
        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${product.accent} text-white`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-lg font-semibold">{t(`${product.slug}.name`)}</h3>
        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
          {t(`status.${product.status}`)}
        </span>
      </div>

      <p className="flex-1 text-sm text-muted">{t(`${product.slug}.tagline`)}</p>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
        {t('learnMore')}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5 rtl:rotate-180" />
      </span>
    </Link>
  );
}
