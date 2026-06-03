import Image from 'next/image';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {
  ArrowRight,
  Check,
  Download,
  FileText,
  Lock,
  MousePointer2,
  ShieldCheck,
} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {products, getProduct} from '@/lib/products';
import {routing} from '@/i18n/routing';
import {WaitlistForm} from '@/components/waitlist-form';

type DeepDive = {
  title: string;
  desc: string;
  visual: string;
};

type Faq = {
  question: string;
  answer: string;
};

const featureNumbers = [1, 2, 3] as const;
const stepIcons = [MousePointer2, FileText, Download] as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({locale, slug: product.slug})),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const t = await getTranslations({locale, namespace: 'Products'});

  return {
    title: t(`${slug}.seoTitle`),
    description: t(`${slug}.seoDescription`),
    openGraph: {
      title: t(`${slug}.seoTitle`),
      description: t(`${slug}.seoDescription`),
      images: [{url: product.iconSrc}],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const product = getProduct(slug);
  if (!product) {
    notFound();
  }

  const t = await getTranslations('Products');
  const tw = await getTranslations('Home.waitlist');
  const platforms = t.raw(`${slug}.platforms`) as string[];
  const formats = t.raw(`${slug}.formats`) as string[];
  const privacyPoints = t.raw(`${slug}.privacyPoints`) as string[];
  const steps = t.raw(`${slug}.steps`) as string[];
  const useCases = t.raw(`${slug}.useCases`) as string[];
  const deepDive = t.raw(`${slug}.deepDive`) as DeepDive[];
  const faq = t.raw(`${slug}.faq`) as Faq[];
  const privacyHref = `/privacy/${slug}`;
  const hasPrivacyPage = slug === 'ai-chat-snapper';

  return (
    <article>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.15),transparent)]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3">
              <Image
                src={product.iconSrc}
                alt=""
                width={72}
                height={72}
                className="h-18 w-18 object-contain"
                priority
              />
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                {t(`status.${product.status}`)}
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              {t(`${slug}.name`)}
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-muted">
              {t(`${slug}.tagline`)}
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              {t(`${slug}.description`)}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {product.status === 'coming-soon' || !product.chromeUrl ? (
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
                >
                  {t('joinWaitlist')}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </a>
              ) : (
                <a
                  href={product.chromeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {t('getExtension')}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </a>
              )}

              {hasPrivacyPage && (
                <Link
                  href={privacyHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface"
                >
                  <ShieldCheck className="h-4 w-4" />
                  {t('page.privacyLink')}
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface/40 p-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={product.iconSrc}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />
                <div>
                  <p className="text-sm font-medium">{t(`${slug}.name`)}</p>
                  <p className="text-xs text-muted">{t('page.visualLabel')}</p>
                </div>
              </div>
              <span className="rounded-full bg-background px-2 py-1 text-[11px] text-muted">
                {formats[0]}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {deepDive.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-lg border border-border bg-background/60 p-4"
                >
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-1 max-w-56 text-xs text-muted">
                      {item.visual}
                    </p>
                  </div>
                  <span
                    className={`h-2.5 w-16 rounded-full bg-gradient-to-r ${product.accent}`}
                    style={{opacity: 1 - index * 0.18}}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold">{t('page.highlightsTitle')}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featureNumbers.map((n) => (
            <div key={n} className="rounded-lg border border-border bg-surface/40 p-6">
              <h3 className="font-semibold">{t(`${slug}.feature${n}Title`)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {t(`${slug}.feature${n}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold">{t('page.deepDiveTitle')}</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {deepDive.map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-background p-5">
                <div className="flex h-40 items-center justify-center rounded-md border border-border bg-surface/50">
                  <div className="text-center">
                    <Image
                      src={product.iconSrc}
                      alt=""
                      width={56}
                      height={56}
                      className="mx-auto h-14 w-14 object-contain"
                    />
                    <p className="mt-4 text-sm font-medium">{item.visual}</p>
                  </div>
                </div>
                <h3 className="mt-5 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface/40 p-6">
          <h2 className="text-xl font-semibold">{t('page.platformsTitle')}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <span key={platform} className="rounded-full border border-border px-3 py-1 text-sm text-muted">
                {platform}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface/40 p-6">
          <h2 className="text-xl font-semibold">{t('page.formatsTitle')}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {formats.map((format) => (
              <span key={format} className="rounded-full border border-border px-3 py-1 text-sm text-muted">
                {format}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-border bg-surface/40 p-6">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-foreground" />
            <h2 className="text-xl font-semibold">{t('page.privacyTitle')}</h2>
          </div>
          <ul className="mt-5 space-y-3">
            {privacyPoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6 text-muted">
                <Check className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                {point}
              </li>
            ))}
          </ul>
          {hasPrivacyPage && (
            <Link
              href={privacyHref}
              className="mt-5 inline-flex text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {t('page.privacyLink')}
            </Link>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{t('page.howTitle')}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = stepIcons[index] ?? MousePointer2;

              return (
                <div key={step} className="rounded-lg border border-border bg-surface/40 p-5">
                  <Icon className="h-5 w-5" />
                  <p className="mt-4 text-sm leading-6 text-muted">{step}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-bold">{t('page.useCasesTitle')}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {useCases.map((useCase) => (
                <span key={useCase} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted">
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">{t('page.faqTitle')}</h2>
            <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-background">
              {faq.map((item) => (
                <section key={item.question} className="p-5">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="scroll-mt-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold">{t('page.finalCtaTitle')}</h2>
          <p className="mt-3 max-w-xl text-muted">{tw('subtitle')}</p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </article>
  );
}
