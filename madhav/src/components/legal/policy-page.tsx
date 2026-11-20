import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './policy-page.module.css';

export type PolicySection = { title: string; body: ReactNode };
export function PolicyPage({ title, intro, sections }: { title: string; intro: string; sections: PolicySection[] }) {
  return (
    <article className={styles.page}>
      <Link href="/" className={styles.back}>← Madhav Offset Printers</Link>
      <header className={styles.header}><p className={styles.date}>Last updated: 25 October 2026</p><h1>{title}</h1><p className={styles.intro}>{intro}</p></header>
      <div className={styles.content}>{sections.map((section, index) => <section key={section.title}><h2>{index + 1}. {section.title}</h2><div>{section.body}</div></section>)}</div>
      <aside className={styles.help}><h2>Questions or feedback?</h2><p>Use our <Link href="/contact">contact page</Link> and let us know which page or request you need help with.</p></aside>
      <nav className={styles.links} aria-label="Related policies"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms & Conditions</Link><Link href="/cookies">Cookie Policy</Link><Link href="/accessibility">Accessibility</Link><Link href="/sitemap">Sitemap</Link></nav>
    </article>
  );
}
