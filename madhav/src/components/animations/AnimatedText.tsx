"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-in" | "scale-in" | "slide-up" | "blur";
  splitBy?: "words" | "chars" | "lines";
  stagger?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  as?: React.ElementType;
  onComplete?: () => void;
}

export function AnimatedText({
  children,
  className,
  variant = "fade-up",
  splitBy = "words",
  stagger = 60,
  delay = 0,
  duration = 500,
  ease = "cubic-bezier(0.4, 0, 0.2, 1)",
  as: Component = "p",
  onComplete,
}: AnimatedTextProps) {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLElement>(null);
  const textRef = React.useRef<string>("");

  React.useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      onComplete?.();
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReduced, onComplete]);

  const text = typeof children === "string" ? children : String(children);
  textRef.current = text;

  const splitText = (text: string, by: string): string[] => {
    switch (by) {
      case "words":
        return text.split(/(\s+)/).filter((s) => s.length > 0);
      case "chars":
        return text.split("");
      case "lines":
        return text.split("\n");
      default:
        return [text];
    }
  };

  const parts = splitText(text, splitBy);

  const variantStyles: Record<string, { from: React.CSSProperties; to: React.CSSProperties }> = {
    "fade-up": {
      from: { opacity: 0, transform: "translateY(1.2em)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-in": {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    "scale-in": {
      from: { opacity: 0, transform: "scale(0.9)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    "slide-up": {
      from: { opacity: 0, transform: "translateY(2em)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    blur: {
      from: { opacity: 0, filter: "blur(8px)", transform: "scale(0.95)" },
      to: { opacity: 1, filter: "blur(0)", transform: "scale(1)" },
    },
  };

  const { from, to } = variantStyles[variant] || variantStyles["fade-up"];

  if (prefersReduced || !isVisible) {
    const Comp: React.ComponentType<any> = Component as any;
    return (
      <Comp
        ref={elementRef}
        className={cn(className)}
        style={{ opacity: isVisible ? 1 : 0 } as React.CSSProperties}
      >
        {children}
      </Comp>
    );
  }

  const Comp: React.ComponentType<any> = Component as any;
  return (
    <Comp
      ref={elementRef}
      className={cn("animated-text", className)}
      style={{
        display: "inline-block",
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {parts.map((part, index) => (
        <span
          key={index}
          className="animated-text__part"
          style={{
            display: "inline-block",
            opacity: 0,
            transform: from.transform,
            filter: from.filter,
            animation: `${variant}-reveal ${duration}ms ${ease} forwards`,
            animationDelay: `${delay + stagger * index}ms`,
            willChange: "transform, opacity, filter",
          } as React.CSSProperties}
        >
          {part}
        </span>
      ))}
      <style jsx>{`
        @keyframes fade-up-reveal {
          from { opacity: 0; transform: translateY(1.2em); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-reveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in-reveal {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-up-reveal {
          from { opacity: 0; transform: translateY(2em); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blur-reveal {
          from { opacity: 0; filter: blur(8px); transform: scale(0.95); }
          to { opacity: 1; filter: blur(0); transform: scale(1); }
        }
      `}</style>
    </Comp>
  );
}

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorClass?: string;
  onComplete?: () => void;
  as?: React.ElementType;
}

export function Typewriter({
  text,
  className,
  speed = 30,
  delay = 0,
  cursor = true,
  cursorClass = "typewriter-cursor",
  onComplete,
  as: Component = "span",
}: TypewriterProps) {
  const prefersReduced = useReducedMotion();
  const [displayText, setDisplayText] = React.useState("");
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (prefersReduced) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, prefersReduced, onComplete]);

  const Comp: React.ComponentType<any> = Component as any;
  return (
    <Comp className={cn("typewriter", className)}>
      {displayText}
      {cursor && !isComplete && <span className={cn(cursorClass, "animate-pulse")}>|</span>}
    </Comp>
  );
}

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  distance?: number;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
}

export function TextReveal({
  children,
  className,
  direction = "up",
  distance = 30,
  delay = 0,
  duration = 600,
  as: Component = "div",
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReduced]);

  const transforms: Record<string, string> = {
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
  };

  const Comp: React.ComponentType<any> = Component as any;
  return (
    <Comp
      ref={elementRef}
      className={cn("text-reveal", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0)" : transforms[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: "transform, opacity",
      } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}