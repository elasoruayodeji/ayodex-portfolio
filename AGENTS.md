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
