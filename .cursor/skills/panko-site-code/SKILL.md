---
name: panko-site-code
description: >-
  Applies Panko Studio marketing site code conventions — Vite 6 + React 19
  + TypeScript, Tailwind CSS v4 via @tailwindcss/vite, motion (Framer
  Motion v12) scroll and spring patterns, section layout (px-4 md:px-10,
  max-w-[1840px]), CTA_BUTTON_BASE and button hover inversion, Navbar
  dock/island morph, LoadingLogo clipPath + dot sync, CountUp
  IntersectionObserver, EmailJS dual send, and env vars under VITE_*.
  Use when editing src/App.tsx, src/index.css, vite.config.ts, or when
  the user says panko site, marketing site, header island, loader,
  contact form, EmailJS, or asks for UI changes matching the live site.
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
| `src/App.tsx` | All sections + Navbar, Hero, About, Projects, Pricing, CTA, Footer, loader overlay |
| `src/index.css` | `@import "tailwindcss"`, `@theme` colors/fonts, body gradients, utilities |
| `src/main.tsx` | `createRoot`, `StrictMode` |
| `src/vite-env.d.ts` | `ImportMetaEnv` for `VITE_*` |
| `vite.config.ts` | `react()`, `tailwindcss()`, `@` alias, optional `GEMINI_API_KEY` define |
| `index.html` | Title, meta description |

Parked / not bundled: `src/Testimonials.tsx` (not imported).

## Design tokens (Tailwind)

Defined in `src/index.css` `@theme`:

- `brand-bg` `#faf0f2` (raw shrimp)
- `brand-card` `#ffffff` (white card)
- `brand-dark` `#3a1a20` (dark plum)
- `brand-ink` `#2c1a08` (warm dark)
- `brand-accent` `#e8899a` (pink flesh)
- `brand-accent-dark` `#b5384f` (deep coral — CTAs only)
- `brand-amber-card` `#e8c47a` (golden crust — AI features card only)
- `font-sans` → Inter, `font-display` → Outfit

Use classes: `bg-brand-bg`, `text-brand-ink`, `text-brand-ink/65`, `bg-brand-accent`, `font-display`, `font-sans`. Extend the theme by editing `@theme`, not a separate config file.

## Layout rhythm

- **Horizontal padding**: `px-4 md:px-10` on sections (wide canvas).
- **Content max width**: `max-w-[1840px] mx-auto` for full-width sections; Hero text block `max-w-5xl`; contact inner `max-w-3xl`.
- **Section IDs** (must stay in sync with nav + scroll spy): `home`, `about`, `work`, `pricing`, `contact`. Navbar `navItems` and `App` `sectionIds` must match.

## CTAs (reuse constants in `App.tsx`, do not duplicate)

```tsx
const PRIMARY_CTA =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-brand-accent-dark bg-brand-accent-dark px-6 py-3 font-semibold text-brand-inverse transition-colors hover:bg-brand-accent-dark/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45';

const OUTLINE_CTA =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-brand-accent bg-transparent px-6 py-3 font-semibold text-brand-accent-dark transition-colors hover:bg-brand-accent/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45';

const NAV_CTA_BUTTON =
  'inline-flex items-center justify-center rounded-lg border border-brand-accent-dark bg-brand-accent-dark px-4 py-2 font-semibold text-brand-inverse transition-colors hover:bg-brand-accent-dark/90';
```

Collaborate submit uses `PRIMARY_CTA`. Footer is dark plum with raw shrimp text; link hover `text-brand-accent-light`. AI features card alone uses `bg-brand-amber-card`.

## Motion conventions

- **Scroll-linked**: `useScroll({ target, offset: ['start start', 'end start'] })` + `useTransform` for values bound to scroll.
- **Smooth follow**: `useSpring(rawMotionValue, { stiffness, damping, mass })` on dock progress — current Navbar uses `{ stiffness: 80, damping: 26, mass: 0.55 }`.
- **Micro-interactions**: `whileHover={{ y: -1 }}`, `whileTap={{ scale: 0.98 }}` on CTAs; slightly larger `y` on hero primary if needed.
- **Enter viewport**: `motion.*` with `initial` / `whileInView` / `viewport={{ once: true }}` for section reveals.
- **Loader**: single `useMotionValue` drives **both** `clipPath` on text and `x` on the dot — do not split into two animations or they desync.

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

For copy-paste snippets (Navbar transforms, loader skeleton, CountUp, radial hero blobs), see [component-patterns.md](component-patterns.md).

## Related skill

- **Brand materials** (copy, email HTML, decks, voice): **`panko-brand`** — `Claude Branding Skill/` or `.cursor/skills/panko-brand/`
