---
name: panko-brand
description: >-
  Generates on-brand Panko Studio materials — marketing and transactional
  emails, LinkedIn and social posts, slide decks, one-pagers, proposals,
  case studies, and any client-facing copy. Captures the studio's visual
  system (cream + ink + accent-blue palette, Outfit/Inter typography, the
  brand-accent period rhythm, restrained accent usage) and its calm,
  senior, direct voice. Use when creating, drafting, editing, or reviewing
  any Panko Studio asset; when the user says "panko", "panko studio",
  "panko brand", "panko voice", "panko style", "on-brand", or names a
  material type (email, post, deck, one-pager, proposal, case study) in
  the context of Panko Studio.
---

# Panko Studio — Brand Materials Skill

This skill teaches the agent how to produce client-facing Panko Studio
materials that match the studio's existing visual system and voice. It
covers **non-code** assets: emails, social posts, decks, one-pagers,
proposals, and case study writing. For code (the marketing site itself),
follow the patterns already in `src/App.tsx` and `src/index.css`.

## Brand at a glance

| | |
|--|--|
| Studio name (wordmark) | `panko studio` — always lowercase |
| Tagline (site) | Design for startups and scale-ups. |
| Lead service line | Product management and design for ambitious AI x B2B teams. |
| Audience | Ambitious AI × B2B teams — founders, product leaders, scale-ups |
| Positioning | Senior product management and design partner. Wireframe-to-release, alongside engineers. |
| Sign-off | The Panko Studio team |

**Wordmark rhythm.** When the wordmark or a headline ends in a period,
that period is rendered in the brand accent blue (`#0081A7`). This is the
signature visual mark — repeat it wherever a headline ends:

> panko studio<span style="color:#0081A7;">.</span>
> Let's collaborate<span style="color:#0081A7;">.</span>
> Transparent investment<span style="color:#0081A7;">.</span>

## Colors

| Token | Hex | Use |
|------|-----|-----|
| Brand cream | `#F7F4EF` | Default canvas. Page, email, slide, one-pager background. |
| Brand ink | `#0F172A` | Body type, headlines, dramatic dark cards/sections. |
| Brand accent | `#0081A7` | Single-point accents: the brand period, eyebrow dots, primary CTA fill, link color. |

**Rules**
- Accent is restrained. One or two focal points per surface, not a fill across large areas. The CTA pill is the one big-area exception.
- Default canvas is cream — not white. White is reserved for content cards layered over cream.
- Use ink (`#0F172A`) as a card or section background when you want dramatic contrast (the contact section on the site, the studio-notification email).
- For "muted" text on cream: `#0F172A` at 60–75% opacity. On ink: white at 65–85%.

## Typography

- **Display / headings**: **Outfit**, weight 500–700, `letter-spacing: -0.02em`, line-height 1.0–1.15.
- **Body / UI**: **Inter**, weight 400–500, line-height 1.55–1.65.

**Fallbacks** (for clients that can't load the brand fonts — email, PPT):
`'Helvetica Neue', Arial, sans-serif` for headlines; `Arial, sans-serif` for body.

**Heading rhythm**: most headlines end with the accent-blue period.
**Alignment**: left by default. Center only inside post-action confirmation
moments (success states, the contact thank-you screen).

## Voice in one sentence

Panko sounds like a senior PM/designer who's been through it — **calm,
direct, and slightly understated**. We do not sound like a hype agency.

For deeper voice guidance, before/after rewrites, and the full do/don't
vocabulary list, see [voice-and-tone.md](voice-and-tone.md).

## Material patterns

Every Panko-produced asset uses these shared moves:

1. **Cream canvas.** Not white.
2. **Wordmark at the top.** `panko studio` with the accent period.
3. **Eyebrow → headline → body.** Eyebrow is 11–12pt, all-caps, letter-spaced, ink at 45% opacity, preceded by a 6×6 accent-blue dot. Headline is Outfit, ends with the accent period, left-aligned.
4. **One idea per paragraph.** Two paragraphs is usually enough per section.
5. **Single accent-blue pill CTA** if a CTA is needed. `border-radius: 999px`, accent fill, white text, sentence-case label + ` →`.
6. **Sign-off.** "Talk soon, / The Panko Studio team" for one-to-one pieces.

For ready-to-paste starters (HTML email, LinkedIn post, slide intro,
one-pager outline), see [templates.md](templates.md).

### Emails

Two layouts in rotation:

- **Cream + white card** — warmer. Use for visitor-facing emails (auto-replies, nurture, follow-ups, proposals).
- **Cream + ink card** — higher contrast. Use for internal notifications, urgency moments, "summary" emails.

Required ingredients in every email:

- Hidden preheader (one short sentence that surfaces the value)
- Wordmark `panko studio.` at the top
- Eyebrow + headline + body inside the card
- A single accent-blue pill CTA (link buttons live inside the card; the footer carries a plain-text fallback link below for clients that strip styling)
- Footer with the receiving-context line ("You're receiving this because…") and "© Panko Studio"

### LinkedIn / social posts

- Max ~150 words, plain text
- Hook line — a confident statement that ends in a period
- 1–2 paragraphs of substance: one specific observation or learning
- Closing line that reflects on the work, not a call to action
- No emoji decoration. No hashtags, or 1–2 relevant tags max
- No "🚀 Excited to announce…" opener

### Slide decks

- 16:9, cream canvas
- Outfit headline 60–80pt, Inter body 18–24pt, left-aligned
- One idea per slide
- Eyebrow (all-caps, 10–11pt, accent-blue) sits above the headline
- Title ends with the accent period
- Subtle accent radial behind the headline only if depth is needed; otherwise flat
- "Summary" or "Next steps" slides may flip to the ink card style for drama

### One-pagers and proposals

- Cream canvas, ink type
- Wordmark top-left, page number top-right
- Eyebrow → heading → body, left-aligned, 1.65 line-height
- Group pricing/scope items into cream-on-cream cards with a soft shadow
- End with a single accent CTA: "Book a discovery call →"

### Case studies

- Open with the outcome, not the timeline
- One-sentence client framing → one-sentence problem → one-sentence intervention → results
- Embed metrics as standalone display lines, not inline prose ("**3.2×** activation rate" on its own row)
- Avoid before/after carousels in copy — describe the shift in one paragraph instead

## Workflow when asked to make a material

When a user asks for any Panko-branded piece, follow these steps:

1. **Pick the right template.** Open [templates.md](templates.md) and start from the closest starter. Paste, don't reinvent.
2. **Lock the visual frame.** Cream canvas. Wordmark at top with the accent period. Eyebrow + headline + body. Headline ends with the accent period. Single accent-blue CTA pill if a CTA exists. Two paragraphs max per section.
3. **Write in the voice.** Short, confident sentences. Plain English. No exclamation marks. No em-dashes. No warm-up paragraphs.
4. **Audit for anti-patterns.** Search the draft for: `excited`, `amazing`, `world-class`, `cutting-edge`, `leverage`, `synergize`, `harness`, `🚀`, `!`, `—`, "I'm thrilled", "What do you think?". Strip whatever snuck in. See [voice-and-tone.md](voice-and-tone.md) for the full list.
5. **Add the accent period.** Wherever a headline ends with a period, that period is `#0081A7`. In HTML/CSS: `<span style="color:#0081A7;">.</span>`. In design tools: select the period glyph and color it manually.
6. **Sign off.** "Talk soon, / The Panko Studio team" for one-to-one pieces. Drop the sign-off on broadcast pieces (social posts) — the wordmark carries identity there.

## Reference

- Living style notes in the site README: `../README.md` → "Brand Style Guide" section
- Site implementation: `../src/App.tsx`, `../src/index.css`
- Email visual examples in production: the auto-reply (`template_wv5ry1n`) and studio-notification (`template_3nq5jyq`) templates in EmailJS
- Voice deep-dive and rewrites: [voice-and-tone.md](voice-and-tone.md)
- Ready-to-paste starters: [templates.md](templates.md)
