import Link from 'next/link';

const pages = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Catalog', href: '/catalogs' },
  { label: 'Contact', href: '/contact' },
];
const policies = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Sitemap', href: '/sitemap' },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-8 pb-8">
          <div><Link href="/" className="text-lg font-medium text-white">Madhav Offset Printers</Link><p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">Corrugated packaging, custom structures and printed solutions.</p></div>
          <nav aria-label="Footer navigation" className="flex flex-wrap content-start gap-x-6 gap-y-4 text-sm">{pages.map(page => <Link key={page.href} href={page.href} className="hover:text-white transition-colors">{page.label}</Link>)}</nav>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col lg:flex-row lg:justify-between gap-5 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Madhav Offset Printers. All rights reserved.</p>
          <nav aria-label="Policies and site information" className="flex flex-wrap gap-x-5 gap-y-3">{policies.map(page => <Link key={page.href} href={page.href} className="hover:text-white transition-colors">{page.label}</Link>)}</nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
