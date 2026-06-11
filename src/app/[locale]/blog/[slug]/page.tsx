import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ArrowLeft} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {formatPostDate, getAllPostSlugs, getPost} from '@/lib/blog';
import {Markdown} from '@/components/markdown';

const SITE_URL = 'https://browserextensions.co';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs().map((slug) => ({locale, slug})),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {canonical: `/blog/${slug}`},
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
      url: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const post = getPost(slug);
  if (!post) {
    notFound();
  }

  const t = await getTranslations('Blog');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {'@type': 'Organization', name: 'browserextensions.co'},
    publisher: {'@type': 'Organization', name: 'browserextensions.co'},
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t('backToBlog')}
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{t('readingTime', {minutes: post.readingMinutes})}</span>
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-4 text-lg text-muted">{post.description}</p>
        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-10">
        <Markdown content={post.content} />
      </div>
    </article>
  );
}
