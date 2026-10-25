# Madhav - Next.js Project

## Project Structure
- Root `package.json` manages all dependencies (Next.js 16, React 19, TypeScript)
- App lives in `madhav/` (App Router)
- Path alias: `@/*` → `./madhav/src/*`
- Level 1 curriculum exercises in `level1/exercises/`

## Commands
Run from root:
```bash
npm run dev      # Start dev server (madhav/)
npm run build    # Production build (madhav/)
npm run start    # Start production server (madhav/)
```

## Tech Stack
- Next.js 16 (App Router)
- React 19 + React Three Fiber (@react-three/fiber, @react-three/drei)
- Tailwind CSS v3 + PostCSS (root config)
- Framer Motion + GSAP for animations
- TypeScript (strict mode, bundler moduleResolution)

## Key Config Files
- `madhav/next.config.js` - Next.js config (reactStrictMode only)
- `madhav/tsconfig.json` - TS config (@/* alias, strict)
- `tailwind.config.js` / `postcss.config.js` - Root level (used by madhav)

## Project Notes
- No lint, test, or typecheck scripts defined
- `madhav/src/app/` uses App Router (layout.tsx, page.tsx per route)
- Components in `madhav/src/components/`
- 3D scenes use React Three Fiber
- Theme system in `madhav/src/themes/` (colors, typography, spacing, breakpoints)
- Sections organized by page in `madhav/src/Sections/`

## Level 1 Curriculum
See `LEVEL_1_CURRICULUM.md` for HTML/CSS foundations exercises (8 exercises, 2 mini-projects, 2 capstone projects) with exit criteria.