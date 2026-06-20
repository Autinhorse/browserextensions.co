# Web Snapper — Chrome Web Store Listing (English)

> Paste these fields into the Chrome Web Store Developer Dashboard.
> Character limits noted per field. All copy reflects the shipped V0.20.1 feature set.

---

## Extension name
`Web Snapper — Full-page Screenshot, PDF, HTML & Markdown`

*(Store name max 75 chars. If you prefer the short brand only, use `Web Snapper`.)*

---

## Summary / Short description  (max 132 chars)

```
Capture any page as a full-page screenshot, searchable PDF, single-file HTML or Markdown. Annotate & redact. 100% local.
```

*(118 chars — under the 132 limit.)*

---

## Category
**Productivity**  (alternative: *Tools*)

---

## Single purpose (required statement)

> Web Snapper captures the current web page — as a full-page screenshot, a searchable PDF, a self-contained single-file HTML, or clean Markdown — and lets the user annotate and redact it before saving. All capture, conversion, annotation and redaction happen locally in the browser.

---

## Detailed description

```
Web Snapper turns any web page into the format you actually need — a pixel-perfect screenshot, a searchable PDF, a self-contained HTML file, or clean Markdown — and lets you highlight, annotate and redact right on the page before you save. Everything runs locally in your browser. No account, no cloud, no tracking.

━━ CAPTURE ━━
• Full-page screenshot (PNG) — captures long, scrolling pages in one shot. Automatically hides sticky headers and floating bars so there's no ghosting or duplicated content.
• Searchable PDF — text stays selectable and searchable in ANY language (Chinese, Arabic, Hindi… everything), links remain clickable, and highlights export as native, editable PDF annotations.
• Single-file HTML — a fully offline, self-contained snapshot with images, styles and fonts inlined. Open it years later without the original site.
• Region capture — drag to select any area, then save it as PNG, searchable PDF, or semantic Markdown.
• Inner-scroll capture — long AI chat threads and app panels (where the page body doesn't scroll) are captured in full.
• Visible-area screenshot — quick one-click capture of what's on screen.

━━ READ & CONVERT ━━
• Reading mode — strips ads, sidebars and clutter for a clean article view.
• Markdown export — convert the page (or a selected region) to clean Markdown for Obsidian, Notion, VS Code and note apps. Real images are referenced as files, not flattened into the screenshot.

━━ ANNOTATE & REDACT (on-page editor) ━━
• Highlight text in multiple colors, add notes and tags.
• Draw with pen, arrows, boxes and numbered badges.
• Redact privacy: black out or mosaic text and images, or delete elements entirely. Redacted text is truly removed from the DOM — never hidden behind a blur that could leak in the export.
• Your highlights, annotations and redactions are baked into every export (PNG, PDF, HTML, Markdown).

━━ ORGANIZE ━━
• Local history archive — every capture is indexed on your device with a thumbnail and full-text search. Find anything instantly. Zero cloud.
• Custom paper — export PDFs as A4, Letter, or fit-to-content, in portrait or landscape.

━━ PRIVACY FIRST ━━
• 100% local processing. Screenshots, packaging, PDF generation and redaction never leave your device.
• No data collection, no analytics, no tracking, no account.
• Minimal permissions — Web Snapper only touches a page when you click its icon (activeTab). No broad "read your data on all websites" access.

━━ AVAILABLE IN 10 LANGUAGES ━━
English · 中文 · 日本語 · 한국어 · Español · Français · Deutsch · Português · Русский · العربية

Built for researchers, lawyers, analysts and anyone who needs a faithful, private copy of the web.
```

---

## Permission justifications (Privacy practices tab)

| Permission | Justification to paste |
|---|---|
| **activeTab** | Used only after the user clicks the Web Snapper toolbar button, to read and capture the current tab. This avoids requesting access to all websites. |
| **scripting** | Injects capture scripts on demand into the active tab to measure layout, hide sticky bars, scroll, serialize the DOM, and run the on-page annotation/redaction editor. No persistent content scripts. |
| **downloads** | Saves the generated file (PNG / PDF / HTML / Markdown) to the user's Downloads folder. |
| **storage** | Persists user settings, page annotations and redactions locally on the device. |
| **unlimitedStorage** | Stores the local history archive (thumbnails + full-text index) in IndexedDB so it isn't evicted when storage runs low. Never transmitted. |
| **Remote code** | No. The extension executes no remotely hosted code. |
| **Host permissions** | None. The extension uses activeTab only and declares no host permissions. |

---

## Data usage certifications (check these in the dashboard)

- ✅ I do NOT sell or transfer user data to third parties, outside of the approved use cases.
- ✅ I do NOT use or transfer user data for purposes unrelated to the item's single purpose.
- ✅ I do NOT use or transfer user data to determine creditworthiness or for lending purposes.
- **Data collected: NONE.** Do not check any data-type box (the extension collects/transmits no user data).

---

## Privacy policy URL
Host `store/privacy-policy.md` (see file) at, e.g.:
`https://browserextensions.co/websnapper/privacy`

## Support / Homepage
- Homepage: `https://browserextensions.co/websnapper`
- Support / feedback: `https://browserextensions.co/feedback?app=websnapper`
