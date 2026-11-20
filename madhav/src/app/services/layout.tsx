import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corrugated Packaging Services | Madhav Offset Printers',
  description: 'Explore corrugated shipping boxes, printed mailers, die-cut trays, retail displays, protective inserts, and packaging prototypes.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
