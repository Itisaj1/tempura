# Panko Studio — brand guide

This document describes **visual identity**, **color and type usage**, and **UI patterns** used on the marketing site and in client-facing materials. For deep **voice and tone** plus **email/social/deck templates**, see [`.cursor/skills/panko-brand/`](../.cursor/skills/panko-brand/) in this repository.

---

## 1. Brand identity

| Element | Guideline |
|---------|-----------|
| **Name** | **panko studio** — always lowercase in wordmark and most marketing UI. |
| **Positioning** | Senior **product management and design** for ambitious **AI × B2B** teams — wireframe to release, alongside engineers. |
| **Personality** | Calm, senior, direct. Understated confidence — not hype-agency energy. |
| **Signature mark** | Headlines and the wordmark end with a **period in brand accent** (`#C97C2E`) — the “brand-accent period” rhythm. |
| **Canvas** | Default surface is **pale batter** (`#F5E6C8`), not pure white. **Rice paper** (`#FFF8F0`) is for cards and inset panels on batter. |
| **Contrast** | **Warm dark** (`#2C1A08`) for primary type. **Espresso** (`#3A2410`) for full-bleed dark sections (contact, footer, nav CTA). |

The palette is derived from **shrimp tempura batter** — creamy, golden, and warm — so “panko” reads intentional, not generic SaaS neutral.

---

## 2. Color system

### Core tokens

| Name | Hex | CSS variable | Role |
|------|-----|--------------|------|
| **Pale batter** | `#F5E6C8` | `--color-bg-page` | Page background, inverse text on dark |
| **Rice paper** | `#FFF8F0` | `--color-bg-card` | Cards, elevated surfaces, button text on accent |
| **Espresso** | `#3A2410` | `--color-bg-dark` | Dark sections, nav “Book call”, wordmark on-dark field |
| **Warm dark** | `#2C1A08` | `--color-text-primary` | Headlines, body, outlined wordmark on light |
| **Soy dip** | `#8B4513` | `--color-text-muted` | Eyebrows, secondary labels, muted hierarchy |
| **Deep fry** | `#C97C2E` | `--color-accent` | Accent period, dots, primary CTAs, focus rings, links |
| **Golden crust** | `#E8C47A` | `--color-accent-light` | Featured tiles, “Most popular” badges, footer link hover |
| **Shrimp blush** | `#F47B5A` | `--color-accent-pop` | Small pops only (icons, micro-badges) — not large fills |
| **Shiso leaf** | `#4A7C59` | `--color-secondary` | Secondary accent — max **two** uses per page |
| **Daikon mist** | `#D9E8DC` | `--color-secondary-bg` | Soft secondary surfaces |

### Tailwind (marketing site)

Mapped in `src/index.css` `@theme`: `brand-bg`, `brand-card`, `brand-dark`, `brand-ink`, `brand-muted`, `brand-inverse`, `brand-accent`, `brand-accent-light`, `brand-pop`, `brand-shiso`, `brand-shiso-bg`.

### Rules

1. **Never use `#000000` or `#FFFFFF` as brand colors.** Pure black/white break the warm system (SVG export uses rice paper / espresso instead).
2. **Deep fry is for interactive/accent only** — CTAs, links, active states, accent periods. Not large background fields.
3. **Shiso leaf** — tags, one secondary cue per section; max two instances per page.
4. **Shrimp blush** — small pops only; do not pair with shiso in the same section.
5. **Body copy on batter** — use warm dark (`#2C1A08`), not deep fry (contrast fails at small sizes).
6. **Muted copy** — soy dip (`#8B4513`) or warm dark at reduced opacity (`text-brand-ink/75`).

### Accessibility (target pairs)

| Text | Background | Notes |
|------|------------|-------|
| `#2C1A08` | `#F5E6C8` | Body on page — passes AA |
| `#2C1A08` | `#FFF8F0` | Body on card — passes AA |
| `#F5E6C8` | `#3A2410` | Inverse on dark — passes AA |
| `#FFF8F0` | `#C97C2E` | Button on accent — passes AA |
| `#3A2410` | `#E8C47A` | Dark on golden featured tile — passes AA |

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
| `panko-studio-transparent.svg` | none | `#2C1A08` warm dark | `#C97C2E` deep fry |
| `panko-studio-on-white.svg` | `#FFF8F0` rice paper | `#2C1A08` | `#C97C2E` |
| `panko-studio-on-ink.svg` | `#3A2410` espresso | `#F5E6C8` pale batter | `#C97C2E` |

- **Rasters:** `logos/png/` — same three variants at 256–2048 px width.
- **Favicon:** `site/favicon.svg` — outlined **p** on **espresso** field, **pale batter** letter, **deep fry** dot (mirrors `public/favicon.svg`).

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
- **Navbar (docked):** ~`12px` radius; frosted rice-paper shell.

### Primary CTA (light surfaces)

- Rice paper fill, warm dark text, subtle border.
- Hover: espresso fill, pale batter text.
- Focus visible: deep fry ring.

### Dark section (contact + footer)

- Background: **espresso**; copy **pale batter** / reduced opacity for labels.
- Submit: deep fry fill, rice paper text.

### Atmosphere

- Soft **warm radial gradients** on the page body (accent + warm dark mist).
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

*Last aligned with repo: warm tempura palette + marketing site. Regenerate logos from `logo/build.py` after any wordmark or color change.*
