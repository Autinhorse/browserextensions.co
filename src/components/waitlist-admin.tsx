'use client';

import {useState} from 'react';
import {Check, Copy, Download, Lock, RefreshCw} from 'lucide-react';
import {Link} from '@/i18n/navigation';

type WaitlistItem = {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
};

export function WaitlistAdmin() {
  const [token, setToken] = useState(() =>
    typeof window === 'undefined' ? '' : sessionStorage.getItem('feedback-admin-token') ?? '',
  );
  const [items, setItems] = useState<WaitlistItem[]>([]);
  const [count, setCount] = useState(0);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function load(authToken = token) {
    if (!authToken) return;
    setState('loading');
    setError('');
    try {
      const res = await fetch('/api/admin/waitlist', {
        headers: {Authorization: `Bearer ${authToken}`},
      });
      if (!res.ok) {
        setError(res.status === 401 ? 'Invalid admin token.' : 'Could not load waitlist.');
        setState('error');
        return;
      }

      const data = (await res.json()) as {items: WaitlistItem[]; count: number};
      sessionStorage.setItem('feedback-admin-token', authToken);
      setItems(data.items);
      setCount(data.count);
      setState('idle');
    } catch {
      setError('Could not load waitlist.');
      setState('error');
    }
  }

  async function copyEmails() {
    const text = items.map((item) => item.email).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError('Could not copy to clipboard.');
    }
  }

  function downloadCsv() {
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const rows = [
      ['email', 'source', 'created_at'],
      ...items.map((item) => [item.email, item.source ?? '', item.created_at]),
    ];
    const csv = rows.map((row) => row.map((cell) => escape(String(cell))).join(',')).join('\n');
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em]">
            <span className="text-brand">Admin</span>
            <Link href="/admin/feedback" className="text-muted normal-case tracking-normal hover:text-foreground">
              Feedback
            </Link>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Waitlist
            {items.length > 0 && (
              <span className="ml-3 text-lg font-medium text-muted">{count} signups</span>
            )}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void copyEmails()}
            disabled={items.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-surface disabled:opacity-60"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy emails'}
          </button>
          <button
            type="button"
            onClick={downloadCsv}
            disabled={items.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-surface disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>
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

      {items.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="bg-background">
                  <td className="px-4 py-3 font-medium text-foreground">{item.email}</td>
                  <td className="px-4 py-3 text-muted">{item.source ?? '—'}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {state === 'idle' && items.length === 0 && !error && (
        <p className="text-sm text-muted">Enter the admin token and load to see waitlist signups.</p>
      )}
    </div>
  );
}
