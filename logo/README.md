# Panko Studio — logo assets

Vector and raster wordmark and favicon exports. Text is outlined to real
SVG paths from **Outfit Bold** (700), so the files are font-independent
and render identically on any device or in any tool (Figma, Adobe,
Keynote, Google Slides, browsers).

Colors use the **simplified five-color palette** (petal, white, blush, shrimp, ink).

## Files

### Wordmark vectors — `svg/panko-studio-*.svg`

| File | Background | Text | Period |
|------|------------|------|--------|
| `panko-studio-transparent.svg` | none | `#1A1A1A` ink | `#D4537E` shrimp |
| `panko-studio-on-white.svg` | `#FFFFFF` white | `#1A1A1A` ink | `#D4537E` shrimp |
| `panko-studio-on-ink.svg` | `#1A1A1A` ink | `#FDF0F3` petal | `#D4537E` shrimp |

Canvas is 6602 × 2180 user units (~3:1 aspect). The wordmark is
padded with generous breathing room so it can drop into a slide /
header without looking cramped.

### Favicon vectors — `svg/favicon-*.svg`

Square **p** mark with accent dot (matches the live site favicon).

| File | Background | Letter | Dot |
|------|------------|--------|-----|
| `favicon-transparent.svg` | none | `#1A1A1A` ink | `#D4537E` shrimp |
| `favicon-on-white.svg` | `#FFFFFF` white | `#1A1A1A` ink | `#D4537E` shrimp |
| `favicon-on-ink.svg` | `#1A1A1A` ink | `#FDF0F3` petal | `#D4537E` shrimp |

Canvas is 32 × 32 user units.

### Wordmark rasters — `png/panko-studio-*.png`

Each variant exported at four widths. Filenames carry their pixel
dimensions for sorting in Drive.

| Width | Use |
|-------|-----|
| 256 px | Slack / Discord avatar, small inline mark |
| 512 px | Social profile, deck thumbnail |
| 1024 px | Slide deck mark, header banner |
| 2048 px | Print, retina banner, large-format display |

### Favicon rasters — `png/favicon-*.png`

Each variant exported at nine square sizes: **16, 32, 48, 64, 128, 256, 512, 1024, 2048** px.
Use `32x32`–`512x512` for UI and app icons; **`1024x1024`** and **`2048x2048`** for sticker
and print (vector source stays sharp at any scale).

`*-transparent-*.png` files have a true alpha channel (no white
matte) so they composite cleanly over any background.

## Re-generating

If you tweak colors, padding, or weight, edit `build.py` then run from
the repo root:

```bash
python3 logo/build.py
```

This also copies SVGs/PNGs into `brand-kit/logos/` and updates `public/favicon.svg` + `brand-kit/site/favicon.svg`.

Dependencies (one-time):

```bash
pip3 install --user fontTools
brew install imagemagick   # already present on this machine
```

The Outfit variable font lives at `fonts/Outfit-Variable.ttf`
(Open Font License — Google Fonts).
