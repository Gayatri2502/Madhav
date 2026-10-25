"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: "fixed" | "sticky";
  top?: number;
  zIndex?: number;
  containerRef?: React.RefObject<HTMLElement>;
}

export function ScrollProgress({
  className,
  color = "var(--color-primary, #0ea5e9)",
  height = 3,
  position = "fixed",
  top = 0,
  zIndex = 1000,
  containerRef,
}: ScrollProgressProps) {
  const prefersReduced = useReducedMotion();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (prefersReduced) return;

    const handleScroll = () => {
      const container = containerRef?.current ?? document.documentElement;
      const scrollTop = container.scrollTop || window.scrollY;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setProgress(Math.max(0, Math.min(1, scrollProgress)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReduced, containerRef]);

  if (prefersReduced) return null;

  return (
    <div
      className={cn("scroll-progress", className)}
      style={{
        position,
        top,
        left: 0,
        right: 0,
        height: `${height}px`,
        background: "transparent",
        zIndex,
        pointerEvents: "none",
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <div
        className="scroll-progress__bar"
        style={{
          height: "100%",
          background: color,
          transformOrigin: "left",
          transform: `scaleX(${progress})`,
          willChange: "transform",
          borderRadius: `${height / 2}px`,
        } as React.CSSProperties}
      />
    </div>
  );
}

interface SectionProgressProps {
  className?: string;
  color?: string;
  height?: number;
  sectionRef: React.RefObject<HTMLElement>;
  containerRef?: React.RefObject<HTMLElement>;
}

export function SectionProgress({
  className,
  color = "var(--color-primary, #0ea5e9)",
  height = 2,
  sectionRef,
  containerRef,
}: SectionProgressProps) {
  const prefersReduced = useReducedMotion();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const section = sectionRef.current;
    const container = containerRef?.current ?? document.documentElement;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const sectionTop = rect.top - containerRect.top;
      const sectionHeight = rect.height;
      const scrollProgress = (viewportHeight - sectionTop) / (viewportHeight + sectionHeight);
      setProgress(Math.max(0, Math.min(1, scrollProgress)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReduced, sectionRef, containerRef]);

  if (prefersReduced) return null;

  return (
    <div
      className={cn("section-progress", className)}
      style={{
        position: "sticky",
        top: `calc(var(--header-height, 4rem) + 0.5rem)`,
        height: `${height}px`,
        background: "var(--color-border, #e5e5e5)",
        borderRadius: `${height / 2}px`,
        overflow: "hidden",
        zIndex: 20,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <div
        className="section-progress__bar"
        style={{
          height: "100%",
          background: color,
          borderRadius: `${height / 2}px`,
          transformOrigin: "left",
          transform: `scaleX(${progress})`,
          willChange: "transform",
        } as React.CSSProperties}
      />
    </div>
  );
}

interface StickyStackProgressProps {
  className?: string;
  color?: string;
  height?: number;
  itemCount: number;
  activeIndex: number;
}

export function StickyStackProgress({
  className,
  color = "var(--color-primary, #0ea5e9)",
  height = 4,
  itemCount,
  activeIndex,
}: StickyStackProgressProps) {
  const progress = itemCount > 1 ? activeIndex / (itemCount - 1) : 0;

  return (
    <div
      className={cn("sticky-stack__progress", className)}
      style={{
        position: "sticky",
        top: `calc(var(--header-height, 4rem) + 0.5rem)`,
        height: `${height}px`,
        background: "var(--color-border, #e5e5e5)",
        borderRadius: `${height / 2}px`,
        overflow: "hidden",
        zIndex: 20,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <div
        className="sticky-stack__progress-bar"
        style={{
          height: "100%",
          background: color,
          borderRadius: `${height / 2}px`,
          transformOrigin: "left",
          transform: `scaleX(${progress})`,
          willChange: "transform",
          transition: "transform 0.3s var(--easing-expressive, cubic-bezier(0.4, 0, 0.2, 1))",
        } as React.CSSProperties}
      />
    </div>
  );
}