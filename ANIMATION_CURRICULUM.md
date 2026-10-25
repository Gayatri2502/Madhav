# ANIMATION MASTERY CURRICULUM

## Philosophy
Every animation must answer: TRIGGER, DURATION, EASING, MOVEMENT, PURPOSE, PERFORMANCE COST, MOBILE BEHAVIOR, REDUCED-MOTION BEHAVIOR.
No decoration. Every effect serves user intent.

---

## STAGE 1: CSS Animation Foundations

### Skills
- `@keyframes`, `animation` properties
- `transition` for state changes
- `cubic-bezier()` custom easing
- `will-change`, `contain` for performance
- `prefers-reduced-motion` media query
- `animation-timeline` / `view-timeline` (scroll-driven)

### Exercises
1. **Easing Library** — Build 12 custom cubic-bezier curves (ease-in/out, bounce, elastic, anticipation, overshoot). Document each with motion feel.
2. **Transition System** — Reusable `transition-{property}-{duration}-{easing}` utilities. Test on hover, focus, active, disabled states.
3. **Keyframe Patterns** — Fade, slide, scale, rotate, flip, morph. Combine with `animation-fill-mode`.
4. **Performance Audit** — Profile each with DevTools Performance tab. Identify layout vs paint vs composite.
5. **Reduced Motion** — Implement `prefers-reduced-motion: reduce` fallbacks for every exercise.

### Deliverable
`animation-library/css/animations.css` + `animation-library/css/easing.css` + `animation-library/css/reduced-motion.css`

---

## STAGE 2: GSAP Core

### Skills
- `gsap.to()`, `from()`, `fromTo()`, `set()`
- Timeline sequencing (`tl.to()`, `tl.from()`)
- Easing: `power1-4`, `back`, `elastic`, `bounce`, `expo`, `circ`, `sine`, `custom`
- Stagger: `stagger: { amount, from, grid, axis, ease }`
- Callbacks: `onStart`, `onUpdate`, `onComplete`, `onReverseComplete`
- `gsap.utils`: `interpolate`, `mapRange`, `clamp`, `wrap`, `random`, `snap`, `pipe`

### Exercises
1. **Timeline Choreography** — 5-panel sequential reveal with overlapping staggers.
2. **Magnetic Button** — Cursor attraction with `gsap.quickTo()` for 60fps tracking.
3. **Text Split Reveal** — Split by char/word/line, animate with stagger + custom ease.
4. **Scroll-Linked Animation** — `gsap.to({}, { scrollTrigger: { scrub: 1 } })` for parallax.
5. **Performance** — Use `gsap.ticker.lagSmoothing()`, `force3D: true`, `will-change`.

### Deliverable
`animation-library/gsap/core.js` — reusable functions: `reveal()`, `staggerReveal()`, `magnetic()`, `parallax()`, `textSplit()`

---

## STAGE 3: ScrollTrigger Mastery

### Skills
- `trigger`, `start`, `end`, `scrub`, `pin`, `pinSpacing`
- `toggleActions`: `play pause resume reset`
- `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack`
- `snap`, `fastScrollEnd`, `invalidateOnRefresh`
- Container animation, horizontal scroll, nested triggers
- `ScrollTrigger.matchMedia()` for responsive triggers

### Exercises
1. **Pin & Reveal** — Section pins, content animates inside (scrub: 0.5).
2. **Horizontal Gallery** — `containerAnimation` for horizontal scroll with scrub.
3. **Parallax Layers** — Multiple elements at different `scrub` values (0.1, 0.5, 1, 2).
4. **Progress Indicator** — Scroll progress bar + section markers.
5. **Responsive Triggers** — Different animations mobile vs desktop via `matchMedia()`.

### Deliverable
`animation-library/gsap/scroll-trigger.js` — `createPin()`, `createParallax()`, `createHorizontalScroll()`, `createProgress()`

---

## STAGE 4: Lenis Smooth Scroll

### Skills
- `new Lenis({ duration, easing, orientation, gestureOrientation, smoothWheel, smoothTouch, wheelMultiplier, touchMultiplier })`
- `lenis.on('scroll', ...)`, `lenis.scrollTo()`, `lenis.stop()`, `lenis.start()`
- Integration with ScrollTrigger: `ScrollTrigger.scrollerProxy()`
- `prefers-reduced-motion` → disable Lenis

### Exercises
1. **Basic Setup** — Initialize, connect to ScrollTrigger, handle cleanup.
2. **Scroll To** — Anchor links with smooth scroll, offset for fixed header.
3. **Section Snap** — `lenis.scrollTo(target, { offset, duration, easing })` on wheel.
4. **Mobile Behavior** — Disable smooth on touch, keep native scroll.

### Deliverable
`animation-library/lenis/setup.js` — `initLenis()`, `scrollTo()`, `destroy()`

---

## STAGE 5: Framer Motion (React)

### Skills
- `motion.div`, `animate`, `initial`, `exit`, `transition`
- `variants` for orchestration
- `useAnimation()`, `useMotionValue()`, `useTransform()`
- `whileHover`, `whileTap`, `whileFocus`, `whileDrag`
- `layout` / `layoutId` for shared layout animations
- `AnimatePresence` for exit animations
- `useScroll()`, `useTransform()` for scroll-linked

### Exercises
1. **Variant System** — `fadeIn`, `slideUp`, `scaleIn`, `staggerContainer`, `staggerItem`.
2. **Layout Animations** — Reordering list with `layout`, shared layout for modal expand.
3. **Drag & Gesture** — Draggable card with `whileDrag`, momentum, bounds.
4. **Scroll-Linked** — `useScroll()` + `useTransform()` for parallax, progress rings.
5. **Page Transitions** — `AnimatePresence` + `layoutId` for shared element transitions.

### Deliverable
`animation-library/framer/variants.ts`, `animation-library/framer/hooks.ts`, `animation-library/framer/page-transition.tsx`

---

## STAGE 6: Motion One (Lightweight)

### Skills
- `animate()`, `timeline()`, `stagger()`, `spring()`, `glide()`, `inertia()`
- WAAPI-based, smaller bundle
- `scroll()` timeline for scroll-driven animations

### Exercises
1. **Feature Parity** — Recreate GSAP magnetic button with Motion One.
2. **Scroll Timeline** — `animate(element, { transform: ['translateY(100px)', 'translateY(0)'] }, { timeline: scroll() })`
3. **Spring Physics** — `spring({ stiffness, damping, mass })` for natural feel.

### Deliverable
`animation-library/motion-one/core.js`

---

## STAGE 7: SVG Animation

### Skills
- SMIL (`<animate>`, `<animateTransform>`, `<animateMotion>`) — know limitations
- CSS on SVG: `stroke-dasharray`, `stroke-dashoffset` for line drawing
- `pathLength`, `getTotalLength()` for precise control
- Morphing: `flubber` / `gsap.morphSVG` / native `path` interpolation
- Filters: `feGaussianBlur`, `feDisplacementMap`, `feTurbulence` for organic motion

### Exercises
1. **Line Drawing** — Logo reveal via `stroke-dashoffset` with `scrollTrigger`.
2. **Morphing Icons** — Menu ↔ close, play ↔ pause, smooth path interpolation.
3. **Filter Animation** — Gooey blob, displacement ripple, noise texture.
4. **SVG as Mask** — `mask="url(#mask)"` + animate mask content for image reveals.

### Deliverable
`animation-library/svg/line-draw.js`, `animation-library/svg/morph.js`, `animation-library/svg/filters.js`

---

## STAGE 8: Canvas 2D

### Skills
- `requestAnimationFrame` loop
- `ctx.clearRect()`, `save()`/`restore()`, `translate()`, `rotate()`, `scale()`
- Particle systems, trails, flow fields
- OffscreenCanvas for workers
- `will-read-frequently` for readback

### Exercises
1. **Particle Trail** — Mouse-following particles with velocity decay.
2. **Flow Field** — Perlin noise vectors, particles follow field.
3. **Text Particles** — Explode text into particles on hover, reassemble.
4. **Performance** — 10k particles at 60fps, `requestAnimationFrame` budget.

### Deliverable
`animation-library/canvas2d/particles.js`, `animation-library/canvas2d/flow-field.js`

---

## STAGE 9: Three.js Core

### Skills
- Scene, Camera (Perspective/Ortho), Renderer (WebGLRenderer)
- Geometry, Material (Basic, Standard, Physical, ShaderMaterial)
- Lighting (Directional, Point, Spot, Hemisphere, RectArea)
- Post-processing: EffectComposer, Passes (Bloom, SSAO, FXAA, Outline)
- Loaders: GLTFLoader, DRACOLoader, TextureLoader
- InstancedMesh for thousands of objects
- Raycaster for interaction

### Exercises
1. **Scene Setup** — Responsive renderer, resize handling, DPR control.
2. **Material Library** — Reusable: matte, glossy, metallic, glass, emissive.
3. **Lighting Rigs** — Studio (3-point), HDRI environment, rim lighting.
4. **Post-Process Chain** — Bloom + FXAA + color grading LUT.
5. **Interaction** — Hover highlight, click select, drag orbit.

### Deliverable
`animation-library/threejs/setup.ts`, `animation-library/threejs/materials.ts`, `animation-library/threejs/post.ts`

---

## STAGE 10: WebGL Shaders (GLSL)

### Skills
- Vertex vs Fragment shader
- Uniforms: `time`, `resolution`, `mouse`, `scrollProgress`
- Varyings for inter-stage data
- Noise: `hash`, `valueNoise`, `perlin`, `simplex`, `fbm`
- SDF (Signed Distance Fields) for shapes
- Raymarching basics
- `shaderMaterial` in Three.js / React Three Fiber

### Exercises
1. **Gradient Background** — Animated mesh gradient with noise.
2. **Distortion** — UV displacement with `time` + `noise`.
3. **SDF Shapes** — Circle, rect, rounded rect, morphing between.
4. **Raymarched Scene** — Simple sphere + plane with lighting.
5. **Image Transition** — Displacement map transition between two textures.

### Deliverable
`animation-library/shaders/gradients.glsl`, `animation-library/shaders/distortion.glsl`, `animation-library/shaders/sdf.glsl`, `animation-library/shaders/transition.glsl`

---

## STAGE 11: React Three Fiber (R3F)

### Skills
- `<Canvas>`, `useFrame`, `useThree`, `useLoader`
- `extend()` for custom objects
- `Html` / `Text` from drei
- `EffectComposer` + passes in R3F
- `shaderMaterial` integration
- InstancedMesh via `<instanceMesh>`
- `Events` (onPointerOver, onClick) on meshes

### Exercises
1. **R3F Scene Template** — Provider pattern, resize, DPR, cleanup.
2. **Declarative Shaders** — `useShader()` hook, uniform binding.
3. **Scroll-Linked 3D** — `useFrame` + `scrollY` progress for camera/object animation.
4. **HTML Overlay** — `<Html>` for 2D UI in 3D space, occluded by 3D.
5. **Performance** — `useMemo`, `useCallback`, `frustumCull`, `instancedMesh`.

### Deliverable
`animation-library/r3f/canvas.tsx`, `animation-library/r3f/hooks.ts`, `animation-library/r3f/shader-material.tsx`

---

## STAGE 12: Creative Coding Patterns

### Skills
- Perlin/Simplex noise for organic motion
- Particle systems (GPU via compute / CPU)
- Flow fields, boids, flocking
- Spring physics (Hooke's law) for UI
- Verlet integration for cloth/rope
- Signed Distance Fields for collision
- Audio reactivity (Web Audio API → analyser → uniforms)

### Exercises
1. **Noise Playground** — 2D/3D/4D noise visualizer, parameter tweaking.
2. **GPU Particles** — Compute shader (WebGL2) or ping-pong FBO for 100k+ particles.
3. **Spring UI** — Draggable card with spring return, configurable stiffness/damping.
4. **Audio Visualizer** — Frequency bars, waveform, circular EQ.
5. **Cloth Simulation** — Verlet grid, wind, gravity, tear on click.

### Deliverable
`animation-library/creative/noise.ts`, `animation-library/creative/gpu-particles.ts`, `animation-library/creative/spring.ts`, `animation-library/creative/audio.ts`

---

## STAGE 13: Production Animation Library

### Structure
```
animation-library/
├── css/
│   ├── easing.css
│   ├── animations.css
│   ├── reduced-motion.css
│   └── index.css
├── gsap/
│   ├── core.js
│   ├── scroll-trigger.js
│   ├── text-split.js
│   └── index.js
├── lenis/
│   └── setup.js
├── framer/
│   ├── variants.ts
│   ├── hooks.ts
│   ├── page-transition.tsx
│   └── index.ts
├── motion-one/
│   └── core.js
├── svg/
│   ├── line-draw.js
│   ├── morph.js
│   └── filters.js
├── canvas2d/
│   ├── particles.js
│   └── flow-field.js
├── threejs/
│   ├── setup.ts
│   ├── materials.ts
│   └── post.ts
├── shaders/
│   ├── gradients.glsl
│   ├── distortion.glsl
│   ├── sdf.glsl
│   └── transition.glsl
├── r3f/
│   ├── canvas.tsx
│   ├── hooks.ts
│   └── shader-material.tsx
├── creative/
│   ├── noise.ts
│   ├── gpu-particles.ts
│   ├── spring.ts
│   └── audio.ts
├── utils/
│   ├── reduced-motion.ts
│   ├── performance.ts
│   └── easing.ts
└── index.ts          # Main export, tree-shakable
```

### Each Module Exports
```ts
interface AnimationConfig {
  trigger: 'hover' | 'click' | 'scroll' | 'load' | 'viewport' | 'manual';
  duration: number;           // ms
  easing: string | number[];  // cubic-bezier or GSAP ease
  movement: TransformProps;   // { x, y, scale, rotate, opacity, ... }
  purpose: string;            // 'focus-attention' | 'feedback' | 'transition' | 'delight' | 'state-change'
  performanceCost: 'low' | 'medium' | 'high';  // composite only / paint / layout
  mobileBehavior: 'same' | 'simplified' | 'disabled';
  reducedMotionBehavior: 'disable' | 'instant' | 'simplified';
}
```

---

## STAGE 14: Integration Projects

### Project 1: Landing Page (R3F + GSAP + Lenis)
- Hero: 3D object + text reveal (scroll-driven)
- Features: Stagger cards on scroll
- Testimonials: Horizontal scroll snap
- CTA: Magnetic button
- Performance: < 100ms TTI, 60fps scroll

### Project 2: Case Study Page (Framer Motion + CSS)
- Page transition from listing
- Image galleries with layout animations
- Scroll-reveal sections
- Dark mode toggle with morphing icon

### Project 3: Creative Portfolio (Canvas + Shaders)
- WebGL background (shader)
- Canvas particle cursor trail
- Project cards: hover → 3D tilt (CSS transform)
- Filter: gooey blob on category select

### Project 4: E-commerce Product Page (R3F + GSAP)
- 3D product viewer (orbit, zoom, explode view)
- Color swatches: shader material swap
- Add to cart: spring animation
- Scroll: pinned product + spec reveal

---

## SELF-TEST CHECKLIST

After each stage:
- [ ] Can write custom cubic-bezier from memory for: anticipation, overshoot, elastic, bounce
- [ ] Can debug GSAP timeline in DevTools (GSAP DevTools)
- [ ] Can explain when to use `scrub` vs `toggleActions`
- [ ] Can implement `prefers-reduced-motion` fallback in < 2 min
- [ ] Can profile animation cost (Layout/Paint/Composite) in Performance tab
- [ ] Can write a vertex + fragment shader that uses `time` + `noise`
- [ ] Can optimize Three.js scene: instancing, frustum culling, texture compression
- [ ] Can build a spring system without library

---

## EXIT CRITERIA

Do not proceed until:
1. All 14 stages complete with working demos
2. `animation-library/` published as private npm package (or local workspace)
3. 4 integration projects deployed, Lighthouse 100/100/100/100
4. Can rebuild any stage demo from memory in < 45 minutes
5. `ANIMATION_NOTES.md` documents: decisions, gotchas, browser support, perf data
6. Zero layout-shift animations (CLS = 0)
7. All animations respect `prefers-reduced-motion`
8. Mobile performance tested on 5x CPU throttle (60fps maintained)