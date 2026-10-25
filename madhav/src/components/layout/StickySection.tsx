"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

interface StickySectionProps {
  children?: React.ReactNode;
  className?: string;
  stickyContent: React.ReactNode;
  scrollingContent: React.ReactNode;
  stickyTop?: number;
  mobileSticky?: boolean;
  gap?: string;
  as?: React.ElementType;
}

export function StickySection({
  children,
  className,
  stickyContent,
  scrollingContent,
  stickyTop,
  mobileSticky = false,
  gap = "var(--spacing-lg, 1.5rem)",
  as: Component = "section",
}: StickySectionProps) {
  const isMobile = useIsMobile();

  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("sticky-section", className)}
      style={{ "--sticky-top": stickyTop ? `${stickyTop}px` : undefined, gap } as React.CSSProperties}
    >
      <div className={cn("sticky-section__sticky", mobileSticky && isMobile && "sticky-section--mobile-sticky")}>
        {stickyContent}
      </div>
      <div className="sticky-section__scrolling">{scrollingContent}</div>
    </Comp>
  );
}

interface StickyVisualSectionProps {
  children?: React.ReactNode;
  className?: string;
  media: React.ReactNode;
  content: React.ReactNode;
  stickyTop?: number;
  mobileSticky?: boolean;
  gap?: string;
  as?: React.ElementType;
}

export function StickyVisualSection({
  children,
  className,
  media,
  content,
  stickyTop,
  mobileSticky = false,
  gap = "var(--spacing-xl, 2rem)",
  as: Component = "section",
}: StickyVisualSectionProps) {
  const isMobile = useIsMobile();

  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("sticky-visual-section", className)}
      style={{ gap } as React.CSSProperties}
    >
      <div className={cn("sticky-visual-section__media", mobileSticky && isMobile && "sticky-visual-section--mobile-sticky")}>
        {media}
      </div>
      <div className="sticky-visual-section__content">{content}</div>
    </Comp>
  );
}

interface StickyPanelProps {
  children: React.ReactNode;
  className?: string;
  top?: number;
  mobile?: boolean;
  enterAnimation?: boolean;
  as?: React.ElementType;
}

export function StickyPanel({
  children,
  className,
  top,
  mobile = false,
  enterAnimation = true,
  as: Component = "div",
}: StickyPanelProps) {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!enterAnimation) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enterAnimation]);

  const mobileSticky = mobile && isMobile;

  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      ref={elementRef}
      className={cn(
        "sticky-panel gpu-accelerated will-change-transform",
        isVisible ? "sticky-panel--active" : "sticky-panel--enter",
        mobileSticky && "sticky-panel--mobile",
        className
      )}
      style={{
        "--panel-top": top ? `${top}px` : undefined,
        "--panel-top-mobile": top ? `${top}px` : undefined,
      } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}