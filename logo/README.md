# Panko Studio — logo assets

Vector and raster wordmark exports. Wordmark text (`panko studio.`) is
outlined to real SVG paths from **Outfit Bold** (700), so the files are
font-independent and render identically on any device or in any tool
(Figma, Adobe, Keynote, Google Slides, browsers).

## Files

### Vectors — `svg/`

| File | Background | Text | Period |
|------|------------|------|--------|
| `panko-studio-transparent.svg` | none | `#0F172A` ink | `#0081A7` accent |
| `panko-studio-on-white.svg` | `#FFFFFF` | `#0F172A` ink | `#0081A7` accent |
| `panko-studio-on-ink.svg` | `#0F172A` brand ink | `#F7F4EF` cream | `#0081A7` accent |

Canvas is 6602 × 2180 user units (~3:1 aspect). The wordmark is
padded with generous breathing room so it can drop into a slide /
header without looking cramped.

### Rasters — `png/`

Each variant exported at four widths. Filenames carry their pixel
dimensions for sorting in Drive.

| Width | Use |
|-------|-----|
| 256 px | Slack / Discord avatar, small inline mark |
| 512 px | Social profile, deck thumbnail |
| 1024 px | Slide deck mark, header banner |
| 2048 px | Print, retina banner, large-format display |

`*-transparent-*.png` files have a true alpha channel (no white
matte) so they composite cleanly over any background.

## Re-generating

If you tweak colors, padding, or weight, edit `build.py` then run from
the repo root:

```bash
python3 logo/build.py
```

Dependencies (one-time):

```bash
pip3 install --user fontTools
brew install imagemagick   # already present on this machine
```

The Outfit variable font lives at `fonts/Outfit-Variable.ttf`
(Open Font License — Google Fonts).
