'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/animations';
import styles from './packaging-capabilities.module.css';

const capabilities = [
  { name: 'Custom Designs', detail: 'Structures shaped around your product.', image: 'printed-mailer', alt: 'Open printed corrugated mailer showing its fitted kraft interior' },
  { name: 'Precision Finishing', detail: 'Considered cuts, creases and folds.', image: 'die-cut-packaging', alt: 'Assembled die-cut tray beside its flat corrugated blank' },
  { name: 'Protective Packaging', detail: 'Inserts that keep every piece in place.', image: 'protective-inserts', alt: 'Corrugated partitions and corner protectors arranged around an open box' },
  { name: 'Paper-based Materials', detail: 'Corrugated board, inside and out.', image: 'corrugated-sheets', alt: 'Corrugated board samples showing their fluted construction' },
];

export function HeroSection() {
  return (
    <section id="packaging-capabilities" className={styles.section} aria-labelledby="capabilities-title">
      <Reveal variant="fade-up">
        <div className={styles.heading}>
          <div><p className={styles.eyebrow}>Our approach</p><h2 id="capabilities-title">Packaging, considered<br />from every angle.</h2></div>
          <div className={styles.intro}><p>Custom corrugated structures, printed surfaces and protective details. Each part works together around your product.</p><Link href="/contact">Contact Us <span aria-hidden="true">↗</span></Link></div>
        </div>
      </Reveal>
      <div className={styles.grid}>
        {capabilities.map((item, index) => (
          <Reveal key={item.name} variant="fade-up" delay={index * 60}>
            <article className={styles.card}>
              <span className={styles.number} aria-hidden="true">0{index + 1}</span>
              <div className={styles.stage}>
                <div className={styles.platform} aria-hidden="true" />
                <Image src={`/images/packaging/${item.image}.webp`} alt={item.alt} fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 23vw" className={styles.product} />
              </div>
              <h3>{item.name}</h3><p>{item.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Link className={styles.more} href="/services">Explore our capabilities <span aria-hidden="true">↗</span></Link>
    </section>
  );
}
