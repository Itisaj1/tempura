import {useEffect, type ReactNode} from 'react';

const LEGAL_NAV = [
  {href: '/privacy', label: 'Privacy Policy'},
  {href: '/terms', label: 'Terms of Service'},
  {href: '/cookies', label: 'Cookie Policy'},
] as const;

export const LegalLayout = ({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) => {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} | Panko Studio`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream selection:bg-brand-accent selection:text-brand-bg">
      <a href="/" className="skip-link">
        Skip to home
      </a>
      <header className="border-b border-brand-cream/12 px-4 py-5 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-6">
          <a
            href="/"
            className="font-display text-xl font-bold tracking-tight text-brand-cream hover:text-brand-cream/90"
          >
            panko studio
          </a>
          <a
            href="/"
            className="text-sm font-semibold text-brand-cream/70 transition-colors hover:text-brand-cream"
          >
            Back to site
          </a>
        </div>
      </header>

      <main className="legal-prose mx-auto max-w-3xl px-4 py-12 md:px-10 md:py-16">
        <p className="legal-eyebrow">Legal</p>
        <h1>{title}</h1>
        <p className="legal-updated">Last updated: {updated}</p>
        {children}
      </main>

      <footer className="border-t border-brand-cream/12 px-4 py-10 md:px-10">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Legal" className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {LEGAL_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-brand-cream/75 transition-colors hover:text-brand-cream"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <p className="text-sm text-brand-cream/55">© {new Date().getFullYear()} Panko Studio</p>
        </div>
      </footer>
    </div>
  );
};
