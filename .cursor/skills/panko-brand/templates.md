# Panko Studio — Material Templates

Ready-to-paste starters for the most common Panko-branded assets.
Use these as the **starting frame** — don't rebuild the visual system
from scratch. For the voice rules that govern the *copy* inside, see
[voice-and-tone.md](voice-and-tone.md).

---

## 1. HTML email — petal + white card (visitor-facing)

Use for auto-replies, nurture emails, proposals, follow-ups — anything
sent **to** a visitor or client. Warm tone.

**Production copy:** [`brand-kit/emails/auto-reply.html`](../../../brand-kit/emails/auto-reply.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <title>{{ replace with subject }}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap');
      body { margin: 0; padding: 0; background-color: #FDF0F3; }
      a { color: #D4537E; text-decoration: none; }
      @media (max-width: 620px) {
        .card { padding: 32px 24px !important; }
        .h1 { font-size: 28px !important; line-height: 1.15 !important; }
        .cta { display:block !important; width:100% !important; box-sizing:border-box !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#FDF0F3; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; color:#1A1A1A;">
    <span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden;">
      {{ preheader — one short sentence that surfaces the value }}
    </span>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FDF0F3;">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%;">

            <tr>
              <td style="padding: 0 8px 28px 8px;">
                <span style="font-family:'Outfit','Helvetica Neue',Arial,sans-serif; font-weight:700; font-size:22px; letter-spacing:-0.02em; color:#1A1A1A;">
                  panko studio<span style="color:#D4537E;">.</span>
                </span>
              </td>
            </tr>

            <tr>
              <td class="card" style="background-color:#FFFFFF; border:1px solid #F2C4CE; border-radius:12px; padding: 44px 44px; box-shadow: 0 18px 60px rgba(26,26,26,0.06);">

                <p style="margin:0 0 16px 0; font-family:'Inter',Arial,sans-serif; font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(26,26,26,0.55);">
                  <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background-color:#D4537E; vertical-align:middle; margin-right:10px;"></span>
                  {{ eyebrow — 1-3 words, all-caps }}
                </p>

                <h1 class="h1" style="margin:0 0 18px 0; font-family:'Outfit','Helvetica Neue',Arial,sans-serif; font-weight:700; font-size:36px; line-height:1.1; letter-spacing:-0.02em; color:#1A1A1A;">
                  {{ headline }}<span style="color:#D4537E;">.</span>
                </h1>

                <p style="margin:0 0 14px 0; font-family:'Inter',Arial,sans-serif; font-size:16px; line-height:1.65; color:rgba(26,26,26,0.65);">
                  {{ first paragraph — one idea, two sentences max }}
                </p>

                <p style="margin:0 0 28px 0; font-family:'Inter',Arial,sans-serif; font-size:16px; line-height:1.65; color:rgba(26,26,26,0.65);">
                  {{ optional second paragraph — only if needed }}
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 32px 0;">
                  <tr>
                    <td>
                      <a href="{{ cta_url }}"
                         target="_blank"
                         rel="noopener"
                         class="cta"
                         style="display:inline-block; background-color:#D4537E; color:#FFFFFF; font-family:'Inter',Arial,sans-serif; font-size:15px; font-weight:600; padding:14px 26px; border-radius:8px; text-decoration:none; letter-spacing:0.01em;">
                        {{ cta_label }}
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin:32px 0 6px 0; font-family:'Inter',Arial,sans-serif; font-size:16px; line-height:1.65; color:rgba(26,26,26,0.65);">
                  Talk soon,
                </p>
                <p style="margin:0; font-family:'Outfit','Helvetica Neue',Arial,sans-serif; font-weight:600; font-size:17px; color:#1A1A1A;">
                  The Panko Studio team
                </p>

              </td>
            </tr>

            <tr>
              <td style="padding: 24px 12px 8px 12px; font-family:'Inter',Arial,sans-serif; font-size:12px; color:rgba(26,26,26,0.55); line-height:1.6;">
                {{ context line — e.g. "You're receiving this because you submitted a note on pankostudio.com." }}
              </td>
            </tr>

            <tr>
              <td style="padding: 8px 12px 0 12px; font-family:'Inter',Arial,sans-serif; font-size:12px; color:rgba(26,26,26,0.45);">
                © Panko Studio
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

**Filling rules**
- `subject`: sentence case, ends with a period. Plain period (no color — subject lines are read as plain text).
- `preheader`: one sentence, surfaces the value, never repeats the subject.
- `eyebrow`: 1–3 words, all-caps. e.g. `Message received`, `Quick follow-up`, `Proposal inside`.
- `headline`: one short statement, ends with the accent period.
- `cta_label`: sentence case, action verb. e.g. `Book a discovery call`, `Open the proposal`, `See the case study`.

---

## 2. HTML email — petal + ink card (internal / dramatic)

Use for studio-facing notifications, urgency moments, end-of-engagement
summaries. Higher contrast.

**Production copy:** [`brand-kit/emails/studio-notification.html`](../../../brand-kit/emails/studio-notification.html)

Same skeleton as Template 1 — swap the `<td class="card">` block:

```html
<td class="card" style="background-color:#1A1A1A; border-radius:12px; padding: 44px 44px; box-shadow: 0 24px 70px rgba(26,26,26,0.18);">

  <p style="margin:0 0 16px 0; font-family:'Inter',Arial,sans-serif; font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(253,240,243,0.55);">
    <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background-color:#D4537E; vertical-align:middle; margin-right:10px;"></span>
    {{ eyebrow }}
  </p>

  <h1 class="h1" style="margin:0 0 22px 0; font-family:'Outfit','Helvetica Neue',Arial,sans-serif; font-weight:700; font-size:34px; line-height:1.1; letter-spacing:-0.02em; color:#FFFFFF;">
    {{ headline }}<span style="color:#D4537E;">.</span>
  </h1>

  <p style="margin:0 0 28px 0; font-family:'Inter',Arial,sans-serif; font-size:16px; line-height:1.65; color:rgba(253,240,243,0.75);">
    {{ body }}
  </p>

  <!-- optional recap table: background rgba(253,240,243,0.06); border 1px solid rgba(242,196,206,0.25) -->
  <!-- optional CTA: background #D4537E; color #FFFFFF; border-radius 8px -->

</td>
```

**Body text colors on ink**
- Primary headline: white (`#FFFFFF`)
- Body: `rgba(253,240,243,0.75)` (petal at 75%)
- Eyebrow: `rgba(253,240,243,0.55)`
- Quiet metadata on petal canvas: `rgba(26,26,26,0.55)`

---

## 3. LinkedIn post

```text
{{ HOOK LINE — confident statement, ends in a period }}

{{ PARAGRAPH ONE — one specific observation. 2-4 sentences max. }}

{{ PARAGRAPH TWO (optional) — one more concrete detail or shift. }}

{{ CLOSING LINE (optional) — reflection on the work, not a CTA. }}
```

**Worked example**

> We just wrapped a six-week design partnership with a Series A AI infrastructure team.
>
> The brief was simple: make the platform's first 60 seconds feel earned. We rewrote onboarding, redesigned three core dashboards, and shipped a small design system the engineers can keep extending.
>
> The interesting part was how much of the work was deletion, not addition.

**Rules**
- ~150 words max.
- No emoji decoration.
- No hashtags, or 1–2 relevant tags max (`#productdesign`, `#startups`).
- No "🚀 Excited to announce" opener.
- No "What do you think?" closer.
- No `!`. No em-dashes. Periods only.

---

## 4. Slide deck — title slide

```
Eyebrow (all-caps, Shrimp, 11pt, letter-spaced)
EYEBROW · DATE

Headline (Outfit, 60-80pt, ink, left-aligned)
{{ one short statement }}.   ← period in Shrimp (#D4537E)

Sub-line (Inter, 22pt, ink at 70%, left-aligned)
{{ optional one-line context }}

Footer (Inter, 12pt, ink at 40%, bottom-left)
panko studio.   {{ deck title }}   {{ page }}/{{ total }}
```

## 5. Slide deck — section / content slide

```
Eyebrow (all-caps, Shrimp, 10pt)
SECTION NUMBER · SECTION NAME

Headline (Outfit, 44-56pt, ink, left-aligned)
{{ one idea per slide }}.   ← Shrimp accent period

Body region (Inter, 18-24pt, ink at 80%, left-aligned, 1.5 line-height)
{{ supporting text — two paragraphs max, or 3 bullets max }}

Pull-quote / data slides:
- Number: Outfit, 120-160pt, ink (or Shrimp if it's the focal metric)
- Label: Inter, 18pt, ink at 50%, sentence case
- Example:   3.2×
             activation rate vs. previous flow
```

**Slide deck rules**
- 16:9
- Background: Petal `#FDF0F3`
- One idea per slide
- Left-aligned, no center alignment except on a deliberate "moment" slide
- "Next steps" / "summary" slides flip to ink card (Ink `#1A1A1A` background,
  Petal text), same eyebrow → headline → body rhythm

---

## 6. One-pager / proposal

```
HEADER (Petal canvas, full bleed across top, ~120px tall)
  Top-left:  panko studio.    (Outfit, 16pt)
  Top-right: {{ document title }}  ·  {{ date }}     (Inter, 11pt, ink/40%)

HERO BLOCK
  Eyebrow (Shrimp, 11pt, all-caps):  {{ PROPOSAL / SCOPE / ENGAGEMENT }}
  Headline (Outfit, 40pt, ink):      {{ one sentence }}<Shrimp>.</Shrimp>
  Sub-line (Inter, 18pt, ink/75%):   {{ one sentence }}

SECTION BLOCKS (repeat as needed)
  Section eyebrow (Shrimp dot + label, 11pt, all-caps)
  Section heading (Outfit, 24pt, ink)
  Body (Inter, 15pt, ink/85%, 1.65 line-height, max 2 paragraphs)

SCOPE / PRICING CARDS (White on Petal)
  Wrap each pricing tier in a card:
    Background: #FFFFFF
    Border: 1px solid #F2C4CE (optional)
    Border-radius: 12px
    Padding: 28px
    Shadow: 0 14px 40px rgba(26,26,26,0.06)
    Content: Plan name (Outfit, 20pt)
             Price (Outfit, 32pt)
             3-5 bullet items (Inter, 14pt, ink/80%, with Shrimp dot)

CTA STRIP (bottom of page)
  Single Shrimp CTA:  Book a discovery call →  or  Enquire →
  Or a quiet plain-text fallback:  Reach us at hello@pankostudio.com
```

---

## 7. Case study (long-form, ~400-600 words)

```
EYEBROW
CLIENT — INDUSTRY  ·  ENGAGEMENT TYPE  ·  DURATION

HEADLINE
{{ One-sentence outcome }}<Shrimp>.</Shrimp>

OPENING (2 paragraphs max)
  Paragraph 1: One sentence client framing. One sentence on the problem
               they came in with.
  Paragraph 2: One sentence on what we did. Skip backstory.

RESULTS STRIP (display lines, not prose)
  3.2×    activation rate
  -41%    time-to-first-value
  6 wks   from kickoff to release

THE WORK (3 sub-sections, each with eyebrow + heading + 1-2 paragraphs)
  - What we found
  - What we changed
  - What shipped

LOOKING BACK (1 paragraph, optional pull-quote from client)

CTA STRIP
  panko studio.  ·  Want similar results? Book a discovery call →
```

**Case study rules**
- Open with the outcome, not the timeline
- Embed metrics as standalone display lines, never inline prose
- Avoid before/after carousels in copy — describe the shift in one paragraph
- One specific number, name, or detail per ~150 words

---

## 8. Email subject lines (collection)

Patterns that work in the Panko voice:

| Type | Pattern | Example |
|------|---------|---------|
| Confirmation | "Thanks for reaching out, [Name]." | Thanks for reaching out, Jane. |
| Internal notif | "New inquiry — [Name] ([Company])" | New inquiry — Jane Doe (AcmeCo) |
| Follow-up | "Quick follow-up on [topic]" | Quick follow-up on the AcmeCo brief |
| Proposal | "Proposal for [Company]" | Proposal for AcmeCo |
| Soft nudge | "Still interested?" | Still interested? |
| Project kickoff | "Kicking off [Company]" | Kicking off AcmeCo |
| Wrap | "What we shipped for [Company]" | What we shipped for AcmeCo |

Avoid: exclamation marks, emoji, "RE:" prepending unless it's an actual
reply, all-caps words, "FW:" forwards (just paste cleanly).

---

## 9. CTA labels (collection)

Pre-approved, voice-aligned CTA labels:

- `Book a discovery call →`
- `Open the proposal →`
- `See the case study →`
- `Reply to {{Name}} →`
- `Read the rest →`
- `Enquire →`

Avoid: "Click here", "Learn more", "Get started", "Sign up now", "Don't
miss out".

---

## 10. Sign-off block (universal)

For one-to-one pieces (emails, proposals, project updates):

```text
Talk soon,
The Panko Studio team
```

For broadcast pieces (social posts, public case studies, decks):
omit the sign-off. The wordmark already carries identity.
