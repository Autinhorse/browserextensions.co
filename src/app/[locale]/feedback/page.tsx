import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {FeedbackForm} from '@/components/feedback-form';
import {
  normalizeFeedbackApp,
  normalizeFeedbackPlatform,
  normalizeFeedbackType,
  singleSearchValue,
} from '@/lib/feedback-options';

type SearchParams = Promise<{[key: string]: string | string[] | undefined}>;

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Report a bug or request a feature for Browser Extensions products.',
};

export default async function FeedbackPage({
  params,
  searchParams,
}: {
  params: Promise<{locale: string}>;
  searchParams: SearchParams;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const query = await searchParams;
  const type = normalizeFeedbackType(singleSearchValue(query.type));
  const app = normalizeFeedbackApp(singleSearchValue(query.app));
  const platform = normalizeFeedbackPlatform(singleSearchValue(query.platform));
  const version = singleSearchValue(query.v) ?? '';
  const lang = singleSearchValue(query.lang) ?? locale;
  const uiLang = lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';

  const title = uiLang === 'zh' ? '反馈与功能需求' : 'Feedback and feature requests';
  const subtitle =
    uiLang === 'zh'
      ? '告诉我们遇到的问题，或者你希望插件增加什么能力。链接里的插件、版本和平台信息会自动带入。'
      : 'Tell us what went wrong or what you want the extension to support next. App, version, and platform details from the link are prefilled.';

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
          Browser Extensions
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{subtitle}</p>
      </div>

      <div className="rounded-lg border border-border bg-surface/70 p-5 shadow-2xl shadow-black/20 sm:p-6">
        <FeedbackForm
          initialType={type}
          initialApp={app}
          initialVersion={version}
          initialLang={lang}
          initialPlatform={platform}
          uiLang={uiLang}
        />
      </div>
    </section>
  );
}
