---
name: panko-site-code
description: >-
  Applies Panko Studio marketing site code conventions — Vite 6 + React 19
  + TypeScript, Tailwind CSS v4 via @tailwindcss/vite, motion (Framer
  Motion v12) scroll and spring patterns, section layout (px-4 md:px-10,
  max-w-[1840px]), CTA_BUTTON_BASE and button hover inversion, Navbar
  dock/island morph, SectionReveal scroll animations, EmailJS
  dual send, and env vars under VITE_*. Use when editing src/App.tsx,
  src/index.css, vite.config.ts, or when the user says panko site,
  marketing site, header island, contact form, EmailJS, or asks for UI
  changes matching the live site.
---

# Panko Studio — Site Code Patterns

This skill is for **code** in this repo (the marketing site). For copy,
emails, decks, and brand voice, use the **`panko-brand`** skill
(`Claude Branding Skill/` or `.cursor/skills/panko-brand/`).

## Stack (do not swap without a deliberate migration)

| Layer | Choice |
|-------|--------|
| Build | Vite 6, `@vitejs/plugin-react` |
| UI | React 19, TypeScript (`tsc --noEmit` for lint) |
| CSS | Tailwind v4 via `@tailwindcss/vite` — **no** `tailwind.config.js` |
| Theme | `src/index.css` → `@theme { ... }` defines tokens |
| Motion | `motion/react` (not `framer-motion` package name) |
| Icons | `lucide-react` |

## File map

| File | Role |
|------|------|
| `src/App.tsx` | All sections + Navbar, Hero, About, Projects, Pricing, CTA, Footer |
| `src/index.css` | `@import "tailwindcss"`, `@theme` colors/fonts, body gradients, utilities |
| `src/main.tsx` | `createRoot`, `StrictMode` |
| `src/vite-env.d.ts` | `ImportMetaEnv` for `VITE_*` |
| `vite.config.ts` | `react()`, `tailwindcss()`, `@` alias, optional `GEMINI_API_KEY` define |
| `index.html` | Title, meta description |

Parked / not bundled: `src/Testimonials.tsx` (not imported).

## Design tokens (Tailwind)

Defined in `src/index.css` `@theme`:

- `brand-page` `#fdf0f3` (petal)
- `brand-card` `#ffffff` (white)
- `brand-blush` `#f2c4ce` (blush — backgrounds only)
- `brand-shrimp` `#d4537e` (shrimp — interactive)
- `brand-ink` `#1a1a1a` (ink — text + footer bg)
- `font-sans` → Inter, `font-display` → Outfit

Use classes: `bg-brand-page`, `text-brand-ink`, `text-brand-ink/65`, `bg-brand-shrimp`, `font-display`, `font-sans`. Extend the theme by editing `@theme`, not a separate config file.

## Layout rhythm

- **Horizontal padding**: `px-4 md:px-10` on sections (wide canvas).
- **Content max width**: `max-w-[1840px] mx-auto` for full-width sections; Hero text block `max-w-5xl`; contact inner `max-w-3xl`.
- **Section IDs** (must stay in sync with nav + scroll spy): `home`, `about`, `work`, `pricing`, `contact`. Navbar `navItems` and `App` `sectionIds` must match.

## CTAs (reuse constants in `App.tsx`, do not duplicate)

```tsx
const PRIMARY_CTA = '... bg-brand-shrimp text-brand-card ...';
const OUTLINE_CTA = '... border-brand-shrimp text-brand-shrimp bg-transparent ...';
const NAV_CTA_BUTTON = '... bg-brand-shrimp text-brand-page ...';
```

Collaborate submit uses `PRIMARY_CTA`. Footer: `bg-brand-ink text-brand-page`, wordmark `text-brand-card`. AI card: `bg-brand-blush text-brand-shrimp`.

## Motion conventions

- **Scroll-linked**: `useScroll({ target, offset: ['start start', 'end start'] })` + `useTransform` for values bound to scroll.
- **Smooth follow**: `useSpring(rawMotionValue, { stiffness, damping, mass })` on dock progress — current Navbar uses `{ stiffness: 80, damping: 26, mass: 0.55 }`.
- **Micro-interactions**: `whileHover={{ y: -1 }}`, `whileTap={{ scale: 0.98 }}` on CTAs; slightly larger `y` on hero primary if needed.
- **Enter viewport**: `SectionReveal` uses `useInView` + `motion.div` fade/slide; hero uses `whileInView` for headline stagger.

## Navbar island

- `dockProgress` from `useScroll` on `heroRef` (passed from `App`).
- `useWindowWidth()` → `dockedOffset = Math.max(24, (vw - 800) / 2)` for 800px island when docked.
- Shell uses animated `backgroundColor`, `borderColor`, `boxShadow`, `backdropFilter` + `WebkitBackdropFilter` from `useTransform` outputs (transparent at top of page).

## Contact form (EmailJS)

- State machine: `formStatus: 'idle' | 'loading' | 'success' | 'error'`.
- Env: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_TEMPLATE_TO_ME`, `VITE_EMAILJS_TEMPLATE_AUTO_REPLY`.
- `emailjs.send` twice: await notification to studio; fire auto-reply with `.catch` so visitor still sees success if auto-reply fails.
- `templateParams`: `{ fullName, company, email, topics }` only.

## Anti-patterns for this codebase

- Do not add a `tailwind.config.js` — theme lives in CSS.
- Do not import `framer-motion` — use `motion/react`.
- Do not add decorative borders everywhere; prefer shadow + cream/ink contrast (recent product direction).
- Do not break `sectionIds` / section `id` alignment with the Navbar.
- Do not reintroduce sparkle icons on CTAs/footer if removed by design.

## Deeper reference

For copy-paste snippets (Navbar transforms, SectionReveal, radial hero blobs), see [component-patterns.md](component-patterns.md).

## Related skill

- **Brand materials** (copy, email HTML, decks, voice): **`panko-brand`** — `Claude Branding Skill/` or `.cursor/skills/panko-brand/`
