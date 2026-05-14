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
Every submission fires **two** emails: a notification to the studio and an
auto-reply confirmation to the visitor. Copy `.env.example` to `.env.local`
and fill in:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_TEMPLATE_TO_ME` — studio notification template
- `VITE_EMAILJS_TEMPLATE_AUTO_REPLY` — visitor auto-reply template

These are read at build time via `import.meta.env` and inlined into the
client bundle — that's expected and safe; EmailJS public keys are designed
to be used from the browser. Restrict the allowed origins on your EmailJS
service to your production domain to prevent abuse.

If the variables are missing at runtime, the form surfaces a friendly
"Email service is not configured" error and does not attempt a request.

## Build & Preview

- Build: `npm run build`
- Preview: `npm run preview`

## Brand kit

Designers and partners: see **[`brand-kit/`](./brand-kit/)** for logos (SVG + PNG), **Outfit** font file, **favicon**, color **JSON/CSS tokens**, and **[`brand-kit/BRAND-GUIDE.md`](./brand-kit/BRAND-GUIDE.md)** (colors, typography, UI patterns, identity summary). Deeper copy/voice lives under `.cursor/skills/panko-brand/`.

## Brand Style Guide (quick reference)

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
