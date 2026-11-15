# AYODEX Labs — V2 design specification

Phase 2 working document. It records the decisions the implementation follows, so
later edits stay inside the same system rather than drifting.

---

## 1. Typography

Two pairings were considered. Both meet the brief's constraint of one interface
face plus at most one display face, loaded through `next/font` with only the
weights used.

### Pairing A — Instrument Serif + Manrope **(chosen)**

- **Display:** Instrument Serif, 400 only, roman + italic. A high-contrast
  transitional serif with narrow, elegant capitals. At large sizes it reads as
  editorial rather than decorative, and the italic gives a single useful accent
  for a phrase inside a headline.
- **Interface:** Manrope, 400/500/600/700. Geometric-humanist, tall x-height,
  slightly open apertures — stays legible at 13–15px in labels, forms and dense
  metadata.
- **Character:** warm and literary on the surface, technical underneath. The
  serif carries personality; the grotesk stays out of the way.
- **Risk:** Instrument Serif is high contrast, so it is never used below 1.5rem
  and never for body copy.

### Pairing B — Instrument Serif + DM Sans

- **Interface:** DM Sans, 400/500/700. Rounder, more geometric, friendlier.
- **Character:** softer and more product-like; reads a little younger.
- **Trade-off:** DM Sans's rounder shapes fight the serif's sharp terminals
  slightly, and its smaller x-height is less comfortable in 12–13px labels.
  Strong option, but less coherent with a restrained luxury direction.

### Resulting scale

| Role | Face | Size | Line height | Tracking |
|---|---|---|---|---|
| Display (h1) | Instrument Serif 400 | `clamp(2.3rem, 7.6vw, 5.1rem)` | 1.0 | -0.02em |
| Section display | Instrument Serif 400 | `clamp(1.75rem, 3.4vw, 2.85rem)` | 1.06 | -0.015em |
| Sub-heading | Instrument Serif 400 | `clamp(1.35rem, 2.2vw, 1.8rem)` | 1.18 | -0.01em |
| Lede | Manrope 400 | `clamp(1.02rem, 1.3vw, 1.15rem)` | 1.62 | 0 |
| Body | Manrope 400 | 1rem | 1.65 | 0 |
| Small / meta | Manrope 500 | 0.8125–0.875rem | 1.55 | 0 |
| Eyebrow | Manrope 600 | 0.7rem | 1.4 | 0.16em, uppercase |

Rules: no more than three weights visible in one viewport; body never below
0.8rem; no heading above 1.15 line height; text measure capped at 62ch.

---

## 2. Colour

Warm, paper-first, no blue, no gold, no neon.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#fbfaf6` | page background |
| `--ivory` | `#f3efe6` | alternating section bands, footer |
| `--ivory-deep` | `#ece7db` | portrait plate, hovers |
| `--stone` | `#e3ded2` | dividers on plates, OG artwork |
| `--ink` | `#1a1916` | text, buttons, inverted panels |
| `--ink-soft` | `#34322c` | long-form body copy |
| `--muted` | `#6d685d` | secondary copy (7.0:1 on paper) |
| `--muted-soft` | `#8b8578` | micro-metadata only (never body) |
| `--line` | `rgba(26,25,22,.12)` | hairlines |
| `--line-strong` | `rgba(26,25,22,.28)` | input borders, emphasis rules |

Only two "status" hues appear, both desaturated: `#3f6b4a` (live) and
`#a98b4f` (concept). They never appear as decoration.

---

## 3. Layout

- Shell: `82rem` max, gutter `clamp(1.25rem, 4.5vw, 4rem)`.
- 12-column grid at `md` and above; single column below.
- Section rhythm: `py-16` mobile, `py-20` tablet, `py-28` desktop.
- Rules over cards. Borders are 1px hairlines; corner radius is `0` or `2px`
  only — no pills except status marks.
- Asymmetry is deliberate: 7/5 and 7/4 column splits, offset columns, and
  staggered project pairs rather than an even grid.

---

## 4. Motion

- One entrance pattern: `Reveal` — 14px rise, 700ms, `cubic-bezier(.22,.61,.36,1)`,
  fired once by `IntersectionObserver`.
- Hover: 200–320ms colour/border transitions; images scale 1.018 over 700ms.
- Marquee: 58s linear, pauses on hover, replaced by a static wrapped row under
  `prefers-reduced-motion: reduce`.
- No parallax, no scroll-jacking, no animation of layout properties.

---

## 5. Responsive strategy (mobile-first)

Breakpoints: base (≤639), `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
The shell stops growing at 82rem, so 1440+ gains margin rather than stretched text.

Per-page considerations:

- **Header:** links collapse to a drawer below 768; the drawer is a full-height
  panel with large type, and is removed from the tab order when closed (`hidden`).
  A compact "Hire" button remains visible at all widths.
- **Hero:** type-led; portrait drops below the copy on mobile at 4:5 rather than
  being squeezed beside it.
- **Work:** project covers keep their source ratio; `sizes` matches the column
  width at each breakpoint. The featured pair collapses to one column below 768.
- **Case studies:** facts strip goes 1 → 2 → 4 columns; the sticky sidebar becomes
  a normal block below 768.
- **Forms:** single column below 640; selects keep a 44px minimum tap height;
  errors sit directly under their field and are `aria-describedby`-linked.
- **Inspiration:** org-chart tree on desktop; a rail-based vertical tree on
  mobile with the detail panel inline beneath the selection.
- **Support:** bank rows stack label/value on mobile; copy buttons remain
  full-width and tappable.

Tested widths: 360, 375, 390, 768, 1024, 1280, 1440. No horizontal overflow at
any of them (`scrollWidth === clientWidth`).

---

## 6. Imagery

- All project imagery is captured from live deployments or from existing repo
  assets. No stock photography is used as evidence.
- JPEG at quality 80–82, max 1600px wide, progressive + mozog. Sources land
  between 28 KB and 114 KB.
- `next/image` with explicit `width`/`height` from the true ratio, `sizes` per
  layout slot, `priority` only on the single above-the-fold cover per route.
- Video: one 2.7 MB promo, `preload="none"` with a poster, behind controls.

---

## 7. Inspiration map

**Concept:** a "root and branches" attribution chart. AYODEX Labs sits at the
root; influences branch into categories (people, craft, works, ideas), and each
entry is a leaf carrying one sentence about *why* it matters.

- **Desktop:** root node at left, vertical trunk, branches to the right; leaves
  indent under their branch with connector dots. Selecting any node fills a
  detail panel (sticky on desktop) with name, role, note and outbound link.
- **Mobile:** same data, re-flowed as a left-rail timeline; selecting a leaf
  expands its detail inline instead of in a side panel.
- **Empty state:** the map is drawn with dashed connectors and neutral branch
  labels only — no invented names, no stock portraits. Branch nodes remain
  selectable so the interaction is reviewable before content exists.
- **Content:** `lib/inspiration.ts`, one typed array. Adding an entry is a data
  edit; no component changes required.

---

## 8. Accessibility

- Skip link, single `<h1>` per route, ordered headings.
- Focus-visible: 2px ink outline, 3px offset, everywhere.
- Drawer and detail panels are keyboard operable; closed panels are `hidden`.
- Form errors are announced with `aria-live` and linked by `aria-describedby`.
- Motion respects `prefers-reduced-motion`; marquee becomes static.
- Colour pairs checked: body 7.0:1+, muted-on-paper 7.0:1, meta 3.9:1 (only for
  non-essential micro text ≥12px bold or decorative labels).

---

## 9. SEO & structured data

- Per-route `title` template `%s — AYODEX Labs.`, unique descriptions, canonical
  paths against `https://ayodex-portfolio.vercel.app`.
- `Person` + `WebSite` JSON-LD sitewide; `CreativeWork` on each case study, using
  only fields the repository can support (name, description, dateCreated, author,
  keywords, url). No ratings, reviews, offers or employer claims.
- `sitemap.ts` covers all 14 routes; `robots.ts` points at it.
- OG image generated at build time (1200×630), plus a 180px apple icon and an
  SVG favicon.

---

## 10. Open questions carried from Phase 1

- Aurelion: no repository or deployment found; not represented.
- Tolu's Space and HMD Gadgets: engagement type unconfirmed, so no client claim
  is made anywhere in copy.
- ICEEIT: checkout is described as a demo because the repository says so.
- Portrait: designed plate in place; `hasPortrait` flips to the photograph once
  `/public/images/profile.jpg` exists.
