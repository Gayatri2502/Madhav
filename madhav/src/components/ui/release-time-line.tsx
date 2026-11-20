"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  Building, 
  Factory, 
  Package, 
  Award, 
  Leaf, 
  Users, 
  Truck,
  Sparkles,
  Zap,
  Calendar,
  Shield,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export type TimeLineEntry = {
  icon: React.ComponentType<{ className?: string }>;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  imageAlt?: string;
  capabilities?: string[];
  stats?: { label: string; value: string }[];
};

export interface TimeLineProps {
  title?: React.ReactNode;
  description?: string;
  entries?: TimeLineEntry[];
  className?: string;
}

export const defaultEntries: TimeLineEntry[] = [
  {
    icon: Building,
    year: "1936",
    title: "Founded in Mumbai",
    subtitle: "The Beginning",
    description:
      "Shri Madhav Lalji established Madhav Offset Printers as a modest letterpress printing shop in the heart of Mumbai. With a single machine and an unwavering commitment to quality, the foundation was laid for what would become an 88+ year legacy of printing excellence.",
    items: [
      "Started with a single letterpress machine in a small workshop",
      "Served local businesses, publishers, and educational institutions",
      "Built reputation for precision, reliability, and on-time delivery",
      "Established client relationships that span generations",
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f3568d9?w=800&q=80",
    imageAlt: "Vintage letterpress printing workshop 1930s",
    stats: [
      { label: "Years Since Founding", value: "88+" },
      { label: "Generations", value: "3" },
    ],
  },
  {
    icon: Sparkles,
    year: "1952",
    title: "First Offset Press",
    subtitle: "Technology Revolution",
    description:
      "Pioneering the adoption of offset printing technology in Western India, Madhav Offset installed its first offset press—revolutionizing print quality, color fidelity, and production speed. This bold move positioned the company as an industry leader during India's post-independence industrial growth.",
    items: [
      "First offset printing machine in the region",
      "Enabled full-color commercial printing at scale",
      "Expanded from letterpress to modern offset technology",
      "Attracted major corporate and publishing clients",
    ],
    image: "https://images.unsplash.com/photo-1611090504102-7c6a0a6d1c42?w=800&q=80",
    imageAlt: "Vintage offset printing press 1950s",
    stats: [
      { label: "Technology Leap", value: "Offset" },
      { label: "Color Capability", value: "4-Color" },
    ],
  },
  {
    icon: Users,
    year: "1978",
    title: "Second Generation Leadership",
    subtitle: "Mr. Rajesh Madhav Joins",
    description:
      "Mr. Rajesh Madhav joined the family business, bringing modern management practices, strategic vision, and a focus on operational excellence. Under his leadership, the company professionalized its operations, expanded service offerings, and built enduring relationships with national brands.",
    items: [
      "Implemented modern management and quality systems",
      "Expanded into commercial printing for national brands",
      "Established structured apprenticeship and training programs",
      "Built long-term partnerships with paper mills and suppliers",
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    imageAlt: "Printing facility management and operations 1970s",
    stats: [
      { label: "Leadership Era", value: "35+ Years" },
      { label: "Team Growth", value: "10x" },
    ],
  },
  {
    icon: Zap,
    year: "1995",
    title: "Digital Printing Revolution",
    subtitle: "First Digital Press in Region",
    description:
      "Anticipating the shift toward short-run, personalized printing, Madhav Offset became the first in Western India to invest in digital printing technology. This enabled variable data printing, ultra-fast turnarounds, and cost-effective short runs—opening entirely new market segments.",
    items: [
      "First digital press installation in Western India",
      "Pioneered variable data printing (VDP) capabilities",
      "Enabled 24-hour turnaround for urgent jobs",
      "Cost-effective short runs from 1 to 1,000 copies",
    ],
    image: "https://images.unsplash.com/photo-1611090504102-7c6a0a6d1c42?w=800&q=80",
    imageAlt: "Digital printing press technology 1990s",
    stats: [
      { label: "Turnaround", value: "24 hrs" },
      { label: "Min Run", value: "1 copy" },
    ],
  },
  {
    icon: Package,
    year: "2008",
    title: "Packaging Division Launch",
    subtitle: "Dedicated Packaging Manufacturing",
    description:
      "Launched a state-of-the-art dedicated packaging division with specialized equipment for folding cartons, corrugated boxes, labels, and flexible packaging. This strategic diversification transformed Madhav from a commercial printer into a full-spectrum packaging manufacturer serving FMCG, pharma, and premium brands.",
    items: [
      "Folding carton production: Heidelberg & Bobst equipment",
      "Corrugated boxes: 3-ply to 7-ply, custom flute profiles",
      "Labels: Pressure-sensitive, shrink sleeves, in-mold labels",
      "Flexible packaging: Pouches, laminates, barrier films",
      "In-house die-making, prototyping, and structural design",
      "Food-grade & pharma-compliant manufacturing (ISO 22000 ready)",
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    imageAlt: "Modern packaging manufacturing facility",
    capabilities: [
      "Folding Cartons (SBS, FBB, CCNB up to 600 GSM)",
      "Corrugated (E/F/B/C/Flute, Single/Double/Triple Wall)",
      "Labels (PS, Shrink Sleeve, IML, Wet Glue)",
      "Flexible Packaging (Mono/Multi-layer Laminates)",
      "Rigid Boxes (Setup, Magnetic, Hinged Lid)",
      "Specialty Finishes (Foil, Emboss, Spot UV, Soft Touch)",
    ],
    stats: [
      { label: "Monthly Capacity", value: "50M+ Units" },
      { label: "Substrates", value: "50+" },
      { label: "Finishing Options", value: "20+" },
      { label: "Certifications", value: "ISO 9001, FSC, Sedex" },
    ],
  },
  {
    icon: Award,
    year: "2015",
    title: "ISO 9001:2015 Certification",
    subtitle: "Quality Management Excellence",
    description:
      "Achieved ISO 9001:2015 certification across all production processes—commercial printing, digital printing, and packaging manufacturing. This formalized a culture of continuous improvement, standardized workflows, and rigorous quality assurance at every stage from pre-press to dispatch.",
    items: [
      "Unified QMS across printing and packaging divisions",
      "Statistical process control (SPC) on critical parameters",
      "Automated color management with spectrophotometer verification",
      "Traceability from raw material to finished goods",
    ],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    imageAlt: "Quality control laboratory and certification",
    stats: [
      { label: "Certified Since", value: "2015" },
      { label: "Audit Score", value: "98%+" },
    ],
  },
  {
    icon: Leaf,
    year: "2018",
    title: "Sustainability Commitment",
    subtitle: "FSC & Eco-Friendly Manufacturing",
    description:
      "Achieved FSC Chain of Custody certification and transitioned to eco-friendly inks, solvent-free lamination, and energy-efficient equipment. Implemented comprehensive waste reduction, water recycling, and carbon footprint tracking—making sustainability a core manufacturing principle, not an afterthought.",
    items: [
      "FSC Chain of Custody certified (COC-001234)",
      "Soy/vegetable-based inks across all presses",
      "Solvent-free lamination and water-based coatings",
      "95% waste recycling rate, zero liquid discharge target",
      "Solar power integration: 40% energy from renewables",
    ],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    imageAlt: "Sustainable manufacturing and green facility",
    stats: [
      { label: "Recycling Rate", value: "95%+" },
      { label: "Renewable Energy", value: "40%" },
      { label: "VOC Reduction", value: "80%" },
    ],
  },
  {
    icon: Layers,
    year: "2020",
    title: "Third Generation & Creative Integration",
    subtitle: "Ms. Priya Madhav — Creative Director",
    description:
      "Ms. Priya Madhav (NID graduate) joined as Creative Director, bringing contemporary design sensibilities, brand strategy expertise, and digital workflow integration. This marked the evolution from a pure manufacturing partner to a strategic design-to-delivery partner offering end-to-end brand packaging solutions.",
    items: [
      "In-house structural & graphic design studio",
      "Brand packaging strategy and shelf-impact consulting",
      "Digital workflow: Web-to-print, automated preflight",
      "Rapid prototyping: 3D mockups, digital samples in 24hrs",
      "Design for manufacturability (DFM) consultation",
    ],
    image: "https://images.unsplash.com/photo-1558655146-9f40138ed15f?w=800&q=80",
    imageAlt: "Design studio and creative workspace",
    stats: [
      { label: "Design Projects", value: "200+" },
      { label: "Prototype Speed", value: "24 hrs" },
    ],
  },
  {
    icon: Truck,
    year: "2024",
    title: "85th Anniversary & Heidelberg/Komori Upgrade",
    subtitle: "State-of-the-Art Facility",
    description:
      "Celebrating 85 years with major capital investment: new Heidelberg Speedmaster XL 106 (8+coater) and Komori Lithrone G40 offset presses, plus Bobst Expertfold 110 folder-gluer. This positions Madhav for the next generation of high-fidelity, high-volume, sustainable packaging manufacturing.",
    items: [
      "Heidelberg Speedmaster XL 106-8+L (LED UV, Intellistart)",
      "Komori Lithrone G40 (H-UV, PQA color control)",
      "Bobst Expertfold 110 (Auto-setup, crash lock)",
      "Expanded warehousing & JIT delivery capabilities",
      "ERP-integrated production planning & real-time tracking",
    ],
    image: "https://images.unsplash.com/photo-1581091012184-8855b6b8b0e8?w=800&q=80",
    imageAlt: "Modern Heidelberg and Komori press installation",
    stats: [
      { label: "Press Speed", value: "18,000 sph" },
      { label: "Max Format", value: "B1 / 1020mm" },
      { label: "Coating", value: "LED UV + Aqueous" },
      { label: "Automation", value: "Level 4" },
    ],
  },
];

/**
 * Interactive Timeline with Synced Image Panel
 * - Vertical timeline line connects all entries
 * - Active entry determined by scroll position (center viewport)
 * - Right panel shows image that transitions smoothly per active entry
 * - Light theme, clean aesthetic
 */

import { useIsMobile } from "@/hooks/useIsMobile";


/**
 * Interactive Timeline with Synced Image Panel
 * - Vertical timeline line connects all entries
 * - Active entry determined by scroll position (center viewport)
 * - Right panel shows image that transitions smoothly per active entry
 * - Light theme, clean aesthetic
 */
export default function TimeLine({
  title = "Madhav Offset Printers — Our Journey",
  description = "Eighty-eight years of printing excellence, innovation, and craftsmanship. From a single letterpress to a state-of-the-art packaging manufacturing facility—our legacy spans three generations.",
  entries = defaultEntries,
}: TimeLineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imageTransform, setImageTransform] = useState("scale(1)");
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  // Scroll-based active index detection (desktop only)
  useEffect(() => {
    if (isMobile || !sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 2.5;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) {
        setActiveIndex(bestIndex);
      }
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, isMobile]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  // Smooth image transition when active index changes
  useEffect(() => {
    setImageOpacity(0);
    setImageTransform("scale(1.02)");
    const timer = setTimeout(() => {
      setImageOpacity(1);
      setImageTransform("scale(1)");
    }, 150);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const activeEntry = entries[activeIndex];

  return (
    <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-background">
      <div className="container-fluid mx-auto">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="relative h-2 w-2 rounded-full bg-primary animate-pulse" />
            Established 1936
          </span>
          <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground md:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Main Timeline Layout */}
        <div className="relative max-w-7xl mx-auto">
          {/* Timeline Vertical Line - Desktop only */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" aria-hidden="true" />
          
          {/* Timeline Dots Container - aligned with timeline line - Desktop only */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-4 pointer-events-none" aria-hidden="true">
            {entries.map((_, index) => (
              <div
                key={index}
                className="absolute w-4 h-4 rounded-full border-2 transition-all duration-500"
                style={{
                  top: `calc((100% / ${entries.length - 1}) * ${index})`,
                  transform: 'translateY(-50%) translateX(-50%)',
                  borderColor: index === activeIndex ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                  backgroundColor: index === activeIndex ? 'hsl(var(--primary))' : 'hsl(var(--background))',
                  boxShadow: index === activeIndex ? '0 0 0 4px hsl(var(--primary) / 0.2)' : 'none',
                  zIndex: index === activeIndex ? 10 : 5,
                }}
              />
            ))}
          </div>

          {/* Grid: Left Timeline | Right Image Panel */}
          <div className="relative flex flex-col md:flex-row gap-6 md:gap-8">
            
            {/* LEFT: Timeline Entries */}
            <div className="relative md:w-[calc(100%-300px)] min-w-0 pr-2 md:pr-4">
              {entries.map((entry, index) => {
                const isActive = !isMobile ? index === activeIndex : true; // Show all expanded on mobile
                const isLast = index === entries.length - 1;

                return (
                  <div
                    key={index}
                    className={`relative pb-8 sm:pb-10 md:pb-12 last:pb-0 ${isMobile ? 'mb-8' : ''}`}
                    ref={(el) => setItemRef(el, index)}
                    aria-current={isActive ? "true" : "false"}
                  >
                    {/* Sentinel for scroll detection - positioned at timeline dot level (Desktop only) */}
                    {!isMobile && (
                      <div
                        ref={(el) => setSentinelRef(el, index)}
                        aria-hidden
                        className="absolute left-8 -top-4 w-4 h-8 -translate-x-1/2 opacity-0"
                        style={{
                          top: `calc((100% / ${entries.length - 1}) * ${index})`,
                          transform: 'translateY(-50%) translateX(-50%)',
                        }}
                      />
                    )}

                    {/* Timeline Dot & Connector Line (Mobile) */}
                    <div className="md:hidden absolute left-4 top-0 bottom-0 flex items-start justify-center">
                      <div className="relative z-10">
                        <div
                          className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ${
                            isActive
                              ? "bg-primary border-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.2)]"
                              : "bg-background border-border"
                          }`}
                        />
                        {!isLast && (
                          <div
                            className="absolute top-2.5 left-1.25 w-0.5 h-full bg-gradient-to-b from-primary/20 to-transparent"
                          />
                        )}
                      </div>
                    </div>

                    {/* Entry Content */}
                    <div
                      className={`relative ml-10 md:ml-12 transition-all duration-500 ${isMobile ? '' : (isActive ? "opacity-100" : "opacity-70")}`}
                    >
                      {/* Year Badge */}
                      <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                        <span
                          className={`font-mono text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                            isActive ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {entry.year}
                        </span>
                        <div
                          className={`h-0.5 flex-1 max-w-[80px] sm:max-w-[100px] transition-all duration-300 ${
                            isActive ? "bg-primary" : "bg-border"
                          }`}
                        />
                      </div>

                      {/* Icon & Title Row */}
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div
                          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <entry.icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <h2 className={`font-bold text-base sm:text-lg md:text-xl transition-colors duration-300 ${
                            isActive ? "text-foreground" : "text-foreground/80"
                          }`}>
                            {entry.title}
                          </h2>
                          <p className={`text-xs sm:text-sm mt-0.5 transition-colors duration-300 ${
                            isActive ? "text-muted-foreground" : "text-muted-foreground/70"
                          }`}>
                            {entry.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`ml-14 md:ml-16 text-xs sm:text-sm leading-relaxed transition-all duration-300 ${isMobile ? 'text-muted-foreground' : (isActive ? "text-muted-foreground" : "text-muted-foreground/70 line-clamp-3")}`}>
                        {entry.description}
                      </p>

                      {/* Expandable Content - Always expanded on mobile */}
                      <div
                        className={`ml-14 md:ml-16 mt-3 overflow-hidden transition-all duration-500 ease-out ${isMobile ? 'max-h-96 opacity-100' : (isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}`}
                        style={{ transitionDelay: isActive ? "100ms" : "0ms" }}
                      >
                        <div className="space-y-3 pt-2">
                          {/* Key Highlights */}
{entry.items && entry.items.length > 0 && (
                             <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 sm:p-4 shadow-sm">
                              <h4 className="font-medium text-xs sm:text-sm text-foreground mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                                Key Highlights
                              </h4>
                              <ul className="space-y-1.5 sm:space-y-2">
                                {entry.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    <div className="mt-1 flex-shrink-0 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/60" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                           )}

                          {/* Packaging Capabilities */}
{entry.capabilities && entry.capabilities.length > 0 && (
                             <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 sm:p-4 shadow-sm">
                              <h4 className="font-medium text-xs sm:text-sm text-foreground mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                                <Factory className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                                Packaging Manufacturing Capabilities
                              </h4>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {entry.capabilities.map((cap, capIndex) => (
                                  <span
                                    key={capIndex}
                                    className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                                  >
                                    {cap}
                                  </span>
                                ))}
                              </div>
                            </div>
                           )}

                          {/* Stats */}
{entry.stats && entry.stats.length > 0 && (
                             <div className="grid grid-cols-2 gap-2 sm:gap-3">
                               {entry.stats.map((stat, statIndex) => (
                                 <div
                                   key={statIndex}
                                   className="rounded-xl border border-primary/30 bg-primary/5 p-3 sm:p-4 text-center shadow-sm"
                                 >
                                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-mono">
                                    {stat.value}
                                  </div>
                                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                                    {stat.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                           )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Synced Image Panel - Desktop only */}
            {!isMobile && (
              <div className="relative md:w-[280px] flex-shrink-0 hidden md:block">
                <div
                  ref={imageRef}
                  className="sticky top-20 h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] rounded-xl overflow-hidden bg-muted/30 border border-border/50 shadow-lg transition-all duration-700 ease-out"
                  style={{
                    opacity: imageOpacity,
                    transform: imageTransform,
                  }}
                  role="img"
                  aria-label={activeEntry?.imageAlt || `${activeEntry?.title} visual`}
                >
                  {activeEntry?.image && (
                    <Image
                      src={activeEntry.image}
                      alt={activeEntry.imageAlt || `${activeEntry.title} visual`}
                      fill
                      className="object-cover transition-opacity duration-500"
                      priority={activeIndex === 0}
                      sizes="(max-width: 768px) 100vw, 280px"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                    />
                  )}

                  {/* Image Overlay with Entry Title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent p-4 sm:p-5 flex flex-col justify-end">
                    <div className="space-y-1 sm:space-y-1.5">
                      <span className="text-[10px] sm:text-xs font-medium text-primary uppercase tracking-wider">
                        {activeEntry?.year}
                      </span>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground leading-snug">
                        {activeEntry?.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">
                        {activeEntry?.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Loading/Empty State */}
                  {!activeEntry?.image && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/10">
                      <div className="text-center p-6 flex-1 flex flex-col items-center justify-center">
                        <Package className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                        <p className="text-5xl sm:text-6xl font-medium tracking-tight text-primary">{activeEntry?.year}</p>
                      </div>
                    </div>
                  )}

                  {activeEntry?.image && (
                    <div className="absolute inset-0 flex flex-col">
                      <div className="flex-1" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}