# RUTHLESS DESIGN REVIEW FRAMEWORK

Apply after every implementation. Score each criterion 1-5. Anything < 4 must be fixed before ship.

---

## 1. CREATIVE DIRECTOR REVIEW
*Does this feel art-directed or template-generated?*

### Visual Hierarchy
- [ ] One clear focal point per viewport
- [ ] Headline dominates; subhead supports; CTA concludes
- [ ] No competing visual weights (two "loud" elements)
- [ ] Visual flow guides eye: Entry → Scan → Action

### Originality & Voice
- [ ] Zero generic stock sections (hero + 3 columns + testimonial carousel)
- [ ] Section structure serves the story, not convention
- [ ] Color/typography/motion feel custom to this brand
- [ ] Could this be any other company's site? If yes → fail

### Restraint
- [ ] No gradients where solid color works
- [ ] No glassmorphism without purpose (depth layering, not decoration)
- [ ] No animation that doesn't clarify or delight
- [ ] Whitespace used as active design tool, not default spacing

### Polish
- [ ] Pixel-perfect alignment (optical, not just mathematical)
- [ ] Consistent corner radius, shadow depth, border weight
- [ ] Images treated uniformly (same aspect, same treatment)
- [ ] Micro-copy refined (button labels, error states, empty states)

---

## 2. SENIOR UX DESIGNER REVIEW
*Does this serve the user's intent at every moment?*

### Clarity
- [ ] Value proposition understood in 3 seconds (5-second test)
- [ ] Every section answers a specific visitor question
- [ ] No jargon without definition
- [ ] Form fields: label + hint + validation + error = complete

### Flow & Friction
- [ ] Primary CTA visible without scroll on all breakpoints
- [ ] No dead ends (every page has forward path)
- [ ] Back navigation preserved (browser back works)
- [ ] Loading states for every async action

### Mobile UX
- [ ] Touch targets ≥ 44×44px (comfortably 48×48)
- [ ] No horizontal scroll ever
- [ ] Forms: native keyboards (email, tel, numeric)
- [ ] Sticky CTA on long pages (thumb zone)
- [ ] Gestures discovered, not required (swipe ≠ only way)

### Accessibility (WCAG AA Minimum)
- [ ] Semantic HTML: landmarks, headings, lists, buttons
- [ ] Color contrast: 4.5:1 text, 3:1 UI elements
- [ ] Focus visible: `:focus-visible` styled on ALL interactives
- [ ] Keyboard: Tab order logical, no traps, skip link
- [ ] Screen reader: ARIA only where HTML fails, `alt` meaningful
- [ ] Reduced motion: `prefers-reduced-motion` honored globally
- [ ] Zoom 200%: no content loss, no horizontal scroll

### Trust & Persuasion
- [ ] Social proof near claims it validates
- [ ] Risk reversal visible before final CTA (guarantee, cancel, trial)
- [ ] No dark patterns (hidden costs, forced continuity, misdirection)

---

## 3. SENIOR FRONTEND ENGINEER REVIEW
*Is the code maintainable, scalable, and correct?*

### Architecture
- [ ] Component hierarchy: Page → Section → Component → Primitive
- [ ] No component > 200 lines (split it)
- [ ] Props interface documented, minimal, typed
- [ ] No prop drilling (context or composition)
- [ ] Server/Client boundary intentional (Next.js: `'use client'` minimal)

### Code Quality
- [ ] Zero `any` types (strict TS)
- [ ] No duplicated logic (extract hooks/utils)
- [ ] No magic numbers (spacing, colors, durations → tokens)
- [ ] CSS: `@layer` organized, no `!important`, specificity flat
- [ ] No console.log, debugger, TODO in production code

### Performance Patterns
- [ ] Images: `next/image` or `<picture>` + WebP/AVIF, sized
- [ ] Fonts: `next/font` (self-hosted, preloaded, `display: swap`)
- [ ] Scripts: Third-party deferred, `partytown` or facade
- [ ] Bundle: Analyzed, no duplicate deps, tree-shaking works
- [ ] Dynamic imports for below-fold heavy sections

### Resilience
- [ ] Error boundaries on each major section
- [ ] Graceful degradation: JS off → content readable
- [ ] API: Loading, error, empty states handled
- [ ] Env vars validated at build (not runtime)

---

## 4. PERFORMANCE ENGINEER REVIEW
*Does this hit Core Web Vitals on real devices?*

### Metrics (Target → Measure on 4G / 5x CPU throttle)
| Metric | Target | Tool |
|--------|--------|------|
| LCP | < 2.5s | Lighthouse, WebPageTest |
| INP | < 200ms | CrUX, Lighthouse |
| CLS | 0 | Lighthouse, DevTools |
| TTFB | < 800ms | WebPageTest |
| Total Blocking Time | < 200ms | Lighthouse |

### Asset Budget
- [ ] HTML < 30KB gzipped
- [ ] Critical CSS < 14KB (inline)
- [ ] JS (initial) < 150KB gzipped
- [ ] Total page weight < 1.5MB
- [ ] Fonts < 100KB (woff2, subset)
- [ ] Images: Hero < 100KB, others < 50KB each

### Runtime
- [ ] 60fps scroll (no layout thrashing, `will-change` used)
- [ ] No long tasks > 50ms (Performance tab)
- [ ] Memory stable (no leaks on SPA nav)
- [ ] GPU: Layers < 20, no unnecessary `transform3d`

### Optimization Checklist
- [ ] Preconnect critical origins (fonts, API, CDN)
- [ ] Preload LCP image + critical font
- [ ] `fetchpriority="high"` on hero assets
- [ ] Service worker for offline + caching
- [ ] Compression: Brotli + Gzip
- [ ] HTTP/2 or 3 enabled

---

## 5. END USER REVIEW
*Would I use this? Would I trust this?*

### First Impression (3 seconds)
- [ ] "What is this?" answered instantly
- [ ] "Is this for me?" answered by headline + visual
- [ ] "Can I trust this?" answered by proof signals

### Task Completion
- [ ] Primary task (signup, demo, purchase) completed in ≤ 3 clicks
- [ ] No confusion at any step ("What does this button do?")
- [ ] Errors explain *how to fix*, not just what failed
- [ ] Success state confirms value ("You're in! Here's what happens next")

### Emotional Resonance
- [ ] Moments of delight (micro-interaction, smart empty state, easter egg)
- [ ] No frustration (rage clicks, dead ends, slow feedback)
- [ ] Personality shows in copy, motion, details
- [ ] Feels human, not corporate

### Return Intent
- [ ] Bookmarkable / shareable URLs (no hash-only routes)
- [ ] Clear way to continue later (save, email, account)
- [ ] Follow-up path obvious (docs, community, support)

---

## SCORING & ACTION

| Score | Action |
|-------|--------|
| 5 | Ship it |
| 4 | Minor polish (fix in < 1hr) |
| 3 | Significant fix required (block deploy) |
| 2 | Major rework (revisit architecture/design) |
| 1 | Failed — restart section |

### Review Process
1. **Self-review**: Score all 5 perspectives. Document every < 4.
2. **Fix highest-impact first**: Hierarchy → Accessibility → Performance → Polish
3. **Re-score** after fixes.
4. **Peer review**: Another designer/engineer runs same framework.
5. **Only deploy when all ≥ 4**.

---

## COMMON FAILURE PATTERNS (Quick Scan)

| Pattern | Perspective | Fix |
|---------|-------------|-----|
| Two CTAs same weight | Creative Director | Demote one to ghost |
| Hero headline > 10 words | UX | Cut ruthlessly |
| `div` used as button | UX/Engineer | `<button>` + styles |
| Layout shift on font load | Performance | `font-display: swap` + size-adjust |
| Animation on scroll every 100px | Creative/Performance | Reduce frequency, increase meaning |
| Glass card on glass background | Creative | Remove one layer |
| Mobile menu = desktop hidden | UX | Design mobile-first nav |
| 500KB hero PNG | Performance | WebP/AVIF, proper dimensions |
| No focus styles | UX | Add `:focus-visible` global |
| `any` in component props | Engineer | Define proper interface |

---

## REVIEW TEMPLATE (Copy per project)

```markdown
# PROJECT: [Name] — REVIEW [Date]

## SCORES
- Creative Director: ___/5
- Senior UX Designer: ___/5
- Senior Frontend Engineer: ___/5
- Performance Engineer: ___/5
- End User: ___/5

## CRITICAL FAILURES (Score < 4)
1. [Perspective] — [Criterion] — [Evidence] → [Fix Plan]
2. ...

## FIX LOG
- [ ] [Fix] → Verified by [Perspective] → Score now ___

## DEPLOY DECISION
☐ All ≥ 4 → Deploy
☐ Blocked → Re-review after fixes
```

---

## REMINDER

> A functional website is the starting point.
> A polished website is the objective.
> 
> If you wouldn't put your name on it as a portfolio piece, it's not done.