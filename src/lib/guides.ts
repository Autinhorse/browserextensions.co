import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');

/**
 * Guides are evergreen how-to content. Unlike blog posts they are not dated -
 * they are ordered manually via the `order` frontmatter field and may carry an
 * optional `updated` date for freshness, shown as "Updated ..." rather than a
 * publication date.
 */
export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  /** Lower sorts first. Defaults to 999 when absent. */
  order: number;
  /** Optional ISO date, shown as "Updated ...". */
  updated?: string;
  readingMinutes: number;
};

export type Guide = GuideMeta & {content: string};

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatUpdated(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}

export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

export function getGuide(slug: string): Guide | null {
  for (const ext of ['.md', '.mdx']) {
    const filePath = path.join(GUIDES_DIR, `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;

    const {data, content} = matter(fs.readFileSync(filePath, 'utf8'));
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ''),
      order: Number.isFinite(data.order) ? Number(data.order) : 999,
      updated: data.updated ? String(data.updated) : undefined,
      readingMinutes: readingMinutes(content),
      content,
    };
  }
  return null;
}

export function getAllGuides(): GuideMeta[] {
  return getAllGuideSlugs()
    .map((slug) => getGuide(slug))
    .filter((guide): guide is Guide => guide !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
    .map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      description: guide.description,
      order: guide.order,
      updated: guide.updated,
      readingMinutes: guide.readingMinutes,
    }));
}
