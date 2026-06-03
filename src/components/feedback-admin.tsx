'use client';

import {useState} from 'react';
import {ExternalLink, Lock, RefreshCw} from 'lucide-react';

type Attachment = {
  id: string;
  original_filename: string;
  content_type: string | null;
  size_bytes: number;
  signed_url: string | null;
};

type FeedbackItem = {
  id: string;
  type: 'bug' | 'feature';
  app: string;
  version: string | null;
  lang: string | null;
  platform: string | null;
  email: string | null;
  title: string;
  message: string;
  page_url: string | null;
  issue_url: string | null;
  user_agent: string | null;
  referrer: string | null;
  status: 'new' | 'triaged' | 'planned' | 'closed';
  created_at: string;
  feedback_attachments: Attachment[];
};

const statuses: FeedbackItem['status'][] = ['new', 'triaged', 'planned', 'closed'];

export function FeedbackAdmin() {
  const [token, setToken] = useState(() =>
    typeof window === 'undefined' ? '' : sessionStorage.getItem('feedback-admin-token') ?? '',
  );
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  async function load(authToken = token) {
    if (!authToken) return;
    setState('loading');
    setError('');
    try {
      const res = await fetch('/api/admin/feedback', {
        headers: {Authorization: `Bearer ${authToken}`},
      });
      if (!res.ok) {
        setError(res.status === 401 ? 'Invalid admin token.' : 'Could not load feedback.');
        setState('error');
        return;
      }

      const data = (await res.json()) as {items: FeedbackItem[]};
      sessionStorage.setItem('feedback-admin-token', authToken);
      setItems(data.items);
      setState('idle');
    } catch {
      setError('Could not load feedback.');
      setState('error');
    }
  }

  async function updateStatus(id: string, status: FeedbackItem['status']) {
    const previous = items;
    setItems((current) =>
      current.map((item) => (item.id === id ? {...item, status} : item)),
    );

    const res = await fetch('/api/admin/feedback', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, status}),
    });

    if (!res.ok) {
      setItems(previous);
      setError('Could not update status.');
      setState('error');
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Feedback Inbox</h1>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={!token || state === 'loading'}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-surface disabled:opacity-60"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void load();
        }}
        className="mb-8 flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:flex-row"
      >
        <label className="flex flex-1 items-center gap-3 rounded-lg border border-border bg-background px-3 py-2">
          <Lock className="h-4 w-4 text-muted" />
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Admin token"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </label>
        <button
          type="submit"
          disabled={!token || state === 'loading'}
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          Load
        </button>
      </form>

      {error && <p className="mb-4 text-sm font-medium text-red-400">{error}</p>}

      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap gap-2 text-xs text-muted">
                  <span className="rounded-md bg-background px-2 py-1">{item.type}</span>
                  <span className="rounded-md bg-background px-2 py-1">{item.app}</span>
                  {item.version && (
                    <span className="rounded-md bg-background px-2 py-1">v{item.version}</span>
                  )}
                  {item.platform && (
                    <span className="rounded-md bg-background px-2 py-1">{item.platform}</span>
                  )}
                </div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-1 text-xs text-muted">
                  {new Date(item.created_at).toLocaleString()}
                  {item.email ? ` · ${item.email}` : ''}
                </p>
              </div>
              <select
                value={item.status}
                onChange={(event) =>
                  void updateStatus(item.id, event.target.value as FeedbackItem['status'])
                }
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground/90">
              {item.message}
            </p>

            <div className="mt-4 grid gap-2 text-sm text-muted">
              {item.issue_url && (
                <a
                  href={item.issue_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:underline"
                >
                  Related URL
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {item.page_url && <span>Submitted from: {item.page_url}</span>}
              {item.user_agent && <span className="break-all">User agent: {item.user_agent}</span>}
            </div>

            {item.feedback_attachments.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <h3 className="mb-2 text-sm font-medium">Attachments</h3>
                <div className="flex flex-wrap gap-2">
                  {item.feedback_attachments.map((attachment) =>
                    attachment.signed_url ? (
                      <a
                        key={attachment.id}
                        href={attachment.signed_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted transition hover:bg-background hover:text-foreground"
                      >
                        {attachment.original_filename}
                        <span className="text-xs">({Math.ceil(attachment.size_bytes / 1024)} KB)</span>
                      </a>
                    ) : (
                      <span
                        key={attachment.id}
                        className="rounded-lg border border-border px-3 py-2 text-sm text-muted"
                      >
                        {attachment.original_filename}
                      </span>
                    ),
                  )}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
