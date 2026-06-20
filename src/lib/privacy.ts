/**
 * Per-product privacy policies, rendered at `/privacy/<slug>` from a Markdown
 * file in the repo root. The page body is English-only (see I18N-STATUS.md);
 * bilingual source files have their non-English sections stripped at render time.
 */
export const privacyDocs: Record<string, string> = {
  'ai-chat-snapper': 'privacy-policy.md',
  'web-snapper': 'websnapper-privacy-policy.md',
};

export function hasPrivacyPolicy(slug: string): boolean {
  return slug in privacyDocs;
}
