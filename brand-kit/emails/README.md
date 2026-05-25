# Panko Studio — email HTML

Production-ready HTML for [EmailJS](https://www.emailjs.com) templates. Paste the file contents into the EmailJS template editor (Code view).

| File | Use | EmailJS env var |
|------|-----|-----------------|
| [`auto-reply.html`](./auto-reply.html) | Visitor confirmation after contact form | `VITE_EMAILJS_TEMPLATE_AUTO_REPLY` |
| [`studio-notification.html`](./studio-notification.html) | Internal alert to the studio | `VITE_EMAILJS_TEMPLATE_TO_ME` |

## Template variables

Both templates expect the same params sent from the site (`src/App.tsx`):

| Variable | Description |
|----------|-------------|
| `{{fullName}}` | Visitor name |
| `{{company}}` | Company name |
| `{{email}}` | Visitor email |
| `{{topics}}` | Comma-separated focus areas |

## Palette (five colors)

| Token | Hex | Email use |
|-------|-----|-----------|
| Petal | `#FDF0F3` | Outer canvas |
| White | `#FFFFFF` | Visitor card surface |
| Blush | `#F2C4CE` | Card border on white layout |
| Shrimp | `#D4537E` | Accent period, dots, links, CTAs |
| Ink | `#1A1A1A` | Body text; internal card background |

Muted ink text: `rgba(26,26,26,0.65)`. Muted on ink card: `rgba(253,240,243,0.75)`.

## Generic starters

For nurture, proposals, and other one-offs, see [`.cursor/skills/panko-brand/templates.md`](../../.cursor/skills/panko-brand/templates.md) sections 1 and 2.
