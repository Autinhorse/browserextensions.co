# Privacy Policy - AI Chat Snapper

**Effective date:** 2026-06-01  
**Last updated:** 2026-06-01

This Privacy Policy explains how the **AI Chat Snapper** browser extension ("the Extension", "we", "us") handles information. AI Chat Snapper lets you export your AI chat conversations from supported services such as ChatGPT, Claude, and Gemini to PDF, Word (.docx), Markdown, plain text, JSON, and image formats, and, only when you choose to, send them to your own Notion workspace or Google Drive / Google Docs.

> Product page: https://browserextensions.co/products/ai-chat-snapper  
> Contact: support@browserextensions.co

---

## 1. Summary

- **Privacy-first and local-first.** Core export rendering (PDF, Word, Markdown, TXT, JSON, and image) happens locally on your device. Your conversation content is not sent to our servers.
- **We do not** sell, rent, or share your personal data.
- **We do not** use analytics, advertising, or tracking in the Extension.
- **Optional cloud destinations** (Notion and Google Drive / Google Docs) only run when you initiate them. Data is sent directly from your browser to the account and service you choose, not through our servers.
- Settings and any access tokens you enter are stored locally on your device using browser extension storage.

---

## 2. Information the Extension accesses

The Extension accesses the following information only while you actively use it:

- **Conversation content on supported AI sites.** When you click export, the Extension reads the conversation currently shown on the active tab for supported services, such as `chatgpt.com`, `chat.openai.com`, `claude.ai`, and `gemini.google.com`, in order to convert it into your chosen format. This content is processed in memory on your device for the duration of the export and is not retained by us.
- **Your settings.** Your chosen export format, filename template, PDF options, interface language, and, if you configure them, your Notion integration token and chosen Notion parent page. These are stored locally.
- **The page title and URL of the active tab.** These are used to detect the platform and fill in export metadata, such as the document title.

The Extension does not read pages other than supported AI sites and only acts on the tab you are using when you invoke it.

---

## 3. Local processing by default

For built-in export formats (PDF, Word, Markdown, TXT, JSON, and image), conversion is performed on your device in the Extension's background and offscreen contexts. The resulting file is saved to your browser's Downloads folder. Conversation content does not leave your device for these local export formats and does not reach us.

---

## 4. Optional integrations

These features are off by default and transmit data only when you explicitly trigger them. In each case, data goes directly from your browser to the third-party service you chose, under your own account. It does not pass through a server operated by us.

### 4.1 Notion

If you choose to export to Notion, you provide your own Notion Internal Integration token. The Extension sends the conversation, as Notion blocks, directly to the Notion API (`https://api.notion.com`) authenticated with your token, to create a page in a Notion page you selected. Your token is stored locally on your device and is never sent to us. Your use of Notion is governed by Notion's own privacy policy.

### 4.2 Google Drive / Google Docs

If you choose to export to Google Docs, the Extension uses Google OAuth to obtain your authorization and uploads the generated `.docx` file directly to your own Google Drive (`https://www.googleapis.com`), where Google converts it into a Google Doc.

- We request only the minimal scope `https://www.googleapis.com/auth/drive.file`, which grants access only to files this Extension creates or that you explicitly open with it. It does not grant access to the rest of your Drive.
- The OAuth access token is managed by the browser/Google and used only to perform the upload you requested. We do not store your Google data or token on any server.
- Your use of Google Drive / Google Docs is governed by Google's own privacy policy.

### 4.3 On-demand fonts

When a conversation contains CJK (Chinese, Japanese, or Korean) text, the Extension may download a public open-source font file, such as Noto Sans SC, from a public CDN so the PDF can render those characters, then cache it locally for offline use. Only a request for a public font file is made; no conversation content or personal data is sent.

---

## 5. Permissions and why they are used

- **`activeTab`, `scripting`**: to read the conversation on the page you are viewing when you click export, and to inject the selective-export UI on demand.
- **`downloads`**: to save the exported file to your Downloads folder.
- **`storage`**: to save your settings and, optionally, your Notion token locally on your device.
- **`offscreen`**: to render PDF, Word, and image exports locally when a document or canvas context is required.
- **`identity`**: to perform Google OAuth for the optional Google Docs upload.
- **Host access to `https://api.notion.com/*`**: only to call the Notion API when you export to Notion.
- **Host access to `https://www.googleapis.com/*`**: only to upload to your Google Drive when you export to Google Docs.

---

## 6. Local storage of data

Your settings and, if you configure them, your Notion integration token are stored using the browser's extension storage (`chrome.storage.local`) on your device. This data is not transmitted to us. You can clear it at any time by removing the Extension or using your browser's extension data controls. Treat any access tokens you enter like passwords.

---

## 7. Diagnostics

If an export fails, for example because a supported site changed its layout, the Extension may offer a "help us improve" option. Only if you choose it, the Extension generates an anonymized structural snippet of the page: text is replaced with placeholders and sensitive attributes are stripped, so no conversation content is included. This snippet is shown to you to copy and send to us manually. It is not transmitted automatically.

---

## 8. What we do not do

- We do not operate servers that receive your conversation content.
- We do not collect analytics, telemetry, or usage tracking in the Extension.
- We do not serve advertisements in the Extension.
- We do not sell, rent, or share your personal data with third parties.
- We do not use your data to train any model.

---

## 9. Data retention and deletion

Because we do not receive your conversation content, we have no conversation content to retain or delete on our side. Data created by your use of the Extension lives only:

- as export files you saved locally,
- in your own Notion / Google Drive accounts, managed and deletable by you, and
- as local settings or tokens on your device, removable by uninstalling the Extension or clearing extension storage.

---

## 10. Google API Services User Data Policy / Limited Use

AI Chat Snapper's use and transfer of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements. Specifically, data accessed via the Google Drive `drive.file` scope is used only to provide the user-initiated "Export to Google Docs" feature, is not transferred to others except as necessary to provide that feature, is not used for advertising, and is not read by humans except as required for security, legal compliance, or with your explicit consent.

---

## 11. Children's privacy

The Extension is a general-purpose productivity tool and is not directed to children under the age of 13 or the equivalent minimum age in your jurisdiction. We do not knowingly collect personal information from children.

---

## 12. Changes to this policy

We may update this Privacy Policy from time to time, for example if we add a feature that changes data handling. Material changes will be reflected by updating the "Last updated" date above and, where appropriate, noted on the product page.

---

## 13. Contact

If you have any questions about this Privacy Policy or your data, contact us at:

**support@browserextensions.co**
