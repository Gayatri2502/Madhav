# /premium-site — Transform to Premium Production Website

## Purpose
A systematic, phase-gated transformation of the Madhav project into a premium, production-quality website. Each phase has clear entry/exit criteria, quality gates, and delivers measurable improvements. No generic templates — decisions derive from your brand, content, and users.

---

## Command Interface

```
/premium-site                    # Run full transformation (interactive phases)
/premium-site --phase <name>     # Run specific phase only
/premium-site --audit            # Audit only, no changes
/premium-site --resume           # Resume from last completed phase
/premium-site --status           # Show phase completion status
/premium-site --reset            # Clear phase progress
```

---

## Phase Architecture

### Phase 0: AUDIT (Baseline)
**Goal**: Establish measurable baseline across all quality dimensions.

**Inputs**: Current codebase, analytics (if any), stakeholder goals

**Outputs**: `AUDIT_REPORT.md` with scores and specific findings

**Checks**:
| Dimension | Tool/Method | Target |
|-----------|-------------|--------|
| Performance | Lighthouse (lab), CrUX (field) | LCP < 2.5s, TBT < 200ms, CLS < 0.1 |
| Accessibility | axe-core, manual keyboard/screen reader | 0 violations, WCAG 2.1 AA |
| SEO | Lighthouse SEO, manual audit | 100/100, valid schema.org |
| Code Quality | TypeScript strict, ESLint, bundle analyzer | 0 errors, < 150KB JS gzipped |
| Visual Quality | Design token audit, spacing rhythm, hierarchy | Consistent scale, 4px baseline |
| UX/Usability | Heuristic evaluation, task completion | Clear hierarchy, obvious actions |
| Content | Content inventory, readability, hierarchy | Semantic HTML, scannable structure |
| Technical | Core Web Vitals, security headers, caching | HSTS, CSP, optimal cache headers |

**Deliverable**: `AUDIT_REPORT.md` + `BASELINE_METRICS.json`

---

### Phase 1: INFORMATION ARCHITECTURE
**Goal**: Structure content for clarity, findability, and business goals.

**Activities**:
1. Content inventory → `CONTENT_INVENTORY.csv`
2. User flows mapping (primary/secondary tasks)
3. Sitemap redesign with clear hierarchy
4. Navigation architecture (global, local, contextual)
5. URL structure optimization
6. Content prioritization per page (core vs supporting)

**Decisions**:
- Page types and templates needed
- Navigation patterns (mega-menu, sidebar, tabs)
- Content blocks per template
- Cross-linking strategy

**Quality Gate**: Stakeholder sign-off on sitemap + user flows

**Deliverable**: `IA_SITEMAP.md`, `USER_FLOWS.md`, `PAGE_TEMPLATES.md`

---

### Phase 2: VISUAL DIRECTION
**Goal**: Define cohesive visual language aligned with brand.

**Activities**:
1. Brand attribute definition (3-5 keywords: e.g., "precision, depth, warmth")
2. Moodboard with rationale (not decoration — each image maps to attribute)
3. Competitive visual audit (differentiation opportunities)
4. Art direction for key pages (hero, product, case study)
5. Photography/illustration/3D style guide
6. Motion personality (playful, precise, organic, mechanical)

**Outputs**: Design direction document with:
- Color direction (not final palette — mood + rationale)
- Typography direction (font pairing rationale, hierarchy concept)
- Imagery treatment (tone, composition, color grading)
- Motion principles (easing personality, timing scale)
- 3D/visual effects role (background, hero, interactive)

**Quality Gate**: Visual direction approved before design system

**Deliverable**: `VISUAL_DIRECTION.md` with moodboards + rationale

---

### Phase 3: DESIGN SYSTEM
**Goal**: Codify visual language into reusable, enforceable tokens and patterns.

**Token Structure** (in `madhav/src/themes/`):
```
tokens/
├── color/
│   ├── primitive/     # Raw values (blue-500: #3b82f6)
│   ├── semantic/      # Meaning-based (primary, surface, text-muted)
│   └── component/     # Component-specific (button-primary-bg)
├── typography/
│   ├── font-families/ # Display, UI, mono
│   ├── type-scale/    # Fluid clamp() values per breakpoint
│   ├── line-height/   # Tight, normal, relaxed
│   └── letter-spacing/
├── spacing/
│   ├── scale/         # 4px base: 1-24 + custom
│   ├── layout/        # Container, section, component gaps
│   └── inset/         # Component padding presets
├── sizing/
│   ├── container/     # Max-widths
│   ├── icon/          # 16, 20, 24, 32
│   └── border-radius/
├── elevation/
│   ├── shadow/        # Layered shadow system
│   └── blur/          # Backdrop filter values
├── motion/
│   ├── duration/      # 100-1000ms scale
│   ├── easing/        # Custom cubic-beziers per personality
│   └── stagger/       # Index-based delays
├── breakpoints/       # Container queries + viewport
├── z-index/           # Layered scale
└── opacity/           # Disabled, overlay, subtle
```

**Component Primitives** (in `madhav/src/components/ui/`):
- Button (variants, sizes, states, loading, icon positions)
- Input/Select/Textarea (label, error, hint, character count)
- Card (media, content, actions, variants)
- Heading/Text (semantic, responsive, gradient text)
- Image (responsive, blur placeholder, aspect ratios)
- Link (inline, standalone, external indicator)
- Badge/Tag (status, category, count)
- Separator/Divider
- Tooltip/Popover (accessible, positioned)
- Modal/Dialog (focus trap, scroll lock, sizes)
- Dropdown/Select (searchable, multi-select)
- Table (sortable, paginated, responsive)
- Tabs/Accordion (keyboard nav, animated)
- Avatar (fallback, status indicator, group)
- Breadcrumbs (collapsible, separators)
- Pagination (ellipsis, ARIA)

**Patterns** (in `madhav/src/components/patterns/`):
- Section (container, background, padding variants)
- Grid/List (responsive, masonry, virtualized)
- Hero (variants: centered, split, asymmetric, 3D)
- Footer (link groups, newsletter, legal)
- Navbar (sticky, mega-menu, search, user menu)
- Sidebar (collapsible, nested, mobile drawer)
- Breadcrumb (dynamic, structured data)
- Pagination/Load More/Infinite Scroll

**Quality Gate**: 
- All tokens documented with usage examples
- Component playground (Storybook or local)
- Design token JSON export for Figma sync
- TypeScript types for all tokens

**Deliverable**: `DESIGN_SYSTEM.md` + token files + component library

---

### Phase 4: COMPONENT ARCHITECTURE
**Goal**: Build production-ready component library with consistent APIs.

**Standards**:
```typescript
// Every component follows this pattern
interface ComponentProps {
  // Variant: single source of truth for visual variants
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  // State: mutually exclusive
  disabled?: boolean;
  loading?: boolean;
  // Polymorphism: render as different element
  as?: 'button' | 'a' | 'div';
  // Composition: slots for complex components
  children?: React.ReactNode;
  // Forward ref for composition
  ref?: React.Ref<HTMLButtonElement>;
  // ClassName for overrides (last resort)
  className?: string;
}
```

**Architecture**:
- `ui/` — Primitive, unstyled (or minimally styled) components
- `patterns/` — Composed patterns using primitives
- `sections/` — Page-level composed sections
- `canvas/` — 3D/WebGL components (R3F)
- `layout/` — Layout primitives (Container, Grid, Stack, Cluster)

**Rules**:
- No duplicate styles — use design tokens
- No magic numbers — use spacing/sizing tokens
- Compound components for complex UI (Select + Option + Group)
- Render props / slots for flexibility
- Full TypeScript with discriminated unions for variants
- Storybook stories for each variant/state
- Visual regression tests (Chromatic or local)

**Quality Gate**: 
- 100% component coverage in Storybook
- All interactive states documented
- Accessibility tested per component
- Bundle size per component tracked

**Deliverable**: Component library in `madhav/src/components/` + Storybook

---

### Phase 5: IMPLEMENTATION
**Goal**: Rebuild pages using design system components — no raw HTML/CSS in pages.

**Process per page**:
1. Map page to template from Phase 1
2. Decompose into sections from Phase 4
3. Assemble from patterns → components → tokens
4. Zero custom styles in page files
5. Data fetching in Server Components, interactivity in Client Components
6. Strict TypeScript — no `any`, proper generics

**Page Structure**:
```
app/
├── (marketing)/
│   ├── layout.tsx          # Providers: Theme, Lenis, Analytics
│   ├── page.tsx            # Home: Hero + 3-5 sections
│   ├── about/page.tsx      # About template
│   ├── work/
│   │   ├── page.tsx        # Work index (grid + filters)
│   │   └── [slug]/page.tsx # Case study template
│   ├── services/page.tsx   # Services template
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx # Product detail with 3D viewer
│   └── contact/page.tsx    # Contact template
├── components/
│   ├── providers/          # ThemeProvider, LenisProvider, etc.
│   └── [shared]/
└── lib/                    # Utilities, data fetching, helpers
```

**Content Management**:
- MDX for content-heavy pages (case studies, articles)
- Structured data (JSON) for repeatable content (services, products)
- CMS-ready: all content in `content/` or external CMS
- Image optimization: Next.js Image with blur placeholders

**Quality Gate**:
- Every page uses only design system components
- No inline styles, no arbitrary values in Tailwind
- All images optimized (WebP/AVIF, responsive sizes)
- Server Components by default, Client Components only when needed

**Deliverable**: Rebuilt `madhav/src/app/` with component-only pages

---

### Phase 6: RESPONSIVE DESIGN
**Goal**: Flawless experience at every viewport — container-first, not breakpoint-first.

**Approach**:
1. **Container Queries First**: Components respond to parent width
2. **Fluid Everything**: Typography, spacing, sizing via `clamp()`
3. **Breakpoint Tokens**: Only 3-4 semantic breakpoints (mobile, tablet, desktop, wide)
4. **Component Variants**: Different layouts at different container sizes

**Implementation**:
```css
/* Container query example */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { grid-template-columns: 1fr 1fr; }
}

/* Fluid typography from tokens */
.heading-1 {
  font-size: var(--text-4xl-fluid); /* clamp(2.5rem, 5vw, 4rem) */
}
```

**Testing Matrix**:
| Viewport | Width | Device Class |
|----------|-------|--------------|
| Mobile S | 320px | Small phone |
| Mobile M | 375px | Standard phone |
| Mobile L | 430px | Large phone |
| Tablet P | 768px | Tablet portrait |
| Tablet L | 1024px | Tablet landscape |
| Desktop | 1440px | Laptop |
| Wide | 1920px | Desktop monitor |
| Ultra | 2560px | Large desktop |

**Checks per breakpoint**:
- [ ] No horizontal overflow
- [ ] Touch targets ≥ 44×44px
- [ ] Text readable (min 16px body)
- [ ] Navigation usable
- [ ] Images sharp (correct srcset)
- [ ] 3D/Canvas scales appropriately
- [ ] Performance acceptable

**Quality Gate**: Visual regression tests at all 8 viewports

**Deliverable**: `RESPONSIVE_SPEC.md` + updated components

---

### Phase 7: MICRO-INTERACTIONS
**Goal**: Purposeful, performant feedback at every interaction point.

**Inventory** (every interactive element):
| Element | States | Transition | Reduced Motion |
|---------|--------|------------|----------------|
| Buttons | hover, active, focus, disabled, loading | 150ms ease-out-expo | Instant |
| Links | hover, focus, active, visited | 100ms ease-out | Instant |
| Inputs | focus, error, success, disabled | 150ms ease-out | Instant |
| Cards | hover, focus-within | 200ms ease-out-expo | No transform |
| Dropdowns | open, close, selection | 200ms spring | Fade only |
| Modals | enter, exit, backdrop | 300ms spring | Fade + scale |
| Tabs | switch, indicator | 250ms ease-out-expo | Instant |
| Navigation | hover, active, mobile toggle | 200ms ease-out | Instant |

**Implementation Rules**:
- CSS transitions for simple state changes (hover, focus)
- Framer Motion for complex orchestration (modals, drawers, page transitions)
- GSAP for scroll-linked or timeline-based (hero parallax, stagger reveals)
- **Never** animate layout-triggering properties (width, height, top, left)
- **Only** transform, opacity, filter, clip-path
- `will-change` set during animation, removed after
- Respect `prefers-reduced-motion: reduce` — instant or no animation

**Hover/Touch Parity**:
- Touch: active state = hover equivalent
- No hover-only functionality
- Focus visible always (keyboard + touch)

**Quality Gate**:
- 60fps on 5x CPU throttle for all interactions
- Zero layout shift during interactions
- axe-core passes on all interactive states
- Documented in Storybook with interaction tests

**Deliverable**: Updated components + `MICRO_INTERACTIONS.md`

---

### Phase 8: ADVANCED MOTION
**Goal**: Meaningful motion that guides, delights, and performs.

**Motion Categories**:

| Category | Purpose | Tools | Budget |
|----------|---------|-------|--------|
| **Entrance** | Reveal content on load/scroll | Framer Motion, CSS view-timeline | < 300ms |
| **Scroll-Linked** | Parallax, progress, pin | GSAP ScrollTrigger, Lenis | 60fps scrub |
| **Navigation** | Page transitions, shared elements | Framer Motion AnimatePresence | < 400ms |
| **Feedback** | Click ripple, form submit, toggle | CSS, Framer Motion | < 150ms |
| **Ambient** | Hero 3D, particle backgrounds | R3F, Canvas, Shaders | 60fps idle |
| **Data** | Charts, counters, loading states | Framer Motion, CSS | < 500ms |

**Implementation Standards**:
- **Entrance**: `variants` in Framer Motion, stagger children
- **Scroll**: Lenis + ScrollTrigger, `scrub: 0.5-1` for smoothness
- **Page Transitions**: Shared `layoutId` for hero images/headlines
- **3D Hero**: R3F Canvas fixed, camera on scroll progress
- **Reduced Motion**: `prefers-reduced-motion` → disable Lenis, instant transitions, static 3D

**Performance**:
- `will-change: transform, opacity` on animated elements
- `contain: layout paint` on animation containers
- GPU-only properties (transform, opacity, filter)
- Lazy-load heavy motion (3D, particles) with IntersectionObserver
- Pause animations when tab hidden

**Quality Gate**:
- Lighthouse Performance ≥ 95
- 60fps scroll on 5x CPU throttle
- CLS = 0 during all animations
- Total animation JS < 30KB gzipped

**Deliverable**: Motion components + `MOTION_SPEC.md`

---

### Phase 9: PERFORMANCE
**Goal**: Meet or exceed Core Web Vitals thresholds on real devices.

**Budgets**:
| Metric | Target | Tool |
|--------|--------|------|
| LCP | < 2.5s | Lighthouse, CrUX |
| INP | < 200ms | Lighthouse, CrUX |
| CLS | < 0.1 | Lighthouse, CrUX |
| TTI | < 3.5s | Lighthouse |
| TBT | < 200ms | Lighthouse |
| JS Bundle | < 150KB gzipped | Bundle analyzer |
| CSS Bundle | < 50KB gzipped | Bundle analyzer |
| Fonts | < 100KB (woff2, subset) | Network tab |
| Images | WebP/AVIF, responsive | Lighthouse |
| 3D Assets | < 500KB initial (Draco+KTX2) | Network tab |

**Optimization Checklist**:
- [ ] Next.js: `output: 'standalone'`, `swcMinify: true`
- [ ] Fonts: `next/font` with `preload`, `display: swap`, subset
- [ ] Images: `next/image` with `sizes`, `placeholder: blur`, WebP/AVIF
- [ ] Code splitting: Dynamic imports for heavy sections (3D, charts)
- [ ] Tree shaking: No barrel exports, side-effect-free modules
- [ ] Caching: Static assets 1yr, HTML no-cache, API stale-while-revalidate
- [ ] Compression: Brotli + Gzip (Vercel/Netlify auto)
- [ ] Preload: Critical CSS, hero image, key fonts
- [ ] Third-party: Defer, `partytown` for analytics, self-host fonts
- [ ] 3D: DRACO + KTX2, instancing, frustum culling, LOD
- [ ] R3F: `frameloop="demand"`, `useFrame` only when needed
- [ ] Service Worker: Workbox for offline, precache critical

**Monitoring**:
- Lighthouse CI in GitHub Actions
- Vercel Analytics / CrUX dashboard
- `web-vitals` library for custom metrics
- Bundle analyzer in CI (`@next/bundle-analyzer`)

**Quality Gate**: All budgets met on 5x CPU throttle + 3G throttling

**Deliverable**: `PERFORMANCE_REPORT.md` + budgets in `PERFORMANCE_BUDGET.json`

---

### Phase 10: ACCESSIBILITY
**Goal**: WCAG 2.1 AA compliance — usable by everyone.

**Checklist**:

**Semantic HTML**:
- [ ] Proper heading hierarchy (h1-h6, no skips)
- [ ] Landmarks: header, nav, main, aside, footer
- [ ] Lists for grouped items (nav, cards, breadcrumbs)
- [ ] `<button>` for actions, `<a>` for navigation
- [ ] `<form>`, `<fieldset>`, `<legend>`, `<label>` associations

**Keyboard**:
- [ ] All interactive elements reachable and operable
- [ ] Focus visible (`:focus-visible` styled, not removed)
- [ ] Logical tab order (DOM order = visual order)
- [ ] Skip links for main content
- [ ] Focus trap in modals/drawers
- [ ] Escape closes overlays
- [ ] No keyboard traps

**Screen Reader**:
- [ ] ARIA labels where visual label absent
- [ ] `aria-describedby` for errors/hints
- [ ] Live regions for dynamic updates (toasts, loading)
- [ ] `aria-hidden` on decorative icons
- [ ] Proper roles (dialog, menu, tablist, etc.)
- [ ] Images: `alt` text (descriptive, not "image of")

**Color & Contrast**:
- [ ] Text: 4.5:1 (AA), 3:1 (large text)
- [ ] UI components: 3:1 (borders, icons, focus indicators)
- [ ] No color-only information (icons + text, patterns)
- [ ] Dark mode: all contrasts maintained

**Motion**:
- [ ] `prefers-reduced-motion` respected globally
- [ ] No auto-playing animation > 5s without pause
- [ ] No flashing > 3Hz

**Forms**:
- [ ] Required indicators (visual + `aria-required`)
- [ ] Error messages linked (`aria-describedby`)
- [ ] Error prevention (confirmation, review)
- [ ] Autocomplete attributes

**Testing**:
- axe-core: 0 violations
- Lighthouse Accessibility: 100
- Manual: NVDA (Windows) + VoiceOver (Mac)
- Keyboard-only navigation test
- Zoom 200%: no content loss, no horizontal scroll

**Quality Gate**: 0 axe violations, 100 Lighthouse, manual test pass

**Deliverable**: `ACCESSIBILITY_AUDIT.md` + fixes

---

### Phase 11: SEO
**Goal**: Maximum discoverability and rich search presence.

**Technical SEO**:
- [ ] Valid HTML5 (validator.w3.org)
- [ ] Unique, descriptive `<title>` per page (50-60 chars)
- [ ] Meta description per page (150-160 chars)
- [ ] Canonical URLs
- [ ] `robots.txt` + `sitemap.xml` (auto-generated)
- [ ] `hreflang` if multilingual
- [ ] No index/no follow on staging

**Structured Data** (JSON-LD):
- [ ] Organization (logo, social, contact)
- [ ] WebSite (search action)
- [ ] BreadcrumbList on all deep pages
- [ ] Article/CaseStudy for work pages
- [ ] Product for product pages (price, availability, review)
- [ ] Service for services pages
- [ ] FAQPage where applicable
- [ ] VideoObject for video content

**Content SEO**:
- [ ] One H1 per page, matches title
- [ ] H2/H3 hierarchy reflects content structure
- [ ] Descriptive link text (no "click here")
- [ ] Image `alt` attributes (keyword-relevant)
- [ ] Internal linking (contextual, 3-5 per page)
- [ ] Readable URLs (`/services/web-development` not `/services/123`)

**Performance SEO**:
- [ ] Core Web Vitals passing
- [ ] Mobile-friendly (Lighthouse)
- [ ] No intrusive interstitials
- [ ] HTTPS, HSTS, secure headers

**Social/Sharing**:
- [ ] Open Graph (title, description, image, type)
- [ ] Twitter Card (summary_large_image)
- [ ] Favicon set (including mask-icon, apple-touch-icon)

**Quality Gate**: Lighthouse SEO 100, Rich Results Test passes, valid sitemap

**Deliverable**: `SEO_AUDIT.md` + structured data components

---

### Phase 12: FINAL QA
**Goal**: Production release confidence.

**Pre-Launch Checklist**:

**Functional**:
- [ ] All forms submit successfully
- [ ] All links work (internal + external)
- [ ] 404 page friendly + search
- [ ] 500 page friendly + contact
- [ ] Search works (if applicable)
- [ ] Auth flows (if applicable)
- [ ] Cart/checkout (if e-commerce)

**Cross-Browser**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest + iOS)
- [ ] Edge (latest)
- [ ] Safari iOS (real device)

**Cross-Device**:
- [ ] iPhone SE (375px)
- [ ] iPhone 15 Pro (393px)
- [ ] iPad (768px/1024px)
- [ ] Desktop 1440px/1920px
- [ ] 5x CPU throttle + 3G throttle

**Analytics/Monitoring**:
- [ ] Vercel Analytics / GA4 configured
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (web-vitals)
- [ ] Uptime monitoring

**Security**:
- [ ] CSP headers (strict)
- [ ] HSTS
- [ ] X-Frame-Options
- [ ] Referrer-Policy
- [ ] Permissions-Policy
- [ ] No secrets in client bundle
- [ ] Dependency audit (`npm audit`)

**Content**:
- [ ] No placeholder text
- [ ] All images have alt text
- [ ] Legal pages (privacy, terms, cookie policy)
- [ ] Contact info correct

**Deployment**:
- [ ] Preview deployment tested
- [ ] Production deployment verified
- [ ] DNS/SSL verified
- [ ] Cache headers verified
- [ ] Redirects tested (www → non-www, trailing slashes)

**Sign-off**: Stakeholder approval on staging

**Deliverable**: `QA_REPORT.md` + `RELEASE_CHECKLIST.md`

---

## Execution Rules

### Do Not
- ❌ Rewrite functioning code without clear improvement
- ❌ Add libraries not justified by audit findings
- ❌ Use generic "premium" patterns (gradients, glassmorphism, etc.) without brand rationale
- ❌ Skip phases — each builds on the previous
- ❌ Optimize prematurely — measure first
- ❌ Assume user preferences — test or use system preferences

### Do
- ✅ Inspect entire project before any edits
- ✅ Use existing stack (Next.js 16, React 19, Tailwind, R3F, GSAP, Framer Motion)
- ✅ Extend existing theme system in `madhav/src/themes/`
- ✅ Build on existing components in `madhav/src/components/`
- ✅ Document every decision with rationale
- ✅ Measure at each phase gate
- ✅ Prioritize visual quality, usability, performance — in that order

---

## Progress Tracking

**File**: `.opencode/premium-site-progress.json`
```json
{
  "currentPhase": "design-system",
  "completedPhases": ["audit", "information-architecture", "visual-direction"],
  "phaseStatus": {
    "audit": { "status": "complete", "score": 68, "date": "2026-08-23" },
    "information-architecture": { "status": "complete", "date": "2026-08-24" },
    "visual-direction": { "status": "complete", "date": "2026-08-25" },
    "design-system": { "status": "in-progress", "started": "2026-08-26" }
  },
  "qualityGates": {
    "audit": { "passed": true, "report": "AUDIT_REPORT.md" },
    "ia": { "passed": true, "signoff": true },
    "visual": { "passed": true, "signoff": true }
  },
  "metrics": {
    "baseline": { "lcp": 4.2, "inp": 380, "cls": 0.24, "lighthouse": 67 },
    "current": { "lcp": 2.1, "inp": 145, "cls": 0.02, "lighthouse": 96 }
  }
}
```

---

## Integration with `/learn-web`

- `/premium-site` uses `/learn-web` for skill gaps discovered during implementation
- Example: If Phase 8 reveals weak GSAP skills → `/learn-web --stage gsap`
- Both commands share progress tracking and design system

---

## Example Session

```
$ /premium-site

╔══════════════════════════════════════════════════════════════╗
║  PREMIUM SITE TRANSFORMATION — MADHAV PROJECT                ║
║  Phase 0: AUDIT                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 Inspecting project...
   ├─ Next.js 16 + React 19 + TypeScript strict
   ├─ Tailwind CSS + design tokens in themes/
   ├─ Framer Motion + GSAP + Lenis + R3F installed
   ├─ Component library in components/ui/ (12 primitives)
   ├─ Pages: Home, About, Contact, Portfolio, Products, Services
   └─ 3D: @react-three/fiber installed, not used

📊 Running baseline audits...
   Lighthouse:        ████████░░ 67/100  (Perf: 52, A11y: 89, SEO: 82)
   Core Web Vitals:   LCP 4.2s  INP 380ms  CLS 0.24
   Bundle:            287KB JS gzipped (target: 150KB)
   Accessibility:     12 violations (color contrast, focus, ARIA)
   TypeScript:        0 errors
   Build:             ✓ Successful

📋 AUDIT_REPORT.md generated with 47 specific findings

➡️  Phase 0 complete. Run /premium-site for Phase 1: INFORMATION ARCHITECTURE
    Key IA issues: Unclear product hierarchy, missing case study template,
    navigation doesn't scale, no content strategy for blog/resources.
```

---

## Configuration

**File**: `.opencode/premium-site-config.json`
```json
{
  "projectRoot": "madhav",
  "brand": {
    "name": "Madhav",
    "attributes": ["precision", "depth", "craft"],
    "differentiators": ["3D expertise", "motion design", "technical craft"]
  },
  "targetAudience": "Technical decision-makers, creative directors, developers",
  "primaryGoals": ["Showcase 3D/motion capability", "Generate qualified leads", "Demonstrate technical excellence"],
  "phases": [
    "audit", "information-architecture", "visual-direction",
    "design-system", "component-architecture", "implementation",
    "responsive", "micro-interactions", "advanced-motion",
    "performance", "accessibility", "seo", "final-qa"
  ],
  "budgets": {
    "jsBundleKB": 150,
    "cssBundleKB": 50,
    "fontKB": 100,
    "initial3DKB": 500,
    "lcpMs": 2500,
    "inpMs": 200,
    "cls": 0.1,
    "lighthousePerf": 95,
    "lighthouseA11y": 100,
    "lighthouseSEO": 100
  },
  "tools": {
    "animation": "framer-motion",
    "scroll": "lenis",
    "gsap": "gsap + ScrollTrigger",
    "3d": "@react-three/fiber + @react-three/drei",
    "styling": "tailwindcss",
    "typecheck": "typescript",
    "lint": "eslint"
  },
  "requireApprovals": ["visual-direction", "design-system", "final-qa"]
}
```