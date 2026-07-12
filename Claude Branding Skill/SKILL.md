---
name: panko-brand
description: >-
  Generates on-brand Panko Studio materials — marketing and transactional
  emails, LinkedIn and social posts, slide decks, one-pagers, proposals,
  case studies, and any client-facing copy. Captures the studio's visual
  system (petal + ink + shrimp five-color palette, Outfit/Inter typography,
  the brand-accent period rhythm, restrained blush backgrounds) and its
  calm, senior, direct voice. Use when creating, drafting, editing, or
  reviewing any Panko Studio asset; when the user says "panko", "panko
  studio", "panko brand", "panko voice", "panko style", "on-brand", or
  names a material type (email, post, deck, one-pager, proposal, case
  study) in the context of Panko Studio.
---

# Panko Studio — Brand Materials Skill

This skill teaches the agent how to produce client-facing Panko Studio
materials that match the studio's existing visual system and voice. It
covers **non-code** assets: emails, social posts, decks, one-pagers,
proposals, and case study writing. For code (the marketing site itself),
use the **`panko-site-code`** skill — `Claude Code Patterns Skill/` or
`.cursor/skills/panko-site-code/`.

## Brand at a glance

| | |
|--|--|
| Studio name (wordmark) | `panko studio` — always lowercase |
| Hero headline (site) | Design for startups and scale-ups. |
| Lead service line | Product management and design for ambitious AI x B2B teams. |
| Audience | Ambitious AI × B2B teams — founders, product leaders, scale-ups |
| Positioning | Senior product management and design partner. Wireframe-to-release, alongside engineers. |
| Primary CTA label | Let's chat / Enquire |
| Contact section headline | Let's collaborate. |
| Sign-off | The Panko Studio team |

**Wordmark rhythm.** When the wordmark or a headline ends in a period,
that period is rendered in **Shrimp** (`#D4537E`). This is the
signature visual mark — repeat it wherever a headline ends:

> panko studio<span style="color:#D4537E;">.</span>
> Let's collaborate<span style="color:#D4537E;">.</span>
> Transparent investment<span style="color:#D4537E;">.</span>
> Selected work<span style="color:#D4537E;">.</span>

## Colors (five only)

| Token | Hex | Use |
|------|-----|-----|
| Petal | `#FDF0F3` | Page canvas. Footer body text. Nav CTA label on Shrimp. |
| White | `#FFFFFF` | Cards. Primary CTA text. Footer wordmark. |
| Blush | `#F2C4CE` | Backgrounds only — badges, borders, AI card, section tints. |
| Shrimp | `#D4537E` | Accent period, CTAs, links, interactive states, eyebrow dots. |
| Ink | `#1A1A1A` | All text. Footer background. |

**Rules**
- Exactly five colors — no browns, ambers, greens, teals, or legacy blues.
- Shrimp for all interactive accents; Blush for backgrounds only (never Blush text).
- Body copy: Ink. Muted: Ink at 60–65% opacity. On footer: Petal at 55–88% for secondary lines.
- Do not use pure black (`#000000`) or legacy cream (`#F7F4EF`) / accent blue (`#0081A7`).

Machine-readable tokens: `brand-kit/tokens/colors.json`, `brand-kit/tokens/theme-snippet.css`.

## Typography

- **Display / headings**: **Outfit**, weight 500–700, `letter-spacing: -0.02em`, line-height 1.0–1.15.
- **Body / UI**: **Inter**, weight 400–500, line-height 1.55–1.65.

**Fallbacks** (for clients that can't load the brand fonts — email, PPT):
`'Helvetica Neue', Arial, sans-serif` for headlines; `Arial, sans-serif` for body.

**Heading rhythm**: most headlines end with the Shrimp period.
**Alignment**: left by default. Center only inside post-action confirmation
moments (success states, the contact thank-you screen).

## Voice in one sentence

Panko sounds like a senior PM/designer who's been through it — **calm,
direct, and slightly understated**. We do not sound like a hype agency.

For deeper voice guidance, before/after rewrites, and the full do/don't
vocabulary list, see [voice-and-tone.md](voice-and-tone.md).

## Material patterns

Every Panko-produced asset uses these shared moves:

1. **Petal canvas.** Not white. White is for cards layered on Petal.
2. **Wordmark at the top.** `panko studio` with the Shrimp accent period.
3. **Headline → body.** Eyebrows are optional in emails and decks (11–12pt, all-caps, letter-spaced, ink at 45–55% opacity, preceded by a 6×6 Shrimp dot). The marketing site no longer uses section eyebrows above About or Pricing — lead with the headline instead.
4. **One idea per paragraph.** Two paragraphs is usually enough per section.
5. **Single Shrimp CTA** if a CTA is needed. Site: `rounded-lg`, Shrimp fill, White text, sentence-case label. Email: Shrimp fill, White text, `border-radius: 8px` (production auto-reply).
6. **Sign-off.** "Talk soon, / The Panko Studio team" for one-to-one pieces.

For ready-to-paste starters (HTML email, LinkedIn post, slide intro,
one-pager outline), see [templates.md](templates.md).

### Emails

Two layouts in rotation:

- **Petal + white card** — warmer. Use for visitor-facing emails (auto-replies, nurture, follow-ups, proposals).
- **Petal + ink card** — higher contrast. Use for internal notifications, urgency moments, "summary" emails.

Required ingredients in every email:

- Hidden preheader (one short sentence that surfaces the value)
- Wordmark `panko studio.` at the top
- Eyebrow + headline + body inside the card
- A single Shrimp CTA (link buttons live inside the card; the footer carries a plain-text fallback link below for clients that strip styling)
- Footer with the receiving-context line ("You're receiving this because…") and "© Panko Studio"

Production HTML: `brand-kit/emails/auto-reply.html`, `brand-kit/emails/studio-notification.html`.

### LinkedIn / social posts

- Max ~150 words, plain text
- Hook line — a confident statement that ends in a period
- 1–2 paragraphs of substance: one specific observation or learning
- Closing line that reflects on the work, not a call to action
- No emoji decoration. No hashtags, or 1–2 relevant tags max
- No "🚀 Excited to announce…" opener

### Slide decks

- 16:9, Petal canvas (`#FDF0F3`)
- Outfit headline 60–80pt, Inter body 18–24pt, left-aligned
- One idea per slide
- Eyebrow (all-caps, 10–11pt, Shrimp) sits above the headline when used
- Title ends with the Shrimp accent period
- Subtle pink radial behind the headline only if depth is needed; otherwise flat
- "Summary" or "Next steps" slides may flip to the ink card style for drama

### One-pagers and proposals

- Petal canvas, Ink type
- Wordmark top-left, page number top-right
- Eyebrow → heading → body, left-aligned, 1.65 line-height
- Group pricing/scope items into White cards on Petal with a soft shadow
- End with a single Shrimp CTA: "Book a discovery call →" or "Enquire →"

### Case studies

- Open with the outcome, not the timeline
- One-sentence client framing → one-sentence problem → one-sentence intervention → results
- Embed metrics as standalone display lines, not inline prose ("**3.2×** activation rate" on its own row)
- Work tiles on the site: preview image, optional category tag (e.g. "Web design"), title, subtitle, link to live site
- Avoid before/after carousels in copy — describe the shift in one paragraph instead

### Pricing copy (current site)

**Subscribe — $9,000/month**
- Headline: You need senior product design talent embedded in your team, on demand.
- Bullets: UI & product design; Design systems; UX flows & wireframes; Dev-ready hand-off; Async, embedded in your rituals
- Close: We plug into your standups, critiques, and reviews, so design keeps pace with your roadmap instead of sitting in a queue.

**Fixed — Enquire**
- Headline: Design your core product from the ground up in 6–8 weeks.
- Bullets: Wireframes & UX flows; Design system; High-fidelity UI; Dev-ready prototypes
- Close: Research-first (competitor teardowns, user flows), then annotated component-based handoff engineers can build from.

## Workflow when asked to make a material

When a user asks for any Panko-branded piece, follow these steps:

1. **Pick the right template.** Open [templates.md](templates.md) and start from the closest starter. Paste, don't reinvent.
2. **Lock the visual frame.** Petal canvas. Wordmark at top with the Shrimp accent period. Headline + body (eyebrow optional). Headline ends with the Shrimp period. Single Shrimp CTA if a CTA exists. Two paragraphs max per section.
3. **Write in the voice.** Short, confident sentences. Plain English. No exclamation marks. No em-dashes. No warm-up paragraphs.
4. **Audit for anti-patterns.** Search the draft for: `excited`, `amazing`, `world-class`, `cutting-edge`, `leverage`, `synergize`, `harness`, `🚀`, `!`, `—`, "I'm thrilled", "What do you think?". Strip whatever snuck in. See [voice-and-tone.md](voice-and-tone.md) for the full list.
5. **Add the accent period.** Wherever a headline ends with a period, that period is `#D4537E`. In HTML/CSS: `<span style="color:#D4537E;">.</span>`. In design tools: select the period glyph and color it Shrimp.
6. **Sign off.** "Talk soon, / The Panko Studio team" for one-to-one pieces. Drop the sign-off on broadcast pieces (social posts) — the wordmark carries identity there.

## Reference

- **Site code patterns** (React, Tailwind, motion, EmailJS): **`panko-site-code`** — `Claude Code Patterns Skill/` or `.cursor/skills/panko-site-code/`
- Brand guide: `brand-kit/BRAND-GUIDE.md`
- Site implementation: `src/App.tsx`, `src/index.css`
- Email visual examples: `brand-kit/emails/auto-reply.html`, `brand-kit/emails/studio-notification.html`
- Voice deep-dive and rewrites: [voice-and-tone.md](voice-and-tone.md)
- Ready-to-paste starters: [templates.md](templates.md)
