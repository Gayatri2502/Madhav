# LEVEL 1: HTML + CSS FOUNDATIONS

## Skills Required
- Semantic HTML5 elements and their purpose
- Document outline and accessibility tree
- CSS Box Model (content, padding, border, margin)
- CSS Cascade, specificity, inheritance
- Flexbox (1D layout)
- CSS Grid (2D layout)
- CSS Variables (custom properties)
- Fluid typography with clamp()
- Logical properties (margin-inline, padding-block)
- Modern reset / normalize
- Form semantics and validation
- Media queries and container queries basics
- Pseudo-classes and pseudo-elements
- CSS nesting (native)

---

## PRACTICAL EXERCISES

### Exercise 1: Semantic HTML Structure
**Goal**: Build a document using only semantic elements, no divs/spans unless necessary.

**Requirements**:
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Proper heading hierarchy (h1-h6)
- `<address>`, `<time>`, `<figure>`, `<figcaption>`, `<details>`, `<summary>`
- ARIA landmarks where needed
- Valid HTML5 (validate at validator.w3.org)

**Deliverable**: `exercises/01-semantic-html/index.html`

---

### Exercise 2: CSS Box Model Mastery
**Goal**: Visualize and control every layer of the box model.

**Requirements**:
- Create a card component showing content, padding, border, margin visually
- Use `box-sizing: border-box` globally
- Demonstrate margin collapse and how to prevent it
- Use `outline` vs `border` for debugging
- Implement spacing scale using CSS variables

**Deliverable**: `exercises/02-box-model/index.html + styles.css`

---

### Exercise 3: Flexbox Deep Dive
**Goal**: Master 1D layouts without guessing.

**Requirements**:
- Navigation bar: logo left, links center, CTA right
- Card grid: equal height cards, sticky footer
- Centering: horizontal, vertical, both (multiple methods)
- Gap-based spacing (no margin hacks)
- `flex-grow`, `flex-shrink`, `flex-basis` understanding
- Responsive: column on mobile, row on desktop

**Deliverable**: `exercises/03-flexbox/index.html + styles.css`

---

### Exercise 4: CSS Grid Deep Dive
**Goal**: Master 2D layouts with precision.

**Requirements**:
- Holy grail layout (header, sidebar, main, footer)
- Asymmetric article layout (image left, text right, alternating)
- Named grid areas for readability
- `minmax()`, `auto-fit`, `auto-fill` for responsive grids
- Subgrid for nested alignment
- Overlapping elements with z-index control

**Deliverable**: `exercises/04-grid/index.html + styles.css`

---

### Exercise 5: Typography System
**Goal**: Build a fluid, accessible type scale.

**Requirements**:
- CSS variables for type scale (--text-xs through --text-7xl)
- Fluid typography with `clamp(min, preferred, max)`
- Line height system (--leading-tight, --leading-normal, --leading-relaxed)
- Font feature settings (ligatures, kerning, numeral styles)
- Variable font usage (weight axis)
- Proper heading hierarchy with visual rhythm

**Deliverable**: `exercises/05-typography/index.html + styles.css`

---

### Exercise 6: Color System & Theming
**Goal**: Build a semantic color system with dark mode.

**Requirements**:
- CSS variables: --color-primary, --color-secondary, --color-accent
- Semantic aliases: --color-text, --color-text-muted, --color-background, --color-surface, --color-border
- State colors: --color-success, --color-warning, --color-error
- Dark mode via `prefers-color-scheme` and manual toggle
- Color contrast validation (WCAG AA minimum)
- Relative color syntax for variants (`color-mix()`, `light-dark()`)

**Deliverable**: `exercises/06-color-system/index.html + styles.css`

---

### Exercise 7: Forms & Validation
**Goal**: Accessible, semantic forms with native validation.

**Requirements**:
- `<form>`, `<fieldset>`, `<legend>`, `<label>` associations
- Input types: email, tel, url, number, date, password
- Native validation UI + custom styling
- `:valid`, `:invalid`, `:user-invalid`, `:placeholder-shown`
- Required/optional indicators
- Error messaging with `aria-describedby`
- Submit handling without JS

**Deliverable**: `exercises/07-forms/index.html + styles.css`

---

### Exercise 8: Modern CSS Features
**Goal**: Use modern CSS without polyfills.

**Requirements**:
- CSS nesting (`&:hover`, `& > *`)
- `:has()` relational selector
- `:where()` / `:is()` for specificity control
- `@layer` for cascade management
- `container-type` / `@container` queries
- `accent-color` for form controls
- `scrollbar-gutter`, `scrollbar-color`
- Logical properties exclusively (no physical)

**Deliverable**: `exercises/08-modern-css/index.html + styles.css`

---

## MINI-PROJECTS

### Mini-Project 1: Article Page
**Scope**: Single long-form article with:
- Semantic structure (header, nav, main, article, aside, footer)
- Table of contents with scroll-spy (CSS only via `:target` or JS)
- Figure/images with captions
- Blockquotes, code blocks, definition lists
- Related articles sidebar (Grid)
- Responsive: single column < 640px, two-column > 640px
- Print stylesheet

**Deliverable**: `projects/01-article-page/`

---

### Mini-Project 2: Component Library Foundation
**Scope**: Build reusable primitives (no framework):
- Button (primary, secondary, ghost, destructive, sizes)
- Input (text, textarea, select, checkbox, radio)
- Card (media, content, action slots)
- Modal/Dialog (inert, focus trap, escape close)
- Tooltip (CSS-only with `:has()`)
- Toast notification
- All components: dark mode, keyboard accessible, reduced motion

**Deliverable**: `projects/02-component-library/`

---

## INCREASINGLY DIFFICULT PROJECTS

### Project A: Landing Page (Static)
- Hero, features grid, testimonials carousel (CSS scroll-snap), pricing table, footer
- Fully responsive, fluid typography, dark mode
- Zero JavaScript
- Lighthouse 100/100/100/100

### Project B: Multi-Page Site (Static)
- 5 pages: Home, About, Services, Work, Contact
- Shared layout via includes (SSI or build step)
- Active nav state
- Contact form with native validation
- Sitemap.xml, robots.txt
- Deployed to Netlify/Vercel

---

## SELF-TEST CHECKLIST

After completing all exercises and mini-projects:

- [ ] Can explain every semantic element used and why
- [ ] Can debug layout issues using DevTools only (no trial/error)
- [ ] Can write a fluid type scale from memory
- [ ] Can implement dark mode in < 5 minutes
- [ ] Can build a responsive grid without media queries
- [ ] Can create accessible form markup without looking up attributes
- [ ] Can explain specificity calculation for any selector
- [ ] Can identify margin collapse in DevTools
- [ ] All exercises pass HTML validation
- [ ] All exercises pass axe-core accessibility audit (0 violations)

---

## REVIEW PROCESS

1. **Code Review**: Compare against MDN references and WCAG guidelines
2. **Performance**: Lighthouse audit each project
3. **Accessibility**: Run axe-core, test with screen reader (NVDA/VoiceOver)
4. **Responsive**: Test at 320px, 768px, 1024px, 1440px, 1920px
5. **Browser**: Chrome, Firefox, Safari (check caniuse for features used)

---

## REFACTOR PREVIOUS WORK

After each exercise, revisit earlier exercises and:
- Replace utility classes with semantic patterns
- Extract repeated CSS into variables
- Improve accessibility markup
- Reduce specificity conflicts
- Add `@layer` organization

---

## REUSABLE PATTERNS TO CREATE

1. **Reset/Normalize** - `reset.css` (modern, minimal)
2. **Type Scale** - `typography.css` (fluid, variable-font ready)
3. **Color System** - `colors.css` (semantic, dark-mode ready)
4. **Spacing Scale** - `spacing.css` (consistent scale)
5. **Layout Primitives** - `layout.css` (container, grid, flex utilities)
6. **Component Base** - `components.css` (button, input, card bases)

---

## DOCUMENTATION

Create `LEVEL_1_NOTES.md` with:
- Decision log (why this approach?)
- Gotchas discovered
- Browser support notes
- Performance observations
- Accessibility findings
- Links to specs referenced

---

## EXIT CRITERIA FOR LEVEL 1

**Do not proceed to Level 2 until**:
1. All 8 exercises complete and passing tests
2. Both mini-projects deployed and audited
3. Project A (Landing Page) scores 100 on Lighthouse
4. Can rebuild any exercise from memory in < 30 minutes
5. `LEVEL_1_NOTES.md` is comprehensive
6. Component library used in Project A & B
7. Zero accessibility violations on all projects