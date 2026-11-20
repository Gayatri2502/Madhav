import type { Metadata } from 'next';
import Link from 'next/link';
import { PolicyPage } from '@/components/legal/policy-page';

export const metadata: Metadata = { title: 'Sitemap | Madhav Offset Printers', description: 'Find company information, packaging services, catalog, contact details and website policies.' };
const groups = [
  { title: 'Main pages', links: [['Home', '/'], ['About', '/about'], ['Packaging services', '/services'], ['Product catalog', '/catalogs'], ['Contact', '/contact']] },
  { title: 'Company information', links: [['Portfolio', '/portfolio'], ['Infrastructure', '/infrastructure'], ['Quality & certifications', '/quality-certifications']] },
  { title: 'Policies and support', links: [['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms'], ['Cookie Policy', '/cookies'], ['Accessibility', '/accessibility']] },
];
export default function SitemapPage() {
  return <PolicyPage title="Sitemap" intro="A directory of the website’s main public pages and policies." sections={groups.map(group => ({ title: group.title, body: <ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul> }))} />;
}
