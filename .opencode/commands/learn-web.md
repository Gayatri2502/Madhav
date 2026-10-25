# /learn-web — Continuous Web Development Training System

## Purpose
A self-adapting curriculum that teaches web development through your actual project. Each run inspects the codebase, identifies the weakest relevant skill, teaches it via a practical challenge in your code, reviews the implementation, refactors mistakes, and documents the pattern — progressing from foundations to advanced 3D/motion.

---

## Command Interface

```
/learn-web                    # Run next lesson
/learn-web --assess           # Show skill assessment only
/learn-web --stage <name>     # Force specific stage (foundations|animation|threejs|integration)
/learn-web --review           # Review last implementation only
/learn-web --reset            # Clear progress, restart assessment
/learn-web --progress         # Show curriculum progress
```

---

## Architecture

### Skill Assessment Engine
Runs on every invocation to determine current project maturity across 4 tracks:

| Track | Weight | Assessment Method |
|-------|--------|-------------------|
| **Foundations** (HTML/CSS/TS/React) | 25% | Lint, typecheck, semantic HTML audit, accessibility score, CSS architecture |
| **Animation** (CSS/GSAP/Framer/Lenis) | 25% | Animation library completeness, reduced-motion compliance, performance profiles |
| **3D/WebGL** (Three.js/R3F/Shaders) | 25% | Scene complexity, shader usage, post-processing, optimization patterns |
| **Integration** (Architecture/Performance/UX) | 25% | Bundle size, Lighthouse, Core Web Vitals, design system cohesion |

**Output**: Weakest track + specific skill gap + recommended challenge.

### Curriculum Stages (Progressive)

```
STAGE 0: PROJECT BOOTSTRAP
├── 0.1 Semantic HTML + Accessibility Audit
├── 0.2 CSS Architecture: Variables, Layers, Reset
├── 0.3 Fluid Typography System (clamp)
├── 0.4 Color System + Dark Mode
├── 0.5 Layout Primitives (Container, Grid, Flex)
├── 0.6 Component Primitives (Button, Input, Card)
├── 0.7 Form Validation + ARIA
└── 0.8 Modern CSS (:has, @layer, container queries)

STAGE 1: ANIMATION FOUNDATIONS
├── 1.1 Custom Easing Library (cubic-bezier)
├── 1.2 Transition System Utilities
├── 1.3 Keyframe Patterns (fade, slide, scale, morph)
├── 1.4 Performance: will-change, contain, composite-only
├── 1.5 prefers-reduced-motion Fallbacks
├── 1.6 Scroll-Driven Animations (view-timeline)
└── 1.7 Animation Library Package Structure

STAGE 2: GSAP MASTERY
├── 2.1 Timeline Choreography
├── 2.2 Magnetic Interactions (quickTo)
├── 2.3 Text Split Reveal (char/word/line)
├── 2.4 ScrollTrigger: Pin, Scrub, Parallax
├── 2.5 Responsive Triggers (matchMedia)
└── 2.6 GSAP Utils (interpolate, mapRange, clamp)

STAGE 3: FRAMER MOTION (React)
├── 3.1 Variant System (stagger, orchestration)
├── 3.2 Layout Animations (layout, layoutId)
├── 3.3 Gesture/Drag (whileDrag, momentum)
├── 3.4 Scroll-Linked (useScroll, useTransform)
├── 3.5 Page Transitions (AnimatePresence)
└── 3.6 Motion Values + Springs

STAGE 4: THREE.JS / R3F FOUNDATIONS
├── 4.1 Scene Setup: Camera, Renderer, Resize, Cleanup
├── 4.2 Materials: Standard, Physical, ShaderMaterial
├── 4.3 Lighting Rigs: Studio, HDRI, Rim
├── 4.4 Post-Processing: EffectComposer, Bloom, FXAA
├── 4.5 InstancedMesh for Performance
├── 4.6 GLTF Pipeline: Draco, KTX2, Optimization
└── 4.7 R3F: Canvas, useFrame, useLoader, extend

STAGE 5: SHADERS & CREATIVE CODING
├── 5.1 GLSL Noise (hash, perlin, simplex, fbm)
├── 5.2 Shader Backgrounds (full-screen quad)
├── 5.3 Displacement/Chromatic Aberration Passes
├── 5.4 SDF Shapes + Raymarching Basics
├── 5.5 GPU Particles (compute/ping-pong)
├── 5.6 Spring Physics (Hooke's law) for UI
└── 5.7 Audio Reactive (Web Audio → uniforms)

STAGE 6: PRODUCTION INTEGRATION
├── 6.1 Cinematic 3D Hero (R3F + GSAP + Lenis)
├── 6.2 3D Case Study Pages
├── 6.3 WebGL Gallery + Filter
├── 6.4 E-commerce 3D Product Viewer
├── 6.5 Performance Budget Enforcement
├── 6.6 Accessibility + Reduced Motion Compliance
└── 6.7 Deployment + Lighthouse CI
```

---

## Execution Flow (Per Invocation)

### Phase 1: INSPECT (Auto)
```bash
# Project analysis commands
- Read package.json, tsconfig, next.config
- Scan madhav/src/app, components, themes, styles
- Check for: animation-library/, threejs-foundations/, shaders/
- Run: npm run build (typecheck), lighthouse (if dev server running)
- Audit: semantic HTML, CSS variables, component patterns
```

### Phase 2: ASSESS (Auto)
- Score each track (0-100)
- Identify lowest-scoring track with highest impact
- Map to specific curriculum stage + exercise
- **Skip mastered stages** — if project shows Stage 3 patterns, start at Stage 4

### Phase 3: TEACH (Interactive)
- Explain the skill gap in context of YOUR project
- Show reference implementation from curriculum
- Highlight relevant files in madhav/ to modify
- Provide "why this matters" for your specific codebase

### Phase 4: CHALLENGE (Interactive)
- Small, scoped task (15-30 min implementation)
- Directly improves your project
- Example: "Add fluid typography scale to themes/typography.ts and apply to hero section"

### Phase 5: IMPLEMENT (Agent)
- Write code in your project
- Follow existing conventions (TypeScript strict, Tailwind, theme system)
- Use path aliases (@/*)
- Prefer composition over new files

### Phase 6: REVIEW (Auto + Interactive)
- Typecheck: `npm run build` in madhav/
- Lint check (if configured)
- Accessibility: axe-core scan on affected pages
- Performance: DevTools profile if animation/3D
- **Show diff** and ask: "Accept this implementation?"

### Phase 7: IDENTIFY MISTAKES (Auto)
- Compare against curriculum exit criteria
- Check: semantic HTML, reduced-motion, performance cost, mobile behavior
- Flag: layout shifts, unused CSS, missing cleanup, memory leaks

### Phase 8: REFACTOR (Agent)
- Fix identified issues
- Extract reusable patterns to libraries
- Update theme system if new tokens needed
- Document decisions

### Phase 9: DOCUMENT (Auto)
- Append to `LEARN_WEB_LOG.md`:
  - Date, stage, exercise, skill learned
  - Files modified
  - Mistakes found + fixes
  - Pattern extracted (reusable snippet)
  - Next recommended skill

### Phase 10: NEXT STEP (Auto)
- Update progress tracker
- Show next skill preview
- Exit with clear "Run /learn-web again for: [next skill]"

---

## Project State Detection (Smart Start)

```typescript
function detectProjectStage(): ProjectStage {
  const signals = {
    hasThemeSystem: exists('madhav/src/themes/'),
    hasComponents: exists('madhav/src/components/ui/'),
    hasAnimations: exists('animation-library/') || uses('framer-motion') || uses('gsap'),
    has3D: uses('@react-three/fiber') || uses('three'),
    hasShaders: glob('**/*.glsl').length > 0,
    hasScrollTrigger: uses('gsap/ScrollTrigger'),
    hasLenis: uses('lenis'),
    hasR3F: uses('@react-three/fiber'),
    hasPostProcessing: uses('postprocessing') || uses('@react-three/postprocessing'),
    hasPerformanceBudget: exists('PERFORMANCE_BUDGET.md'),
    lighthouseScore: getLighthouseScore(),
  }

  // Stage 0: No theme, no components, empty pages
  if (!signals.hasThemeSystem || !signals.hasComponents) return 'foundations'

  // Stage 1: Theme + components but no animation library
  if (!signals.hasAnimations) return 'animation-foundations'

  // Stage 2: CSS animations but no GSAP
  if (signals.hasAnimations && !signals.hasScrollTrigger) return 'gsap'

  // Stage 3: GSAP but no Framer Motion integration
  if (signals.hasScrollTrigger && !signals.hasR3F) return 'framer'

  // Stage 4: Animations but no 3D
  if (!signals.has3D) return 'threejs-foundations'

  // Stage 5: 3D but no custom shaders
  if (signals.has3D && !signals.hasShaders) return 'shaders'

  // Stage 6: Has 3D + shaders but no production integration
  if (!signals.hasPerformanceBudget) return 'integration'

  return 'mastery' // Continuous refinement
}
```

---

## Challenge Templates (Per Skill)

### Foundations Example
```
SKILL: Fluid Typography with clamp()
CONTEXT: Your themes/typography.ts exists but uses fixed rem values
CHALLENGE: Convert --text-* scale to clamp(min, preferred, max) using viewport width
FILES: madhav/src/themes/typography.ts, madhav/src/app/page.tsx (hero)
VERIFY: Text scales smoothly 320px → 1920px without media queries
```

### Animation Example
```
SKILL: GSAP ScrollTrigger Pin
CONTEXT: madhav/src/app/about/page.tsx has static sections
CHALLENGE: Pin the about section, animate content reveal on scrub
FILES: madhav/src/app/about/page.tsx, new component in Sections/
VERIFY: 60fps on 5x CPU throttle, respects prefers-reduced-motion
```

### 3D Example
```
SKILL: R3F ShaderMaterial with Noise
CONTEXT: madhav/src/app/page.tsx hero uses static image
CHALLENGE: Replace with full-screen shader background (fbm noise + mouse)
FILES: madhav/src/components/canvas/HeroShader.tsx, shaders/noise.glsl
VERIFY: 144fps 4K, single draw call, < 2KB gzipped shader
```

---

## Progress Tracking

**File**: `.opencode/learn-web-progress.json`
```json
{
  "currentStage": "animation-foundations",
  "currentExercise": "1.3-keyframe-patterns",
  "completedExercises": [
    "0.1-semantic-html",
    "0.2-css-architecture",
    "0.3-fluid-typography",
    "0.4-color-system",
    "0.5-layout-primitives",
    "0.6-component-primitives",
    "0.7-forms",
    "0.8-modern-css",
    "1.1-easing-library",
    "1.2-transition-system"
  ],
  "skillScores": {
    "foundations": 85,
    "animation": 45,
    "threejs": 10,
    "integration": 20
  },
  "lastRun": "2026-08-23T10:30:00Z",
  "totalRuns": 12
}
```

**File**: `LEARN_WEB_LOG.md` (human-readable)
```markdown
# Learn Web Log

## 2026-08-23 — Run #12
**Stage**: Animation Foundations → Exercise 1.3 Keyframe Patterns
**Skill**: Composite-only keyframe animations (transform/opacity only)
**Challenge**: Add stagger reveal animation to portfolio grid
**Files Modified**:
- madhav/src/components/ui/PortfolioCard.tsx
- madhav/src/styles/animations.css (new)
**Mistakes Found**:
- Used `height` animation (triggers layout) → Changed to `transform: scaleY`
- Missing `prefers-reduced-motion` → Added `@media (prefers-reduced-motion: reduce)`
- No `will-change` → Added `will-change: transform, opacity`
**Pattern Extracted**: `stagger-reveal` utility class (reusable)
**Next**: Exercise 1.4 Performance Audit
```

---

## Integration with Madhav Project

### Theme System Extension
When new design tokens are needed (e.g., animation durations, easing curves, 3D colors), they go in:
- `madhav/src/themes/animations.ts` — durations, easings, stagger configs
- `madhav/src/themes/three.ts` — 3D material colors, lighting presets

### Component Patterns
New primitives go in `madhav/src/components/ui/` following existing structure:
```
ui/
├── Button.tsx
├── Card.tsx
├── Animated/
│   ├── StaggerReveal.tsx
│   ├── MagneticButton.tsx
│   └── ScrollReveal.tsx
├── Canvas/
│   ├── HeroScene.tsx
│   └── ShaderBackground.tsx
└── index.ts
```

### Section Integration
Page sections in `madhav/src/Sections/` consume primitives:
```
Sections/
├── Hero/
│   ├── Hero.tsx
│   ├── HeroShader.tsx
│   └── index.ts
├── Portfolio/
│   ├── PortfolioGrid.tsx
│   └── PortfolioCard.tsx
```

---

## Quality Gates (Auto-Check)

Every implementation must pass:
- [ ] `npm run build` in madhav/ (TypeScript strict)
- [ ] No console errors/warnings
- [ ] Accessibility: 0 violations (axe-core)
- [ ] Performance: No layout-shift animations
- [ ] Reduced motion: Respects `prefers-reduced-motion`
- [ ] Mobile: Works at 320px, touch-friendly
- [ ] Dark mode: Consistent with theme system
- [ ] Bundle impact: < 5KB gzipped per new feature

---

## Configuration

**File**: `.opencode/learn-web-config.json`
```json
{
  "projectRoot": "madhav",
  "curricula": [
    "LEVEL_1_CURRICULUM.md",
    "ANIMATION_CURRICULUM.md",
    "THREE_CURRICULUM.md"
  ],
  "skipCompleted": true,
  "autoImplement": false,  // Require confirmation before writing
  "verbose": true,
  "performanceBudget": {
    "maxBundleIncreaseKB": 5,
    "targetFPS": 60,
    "cpuThrottle": 5
  },
  "preferredLibraries": {
    "animation": "gsap",
    "3d": "react-three-fiber",
    "scroll": "lenis",
    "styling": "tailwind"
  }
}
```

---

## Example Session

```
$ /learn-web

🔍 INSPECTING: Madhav Next.js Project
   ├─ Theme system: ✓ (colors, typography, spacing, breakpoints)
   ├─ Components: ✓ (ui, forms, navigation, common)
   ├─ Pages: ✓ (about, contact, portfolio, products, services)
   ├─ Animations: ✗ (framer-motion installed, not used)
   ├─ 3D: ✗ (@react-three/fiber installed, not used)
   └─ Shaders: ✗

📊 ASSESSMENT:
   Foundations:  85/100  ████████████░░░░░░░░░░
   Animation:    15/100  ██░░░░░░░░░░░░░░░░░░░░  ← WEAKEST
   3D/WebGL:     05/100  █░░░░░░░░░░░░░░░░░░░░░
   Integration:  20/100  ███░░░░░░░░░░░░░░░░░░░

🎯 TARGET: Animation Foundations → Exercise 1.1 Custom Easing Library

📚 TEACHING: Custom Cubic-Bezier Easing
   Your project uses Framer Motion but all transitions use default `ease`.
   Custom easings give brand personality and better UX.
   Reference: ANIMATION_CURRICULUM.md Stage 1.1

🎯 CHALLENGE: Create easing library + apply to navigation hover
   1. Add `madhav/src/themes/animations.ts` with 12 named easings
   2. Update Navbar link hover to use `ease-out-expo`
   3. Add `prefers-reduced-motion` instant fallback

✅ IMPLEMENTING...
   [writes files...]

🔍 REVIEW:
   ✓ TypeScript strict pass
   ✓ Build successful
   ✓ Navbar hover feels snappy (expo out)
   ✗ Missing reduced-motion fallback

🔧 REFACTORING...
   Added `@media (prefers-reduced-motion: reduce)` to animations.ts

📝 DOCUMENTED: LEARN_WEB_LOG.md + progress.json

➡️ NEXT: Run /learn-web for Exercise 1.2 Transition System
```

---

## Implementation Notes for Agent

When this command runs, the agent should:

1. **Read** the three curriculum files + AGENTS.md + current project structure
2. **Run** the assessment logic (check files, dependencies, patterns)
3. **Present** the assessment and proposed challenge
4. **Wait** for user confirmation (unless `--auto` flag)
5. **Implement** the challenge following project conventions
6. **Verify** with build/typecheck
7. **Review** for mistakes against curriculum criteria
8. **Refactor** any issues found
9. **Update** progress files
10. **Output** summary with next step

The agent has full read/write access to the madhav/ project and .opencode/ directory.