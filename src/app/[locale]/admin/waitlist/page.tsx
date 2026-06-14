import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {WaitlistAdmin} from '@/components/waitlist-admin';

export const metadata: Metadata = {
  title: 'Waitlist Admin',
  robots: {index: false, follow: false},
};

export default async function WaitlistAdminPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <WaitlistAdmin />;
}
