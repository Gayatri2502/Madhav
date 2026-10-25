"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Sparkles, Zap, Package, Phone, Mail } from "lucide-react";
import {
  Button,
  ButtonGroup,
  Card,
  Icon,
  Divider,
  Accordion,
  Tabs,
  ImageCover,
} from "@/components/ui";
import TimeLine_01 from "@/components/ui/release-time-line";
import FactoryGallery from "@/components/ui/factory-gallery";
import { Reveal, StaggerContainer } from "@/components/animations";
import { SpatialZoom, DepthLayer, ParallaxElement } from "@/components/animations";

const timeline = [
  { year: "1936", title: "Founded", description: "Madhav Offset Printers established in Mumbai by Shri Madhav Lalji as a small letterpress printing shop.", milestone: true },
  { year: "1952", title: "First Offset Press", description: "Installed first offset printing machine, becoming one of the early adopters of offset technology in Western India.", milestone: false },
  { year: "1978", title: "Second Generation", description: "Mr. Rajesh Madhav joins the business, introducing modern management practices and expanding service offerings.", milestone: true },
  { year: "1995", title: "Digital Revolution", description: "Invested in first digital printing press, pioneering digital printing services in the region.", milestone: false },
  { year: "2008", title: "Packaging Division", description: "Launched dedicated packaging division with specialized equipment for cartons, labels, and flexible packaging.", milestone: true },
  { year: "2015", title: "ISO Certification", description: "Achieved ISO 9001:2015 certification for quality management systems across all production processes.", milestone: false },
  { year: "2020", title: "Third Generation", description: "Ms. Priya Madhav joins as Creative Director, bringing contemporary design sensibilities and digital workflow integration.", milestone: true },
  { year: "2024", title: "85th Anniversary", description: "Celebrating 85 years of printing excellence with state-of-the-art Heidelberg and Komori press installations.", milestone: true },
];

const certifications = [
  { name: "ISO 9001:2015", issuer: "Quality Management Systems", year: "2015" },
  { name: "FSC Chain of Custody", issuer: "Forest Stewardship Council", year: "2018" },
  { name: "ISO 14001:2015", issuer: "Environmental Management", year: "2020" },
  { name: "G7 Master Printer", issuer: "IDEAlliance", year: "2021" },
  { name: "Sedex Member", issuer: "Ethical Trade Audit", year: "2022" },
  { name: "Great Place to Work", issuer: "Employee Satisfaction", year: "2023" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = React.useState("story");
  const [accordionValue, setAccordionValue] = React.useState<string | string[]>("item1");

  return (
    <div className="min-h-screen">
      {/* Timeline with Scroll-Driven Animations */}
      <Reveal variant="fade-up" className="relative">
        <DepthLayer layer="bg" className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)/0.01,transparent_50%)] blur-[100px]" aria-hidden="true" />
        </DepthLayer>

        <DepthLayer layer="fg" className="relative z-10">
          <TimeLine_01
            title="85 Years of Printing Heritage"
            description="Eighty-eight years of printing excellence, innovation, and craftsmanship. From a single letterpress to a state-of-the-art packaging manufacturing facility—our legacy spans three generations."
            entries={[
              {
                icon: Calendar,
                year: "1936",
                title: "Founded in Mumbai",
                subtitle: "The Beginning",
                description: "Shri Madhav Lalji established Madhav Offset Printers as a modest letterpress printing shop in the heart of Mumbai. With a single machine and an unwavering commitment to quality, the foundation was laid for what would become an 88+ year legacy of printing excellence.",
                items: [
                  "Started with a single letterpress machine in a small workshop",
                  "Served local businesses, publishers, and educational institutions",
                  "Built reputation for precision, reliability, and on-time delivery",
                  "Established client relationships that span generations",
                ],
              },
              {
                icon: Sparkles,
                year: "1952",
                title: "First Offset Press",
                subtitle: "Technology Revolution",
                description: "Pioneering the adoption of offset printing technology in Western India, Madhav Offset installed its first offset press—revolutionizing print quality, color fidelity, and production speed. This bold move positioned the company as an industry leader during India's post-independence industrial growth.",
                items: [
                  "First offset printing machine in the region",
                  "Enabled full-color commercial printing at scale",
                  "Expanded from letterpress to modern offset technology",
                  "Attracted major corporate and publishing clients",
                ],
              },
              {
                icon: Zap,
                year: "1978",
                title: "Second Generation Leadership",
                subtitle: "Mr. Rajesh Madhav Joins",
                description: "Mr. Rajesh Madhav joined the family business, bringing modern management practices, strategic vision, and a focus on operational excellence. Under his leadership, the company professionalized its operations, expanded service offerings, and built enduring relationships with national brands.",
                items: [
                  "Implemented modern management and quality systems",
                  "Expanded into commercial printing for national brands",
                  "Established structured apprenticeship and training programs",
                  "Built long-term partnerships with paper mills and suppliers",
                ],
              },
              {
                icon: Package,
                year: "1995",
                title: "Digital Printing Revolution",
                subtitle: "First Digital Press in Region",
                description: "Anticipating the shift toward short-run, personalized printing, Madhav Offset became the first in Western India to invest in digital printing technology. This enabled variable data printing, ultra-fast turnarounds, and cost-effective short runs—opening entirely new market segments.",
                items: [
                  "First digital press installation in Western India",
                  "Pioneered variable data printing (VDP) capabilities",
                  "Enabled 24-hour turnaround for urgent jobs",
                  "Cost-effective short runs from 1 to 1,000 copies",
                ],
              },
              {
                icon: Calendar,
                year: "2008",
                title: "Packaging Division Launch",
                subtitle: "Dedicated Packaging Manufacturing",
                description: "Launched a state-of-the-art dedicated packaging division with specialized equipment for folding cartons, corrugated boxes, labels, and flexible packaging. This strategic diversification transformed Madhav from a commercial printer into a full-spectrum packaging manufacturer serving FMCG, pharma, and premium brands.",
                items: [
                  "Folding carton production: Heidelberg & Bobst equipment",
                  "Corrugated boxes: 3-ply to 7-ply, custom flute profiles",
                  "Labels: Pressure-sensitive, shrink sleeves, in-mold labels",
                  "Flexible packaging: Pouches, laminates, barrier films",
                  "In-house die-making, prototyping, and structural design",
                  "Food-grade & pharma-compliant manufacturing (ISO 22000 ready)",
                ],
              },
              {
                icon: Sparkles,
                year: "2015",
                title: "ISO 9001:2015 Certification",
                subtitle: "Quality Management Excellence",
                description: "Achieved ISO 9001:2015 certification across all production processes—commercial printing, digital printing, and packaging manufacturing. This formalized a culture of continuous improvement, standardized workflows, and rigorous quality assurance at every stage from pre-press to dispatch.",
                items: [
                  "Unified QMS across printing and packaging divisions",
                  "Statistical process control (SPC) on critical parameters",
                  "Automated color management with spectrophotometer verification",
                  "Traceability from raw material to finished goods",
                ],
              },
              {
                icon: Zap,
                year: "2020",
                title: "Third Generation & Creative Integration",
                subtitle: "Ms. Priya Madhav — Creative Director",
                description: "Ms. Priya Madhav (NID graduate) joined as Creative Director, bringing contemporary design sensibilities, brand strategy expertise, and digital workflow integration. This marked the evolution from a pure manufacturing partner to a strategic design-to-delivery partner offering end-to-end brand packaging solutions.",
                items: [
                  "In-house structural & graphic design studio",
                  "Brand packaging strategy and shelf-impact consulting",
                  "Digital workflow: Web-to-print, automated preflight",
                  "Rapid prototyping: 3D mockups, digital samples in 24hrs",
                  "Design for manufacturability (DFM) consultation",
                ],
              },
              {
                icon: Package,
                year: "2024",
                title: "85th Anniversary & Heidelberg/Komori Upgrade",
                subtitle: "State-of-the-Art Facility",
                description: "Celebrating 85 years with major capital investment: new Heidelberg Speedmaster XL 106 (8+coater) and Komori Lithrone G40 offset presses, plus Bobst Expertfold 110 folder-gluer. This positions Madhav for the next generation of high-fidelity, high-volume, sustainable packaging manufacturing.",
                items: [
                  "Heidelberg Speedmaster XL 106-8+L (LED UV, Intellistart)",
                  "Komori Lithrone G40 (H-UV, PQA color control)",
                  "Bobst Expertfold 110 (Auto-setup, crash lock)",
                  "Expanded warehousing & JIT delivery capabilities",
                  "ERP-integrated production planning & real-time tracking",
                ],
              },
            ]}
          />
        </DepthLayer>

        {/* Floating decorative elements */}
        <DepthLayer layer="ui" className="pointer-events-none absolute inset-0 -z-10">
          <ParallaxElement speed={0.08} direction="up" className="absolute top-20 left-10 w-24 h-24 opacity-10">
            <div className="w-full h-full rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
          <ParallaxElement speed={0.05} direction="down" className="absolute bottom-20 right-10 w-32 h-32 opacity-8">
            <div className="w-full h-full rounded-full bg-accent-primary/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
        </DepthLayer>
      </Reveal>

      {/* Factory Gallery */}
      <section className="py-20 bg-background relative">
        <Reveal variant="fade-up" className="container mx-auto px-6">
          <DepthLayer layer="bg" className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-accent-secondary)/0.02,transparent_60%)] blur-[80px]" aria-hidden="true" />
          </DepthLayer>

          <DepthLayer layer="fg" className="relative z-10">
            <FactoryGallery />
          </DepthLayer>

          {/* Floating decorative elements */}
          <DepthLayer layer="ui" className="pointer-events-none absolute inset-0 -z-5">
            <ParallaxElement speed={0.1} direction="up" className="absolute top-0 left-1/4 w-24 h-24 opacity-15">
              <div className="w-full h-full rounded-full bg-amber-500/10 blur-xl" aria-hidden="true" />
            </ParallaxElement>
            <ParallaxElement speed={0.05} direction="down" className="absolute bottom-0 right-1/4 w-32 h-32 opacity-10">
              <div className="w-full h-full rounded-full bg-orange-500/10 blur-xl" aria-hidden="true" />
            </ParallaxElement>
          </DepthLayer>
        </Reveal>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-background relative">
        <Reveal variant="fade-up" className="container mx-auto px-6">
          <DepthLayer layer="bg" className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)/0.01,transparent_50%)] blur-[100px]" aria-hidden="true" />
          </DepthLayer>

          <DepthLayer layer="fg" className="relative z-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium spatial-zoom">Visit Us</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Our Location</h2>
              </div>

              <StaggerContainer stagger={80} className="space-y-4 pt-6 border-t border-border/50">
                <Reveal variant="slide-left">
                  <div className="flex items-start gap-4 spatial-zoom">
                    <span className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <address className="text-muted-foreground not-italic leading-relaxed">
                      Madhav Offset Printers Pvt. Ltd.<br />
                      Plot No. 45, MIDC Industrial Area,<br />
                      Andheri East, Mumbai - 400093,<br />
                      Maharashtra, India
                    </address>
                  </div>
                </Reveal>

                <Reveal variant="slide-left" delay={50}>
                  <div className="flex items-center gap-4 spatial-zoom">
                    <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <a href="tel:+912228374567" className="text-muted-foreground hover:text-foreground transition-colors interactive">+91 22 2837 4567</a>
                  </div>
                </Reveal>

                <Reveal variant="slide-left" delay={100}>
                  <div className="flex items-center gap-4 spatial-zoom">
                    <Mail className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <a href="mailto:sales@madhavprinters.com" className="text-muted-foreground hover:text-foreground transition-colors interactive">sales@madhavprinters.com</a>
                  </div>
                </Reveal>
              </StaggerContainer>
            </div>
          </DepthLayer>

          {/* Floating decorative elements */}
          <DepthLayer layer="ui" className="pointer-events-none absolute inset-0 -z-5">
            <ParallaxElement speed={0.1} direction="up" className="absolute top-20 left-10 w-16 h-16 opacity-10">
              <div className="w-full h-full rounded-full bg-primary/10 blur-xl" aria-hidden="true" />
            </ParallaxElement>
            <ParallaxElement speed={0.05} direction="down" className="absolute bottom-20 right-10 w-24 h-24 opacity-8">
              <div className="w-full h-full rounded-full bg-accent-primary/10 blur-xl" aria-hidden="true" />
            </ParallaxElement>
          </DepthLayer>
        </Reveal>
      </section>
    </div>
  );
}