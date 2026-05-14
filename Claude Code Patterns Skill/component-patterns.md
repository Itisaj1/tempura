# Panko site — component and code snippets

Supplement to [SKILL.md](SKILL.md). Paste and adapt; keep tokens and motion feel consistent.

## New section checklist

1. Add `<section id="uniqueId" ...>` with `id` matching a slug you will add to nav if it should appear in the header.
2. Wrap the section's main inner content in **`SectionReveal`** (`src/App.tsx`) — `motion.div` with `initial={{ opacity: 0, y: 28 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.12, margin: '0px 0px -12% 0px' }}` so the block animates in **the first time** it enters the viewport and never re-runs when scrolling back.
3. Wrap main content in `max-w-[1840px] mx-auto px-4 md:px-10` (or match sibling sections).
4. Register `id` in `App` scroll effect `sectionIds` array if it should drive the active nav dot.
5. If it needs a nav link, add `{ id: 'uniqueId', label: 'Label' }` to `Navbar` `navItems`.

## Eyebrow + heading (matches About / Work / Pricing)

```tsx
<div className="mb-10">
  <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">
    Section label
  </span>
</div>
```

Dark section (contact): `text-white/55` eyebrow + accent dot span `h-1.5 w-1.5 rounded-full bg-brand-accent`.

## Hero-style accent blobs

Pointer-events-none absolute divs with `blur-3xl`, radial `rgba(0,129,167,...)` — keep opacity restrained; two blobs max unless you have a strong reason.

## Accent period in JSX

```tsx
scale-ups<span className="text-brand-accent">.</span>
```

## motion.form + AnimatePresence success

Pattern in CTA: `AnimatePresence mode="wait" initial={false}` wrapping `{formStatus === 'success' ? <motion.div key="success" ...> : <motion.form key="form" ...>}`.

## EmailJS guard (copy shape)

```ts
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const notifyTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_TO_ME as string | undefined;
const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTO_REPLY as string | undefined;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

if (!serviceId || !notifyTemplateId || !autoReplyTemplateId || !publicKey) {
  // surface friendly error, do not call emailjs
}
```

## Vite env typing

Add keys to `src/vite-env.d.ts` under `interface ImportMetaEnv` whenever you introduce a new `VITE_*` variable.

## Scripts

```bash
npm run dev    # port 3000, host 0.0.0.0
npm run lint   # tsc --noEmit
npm run build  # dist/
```

CI (`.github/workflows/ci.yml`): Node 20, `npm install --no-package-lock`, then lint + build.
