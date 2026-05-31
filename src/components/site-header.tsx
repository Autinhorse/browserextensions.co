import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {LocaleSwitcher} from './locale-switcher';

export function SiteHeader() {
  const t = useTranslations('Nav');
  const tSite = useTranslations('Site');

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/brand-icon-v3.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover"
            priority
          />
          <span className="hidden sm:inline">{tSite('name')}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <Link href="/#products" className="transition hover:text-foreground">
            {t('products')}
          </Link>
          <Link href="/#features" className="transition hover:text-foreground">
            {t('pricing')}
          </Link>
          <Link href="/#waitlist" className="transition hover:text-foreground">
            {t('feedback')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
