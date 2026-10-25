"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Package, Shield, Truck, Leaf } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Reveal, StaggerContainer } from "@/components/animations";
import { SpatialZoom, DepthLayer, ParallaxElement } from "@/components/animations";

export function HeroSection() {
  const isMobile = useIsMobile();

  const features = [
    { icon: Package, label: "Custom Designs", desc: "Tailored to your specs" },
    { icon: Shield, label: "Premium Quality", desc: "FSC-certified materials" },
    { icon: Truck, label: "Pan-India Delivery", desc: "50K+ boxes/day" },
    { icon: Leaf, label: "Eco-Friendly", desc: "100% recyclable" },
  ];

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      {/* Background depth layers */}
      <DepthLayer layer="bg" className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)/0.02,transparent_60%)] blur-[80px]" aria-hidden="true" />
      </DepthLayer>

      <DepthLayer layer="mid" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%230ea5e9%22 fill-opacity=%220.015%22%3E%3Cpath d=%22M40 0h40v40H40V0zm0 40h40v40H40V40zm40-40h40v40H80V0zm-40 0h40v40H40V0z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" aria-hidden="true" />
      </DepthLayer>

      <DepthLayer layer="fg" className="relative z-10 w-full max-w-6xl mx-auto">
        <StaggerContainer stagger={100} className="flex flex-col items-center justify-center w-full">
          {/* Badge */}
          <Reveal variant="fade-up" delay={0} className="mb-4 sm:mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-primary spatial-zoom">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              Premium Customised Packing Solutions
            </span>
          </Reveal>

          {/* Title */}
          <Reveal variant="fade-up" delay={100} className="mb-4 sm:mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              Introducing
              <br />
              <span className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 bg-clip-text text-transparent spatial-zoom">
                Premium Customised
                <br />
                Packing Solutions
              </span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal variant="fade-up" delay={200} className="mb-8 sm:mb-12 max-w-3xl text-center text-base sm:text-lg md:text-xl text-muted-foreground px-2">
            From concept to corrugated reality. Bespoke packaging engineered for your brand —
            precision die-cut, multi-color flexo printed, delivered just-in-time across India.
          </Reveal>

          {/* CTA Buttons */}
          <Reveal variant="scale-in" delay={300} className="mb-12 sm:mb-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
            <Button size="large" className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto interactive">
              Get Your Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="large" variant="outline" className="w-full sm:w-auto interactive">
              View Capabilities
            </Button>
          </Reveal>

          {/* Features Carousel - Horizontal */}
          <Reveal variant="fade-up" delay={400}>
            <div className="w-full max-w-5xl px-2 sm:px-4">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto scroll-snap-x snap-mandatory pb-4 -mx-2 sm:-mx-4 px-2 sm:px-4 scrollbar-hide">
                {features.map((feature, index) => (
                  <Reveal key={feature.label} variant="scale-in" delay={index * 60} className="feature-card flex-shrink-0 snap-start w-[calc(100%-1rem)] sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]">
                    <div className="group flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-300 spatial-zoom h-full">
                      <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors spatial-zoom">
                        <feature.icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                      </div>
                      <h3 className="mb-1 font-semibold text-base sm:text-lg">{feature.label}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </StaggerContainer>
      </DepthLayer>

      {/* Floating decorative elements */}
      <DepthLayer layer="ui" className="pointer-events-none absolute inset-0 -z-5">
        <ParallaxElement speed={0.15} direction="up" className="absolute top-20 left-10 w-20 h-20 opacity-20">
          <div className="w-full h-full rounded-full bg-primary/10 blur-xl" aria-hidden="true" />
        </ParallaxElement>
        <ParallaxElement speed={0.1} direction="down" className="absolute bottom-20 right-10 w-32 h-32 opacity-15">
          <div className="w-full h-full rounded-full bg-accent-primary/10 blur-xl" aria-hidden="true" />
        </ParallaxElement>
        <ParallaxElement speed={0.2} direction="left" className="absolute top-1/2 left-0 w-16 h-16 opacity-10 -translate-y-1/2">
          <div className="w-full h-full rounded-full bg-accent-secondary/10 blur-lg" aria-hidden="true" />
        </ParallaxElement>
      </DepthLayer>
    </section>
  );
}