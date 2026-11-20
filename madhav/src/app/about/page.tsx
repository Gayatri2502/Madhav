"use client";

import { Calendar, Users, Package, Layers, Factory } from "lucide-react";
import TimeLine from "@/components/ui/release-time-line";
import { Reveal } from "@/components/animations";

const history = [
  {
    icon: Calendar, year: "1936", title: "Printing begins in Tasgaon",
    subtitle: "Shridhar Deodhar",
    description: "Our great-grandfather, Shridhar Deodhar, began the family business with general printing in Tasgaon.",
  },
  {
    icon: Users, year: "1955", title: "A broader printing practice",
    subtitle: "Vishwanath Deodhar",
    description: "Vishwanath Deodhar took on the key responsibilities of Madhav Enterprises, developing its commercial and institutional printing work.",
    items: ["Educational societies and brands", "Co-operative credit societies", "Revenue departments", "Commercial printing", "Election Commission printing"],
  },
  {
    icon: Package, year: "1988", title: "Expansion into box manufacturing",
    subtitle: "From print to packaging",
    description: "The business expanded into box manufacturing, adding packaging to its established printing work.",
  },
  {
    icon: Layers, year: "2009", title: "Cartons and mono cartons",
    subtitle: "An expanded packaging range",
    description: "Carton and mono carton manufacturing joined the range, supporting customised printed packaging.",
  },
  {
    icon: Factory, year: "2017", title: "Liner carton production",
    subtitle: "Developing the production line",
    description: "A liner carton production line marked the next stage of expansion. The machinery range developed to include automatic flap testing and automatic flute testing machines.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <TimeLine
        title="Our printing heritage"
        description="A family printing business founded in Tasgaon in 1936, growing through generations into carton and corrugated packaging manufacturing."
        entries={history}
      />
      <section className="py-16 sm:py-24 bg-background" aria-labelledby="firms-heading">
        <Reveal variant="fade-up" className="container-fluid mx-auto">
          <p className="text-sm text-muted-foreground mb-3">Our businesses</p>
          <h2 id="firms-heading" className="text-3xl font-medium tracking-tight mb-8">Firms we own</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {["Madhav Art Printer", "RV Stationers & Printers"].map(name => (
              <div key={name} className="rounded-2xl border border-border p-6 sm:p-8 bg-white/60">
                <h3 className="text-xl font-medium">{name}</h3>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
