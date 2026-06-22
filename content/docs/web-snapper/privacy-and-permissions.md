---
title: "Privacy & Permissions"
navLabel: "Privacy & Permissions"
description: "How Web Snapper keeps your captures private: 100% local processing, no tracking, no host permissions, and what each permission is for."
group: "Privacy & help"
order: 50
---

Web Snapper is built to be private by default. Every part of capturing a page — taking the screenshot, packaging the HTML, generating the PDF, and applying your redactions — happens locally in your browser. None of it leaves your device.

## 100% local processing

When you capture a page, Web Snapper reads the current tab, builds the file you asked for (PNG, searchable PDF, single-file HTML, or Markdown), and saves it straight to your Downloads folder. The capture, conversion, annotation, and redaction all run on your machine. Your page content is never uploaded to us or to any third party.

That means:

- **No data collection, no analytics, no telemetry.** Web Snapper doesn't track how you use it.
- **No advertising and no ad identifiers.**
- **No accounts and no login.** There's nothing to sign up for.
- **No selling or sharing of data** with third parties.
- **No remotely hosted code.** The extension executes no code fetched from a remote server.

## No host permissions

Web Snapper declares **no host permissions** — it does not ask to "read your data on all websites." Instead it relies on `activeTab`, which only grants access to a page after you explicitly click the Web Snapper toolbar icon. The rest of the time, it sees nothing.

## What each permission is for

| Permission | Why it's needed |
|---|---|
| **activeTab** | Used only after you click the Web Snapper toolbar button, to read and capture the current tab. This avoids requesting access to all websites. |
| **scripting** | Injects capture scripts on demand into the active tab to measure layout, hide sticky bars, scroll, serialize the DOM, and run the on-page annotation and redaction editor. There are no persistent content scripts. |
| **downloads** | Saves the generated file (PNG, PDF, HTML, or Markdown) to your Downloads folder. |
| **storage** | Persists your settings, page annotations, and redactions locally on your device. |
| **unlimitedStorage** | Stores the local history archive (thumbnails and full-text index) in IndexedDB so it isn't evicted when storage runs low. It's never transmitted. |

The one time the extension touches the network on its own is to inline images, fonts, and styles into a saved file — and even then it fetches those assets within the page's own context, exactly as the page itself would, writing the results only to your local file.

For the complete details, read the full [Web Snapper privacy policy](/privacy/web-snapper).
