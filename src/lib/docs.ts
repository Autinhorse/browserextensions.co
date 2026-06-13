import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const DOCS_DIR = path.join(process.cwd(), 'content', 'docs');

/**
 * Docs are product reference documentation, organized per product under
 * `content/docs/<product>/`. Each page declares a `group` and an `order` used
 * to build the sidebar; groups themselves are ordered by the lowest page order
 * they contain.
 */
export type DocMeta = {
  product: string;
  slug: string;
  title: string;
  /** Short label for the sidebar; falls back to `title` when not set. */
  navLabel: string;
  description: string;
  group: string;
  order: number;
};

export type Doc = DocMeta & {content: string};

export type DocGroup = {title: string; items: DocMeta[]};

function productDir(product: string): string {
  return path.join(DOCS_DIR, product);
}

/** Product slugs that have a docs folder, e.g. ['ai-chat-snapper']. */
export function getDocProducts(): string[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR, {withFileTypes: true})
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((product) => getDocSlugs(product).length > 0);
}

export function getDocSlugs(product: string): string[] {
  const dir = productDir(product);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

export function getDoc(product: string, slug: string): Doc | null {
  for (const ext of ['.md', '.mdx']) {
    const filePath = path.join(productDir(product), `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;

    const {data, content} = matter(fs.readFileSync(filePath, 'utf8'));
    const title = String(data.title ?? slug);
    return {
      product,
      slug,
      title,
      navLabel: String(data.navLabel ?? title),
      description: String(data.description ?? ''),
      group: String(data.group ?? 'General'),
      order: Number.isFinite(data.order) ? Number(data.order) : 999,
      content,
    };
  }
  return null;
}

function getAllDocs(product: string): DocMeta[] {
  return getDocSlugs(product)
    .map((slug) => getDoc(product, slug))
    .filter((doc): doc is Doc => doc !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
    .map((doc) => ({
      product: doc.product,
      slug: doc.slug,
      title: doc.title,
      navLabel: doc.navLabel,
      description: doc.description,
      group: doc.group,
      order: doc.order,
    }));
}

/** Sidebar structure for a product: groups in order, each with ordered items. */
export function getDocNav(product: string): DocGroup[] {
  const docs = getAllDocs(product);
  const groups: DocGroup[] = [];
  for (const doc of docs) {
    let group = groups.find((g) => g.title === doc.group);
    if (!group) {
      group = {title: doc.group, items: []};
      groups.push(group);
    }
    group.items.push(doc);
  }
  return groups;
}

/** First doc of a product (lowest order) - used as the product docs landing. */
export function getFirstDoc(product: string): DocMeta | null {
  return getAllDocs(product)[0] ?? null;
}
