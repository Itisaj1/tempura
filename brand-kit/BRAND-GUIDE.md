# Panko Studio — brand guide

This document describes **visual identity**, **color and type usage**, and **UI patterns** used on the marketing site and in client-facing materials. For deep **voice and tone** plus **email/social/deck templates**, see [`.cursor/skills/panko-brand/`](../.cursor/skills/panko-brand/) in this repository.

---

## 1. Brand identity

| Element | Guideline |
|---------|-----------|
| **Name** | **panko studio** — always lowercase in wordmark and most marketing UI. |
| **Positioning** | Senior **product management and design** for ambitious **AI × B2B** teams — wireframe to release, alongside engineers. |
| **Personality** | Calm, senior, direct. Understated confidence — not hype-agency energy. |
| **Signature mark** | Headlines and the wordmark often end with a **period in brand accent** (`#0081a7`) — the “brand-accent period” rhythm. |
| **Canvas** | Default surface is **cream** (`#f7f4ef`), not pure white. White is for **cards** and **inset panels** on cream. |
| **Contrast** | **Ink** (`#0f172a`) for primary type and for **full-bleed dark sections** (e.g. contact). |

---

## 2. Color system

| Token | Hex | Role |
|-------|-----|------|
| **Brand cream** | `#f7f4ef` | Default page background; warm neutral field. |
| **Brand ink** | `#0f172a` | Body text, headlines, nav chrome, dark sections, favicon background. |
| **Brand accent** | `#0081a7` | Single-point emphasis: period after headlines, small dots, primary CTA fills, focus rings, links on cream. |

### Rules

- **Accent is restrained** — one or two focal accents per viewport; avoid large accent fills except intentional hero/atmosphere (soft radials) or **primary CTA** buttons.
- **Muted text on cream** — use ink at **~52–90% opacity** depending on hierarchy (`text-brand-ink/52` … `text-brand-ink/90` in Tailwind terms).
- **On ink (dark)** — use **white** at **~55–90% opacity** for secondary copy; **full white** for primary headings; **accent** for dots and key punctuation.

### Machine-readable tokens

See [`tokens/colors.json`](./tokens/colors.json).

---

## 3. Typography

| Role | Family | Weights (site) | Notes |
|------|--------|-----------------|-------|
| **Display / headlines** | **Outfit** | 300–700 (Google Fonts) | Tight tracking (`tracking-tight` / ~-0.02em). Bold for hero and section titles. |
| **Body / UI** | **Inter** | 300–600 | Comfortable line length; `leading-relaxed` on marketing blurbs. |

**Bundled in this kit:** `fonts/Outfit-Variable.ttf`  
**Inter:** install from Google Fonts (see [`fonts/README.md`](./fonts/README.md)).

**Fallback stack (non-web):** Helvetica Neue / Arial for display; Arial for body.

---

## 4. Wordmark & logo files

- **Wordmark string:** `panko studio.` (lowercase; final period is part of the lockup and is **accent-colored** in brand SVGs).
- **Vectors:** `logos/svg/` — paths outlined from Outfit 700; no live font required.
- **Rasters:** `logos/png/` — transparent, on-white, and on-ink variants at 256–2048 px.
- **Favicon:** `site/favicon.svg` — lowercase **p**, Outfit bold, **ink** square, **cream** glyph (mirrors `public/favicon.svg`).

Regeneration pipeline: `logo/build.py` (see `logos/README.md`).

---

## 5. UI system (marketing site)

These mirror the live **Vite + React + Tailwind v4** implementation (`src/App.tsx`, `src/index.css`). Use as a spec for future pages or design QA.

### Layout

- **Horizontal padding:** `px-4` mobile, `md:px-10` desktop on sections.
- **Content max width:** `max-w-[1840px] mx-auto` for wide sections; hero copy `max-w-5xl`; contact inner `max-w-3xl`.

### Corners (current direction)

- **Primary buttons / CTAs:** `rounded-lg` (not full pills on the site today).
- **Cards / tiles:** `rounded-md` with occasional **one-corner** softening (e.g. `rounded-br-xl`, featured pricing `rounded-tl-2xl`).
- **Navbar (docked):** morphs to ~`12px` radius; slim bar (`py-2`, compact wordmark).

### Primary CTA (light surfaces)

- White fill, **ink** text, **ink/25** border, `rounded-lg`, `font-semibold`.
- Hover: **ink** fill, **white** text.
- Focus visible: **accent** ring at ~45% opacity.

### Dark section (contact)

- Background: **brand ink**; copy **white** / **white/72** for labels.
- Submit / topic chips: contrast-forward; accent for selected topic state.

### Atmosphere

- **No hard geometric wedges** — soft **radial gradients** (accent + ink mist) per section + fixed body radials in CSS.
- **Scroll:** Lenis smooth wheel where `prefers-reduced-motion` is not set.

### Motion

- **Section reveal:** first-time viewport fade + slight `y` (no heavy blur on sections today).
- **Hero:** scroll-linked opacity + `y` on main block; quick blur-in on headline load only.

### Section IDs (nav / scroll spy)

`home`, `about`, `work`, `pricing`, `contact` — keep in sync with header links.

---

## 6. Voice (summary)

Panko sounds like a **senior PM/designer**: clear, warm, never breathless. Short paragraphs, concrete language, **no** emoji stacks or “rocket ship” openers. For full rules and rewrite examples, open **`panko-brand`** skill files: `voice-and-tone.md`, `templates.md`.

---

## 7. File checklist (this folder)

- [x] `fonts/Outfit-Variable.ttf` + `fonts/README.md`
- [x] `logos/svg/*.svg`, `logos/png/*.png`, `logos/README.md`
- [x] `site/favicon.svg`
- [x] `tokens/colors.json`
- [x] `README.md` (index) + this `BRAND-GUIDE.md`

---

*Last aligned with repo: marketing site + Cursor brand skill. Regenerate logos from `logo/` after any wordmark or color change.*
