import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {formatPostDate, getAllPosts} from '@/lib/blog';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Blog'});
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {canonical: '/blog'},
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Blog');
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">{t('empty')}</p>
      ) : (
        <div className="mt-10 space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-border bg-surface/40 p-6 transition hover:bg-surface"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{t('readingTime', {minutes: post.readingMinutes})}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
