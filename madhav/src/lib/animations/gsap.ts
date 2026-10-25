'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: 'power2.out',
    duration: 0.6,
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    gsap.globalTimeline.timeScale(100);
  }
}

export interface RevealConfig {
  trigger?: Element | string;
  start?: string;
  end?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  ease?: string;
  once?: boolean;
  scrollTrigger?: Record<string, unknown>;
  from?: Record<string, unknown>;
}

export interface PinConfig {
  trigger: Element | string;
  start?: string;
  end?: string;
  pinSpacing?: boolean;
  scrub?: number | boolean;
  scrollTrigger?: Record<string, unknown>;
}

export interface ParallaxConfig {
  trigger: Element | string;
  depth?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  scrollTrigger?: Record<string, unknown>;
}

export function createRevealTimeline(elements: Element | Element[], config: RevealConfig = {}) {
  const elementArray = Array.isArray(elements) ? elements : [elements];
  const trigger = config.trigger || elementArray[0];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: config.start || 'top 85%',
      end: config.end || 'bottom 20%',
      toggleActions: config.once ? 'play none none none' : 'play none none reverse',
      ...config.scrollTrigger,
    },
  });

  tl.from(elementArray, {
    y: config.y ?? 40,
    opacity: 0,
    stagger: config.stagger ?? 0.08,
    ease: config.ease ?? 'expo.out',
    duration: config.duration ?? 0.8,
    ...config.from,
  });

  return tl;
}

export function createStaggerReveal(elements: Element[], config: RevealConfig = {}) {
  return createRevealTimeline(elements, {
    ...config,
    stagger: config.stagger ?? 0.06,
  });
}

export function createPinSection(config: PinConfig) {
  return gsap.to(config.trigger, {
    scrollTrigger: {
      trigger: config.trigger,
      start: config.start || 'top top',
      end: config.end || 'bottom top',
      pin: true,
      pinSpacing: config.pinSpacing ?? true,
      scrub: config.scrub ?? 0.5,
      ...config.scrollTrigger,
    },
  });
}

export function createParallax(config: ParallaxConfig) {
  const depth = config.depth ?? 0.5;
  return gsap.to(config.trigger, {
    yPercent: -100 * depth,
    ease: 'none',
    scrollTrigger: {
      trigger: config.trigger,
      start: config.start || 'top bottom',
      end: config.end || 'bottom top',
      scrub: config.scrub ?? true,
      ...config.scrollTrigger,
    },
  });
}

export function createHorizontalScroll(container: HTMLElement, items: HTMLElement[], config: { gap?: number; speed?: number } = {}) {
  const gap = config.gap ?? 24;
  const speed = config.speed ?? 1;

  const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth + gap, 0) - gap;
  const viewportWidth = container.offsetWidth;
  const scrollDistance = totalWidth - viewportWidth;

  return gsap.to(items, {
    x: -scrollDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${scrollDistance * speed}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
    },
  });
}

export async function splitAndReveal(textElement: HTMLElement, config: { words?: boolean; chars?: boolean; stagger?: number; y?: string; scrollTrigger?: Record<string, unknown> } = {}) {
  const SplitType = (await import('split-type')).default;
  const types: string[] = [];
  if (config.words !== false) types.push('words');
  if (config.chars !== false) types.push('chars');
  
  const split = new SplitType(textElement, {
    types: types.join(',') as 'lines,words,chars' | 'words,chars' | 'words' | 'chars',
    tagName: 'span',
  });

  const targets = config.chars !== false ? split.chars : split.words;

  // Extract only valid GSAP properties from config
  const { words, chars, scrollTrigger, ...gsapConfig } = config;

  gsap.from(targets, {
    y: config.y ?? '100%',
    opacity: 0,
    stagger: config.stagger ?? 0.02,
    ease: 'back.out(1.5)',
    duration: 0.6,
    scrollTrigger: {
      trigger: textElement,
      start: 'top 85%',
      ...scrollTrigger,
    },
    ...gsapConfig,
  });

  return split;
}

export function magneticButton(button: HTMLElement, strength = 0.3) {
  const quickToX = gsap.quickTo(button, 'x', { duration: 0.3, ease: 'power3.out' });
  const quickToY = gsap.quickTo(button, 'y', { duration: 0.3, ease: 'power3.out' });

  const handleMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    quickToX(x * strength);
    quickToY(y * strength);
  };

  const handleLeave = () => {
    quickToX(0);
    quickToY(0);
  };

  button.addEventListener('mousemove', handleMove);
  button.addEventListener('mouseleave', handleLeave);

  return () => {
    button.removeEventListener('mousemove', handleMove);
    button.removeEventListener('mouseleave', handleLeave);
  };
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach(st => st.kill());
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };