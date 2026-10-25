# Animation Audit: Contact Page

## Page: `madhav/src/app/contact/page.tsx`

### Current State Analysis

**Page Structure:**
- Hero Section (min-h-[40vh]) - Static gradient background, centered content
- Main Content Section (py-16) - Two-column grid (1:2 ratio)
  - Left: Contact Info Card (sticky) - 4 info items with icons
  - Right: Contact Form Card - 7 fields + submit/clear buttons
- FAQ Section (py-16, bordered) - Accordion with 6 items

**Interactive Elements:**
- 7 form inputs (text, email, tel, select, textarea)
- 2 buttons (Submit, Clear) - Submit has loading state
- 4 contact info cards with icons
- 1 Google Maps button
- 6 accordion triggers
- Form validation with error states
- Success state overlay

**Existing Animations:** NONE - All static

**Scroll Behavior:**
- Page height: ~3-4 viewport heights
- Sticky contact info card on left
- FAQ section at bottom

**Performance Baseline:**
- No animation JS currently
- Form state managed with React useState
- No Lenis, GSAP, or Framer Motion on this page

---

### Element Inventory with Animation Potential

| Element | Current State | User Intent | Animation Opportunity | Priority |
|---------|---------------|-------------|----------------------|----------|
| Hero badge "Get in Touch" | Static | Orient | Fade-in + slide up on load | High |
| Hero h1 "Contact Us" | Static | Orient | Staggered reveal with badge | High |
| Hero paragraph | Static | Orient | Staggered reveal after h1 | High |
| Contact Info Card | Static | Information access | Entrance reveal, hover feedback | High |
| Contact Info Items (4) | Static | Scan contacts | Staggered entrance, icon animation | High |
| Google Maps Button | Static | Action | Hover/tap feedback | Medium |
| Form Card | Static | Task initiation | Entrance reveal | High |
| Form Fields (7) | Static | Data entry | Focus feedback, error shake | High |
| Select Dropdowns | Native | Selection | Custom open/close animation | Medium |
| Submit Button | Loading spinner | Submit action | Magnetic hover, press, loading | High |
| Clear Button | Static | Reset action | Hover feedback | Medium |
| Form Success State | Instant swap | Confirmation | Scale + fade entrance | High |
| FAQ Section Header | Static | Orient | Scroll-reveal | Medium |
| FAQ Accordion Items (6) | Instant open/close | Information access | Smooth height transition | High |
| FAQ Content | Instant | Reading | Fade-in with height | Medium |

---

### User Intent per Section

1. **Hero** (0-40vh): Orient user → "Where am I? What can I do here?"
2. **Contact Form** (40-80vh): Act → "Fill form, submit request"
3. **Contact Info** (parallel): Reference → "Find phone/email/address"
4. **FAQ** (80vh+): Decide → "Get answers before committing"

---

### Performance Budget

- Current JS: ~87KB (shared)
- Animation budget: +5KB JS, +2KB CSS
- Target: 60fps on 5x CPU throttle
- Must support: prefers-reduced-motion, mobile touch

---

### Opportunities Summary

**High Impact (Must Have):**
1. Hero entrance sequence (CSS view-timeline)
2. Contact info card + items staggered entrance (CSS/Framer)
3. Form card entrance (CSS)
4. Form field focus/validation feedback (CSS)
5. Submit button states (CSS + Framer)
6. Success state entrance (Framer AnimatePresence)
7. FAQ accordion smooth transitions (CSS/Framer)

**Medium Impact (Should Have):**
8. FAQ section scroll-reveal (GSAP ScrollTrigger)
9. Google Maps button hover (CSS)
10. Select dropdown custom animation (CSS)

**Low Impact (Nice to Have):**
11. Hero background subtle parallax (CSS)
12. Form field floating label animation (CSS)

---

### Reduced Motion Strategy

All animations must have instant fallbacks:
- Duration: 0ms
- Transform: none
- Opacity: 1
- Height: auto (for accordion)