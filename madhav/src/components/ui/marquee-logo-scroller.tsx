"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Reveal, StaggerContainer } from "@/components/animations";
import { SpatialZoom, ParallaxElement } from "@/components/animations";

interface Logo {
  src: string;
  alt: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  logos: Logo[];
  speed?: "normal" | "slow" | "fast";
}

const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  ({ title, description, logos, speed = "normal", className, ...props }, ref) => {
    const isMobile = useIsMobile();
    const durationMap = {
      normal: "40s",
      slow: "80s",
      fast: "5s",
    };
    const animationDuration = durationMap[speed];

    const mobileLogos = logos.slice(0, 6);

    if (isMobile) {
      return (
        <>
          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>

          <section
            ref={ref}
            aria-label={title}
            className={cn("w-full bg-background text-foreground rounded-lg border overflow-hidden", className)}
            {...props}
          >
            <Reveal variant="fade-up" className="p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-balance">
                  {title}
                </h2>
                <p className="text-muted-foreground text-balance">{description}</p>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={100}>
              <div
                className="w-full overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              >
                <div
                  className="flex w-max items-center gap-3 sm:gap-4 py-3 sm:py-4 pr-3 sm:pr-4 hover:[animation-play-state:paused] transition-all duration-300 ease-in-out"
                  style={{ animation: `marquee ${animationDuration} linear infinite` }}
                >
                  {[...mobileLogos, ...mobileLogos].map((logo, index) => (
                    <Reveal key={index} variant="scale-in" delay={index * 30} className="shrink-0">
                      <div className="group relative h-20 sm:h-24 w-32 sm:w-40 shrink-0 flex items-center justify-center rounded-lg bg-secondary/70 overflow-hidden spatial-zoom">
                        <div
                          style={{
                            "--from": logo.gradient.from,
                            "--via": logo.gradient.via,
                            "--to": logo.gradient.to,
                          } as React.CSSProperties}
                          className="absolute inset-0 scale-150 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)]"
                        />
                        <img src={logo.src} alt={logo.alt} className="relative h-2/3 w-auto object-contain" loading="lazy" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        </>
      );
    }

    return (
      <>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn("w-full bg-background text-foreground rounded-lg border overflow-hidden", className)}
          {...props}
        >
          <Reveal variant="fade-up" className="p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8 pb-6 md:pb-8 border-b">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-balance">{title}</h2>
              <p className="text-muted-foreground self-start lg:justify-self-end text-balance">{description}</p>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <div
              className="w-full overflow-hidden"
              style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
            >
              <div
                className="flex w-max items-center gap-4 py-4 pr-4 hover:[animation-play-state:paused] transition-all duration-300 ease-in-out"
                style={{ animation: `marquee ${animationDuration} linear infinite` }}
              >
                {[...logos, ...logos].map((logo, index) => (
                  <Reveal key={index} variant="scale-in" delay={index * 40} className="shrink-0">
                    <div className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-lg bg-secondary/70 overflow-hidden spatial-zoom">
                      <div
                        style={{
                          "--from": logo.gradient.from,
                          "--via": logo.gradient.via,
                          "--to": logo.gradient.to,
                        } as React.CSSProperties}
                        className="absolute inset-0 scale-150 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)]"
                      />
                      <img src={logo.src} alt={logo.alt} className="relative h-3/4 w-auto object-contain" loading="lazy" />
                    </div>
                  </Reveal>
                ))}
              </div>
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
        </section>
      </>
    );
  }
);

MarqueeLogoScroller.displayName = "MarqueeLogoScroller";

export { MarqueeLogoScroller };