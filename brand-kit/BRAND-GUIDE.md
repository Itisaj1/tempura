# Panko Studio — brand guide

This document describes **visual identity**, **color and type usage**, and **UI patterns** used on the marketing site and in client-facing materials. For deep **voice and tone** plus **email/social/deck templates**, see [`.cursor/skills/panko-brand/`](../.cursor/skills/panko-brand/) in this repository.

---

## 1. Brand identity

| Element | Guideline |
|---------|-----------|
| **Name** | **panko studio** — always lowercase in wordmark and most marketing UI. |
| **Positioning** | Senior **product management and design** for ambitious **AI × B2B** teams — wireframe to release, alongside engineers. |
| **Personality** | Calm, senior, direct. Understated confidence — not hype-agency energy. |
| **Signature mark** | Headlines and the wordmark end with a **period in brand accent** (`#E8899A`) — the “brand-accent period” rhythm. |
| **Canvas** | Default surface is **raw shrimp** (`#FAF0F2`). **White card** (`#FFFFFF`) is for cards and inset panels. |
| **Contrast** | **Warm dark** (`#2C1A08`) for primary type. **Dark plum** (`#3A1A20`) for full-bleed dark sections (footer). **Deep coral** (`#B5384F`) for CTA buttons only. |

The palette is **pink-forward** with a single **golden crust** accent reserved for the AI features service card.

---

## 2. Color system

### Core tokens

| Name | Hex | CSS variable | Role |
|------|-----|--------------|------|
| **Raw shrimp** | `#FAF0F2` | `--color-bg-page` | Page background, inverse text on dark |
| **White card** | `#FFFFFF` | `--color-bg-card` | Cards, elevated surfaces |
| **Dark plum** | `#3A1A20` | `--color-bg-dark` | Footer, wordmark on-dark field |
| **Warm dark** | `#2C1A08` | `--color-text-primary` | Headlines, body, outlined wordmark on light |
| **Plum muted** | `#6B2D3A` | `--color-text-muted` | Eyebrows, secondary labels, muted hierarchy |
| **Pink flesh** | `#E8899A` | `--color-accent` | Accent period, dots, links, underlines, focus rings |
| **Brine blush** | `#F2C4CE` | `--color-accent-light` | Badges, card borders, footer link hover |
| **Deep coral** | `#B5384F` | `--color-accent-dark` | CTA buttons only — never large fills or body text |
| **Golden crust** | `#E8C47A` | `--color-amber-card` | **AI features service card only** |
| **Shiso leaf** | `#4A7C59` | `--color-secondary` | Secondary accent — max **two** uses per page |
| **Daikon mist** | `#D9E8DC` | `--color-secondary-bg` | Soft secondary surfaces |

### Tailwind (marketing site)

Mapped in `src/index.css` `@theme`: `brand-bg`, `brand-card`, `brand-dark`, `brand-ink`, `brand-muted`, `brand-inverse`, `brand-accent`, `brand-accent-light`, `brand-accent-dark`, `brand-amber-card`, `brand-shiso`, `brand-shiso-bg`.

### Rules

1. **Never use `#000000` or `#FFFFFF` as arbitrary brand colors** — white is the card token; warm dark is the darkest text.
2. **Pink flesh** — accents, links, section labels, borders. Not body copy on page background.
3. **Deep coral** — filled CTAs only (hero, nav, pricing Subscribe, collaborate submit).
4. **Golden crust** — exactly one use: AI features service card background.
5. **Shiso leaf** — tags, one secondary cue per section; max two instances per page.
6. **Body copy** — warm dark (`#2C1A08`). Muted: plum (`#6B2D3A`) or warm dark at reduced opacity.

### Accessibility (target pairs)

| Text | Background | Notes |
|------|------------|-------|
| `#2C1A08` | `#FAF0F2` | Body on page — passes AA |
| `#FAF0F2` | `#B5384F` | Button on CTA — passes AA |
| `#FAF0F2` | `#3A1A20` | Inverse on footer — passes AA |
| `#B5384F` | `#F2C4CE` | Badge on light pink — passes AA |
| `#3A1A20` | `#E8C47A` | Dark on amber AI card — passes AA |

### Machine-readable tokens

See [`tokens/colors.json`](./tokens/colors.json) and [`tokens/theme-snippet.css`](./tokens/theme-snippet.css).

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

| File | Background | Text | Period |
|------|------------|------|--------|
| `panko-studio-transparent.svg` | none | `#2C1A08` warm dark | `#E8899A` pink flesh |
| `panko-studio-on-white.svg` | `#FFFFFF` white card | `#2C1A08` | `#E8899A` |
| `panko-studio-on-ink.svg` | `#3A1A20` dark plum | `#FAF0F2` raw shrimp | `#E8899A` |

- **Rasters:** `logos/png/` — same three variants at 256–2048 px width.
- **Favicon:** `site/favicon.svg` — outlined **p** on **dark plum** field, **raw shrimp** letter, **pink flesh** dot (mirrors `public/favicon.svg`).

Regeneration: `python3 logo/build.py` (syncs `brand-kit/logos/` and `public/favicon.svg`). See `logos/README.md`.

---

## 5. UI system (marketing site)

These mirror the live **Vite + React + Tailwind v4** implementation (`src/App.tsx`, `src/index.css`).

### Layout

- **Horizontal padding:** `px-4` mobile, `md:px-10` desktop on sections.
- **Content max width:** `max-w-[1840px] mx-auto` for wide sections; hero copy `max-w-5xl`; contact inner `max-w-3xl`.

### Corners

- **Primary buttons / CTAs:** `rounded-lg`.
- **Cards / tiles:** `rounded-md` with occasional one-corner softening (e.g. featured pricing `rounded-tl-2xl`).
- **Navbar (docked):** ~`12px` radius; frosted card shell.

### Primary CTA (light surfaces)

- Deep coral fill (`#B5384F`), raw shrimp text.
- Focus visible: pink flesh ring.

### Outline CTA

- Border pink flesh; text deep coral or warm dark per context.

### Dark section (footer)

- Background: **dark plum**; copy **raw shrimp** / 60% opacity for labels.
- Top accent rule: 3px pink flesh.

### Collaborate section

- Subtle pink tint over page background; submit uses deep coral.

### Atmosphere

- Soft **pink radial gradients** on the page body.
- No decorative hairline accents on sections or cards.

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
- [x] `tokens/colors.json`, `tokens/theme-snippet.css`
- [x] `README.md` (index) + this `BRAND-GUIDE.md`

---

*Last aligned with repo: pink-forward palette + marketing site. Regenerate logos from `logo/build.py` after any wordmark or color change.*
