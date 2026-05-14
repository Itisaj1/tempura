# Panko Studio — brand kit

Single place for **logos**, **fonts**, **site tokens**, **favicon**, and the **brand guide**. Regenerated wordmarks still live under `logo/` (`python3 logo/build.py`); this folder is the handoff bundle for design tools, partners, and marketing.

| Path | Contents |
|------|----------|
| [BRAND-GUIDE.md](./BRAND-GUIDE.md) | Colors, typography, UI patterns, voice summary, wordmark rules |
| `fonts/` | **Outfit** variable (OFL). Inter: see `fonts/README.md` |
| `logos/svg/` | Wordmark SVGs (path-outlined, font-independent) |
| `logos/png/` | Raster exports (256–2048 px widths) |
| `logos/README.md` | File matrix and re-export instructions |
| `site/favicon.svg` | Tab icon: ink field, cream “p”, Outfit (copy of `public/favicon.svg`) |
| `tokens/colors.json` | Hex tokens for tooling / Figma |

Canonical **voice**, **templates**, and **copy patterns** remain in [`.cursor/skills/panko-brand/`](../.cursor/skills/panko-brand/) (Cursor skill). Site implementation patterns: [`.cursor/skills/panko-site-code/`](../.cursor/skills/panko-site-code/).
