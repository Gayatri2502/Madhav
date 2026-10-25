"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EASING_EXPRESSIVE = "cubic-bezier(0.4, 0, 0.2, 1)";
const TRANSITION_BASE = `transform var(--duration-normal, 200ms) ${EASING_EXPRESSIVE}, opacity var(--duration-normal, 200ms) ${EASING_EXPRESSIVE}, box-shadow var(--duration-normal, 200ms) ${EASING_EXPRESSIVE}`;
const PROGRESS_TRANSITION = `transform 0.3s ${EASING_EXPRESSIVE}`;

interface StickyStackCardProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  total: number;
  activeIndex?: number;
  gap?: string;
  as?: React.ElementType;
}

export function StickyStackCard({
  children,
  className,
  index,
  total,
  activeIndex,
  gap = "var(--stack-gap, 0.75rem)",
  as: Component = "div",
}: StickyStackCardProps) {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const isActive = activeIndex !== undefined && index === activeIndex;
  const isPrev = activeIndex !== undefined && index === activeIndex - 1;
  const isNext = activeIndex !== undefined && index === activeIndex + 1;
  const isHidden = activeIndex !== undefined && index > activeIndex + 1;

  const gapValue = parseFloat(gap.replace("var(--stack-gap, 0.75rem)", "0.75rem").replace("rem", ""));
  const stackOffset = `${index * (gapValue || 0.75)}rem`;

  if (prefersReduced) {
    const Comp: React.ComponentType<any> = Component as any;
    return (
      <Comp
        className={cn("sticky-stack__card", className)}
        style={{
          position: "sticky",
          top: `calc(var(--header-height, 4rem) + ${stackOffset})`,
          zIndex: total - index,
        } as React.CSSProperties}
      >
        {children}
      </Comp>
    );
  }

  let transform = "";
  let opacity = 1;
  let boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  let zIndex = total - index;

  if (isActive) {
    transform = "translateZ(0) scale(1) rotateX(0deg) rotateY(0deg)";
    opacity = 1;
    boxShadow = "0 20px 40px -12px rgba(0, 0, 0, 0.15)";
    zIndex = 10;
  } else if (isPrev) {
    transform = isMobile
      ? "translateZ(-20px) scale(0.97) rotateX(2deg)"
      : "translateZ(-30px) scale(0.96) rotateX(3deg)";
    opacity = isMobile ? 0.8 : 0.7;
    boxShadow = "0 12px 24px -8px rgba(0, 0, 0, 0.08)";
    zIndex = 5;
  } else if (isNext) {
    transform = isMobile
      ? "translateZ(-10px) scale(0.99) rotateX(-1deg)"
      : "translateZ(-15px) scale(0.98) rotateX(-2deg)";
    opacity = isMobile ? 0.9 : 0.85;
    boxShadow = "0 8px 16px -6px rgba(0, 0, 0, 0.06)";
    zIndex = 8;
  } else if (isHidden) {
    transform = isMobile
      ? "translateZ(-40px) scale(0.94) rotateX(4deg)"
      : "translateZ(-60px) scale(0.9) rotateX(6deg)";
    opacity = isMobile ? 0.5 : 0.4;
    boxShadow = "0 4px 8px -4px rgba(0, 0, 0, 0.04)";
    zIndex = 1;
  } else {
    transform = "translateZ(0) scale(1) rotateX(0deg) rotateY(0deg)";
    opacity = 1;
    boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    zIndex = total - index;
  }

  const Comp: React.ComponentType<any> = Component as any;
  return (
    <Comp
      className={cn("sticky-stack__card preserve-3d gpu-accelerated will-change-transform", className)}
      style={{
        position: "sticky",
        top: `calc(var(--header-height, 4rem) + ${stackOffset})`,
        zIndex,
        transform,
        opacity,
        boxShadow,
        transformOrigin: "center top",
        transition: TRANSITION_BASE,
      } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}

interface StickyStackProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  paddingBottom?: string;
  showProgress?: boolean;
  progressColor?: string;
  onActiveChange?: (index: number) => void;
  as?: React.ElementType;
}

export function StickyStack({
  children,
  className,
  gap = "0.75rem",
  paddingBottom = "2rem",
  showProgress = false,
  progressColor = "var(--color-primary, #0ea5e9)",
  onActiveChange,
  as: Component = "div",
}: StickyStackProps) {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const cardsArray = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement[];
  const cardCount = cardsArray.length;

  React.useEffect(() => {
    if (prefersReduced || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = -1;
        let newActiveIndex = 0;

        entries.forEach((entry) => {
          const cardIndex = cardsRef.current.indexOf(entry.target as HTMLDivElement);
          if (cardIndex !== -1 && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            newActiveIndex = cardIndex;
          }
        });

        if (newActiveIndex !== activeIndex) {
          setActiveIndex(newActiveIndex);
          onActiveChange?.(newActiveIndex);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    observerRef.current = observer;

    cardsRef.current.forEach((card, index) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [prefersReduced, cardCount, activeIndex, onActiveChange]);

  const mobileGap = isMobile ? "0.5rem" : gap;

  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("sticky-stack", className)}
      style={{
        "--stack-gap": mobileGap,
        "--stack-padding-bottom": paddingBottom,
      } as React.CSSProperties}
    >
      {showProgress && (
        <StickyStackProgress
          itemCount={cardCount}
          activeIndex={activeIndex}
          color={progressColor}
        />
      )}
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child as React.ReactElement<any>, {
          ref: (el: HTMLDivElement | null) => {
            cardsRef.current[index] = el;
          },
          index,
          total: cardCount,
          activeIndex,
          gap: mobileGap,
        });
      })}
    </Comp>
  );
}

interface StickyStackProgressProps {
  itemCount: number;
  activeIndex: number;
  color?: string;
  height?: number;
  className?: string;
}

function StickyStackProgress({
  itemCount,
  activeIndex,
  color = "var(--color-primary, #0ea5e9)",
  height = 4,
  className,
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
          transition: PROGRESS_TRANSITION,
        } as React.CSSProperties}
      />
    </div>
  );
}