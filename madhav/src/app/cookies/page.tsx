import type { Metadata } from 'next';
import Link from 'next/link';
import { PolicyPage } from '@/components/legal/policy-page';

export const metadata: Metadata = { title: 'Cookie Policy | Madhav Offset Printers', description: 'Information about cookies, local storage and external services on this website.' };
export default function CookiesPage() {
  return <PolicyPage title="Cookie Policy" intro="Cookies are small files a website can store in your browser. Similar browser storage can remember settings or support tracking." sections={[
    { title: 'What the current website uses', body: <p>The current website application does not set optional tracking cookies, use advertising pixels or include behavioural analytics. It does not use browser local storage or session storage to build visitor profiles. Images and page files may be cached by your browser; caching files is different from setting tracking cookies.</p> },
    { title: 'Hosting and external resources', body: <p>The deployed hosting platform may use technical measures to deliver or secure pages. Some pages load external images or 3D resources. These requests can share technical information with resource providers, even when no cookie is involved.</p> },
    { title: 'Leaving this website', body: <p>When you open WhatsApp or another external service, that service may use cookies or similar technologies under its own policy. This website does not control those settings.</p> },
    { title: 'Your controls', body: <p>You can inspect, block or delete cookies and website storage in your browser settings. Blocking resources may affect images or interactive features. We will update this policy and provide appropriate choices before adding optional tracking technologies that require consent.</p> },
    { title: 'Further information', body: <p>Read our <Link href="/privacy">Privacy Policy</Link> or use our <Link href="/contact">contact page</Link> for questions about the current website.</p> },
  ]} />;
}
