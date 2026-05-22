# Panko Studio — logo assets (brand kit copy)

Vector and raster wordmark exports. Wordmark text (`panko studio.`) is outlined to real SVG paths from **Outfit Bold** (700), so the files are **font-independent** and render the same in Figma, Adobe, Keynote, Slides, and browsers.

## Files

### Vectors — `svg/`

| File | Background | Text | Period |
|------|------------|------|--------|
| `panko-studio-transparent.svg` | none | `#2C1A08` warm dark | `#E8899A` pink flesh |
| `panko-studio-on-white.svg` | `#FFFFFF` white card | `#2C1A08` warm dark | `#E8899A` pink flesh |
| `panko-studio-on-ink.svg` | `#3A1A20` dark plum | `#FAF0F2` raw shrimp | `#E8899A` pink flesh |

Canvas is ~6602 × 2180 user units (~3:1). Generous padding for headers and decks.

### Rasters — `png/`

Each variant at **256, 512, 1024, 2048** px width. Favicons also at **16–2048** px square. Filenames include dimensions.

| Width | Typical use |
|-------|-------------|
| 256 px | Slack / Discord avatar, small inline |
| 512 px | Social profile, deck thumbnail |
| 1024 px | Deck mark, header banner |
| 2048 px | Print, retina, large display |

`*-transparent-*` PNGs use a **true alpha** channel (no matte).

## Re-generating (source of truth in repo)

From the **repository root**:

```bash
python3 logo/build.py
```

Copies outputs here automatically. Dependencies: `fontTools`, ImageMagick — see `logo/README.md`.
