import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {products} from '@/lib/products';

export function SiteFooter() {
  const t = useTranslations('Footer');
  const tp = useTranslations('Products');

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">
              B
            </span>
            browserextensions.co
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{t('tagline')}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{t('product')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="transition hover:text-foreground"
                >
                  {tp(`${product.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{t('company')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/#waitlist" className="transition hover:text-foreground">
                {t('about')}
              </Link>
            </li>
            <li>
              <Link href="/#waitlist" className="transition hover:text-foreground">
                {t('blog')}
              </Link>
            </li>
            <li>
              <Link href="/#waitlist" className="transition hover:text-foreground">
                {t('contact')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{t('legal')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/" className="transition hover:text-foreground">
                {t('privacy')}
              </Link>
            </li>
            <li>
              <Link href="/" className="transition hover:text-foreground">
                {t('terms')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          Copyright 2026 browserextensions.co. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
