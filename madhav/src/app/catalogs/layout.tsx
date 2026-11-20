import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corrugated Packaging Catalogs | Madhav Offset Printers',
  description: 'Browse corrugated packaging product prototypes, including kraft shipping cartons, custom mailers, display trays, and protective paper inserts.',
};

export default function CatalogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
