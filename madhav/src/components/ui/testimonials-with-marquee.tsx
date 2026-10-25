"use client";

import { cn } from "@/lib/utils";
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Reveal, StaggerContainer } from "@/components/animations";
import { StickyStack, StickyStackCard } from "@/components/layout";
import { SpatialZoom, ParallaxElement } from "@/components/animations";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  if (isMobile) {
    return (
      <section className={cn("bg-background text-foreground py-12 sm:py-16 px-4", className)}>
        <Reveal variant="fade-up" className="mx-auto flex max-w-container flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-4 px-4">
            <h2 className="max-w-[720px] text-2xl sm:text-3xl font-semibold leading-tight">{title}</h2>
            <p className="text-base max-w-[600px] font-medium text-muted-foreground sm:text-lg">{description}</p>
          </div>

          {/* Sticky Stack for Mobile Testimonials */}
          <Reveal variant="fade-up" delay={100}>
            <StickyStack
              gap="0.5rem"
              paddingBottom="3rem"
              showProgress
              progressColor="var(--color-primary, #0ea5e9)"
              className="max-w-lg mx-auto"
            >
              {testimonials.map((testimonial, index) => (
                <StickyStackCard key={index} index={index} total={testimonials.length} className="w-full">
                  <SpatialZoom depth="shallow" className="w-full">
                    <TestimonialCard
                      {...testimonial}
                      className="w-full min-w-0 shadow-lg border-border/50"
                    />
                  </SpatialZoom>
                </StickyStackCard>
              ))}
            </StickyStack>
          </Reveal>
        </Reveal>

        {/* Floating decorative elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <ParallaxElement speed={0.05} direction="up" className="absolute top-0 left-1/4 w-24 h-24 opacity-15">
            <div className="w-full h-full rounded-full bg-primary/10 blur-xl" aria-hidden="true" />
          </ParallaxElement>
          <ParallaxElement speed={0.03} direction="down" className="absolute bottom-0 right-1/4 w-32 h-32 opacity-10">
            <div className="w-full h-full rounded-full bg-accent-primary/10 blur-xl" aria-hidden="true" />
          </ParallaxElement>
        </div>
      </section>
    );
  }

  if (isTablet) {
    return (
      <section className={cn("bg-background text-foreground py-12 sm:py-24 md:py-32 px-4", className)}>
        <Reveal variant="fade-up" className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
          <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
            <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">{title}</h2>
            <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">{description}</p>
          </div>

          <Reveal variant="fade-up" delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Reveal key={index} variant="scale-in" delay={index * 60}>
                  <TestimonialCard {...testimonial} />
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Floating decorative elements */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <ParallaxElement speed={0.08} direction="up" className="absolute top-0 left-1/4 w-32 h-32 opacity-20">
              <div className="w-full h-full rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
            </ParallaxElement>
            <ParallaxElement speed={0.05} direction="down" className="absolute bottom-0 right-1/4 w-40 h-40 opacity-15">
              <div className="w-full h-full rounded-full bg-accent-primary/10 blur-2xl" aria-hidden="true" />
            </ParallaxElement>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className={cn("bg-background text-foreground py-12 sm:py-24 md:py-32 px-0", className)}>
      <Reveal variant="fade-up" className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">{title}</h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">{description}</p>
        </div>

        <Reveal variant="fade-up" delay={100}>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
              <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                {[...Array(4)].map((_, setIndex) =>
                  testimonials.map((testimonial, i) => (
                    <Reveal key={`${setIndex}-${i}`} variant="scale-in" delay={(setIndex * testimonials.length + i) * 30}>
                      <TestimonialCard {...testimonial} />
                    </Reveal>
                  ))
                )}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
          </div>
        </Reveal>
      </Reveal>

      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxElement speed={0.08} direction="up" className="absolute top-0 left-1/4 w-32 h-32 opacity-20">
          <div className="w-full h-full rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
        </ParallaxElement>
        <ParallaxElement speed={0.05} direction="down" className="absolute bottom-0 right-1/4 w-40 h-40 opacity-15">
          <div className="w-full h-full rounded-full bg-accent-primary/10 blur-2xl" aria-hidden="true" />
        </ParallaxElement>
      </div>
    </section>
  );
}