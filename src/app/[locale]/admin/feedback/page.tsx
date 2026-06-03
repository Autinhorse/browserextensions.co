import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {FeedbackAdmin} from '@/components/feedback-admin';

export const metadata: Metadata = {
  title: 'Feedback Admin',
  robots: {index: false, follow: false},
};

export default async function FeedbackAdminPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <FeedbackAdmin />;
}
