<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## AYODEX portfolio V2 (branch `portfolio-v2`)

- Workspace `.git` was missing on arrival; restored with `git init`, then
  `portfolio-v2` was branched from the real `main` (`d7040c2`). Never push to
  `main` from here.
- Stack kept: Next 16 App Router, React 19, TS, Tailwind 4. All routes static.
- Design tokens: `app/globals.css`. Rationale: `DESIGN.md`.
- Type: Instrument Serif + Manrope only, via `next/font`.
- Project content is data-only in `lib/projects.ts`; influences in
  `lib/inspiration.ts`. Keep status + statusNote accurate — no invented claims.
- Forms intentionally have no backend: validate, then open a prefilled `wa.me`
  URL. Never report a message as sent.
- Portrait placeholder lives in `components/Portrait.tsx`; flip `hasPortrait`
  when `/public/images/profile.jpg` exists.
- Preview must run the **production** build (`npm run build && npm run start`);
  the dev server's HMR websocket does not survive the preview proxy, so client
  components appear inert in dev.

## Current design system (replaces the earlier serif/green pass)

- **Type:** one system stack for everything (`--font-system`: SF Pro on Apple,
  Segoe UI on Windows, Roboto on Android). No webfont payload for UI text.
  Weights carry hierarchy: 700 `.display`/`.display-sm`, 600 `.heading`/`.title`,
  500 metadata, 400 body.
- **One expressive face:** `Instrument_Serif` italic only, via `next/font`, as
  `--font-accent`. Used for the motto ("I build. I design. I experiment.") in
  hero + footer and `hold up.` in the headline, via `.accent`/`.accent-phrase`.
  Do not expand it to headings or paragraphs. `.display em` is reset to upright
  bold *except* `.accent-phrase`, so an `<em>` in a heading is weight, not serif.
- **Colour:** burgundy is the only accent: `--brand #690202`,
  `--brand-hover #7d0a0a`, `--brand-ink #7a1414`, `--brand-soft #69020214`,
  plus `--brand-tint`/`--brand-line` for on-burgundy text and hairlines.
  Neutrals: `--ink #1d1d1f`, `--ink-2 #48484a`, `--ink-3 #6e6e73`,
  `--ink-4 #a1a1a6` (decorative only, never text), `--white`, `--soft #f5f5f7`,
  `--warm #f7f4f0`, `--fill #eff1f4`, `--hair #00000014`.
  **No green, blue, orange, rust or gold.** `--ink-4` must not be used for copy.
- **Legacy aliases:** one block at the end of `:root` and in `@theme` maps the
  old names (`--forest`, `--sage`, `--citron`, `--muted`, `--line-*`) onto the
  new tokens so existing rules keep working. Repoint new work at the new names;
  delete the alias block only after rewriting every `var()` call.
- **Surface rhythm:** white carries content; `.band-sage`/`.band-ivory` are the
  soft grey; `.band-warm` is the warm neutral (at most twice per page);
  `.band-forest` is the one burgundy band per page, carrying white text.
- **Hero depth:** `.hero-shell::before` is a masked dot lattice,
  `.hero-wash::before` a burgundy radial glow (about 5% strength). Both are
  clipped to the section. Keep them faint: they must never sit behind text.
- **Cards:** `.frame` uses `--fill` plus a hairline and a two-step shadow, and
  lifts on hover. Do not add glassmorphism or large decorative shapes.

## Responsive rules learned the hard way

- **Never put a fixed intrinsic width inside an implicit grid/flex track.**
  Screenshots declared at 1600px stretched single-column tracks and made the
  whole page scroll sideways at every mobile width. The fix is
  `:where(.grid, .flex) > * { min-width: 0 }` plus `img { max-width: 100% }`.
- Do **not** reintroduce `overflow-x: hidden` on `body`; it hides the symptom.
  Verify with `document.documentElement.scrollWidth === clientWidth` per route.
- Mobile hero order is CSS-only (`.hero-figure { order: -1 }`), so there is one
  copy of the hero markup. Portrait sits directly under the nav.
- The technology strip scrolls continuously at every width. Its loop is exact
  because the track is `max-content` with two identical `flex-shrink: 0`
  groups and a -50% translate; never let a half wrap or shrink. Only
  `prefers-reduced-motion` turns it into a static wrapped list.
- Tested widths: 320, 390, 430, 768, 1440. All 15 routes return 200 (404 route
  returns 404) with zero overflow.

## Inspiration tree

- `components/InspirationTree.tsx` is a client component: it may **not** import
  modules that touch `node:fs`. Anything filesystem-based (the profile photo)
  is resolved in `app/inspiration/page.tsx` and passed down as a prop. This
  breaks the Turbopack build with "chunking context does not support external
  modules (request: node:fs)" otherwise.
- Drawing is one SVG in a 1000x620 viewBox; portraits are HTML buttons
  absolutely positioned over the branch tips. `.tree-tip` uses
  `top: calc(var(--y) - var(--shift))` and `translateX(-50%)` so the portrait
  centre, not the card top, lands on the tip. The centre branch reverses the
  column and sets `--shift: 6.6rem`. Verified dx 0 / dy <= 2.4px.
- Growth uses `pathLength="1"` with `stroke-dasharray: 1 1` and
  `stroke-dashoffset: 1 -> 0`. Use `animation-fill-mode: both`; `backwards`
  overrides the shorthand's `forwards` and the strokes vanish again.
- There are **two** SVG compositions: `.tree-canvas--desktop` (1000x620) and
  `.tree-canvas--mobile` (420x960, drawn tall with three limbs at three
  heights). Both carry the same roots, trunk, limbs, twigs, leaves and people.
- Never hide the mobile drawing. An earlier version did `display: none` below
  900px and substituted a gradient line, which is exactly the bug the owner
  reported. If a phone layout needs work, redraw the geometry, do not remove it.
- `.tree-frame` owns the aspect ratio and is the containing block for every
  percentage-positioned piece. Do not put `max-height` on the frame: capping
  the height while the width stays fixed makes `preserveAspectRatio` letterbox
  the artwork, and every portrait slides off its branch tip.
- Portraits are absolutely centred on their tip (`translate(-50%, -50%)`), not
  laid out in the text flow, so alignment does not depend on how the label
  wraps. `--portrait` drives the size and the label offset together.
- Below 900px the description panel is suppressed inside the drawing (it would
  cover the next branch) and rendered once in `.tree-detail` under the tree,
  driven by the same `open` state. Do not reintroduce in-tree panels on mobile.
- `scripts/check-tree.mjs` and `scripts/check-motion.mjs` verify alignment,
  overflow, growth timing and reduced motion at every breakpoint. Run them with
  the preview server up after touching the tree.

## Profile photo

- Drop the real photo at `public/images/profile.jpg` (or .png/.webp, any
  capitalisation, or a single image inside `public/images/profile/`).
  `lib/profilePhoto.ts` detects it at build time and the hero, the About page
  and the inspiration tree root all switch from the designed placeholder
  automatically. No code change, no props to thread.
- The placeholder is a deliberate design, not a missing asset. Never invent or
  generate a likeness of the owner.

## GitHub push status (audited)

- Remote is configured: `origin` → https://github.com/elasoruayodeji/ayodex-portfolio.git
- `portfolio-v2` descends from GitHub `main` (`d7040c2`); it fast-forwards, so
  never `--force`.
- Write access is now available via `gh` (account `elasoruayodeji`, `repo`
  scope) with `gh auth setup-git` configuring the credential helper.
- **`main` on GitHub is now the V2 rebuild** (`71ac6f9`), promoted by
  fast-forward from `portfolio-v2`. The pre-promotion state is preserved on
  branch `backup/main-before-portfolio-v2` (`d7040c2`). Do not reuse that
  branch name.
- `recovery/portfolio-v2-full.bundle` is a verified complete-history bundle;
  `recovery/README.md` has the exact recovery routes. The bundle is gitignored.
- Local branch `main` is a synthetic snapshot commit, not GitHub's `main`. Do
  not push it.
