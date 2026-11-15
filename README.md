# AYODEX Labs — portfolio

Personal portfolio of **Elasoru Solomon Ayodeji**, built as AYODEX Labs.
_I build. I design. I experiment._

Live: https://ayodex-portfolio.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 4 + design tokens in `app/globals.css` |
| Type | Instrument Serif (display) + Manrope (interface), via `next/font` |
| Imagery | `next/image`, AVIF/WebP, explicit dimensions |
| Forms | Client-side validation → prefilled WhatsApp click-to-chat |

No backend, no database, no payment gateway. Contact and Hire build a
URL-encoded WhatsApp message and open it; the visitor sends it themselves.
Nothing on this site claims a message or a payment was received.

## Routes

```
/                     Home
/work                 All projects
/work/[slug]          Case study (7 projects)
/about                About
/hire                 Project enquiry  → WhatsApp
/contact              General contact  → WhatsApp
/inspiration          Influence map (tree / mobile rail)
/support              Bank transfer details + copy
/not-found            404
```

SEO: per-route metadata, canonical URLs, Open Graph image generated at build
time (`app/opengraph-image.tsx`), `sitemap.ts`, `robots.ts`, JSON-LD
(`Person`, `WebSite`, `CreativeWork`).

## Project data

Everything about a project lives in `lib/projects.ts` — summary, role, stack,
features, status, status note, live/repo URLs, cover, gallery, decisions.
Adding or correcting a project is a data edit; no component changes needed.

Content rules the data model enforces:

- `status` plus `statusNote` on every project. Nothing is described as "live"
  without a reachable deployment.
- `decisions[]` holds only evidence-backed notes, not invented outcomes.
- Tolu's Space and HMD Gadgets carry no client claim (engagement unconfirmed).
- ICEEIT's checkout is described as a demo, because the repository says so.
- VANTAGE is labelled a concept build; the company is fictional.

## Inspiration map

`lib/inspiration.ts` holds four branches (people, craft, works, ideas) with
typed entries. The map renders as a connected tree on desktop and a vertical
rail on mobile, with a detail panel for the selected node. Entries are empty on
purpose — no invented names or stock portraits. Add an entry and it appears in
both layouts.

## Assets to supply

| File | Purpose | Status |
|---|---|---|
| `public/images/profile.jpg` | Hero + About portrait | **Placeholder plate** — set `hasPortrait` in `components/Portrait.tsx` once supplied |
| `lib/inspiration.ts` entries | Influences with real names + notes | Empty by design |
| Extra project screenshots | Optional; add to `public/images/work/<slug>/` and a `gallery` entry | — |

Project imagery in `public/images/work/` is captured from the live deployments
or taken from the existing repositories. No stock imagery is used as evidence.

## Commands

```bash
npm run dev      # local development
npm run build    # production build (all routes static)
npm run start    # serve the production build
npm run lint     # eslint
```

## Design notes

See `DESIGN.md` for the typography pairing rationale, colour tokens, spacing
system, responsive strategy, motion rules and accessibility decisions.

## Footer

Powered by AYODEX Labs.
