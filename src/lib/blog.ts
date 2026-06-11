import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. 2026-06-12. */
  date: string;
  tags: string[];
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & {content: string};

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Format an ISO date for display. English-only while `en` is the sole locale. */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

export function getPost(slug: string): BlogPost | null {
  for (const ext of ['.md', '.mdx']) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;

    const {data, content} = matter(fs.readFileSync(filePath, 'utf8'));
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ''),
      date: String(data.date ?? ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingMinutes: readingMinutes(content),
      content,
    };
  }
  return null;
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => getPost(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags,
      readingMinutes: post.readingMinutes,
    }));
}
