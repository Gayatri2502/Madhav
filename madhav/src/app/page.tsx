'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from 'lenis';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { HeroSection } from '@/components/ui/hero-section-shadcnui';
import Bucket from '@/components/ui/bucket';
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Reveal, StaggerContainer } from '@/components/animations';
import { SpatialZoom, ParallaxElement, DepthLayer } from '@/components/animations';

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
    {
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Modern architecture building',
    },
    {
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Urban cityscape at sunset',
    },
    {
      src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Abstract geometric pattern',
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Mountain landscape',
    },
    {
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Minimalist design elements',
    },
    {
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Ocean waves and beach',
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Forest trees and sunlight',
    },
  ];

  return (
    <main className="min-h-screen w-full bg-background">
      {/* Enhanced Hero Section with 3D Spatial Scroll Zoom */}
      <section className="relative" aria-labelledby="hero-title">
        {/* Background depth layers */}
        <DepthLayer layer="bg" className="absolute inset-0 -z-20">
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)/0.03,transparent_70%)] blur-[60px]" 
            aria-hidden="true"
          />
        </DepthLayer>
        
        <DepthLayer layer="mid" className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%230ea5e9%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" 
            aria-hidden="true"
          />
        </DepthLayer>

        <DepthLayer layer="fg" className="relative z-10">
          {/* Hero Content with Staggered Reveal */}
          <StaggerContainer stagger={80} className="relative flex min-h-[60vh] sm:min-h-[70vh] items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Radial spotlight */}
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute -top-1/2 left-1/2 h-[100vmin] w-[100vmin] -translate-x-1/2 rounded-full',
                'bg-[radial-gradient(ellipse_at_center,theme(colors.foreground/.06),transparent_50%)]',
                'blur-[30px]',
              )}
            />
            
            <Reveal variant="fade-up" delay={0}>
              <h1 id="hero-title" className="relative z-10 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 bg-clip-text text-transparent">
                Madhav Offset Printers
              </h1>
            </Reveal>
            
            <Reveal variant="fade-up" delay={100}>
              <p className="relative z-10 mt-4 text-center text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto px-4">
                85 Years of Excellence in Offset Printing & Packaging Solutions
              </p>
            </Reveal>
            
            <Reveal variant="scale-in" delay={200}>
              <div className="relative z-10 mt-8 flex items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium">
                  <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  Scroll to explore
                </span>
              </div>
            </Reveal>
          </StaggerContainer>
        </DepthLayer>

        {/* Image Gallery / Zoom Parallax */}
        <DepthLayer layer="mid" className="relative">
          {isMobile ? (
            <Reveal variant="fade-up" delay={300}>
              <div className="relative h-auto min-h-[60vh] sm:min-h-[80vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {images.slice(0, 6).map(({ src, alt }, index) => (
                    <Reveal key={index} variant="scale-in" delay={index * 60}>
                      <div
                        className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background spatial-zoom"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <img
                          src={src || '/placeholder.svg'}
                          alt={alt || `Gallery image ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : (
            <ZoomParallax images={images} />
          )}
        </DepthLayer>

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

      {/* Bucket Animation Section */}
      <Reveal variant="fade-up">
        <section className="section-padding px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container-fluid mx-auto">
            <Bucket />
          </div>
        </section>
      </Reveal>

      {/* Testimonials Marquee Section */}
      <TestimonialsSection
        title="Trusted by Industry Leaders"
        description="Hear from our clients who rely on Madhav Offset Printers for their most critical packaging needs."
        testimonials={[
          {
            author: {
              name: 'Rajesh Kumar',
              handle: '@rajeshpackaging',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            },
            text: 'Madhav Offset Printers has been our go-to partner for over a decade. Their color consistency and on-time delivery are unmatched in the industry.',
            href: 'https://twitter.com/rajeshpackaging',
          },
          {
            author: {
              name: 'Priya Sharma',
              handle: '@priyadesigns',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
            },
            text: 'The quality of their packaging solutions has elevated our brand presentation. Their team understands design intent like no other printer.',
            href: 'https://twitter.com/priyadesigns',
          },
          {
            author: {
              name: 'Amit Patel',
              handle: '@amitfoods',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            },
            text: 'From concept to shelf-ready packaging, Madhav delivers every time. Their technical expertise saved us months in product launches.',
          },
        ]}
      />
    </main>
  );
}