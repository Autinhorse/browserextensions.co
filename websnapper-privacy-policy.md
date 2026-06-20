# Web Snapper — Privacy Policy

_Last updated: 2026-06-19_

Web Snapper is a Chrome browser extension that captures web pages as screenshots,
searchable PDFs, single-file HTML, or Markdown, and lets you annotate and redact
them. This policy explains exactly what the extension does — and does not do —
with your data.

## The short version

**Web Snapper does not collect, store, or transmit any of your personal data or
browsing content to us or to any third party.** Everything happens locally on
your device.

## What data Web Snapper handles, and where it stays

All of the following is processed **entirely on your own device** and never sent
to any server:

- **Page content you capture** (screenshots, page text, images, styles) — read
  from the active tab only when you click the extension, used solely to produce
  the file you asked for, and saved directly to your Downloads folder.
- **Your annotations and redactions** (highlights, notes, tags, blackouts,
  mosaics, drawings) — stored locally via `chrome.storage.local`, keyed to the
  page URL, so they can be restored when you revisit.
- **Local history archive** — capture metadata, a thumbnail, and a full-text
  index of each capture are stored locally in your browser's IndexedDB so you can
  search your past captures. This data lives only on your device and can be
  cleared at any time from the History page.
- **Settings** (file naming, paper size, language, etc.) — stored locally.

## What Web Snapper does NOT do

- ❌ No analytics, telemetry, or usage tracking.
- ❌ No advertising and no advertising identifiers.
- ❌ No user accounts and no login.
- ❌ No selling or sharing of data with third parties.
- ❌ No remotely hosted code execution.
- ❌ No access to "your data on all websites" — the extension uses the
  `activeTab` permission and only acts on a page when you explicitly click it.

## Network activity

Web Snapper makes no background network requests. The only outbound navigation
occurs when **you** click a link in the extension — for example the "Feedback" or
"Website" links, which open `https://browserextensions.co` in a new browser tab.
Those links may include your extension version and interface language so the
website can route and localize the page; they never include any of your captured
page content. Any data you choose to submit on that website is governed by the
website's own privacy policy.

To inline images, fonts, and styles into a saved file (e.g. single-file HTML or
Markdown with images), the extension fetches those assets **within the page's own
context**, exactly as the page itself would. These fetches go to the original
website's servers, not to us, and the results are written only to your local file.

## Permissions

- **activeTab** — access the current tab only when you click the toolbar icon.
- **scripting** — inject capture and annotation scripts on demand into that tab.
- **downloads** — save the generated file to your Downloads folder.
- **storage** — keep your settings, annotations, and redactions on your device.
- **unlimitedStorage** — keep your local history archive from being evicted.

## Children's privacy

Web Snapper is a general-purpose utility and is not directed at children. It
collects no personal information from anyone.

## Changes to this policy

If this policy changes, the "Last updated" date above will change and the new
version will be posted at this URL.

## Contact

Questions about this policy: https://browserextensions.co/feedback?app=websnapper

---

# Web Snapper — 隐私政策（中文）

_最后更新：2026-06-19_

Web Snapper 是一款 Chrome 浏览器扩展，用于把网页捕获为截图、可搜索 PDF、单文件
HTML 或 Markdown，并支持标注与脱敏。本政策说明扩展对你的数据**做什么、不做什么**。

## 一句话总结

**Web Snapper 不会向我们或任何第三方收集、存储或传输你的任何个人数据或浏览内容。**
一切都在你的设备本地完成。

## Web Snapper 处理哪些数据，存在哪里

以下内容**完全在你自己的设备上处理**，永不发送到任何服务器：

- **你捕获的网页内容**（截图、页面文字、图片、样式）——仅在你点击扩展时从当前标签页
  读取，仅用于生成你要的文件，并直接保存到你的「下载」目录。
- **你的标注与脱敏**（高亮、笔记、标签、涂黑、马赛克、勾画）——通过
  `chrome.storage.local` 按页面 URL 本地存储，便于重访时恢复。
- **本地历史归档**——每次捕获的元数据、缩略图与全文索引存于浏览器本地 IndexedDB，
  供你检索历史捕获。该数据仅存于你的设备，可随时在历史页清空。
- **设置项**（文件命名、纸张大小、语言等）——本地存储。

## Web Snapper 不会做的事

- ❌ 无任何分析、遥测或使用追踪。
- ❌ 无广告，无广告标识符。
- ❌ 无用户账号，无登录。
- ❌ 不向第三方出售或共享数据。
- ❌ 不执行任何远程托管代码。
- ❌ 不访问「你在所有网站上的数据」——扩展使用 `activeTab` 权限，仅在你明确点击时才作用于页面。

## 网络活动

Web Snapper 不发起任何后台网络请求。唯一的对外跳转发生在**你**点击扩展内的链接时——
例如「反馈」或「官网」链接，会在新标签页打开 `https://browserextensions.co`。这些链接
可能附带你的扩展版本号与界面语言，以便网站路由和本地化页面；绝不包含任何你捕获的网页内容。
你在该网站上自愿提交的任何数据，受该网站自身隐私政策约束。

为把图片、字体、样式内联进保存的文件（如单文件 HTML 或带图 Markdown），扩展会**在页面
自身的上下文中**抓取这些资源，与页面自己抓取的方式完全一致。这些请求发往原网站服务器、
而非我们，结果仅写入你的本地文件。

## 权限

- **activeTab**——仅在你点击工具栏图标时访问当前标签页。
- **scripting**——按需向该标签页注入捕获与标注脚本。
- **downloads**——把生成的文件保存到你的「下载」目录。
- **storage**——在你的设备上保存设置、标注与脱敏。
- **unlimitedStorage**——避免本地历史归档被回收。

## 儿童隐私

Web Snapper 是通用工具，并非面向儿童，且不向任何人收集个人信息。

## 政策变更

如本政策变更，上方「最后更新」日期会随之更新，新版本将发布于本 URL。

## 联系方式

关于本政策的疑问：https://browserextensions.co/feedback?app=websnapper
