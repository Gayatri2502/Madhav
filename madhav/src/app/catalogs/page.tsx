"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useIsMobile } from "@/hooks/useIsMobile"
import {
  Button,
  ButtonGroup,
  Card,
  Badge,
} from "@/components/ui"
import { cn } from "@/lib/utils"
import {
  Download,
  Mail,
  ArrowRight,
  Filter,
  Grid,
  List,
  FileText,
  Truck,
  RefreshCw,
  BookOpen,
  Sparkles,
} from "lucide-react"
import { ContainerScroll, BentoGrid, BentoCell, ContainerScale } from "@/components/ui/hero-gallery-scroll-animation"

const CATALOG_IMAGES = [
  {
    id: "main-catalog",
    title: "Complete Product Catalog 2024",
    category: "General",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&auto=format&fit=crop&q=80",
    color: "#0ea5e9",
    pages: 84,
    size: "12.4 MB",
    featured: true,
  },
  {
    id: "offset-specs",
    title: "Offset Printing Specifications",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?w=1200&auto=format&fit=crop&q=80",
    color: "#10b981",
    pages: 28,
    size: "4.2 MB",
    featured: true,
  },
  {
    id: "packaging-guide",
    title: "Packaging Design Guide",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=1200&auto=format&fit=crop&q=80",
    color: "#f59e0b",
    pages: 36,
    size: "8.7 MB",
    featured: true,
  },
  {
    id: "digital-caps",
    title: "Digital Printing Capabilities",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80",
    color: "#8b5cf6",
    pages: 22,
    size: "3.1 MB",
    featured: false,
  },
  {
    id: "large-format",
    title: "Large Format Media Guide",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&auto=format&fit=crop&q=80",
    color: "#ec4899",
    pages: 18,
    size: "5.6 MB",
    featured: false,
  },
  {
    id: "sustainable",
    title: "Sustainable Printing Options",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80",
    color: "#10b981",
    pages: 16,
    size: "2.8 MB",
    featured: true,
  },
]

export default function CatalogsPage() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Gallery Scroll Animation - Desktop only */}
      {!isMobile && (
        <ContainerScroll className="h-[350vh]">
          <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4 md:p-8">
            {CATALOG_IMAGES.map((catalog, index) => (
              <BentoCell
                key={catalog.id}
                className="overflow-hidden rounded-2xl shadow-2xl"
              >
                <div className="relative size-full">
                  <Image
                    src={catalog.image}
                    alt={catalog.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between p-4">
                    <div>
                      <Badge variant="secondary" className="mb-2 text-xs" style={{ backgroundColor: `${catalog.color}20`, borderColor: `${catalog.color}60`, color: catalog.color }}>
                        {catalog.category}
                      </Badge>
                      <h3 className="text-white font-bold text-lg sm:text-xl leading-tight max-w-xs">
                        {catalog.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {catalog.featured && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      <div className="text-white/80 text-sm font-medium flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {catalog.pages} pp
                      </div>
                    </div>
                  </div>
                </div>
              </BentoCell>
          ))}
          </BentoGrid>

          <ContainerScale className="relative z-10 flex min-h-[60vh] items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black bg-gradient-to-r from-sky-400 via-black to-blue-900 bg-clip-text text-transparent tracking-tight leading-none">
                Catalogs
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-20"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                {[
                  { icon: BookOpen, label: "12+", desc: "Catalogs Available" },
                  { icon: FileText, label: "280+", desc: "Total Pages" },
                  { icon: Sparkles, label: "6", desc: "Featured Guides" },
                  { icon: Download, label: "Free", desc: "All Downloads" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-white">{stat.label}</p>
                    <p className="text-white/60 text-sm mt-1">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ContainerScale>
        </ContainerScroll>
      )}

      {/* Mobile Hero */}
      {isMobile && (
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%230ea5e9%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative container-fluid mx-auto py-16 text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-sky-400 via-black to-blue-900 bg-clip-text text-transparent tracking-tight leading-none">
              Catalogs
            </h1>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                { icon: BookOpen, label: "12+", desc: "Catalogs Available" },
                { icon: FileText, label: "280+", desc: "Total Pages" },
                { icon: Sparkles, label: "6", desc: "Featured Guides" },
                { icon: Download, label: "Free", desc: "All Downloads" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-2 mx-auto">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.label}</p>
                  <p className="text-white/60 text-xs mt-1">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Catalog Grid Section */}
      <section id="catalogs" className="section-padding bg-background">
        <div className="container-fluid mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                All <span className="text-primary">Catalogs</span>
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base">
                Filter by category or search to find the exact resource you need.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="small"
                className="gap-2 hidden sm:flex"
                onClick={() => {}}
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <ButtonGroup className="gap-1" role="group" aria-label="View mode">
                <Button variant="outline" size="small" className="p-2" aria-label="Grid view">
                  <Grid className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="small" className="p-2" aria-label="List view">
                  <List className="w-5 h-5" />
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
            {CATALOG_IMAGES.map((catalog, index) => (
              <motion.article
                key={catalog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={catalog.image}
                    alt={catalog.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs" style={{ backgroundColor: `${catalog.color}20`, borderColor: `${catalog.color}60`, color: catalog.color }}>
                      {catalog.category}
                    </Badge>
                    {catalog.featured && (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
                      {catalog.title}
                    </h3>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {catalog.pages} pages
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {catalog.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Button variant="primary" size="small" className="gap-2" asChild>
                    <Link href="#" onClick={(e) => { e.preventDefault(); alert(`Downloading: ${catalog.title}`); }}>
                      <Download className="w-4 h-4" />
                      Download
                    </Link>
                  </Button>
                  <Button variant="ghost" size="small" className="text-white hover:bg-white/20" asChild>
                    <Link href="#" onClick={(e) => { e.preventDefault(); alert(`View details: ${catalog.title}`); }}>
                      Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Button variant="outline" size="large" asChild className="w-full sm:w-auto">
              <Link href="/contact">
                <FileText className="w-5 h-5 mr-2" />
                Need a Custom Catalog?
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Request Physical Copies */}
      <section id="request" className="section-padding bg-accent-primary/5">
        <div className="container-fluid mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Physical Resources
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Prefer <span className="text-primary">Printed</span> Copies?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                We'll mail high-quality printed catalogs to your office. Select the guides you need and we'll ship them within 3–5 business days.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Pan-India Delivery</p>
                    <p className="text-sm text-muted-foreground">3–5 business days via trusted logistics</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Premium Print Quality</p>
                    <p className="text-sm text-muted-foreground">Same papers & finishes as production</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">No Cost</p>
                    <p className="text-sm text-muted-foreground">Free shipping on all catalog requests</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50">
              <Card.Root className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Request Physical Catalogs</h3>
                <p className="text-muted-foreground mb-6">Fill out the form and we'll ship your selection.</p>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Request submitted! We\'ll contact you within 24 hours.'); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                      <input id="name" name="name" type="text" placeholder="Your name" required className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                      <input id="email" name="email" type="email" placeholder="your@email.com" required className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">Phone *</label>
                      <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">Company</label>
                      <input id="company" name="company" type="text" placeholder="Company name" className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1.5">Shipping Address *</label>
                    <input id="address" name="address" type="text" placeholder="Full address for delivery" required className="w-full px-4 py-3 rounded-xl bg-background border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors" />
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
                    <p className="text-sm font-medium mb-2">Select Catalogs (Featured)</p>
                    {CATALOG_IMAGES.filter(c => c.featured).map((catalog) => (
                      <label key={catalog.id} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                        <span className="text-sm text-foreground">{catalog.title}</span>
                      </label>
                    ))}
                  </div>
                  <ButtonGroup className="gap-3 flex-col sm:flex-row">
                    <Button type="submit" className="w-full">
                      <Truck className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                    <Button type="button" variant="outline" className="w-full">Cancel</Button>
                  </ButtonGroup>
                </form>
              </Card.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative container-fluid mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-5">
              Can't Find <span className="text-primary-foreground/80">What You Need</span>?
            </h2>
            <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto mb-8 sm:mb-10">
              Need a custom specification sheet, pricing for a specific project, or a technical guide not listed?
              Our team creates tailored resources on demand.
            </p>
            <ButtonGroup className="gap-3 sm:gap-4 justify-center flex-wrap">
              <Button size="large" variant="secondary" asChild className="w-full sm:w-auto">
                <Link href="/contact">
                  <FileText className="w-5 h-5 mr-2" />
                  Request Custom Resource
                </Link>
              </Button>
              <Button size="large" variant="ghost" className="border-primary-foreground/30 hover:bg-primary-foreground/10 w-full sm:w-auto" asChild>
                <Link href="tel:+912228374567">
                  <Mail className="w-5 h-5 mr-2" />
                  Call: +91 22 2837 4567
                </Link>
              </Button>
            </ButtonGroup>
          </motion.div>
        </div>
      </section>
    </div>
  )
}