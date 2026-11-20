import type { Metadata } from 'next';
import Link from 'next/link';
import { PolicyPage } from '@/components/legal/policy-page';

export const metadata: Metadata = { title: 'Accessibility | Madhav Offset Printers', description: 'Accessibility features, known limitations and how to report a barrier on this website.' };
export default function AccessibilityPage() {
  return <PolicyPage title="Accessibility" intro="We want visitors to be able to read our packaging information and contact us using different devices and assistive technologies." sections={[
    { title: 'Features in this website', body: <ul><li>Text descriptions accompany product images, including product names and example dimensions in the catalog.</li><li>Navigation uses standard links and buttons with visible keyboard focus styles.</li><li>Pages adapt to smaller screens, and the mobile navigation includes an Escape-key close action.</li><li>Several animations respond to the operating system’s reduced-motion preference.</li></ul> },
    { title: 'Known limitations', body: <p>The website has not completed an independent accessibility conformance audit, so we do not claim full WCAG conformance. Animated galleries and 3D demonstrations may be difficult to use with some assistive technologies. Some external images may be unavailable or depend on third-party services. The <Link href="/catalogs">catalog</Link> and <Link href="/services">services page</Link> provide product information in a simpler layout.</p> },
    { title: 'Report a barrier or request another format', body: <p>Use our <Link href="/contact">contact page</Link> to report a problem or request product information in another format. If possible, include the page address, what you were trying to do, the issue encountered and your browser or assistive technology. Please do not include sensitive personal information. We will use the details to understand the problem and discuss an alternative way to provide the information.</p> },
    { title: 'Third-party services', body: <p>External services such as WhatsApp have their own accessibility features and support channels. If one contact method is inaccessible to you, try another method listed on our contact page.</p> },
  ]} />;
}
