# /audit — Complete Website Audit & Auto-Fix

## Purpose
Comprehensive audit across 20 quality dimensions. Ranks every issue CRITICAL/HIGH/MEDIUM/LOW. Auto-fixes safe, high-impact issues. Outputs actionable report with fix priority.

---

## Command Interface

```
/audit                          # Full audit + auto-fix safe issues
/audit --report-only            # Generate report, no fixes
/audit --fix-critical           # Fix only CRITICAL issues
/audit --fix-high               # Fix CRITICAL + HIGH
/audit --category <name>        # Audit single category
/audit --compare                # Compare with previous audit
/audit --baseline               # Save current as baseline
```

---

## Audit Categories (20 Dimensions)

### 1. DESIGN
**Checks**:
- Visual hierarchy clarity (primary/secondary/tertiary actions obvious)
- Consistency: spacing, color, typography, border-radius, shadows
- Brand alignment: colors, typography, imagery, tone
- White space usage (not cluttered, not empty)
- Visual feedback for all interactive states
- Loading states (skeleton, spinner, progressive)
- Empty states (illustration, copy, action)
- Error states (inline, toast, page-level)
- Focus visibility (design matches focus-visible)

**Auto-fixable**:
- [ ] Missing focus-visible styles → Add to globals.css
- [ ] Inconsistent border-radius → Standardize via design tokens
- [ ] Missing loading states → Add skeleton components

### 2. UX
**Checks**:
- Task completion: Primary flows < 3 clicks
- Navigation clarity: Current location, back, home always visible
- Form usability: Labels, hints, validation, error recovery
- Content scannability: Headings, bullets, short paragraphs
- Search/findability: Search works, results relevant
- Onboarding: New user understands value in < 10s
- Undo/confirmation: Destructive actions confirmed
- Feedback timing: < 100ms perceived response
- Error messaging: Human-readable, actionable, positioned contextually

**Auto-fixable**:
- [ ] Missing form labels → Add `<label>` associations
- [ ] Missing error IDs → Add `aria-describedby`
- [ ] Auto-focus on modal open → Add focus management

### 3. RESPONSIVENESS
**Checks**:
- No horizontal overflow at any viewport (320px–2560px)
- Touch targets ≥ 44×44px (WCAG 2.5.5)
- Text readable without zoom (min 16px body)
- Images sharp (correct srcset, WebP/AVIF)
- Navigation usable: mobile menu, desktop mega-menu
- Tables responsive: stack, scroll, or priority columns
- Forms stack on mobile, inline on desktop
- 3D/Canvas scales or falls back gracefully
- Container queries used for component-level responsiveness

**Test Matrix**: 320, 375, 430, 768, 1024, 1440, 1920, 2560

**Auto-fixable**:
- [ ] Missing viewport meta → Add to layout.tsx
- [ ] Fixed-width containers → Convert to fluid/max-width
- [ ] Missing image sizes → Add `sizes` prop to Next.js Image

### 4. TYPOGRAPHY
**Checks**:
- Fluid type scale: `clamp(min, preferred, max)` for all headings/body
- Line height: 1.5–1.7 body, 1.1–1.3 headings
- Letter spacing: Tight for headings, normal for body
- Font loading: `preload`, `display: swap`, subset, woff2
- Variable fonts used where available
- Heading hierarchy: h1–h6 no skips, visual weight matches semantic
- Readable measure: 45–75ch line length
- Contrast: 4.5:1 body, 3:1 large text (WCAG AA)

**Auto-fixable**:
- [ ] Fixed rem values → Convert to fluid clamp() in theme tokens
- [ ] Missing font preload → Add to layout.tsx head
- [ ] Line height inconsistencies → Standardize via tokens

### 5. COLOR
**Checks**:
- Semantic color system (primitive → semantic → component tokens)
- Dark mode: complete, no hardcoded colors
- Contrast: All text/UI meets WCAG AA (4.5:1 / 3:1)
- Color-only info: None (icons + text, patterns + color)
- Focus indicator: 3:1 against adjacent, visible in both modes
- State colors: success/warning/error distinct + accessible
- Color consistency: Design tokens used everywhere (no arbitrary values)
- Reduced motion: Color transitions respect preference

**Auto-fixable**:
- [ ] Hardcoded colors in components → Replace with token references
- [ ] Missing dark mode values → Add semantic dark tokens
- [ ] Low contrast → Adjust token values to meet AA

### 6. SPACING
**Checks**:
- 4px base scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
- Consistent rhythm: Vertical spacing follows scale
- Component padding: Standardized presets (sm, md, lg, xl)
- Layout spacing: Section, container, gutter tokens
- No magic numbers in CSS/TSX (all via tokens)
- Negative space: Intentional, not accidental

**Auto-fixable**:
- [ ] Arbitrary padding/margin values → Replace with spacing tokens
- [ ] Inconsistent section gaps → Standardize via layout tokens

### 7. ACCESSIBILITY
**Checks** (WCAG 2.1 AA):
- [ ] Semantic HTML: landmarks, headings, lists, forms
- [ ] Keyboard: All interactive reachable, operable, logical order
- [ ] Focus visible: Custom styles, not removed
- [ ] Skip links: "Skip to main content"
- [ ] ARIA: Labels, describedby, live regions, roles correct
- [ ] Images: Alt text (descriptive, not "image of"), decorative hidden
- [ ] Color contrast: 4.5:1 text, 3:1 UI, 3:1 focus
- [ ] Reduced motion: Respected globally
- [ ] Zoom 200%: No content loss, no horizontal scroll
- [ ] Screen reader: Tested NVDA/VoiceOver, 0 violations

**Auto-fixable**:
- [ ] Missing alt text → Add descriptive alt or `alt=""` for decorative
- [ ] Missing form labels → Wrap input in `<label>` or add `htmlFor`
- [ ] Missing heading hierarchy → Restructure headings
- [ ] Focus outline removed → Restore with design-system focus styles
- [ ] ARIA misuse → Correct roles/attributes

### 8. SEMANTIC HTML
**Checks**:
- [ ] One `<main>`, one `<h1>` per page
- [ ] Landmarks: header, nav, main, aside, footer, section
- [ ] Sections have accessible names (aria-labelledby or heading)
- [ ] Lists for grouped items (nav, cards, breadcrumbs)
- [ ] `<button>` for actions, `<a>` for navigation
- [ ] `<form>` with proper fieldset/legend for groups
- [ ] `<time>` for dates, `<address>` for contact
- [ ] `<figure>`/`<figcaption>` for media with captions
- [ ] `<details>`/`<summary>` for disclosure
- [ ] No `<div>`/`<span>` where semantic element exists
- [ ] HTML validates (validator.w3.org)

**Auto-fixable**:
- [ ] Div soup → Replace with semantic elements
- [ ] Missing landmarks → Add header/nav/main/footer
- [ ] Button vs link misuse → Correct element type
- [ ] Missing fieldset/legend → Add for grouped inputs

### 9. SEO
**Checks**:
- [ ] Unique `<title>` per page (50–60 chars, keyword-front-loaded)
- [ ] Meta description (150–160 chars, compelling)
- [ ] Canonical URLs
- [ ] Open Graph: title, description, image, type
- [ ] Twitter Card: summary_large_image
- [ ] Structured data (JSON-LD): Organization, WebSite, BreadcrumbList, Article/Product/Service
- [ ] Sitemap.xml + robots.txt (auto-generated)
- [ ] Heading hierarchy matches content structure
- [ ] Descriptive link text (no "click here")
- [ ] Image alt attributes (keyword-relevant)
- [ ] Internal linking (3–5 contextual links/page)
- [ ] Readable URLs (`/services/web-dev` not `/services/123`)
- [ ] No index/no follow on staging
- [ ] Hreflang if multilingual

**Auto-fixable**:
- [ ] Missing meta tags → Add to page metadata
- [ ] Missing structured data → Add JSON-LD components
- [ ] Duplicate titles → Fix via dynamic metadata
- [ ] Missing canonical → Add to layout

### 10. PERFORMANCE
**Checks**:
- [ ] JS bundle < 150KB gzipped (total)
- [ ] CSS bundle < 50KB gzipped
- [ ] Fonts < 100KB (woff2, subset, preload)
- [ ] Images: WebP/AVIF, responsive sizes, blur placeholder
- [ ] Code splitting: Dynamic imports for heavy sections
- [ ] Tree shaking: No barrel exports, side-effect-free
- [ ] Caching: Static 1yr, HTML no-cache, API SWR
- [ ] Compression: Brotli/Gzip enabled
- [ ] Preload: Critical CSS, hero image, key fonts
- [ ] Third-party: Deferred, Partytown for analytics
- [ ] Service Worker: Offline, precache critical
- [ ] Lighthouse Performance ≥ 95

**Auto-fixable**:
- [ ] Missing image optimization → Add Next.js Image props
- [ ] Missing font preload → Add to layout
- [ ] Unused CSS → Purge via Tailwind content config
- [ ] Large dependencies → Dynamic import or replace

### 11. CORE WEB VITALS
**Checks** (Field + Lab):
| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| LCP | < 2.5s | 2.5–4s | > 4s |
| INP | < 200ms | 200–500ms | > 500ms |
| CLS | < 0.1 | 0.1–0.25 | > 0.25 |

**Auto-fixable**:
- [ ] LCP: Preload hero image, optimize font, reduce server response
- [ ] CLS: Reserve space for images/ads/iframes, avoid font swap layout shift
- [ ] INP: Reduce main thread work, debounce handlers, use web workers

### 12. ANIMATION
**Checks**:
- [ ] Every animation has purpose (orient, hierarchy, feedback, progress, delight)
- [ ] GPU-only properties (transform, opacity, filter, clip-path)
- [ ] 60fps on 5x CPU throttle
- [ ] `prefers-reduced-motion`: Instant/disabled fallbacks
- [ ] Mobile: Hover→active, parallax reduced/disabled
- [ ] No layout-triggering animations
- [ ] `will-change` managed (set during, remove after)
- [ ] Lenis smooth scroll: Pauses on reduced motion, disabled on touch
- [ ] 3D: Frameloop="demand", instancedMesh, frustum culling

**Auto-fixable**:
- [ ] Missing reduced-motion CSS → Add global reset
- [ ] Layout-triggering animations → Convert to transform/opacity
- [ ] Missing will-change → Add to animated elements

### 13. JAVASCRIPT
**Checks**:
- [ ] No console errors/warnings in production
- [ ] No unused code (tree-shaken)
- [ ] Event listeners cleaned up (useEffect return)
- [ ] No memory leaks (closures, observers, intervals)
- [ ] Debounced/throttled: scroll, resize, input handlers
- [ ] IntersectionObserver for lazy loading
- [ ] Code splitting: Heavy libs dynamic imported
- [ ] No `eval`, `Function` constructor, `innerHTML` XSS risks
- [ ] Error boundaries for React components
- [ ] Analytics: Privacy-compliant, deferred

**Auto-fixable**:
- [ ] Missing cleanup in useEffect → Add return functions
- [ ] Undebounced scroll/resize → Add lodash.debounce or custom hook
- [ ] Console.log in production → Remove or wrap in dev check

### 14. TYPESCRIPT
**Checks**:
- [ ] Strict mode: `strict: true` in tsconfig
- [ ] No `any` (use `unknown`, generics, type guards)
- [ ] No `@ts-ignore` without justification comment
- [ ] Proper generics for reusable components
- [ ] Discriminated unions for variant props
- [ ] Strict null checks (handle null/undefined)
- [ ] No unused variables/imports
- [ ] Type exports for public APIs
- [ ] Path aliases work (`@/*` → `./madhav/src/*`)

**Auto-fixable**:
- [ ] Unused imports/variables → Remove
- [ ] Implicit any → Add explicit types
- [ ] Missing return types on public functions → Add
- [ ] Barrel exports causing bundle bloat → Direct imports

### 15. REACT
**Checks**:
- [ ] Server Components by default, Client Components only when needed
- [ ] `'use client'` only at boundary (not leaf components)
- [ ] No unnecessary re-renders (memo, useMemo, useCallback)
- [ ] Keys stable, unique, not index
- [ ] Props destructured with defaults
- [ ] Children typed as `React.ReactNode`
- [ ] Forward ref for wrapper components
- [ ] Suspense boundaries for async components
- [ ] Error boundaries for graceful failure
- [ ] No side effects in render

**Auto-fixable**:
- [ ] Missing 'use client' directives → Add where hooks used
- [ ] Unnecessary client components → Move logic to server
- [ ] Missing keys → Add stable keys
- [ ] Inline functions in JSX → Extract to useCallback

### 16. COMPONENT ARCHITECTURE
**Checks**:
- [ ] Primitives in `ui/`, patterns in `patterns/`, sections in `Sections/`
- [ ] Consistent prop API: variant, size, as, disabled, loading, className
- [ ] Compound components for complex UI (Select, Tabs, Menu)
- [ ] Slots/render props for flexibility
- [ ] No duplicate styles (design tokens only)
- [ ] Storybook stories for all variants/states
- [ ] Visual regression tests
- [ ] Bundle size tracked per component
- [ ] Accessibility tested per component
- [ ] Documentation: Props, variants, examples

**Auto-fixable**:
- [ ] Inconsistent prop names → Standardize to design system API
- [ ] Hardcoded styles → Replace with tokens
- [ ] Missing forwardRef → Add for wrapper components

### 17. SECURITY
**Checks**:
- [ ] CSP headers: strict (script-src 'self', style-src 'self' 'unsafe-inline')
- [ ] HSTS: max-age=31536000, includeSubDomains, preload
- [ ] X-Frame-Options: DENY
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy: restrict camera, mic, geolocation
- [ ] No secrets in client bundle (check build output)
- [ ] Dependency audit: `npm audit` (0 critical/high)
- [ ] Input sanitization: XSS prevention
- [ ] CSRF protection for forms
- [ ] Rate limiting on API routes
- [ ] Secure cookies: HttpOnly, Secure, SameSite

**Auto-fixable**:
- [ ] Missing security headers → Add to next.config.js headers()
- [ ] Vulnerable dependencies → `npm audit fix`
- [ ] Inline scripts in CSP → Add nonces or move to files

### 18. ERROR HANDLING
**Checks**:
- [ ] Global error boundary (app/global-error.tsx)
- [ ] Page-level error boundaries (app/*/error.tsx)
- [ ] API error responses: Consistent format, no stack traces
- [ ] Form validation: Client + server, accessible errors
- [ ] 404 page: Friendly, search, navigation
- [ ] 500 page: Friendly, contact, error ID
- [ ] Loading states: All async operations
- [ ] Empty states: All list/data views
- [ ] Network failure: Offline detection, retry
- [ ] Logging: Structured, correlated (request ID)

**Auto-fixable**:
- [ ] Missing error.tsx files → Create with design system components
- [ ] Missing loading.tsx → Add skeleton patterns
- [ ] Console.error in production → Replace with logger

### 19. MOBILE
**Checks**:
- [ ] Touch targets ≥ 44×44px
- [ ] No hover-only functionality
- [ ] Viewport meta: width=device-width, initial-scale=1
- [ ] No horizontal scroll
- [ ] Font size ≥ 16px (prevents iOS zoom on focus)
- [ ] Input types: email, tel, number, date (correct keyboard)
- [ ] Autocomplete attributes on forms
- [ ] Native scroll (no scroll-jacking unless Lenis with smoothTouch: false)
- [ ] PWA: Manifest, service worker, installable
- [ ] Safe area insets (notch, home indicator)
- [ ] Orientation: Works portrait/landscape

**Auto-fixable**:
- [ ] Missing viewport meta → Add to layout
- [ ] Input type missing → Add correct type
- [ ] Font size < 16px → Adjust via tokens
- [ ] Touch target too small → Increase padding via tokens

### 20. CROSS-BROWSER COMPATIBILITY
**Checks**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest + iOS)
- [ ] Edge (latest)
- [ ] CSS: @supports for modern features, fallbacks
- [ ] JS: Transpiled to target (ES2022), polyfills if needed
- [ ] Features: Check caniuse for: container queries, :has(), view-timeline, CSS nesting
- [ ] Fonts: woff2 with woff fallback
- [ ] Images: AVIF with WebP fallback
- [ ] 3D: WebGL2 fallback, static image for no-WGL

**Auto-fixable**:
- [ ] Missing fallbacks → Add @supports / progressive enhancement
- [ ] Modern CSS without fallback → Add graceful degradation

---

## Severity Ranking

| Severity | Criteria | SLA |
|----------|----------|-----|
| **CRITICAL** | Blocks core task, security vuln, accessibility violation, data loss, crash | Fix immediately |
| **HIGH** | Major UX degradation, performance budget exceeded, SEO blocking, mobile broken | Fix this sprint |
| **MEDIUM** | Inconsistency, minor perf gain, enhanced a11y, code quality | Fix next sprint |
| **LOW** | Nice-to-have, polish, future-proofing | Backlog |

---

## Auto-Fix Safety Rules

**Only auto-fix when**:
1. **Deterministic**: Same input → same output (no AI guesswork)
2. **Reversible**: Git diff shows clear, reviewable change
3. **Tested**: Fix pattern verified in codebase
4. **Scoped**: Single file or consistent pattern across files
5. **No behavior change**: Only fixes violations, doesn't alter intent

**Auto-fix categories**:
| Category | Safe Fixes |
|----------|------------|
| TypeScript | Unused imports, implicit any, missing return types |
| Accessibility | Missing alt, labels, heading hierarchy, focus styles |
| SEO | Missing meta tags, structured data, canonical |
| Performance | Image optimization, font preload, dynamic imports |
| Security | Headers, npm audit fix, dependency updates |
| React | Missing 'use client', keys, forwardRef |
| CSS | Hardcoded values → tokens, missing reduced-motion |
| Semantic HTML | Div→semantic, button vs link, landmarks |

**Never auto-fix**:
- Design decisions (color, spacing, layout changes)
- Content changes (copy, images, structure)
- Business logic
- Animation choreography
- Component architecture reorganization

---

## Execution Flow

### Phase 1: INSPECT (Parallel)
```bash
# Static analysis
- TypeScript: npx tsc --noEmit
- ESLint: npx eslint . --ext .ts,.tsx
- Stylelint: npx stylelint "**/*.css"
- Bundle: npx @next/bundle-analyzer
- Dependencies: npm audit --json

# Dynamic analysis (requires dev server)
- Lighthouse: npx lighthouse http://localhost:3000 --output=json
- axe-core: npx axe-cli http://localhost:3000
- Playwright: Cross-browser, mobile, a11y tests

# Codebase scan
- grep for: hardcoded colors, magic numbers, console.log, any, ts-ignore
- Check: next.config.js, tsconfig.json, tailwind.config.js
- Scan: madhav/src/app, components, themes, styles, hooks, lib
```

### Phase 2: EVALUATE
- Score each category (0–100)
- List issues with: file, line, severity, description, fix suggestion
- Rank by: severity × impact × effort

### Phase 3: REPORT
Generate `AUDIT_REPORT_<timestamp>.md`:
```markdown
# Audit Report — 2026-08-24

## Summary
- Total Issues: 147
- CRITICAL: 3 | HIGH: 18 | MEDIUM: 52 | LOW: 74
- Categories Failing: Accessibility (62), Performance (58), SEO (45)

## Category Scores
| Category | Score | Status |
|----------|-------|--------|
| Design | 78/100 | ⚠️ |
| UX | 82/100 | ⚠️ |
| Responsiveness | 71/100 | ❌ |
| Typography | 85/100 | ✅ |
| Color | 74/100 | ⚠️ |
| Spacing | 88/100 | ✅ |
| Accessibility | 62/100 | ❌ |
| Semantic HTML | 79/100 | ⚠️ |
| SEO | 45/100 | ❌ |
| Performance | 58/100 | ❌ |
| Core Web Vitals | 55/100 | ❌ |
| Animation | 70/100 | ⚠️ |
| JavaScript | 84/100 | ✅ |
| TypeScript | 91/100 | ✅ |
| React | 76/100 | ⚠️ |
| Component Architecture | 80/100 | ✅ |
| Security | 68/100 | ❌ |
| Error Handling | 72/100 | ⚠️ |
| Mobile | 65/100 | ❌ |
| Cross-Browser | 83/100 | ✅ |

## CRITICAL Issues (Fix Now)
1. [Security] CSP headers missing — XSS risk
   File: madhav/next.config.js
   Fix: Add headers() with strict CSP

2. [Accessibility] No skip link — keyboard users trapped
   File: madhav/src/app/layout.tsx
   Fix: Add <a href="#main" className="skip-link">Skip to content</a>

3. [Performance] LCP 4.2s — hero image not preloaded
   File: madhav/src/app/page.tsx
   Fix: Add preload link + priority to Next.js Image

## HIGH Issues (18)
...

## Auto-Fix Applied (Safe)
- ✅ Removed 47 unused imports
- ✅ Added missing alt="" to 12 decorative images
- ✅ Added focus-visible styles to globals.css
- ✅ Converted 23 hardcoded colors to tokens
- ✅ Added viewport meta tag
- ✅ Fixed 5 heading hierarchy violations
- ✅ Added npm audit fix (3 moderate vulns)
```

### Phase 4: AUTO-FIX (Interactive)
```
🔧 AUTO-FIX: 34 safe fixes identified
   CRITICAL: 3 | HIGH: 8 | MEDIUM: 14 | LOW: 9

   Apply all safe fixes? [Y/n] → Y
   
   [1/34] Fix: CSP headers → next.config.js
   [2/34] Fix: Skip link → layout.tsx
   [3/34] Fix: Hero image preload → page.tsx
   ...
   [34/34] Fix: Unused imports → 12 files

✅ 34 fixes applied. 113 issues remain (require manual review).
```

---

## Output Files

| File | Purpose |
|------|---------|
| `AUDIT_REPORT_<timestamp>.md` | Full report with all issues ranked |
| `AUDIT_SUMMARY.json` | Machine-readable summary for CI |
| `AUDIT_FIXES_<timestamp>.md` | Applied fixes + git diff summary |
| `AUDIT_BASELINE.json` | Saved baseline for --compare |

---

## Integration with Project

**Reads from**:
- `madhav/next.config.js`, `madhav/tsconfig.json`, `madhav/package.json`
- `tailwind.config.js`, `postcss.config.js`
- `madhav/src/themes/` (tokens)
- `madhav/src/components/` (component library)
- `madhav/src/app/` (pages, layouts)
- `madhav/src/styles/` (globals.css)

**Uses installed tools**:
- `typescript`, `eslint`, `stylelint`
- `lighthouse`, `axe-core`, `playwright`
- `@next/bundle-analyzer`, `npm audit`
- `prettier` (for formatting fixes)

**Extends**:
- Design tokens in `madhav/src/themes/`
- Component patterns in `madhav/src/components/ui/`
- Animation system in `madhav/src/themes/animations.ts`

---

## Example Session

```
$ /audit

🔍 AUDITING: Madhav Next.js Project
   ├─ Stack: Next.js 16, React 19, TypeScript strict
   ├─ Styling: Tailwind + CSS variables (themes/)
   ├─ Animation: Framer Motion, GSAP, Lenis
   ├─ 3D: @react-three/fiber, @react-three/drei
   └─ Dev server: Running on localhost:3000

📊 RUNNING CHECKS (parallel)...
   ████████████████████ TypeScript (strict)     0 errors
   ████████████████████ ESLint                    0 warnings
   ████████████████░░░░ Stylelint                 12 warnings
   ████████████████░░░░ Lighthouse                Perf: 52
   ████████████████████ axe-core                  12 violations
   ████████████████░░░░ Bundle analyzer           287KB JS
   ████████████████████ npm audit                 3 moderate
   ████████████████░░░░ Playwright               4/8 passing

📋 EVALUATING 20 CATEGORIES...
   Design:           78  ⚠️  Inconsistent radius, missing focus styles
   UX:               82  ⚠️  Form validation UX gaps
   Responsiveness:   71  ❌  Horizontal overflow at 320px, touch targets small
   Typography:       85  ✅  Fluid scale exists, minor line-height issues
   Color:            74  ⚠️  23 hardcoded colors, dark mode incomplete
   Spacing:          88  ✅  Token system used well
   Accessibility:    62  ❌  Missing skip link, labels, heading hierarchy
   Semantic HTML:    79  ⚠️  Div soup in 3 components, button/link misuse
   SEO:              45  ❌  No structured data, missing meta on 4 pages
   Performance:      58  ❌  287KB JS, no preload, images unoptimized
   Core Web Vitals:  55  ❌  LCP 4.2s, CLS 0.24, INP 380ms
   Animation:        70  ⚠️  No reduced-motion, some layout animations
   JavaScript:       84  ✅  Clean, 3 console.logs in prod
   TypeScript:       91  ✅  Strict, 2 implicit any
   React:            76  ⚠️  5 unnecessary client components
   Comp Architecture: 80  ✅  Good structure, missing Storybook
   Security:         68  ❌  No CSP, no HSTS, no Permissions-Policy
   Error Handling:   72  ⚠️  Missing error.tsx, loading.tsx
   Mobile:           65  ❌  Touch targets, font-size, hover-only
   Cross-Browser:    83  ✅  Modern CSS with fallbacks

📝 REPORT: AUDIT_REPORT_2026-08-24.md

🔧 AUTO-FIX AVAILABLE: 34 safe fixes
   CRITICAL: 3  |  HIGH: 8  |  MEDIUM: 14  |  LOW: 9

   Apply safe fixes? [Y/n]
```

---

## Configuration

**File**: `.opencode/audit-config.json`
```json
{
  "projectRoot": "madhav",
  "devServer": "http://localhost:3000",
  "categories": [
    "design", "ux", "responsiveness", "typography", "color", "spacing",
    "accessibility", "semantic-html", "seo", "performance", "core-web-vitals",
    "animation", "javascript", "typescript", "react", "component-architecture",
    "security", "error-handling", "mobile", "cross-browser"
  ],
  "thresholds": {
    "lighthousePerf": 90,
    "lighthouseA11y": 100,
    "lighthouseSEO": 100,
    "bundleJSKB": 150,
    "bundleCSSKB": 50,
    "lcpMs": 2500,
    "inpMs": 200,
    "cls": 0.1
  },
  "autoFix": {
    "enabled": true,
    "maxSeverity": "high",
    "requireConfirmation": true,
    "safeOnly": true
  },
  "tools": {
    "lighthouse": true,
    "axe": true,
    "playwright": true,
    "bundleAnalyzer": true,
    "npmAudit": true
  },
  "browsers": ["chromium", "firefox", "webkit"],
  "viewports": [320, 375, 430, 768, 1024, 1440, 1920, 2560]
}
```