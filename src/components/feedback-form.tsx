'use client';

import {useState} from 'react';
import {Bug, Lightbulb, Paperclip, Send, X} from 'lucide-react';
import {
  feedbackApps,
  feedbackPlatforms,
  feedbackTypes,
  platformLabels,
  type FeedbackApp,
  type FeedbackPlatform,
  type FeedbackType,
} from '@/lib/feedback-options';

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'invalid';

type FeedbackFormProps = {
  initialType: FeedbackType;
  initialApp: FeedbackApp;
  initialVersion: string;
  initialLang: string;
  initialPlatform: FeedbackPlatform | '';
  uiLang: 'en' | 'zh';
};

const MAX_FILE_COUNT = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const copy = {
  en: {
    bug: 'Bug',
    feature: 'Feature',
    app: 'Extension',
    version: 'Version',
    platform: 'AI platform',
    noPlatform: 'Not platform-specific',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    issueUrl: 'Related URL',
    issueUrlPlaceholder: 'https://chatgpt.com/...',
    title: 'Title',
    titlePlaceholder: 'Short summary',
    message: 'Details',
    messagePlaceholder: 'What happened, what did you expect, or what would you like us to add?',
    attachments: 'Attachments',
    attachmentsHint:
      'If it does not contain private data, attach saved HTML, screenshots, exported files, or error files. Up to 5 files, 10 MB each.',
    removeFile: 'Remove file',
    submit: 'Send feedback',
    success: 'Thanks, we received your feedback.',
    error: 'Something went wrong. Please try again.',
    invalid: 'Please add a title and at least 10 characters of detail. Attach up to 5 files, 10 MB each.',
    optional: 'Optional',
  },
  zh: {
    bug: '错误',
    feature: '功能需求',
    app: '插件',
    version: '版本',
    platform: 'AI 平台',
    noPlatform: '不针对特定平台',
    email: '邮箱',
    emailPlaceholder: 'you@example.com',
    issueUrl: '相关 URL',
    issueUrlPlaceholder: 'https://chatgpt.com/...',
    title: '标题',
    titlePlaceholder: '一句话描述问题或需求',
    message: '详细说明',
    messagePlaceholder: '发生了什么、你期望怎样，或者希望增加什么功能？',
    attachments: '附件',
    attachmentsHint:
      '如果不包含隐私信息，可以上传保存的网页 HTML、屏幕截图、导出的文件或错误文件。最多 5 个文件，每个 10 MB。',
    removeFile: '移除文件',
    submit: '提交反馈',
    success: '感谢，我们已经收到你的反馈。',
    error: '提交失败，请稍后重试。',
    invalid: '请填写标题和至少 10 个字符的说明。附件最多 5 个，每个不超过 10 MB。',
    optional: '可选',
  },
};

export function FeedbackForm({
  initialType,
  initialApp,
  initialVersion,
  initialLang,
  initialPlatform,
  uiLang,
}: FeedbackFormProps) {
  const t = copy[uiLang];
  const [type, setType] = useState<FeedbackType>(initialType);
  const [app, setApp] = useState<FeedbackApp>(initialApp);
  const [version, setVersion] = useState(initialVersion);
  const [lang, setLang] = useState(initialLang);
  const [platform, setPlatform] = useState<FeedbackPlatform | ''>(initialPlatform);
  const [email, setEmail] = useState('');
  const [issueUrl, setIssueUrl] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<FormState>('idle');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (
      title.trim().length < 2 ||
      message.trim().length < 10 ||
      files.length > MAX_FILE_COUNT ||
      files.some((file) => file.size > MAX_FILE_SIZE)
    ) {
      setState('invalid');
      return;
    }

    setState('loading');
    try {
      const body = new FormData();
      body.set('type', type);
      body.set('app', app);
      body.set('version', version);
      body.set('lang', lang);
      body.set('platform', platform);
      body.set('email', email);
      body.set('issueUrl', issueUrl);
      body.set('title', title);
      body.set('message', message);
      body.set('pageUrl', window.location.href);
      files.forEach((file) => body.append('attachments', file));

      const res = await fetch('/api/feedback', {
        method: 'POST',
        body,
      });

      if (!res.ok) {
        setState('error');
        return;
      }

      setEmail('');
      setIssueUrl('');
      setTitle('');
      setMessage('');
      setFiles([]);
      setState('success');
    } catch {
      setState('error');
    }
  }

  function markIdle() {
    if (state !== 'idle') setState('idle');
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {feedbackTypes.map((option) => {
          const Icon = option === 'bug' ? Bug : Lightbulb;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                setType(option);
                markIdle();
              }}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                type === option
                  ? 'border-brand bg-brand/15 text-foreground'
                  : 'border-border bg-surface text-muted hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{t[option]}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">{t.app}</span>
          <select
            value={app}
            onChange={(event) => {
              setApp(event.target.value as FeedbackApp);
              markIdle();
            }}
            className="rounded-lg border border-border bg-surface px-3 py-2.5 outline-none focus:border-brand"
          >
            {feedbackApps.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">{t.version}</span>
          <input
            value={version}
            onChange={(event) => {
              setVersion(event.target.value);
              markIdle();
            }}
            placeholder="0.17.13"
            className="rounded-lg border border-border bg-surface px-3 py-2.5 outline-none placeholder:text-muted focus:border-brand"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">{t.platform}</span>
          <select
            value={platform}
            onChange={(event) => {
              setPlatform(event.target.value as FeedbackPlatform | '');
              markIdle();
            }}
            className="rounded-lg border border-border bg-surface px-3 py-2.5 outline-none focus:border-brand"
          >
            <option value="">{t.noPlatform}</option>
            {feedbackPlatforms.map((option) => (
              <option key={option} value={option}>
                {platformLabels[option]}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Lang</span>
          <input
            value={lang}
            onChange={(event) => {
              setLang(event.target.value);
              markIdle();
            }}
            placeholder="zh"
            className="rounded-lg border border-border bg-surface px-3 py-2.5 outline-none placeholder:text-muted focus:border-brand"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">
          {t.email} <span className="text-muted">({t.optional})</span>
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            markIdle();
          }}
          placeholder={t.emailPlaceholder}
          className="rounded-lg border border-border bg-surface px-3 py-2.5 outline-none placeholder:text-muted focus:border-brand"
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">
          {t.issueUrl} <span className="text-muted">({t.optional})</span>
        </span>
        <input
          type="url"
          value={issueUrl}
          onChange={(event) => {
            setIssueUrl(event.target.value);
            markIdle();
          }}
          placeholder={t.issueUrlPlaceholder}
          className="rounded-lg border border-border bg-surface px-3 py-2.5 outline-none placeholder:text-muted focus:border-brand"
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">{t.title}</span>
        <input
          required
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            markIdle();
          }}
          placeholder={t.titlePlaceholder}
          className="rounded-lg border border-border bg-surface px-3 py-2.5 outline-none placeholder:text-muted focus:border-brand"
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="font-medium">{t.message}</span>
        <textarea
          required
          rows={7}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            markIdle();
          }}
          placeholder={t.messagePlaceholder}
          className="resize-y rounded-lg border border-border bg-surface px-3 py-2.5 outline-none placeholder:text-muted focus:border-brand"
        />
      </label>

      <div className="grid gap-2 text-sm">
        <span className="font-medium">
          {t.attachments} <span className="text-muted">({t.optional})</span>
        </span>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface px-4 py-6 text-center text-muted transition hover:border-brand hover:text-foreground">
          <Paperclip className="h-5 w-5" />
          <span>{t.attachmentsHint}</span>
          <input
            type="file"
            multiple
            className="sr-only"
            onChange={(event) => {
              const selected = Array.from(event.target.files ?? []);
              setFiles((current) => [...current, ...selected].slice(0, MAX_FILE_COUNT));
              event.target.value = '';
              markIdle();
            }}
          />
        </label>
        {files.length > 0 && (
          <ul className="grid gap-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.lastModified}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-muted"
              >
                <span className="min-w-0 truncate">
                  {file.name} ({Math.ceil(file.size / 1024)} KB)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
                    markIdle();
                  }}
                  aria-label={t.removeFile}
                  className="rounded-md p-1 text-muted transition hover:bg-surface hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        disabled={state === 'loading'}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {t.submit}
      </button>

      {state !== 'idle' && state !== 'loading' && (
        <p
          className={`text-sm font-medium ${
            state === 'success' ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {t[state]}
        </p>
      )}
    </form>
  );
}
