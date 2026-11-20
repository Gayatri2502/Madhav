import Image from 'next/image';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import styles from './contact.module.css';

const contactOptions = [
  {
    title: 'Chat on WhatsApp',
    description: 'Share a reference, a sketch or your packaging requirements.',
    detail: 'Start a conversation',
    href: 'https://wa.me/912228374567?text=Hello%20Madhav%20Print%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.',
    icon: MessageCircle,
    external: true,
  },
  {
    title: 'Call Us',
    description: 'Talk through your product and the packaging it needs.',
    detail: '+91 22 2837 4567',
    href: 'tel:+912228374567',
    icon: Phone,
    external: false,
  },
  {
    title: 'Mail Us',
    description: 'Send your dimensions, quantities and artwork together.',
    detail: 'sales@madhavprinters.com',
    href: 'mailto:sales@madhavprinters.com',
    icon: Mail,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <section className={styles.intro} aria-labelledby="contact-heading">
          <p className={styles.eyebrow}><span /> Madhav Offset Printers</p>
          <h1 id="contact-heading">Good packaging<br />starts with a<br /><span>conversation.</span></h1>
          <p className={styles.description}>A new product, a better box or a print idea. Tell us what you have in mind.</p>
          <div className={styles.collection}>
            <Image src="/images/packaging/packaging-collection-v2.webp" alt="Corrugated rolls, printed cartons, labels and sheets from our packaging collection" width={1440} height={960} sizes="(max-width: 760px) 90vw, 48vw" priority />
          </div>
          <div className={styles.caption}><span>Made around your product.</span><span>Print · Pack · Protect</span></div>
        </section>

        <section className={styles.contact} aria-labelledby="connect-heading">
          <p className={styles.eyebrow}>Get in touch</p>
          <h2 id="connect-heading">Let’s make it happen.</h2>
          <p className={styles.lead}>Choose the way that works for you.</p>
          <div className={styles.options}>
            {contactOptions.map(option => (
              <a key={option.title} href={option.href} className={styles.option} target={option.external ? '_blank' : undefined} rel={option.external ? 'noopener noreferrer' : undefined}>
                <span className={styles.icon}><option.icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                <div className={styles.optionBody}>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                  <span className={styles.detail}>{option.detail}</span>
                </div>
                <ArrowUpRight size={20} strokeWidth={1.5} className={styles.arrow} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
