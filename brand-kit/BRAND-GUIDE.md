# Panko Studio — brand guide

This document describes **visual identity**, **color and type usage**, and **UI patterns** used on the marketing site and in client-facing materials. For deep **voice and tone** plus **email/social/deck templates**, see [`.cursor/skills/panko-brand/`](../.cursor/skills/panko-brand/) in this repository.

---

## 1. Brand identity

| Element | Guideline |
|---------|-----------|
| **Name** | **panko studio** — always lowercase in wordmark and most marketing UI. |
| **Positioning** | Senior **product management and design** for ambitious **AI × B2B** teams — wireframe to release, alongside engineers. |
| **Personality** | Calm, senior, direct. Understated confidence — not hype-agency energy. |
| **Signature mark** | Headlines and the wordmark end with a **period in Shrimp** (`#D4537E`) — the “brand-accent period” rhythm. |
| **Palette** | Exactly **five colors** — no browns, ambers, greens, or teals. |

---

## 2. Color system

| Name | Hex | CSS variable | Role |
|------|-----|--------------|------|
| **Petal** | `#FDF0F3` | `--color-bg-page` | Page background; footer body text; nav CTA label |
| **White** | `#FFFFFF` | `--color-bg-card` | Cards; primary CTA text; footer wordmark |
| **Blush** | `#F2C4CE` | `--color-accent-light` | Backgrounds only — badges, borders, AI card, section tints |
| **Shrimp** | `#D4537E` | `--color-accent` | Interactive — buttons, links, accents, focus rings |
| **Ink** | `#1A1A1A` | `--color-dark` | All text; footer background |

### Tailwind (marketing site)

Mapped in `src/index.css` `@theme`: `brand-page`, `brand-card`, `brand-blush`, `brand-shrimp`, `brand-ink`.

### Rules

1. **Five colors only** — if you need a sixth, use opacity on Ink or Petal, or pick the closest of the five.
2. **Shrimp** — all interactive elements (CTAs, links, active nav, accent periods).
3. **Blush** — backgrounds only; never for text.
4. **Ink** — all body and headline text; footer fill. Not pure `#000000`.
5. **Muted copy** — Ink at 60–65% opacity (`text-brand-ink/60`).

### Machine-readable tokens

See [`tokens/colors.json`](./tokens/colors.json) and [`tokens/theme-snippet.css`](./tokens/theme-snippet.css).

---

## 3. Typography

| Role | Family | Weights (site) | Notes |
|------|--------|-----------------|-------|
| **Display / headlines** | **Outfit** | 300–700 (Google Fonts) | Tight tracking. Bold for hero and section titles. |
| **Body / UI** | **Inter** | 300–600 | `leading-relaxed` on marketing blurbs. |

**Bundled:** `fonts/Outfit-Variable.ttf` — **Inter:** Google Fonts (see [`fonts/README.md`](./fonts/README.md)).

---

## 4. Wordmark & logo files

| File | Background | Text | Period |
|------|------------|------|--------|
| `panko-studio-transparent.svg` | none | `#1A1A1A` ink | `#D4537E` shrimp |
| `panko-studio-on-white.svg` | `#FFFFFF` | `#1A1A1A` | `#D4537E` |
| `panko-studio-on-ink.svg` | `#1A1A1A` | `#FDF0F3` petal | `#D4537E` |

Regeneration: `python3 logo/build.py` (syncs `brand-kit/logos/` and `public/favicon.svg`).

---

## 5. UI system (marketing site)

Mirrors `src/App.tsx` and `src/index.css`.

- **Page:** Petal canvas with soft pink radial atmosphere.
- **CTAs:** Shrimp fill, White text; outline variant Shrimp border + Shrimp text.
- **Footer:** Ink background, Petal text, White wordmark, 3px Shrimp top rule.
- **AI features card:** Blush background, Shrimp title text.

### Section IDs

`home`, `about`, `work`, `pricing`, `contact`

---

## 6. Voice (summary)

Senior PM/designer tone — clear, warm, no hype. See **`panko-brand`** skill: `voice-and-tone.md`, `templates.md`.

---

*Regenerate logos from `logo/build.py` after any wordmark or color change.*
