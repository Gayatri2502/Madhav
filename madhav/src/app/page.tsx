'use client';

import React from 'react';
import Image from 'next/image';
import { packagingProducts } from '@/lib/packaging-products';
import { PackagingGlassHero } from '@/components/ui/packaging-glass-hero';
import { MarketsWheel } from '@/components/ui/markets-wheel';
import Lenis from 'lenis';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { HeroSection } from '@/components/ui/hero-section-shadcnui';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Reveal, StaggerContainer } from '@/components/animations';

const customerPackaging = [
  {
    "id": "mango-burfi",
    "name": "Mango Burfi",
    "source": "https://www.chitalebandhu.in/products/mango-burfi",
    "image": "/images/customers/chitale-mango-burfi.webp"
  },
  {
    "id": "special-burfi-combo",
    "name": "Special Burfi Combo",
    "source": "https://www.chitalebandhu.in/products/special-burfi-combo",
    "image": "/images/customers/chitale-special-burfi-combo.webp"
  },
  {
    "id": "kaju-katli",
    "name": "Kaju Katli",
    "source": "https://www.chitalebandhu.in/products/kaju-katli",
    "image": "/images/customers/chitale-kaju-katli.webp"
  },
  {
    "id": "kaju-badam-roll",
    "name": "Kaju Badam Roll",
    "source": "https://www.chitalebandhu.in/products/kaju-badam-roll",
    "image": "/images/customers/chitale-kaju-badam-roll.webp"
  }
];

export default function HomePage() {
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const images = [
    packagingProducts[0], packagingProducts[1], packagingProducts[2],
    packagingProducts[3], packagingProducts[4], packagingProducts[5], packagingProducts[6],
  ].map(product => ({ src: product.image, alt: product.alt, label: product.title }));

  return (
    <main className="min-h-screen w-full bg-background">
      {/* Enhanced Hero Section with 3D Spatial Scroll Zoom */}
      <section className="relative" aria-labelledby="hero-title">
        <PackagingGlassHero />
        <MarketsWheel />

        {/* Image Gallery / Zoom Parallax */}
        <div id="packaging-gallery" className="relative scroll-mt-16">
          {isMobile ? (
            <Reveal variant="fade-up" delay={300}>
              <div className="relative h-auto min-h-[60vh] sm:min-h-[80vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {images.map(({ src, alt, label }, index) => (
                    <Reveal key={index} variant="scale-in" delay={index * 60}>
                      <div
                        className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background spatial-zoom"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <Image
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          src={src || '/placeholder.svg'}
                          alt={alt || `Gallery image ${index + 1}`}
                          className="h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <p className="pb-5 pt-2 text-center text-sm font-normal text-slate-600">{label}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : (
            <ZoomParallax images={images} />
          )}
        </div>

        {/* Scroll indicator */}
        <Reveal variant="fade-in" delay={400}>
          <div className="min-h-[30vh] sm:min-h-[40vh] flex items-center justify-center border-t border-border px-4">
            <p className="text-muted-foreground text-base sm:text-lg animate-bounce">Scroll to explore our services</p>
          </div>
        </Reveal>
      </section>

      {/* Premium Packing Solutions Hero Section */}
      <HeroSection />

      {/* Stats Section with Scroll Reveal */}
      <Reveal variant="fade-up">
        <section className="section-padding bg-slate-100/30 border-y border-border">
          <div className="container-fluid mx-auto">
            <StaggerContainer stagger={60} className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
              <Reveal variant="scale-in">
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">85+</div>
                  <div className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">Years of Excellence</div>
                </div>
              </Reveal>
              <Reveal variant="scale-in">
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">500+</div>
                  <div className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">Brands Served</div>
                </div>
              </Reveal>
              <Reveal variant="scale-in">
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">10K+</div>
                  <div className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">Projects Delivered</div>
                </div>
              </Reveal>
              <Reveal variant="scale-in">
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">98%</div>
                  <div className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">Client Retention</div>
                </div>
              </Reveal>
            </StaggerContainer>
          </div>
        </section>
      </Reveal>

      <section className="section-padding bg-background" aria-labelledby="customers-heading">
        <Reveal variant="fade-up" className="container-fluid mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 id="customers-heading" className="text-3xl sm:text-4xl font-medium tracking-tight">Our Customers</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">We supply customised carton boxes to the following companies and others.</p>
          </div>
          <div id="customer-packaging" className="mb-12 scroll-mt-24">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-sky-700">Chitale Bandhu</p>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight">Our customers’ packaging designs</h3>
              </div>
              <p className="text-sm text-muted-foreground">Printed cartons for a sweet first impression.</p>
            </div>
            <div className="grid grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-4 gap-5">
              {customerPackaging.map(product => (
                <figure key={product.id} className="overflow-hidden rounded-2xl border border-border bg-white">
                  <div className="relative aspect-square">
                    <Image src={product.image} alt={`Chitale Bandhu ${product.name} printed sweet carton packaging`} fill sizes="(max-width: 439px) 90vw, (max-width: 1023px) 45vw, 23vw" className="object-contain p-3" loading="lazy" />
                  </div>
                  <figcaption className="border-t border-border px-5 py-5">
                    <p className="mb-1 text-xs text-muted-foreground">Chitale Bandhu</p>
                    <h4 className="text-base font-medium">{product.name}</h4>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Product photography courtesy of <a href="https://www.chitalebandhu.in/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-sky-700">Chitale Bandhu</a>.</p>
          </div>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {["Chitale", "Kirloskar", "Corrcoat", "Elena", "Step Grow", "Yashwant Industrial", "Nutrixeal", "Nutris", "Nissarg Crop Care", "Pratik Industries"].map(name => (
              <li key={name} className="flex min-h-24 items-center justify-center rounded-xl border border-border bg-white/60 p-4 text-center text-sm sm:text-base font-medium">{name}</li>
            ))}
          </ul>
        </Reveal>
      </section>
      <div className="bg-background px-5 pb-10 pt-4 sm:px-8 sm:pb-16">
        <Image
          src="/images/packaging/collection-before-footer.webp"
          alt="Corrugated packaging collection with shipping cartons, a blue mailer, display stand, trays, bottle carrier, partitions and board sheets"
          width={1400}
          height={933}
          sizes="(max-width: 768px) 100vw, 1200px"
          className="mx-auto h-auto w-full max-w-6xl object-contain"
          loading="lazy"
        />
      </div>
    </main>
  );
}
