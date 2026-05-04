# Panko Studio

A premium product management and design agency marketing site.

## Run Locally

### Prerequisites
- Node.js

### Steps
1. Install dependencies:
   `npm install`
2. Start the dev server:
   `npm run dev`

By default, the site runs at `http://localhost:3000`.

## Environment Variables

This current UI does not require any environment variables.
For future extensions (e.g., Gemini connectivity), see `.env.example`.

## Build & Preview

- Build: `npm run build`
- Preview: `npm run preview`

## Brand Style Guide

### Typography
- Display/headings: `Outfit` (`--font-display`)
- Body/UI text: `Inter` (`--font-sans`)

### Core Colors
- Brand accent: `#0081A7` (`--color-brand-accent`)
- Brand ink: `#0F172A` (`--color-brand-ink`)
- Brand background: `#F7F4EF` (`--color-brand-bg`)

### Interaction Principles
- Primary CTA buttons use high-contrast inversion:
  - Default: white background, dark text
  - Hover: dark background, white text
- Cards and floating surfaces use subtle glass effects (`backdrop-blur`) with soft borders.
- Section highlights use restrained accent gradients/radials for depth without overwhelming readability.

## License

Licensed under the MIT License. See `LICENSE`.
