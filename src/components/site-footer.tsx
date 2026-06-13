import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {products} from '@/lib/products';

export async function SiteFooter() {
  const t = await getTranslations('Footer');
  const tp = await getTranslations('Products');

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <Image
              src="/brand-icon-v5.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-md object-cover"
            />
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
              <Link href="/about" className="transition hover:text-foreground">
                {t('about')}
              </Link>
            </li>
            <li>
              <Link href="/docs" className="transition hover:text-foreground">
                {t('docs')}
              </Link>
            </li>
            <li>
              <Link href="/guides" className="transition hover:text-foreground">
                {t('guides')}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition hover:text-foreground">
                {t('blog')}
              </Link>
            </li>
            <li>
              <a
                href="mailto:support@browserextensions.co"
                className="transition hover:text-foreground"
              >
                {t('contact')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{t('legal')}</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/privacy" className="transition hover:text-foreground">
                {t('privacy')}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-foreground">
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
