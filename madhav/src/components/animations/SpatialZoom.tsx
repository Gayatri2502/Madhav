"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface SpatialZoomProps {
  children: React.ReactNode;
  className?: string;
  depth?: "shallow" | "medium" | "deep";
  scale?: number;
  rotateX?: number;
  rotateY?: number;
  translateZ?: number;
  perspective?: number;
  onScroll?: (progress: number) => void;
  as?: React.ElementType;
}

export function SpatialZoom({
  children,
  className,
  depth = "medium",
  scale = 1,
  rotateX = 0,
  rotateY = 0,
  translateZ = 0,
  perspective = 1000,
  onScroll,
  as: Component = "div",
}: SpatialZoomProps) {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [clientIsMobile, setClientIsMobile] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isInView, setIsInView] = React.useState(false);

  // Sync clientIsMobile after hydration
  React.useEffect(() => {
    setClientIsMobile(isMobile);
  }, [isMobile]);

  // Adjust for mobile - use clientIsMobile to avoid hydration mismatch
  const mobilePerspective = clientIsMobile ? perspective * 1.5 : perspective;
  const mobileScale = clientIsMobile ? 1 - (1 - scale) * 0.5 : scale;
  const mobileRotateX = clientIsMobile ? rotateX * 0.3 : rotateX;
  const mobileRotateY = clientIsMobile ? rotateY * 0.3 : rotateY;
  const mobileTranslateZ = clientIsMobile ? translateZ * 0.5 : translateZ;

  const depthConfig = {
    shallow: { perspective: 2000, scale: 0.96, translateZ: -40 },
    medium: { perspective: 1000, scale: 0.92, translateZ: -80 },
    deep: { perspective: 500, scale: 0.88, translateZ: -120 },
  };

  const config = depthConfig[depth];

  React.useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const container = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const progress = Math.max(0, Math.min(1, 1 - rect.top / (rect.height + viewportHeight)));
            setScrollProgress(progress);
            onScroll?.(progress);
          };

          handleScroll();
          window.addEventListener("scroll", handleScroll, { passive: true });
          return () => window.removeEventListener("scroll", handleScroll);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReduced, onScroll]);

  const Comp: React.ComponentType<any> = Component as any;

  if (prefersReduced) {
    return (
      <Comp
        ref={containerRef}
        className={cn("spatial-zoom spatial-zoom--active", className)}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, filter",
        } as React.CSSProperties}
      >
        {children}
      </Comp>
    );
  }

  const progress = isInView ? scrollProgress : 0;
  const interpolatedScale = 1 - (1 - mobileScale) * (1 - progress);
  const interpolatedTranslateZ = mobileTranslateZ + (config.translateZ - mobileTranslateZ) * (1 - progress);
  const interpolatedRotateX = mobileRotateX * (1 - progress);
  const interpolatedRotateY = mobileRotateY * (1 - progress);
  const interpolatedOpacity = 0.6 + 0.4 * progress;
  const interpolatedBlur = 8 * (1 - progress);

  return (
    <div
      ref={containerRef}
      className={cn("perspective-container preserve-3d", className)}
      style={{
        perspective: `${mobilePerspective}px`,
        perspectiveOrigin: "center center",
      } as React.CSSProperties}
    >
      <Comp
        className={cn("spatial-zoom gpu-accelerated", className)}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, filter",
          opacity: interpolatedOpacity,
          transform: `translateZ(${interpolatedTranslateZ}px) scale(${interpolatedScale}) rotateX(${interpolatedRotateX}deg) rotateY(${interpolatedRotateY}deg)`,
          filter: `blur(${interpolatedBlur}px)`,
          transition: "transform 0.1s linear, opacity 0.1s linear, filter 0.1s linear",
        } as React.CSSProperties}
      >
        {children}
      </Comp>
    </div>
  );
}

interface ParallaxElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  as?: React.ElementType;
}

export function ParallaxElement({
  children,
  className,
  speed = 0.3,
  direction = "up",
  as: Component = "div",
}: ParallaxElementProps) {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [clientIsMobile, setClientIsMobile] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState("translateY(0)");

  React.useEffect(() => {
    setClientIsMobile(isMobile);
  }, [isMobile]);

  const mobileSpeed = clientIsMobile ? speed * 0.5 : speed;

  React.useEffect(() => {
    if (prefersReduced || !elementRef.current) return;

    const element = elementRef.current;
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const offset = clampedProgress * 100 * mobileSpeed;

      let transformValue = "";
      switch (direction) {
        case "up":
          transformValue = `translateY(${-offset}px)`;
          break;
        case "down":
          transformValue = `translateY(${offset}px)`;
          break;
        case "left":
          transformValue = `translateX(${-offset}px)`;
          break;
        case "right":
          transformValue = `translateX(${offset}px)`;
          break;
      }

      setTransform(transformValue);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReduced, mobileSpeed, direction]);

  if (prefersReduced) {
    const Comp: React.ComponentType<any> = Component as any;
    return <Comp className={cn("parallax-layer", className)}>{children}</Comp>;
  }

  const Comp: React.ComponentType<any> = Component as any;
  return (
    <Comp
      ref={elementRef}
      className={cn("parallax-layer gpu-accelerated will-change-transform", className)}
      style={{ transform } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}

interface DepthLayerProps {
  children: React.ReactNode;
  className?: string;
  layer?: "bg" | "mid" | "fg" | "ui";
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export function DepthLayer({
  children,
  className,
  layer = "mid",
  as: Component = "div",
  style,
}: DepthLayerProps) {
  const isMobile = useIsMobile();
  const [clientIsMobile, setClientIsMobile] = React.useState(false);

  React.useEffect(() => {
    setClientIsMobile(isMobile);
  }, [isMobile]);

  const layerStyles: Record<string, React.CSSProperties> = {
    bg: clientIsMobile
      ? { transform: "translateZ(-60px) scale(1.08)" }
      : { transform: "translateZ(-120px) scale(1.15)" },
    mid: clientIsMobile
      ? { transform: "translateZ(-20px) scale(1.03)" }
      : { transform: "translateZ(-40px) scale(1.05)" },
    fg: { transform: "translateZ(0) scale(1)" },
    ui: clientIsMobile
      ? { transform: "translateZ(20px) scale(0.98)" }
      : { transform: "translateZ(40px) scale(0.96)" },
  };

  const Comp: React.ComponentType<any> = Component as any;
  return (
    <Comp
      className={cn("depth-layer preserve-3d gpu-accelerated will-change-transform", className)}
      style={{ ...layerStyles[layer], ...style } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}