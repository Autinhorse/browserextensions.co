import {readFile} from 'node:fs/promises';
import path from 'node:path';
import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Privacy Policy - AI Chat Snapper',
  description: 'Privacy policy for the AI Chat Snapper browser extension.',
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="rounded bg-surface px-1 py-0.5 text-sm">
          {part.slice(1, -1)}
        </code>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={index}
          href={link[2]}
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          {link[1]}
        </a>
      );
    }

    return part;
  });
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length === 0) return;
    nodes.push(
      <ul key={`list-${nodes.length}`} className="my-5 list-disc space-y-2 pl-6 text-muted">
        {listItems.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  }

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed === '---') {
      flushList();
      nodes.push(<hr key={`hr-${nodes.length}`} className="my-8 border-border" />);
      return;
    }

    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (trimmed.startsWith('### ')) {
      nodes.push(
        <h3 key={`h3-${nodes.length}`} className="mt-8 text-lg font-semibold">
          {renderInline(trimmed.slice(4))}
        </h3>,
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      nodes.push(
        <h2 key={`h2-${nodes.length}`} className="mt-10 text-2xl font-bold">
          {renderInline(trimmed.slice(3))}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith('# ')) {
      nodes.push(
        <h1 key={`h1-${nodes.length}`} className="text-4xl font-bold tracking-tight">
          {renderInline(trimmed.slice(2))}
        </h1>,
      );
      return;
    }

    if (trimmed.startsWith('> ')) {
      nodes.push(
        <blockquote
          key={`quote-${nodes.length}`}
          className="my-3 border-l border-border pl-4 text-sm text-muted"
        >
          {renderInline(trimmed.slice(2))}
        </blockquote>,
      );
      return;
    }

    nodes.push(
      <p key={`p-${nodes.length}`} className="my-4 leading-7 text-muted">
        {renderInline(trimmed)}
      </p>,
    );
  });

  flushList();
  return nodes;
}

export default async function AIChatSnapperPrivacyPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  // Temporary review version with Google Docs/Drive removed (pending Chrome
  // Web Store OAuth verification). To restore the full policy after approval,
  // switch this back to 'AIChatSnapper-privacy-policy.md'.
  const markdown = await readFile(
    path.join(process.cwd(), 'AIChat-privacy-policy.md'),
    'utf8',
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      {renderMarkdown(markdown)}
    </article>
  );
}
