import Image from 'next/image';
import Link from 'next/link';
import { catalogProducts } from '@/lib/catalog-products';
import styles from './catalogs.module.css';

export default function CatalogsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Madhav Offset Printers / Catalog</p>
        <h1>Corrugated packaging collection</h1>
        <p className={styles.intro}>Nine packaging formats, including printed cartons, corrugated rolls, sheets and multicolour labels.</p>
        <div className={styles.note}><strong>A guide to size</strong><span>Dimensions are illustrative examples in millimetres. Each format shows its measurement order. Final sizes and material specifications are agreed for your product.</span></div>
      </header>
      <div className={styles.grid}>
        {catalogProducts.map((product, index) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.visual}>
              <span className={styles.code}>MOP / {String(index + 1).padStart(2, '0')}</span>
              <div className={styles.imageFrame}><Image src={product.image} alt={product.alt} fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 30vw" className={styles.image} priority={index < 3} /></div>
              <span className={styles.length} aria-hidden="true">{product.measurementLabels?.[0] ?? 'L'} {product.length} mm</span>
              <span className={styles.height} aria-hidden="true">{product.measurementLabels?.[2] ?? 'H'} {product.height} mm</span>
              <span className={styles.width} aria-hidden="true">{product.measurementLabels?.[1] ?? 'W'} {product.width} mm</span>
            </div>
            <div className={styles.body}>
              <p className={styles.category}>{product.category}</p>
              <h2>{product.name}</h2>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.dimensions}><span>Example dimensions</span><strong>{product.dimensions} <small>mm</small></strong><span>{product.dimensionOrder ?? 'Length × Width × Height'}</span></div>
            </div>
          </article>
        ))}
      </div>
      <footer className={styles.contact}><div><h2>Need a different size?</h2><p>Tell us what you are packing. We can discuss the structure, board and dimensions.</p></div><Link href="/contact">Contact Us <span aria-hidden="true">↗</span></Link></footer>
    </div>
  );
}
