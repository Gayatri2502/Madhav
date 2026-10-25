"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right" | "blur" | "spatial-zoom" | "depth";
  delay?: number;
  stagger?: number;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
  as?: React.ElementType;
}

const variantClasses: Record<string, string> = {
  "fade-up": "scroll-reveal",
  "fade-in": "scroll-fade-in",
  "scale-in": "scroll-scale-in",
  "slide-left": "scroll-slide-left",
  "slide-right": "scroll-slide-right",
  "blur": "scroll-blur-reveal",
  "spatial-zoom": "scroll-spatial-zoom",
  "depth": "scroll-depth-reveal",
};

const variantClassesFallback: Record<string, string> = {
  "fade-up": "js-scroll-reveal",
  "fade-in": "js-scroll-fade-in",
  "scale-in": "js-scroll-scale-in",
  "slide-left": "js-scroll-reveal",
  "slide-right": "js-scroll-reveal",
  "blur": "js-scroll-scale-in",
  "spatial-zoom": "js-scroll-scale-in",
  "depth": "js-scroll-reveal",
};

export function Reveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  stagger = 0,
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.1,
  as: Component = "div",
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = React.useState(true); // Default to visible for SSR
  const [supportsScrollTimeline, setSupportsScrollTimeline] = React.useState(false);
  const elementRef = React.useRef<HTMLElement>(null);
  const staggerIndex = React.useRef(0);

  // Check for scroll timeline support on client only
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const supported = CSS.supports("animation-timeline", "view()");
      setSupportsScrollTimeline(supported);
      
      // If not supported, we'll use IntersectionObserver fallback
      if (!supported && !prefersReduced) {
        const element = elementRef.current;
        if (element) {
          setIsVisible(false); // Hide initially for animation
          
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                if (once) {
                  observer.unobserve(element);
                }
              } else if (!once) {
                setIsVisible(false);
              }
            },
            { rootMargin, threshold }
          );

          observer.observe(element);
          return () => observer.disconnect();
        }
      }
    }
  }, [prefersReduced, once, rootMargin, threshold]);

  // If prefers reduced motion, always visible
  React.useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
    }
  }, [prefersReduced]);

  const baseClass = supportsScrollTimeline
    ? variantClasses[variant]
    : variantClassesFallback[variant];

  const staggerClass = stagger > 0 ? `stagger-${Math.min(staggerIndex.current + 1, 8)}` : "";
  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` as React.CSSProperties["transitionDelay"] } : {};

  // Apply visible state class
  const visibilityClass = isVisible ? "reveal-visible" : "reveal-hidden";

  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      ref={elementRef}
      className={cn(baseClass, staggerClass, visibilityClass, className)}
      style={delayStyle}
      data-reveal={variant}
    >
      {children}
    </Comp>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: React.ElementType;
}

export function StaggerContainer({
  children,
  className,
  stagger = 60,
  as: Component = "div",
  ...props
}: StaggerContainerProps) {
  const childrenArray = React.Children.toArray(children);
  const prefersReduced = useReducedMotion();
  const [supportsScrollTimeline, setSupportsScrollTimeline] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setSupportsScrollTimeline(CSS.supports("animation-timeline", "view()"));
    }
  }, []);

  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn(supportsScrollTimeline ? "stagger-container" : "", className)}
      style={{ "--stagger-delay": `${stagger}ms` } as React.CSSProperties}
      {...props}
    >
      {childrenArray.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              className: cn(
                (child.props as any).className,
                supportsScrollTimeline ? "" : `stagger-${index + 1}`,
                prefersReduced ? "" : "js-stagger"
              ),
              style: {
                ...(child.props as any).style,
                ...(prefersReduced || supportsScrollTimeline
                  ? {}
                  : { transitionDelay: `${stagger * index}ms` }),
              },
            })
          : child
      )}
    </Comp>
  );
}