# Privacy Policy — AI Chat Snapper

**Effective date:** 2026-06-01
**Last updated:** 2026-06-15

This Privacy Policy explains how the **AI Chat Snapper** browser extension ("the Extension", "we", "us") handles information. AI Chat Snapper lets you export your AI chat conversations (from ChatGPT, Claude, Gemini, DeepSeek, Grok, Perplexity, Doubao, Kimi, Mistral, and Qwen) to PDF, Word (.docx), Markdown, plain text, JSON, and image formats, and — only when you choose to — send them to your own Notion workspace or local Obsidian vault.

> Product page: https://browserextensions.co/aichatsnapper
> Contact: support@browserextensions.co

---

## 1. Summary (the short version)

- **Privacy‑first and offline‑first.** All core export rendering (PDF, Word, Markdown, TXT, JSON, image) happens **locally on your device**. Your conversation content is **never sent to our servers** — in fact, we operate **no servers** that receive your content.
- **We do not** collect, sell, rent, or share your personal data. We run **no analytics, no advertising, and no tracking**.
- **Optional destinations** (Notion, Obsidian) only run when **you initiate them**. Notion export sends data **directly from your browser to your own Notion account** — never through us; Obsidian export is **entirely local**.
- Settings and any access tokens you enter are stored **locally on your device** via the browser's extension storage.

---

## 2. Information the Extension accesses

The Extension accesses the following, **only while you actively use it**:

- **Conversation content on supported AI sites.** When you click "export", the Extension reads the conversation currently shown on the active tab — on the supported AI platforms only: `chatgpt.com`, `chat.openai.com`, `claude.ai`, `gemini.google.com`, `chat.deepseek.com`, `grok.com`, `www.perplexity.ai`, `www.doubao.com`, `www.kimi.com`, `kimi.moonshot.cn`, `chat.mistral.ai`, `www.qianwen.com`, `qianwen.com`, `www.tongyi.com`, `tongyi.com`, and `chat.qwen.ai` — in order to convert it into your chosen format. This content is processed in memory on your device for the duration of the export and is not retained by us.
- **Your settings.** Your chosen format, filename template, PDF options, interface language, and (if you configure them) your Notion integration token and chosen Notion parent page. These are stored locally (see Section 6).
- **The page title and URL of the active tab**, used to detect the platform and to fill in export metadata (e.g., the document title).

The Extension does **not** read pages other than the supported AI sites, and only acts on the tab you are on when you invoke it.

---

## 3. How your data is processed — locally, by default

For every built‑in export format (PDF, Word, Markdown, TXT, JSON, image), the conversion is performed entirely **on your device** (in the extension's background and offscreen contexts). The resulting file is saved to your browser's Downloads folder. **No conversation content leaves your device for these formats, and none of it reaches us.**

---

## 4. Optional integrations you can enable

These features are **off by default** and only transmit data when **you** explicitly trigger them. In every case the data goes **directly from your browser to the third‑party service you chose**, under **your own account** — it does **not** pass through any server operated by us.

### 4.1 Notion (bring‑your‑own‑token)

If you choose to export to Notion, you provide your **own** Notion *Internal Integration* token. The Extension sends the conversation, as Notion blocks, **directly to the Notion API (`https://api.notion.com`)** authenticated with your token, to create a page in a Notion page you selected. Your token is stored locally on your device and is **never sent to us**. Your use of Notion is governed by Notion's own privacy policy.

### 4.2 Obsidian (local vault)

If you choose "Export to Obsidian", the Extension writes the conversation as a Markdown note **directly into your local Obsidian vault** via the `obsidian://` URI protocol (or, for very long notes, via your clipboard). This is **entirely local** — no network request is made and no data reaches us or any third party.

### 4.3 On‑demand fonts

When a conversation contains CJK (Chinese/Japanese/Korean) text, the Extension downloads a public open‑source font file (e.g., Noto Sans SC) from a public CDN so the PDF can render those characters, then caches it locally for offline use. **Only a request for a public font file is made; no conversation content or personal data is sent.**

---

## 5. Permissions and why they are used

- **`activeTab`, `scripting`** — to read the conversation on the page you are viewing **when you click export**, and to inject the selective‑export UI on demand.
- **`downloads`** — to save the exported file to your Downloads folder.
- **`storage`** — to save your settings and (optionally) your Notion token locally on your device.
- **`offscreen`** — to render PDF / Word / images locally (these require a document/canvas context the background service worker lacks).
- **Host access to `https://api.notion.com/*`** — only to call the Notion API when you export to Notion.
- **Optional host access to image CDNs** (e.g. `*.oaiusercontent.com`, `*.googleusercontent.com`, `assets.grok.com`, `*.byteimg.com`, `*.aliyuncs.com`, and other per‑platform image hosts) — **requested on demand, never at install time**. When you export a conversation that contains images hosted on one of these cross‑origin CDNs, the Extension asks for access to that platform's image host **only** so it can fetch the image bytes and embed them into your exported file. Permission is requested per platform, the first time you export an image from it, and you can decline — in which case the image is replaced with a placeholder and the export still completes. No conversation content is sent anywhere; only a request for the image you are exporting is made.

---

## 6. Local storage of data

Your settings and, if you configure them, your Notion integration token are stored using the browser's extension storage (`chrome.storage.local`) **on your device**. This data is not transmitted to us. You can clear it at any time by removing the Extension or via your browser's extension data controls. Treat any access tokens you enter like passwords.

---

## 7. Diagnostics (opt‑in, anonymized)

If an export fails (for example because a site changed its layout), the Extension offers a **"help us improve"** option. Only if you choose it, the Extension generates an **anonymized structural snippet** of the page: text is replaced with placeholders and sensitive attributes are stripped, so **no conversation content is included**. This snippet is shown to you to copy and send to us manually — it is **not transmitted automatically**. You remain in control of whether to share it.

---

## 8. What we do NOT do

- We do **not** operate servers that receive your conversation content.
- We do **not** collect analytics, telemetry, or usage tracking.
- We do **not** serve advertisements.
- We do **not** sell, rent, or share your personal data with third parties.
- We do **not** use your data to train any model.

---

## 9. Data retention and deletion

Because we do not receive your content, **we have nothing to retain or delete on our side.** Data created by your use of the Extension lives only:

- as the export files **you** saved locally, and
- in **your own** Notion account (managed and deletable by you), and
- as local settings/token on your device (removable by uninstalling the Extension).

---

## 10. Children's privacy

The Extension is a general‑purpose productivity tool and is not directed to children under the age of 13 (or the equivalent minimum age in your jurisdiction). We do not knowingly collect personal information from children.

---

## 11. Changes to this policy

We may update this Privacy Policy from time to time (for example, if we add a feature that changes data handling). Material changes will be reflected by updating the "Last updated" date above and, where appropriate, noted on the product page. Your continued use of the Extension after an update constitutes acceptance of the revised policy.

---

## 12. Contact

If you have any questions about this Privacy Policy or your data, contact us at:

**support@browserextensions.co**
