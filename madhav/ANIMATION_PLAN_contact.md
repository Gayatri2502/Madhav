# Animation Plan: Contact Page

## Prioritized Animations with Rationale

### 1. Hero Entrance Sequence (Priority: HIGH)
**Trigger:** Page load
**Elements:** Badge → H1 → Paragraph (staggered)
**Technique:** CSS `@keyframes` + `animation-timeline: view()` for scroll-reveal, or simple load animation
**Duration:** 600ms total (badge: 200ms, h1: 200ms delay, paragraph: 400ms delay)
**Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material expressive)
**Movement:** `translateY(24px) → 0`, `opacity: 0 → 1`
**Purpose:** Orient user immediately, establish hierarchy
**Performance:** GPU-only (transform + opacity), ~0.5KB CSS
**Mobile:** Same timing, respects prefers-reduced-motion
**Reduced Motion:** Instant (duration: 0.01ms)

### 2. Contact Info Card Entrance (Priority: HIGH)
**Trigger:** Page load (when in viewport)
**Element:** Entire Card.Root
**Technique:** Framer Motion `variants` with `whileInView`
**Duration:** 500ms
**Easing:** `expo.out` via Framer
**Movement:** `y: 30 → 0`, `opacity: 0 → 1`
**Purpose:** Draw attention to contact methods
**Performance:** Framer Motion ~12KB (shared), GPU transform
**Mobile:** Same
**Reduced Motion:** Instant

### 3. Contact Info Items Stagger (Priority: HIGH)
**Trigger:** Card entrance complete
**Elements:** 4 contact items (map-pin, phone, mail, clock)
**Technique:** Framer `staggerChildren: 0.08`
**Duration:** 300ms per item
**Easing:** `back.out(1.2)` for playful icon pop
**Movement:** `x: -20 → 0`, `opacity: 0 → 1` + icon `scale: 0.8 → 1`
**Purpose:** Guide eye through contact options
**Performance:** Minimal
**Mobile:** Same stagger
**Reduced Motion:** Instant, no stagger

### 4. Form Card Entrance (Priority: HIGH)
**Trigger:** Page load (when in viewport)
**Element:** Form Card.Root
**Technique:** Framer Motion `variants` with `whileInView`
**Duration:** 500ms
**Easing:** `expo.out`
**Movement:** `y: 30 → 0`, `opacity: 0 → 1`
**Purpose:** Signal primary action area
**Mobile:** Same
**Reduced Motion:** Instant

### 5. Form Field Focus/Validation (Priority: HIGH)
**Trigger:** User interaction (focus, blur, error)
**Elements:** All 7 InputField, Select, TextArea
**Technique:** CSS `transition` on wrapper
**Duration:** 200ms
**Easing:** `cubic-bezier(0.33, 0.66, 0.66, 1)` (snappy)
**Focus Movement:** `border-color`, `box-shadow` (ring), `translateY(-2px)`
**Error Movement:** `animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)`
**Purpose:** Immediate feedback, reduce errors
**Performance:** CSS-only, zero JS
**Mobile:** `:focus-visible` for keyboard, `:active` for touch
**Reduced Motion:** Instant color change, no transform

### 6. Submit Button States (Priority: HIGH)
**Trigger:** Hover, press, loading, disabled
**Element:** Primary Submit Button
**Technique:** CSS transitions + Framer `whileHover`/`whileTap`/`animate`
**States:**
- Hover: `translateY(-2px)`, `box-shadow` elevation
- Press: `scale(0.98)`, instant
- Loading: Spinner + width lock, pulse opacity
- Disabled: `opacity: 0.5`, `cursor: not-allowed`
**Duration:** Hover 200ms, Press 50ms, Loading continuous
**Purpose:** Clear affordance, prevent double-submit
**Performance:** CSS + Framer (shared)
**Mobile:** `:active` for press, no hover
**Reduced Motion:** Color change only

### 7. Form Success State Entrance (Priority: HIGH)
**Trigger:** Submit completes (state change)
**Element:** Success Card (replaces form)
**Technique:** Framer `AnimatePresence` + `motion.div` with `initial`/`animate`/`exit`
**Duration:** 400ms enter, 300ms exit
**Easing:** `expo.out` / `expo.in`
**Enter Movement:** `scale: 0.9 → 1`, `opacity: 0 → 1`, `y: 20 → 0`
**Exit Movement:** `scale: 1 → 0.9`, `opacity: 1 → 0`, `y: 0 → -20`
**Purpose:** Celebrate completion, clear feedback
**Performance:** Framer AnimatePresence
**Mobile:** Same
**Reduced Motion:** Instant swap

### 8. FAQ Accordion Smooth Transitions (Priority: HIGH)
**Trigger:** Click accordion trigger
**Elements:** 6 Accordion.Item content areas
**Technique:** CSS `grid-template-rows` + Framer `animateHeight` or native `details/summary` with CSS
**Duration:** 300ms
**Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`
**Movement:** Height `0 → auto`, `opacity: 0 → 1`
**Purpose:** Preserve context, smooth reading flow
**Performance:** CSS grid animation (GPU-friendly)
**Mobile:** Same
**Reduced Motion:** Instant height snap

### 9. FAQ Section Scroll Reveal (Priority: MEDIUM)
**Trigger:** Scroll into viewport (top 85%)
**Element:** FAQ section header + accordion list
**Technique:** GSAP ScrollTrigger + `createRevealTimeline`
**Duration:** 800ms staggered
**Easing:** `expo.out`
**Movement:** `y: 40 → 0`, `opacity: 0 → 1`, stagger 0.06
**Purpose:** Progressive disclosure, reduce initial overwhelm
**Performance:** GSAP ScrollTrigger ~8KB
**Mobile:** Simplified (no stagger, just fade-in)
**Reduced Motion:** Instant

### 10. Google Maps Button (Priority: MEDIUM)
**Trigger:** Hover/focus
**Element:** Outline Button in Card.Footer
**Technique:** CSS `transition`
**Duration:** 200ms
**Easing:** `cubic-bezier(0.33, 0.66, 0.66, 1)`
**Movement:** `translateY(-2px)`, `border-color`, `background: primary/5`
**Purpose:** Affordance for external link
**Mobile:** `:active` press state
**Reduced Motion:** Color only

---

## Implementation Order

1. **CSS Foundation** (animations.css) - Hero, fields, buttons, accordion
2. **Framer Motion** - Card entrances, stagger, success state, form fields
3. **GSAP ScrollTrigger** - FAQ section reveal
3. **Reduced Motion** - Global + per-component hooks
4. **Mobile Adjustments** - `@media (hover: none)` overrides

---

## Dependencies to Use

- **Existing:** `framer-motion` (installed), `gsap` (installed)
- **New CSS:** `madhav/src/styles/animations.css` (create)
- **Hooks:** `madhav/src/hooks/useReducedMotion.ts` (create if missing)
- **GSAP Utils:** `madhav/src/lib/animations/gsap.ts` (create)