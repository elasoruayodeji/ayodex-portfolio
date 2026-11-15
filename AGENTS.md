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

## Visual refinement pass (branch `portfolio-v2`)

- Type roles: `.display` / `.display-sm` / `.title` / `.index-num` = Instrument
  Serif; everything else Manrope. Never set the serif bold or below 1.25rem.
  Green italics (`.display .italic`) are the one recurring type accent.
- Botanicals: `--forest` buttons/links/eyebrows, `--sage` bands and fields,
  `--citron` only on dark forest. One accent band per page.
- Hero portrait is a true circle: `--size` + `aspect-ratio: 1/1` on both
  `.portrait` and `.portrait-disc`. At 1024 the column is narrower than
  23.5rem, so the disc sizes to the column — do not remove the aspect ratio or
  it becomes an ellipse.
- `--muted-soft` is a *text* colour and must stay ≥4.5:1; it is not a
  decorative tint. A full-page contrast sweep is the check to re-run after
  touching colour tokens.

## GitHub push status (audited)

- Remote is configured: `origin` → https://github.com/elasoruayodeji/ayodex-portfolio.git
- `portfolio-v2` descends from GitHub `main` (`d7040c2`); it fast-forwards, so
  never `--force`.
- **No write credential exists in this workspace.** `git push` returns
  `remote: No anonymous write access.` Do not claim a push succeeded.
  Authenticate with `gh auth login --web`, a fine-grained PAT, or SSH first.
- `recovery/portfolio-v2-full.bundle` is a verified complete-history bundle;
  `recovery/README.md` has the exact recovery routes. The bundle is gitignored.
- Local branch `main` is a synthetic snapshot commit, not GitHub's `main`. Do
  not push it.
