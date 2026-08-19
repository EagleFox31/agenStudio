import * as React from 'react';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import type { Language } from '../../lib/i18n';

interface Item {
  label: string;
  href: string;
  active: boolean;
}

interface Props {
  lang: Language;
  items: Item[];
  ctaLabel: string;
  contactHref: string;
  altLangHref: string;
  altLangLabel: string;
}

export default function MobileMenu({
  lang,
  items,
  ctaLabel,
  contactHref,
  altLangHref,
  altLangLabel,
}: Props): React.ReactElement {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeAndGo = () => setOpen(false);

  return (
    <div className="flex md:hidden items-center gap-3">
      <a
        href={altLangHref}
        className="px-2.5 py-1 rounded border border-ink/15 text-xs font-mono font-medium text-ink min-h-[36px] inline-flex items-center"
        aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      >
        {altLangLabel}
      </a>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-lg text-ink hover:bg-ink/5 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
        aria-expanded={open}
        aria-controls="agen-mobile-nav"
        aria-label={
          open
            ? lang === 'fr'
              ? 'Fermer le menu'
              : 'Close menu'
            : lang === 'fr'
              ? 'Ouvrir le menu'
              : 'Open menu'
        }
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div
          id="agen-mobile-nav"
          className="fixed inset-0 top-[60px] z-30 bg-canvas flex flex-col justify-between p-6 overflow-y-auto border-t border-ink/10 shadow-2xl"
          role="dialog"
          aria-modal="true"
        >
          <nav
            className="flex flex-col gap-4 pt-4"
            aria-label={lang === 'fr' ? 'Navigation mobile' : 'Mobile navigation'}
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeAndGo}
                className={`text-lg font-heading font-medium py-2 border-b border-ink/5 flex items-center justify-between min-h-[44px] ${
                  item.active ? 'text-teal font-semibold' : 'text-ink'
                }`}
                aria-current={item.active ? 'page' : undefined}
              >
                <span>{item.label}</span>
                {item.active && <span className="w-2 h-2 rounded-full bg-teal" aria-hidden="true" />}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-ink/10">
            <a
              href={contactHref}
              onClick={closeAndGo}
              className="inline-flex w-full items-center justify-center gap-2 bg-teal text-white px-5 py-3 rounded-lg font-medium min-h-[44px]"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
