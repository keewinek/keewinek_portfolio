# CLAUDE.md

Static portfolio site (no framework) hosted on Netlify. `build.mjs` renders
HTML from the template modules in `src/` into `dist/` and runs Tailwind over
it. Project data lives in `config/projects.json`, language icons in
`config/languages.json`, thumbnails under `public/src/thumbnails/<project>/`.

## Commands

- `npm install`, then `npm run build` (output in `dist/`).
- `npm run dev` rebuilds on change; `npm run preview` serves `dist/` on :8888
  (mimics Netlify: pretty URLs, `/discord` redirect, `404.html`).
- Layout: `src/pages/*` (one module per page), `src/components/*` (HTML
  helpers, `html` tagged template auto-escapes), `src/client/site.js` (all
  browser JS, plain script copied to `dist/js`), `public/` (copied as is).

## Workflow

- Always commit and push finished work — don't leave changes only in the
  working tree, and don't wait to be asked.
- Push to the session's designated branch.
- Only open a pull request when explicitly asked.

## Design

- UI work follows the `design-taste-frontend` skill (`.claude/skills/`); use
  `redesign-existing-projects` for audits.
- Tokens live in `tailwind.config.js`: dark only (`ink`/`surface`/`line`,
  `fg`/`muted`/`subtle`) with one accent, `red`. Fonts are self-hosted in
  `public/fonts`: Bricolage Grotesque (`font-display`), Geist, Geist Mono.
- Shapes: interactive controls are pills, containers `rounded-card`,
  inputs `rounded-field`.
- Motion is CSS only (`src/styles.css`): `.rise`, `.reveal-on-scroll`
  (stagger with `--i`), one marquee. Everything honours reduced motion.
- No em-dashes in visible copy. Project helpers are in `src/lib/projects.mjs`;
  keep `projectSlug` stable, existing URLs depend on it.
