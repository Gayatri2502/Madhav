# /animate — Meaningful Motion for Current Page

## Purpose
Systematically add purposeful, performant animations to the current page. Every animation must answer: **Trigger, Duration, Easing, Movement, Purpose, Performance Cost, Mobile Behavior, Reduced-Motion Behavior.** No decoration — every effect serves user intent.

---

## Command Interface

```
/animate                    # Full workflow on current page
/animate --audit            # Identify opportunities only
/animate --implement        # Implement approved animations
/animate --review           # Review existing animations for jank/redundancy
/animate --remove           # Strip animations that don't improve UX
/animate --mobile           # Test/adjust mobile behavior
/animate --reduced-motion   # Verify/add prefers-reduced-motion support
```

---

## Execution Flow (12 Steps)

### Step 1: INSPECT CURRENT PAGE
```bash
# Target: Current route (e.g., madhav/src/app/page.tsx, madhav/src/app/about/page.tsx)
# Analyze:
- Page component tree
- Existing animations (Framer Motion, GSAP, CSS, R3F)
- Interactive elements (buttons, links, cards, forms, nav)
- Content sections (hero, features, testimonials, CTAs)
- Scroll behavior (length, sections, parallax candidates)
- 3D/Canvas elements (R3F Canvas, shaders, models)
- Performance baseline (Lighthouse, DevTools Performance)
```

**Output**: `ANIMATION_AUDIT_<page>.md` with:
- Element inventory with current animation state
- Scroll depth and section boundaries
- User intent per section (read, explore, act, decide)
- Performance budget remaining

---

### Step 2: IDENTIFY OPPORTUNITIES
**Map user intent → motion purpose**:

| User Intent | Motion Purpose | Technique | Priority |
|-------------|----------------|-----------|----------|
| Orient on load | Entrance/reveal | CSS view-timeline / Framer variants | High |
| Understand hierarchy | Stagger, scale | Framer staggerContainer | High |
| Navigate | Page transition | Framer AnimatePresence + layoutId | High |
| Focus attention | Hover/focus feedback | CSS transition / Framer whileHover | High |
| Show state change | Toggle, submit, load | Framer animate / CSS | High |
| Explore content | Scroll-reveal | GSAP ScrollTrigger / view-timeline | Medium |
| Delight/brand | Ambient 3D, particles | R3F / Canvas / CSS | Low |
| Indicate progress | Scroll progress, loading | CSS / GSAP / Framer | Medium |

**Filter**: Keep only where motion **reduces cognitive load** or **improves perceived performance**.

**Output**: `ANIMATION_PLAN_<page>.md` with prioritized list + rationale.

---

### Step 3: DESIGN ANIMATION SYSTEM
**Define reusable primitives for this page** (extend `madhav/src/themes/animations.ts`):

```typescript
// madhav/src/themes/animations.ts
export const motion = {
  // Durations (ms)
  duration: {
    instant: 0,
    fast: 100,
    normal: 200,
    slow: 300,
    slower: 500,
    page: 400,
  },

  // Easing curves (cubic-bezier)
  easing: {
    // Brand easings
    standard: [0.2, 0, 0.38, 0.9],        // Material standard
    expressive: [0.4, 0, 0.2, 1],          // Material expressive
    snappy: [0.33, 0.66, 0.66, 1],         // Quick response
    anticipatory: [0.36, -0.01, 0.66, 1.01], // Overshoot feel
    // GSAP named (for ScrollTrigger)
    gsap: {
      power2: 'power2.out',
      power3: 'power3.out',
      expo: 'expo.out',
      back: 'back.out(1.5)',
      elastic: 'elastic.out(1, 0.5)',
    }
  },

  // Stagger delays
  stagger: {
    fast: 0.03,
    normal: 0.06,
    slow: 0.1,
    children: 0.08,
  },

  // Reduced motion overrides
  reducedMotion: {
    duration: 0,
    easing: 'linear',
    stagger: 0,
  },

  // Performance hints
  performance: {
    willChange: 'transform, opacity, filter',
    contain: 'layout paint',
    gpuOnly: ['transform', 'opacity', 'filter', 'clip-path'],
  }
} as const;
```

**Page-specific variants** (in page component or section):
```typescript
// Section-specific animation config
const heroAnim = {
  trigger: 'load',
  duration: motion.duration.page,
  easing: motion.easing.expressive,
  movement: { y: [40, 0], opacity: [0, 1] },
  purpose: 'orient-user',
  performanceCost: 'low',
  mobileBehavior: 'same',
  reducedMotionBehavior: 'instant',
};
```

---

### Step 4: IMPLEMENT HIGH-QUALITY INTERACTIONS

**Decision Matrix — Choose the Right Tool**:

| Scenario | Tool | Why |
|----------|------|-----|
| Simple hover/focus/active | **CSS `transition`** | Zero JS, GPU-accelerated, instant |
| Enter/exit animations | **Framer Motion `variants`** | Declarative, orchestration, layout animations |
| Complex sequencing/timelines | **GSAP Timeline** | Precise control, stagger, callbacks |
| Scroll-linked (scrub, pin, parallax) | **GSAP ScrollTrigger** | Performant scrub, pinning, responsive |
| Page transitions (shared layout) | **Framer `AnimatePresence` + `layoutId`** | Seamless shared element transitions |
| 3D hero / WebGL background | **R3F + Shaders** | GPU-only, 60fps, interactive 3D |
| Canvas particles / trails | **Canvas 2D / WebGL** | High particle counts, custom behavior |
| Text split reveal (char/word/line) | **GSAP + SplitType** | Granular control, performant |

**Implementation Rules**:
- **CSS first** — if it works in CSS, use CSS
- **Framer for React orchestration** — enter/exit, layout, gestures
- **GSAP for scroll + complex sequences** — ScrollTrigger, timelines
- **R3F only when 3D adds meaning** — not for 2D effects

---

### Step 5: USE CSS WHERE SUFFICIENT

**Patterns** (add to `madhav/src/styles/animations.css` or component CSS):

```css
/* 1. Universal reduced-motion reset */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* 2. Reusable transitions */
.transition-standard {
  transition: transform var(--duration-normal) var(--easing-standard),
              opacity var(--duration-normal) var(--easing-standard);
}

.transition-snappy {
  transition: transform var(--duration-fast) var(--easing-snappy),
              opacity var(--duration-fast) var(--easing-snappy);
}

/* 3. Hover/focus states (GPU-only) */
.interactive:hover,
.interactive:focus-visible {
  transform: translateY(-2px);
  /* No box-shadow animation — triggers paint */
}

.interactive:active {
  transform: translateY(0) scale(0.98);
  transition-duration: 50ms;
}

/* 4. Entrance animations (view-timeline) */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fade-in-up var(--duration-slow) var(--easing-expressive) forwards;
  opacity: 0; /* Hidden until animation runs */
}

/* 5. Scroll-driven (modern, no JS) */
@keyframes parallax-slow {
  from { transform: translateY(0); }
  to { transform: translateY(-100px); }
}

.parallax-slow {
  animation: parallax-slow linear;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
}

/* 6. Stagger via CSS (simple cases) */
.stagger-children > * {
  animation: fade-in-up var(--duration-normal) var(--easing-standard) forwards;
  opacity: 0;
}

.stagger-children > *:nth-child(1)  { animation-delay: calc(var(--stagger-normal) * 1); }
.stagger-children > *:nth-child(2)  { animation-delay: calc(var(--stagger-normal) * 2); }
.stagger-children > *:nth-child(3)  { animation-delay: calc(var(--stagger-normal) * 3); }
.stagger-children > *:nth-child(4)  { animation-delay: calc(var(--stagger-normal) * 4); }
.stagger-children > *:nth-child(5)  { animation-delay: calc(var(--stagger-normal) * 5); }
.stagger-children > *:nth-child(6)  { animation-delay: calc(var(--stagger-normal) * 6); }

/* 7. Focus visible (accessible) */
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* 8. Loading states */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading { animation: pulse 1.5s ease-in-out infinite; }

/* 9. Performance hints */
.will-change-transform { will-change: transform; }
.will-change-opacity { will-change: opacity; }
.contain-layout-paint { contain: layout paint; }
```

**Usage in components**:
```tsx
// Simple hover — pure CSS
<button className="interactive transition-standard">Hover me</button>

// Entrance — CSS view-timeline
<section className="reveal">Content reveals on scroll</section>

// Stagger — CSS
<div className="stagger-children">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</div>
```

---

### Step 6: USE GSAP FOR ADVANCED SEQUENCING

**When**: Complex timelines, scroll scrub/pin, stagger with custom eases, morphing.

**Setup** (in `madhav/src/lib/animations/gsap.ts`):
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitType } from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// Defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
});

// Reduced motion global
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  gsap.globalTimeline.timeScale(100); // Effectively instant
  ScrollTrigger.config({ autoKill: true });
}

export const createRevealTimeline = (elements: Element[], config = {}) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      ...config.scrollTrigger,
    },
    ...config,
  });

  tl.from(elements, {
    y: 40,
    opacity: 0,
    stagger: 0.08,
    ease: 'expo.out',
    duration: 0.8,
    ...config.from,
  });

  return tl;
};

export const createPinSection = (trigger: Element, config = {}) => {
  return gsap.to(trigger, {
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      ...config.scrollTrigger,
    },
    ...config,
  });
};

export const createParallax = (element: Element, depth = 0.5) => {
  gsap.to(element, {
    yPercent: -100 * depth,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const splitAndReveal = (textElement: HTMLElement, config = {}) => {
  const split = new SplitType(textElement, { types: 'words,chars', tagName: 'span' });
  
  gsap.from(split.chars, {
    y: '100%',
    opacity: 0,
    stagger: 0.02,
    ease: 'back.out(1.5)',
    duration: 0.6,
    scrollTrigger: {
      trigger: textElement,
      start: 'top 85%',
      ...config.scrollTrigger,
    },
    ...config,
  });

  return split;
};

export const magneticButton = (button: HTMLButtonElement, strength = 0.3) => {
  const quickTo = gsap.quickTo(button, 'x', { duration: 0.3, ease: 'power3.out' });
  const quickToY = gsap.quickTo(button, 'y', { duration: 0.3, ease: 'power3.out' });

  const handleMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    quickTo(x * strength);
    quickToY(y * strength);
  };

  const handleLeave = () => {
    quickTo(0);
    quickToY(0);
  };

  button.addEventListener('mousemove', handleMove);
  button.addEventListener('mouseleave', handleLeave);

  return () => {
    button.removeEventListener('mousemove', handleMove);
    button.removeEventListener('mouseleave', handleLeave);
  };
};
```

**Usage in components**:
```tsx
'use client';

import { useEffect, useRef } from 'react';
import { createRevealTimeline, createPinSection, magneticButton } from '@/lib/animations/gsap';

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    
    // Text split reveal
    const split = splitAndReveal(titleRef.current);
    
    // Pin section
    if (pinRef.current) createPinSection(pinRef.current);
    
    // Magnetic CTA
    if (ctaRef.current) {
      const cleanup = magneticButton(ctaRef.current);
      return cleanup;
    }
  }, []);

  return (
    <div ref={pinRef} className="relative h-screen">
      <h1 ref={titleRef} className="text-6xl font-bold">Transforming Ideas</h1>
      <button ref={ctaRef} className="magnetic-btn">Get Started</button>
    </div>
  );
}
```

---

### Step 7: USE THREE.JS/WEBGL ONLY WHEN GENUINELY BENEFICIAL

**Criteria** — Use R3F/Three.js only if:
- [ ] 3D conveys information 2D cannot (product rotation, spatial relationships)
- [ ] Brand differentiation requires 3D (technical/creative credibility)
- [ ] Interactive exploration adds value (configurator, viewer)
- [ ] Performance budget allows (< 500KB initial, 60fps on 5x throttle)

**If NOT met** → Use CSS/Canvas 2D/SVG instead.

**R3F Implementation Pattern** (`madhav/src/components/canvas/HeroScene.tsx`):
```tsx
'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Preload } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lazy-loaded, SSR-safe
const HeroScene = dynamic(() => import('./HeroSceneContent'), { 
  ssr: false,
  loading: () => <FallbackHero />
});

export function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop="demand" // Only render when needed
      >
        <Suspense fallback={<FallbackHero />}>
          <HeroSceneContent />
        </Suspense>
      </Canvas>
      
      {/* HTML overlay — occluded by 3D */}
      <div className="relative z-10 flex h-full items-center justify-center px-8">
        <Html 
          transform 
          sprite 
          distanceFactor={10}
          occlude
        >
          <h1 className="text-5xl font-bold text-center">Precision in Motion</h1>
        </Html>
      </div>
    </div>
  );
}

function HeroSceneContent() {
  const { camera } = useThree();
  const scrollProgress = useScrollProgress(); // Custom hook

  // Scroll-linked camera animation
  useGSAP(() => {
    gsap.to(camera.position, {
      x: scrollProgress * 2,
      y: scrollProgress * 1,
      z: 5 + scrollProgress * 3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }, [scrollProgress]);

  return (
    <>
      <Preload all />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={false}
        autoRotate 
        autoRotateSpeed={0.2}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1} />
      {/* Optimized GLTF with Draco + KTX2 */}
      <Model url="/models/hero-object.glb" />
      <AtmosphereParticles count={5000} />
    </>
  );
}
```

**Performance Rules for 3D**:
- `frameloop="demand"` — render only on change
- DRACO compression + KTX2 textures (gltf-transform)
- `instancedMesh` for repeated objects
- `frustumCulled = true` + `computeBoundingSphere()`
- Half-res render targets on mobile
- Pause when tab hidden

---

### Step 8: OPTIMIZE ANIMATION PERFORMANCE

**Checklist per animation**:

| Check | Tool | Pass Criteria |
|-------|------|---------------|
| GPU-only properties | DevTools Animations | transform, opacity, filter only |
| No layout thrashing | DevTools Performance | 0 layout shifts during animation |
| Composite layer | DevTools Layers | Animated element on own layer |
| `will-change` used | DevTools Elements | Set during, removed after |
| Frame time | DevTools Performance | < 16.67ms (60fps) on 5x throttle |
| Main thread | DevTools Performance | < 4ms JS per frame |
| Memory | DevTools Memory | No leaks (heap stable) |
| Bundle impact | Bundle analyzer | < 5KB per new animation |

**Optimization Patterns**:
```css
/* 1. Promote to composite layer */
.animate-me {
  will-change: transform, opacity;
  /* Remove after animation: */
  /* animationend: this.style.willChange = 'auto' */
}

/* 2. Contain layout/paint */
.animation-container {
  contain: layout paint;
}

/* 3. Avoid layout triggers — NEVER animate these */
.bad { width, height, top, left, right, bottom, margin, padding, border }
.good { transform, opacity, filter, clip-path, background-position }

/* 4. Reduce paint area */
.small-paint-area { 
  /* Animate small elements, not full-screen */
}

/* 5. Use transform3d for layer promotion (legacy) */
.gpu-layer { transform: translate3d(0, 0, 0); }

/* 6. CSS containment for scroll containers */
.scroll-container {
  overflow-y: auto;
  contain: strict; /* layout paint style size */
}
```

**GSAP/R3F Specific**:
```typescript
// GSAP: force3D for transform
gsap.set(element, { force3D: true });

// GSAP: lag smoothing for heavy pages
gsap.ticker.lagSmoothing(500, 33);

// R3F: frustum culling
<mesh frustumCulled geometry={geo} material={mat} />

// R3F: instanced mesh for 100+ objects
<instancedMesh args={[geometry, material, count]}>
  {Array.from({ length: count }).map((_, i) => (
    <instance key={i} matrix={matrices[i]} />
  ))}
</instancedMesh>
```

---

### Step 9: ADD MOBILE BEHAVIOR

**Responsive Animation Strategy**:

| Animation Type | Mobile Behavior | Implementation |
|----------------|-----------------|----------------|
| Hover effects | Convert to active/tap | `@media (hover: none)` + `:active` |
| Scroll parallax | Reduce depth or disable | `ScrollTrigger.matchMedia()` |
| Complex GSAP | Simplify stagger/duration | `matchMedia: { '(max-width: 768px)': { stagger: 0.04 } }` |
| 3D hero | Static image fallback | `IntersectionObserver` + static `<img>` |
| Particle systems | Reduce count 50-80% | `count: isMobile ? 2000 : 10000` |
| Page transitions | Fade only, no layout | `AnimatePresence mode="popLayout"` |
| Lenis smooth scroll | Disable, native scroll | `Lenis({ smoothTouch: false })` |

**Implementation**:
```typescript
// GSAP responsive
ScrollTrigger.matchMedia({
  '(min-width: 769px)': () => {
    // Full parallax, pin, scrub
    createParallax(element, 0.5);
    createPinSection(section);
  },
  '(max-width: 768px)': () => {
    // Simplified: fade only, no pin
    gsap.from(element, { 
      opacity: 0, 
      y: 20, 
      scrollTrigger: { trigger: element, start: 'top 90%' } 
    });
  },
  '(prefers-reduced-motion: reduce)': () => {
    // Instant, no animation
    gsap.set(element, { opacity: 1, y: 0 });
  },
});

// R3F mobile detection
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const particleCount = isMobile ? 2000 : 10000;
const dpr = isMobile ? 1 : Math.min(2, window.devicePixelRatio);

<Canvas dpr={dpr} ...>
  <Particles count={particleCount} />
</Canvas>

// CSS mobile hover handling
@media (hover: none) and (pointer: coarse) {
  .interactive:hover { transform: none; }
  .interactive:active { transform: scale(0.98); }
}
```

---

### Step 10: ADD PREFERS-REDUCED-MOTION SUPPORT

**Global** (in `madhav/src/app/globals.css`):
```css
/* 1. Disable all non-essential motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
    scroll-behavior: auto !important;
  }

  /* 2. Exceptions — keep functional motion */
  .loading-spinner,
  .progress-ring,
  .essential-feedback {
    animation-duration: 0.3s !important;
  }

  /* 3. Disable Lenis smooth scroll */
  html.lenis {
    scroll-behavior: auto !important;
  }
}

/* 4. JavaScript detection */
<script>
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.toggle('reduce-motion', prefersReduced);
</script>
```

**Per-Animation** (GSAP/Framer/R3F):
```typescript
// GSAP
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) {
  gsap.globalTimeline.timeScale(100);
  ScrollTrigger.getAll().forEach(st => st.kill());
}

// Framer Motion
const prefersReduced = useReducedMotion();
<motion.div 
  animate={prefersReduced ? { opacity: 1 } : { opacity: [0, 1], y: [20, 0] }}
  transition={prefersReduced ? { duration: 0 } : { duration: 0.6 }}
/>

// R3F
const prefersReduced = useReducedMotion();
useFrame(() => {
  if (!prefersReduced) {
    // Auto-rotate, particle animation
  }
});

// Hook (madhav/src/hooks/useReducedMotion.ts)
import { useMediaQuery } from '@mantine/hooks'; // or custom

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
```

---

### Step 11: TEST FOR JANK

**Test Protocol**:

```bash
# 1. DevTools Performance — 5x CPU throttle, 3G network
# Record: Page load → scroll → interact → scroll back
# Metrics:
#   - Frame rate: Consistent 60fps (green bars)
#   - Long tasks: < 50ms (no red triangles)
#   - Layout shifts: 0 during animations
#   - Main thread: < 4ms/frame JS

# 2. Lighthouse Performance
npx lighthouse http://localhost:3000 --only-categories=performance

# 3. Animation-specific
# DevTools > Animations panel:
#   - All animations on composite layer (green)
#   - No "Layout" or "Paint" badges
#   - Duration matches spec

# 4. Mobile testing
# Chrome DevTools > Device toolbar > iPhone 15 Pro
# 5x CPU throttle + 3G throttle
# Touch interactions, scroll performance

# 5. Reduced motion testing
# DevTools > Rendering > Emulate prefers-reduced-motion
# Verify: instant transitions, no parallax, no auto-rotate
```

**Automated Test** (add to CI):
```typescript
// tests/animation-performance.test.ts
import { test, expect } from '@playwright/test';

test('animations maintain 60fps on scroll', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    return new Promise(resolve => {
      const frames: number[] = [];
      let lastTime = performance.now();
      
      function measure(time: number) {
        frames.push(time - lastTime);
        lastTime = time;
        if (frames.length < 300) requestAnimationFrame(measure);
        else resolve(frames);
      }
      requestAnimationFrame(measure);
    });
  });
  
  // Scroll and measure
  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(3000);
  
  const frames = await page.evaluate(() => window.__frameTimes);
  const avgFrameTime = frames.reduce((a, b) => a + b) / frames.length;
  
  expect(avgFrameTime).toBeLessThan(16.67); // 60fps
});
```

---

### Step 12: REMOVE ANIMATIONS THAT DON'T IMPROVE UX

**Audit Criteria** — Remove if:
- [ ] No measurable improvement in task completion (A/B test or heuristic)
- [ ] Increases cognitive load (distracting, confusing)
- [ ] Causes performance issues (jank, layout shift, battery drain)
- [ ] Duplicates browser native behavior (scroll, focus)
- [ ] Purely decorative with no functional purpose
- [ ] Fails reduced-motion test (can't be made accessible)
- [ ] Not tested on real devices (assumed desktop-only)

**Review Process**:
1. List all animations on page
2. For each: state **purpose** and **metric improved**
3. If no clear purpose → remove
4. If purpose unclear → A/B test or remove
5. Document removed animations + rationale in `ANIMATION_DECISIONS.md`

**Common Removals**:
- Page load spinners when skeleton screens work better
- Hover animations on mobile-only elements
- Parallax that causes motion sickness
- Complex 3D that loads slowly on 3G
- Stagger delays > 300ms total (perceived as slow)
- Auto-playing carousels (use manual controls)

---

## Output Files

| File | Purpose |
|------|---------|
| `ANIMATION_AUDIT_<page>.md` | Current state + opportunities |
| `ANIMATION_PLAN_<page>.md` | Prioritized animations + rationale |
| `ANIMATION_DECISIONS.md` | Kept/removed + reasoning |
| Updated `madhav/src/themes/animations.ts` | Extended token system |
| Updated `madhav/src/styles/animations.css` | CSS utilities |
| Updated `madhav/src/lib/animations/gsap.ts` | GSAP utilities |
| Updated page/section components | Implemented animations |

---

## Integration with Project

**Extends existing**:
- `madhav/src/themes/animations.ts` — tokens
- `madhav/src/components/ui/Animated/` — reusable motion primitives
- `madhav/src/components/canvas/` — 3D scenes
- `madhav/src/hooks/useReducedMotion.ts` — a11y hook
- `madhav/src/lib/animations/` — GSAP/Framer utilities

**No new dependencies** — Uses installed: `framer-motion`, `gsap`, `lenis`, `@react-three/fiber`, `@react-three/drei`, `split-type`

---

## Example Session

```
$ /animate

🔍 INSPECTING: madhav/src/app/page.tsx (Home)
   ├─ Hero: Static image, h1, CTA button
   ├─ Features: 3-column grid, no animation
   ├─ Portfolio: 6 cards, static
   ├─ Testimonials: Carousel (JS, no motion)
   ├─ CTA Section: Static
   └─ Footer: Static

📊 AUDIT: 47 interactive elements, 12 sections, 0 animations
   Performance budget: 150KB JS (current: 87KB), 60fps target

🎯 OPPORTUNITIES (prioritized):
   1. Hero entrance (orient) — CSS view-timeline [HIGH]
   2. Feature cards stagger (hierarchy) — Framer variants [HIGH]
   3. Portfolio hover (feedback) — CSS transition [HIGH]
   4. Testimonials scroll-snap (explore) — GSAP ScrollTrigger [MEDIUM]
   5. CTA magnetic button (delight) — GSAP quickTo [LOW]
   6. Hero 3D background (brand) — R3F shader [LOW - budget check]

📝 PLAN: ANIMATION_PLAN_page.md created

✅ IMPLEMENTING...
   [1] Hero: CSS fade-in-up + view-timeline parallax (2KB CSS)
   [2] Features: Framer staggerContainer + staggerItem (reuse)
   [3] Portfolio: CSS transform hover + focus-visible
   [4] Testimonials: GSAP horizontal scroll + snap
   [5] CTA: GSAP magneticButton (optional)
   [6] Hero 3D: DEFERRED — budget exceeded, use CSS gradient

🔧 OPTIMIZING...
   - All transforms GPU-only
   - will-change managed
   - Reduced motion: instant fallbacks added
   - Mobile: hover→active, parallax disabled

🧪 TESTING...
   ✓ 60fps on 5x CPU + 3G throttle
   ✓ 0 layout shifts
   ✓ Lighthouse Perf: 96 → 94 (acceptable)
   ✓ Reduced motion: all instant
   ✓ Mobile: touch targets 44px, native scroll

📋 DECISIONS: ANIMATION_DECISIONS.md
   Kept: 5/6 (Hero 3D deferred to Phase 8)
   Removed: 0

➡️ Done. Page now has meaningful, performant motion.
```

---

## Configuration

**File**: `.opencode/animate-config.json`
```json
{
  "projectRoot": "madhav",
  "defaultPage": "page.tsx",
  "tools": {
    "css": "primary",
    "framer": "orchestration",
    "gsap": "scroll-sequencing",
    "r3f": "3d-only"
  },
  "budgets": {
    "jsIncreaseKB": 5,
    "cssIncreaseKB": 2,
    "targetFPS": 60,
    "cpuThrottle": 5
  },
  "requireReducedMotion": true,
  "mobileFirst": true,
  "removeUseless": true
}
```