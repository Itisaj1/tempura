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

The contact form (`CTA` section in `src/App.tsx`) submits via [EmailJS](https://www.emailjs.com).
Copy `.env.example` to `.env.local` and fill in:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

These are read at build time via `import.meta.env` and inlined into the
client bundle — that's expected and safe; EmailJS public keys are designed
to be used from the browser. Restrict the allowed origins on your EmailJS
service to your production domain to prevent abuse.

If the variables are missing at runtime, the form surfaces a friendly
"Email service is not configured" error and does not attempt a request.

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
