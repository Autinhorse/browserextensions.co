'use client';

import type {ComponentProps} from 'react';
import {Link} from '@/i18n/navigation';

type HashLinkProps = ComponentProps<typeof Link> & {
  /** The id of the target section on the current page (without the leading #). */
  hash: string;
};

/**
 * A locale-aware link to an in-page section.
 *
 * Plain `Link href="/#section"` clicks are a no-op the second time around: once
 * the URL already ends in `#section`, the router sees no change and skips the
 * scroll. This component scrolls manually so repeat clicks always work, and
 * falls back to normal navigation when the target isn't on the current page.
 */
export function HashLink({hash, onClick, ...props}: HashLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        const target = document.getElementById(hash);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({behavior: 'smooth'});
          history.replaceState(null, '', `#${hash}`);
        }
        onClick?.(event);
      }}
    />
  );
}
