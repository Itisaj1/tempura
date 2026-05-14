# Fonts

## Outfit (display / wordmark)

- **File:** `Outfit-Variable.ttf` (variable, SIL Open Font License 1.1).
- **Use:** Headlines, wordmark generation (`logo/build.py`), favicon glyph.
- **On the marketing site:** `font-display` / “Outfit”, weights **300–700** loaded via [Google Fonts](https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap).

## Inter (body / UI)

- **Not vendored here** (keeps the kit smaller; Inter is also OFL).
- **On the marketing site:** `font-sans` / “Inter”, weights **300–600** via [Google Fonts](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap).
- **To install locally:** download the family from [Google Fonts — Inter](https://fonts.google.com/specimen/Inter) or use `npm i @fontsource-variable/inter` in a project.

## Fallbacks (email, slides, restrictive clients)

- Headlines: `'Helvetica Neue', Arial, sans-serif`
- Body: `Arial, sans-serif`

## Licenses

Both families are **SIL Open Font License**. Keep the OFL license text with any font files you redistribute.
