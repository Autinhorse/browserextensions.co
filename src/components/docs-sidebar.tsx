import {Link} from '@/i18n/navigation';
import type {DocGroup} from '@/lib/docs';

/**
 * Renders the docs sidebar for one product. `currentSlug` is passed by the page
 * (server component) so the active link can be highlighted without client JS.
 */
export function DocsSidebar({
  product,
  groups,
  currentSlug,
}: {
  product: string;
  groups: DocGroup[];
  currentSlug: string;
}) {
  return (
    <nav className="space-y-6 text-sm">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            {group.title}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const active = item.slug === currentSlug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/docs/${product}/${item.slug}`}
                    aria-current={active ? 'page' : undefined}
                    className={
                      active
                        ? 'block rounded-md bg-foreground/5 px-3 py-1.5 font-medium text-foreground'
                        : 'block rounded-md px-3 py-1.5 text-muted transition hover:bg-foreground/5 hover:text-foreground'
                    }
                  >
                    {item.navLabel}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
