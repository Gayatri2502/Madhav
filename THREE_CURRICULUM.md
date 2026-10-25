# CREATIVE 3D WEB DEVELOPMENT CURRICULUM

## Philosophy
Every 3D element must serve: content hierarchy, user understanding, or brand emotion.
No "because it looks cool." Performance is a feature — 60fps on 5x CPU throttle, < 2MB initial load.

---

## STAGE 1: Rotating Cube (Three.js Vanilla)

### Goals
- Scene, Camera, Renderer setup
- Geometry + Material basics
- Animation loop with `requestAnimationFrame`
- Resize handling + DPR control
- Cleanup on unmount

### Requirements
- `BoxGeometry` + `MeshStandardMaterial`
- `PerspectiveCamera` positioned at z=5
- `WebGLRenderer` with `antialias: true`, `alpha: true`
- OrbitControls for inspection
- `clock.getDelta()` for frame-independent rotation
- Handle `window.resize` → update camera aspect + renderer size
- `renderer.dispose()`, `geometry.dispose()`, `material.dispose()` on cleanup

### Performance
- Single draw call
- No shadows, no post-processing
- Target: 60fps on 10-year-old GPU

### Deliverable
`threejs-foundations/01-cube/index.html`

---

## STAGE 2: Interactive Sphere

### Goals
- Material variants (Standard, Physical, Basic)
- Lighting: Directional + Hemisphere + Point
- Raycaster for hover/click
- GSAP for material transitions
- Environment map (HDRI) via `RGBELoader`

### Requirements
- `SphereGeometry` (64, 64) + `MeshPhysicalMaterial`
- HDRI from polyhaven.com (1k, .hdr)
- `DirectionalLight` (sun) + `HemisphereLight` (sky/ground)
- Raycaster on `pointermove` → hover glow (emissiveIntensity tween)
- Click → camera animate to close-up (GSAP + `camera.position.lerp`)
- `mesh.raycast` for precise interaction

### Performance
- 1 mesh, 1 HDRI (compressed .hdr ~200KB)
- No shadows initially
- Target: 60fps mobile

### Deliverable
`threejs-foundations/02-sphere/index.html`

---

## STAGE 3: Particle Field (CPU → GPU)

### Goals
- `Points` + `BufferGeometry` + `PointsMaterial`
- 10,000 particles with position, size, color attributes
- Vertex shader for GPU animation (time uniform)
- `InstancedBufferAttribute` for per-particle variation

### Requirements
- **CPU version**: Update positions in JS loop (baseline)
- **GPU version**: Vertex shader animates `position.y = sin(position.x + time)`
- Attributes: `aOffset`, `aScale`, `aColor`
- `PointsMaterial` with `vertexColors: true`, `sizeAttenuation: true`
- Depth write off for additive blending

### Performance
- CPU: ~10k particles @ 60fps
- GPU: ~100k particles @ 60fps
- Profile with `stats.js`

### Deliverable
`threejs-foundations/03-particles/cpu.html` + `gpu.html`

---

## STAGE 4: Mouse-Reactive Particles

### Goals
- Mouse position → uniform → shader displacement
- Spring physics for smooth following
- `gsap.quickTo()` for 60fps uniform updates
- Trail effect via frame buffer ping-pong (intro to post-processing)

### Requirements
- 50k particles in vertex shader
- Uniform `uMouse` (vec2, normalized -1 to 1)
- Uniform `uTime` for ambient motion
- Fragment: `gl_FragColor = vec4(color, alpha * smoothstep(0.0, 1.0, dist))`
- Mouse attraction: `force = (mouse - pos) * strength / dist^2`
- Velocity damping: `vel *= 0.95`

### Performance
- Single draw call
- Uniform updates only (no buffer writes)
- Target: 60fps 100k particles

### Deliverable
`threejs-foundations/04-mouse-particles/index.html`

---

## STAGE 5: Shader Background (GLSL)

### Goals
- Full-screen quad (`PlaneGeometry` covering view)
- `ShaderMaterial` with custom vertex/fragment
- Noise functions: hash, value, perlin, fbm
- Time-based animation
- Mouse interaction via uniforms

### Requirements
- **Vertex**: Pass `vUv`, `vPosition` (world)
- **Fragment**:
  - `float noise = fbm(p * 2.0 + time * 0.1)`
  - `vec3 color = mix(colA, colB, noise)`
  - Mouse: `float d = length(vUv - mouse); color += glow * smoothstep(0.3, 0.0, d)`
- Gradient palette via `mix()` with 3-4 colors
- `uResolution` for aspect-correct UV

### Performance
- 1 triangle (2 tris), 1 draw call
- Pure GPU, zero JS per frame
- Target: 144fps 4K

### Deliverable
`threejs-foundations/05-shader-bg/index.html` + `shaders/bg.glsl`

---

## STAGE 6: Liquid Distortion (Post-Processing)

### Goals
- `EffectComposer` + `RenderPass` + custom `ShaderPass`
- Displacement map animation
- Chromatic aberration
- Render targets + ping-pong for trails

### Requirements
- **Displacement Shader**:
  - `vec2 uv = vUv + distortion * vec2(sin(vUv.y * 10.0 + time), cos(vUv.x * 10.0 + time))`
  - `vec4 color = texture2D(tDiffuse, uv)`
- **Chromatic Aberration Pass**: Sample R/G/B at offset UVs
- **Trail Pass**: `tPrevious` + `mix(current, previous, 0.95)`
- `EffectComposer` chain: Render → Displacement → Chromatic → Trail → Output

### Performance
- 3-4 full-screen passes
- Half-res render targets for mobile
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`

### Deliverable
`threejs-foundations/06-liquid/index.html` + `shaders/liquid.glsl`

---

## STAGE 7: Glass Object (Transmission + Refraction)

### Goals
- `MeshPhysicalMaterial` with `transmission`, `thickness`, `ior`, `envMapIntensity`
- `TextureLoader` for environment map
- Real-time reflection/refraction
- Caustics via projected texture or shader

### Requirements
- `BoxGeometry` (rounded via `BoxGeometry` + `MeshPhysicalMaterial` or custom SDF)
- `transmission: 1.0`, `thickness: 0.5`, `ior: 1.5`, `roughness: 0.0`, `metalness: 0.0`
- `envMap` from HDRI (prefiltered via `PMREMGenerator`)
- `clearcoat: 1.0`, `clearcoatRoughness: 0.1` for rim
- Caustics: Animated noise texture projected down (`TextureLoader` + `repeat` + `offset` in shader)

### Performance
- Transmission = expensive (screen-space refraction)
- Limit to 1-2 hero objects
- Fallback: `transparent: true`, `opacity: 0.3`, `refractionRatio: 0.98` for mobile

### Deliverable
`threejs-foundations/07-glass/index.html`

---

## STAGE 8: Interactive Product (GLTF + R3F)

### Goals
- `GLTFLoader` + `DRACOLoader` for compressed models
- `useGLTF` from `@react-three/drei`
- Model optimization: draco, ktx2 textures, instancing
- Turntable controls + programmatic camera animation
- Exploded view on scroll

### Requirements
- Load `.glb` (Draco compressed, < 500KB)
- `useGLTF('/model.glb')` → `<primitive object={gltf.scene} />`
- `<OrbitControls enableZoom enablePan enableRotate />`
- `useFrame` for auto-rotate when idle
- ScrollTrigger (GSAP) → `camera.position.lerp(target, 0.1)` per section
- Exploded view: `mesh.position.lerp(explodedPos, progress)`
- Hotspots: `<Html>` overlays on 3D points

### Performance
- Draco compression (70-90% size reduction)
- KTX2 textures (GPU-compressed, mipmapped)
- `mesh.frustumCulled = true`
- `renderer.setAnimationLoop(null)` when tab hidden

### Deliverable
`r3f-foundations/08-product/` (Next.js + R3F)

---

## STAGE 9: 3D Hero Section (R3F + GSAP + Lenis)

### Goals
- Full-screen 3D hero integrated with page scroll
- Lenis smooth scroll + ScrollTrigger.scrollerProxy
- Cinematic camera animation on scroll
- 3D text (Troika / drei Text)
- Particle atmosphere

### Requirements
- `<Canvas>` fixed position, `style={{ position: 'fixed', inset: 0 }}`
- Lenis + `ScrollTrigger.scrollerProxy()` for scroll sync
- Camera path: `camera.position.lerp(path[progress], 0.1)`
- `Text` from drei: `font={fontUrl}`, `anchorX="center"`, `maxWidth={...}`
- Particle system (GPU) as atmosphere
- Scroll sections pin hero, animate camera + object transforms
- `prefers-reduced-motion` → disable Lenis, instant scroll

### Performance
- Hero only mounts when in viewport (`IntersectionObserver`)
- `renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))`
- Particle count scales with DPR
- Target: CLS = 0, LCP < 2.5s

### Deliverable
`r3f-projects/09-hero/` (Next.js app)

---

## STAGE 10: Cinematic 3D Website (Full Integration)

### Architecture
```
app/
├── (marketing)/
│   ├── layout.tsx          # LenisProvider, CanvasProvider
│   ├── page.tsx            # Hero + sections
│   ├── about/page.tsx      # 3D timeline
│   ├── work/page.tsx       # WebGL gallery
│   └── contact/page.tsx    # 3D form
├── components/
│   ├── canvas/
│   │   ├── HeroScene.tsx
│   │   ├── AboutScene.tsx
│   │   ├── GalleryScene.tsx
│   │   └── ContactScene.tsx
│   ├── ui/
│   │   ├── MagneticButton.tsx
│   │   └── PageTransition.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── animations.ts       # GSAP timelines
│   ├── shaders/            # .glsl files
│   └── three/
│       ├── materials.ts
│       ├── postprocessing.ts
│       └── loaders.ts
└── hooks/
    ├── useScroll.ts
    └── useReducedMotion.ts
```

### Scenes

**Hero** — Shader background + 3D product floating + text reveal (GSAP ScrollTrigger)
**About** — 3D timeline: scroll → camera moves along path, cards fade in
**Work** — WebGL gallery: hover → enlarge, click → fullscreen 3D case study
**Contact** — 3D form: inputs as floating panels, submit → particle explosion

### Tech Stack
- Next.js 15 (App Router)
- React Three Fiber + Drei
- GSAP + ScrollTrigger + Lenis
- Framer Motion (page transitions)
- Tailwind CSS (UI layer)
- TypeScript strict

### Performance Budget
| Metric | Target |
|--------|--------|
| Initial JS | < 150KB gzipped |
| Total load | < 2MB |
| LCP | < 2.5s |
| TTI | < 3.5s |
| FPS (scroll) | 60fps @ 5x CPU throttle |
| CLS | 0 |
| Memory | < 100MB |

### Optimization Checklist
- [ ] Dynamic import heavy scenes (`next/dynamic` + `ssr: false`)
- [ ] Preload critical assets (`<link rel="preload" as="fetch" crossorigin>`)
- [ ] DRACO + KTX2 for all models
- [ ] Texture atlasing for UI icons
- [ ] `renderer.info` monitoring in dev
- [ ] `stats.js` in debug mode
- [ ] Lighthouse CI in GitHub Actions
- [ ] Bundle analyzer (`@next/bundle-analyzer`)

### Deliverable
`cinematic-3d-site/` — Deployed to Vercel, Lighthouse 100/100/100/100

---

## SHADER LIBRARY (Reusable)

```
shaders/
├── noise/
│   ├── hash.glsl
│   ├── value.glsl
│   ├── perlin.glsl
│   ├── simplex.glsl
│   └── fbm.glsl
├── patterns/
│   ├── voronoi.glsl
│   ├── grid.glsl
│   └── circles.glsl
├── distortion/
│   ├── displacement.glsl
│   ├── chromatic.glsl
│   └── swirl.glsl
├── materials/
│   ├── glass.glsl
│   ├── iridescent.glsl
│   ├── holographic.glsl
│   └── brushed-metal.glsl
├── post/
│   ├── bloom.glsl
│   ├── fxaa.glsl
│   ├── film-grain.glsl
│   └── color-grading.glsl
└── utils/
    ├── easing.glsl
    ├── color.glsl
    └── math.glsl
```

### Import Pattern (R3F)
```tsx
import { createShaderMaterial } from '@react-three/fiber'
import vertex from './shaders/noise/vertex.glsl'
import fragment from './shaders/noise/fragment.glsl'

const NoiseMaterial = createShaderMaterial(
  { vertexShader: vertex, fragmentShader: fragment },
  { uTime: 0, uResolution: [0, 0], uMouse: [0, 0] }
)
```

---

## PERFORMANCE PATTERNS

### 1. Level of Detail (LOD)
```tsx
<LOD>
  <mesh geometry={highPoly} material={mat} distance={0} />
  <mesh geometry={midPoly} material={mat} distance={50} />
  <mesh geometry={lowPoly} material={mat} distance={200} />
</LOD>
```

### 2. InstancedMesh for Repeated Objects
```tsx
const count = 1000
const dummy = new THREE.Object3D()
<instancedMesh args={[geometry, material, count]}>
  {Array.from({ length: count }).map((_, i) => (
    <instance key={i} matrix={dummy.matrix} />
  ))}
</instancedMesh>
```

### 3. Frustum Culling + Bounding Spheres
```ts
mesh.frustumCulled = true
geometry.computeBoundingSphere()
```

### 4. Texture Optimization
- KTX2 (Basis Universal) for all textures
- `generateMipmaps: true`
- `minFilter: LinearMipmapLinearFilter`
- Max 2048px, power-of-2

### 5. Render Target Management
```ts
// Half-res for post passes on mobile
const isMobile = /Mobi|Android/i.test(navigator.userAgent)
const renderTarget = new THREE.WebGLRenderTarget(w, h, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  type: isMobile ? THREE.HalfFloatType : THREE.FloatType,
})
```

### 6. Tab Visibility
```ts
useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden) renderer.setAnimationLoop(null)
    else renderer.setAnimationLoop(animate)
  }
  document.addEventListener('visibilitychange', handleVisibility)
  return () => document.removeEventListener('visibilitychange', handleVisibility)
}, [])
```

---

## SELF-TEST CHECKLIST

After each stage:
- [ ] Can set up Three.js scene from memory in 5 min
- [ ] Can write vertex + fragment shader with noise + mouse
- [ ] Can load GLTF with Draco + KTX2, optimize in gltf-transform
- [ ] Can build EffectComposer chain with 3+ passes
- [ ] Can integrate R3F Canvas with Lenis + ScrollTrigger
- [ ] Can debug GPU memory in DevTools (Memory tab)
- [ ] Can profile frame time: JS vs Render vs GPU
- [ ] Can implement `prefers-reduced-motion` for 3D (disable auto-rotate, instant scroll)

---

## EXIT CRITERIA

Do not proceed until:
1. All 10 stages complete with working demos
2. `shaders/` library documented with uniform specs
3. `threejs-foundations/` + `r3f-foundations/` + `r3f-projects/` + `cinematic-3d-site/` deployed
4. Cinematic site hits performance budget on 5x CPU throttle
5. Can rebuild Stage 1-5 from memory in < 30 min each
6. `THREE_NOTES.md` documents: shader techniques, optimization wins, browser quirks, model pipeline
7. Zero console errors/warnings in production build
8. All 3D content gracefully degrades (static image fallback for no-WGL)