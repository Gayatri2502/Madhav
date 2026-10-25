"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Button,
  ButtonGroup,
  Card,
  Icon,
  Accordion,
  Badge,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Printer,
  MousePointer,
  Box,
  Maximize,
  Edit,
  Layers,
  ChevronRight,
  Check,
  ArrowRight,
  Shield,
  Leaf,
  Award,
  Truck,
} from "lucide-react";
import { Reveal, StaggerContainer } from "@/components/animations";
import { SpatialZoom, DepthLayer, ParallaxElement } from "@/components/animations";
import { FeatureGrid, FeatureCard } from "@/components/layout";

const services = [
  {
    category: "Offset Printing",
    slug: "offset-printing",
    icon: Printer,
    color: "#0ea5e9",
    description: "High-volume commercial printing with exceptional color fidelity and consistency.",
    longDescription: "Our Heidelberg and Komori offset presses deliver unmatched color accuracy, registration precision, and production speed. Ideal for projects where brand color consistency across thousands of impressions is non-negotiable.",
    features: [
      "Sheet-fed & Web-fed configurations",
      "Pantone & CMYK color matching",
      "Up to 10 colors + inline coating",
      "Large format up to B1 size",
      "Perfecting (double-sided) in single pass",
      "Automated plate changing & ink preset",
    ],
    applications: [
      "Brochures & Catalogs",
      "Annual Reports",
      "Magazines & Periodicals",
      "Books & Manuals",
      "Corporate Stationery",
      "Marketing Collateral",
    ],
    specs: {
      "Max Sheet Size": "B1 (700 × 1000 mm)",
      Colors: "Up to 10 + Coating",
      Speed: "18,000 sheets/hour",
      "Substrate Range": "60–350 gsm",
      Registration: "±0.05 mm",
      "Color Tolerance": "ΔE ≤ 1.5",
    },
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
  },
  {
    category: "Digital Printing",
    slug: "digital-printing",
    icon: MousePointer,
    color: "#10b981",
    description: "Fast turnaround, variable data, and cost-effective short runs with near-offset quality.",
    longDescription: "Zero setup time, instant proofing, and variable data capability make digital the smart choice for personalized communications, prototyping, and urgent deadlines — all with 2400 dpi quality.",
    features: [
      "Variable Data Printing (VDP)",
      "24–48 hour standard turnaround",
      "No plate costs or setup fees",
      "Proof on actual production stock",
      "Inline finishing options",
      "Web-to-print ordering portal",
    ],
    applications: [
      "Business Cards & Stationery",
      "Flyers, Posters & Postcards",
      "Direct Mail Campaigns",
      "Photo Books & Portfolios",
      "Presentation Folders",
      "Short-run Marketing Kits",
    ],
    specs: {
      "Max Sheet Size": "SRA3 (320 × 450 mm)",
      Resolution: "2400 × 2400 dpi",
      Speed: "100 ppm duplex",
      "Substrate Range": "52–350 gsm",
      "Color Tolerance": "ΔE ≤ 2.0",
      "VDP Fields": "Unlimited",
    },
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
  },
  {
    category: "Packaging Solutions",
    slug: "packaging",
    icon: Box,
    color: "#f59e0b",
    description: "End-to-end packaging design, prototyping, and production for retail and industrial needs.",
    longDescription: "From structural engineering to shelf-ready packaging, our dedicated division handles folding cartons, corrugated, rigid boxes, labels, and flexible packaging — all under one roof with food-grade compliance.",
    features: [
      "In-house structural design studio",
      "Rapid prototyping (24-hr samples)",
      "Rotary & flatbed die-cutting",
      "Specialty finishes: UV, foil, emboss",
      "Food-grade & pharma-compliant (ISO 22000 ready)",
      "JIT delivery with ERP tracking",
    ],
    applications: [
      "Folding Cartons (cosmetics, pharma, FMCG)",
      "Corrugated Boxes (3-ply to 7-ply)",
      "Rigid & Luxury Boxes",
      "Labels: PS, Shrink Sleeve, IML",
      "Flexible Packaging & Pouches",
      "Point-of-Sale Displays",
    ],
    specs: {
      "Max Sheet Size": "B1 (700 × 1000 mm)",
      "Board Range": "200–1000 microns",
      Finishing: "UV, Foil, Emboss, Soft-touch",
      Capacity: "500K+ units/month",
      "Die-cut Tolerance": "±0.1 mm",
      Certifications: "ISO 9001, FSC, Sedex",
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
  },
  {
    category: "Large Format",
    slug: "large-format",
    icon: Maximize,
    color: "#8b5cf6",
    description: "Wide-format printing for indoor and outdoor applications with UV-resistant inks.",
    longDescription: "Up to 5-meter width with UV-curable, latex, and eco-solvent inks. Weather-resistant output for vehicle wraps, building graphics, trade show displays, and retail signage — installed nationwide.",
    features: [
      "UV-curable & latex inks (eco-friendly)",
      "Up to 5 meter seamless width",
      "Weather-resistant 3–5 years outdoor",
      "White ink & varnish capabilities",
      "Fabric, vinyl, mesh, paper, film media",
      "Nationwide installation partners",
    ],
    applications: [
      "Banners & Building Signage",
      "Vehicle Wraps (full & partial)",
      "Wall Graphics & Murals",
      "Trade Show & Event Displays",
      "Window Graphics & Decals",
      "Retail & POP Displays",
    ],
    specs: {
      "Max Width": "5 meters (seamless)",
      "Ink Types": "UV, Latex, Eco-solvent",
      Media: "Vinyl, Fabric, Paper, Mesh, Film",
      Durability: "3–5 years outdoor",
      Resolution: "Up to 1200 dpi",
      "White Ink": "Supported",
    },
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&q=80",
  },
  {
    category: "Pre-Press & Design",
    slug: "prepress-design",
    icon: Edit,
    color: "#ec4899",
    description: "Complete pre-press workflow and in-house design services for print-ready perfection.",
    longDescription: "Our NID-trained design team and G7-certified pre-press specialists ensure your files translate flawlessly from screen to press. From brand guidelines to artwork adaptation — we speak both design and production.",
    features: [
      "G7 Master certified color management",
      "Automated preflight & optimization",
      "Contract proofing (GMG/Epson)",
      "Digital & analog plate making",
      "Brand packaging strategy & DFM consulting",
      "3D mockups & digital samples in 24 hrs",
    ],
    applications: [
      "Artwork Preparation & Optimization",
      "Color Correction & Retouching",
      "Layout & Structural Design",
      "Brand Guidelines for Print",
      "Variable Data Setup",
      "Pre-flight Reports & Fixes",
    ],
    specs: {
      "Proofing System": "GMG ColorProof / Epson Stylus Pro",
      "Color Standard": "ISO 12647-2 (FOGRA39/51)",
      "File Formats": "PDF/X-1a, PDF/X-4, AI, INDD, PSD",
      Turnaround: "Same-day digital proofing",
      "Plate Making": "Thermal CTP (Kodak/Heidelberg)",
      QA: "Spectrophotometric verification",
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
  {
    category: "Finishing & Binding",
    slug: "finishing-binding",
    icon: Layers,
    color: "#ef4444",
    description: "Premium finishing techniques that add tactile and visual appeal to your printed materials.",
    longDescription: "The difference between good print and exceptional print lives in the finish. Soft-touch lamination, holographic foil, sculptural embossing, precision die-cutting — these are the details your audience touches and remembers.",
    features: [
      "Thermal & cold lamination (Matt/Gloss/Soft-touch)",
      "Spot UV, Flood UV, Textured UV",
      "Hot foil: Gold, Silver, Holographic, Custom",
      "Multi-level embossing & debossing",
      "Precision die-cutting & kiss-cutting",
      "Perfect, saddle, wire-O, case binding",
    ],
    applications: [
      "Premium Business Cards",
      "Luxury Packaging & Rigid Boxes",
      "Annual Reports & Coffee Table Books",
      "Invitation & Stationery Suites",
      "Specialty Labels & Hang Tags",
      "Limited Edition Collectibles",
    ],
    specs: {
      Lamination: "Thermal & Cold (Matt/Gloss/Soft-touch)",
      "UV Coating": "Spot, Flood, Textured, Glitter",
      "Foil Stamping": "Gold, Silver, Holographic, Pigment, Custom",
      Embossing: "Single, Multi-level, Sculptured, Registered",
      Binding: "Up to 300 pages perfect bind",
      "Die-cutting": "Rotary & Flatbed ±0.1 mm",
    },
    image: "https://images.unsplash.com/photo-1581093458791-9d3cf6a6b1b5?w=800&auto=format&fit=crop&q=80",
  },
];

const faqs = [
  {
    question: "What is the minimum order quantity?",
    answer: "Digital printing: 1 piece. Offset printing: typically 500–1,000 pieces depending on product. Packaging varies by structure — we'll advise the most economical run size.",
  },
  {
    question: "How long does a typical print job take?",
    answer: "Digital: 24–48 hours. Offset: 3–5 business days after proof approval. Packaging: 7–10 business days. Rush services available for urgent deadlines.",
  },
  {
    question: "Do you provide design services?",
    answer: "Yes. Our in-house design team (NID graduates) can create artwork from scratch, optimize existing files, adapt designs for print production, and develop brand packaging strategies.",
  },
  {
    question: "What file formats do you accept?",
    answer: "Preferred: PDF/X-1a or PDF/X-4. Also accepted: AI, INDD, PSD, EPS, high-res TIFF/JPG. All files should be CMYK with 3 mm bleed. We provide preflight reports for every job.",
  },
  {
    question: "Do you offer eco-friendly printing options?",
    answer: "Absolutely. FSC-certified papers, vegetable/soy-based inks, recycled stocks (up to 100% PCW), carbon-neutral printing, and chemical-free plate making. Ask for our Green Choices guide.",
  },
  {
    question: "Can I get a physical proof before full production?",
    answer: "Yes. Digital proofs included on all jobs. Physical proofs on actual production stock for offset and packaging (nominal fee). We also offer press-pass attendance for critical color work.",
  },
  {
    question: "What are your delivery capabilities?",
    answer: "Pan-India delivery via partnered logistics. JIT scheduling, warehousing, and drop-shipping to multiple locations. Export packaging for international shipments. Real-time tracking on all orders.",
  },
  {
    question: "Do you handle variable data printing?",
    answer: "Yes. Names, addresses, barcodes, QR codes, unique images, personalized URLs — unlimited VDP fields with 100% data integrity verification. CSV, Excel, or API integration supported.",
  },
];

const trustSignals = [
  { icon: Award, label: "G7 Master Printer", desc: "Idealliance certified since 2021" },
  { icon: Leaf, label: "FSC Certified", desc: "Chain of Custody since 2018" },
  { icon: Shield, label: "ISO 9001:2015", desc: "Quality management across all divisions" },
  { icon: Truck, label: "Pan-India Delivery", desc: "JIT logistics with real-time tracking" },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = React.useState(services[0].slug);
  const [accordionValue, setAccordionValue] = React.useState<string | string[]>(faqs[0].question);
  const [viewMode, setViewMode] = React.useState<"grid" | "detail">("grid");

  const currentService = services.find((s) => s.slug === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Spatial Effects */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <DepthLayer layer="bg" className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)/0.02,transparent_60%)] blur-[80px]" aria-hidden="true" />
        </DepthLayer>

        <DepthLayer layer="mid" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%230ea5e9%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%22)] opacity-50" aria-hidden="true" />
        </DepthLayer>

        <DepthLayer layer="fg" className="relative z-10">
          <Reveal variant="fade-up" className="relative container-fluid mx-auto py-16 sm:py-20 text-center">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6 spatial-zoom">
              Comprehensive Print & Packaging Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight mb-4 sm:mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
              Six specialized divisions. One integrated facility. 88 years of precision craft.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /><span>ISO 9001:2015 Certified</span></div>
              <div className="flex items-center gap-2"><Leaf className="w-4 h-4 text-emerald-600" /><span>FSC Chain of Custody</span></div>
              <div className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /><span>G7 Master Printer</span></div>
              <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-violet-600" /><span>Pan-India JIT Delivery</span></div>
            </div>
          </Reveal>

          <Reveal variant="fade-in" delay={300} className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce sm:bottom-8">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Reveal>
        </DepthLayer>

        {/* Floating decorative elements */}
        <DepthLayer layer="ui" className="pointer-events-none absolute inset-0 -z-5">
          <ParallaxElement speed={0.1} direction="up" className="absolute top-20 left-10 w-24 h-24 opacity-15">
            <div className="w-full h-full rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
          <ParallaxElement speed={0.08} direction="down" className="absolute bottom-20 right-10 w-32 h-32 opacity-10">
            <div className="w-full h-full rounded-full bg-accent-primary/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
        </DepthLayer>
      </section>

      {/* Services Grid / Detail View */}
      <section className="section-padding bg-background">
        <div className="container-fluid mx-auto">
          {viewMode === "grid" ? (
            <Reveal variant="fade-up" className="space-y-8 sm:space-y-12">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                    Choose Your <span className="text-primary">Division</span>
                  </h2>
                  <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base">
                    Each division operates with dedicated equipment, specialized teams, and independent quality systems — all unified by our central ERP and color management.
                  </p>
                </div>
                <ButtonGroup className="gap-2 sm:gap-3" role="group" aria-label="View mode">
                  <Button
                    variant={viewMode === "grid" ? "primary" : "outline"}
                    size="small"
                    onClick={() => setViewMode("grid")}
                    className="flex-1 sm:flex-none interactive"
                  >
                    Grid View
                  </Button>
                  <Button
                    variant={(viewMode as "grid" | "detail") === "detail" ? "primary" : "outline"}
                    size="small"
                    onClick={() => setViewMode("detail")}
                    className="flex-1 sm:flex-none interactive"
                  >
                    Detail View
                  </Button>
                </ButtonGroup>
              </div>

              {/* Feature Grid with Subgrid Alignment */}
              <FeatureGrid minCardWidth="320px" gap="var(--grid-gap, 1.5rem)">
                {services.map((service, index) => (
                  <FeatureCard
                    key={service.slug}
                    icon={<service.icon className="w-6 h-6" style={{ color: service.color }} />}
                    title={service.category}
                    description={service.description}
                    link={
                      <Button
                        variant="ghost"
                        size="small"
                        onClick={() => {
                          setViewMode("detail");
                          setActiveCategory(service.slug);
                        }}
                        className="w-full justify-start"
                      >
                        <ArrowRight className="w-4 h-4" />
                        Explore
                      </Button>
                    }
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                      <Image
                        src={service.image}
                        alt={service.category}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 spatial-zoom"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(0,0,0,0.3)_0%,_transparent_50%,_rgba(0,0,0,0.1)_100%)]" />
                    </div>
                    <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between pointer-events-none">
                      <div className="flex items-start justify-between pointer-events-auto">
                        <span className="px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/20">
                          {service.category}
                        </span>
                        <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-white group-hover:bg-white/20 transition-colors touch-target">
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>
                      <div className="text-left pointer-events-auto">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">{service.category}</h3>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-2">{service.description}</p>
                      </div>
                    </div>
                  </FeatureCard>
                ))}
              </FeatureGrid>
            </Reveal>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {currentService && (
                  <div>
                    <Reveal variant="fade-up" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                      <Button
                        variant="ghost"
                        size="small"
                        onClick={() => setViewMode("grid")}
                        className="gap-2 w-full sm:w-auto interactive"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        All Services
                      </Button>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: `${currentService.color}15`, color: currentService.color, borderColor: `${currentService.color}40` }}>
                          {currentService.category}
                        </span>
                      </div>
                    </Reveal>

                    <Reveal variant="fade-up" delay={100}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 lg:gap-16 items-start">
                        <div className="relative">
                          <SpatialZoom depth="medium" className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background">
                            <Image
                              src={currentService.image}
                              alt={currentService.category}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                          </SpatialZoom>
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-background to-transparent">
                            <div className="flex flex-wrap items-center gap-3">
                              <currentService.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" style={{ color: currentService.color }} />
                              <div>
                                <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider">Specialist Division</p>
                                <h3 className="text-xl sm:text-2xl font-bold text-white">{currentService.category}</h3>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                          <div>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">{currentService.longDescription}</p>

                            <FeatureGrid minCardWidth="280px" gap="var(--spacing-md, 1rem)">
                              {currentService.features.map((feature, i) => (
                                <FeatureCard key={i} title="" description={feature} icon={<Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" style={{ color: currentService.color }} />} />
                              ))}
                            </FeatureGrid>
                          </div>

                          <div className="pt-4 sm:pt-6 border-t border-border/50">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">Technical Specifications</h3>
                            <FeatureGrid minCardWidth="200px" gap="var(--spacing-md, 1rem)">
                              {Object.entries(currentService.specs).map(([key, value]) => (
                                <FeatureCard key={key} title={key} description={value} />
                              ))}
                            </FeatureGrid>
                          </div>

                          <div className="pt-4 sm:pt-6 border-t border-border/50">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">Typical Applications</h3>
                            <div className="flex flex-wrap gap-2">
                              {currentService.applications.map((app, i) => (
                                <Badge key={i} variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5" style={{ borderColor: `${currentService.color}40`, color: currentService.color }}>
                                  {app}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Reveal variant="scale-in" delay={200} className="pt-4 sm:pt-6 border-t border-border/50 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Button size="large" asChild className="w-full sm:w-auto interactive">
                              <Link href="/contact">Get Quote for {currentService.category}</Link>
                            </Button>
                            <Button size="large" variant="outline" asChild className="w-full sm:w-auto interactive">
                              <Link href="/catalogs">Download Spec Sheet</Link>
                            </Button>
                          </Reveal>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Why Choose Us / Trust Signals */}
      <section className="section-padding bg-accent-primary/5">
        <div className="container-fluid mx-auto">
          <Reveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 spatial-zoom">Why Madhav</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">Six Decades of <span className="text-primary">Trust</span></h2>
            <p className="text-base sm:text-lg text-muted-foreground">Every division backed by the same uncompromising standards</p>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <FeatureGrid minCardWidth="240px" gap="var(--grid-gap, 1.5rem)">
              {trustSignals.map((signal, index) => (
                <FeatureCard
                  key={signal.label}
                  icon={
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4" style={{ backgroundColor: `${signal.icon === Award ? "#f59e0b" : signal.icon === Leaf ? "#10b981" : signal.icon === Shield ? "#0ea5e9" : "#ec4899"}15` }}>
                      <signal.icon className="w-5 h-5 sm:w-7 sm:h-7" style={{ color: signal.icon === Award ? "#f59e0b" : signal.icon === Leaf ? "#10b981" : signal.icon === Shield ? "#0ea5e9" : "#ec4899" }} />
                    </div>
                  }
                  title={signal.label}
                  description={signal.desc}
                />
              ))}
            </FeatureGrid>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background border-y border-border">
        <div className="container-fluid mx-auto">
          <Reveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">Frequently <span className="text-primary">Asked</span> Questions</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Quick answers. If you need more detail, our specialists are a call away.</p>
          </Reveal>

          <Reveal variant="fade-up" delay={100} className="max-w-3xl mx-auto">
            <Accordion.Root type="single" value={accordionValue} onValueChange={setAccordionValue} className="space-y-3">
              {faqs.map((faq, index) => (
                <Reveal key={index} variant="fade-up" delay={index * 40}>
                  <Accordion.Item value={faq.question} className="border border-border/50 rounded-xl overflow-hidden bg-card hover:border-primary/30 transition-colors">
                    <Accordion.Trigger className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left font-medium text-foreground hover:text-primary transition-colors flex items-center justify-between text-sm sm:text-base interactive">
                      {faq.question}
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform" />
                    </Accordion.Trigger>
                    <Accordion.Content className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </Accordion.Content>
                  </Accordion.Item>
                </Reveal>
              ))}
            </Accordion.Root>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <DepthLayer layer="bg" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%22)] opacity-50" aria-hidden="true" />
        </DepthLayer>

        <DepthLayer layer="fg" className="relative z-10">
          <Reveal variant="fade-up" className="relative container-fluid mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-5">Ready to <span className="text-primary-foreground/80">Print</span>?</h2>
            <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto mb-8 sm:mb-10">Request a free consultation and quote. Our print specialists will guide you through the best options for your project — from concept to delivery.</p>
            <ButtonGroup className="gap-3 sm:gap-4 justify-center flex-wrap">
              <Button size="large" variant="secondary" asChild className="w-full sm:w-auto interactive"><Link href="/contact">Request a Quote</Link></Button>
              <Button size="large" variant="ghost" className="border-primary-foreground/30 hover:bg-primary-foreground/10 w-full sm:w-auto interactive" asChild><Link href="/catalogs">Download Catalogs</Link></Button>
              <Button size="large" variant="ghost" className="border-primary-foreground/30 hover:bg-primary-foreground/10 w-full sm:w-auto interactive" asChild><Link href="tel:+912228374567">Call: +91 22 2837 4567</Link></Button>
            </ButtonGroup>
          </Reveal>
        </DepthLayer>

        {/* Floating decorative elements */}
        <DepthLayer layer="ui" className="pointer-events-none absolute inset-0 -z-5">
          <ParallaxElement speed={0.1} direction="up" className="absolute top-20 left-10 w-24 h-24 opacity-15">
            <div className="w-full h-full rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
          <ParallaxElement speed={0.08} direction="down" className="absolute bottom-20 right-10 w-32 h-32 opacity-10">
            <div className="w-full h-full rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
        </DepthLayer>
      </section>
    </div>
  );
}