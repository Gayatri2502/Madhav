import Image from 'next/image';
import Link from 'next/link';
import { catalogProducts } from '@/lib/catalog-products';
import styles from './services.module.css';

const serviceNotes: Record<string, { id: string; title: string; points: string[] }> = {
  'corrugated-boxes': { id: 'corrugated-boxes', title: 'Corrugated Box Manufacturing', points: ['Carton structure and size selection', 'Board construction for the application', 'Flat-packed carton layouts'] },
  'mono-cartons': { id: 'mono-cartons', title: 'Mono Carton Manufacturing', points: ['Folding paperboard structures', 'Tuck-top and closure layouts', 'Custom artwork and print placement'] },
  'four-colour-box': { id: 'four-colour-box', title: 'Four-colour Printed Boxes', points: ['CMYK artwork preparation', 'Print placement across carton panels', 'Custom carton sizes and finishes'] },
  'multicolour-corrugated': { id: 'multicolour-corrugated', title: 'Multicolour Corrugated Packaging', points: ['Printed shipping and mailer formats', 'Coordinated packaging artwork', 'Board and structure selection'] },
  'corrugated-rolls': { id: 'corrugated-rolls', title: 'Corrugated Rolls', points: ['Product wrapping and cushioning', 'Roll width and length selection', 'Flexible protective packing'] },
  'multicolour-labels': { id: 'multicolour-labels', title: 'Multicolour Label Printing', points: ['Label size and shape selection', 'Product branding and artwork layouts', 'Roll-format label planning'] },
  'board-prototyping': { id: 'corrugated-sheets', title: 'Corrugated Sheets', points: ['Sheet size and thickness selection', 'Layering and protective pads', 'Board construction for conversion'] },
  'printed-mailer': { id: 'ecommerce-mailers', title: 'Printed E-commerce Packaging', points: ['Mailer structures and closures', 'Artwork placement and print layouts', 'Product presentation and inserts'] },
  'die-cut-packaging': { id: 'die-cut-packaging', title: 'Die-cutting & Creasing', points: ['Custom tabs, slots and openings', 'Self-locking structures', 'Tray and sleeve development'] },
  'retail-display': { id: 'retail-displays', title: 'Retail & Countertop Displays', points: ['Stepped display structures', 'Shelf and counter presentation', 'Product-facing artwork panels'] },
  'protective-inserts': { id: 'protective-inserts', title: 'Protective Inserts & Partitions', points: ['Interlocking dividers', 'Corrugated pads and spacers', 'Product-fit corner protection'] },
  'produce-tray': { id: 'produce-trays', title: 'Produce & Open-top Trays', points: ['Open-top tray structures', 'Hand holes and ventilation layouts', 'Reinforced corners and folds'] },
  'bottle-carrier': { id: 'bottle-carriers', title: 'Bottle Carriers & Dividers', points: ['Multi-compartment layouts', 'Integrated carry handles', 'Bottle separation and fit'] },
  'telescopic-box': { id: 'telescopic-boxes', title: 'Two-piece Packaging', points: ['Separate lid and base structures', 'Product-specific depth and fit', 'Easy-access presentation'] },
  'pizza-box': { id: 'hinged-boxes', title: 'Hinged & Flat-product Boxes', points: ['Low-profile box structures', 'Integrated hinged lids', 'Locking tabs and folded edges'] },
};

const services = [
  ...catalogProducts.map(product => ({ ...serviceNotes[product.id], image: product.image, alt: product.alt, description: product.description })),
  { id: 'board-prototyping', title: 'Board Selection & Prototyping', image: '/images/packaging/corrugated-sheets.webp', alt: 'Corrugated board samples showing different wall constructions', description: 'Compare materials and physical structures before finalising the pack.', points: ['Flute and wall construction review', 'Physical structural samples', 'Product fit and assembly checks'] },
  { id: 'structural-design', title: 'Structural Design & Dielines', image: '/images/packaging/die-cut-packaging.webp', alt: 'Flat corrugated dieline beside its assembled tray', description: 'Develop the cuts, folds and closures around your product.', points: ['Product dimension review', 'Dieline and crease planning', 'Material-efficient layouts'] },
  { id: 'shelf-ready-packaging', title: 'Shelf-ready Packaging', image: '/images/packaging/produce-tray.webp', alt: 'Open corrugated tray illustrating a shelf-ready packaging structure', description: 'Explore tray formats that help organise and present products on shelves.', points: ['Open display tray formats', 'Pack count and shelf fit', 'Simple assembly and replenishment'] },
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.heading}><p className={styles.eyebrow}>Madhav Offset Printers / Services</p><h1>Corrugated packaging services</h1><p>From structural design to finished cartons, explore packaging options for your products. Share your requirements with us to confirm materials, dimensions and production suitability.</p></header>
      <div className={styles.grid}>
        {services.map(service => (
          <article key={service.id} id={service.id} className={styles.card}>
            <div className={styles.visual}><Image src={service.image} alt={service.alt} fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 30vw" className={styles.image} /></div>
            <div className={styles.body}><h2>{service.title}</h2><p>{service.description}</p><ul>{service.points.map(point => <li key={point}>{point}</li>)}</ul></div>
          </article>
        ))}
      </div>
      <section className={styles.contact}><div><h2>Let’s find the right structure.</h2><p>Discuss your product, artwork and packing requirements with our team.</p></div><Link href="/contact">Contact Us <span aria-hidden="true">↗</span></Link></section>
    </div>
  );
}
