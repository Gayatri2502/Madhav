"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import {
  SecurityCheckIcon,
  ZapIcon,
  UserStoryIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Reveal, StaggerContainer } from "@/components/animations";
import { SpatialZoom, DepthLayer, ParallaxElement } from "@/components/animations";

const INITIAL_CHIPS = [
  {
    id: 1,
    title: "Production Ready",
    description: "Fully type-safe and tested",
    icon: SecurityCheckIcon,
  },
  {
    id: 2,
    title: "Fluid Motion",
    description: "60fps optimizations built-in",
    icon: ZapIcon,
  },
  {
    id: 3,
    title: "Accessible",
    description: "Works perfectly for everyone",
    icon: UserStoryIcon,
  },
  {
    id: 4,
    title: "Modern Design",
    description: "Crafted for high-end feel",
    icon: SparklesIcon,
  },
];

const Bucket = () => {
  const [items, setItems] = useState(INITIAL_CHIPS);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (isMobile) {
    return (
      <Reveal variant="fade-up" className="relative w-full max-w-sm mx-auto">
        <StaggerContainer stagger={80}>
          <SpatialZoom depth="medium" className="relative aspect-square max-h-[300px] rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-orange-600/20 border border-amber-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent" />
            
            <AnimatePresence mode="popLayout">
              {items.map((chip, index) => (
                index === 0 && (
                  <Reveal key={chip.id} variant="scale-in" delay={index * 60} className="absolute inset-0 flex items-center justify-center p-6">
                    <motion.div
                      initial={{ y: -30, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        duration: 1.5,
                        delay: 0.3,
                        ease: [0.455, 0.03, 0.515, 0.955],
                      }}
                      className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl p-6 w-full shadow-xl spatial-zoom"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <HugeiconsIcon icon={chip.icon} className="size-6" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-base font-semibold text-foreground leading-tight">{chip.title}</span>
                          <span className="text-sm text-muted-foreground">{chip.description}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                )
              ))}
            </AnimatePresence>
          </SpatialZoom>

          <Reveal variant="fade-up" delay={200} className="mt-6 flex justify-center gap-2">
            {INITIAL_CHIPS.map((chip, index) => (
              <Reveal key={chip.id} variant="scale-in" delay={index * 40}>
                <button
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === 0 ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Feature ${index + 1}`}
                />
              </Reveal>
            ))}
          </Reveal>
        </StaggerContainer>

        {/* Floating decorative elements */}
        <DepthLayer layer="ui" className="pointer-events-none absolute inset-0 -z-10">
          <ParallaxElement speed={0.1} direction="up" className="absolute top-0 left-1/4 w-16 h-16 opacity-15">
            <div className="w-full h-full rounded-full bg-amber-500/10 blur-xl" aria-hidden="true" />
          </ParallaxElement>
          <ParallaxElement speed={0.05} direction="down" className="absolute bottom-0 right-1/4 w-20 h-20 opacity-10">
            <div className="w-full h-full rounded-full bg-orange-500/10 blur-xl" aria-hidden="true" />
          </ParallaxElement>
        </DepthLayer>
      </Reveal>
    );
  }

  return (
    <Reveal variant="fade-up" className="flex flex-col gap-4 items-center justify-center h-fit relative w-full">
      <StaggerContainer stagger={100}>
        <DepthLayer layer="bg" className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-accent-secondary)/0.03,transparent_70%)] blur-[80px]" aria-hidden="true" />
        </DepthLayer>

        <DepthLayer layer="mid" className="relative isolate w-full max-w-[655px]" style={{ aspectRatio: "655/352" }}>
          <svg width="100%" height="100%" viewBox="0 0 655 352" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 z-0">
            <line x1="74.6" y1="164" x2="581.5" y2="164" stroke="#D97706" strokeWidth="2" strokeOpacity="0.8" />
            <foreignObject x="443.561" y="-10.5141" width="211.24" height="166.977">
              <div style={{ backdropFilter: "blur(11.03px)", clipPath: "url(#bgblur_0_51_65_clip_path)", height: "100%", width: "100%" }}></div>
            </foreignObject>
            <g filter="url(#filter1_dddi_51_65)" data-figma-bg-blur-radius="22.0545">
              <path d="M535.59 78.7427L487.973 42.8776L558.738 13.9516C562.902 12.2494 564.984 11.3984 567.143 11.5597C569.301 11.7211 571.233 12.8723 575.098 15.1747L590.22 24.1832C603.923 32.347 610.775 36.4289 610.372 42.0779C609.97 47.7269 602.609 50.7964 587.887 56.9354L535.59 78.7427Z" fill="#F59E0B" fillOpacity="0.85" shapeRendering="crispEdges" />
            </g>
            <foreignObject x="-3.43323e-05" y="-10.9516" width="215.96" height="167.786">
              <div style={{ backdropFilter: "blur(11.03px)", clipPath: "url(#bgblur_1_51_65_clip_path)", height: "100%", width: "100%" }}></div>
            </foreignObject>
            <g filter="url(#filter2_dddi_51_65)" data-figma-bg-blur-radius="22.0545">
              <path d="M123.116 79.1145L171.548 42.8776L97.2715 12.5164C94.8305 11.5186 93.61 11.0197 92.3446 11.1143C91.0793 11.2089 89.9465 11.8837 87.681 13.2334L56.155 32.0149C48.1832 36.7641 44.1973 39.1386 44.4205 42.4378C44.6438 45.737 48.9132 47.553 57.4522 51.1849L123.116 79.1145Z" fill="#F59E0B" fillOpacity="0.85" shapeRendering="crispEdges" />
            </g>
            <foreignObject x="78.7048" y="20.823" width="501.297" height="136.012">
              <div style={{ backdropFilter: "blur(11.03px)", clipPath: "url(#bgblur_2_51_65_clip_path)", height: "100%", width: "100%" }}></div>
            </foreignObject>
            <g filter="url(#filter3_dddi_51_65)" data-figma-bg-blur-radius="22.0545">
              <path d="M487.973 42.8774L171.548 42.8775L123.116 79.1144L535.59 78.7424L487.973 42.8774Z" fill="url(#paint0_linear_51_65)" fillOpacity="0.95" shapeRendering="crispEdges" />
            </g>
            <foreignObject x="78.7048" y="20.823" width="137.255" height="136.012">
              <div style={{ backdropFilter: "blur(11.03px)", clipPath: "url(#bgblur_3_51_65_clip_path)", height: "100%", width: "100%" }}></div>
            </foreignObject>
            <g filter="url(#filter4_dddi_51_65)" data-figma-bg-blur-radius="22.0545">
              <path d="M171.548 78.9088V42.8774L123.116 79.1144L171.548 78.9088Z" fill="#D97706" fillOpacity="0.9" shapeRendering="crispEdges" />
            </g>
            <g filter="url(#filter5_dddi_51_65)" data-figma-bg-blur-radius="22.0545">
              <path d="M487.973 78.9088V42.8774L536.404 79.1144L487.973 78.9088Z" fill="#D97706" fillOpacity="0.9" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter id="filter0_i_51_65" x="123.766" y="79.1595" width="413" height="275.676" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="5.51362" />
                <feGaussianBlur stdDeviation="1.83787" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_51_65" />
              </filter>
              <filter id="filter1_dddi_51_65" x="443.561" y="-10.5141" width="211.24" height="166.977" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="33.3087" />
                <feGaussianBlur stdDeviation="22.2058" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1.27808" />
                <feGaussianBlur stdDeviation="1.27808" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0" />
                <feBlend mode="normal" in2="effect1_dropShadow_51_65" result="effect2_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="8.94656" />
                <feGaussianBlur stdDeviation="4.47328" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0" />
                <feBlend mode="normal" in2="effect2_dropShadow_51_65" result="effect3_dropShadow_51_65" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_51_65" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="5.51362" />
                <feGaussianBlur stdDeviation="1.83787" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
                <feBlend mode="normal" in2="shape" result="effect4_innerShadow_51_65" />
              </filter>
              <clipPath id="bgblur_0_51_65_clip_path" transform="translate(-443.561 10.5141)">
                <path d="M535.59 78.7427L487.973 42.8776L558.738 13.9516C562.902 12.2494 564.984 11.3984 567.143 11.5597C569.301 11.7211 571.233 12.8723 575.098 15.1747L590.22 24.1832C603.923 32.347 610.775 36.4289 610.372 42.0779C609.97 47.7269 602.609 50.7964 587.887 56.9354L535.59 78.7427Z" />
              </clipPath>
              <filter id="filter2_dddi_51_65" x="-3.43323e-05" y="-10.9516" width="215.96" height="167.786" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="33.3087" />
                <feGaussianBlur stdDeviation="22.2058" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1.27808" />
                <feGaussianBlur stdDeviation="1.27808" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0" />
                <feBlend mode="normal" in2="effect1_dropShadow_51_65" result="effect2_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="8.94656" />
                <feGaussianBlur stdDeviation="4.47328" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0" />
                <feBlend mode="normal" in2="effect2_dropShadow_51_65" result="effect3_dropShadow_51_65" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_51_65" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="5.51362" />
                <feGaussianBlur stdDeviation="1.83787" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
                <feBlend mode="normal" in2="shape" result="effect4_innerShadow_51_65" />
              </filter>
              <clipPath id="bgblur_1_51_65_clip_path" transform="translate(3.43323e-05 10.9516)">
                <path d="M123.116 79.1145L171.548 42.8776L97.2715 12.5164C94.8305 11.5186 93.61 11.0197 92.3446 11.1143C91.0793 11.2089 89.9465 11.8837 87.681 13.2334L56.155 32.0149C48.1832 36.7641 44.1973 39.1386 44.4205 42.4378C44.6438 45.737 48.9132 47.553 57.4522 51.1849L123.116 79.1145Z" />
              </clipPath>
              <filter id="filter3_dddi_51_65" x="78.7048" y="20.823" width="501.297" height="136.012" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="33.3087" />
                <feGaussianBlur stdDeviation="22.2058" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1.27808" />
                <feGaussianBlur stdDeviation="1.27808" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0" />
                <feBlend mode="normal" in2="effect1_dropShadow_51_65" result="effect2_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="8.94656" />
                <feGaussianBlur stdDeviation="4.47328" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0" />
                <feBlend mode="normal" in2="effect2_dropShadow_51_65" result="effect3_dropShadow_51_65" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_51_65" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="5.51362" />
                <feGaussianBlur stdDeviation="1.83787" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
                <feBlend mode="normal" in2="shape" result="effect4_innerShadow_51_65" />
              </filter>
              <clipPath id="bgblur_2_51_65_clip_path" transform="translate(-78.7048 -20.823)">
                <path d="M487.973 42.8774L171.548 42.8775L123.116 79.1144L535.59 78.7424L487.973 42.8774Z" />
              </clipPath>
              <filter id="filter4_dddi_51_65" x="78.7048" y="20.823" width="137.255" height="136.012" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="33.3087" />
                <feGaussianBlur stdDeviation="22.2058" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1.27808" />
                <feGaussianBlur stdDeviation="1.27808" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0" />
                <feBlend mode="normal" in2="effect1_dropShadow_51_65" result="effect2_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="8.94656" />
                <feGaussianBlur stdDeviation="4.47328" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0" />
                <feBlend mode="normal" in2="effect2_dropShadow_51_65" result="effect3_dropShadow_51_65" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_51_65" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="5.51362" />
                <feGaussianBlur stdDeviation="1.83787" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
                <feBlend mode="normal" in2="shape" result="effect4_innerShadow_51_65" />
              </filter>
              <clipPath id="bgblur_3_51_65_clip_path" transform="translate(-78.7048 -20.823)">
                <path d="M171.548 78.9088V42.8774L123.116 79.1144L171.548 78.9088Z" />
              </clipPath>
              <filter id="filter5_dddi_51_65" x="443.561" y="20.823" width="137.255" height="136.012" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="33.3087" />
                <feGaussianBlur stdDeviation="22.2058" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="1.27808" />
                <feGaussianBlur stdDeviation="1.27808" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0" />
                <feBlend mode="normal" in2="effect1_dropShadow_51_65" result="effect2_dropShadow_51_65" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="8.94656" />
                <feGaussianBlur stdDeviation="4.47328" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0" />
                <feBlend mode="normal" in2="effect2_dropShadow_51_65" result="effect3_dropShadow_51_65" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_51_65" result="shape" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="5.51362" />
                <feGaussianBlur stdDeviation="1.83787" />
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
                <feBlend mode="normal" in2="shape" result="effect4_innerShadow_51_65" />
              </filter>
              <clipPath id="bgblur_5_51_65_clip_path">
                <path d="M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z" />
              </clipPath>
              <clipPath id="center_box_clip">
                <rect x="123.766" y="0" width="413" height="352" />
              </clipPath>
              <linearGradient id="paint0_linear_51_65" x1="329.353" y1="42.8774" x2="329.353" y2="79.1144" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBBF24" stopOpacity="0.9" />
                <stop offset="1" stopColor="#F59E0B" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full flex justify-center items-center" style={{ paddingBottom: "65%" }}>
              <AnimatePresence mode="popLayout">
                {items.map((chip, index) => {
                  if (index !== 0) return null;

                  return (
                    <Reveal key={chip.id} variant="scale-in" delay={index * 80} className="absolute pointer-events-auto">
                      <motion.div
                        initial={{ y: -100, opacity: 0, scale: 0.8, transition: { duration: 2, delay: 0.5, ease: [0.455, 0.03, 0.515, 0.955] } }}
                        animate={{ y: 0, opacity: 1, scale: 1.25 }}
                        exit={{ y: 130, scale: 0.8, transition: { duration: 0.8 } }}
                        transition={{ duration: 0.5, ease: [0.455, 0.03, 0.515, 0.955] }}
                        className="bg-card border border-border z-10 rounded-full p-2 w-[240px] shadow-sm absolute pointer-events-auto flex items-center gap-2 origin-bottom spatial-zoom"
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted-foreground/10 text-muted-foreground">
                          <HugeiconsIcon icon={chip.icon} className="size-5" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-foreground leading-none">{chip.title}</span>
                          <span className="text-xs text-muted-foreground ">{chip.description}</span>
                        </div>
                      </motion.div>
                    </Reveal>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <svg width="100%" height="100%" viewBox="0 0 655 352" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 z-20 pointer-events-none overflow-hidden" style={{ transform: "translate3d(0, 0, 0)" }}>
            <g filter="url(#filter0_i_51_65)">
              <path d="M512.766 79.1595L147.766 79.1624C136.453 79.1625 130.796 79.1626 127.281 82.6773C123.766 86.192 123.766 91.8488 123.766 103.162V327.159C123.766 338.473 123.766 344.13 127.281 347.645C130.796 351.159 136.453 351.159 147.766 351.159H512.766C524.08 351.159 529.737 351.159 533.252 347.645C536.766 344.13 536.766 338.473 536.766 327.159V103.159C536.766 91.8457 536.766 86.1888 533.252 82.6741C529.737 79.1594 524.08 79.1594 512.766 79.1595Z" className="fill-card" />
            </g>
            <g clipPath="url(#center_box_clip)">
              <foreignObject x="0" y="0" width="655" height="352">
                <div style={{ backdropFilter: "blur(60.03px)", WebkitBackdropFilter: "blur(60.03px)", height: "100%", width: "100%", background: "rgba(255, 255, 255, 0.01)", clipPath: "path('M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z')" }}></div>
              </foreignObject>
            </g>
            <g filter="url(#filter6_dddi_51_65)" data-figma-bg-blur-radius="22.0545">
              <path d="M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z" fill="#F59E0B" fillOpacity="0.95" shapeRendering="crispEdges" />
            </g>
          </svg>
        </DepthLayer>

        {/* Floating decorative elements */}
        <DepthLayer layer="ui" className="pointer-events-none absolute inset-0 -z-10">
          <ParallaxElement speed={0.15} direction="up" className="absolute top-0 left-1/4 w-24 h-24 opacity-20">
            <div className="w-full h-full rounded-full bg-amber-500/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
          <ParallaxElement speed={0.1} direction="down" className="absolute bottom-0 right-1/4 w-32 h-32 opacity-15">
            <div className="w-full h-full rounded-full bg-orange-500/10 blur-2xl" aria-hidden="true" />
          </ParallaxElement>
        </DepthLayer>
      </StaggerContainer>
    </Reveal>
  );
};

export default Bucket;