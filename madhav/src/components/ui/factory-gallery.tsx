"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, Expand, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  color: string;
  description?: string;
}

const FACTORY_IMAGES: GalleryImage[] = [
  {
    id: "press-1",
    title: "Heidelberg Speedmaster XL 106",
    category: "Press Room",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#0ea5e9",
    description: "8-color LED UV offset press with Intellistart automation",
  },
  {
    id: "press-2",
    title: "Komori Lithrone G40",
    category: "Press Room",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#0ea5e9",
    description: "H-UV press with PQA color control system",
  },
  {
    id: "press-3",
    title: "Press Console & Color Management",
    category: "Press Room",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#0ea5e9",
    description: "Integrated spectrophotometric inline color control",
  },
  {
    id: "packaging-1",
    title: "Bobst Expertfold 110",
    category: "Packaging Line",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#10b981",
    description: "Auto-setup folder-gluer for crash-lock cartons",
  },
  {
    id: "packaging-2",
    title: "Rotary Die-Cutting",
    category: "Packaging Line",
    image: "https://images.unsplash.com/photo-1581093458791-9d3cf6a6b1b5?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#10b981",
    description: "High-speed rotary die-cutting for folding cartons",
  },
  {
    id: "packaging-3",
    title: "Label Production Line",
    category: "Packaging Line",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#10b981",
    description: "Pressure-sensitive & shrink sleeve labeling",
  },
  {
    id: "packaging-4",
    title: "Corrugated Production",
    category: "Packaging Line",
    image: "https://images.unsplash.com/photo-1567432681589-2a7d9f3a2b8a?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#10b981",
    description: "3-ply to 7-ply corrugated with custom flutes",
  },
  {
    id: "quality-1",
    title: "Spectrophotometer Verification",
    category: "Quality Lab",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#8b5cf6",
    description: "X-Rite eXact 2 for ΔE ≤ 1.5 accuracy",
  },
  {
    id: "quality-2",
    title: "Color Management Station",
    category: "Quality Lab",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#8b5cf6",
    description: "G7 Master certified workflow & soft proofing",
  },
  {
    id: "quality-3",
    title: "Substrate Testing",
    category: "Quality Lab",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#8b5cf6",
    description: "Gloss, opacity & brightness measurement",
  },
  {
    id: "facility-1",
    title: "Warehouse & Logistics",
    category: "Facility",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#f59e0b",
    description: "JIT delivery with ERP-integrated tracking",
  },
  {
    id: "facility-2",
    title: "Pre-Press & Design Studio",
    category: "Facility",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0",
    color: "#f59e0b",
    description: "In-house structural & graphic design",
  },
];

const CATEGORIES = ["All", "Press Room", "Packaging Line", "Quality Lab", "Facility"];

export function FactoryGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const filteredImages = activeCategory === "All"
    ? FACTORY_IMAGES
    : FACTORY_IMAGES.filter((img) => img.category === activeCategory);

  const currentLightboxImages = activeCategory === "All"
    ? FACTORY_IMAGES
    : FACTORY_IMAGES.filter((img) => img.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(null);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + currentLightboxImages.length) % currentLightboxImages.length);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % currentLightboxImages.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentLightboxImages.length]);

  const openLightbox = (image: GalleryImage, index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(image);
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || !lightboxOpen) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      diff > 0
        ? setLightboxIndex((i) => (i - 1 + currentLightboxImages.length) % currentLightboxImages.length)
        : setLightboxIndex((i) => (i + 1) % currentLightboxImages.length);
    }
    setTouchStart(null);
  };

  return (
    <section className="relative w-full overflow-hidden section-padding" aria-label="Factory Gallery">
      <div className="container-fluid mx-auto">
        <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-3 sm:mb-4">
            Our Facility
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3 sm:mb-4">
            Manufacturing <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Explore our state-of-the-art Mumbai facility — Heidelberg & Komori presses, automated packaging lines, and ISO-certified quality lab.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={cn(
                "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 touch-target",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border/50 hover:border-primary/30 hover:bg-accent/50 text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" role="list" aria-label="Factory images">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.article
                key={image.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background cursor-zoom-in"
                role="listitem"
              >
                <Image
                  src={image.image}
                  alt={image.title}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(0,0,0,0.4)_0%,_transparent_50%,_rgba(0,0,0,0.2)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-start justify-between">
                    <span
                      className="px-2 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/20"
                    >
                      {image.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = currentLightboxImages.findIndex((i) => i.id === image.id);
                        openLightbox(image, idx);
                      }}
                      className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white touch-target"
                      aria-label={`View ${image.title} fullscreen`}
                    >
                      <Expand className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-1">
                      {image.title}
                    </h3>
                    <p className="text-white/70 text-[10px] sm:text-sm">{image.description}</p>
                  </div>
                </div>

                <div
                  className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <span
                    className={`px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full backdrop-blur-sm border text-white/90`}
                    style={{
                      backgroundColor: `${image.color}20`,
                      borderColor: `${image.color}60`,
                      color: image.color,
                    }}
                  >
                    {image.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = currentLightboxImages.findIndex((i) => i.id === image.id);
                      openLightbox(image, idx);
                    }}
                    className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white touch-target"
                    aria-label="Expand"
                  >
                    <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12 sm:py-20 text-muted-foreground">
            <Search className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-50" />
            <p className="text-sm sm:text-base">No images in this category</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-2 sm:p-4"
            onClick={() => setLightboxOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <div className="relative w-full max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLightboxOpen(null)}
                className="absolute -top-10 sm:-top-12 right-0 z-10 p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white touch-target"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i - 1 + currentLightboxImages.length) % currentLightboxImages.length);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-8 z-10 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white hidden md:flex touch-target"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                <Image
                  src={lightboxOpen.image}
                  alt={lightboxOpen.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="80vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="px-2 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/20 mb-1.5 sm:mb-2 inline-block">
                        {lightboxOpen.category}
                      </span>
                      <h3 id="lightbox-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                        {lightboxOpen.title}
                      </h3>
                    </div>
                    <span className="text-white/60 text-xs sm:text-sm font-mono">
                      {lightboxIndex + 1} / {currentLightboxImages.length}
                    </span>
                  </div>
                  <p className="text-white/80 mt-2 max-w-2xl text-sm sm:text-base">{lightboxOpen.description}</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i + 1) % currentLightboxImages.length);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-8 z-10 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white hidden md:flex touch-target"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4 touch-none lg:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i - 1 + currentLightboxImages.length) % currentLightboxImages.length);
                  }}
                  className="p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white touch-target"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i + 1) % currentLightboxImages.length);
                  }}
                  className="p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white touch-target"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default FactoryGallery;