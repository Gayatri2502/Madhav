import Image from 'next/image';
import Link from 'next/link';
import styles from './packaging-glass-hero.module.css';

export function PackagingGlassHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.intro}>
        <div>
          <p className={styles.name}>Madhav Offset Printers</p>
          <h1 id="hero-title" className={styles.title}>Packaging, considered<br />from every angle.</h1>
        </div>
        <div className={styles.details}>
          <p>Corrugated rolls, mono cartons, four-colour printed boxes and multicolour labels. Packaging shaped around your product.</p>
          <Link href="/contact" className={styles.contact}>Contact Us <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className={styles.collection}>
        <Image src="/images/packaging/packaging-collection-v2.webp" alt="Collection of corrugated rolls, mono cartons, four-colour printed boxes, multicolour labels and corrugated sheets" fill priority sizes="(max-width: 768px) 100vw, 90vw" className={styles.image} />
      </div>
      <div className={styles.caption}><span>Printing & packaging collection</span><Link href="/catalogs">View the collection <span aria-hidden="true">↗</span></Link></div>
    </div>
  );
}
