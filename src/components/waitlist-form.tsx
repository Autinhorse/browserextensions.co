'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'invalid';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function WaitlistForm() {
  const t = useTranslations('Home.waitlist');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setState('invalid');
      return;
    }
    setState('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (res.ok) {
        setEmail('');
        setState('success');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return <p className="text-sm font-medium text-emerald-400">{t('success')}</p>;
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (state !== 'idle') setState('idle');
          }}
          placeholder={t('placeholder')}
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {t('button')}
        </button>
      </form>
      {(state === 'error' || state === 'invalid') && (
        <p className="mt-2 text-sm text-red-400">{t(state)}</p>
      )}
    </div>
  );
}
