# CLAUDE.md

Portfolio site built with Deno Fresh + Tailwind. Project data lives in
`config/projects.json`, language icons in `config/languages.json`, thumbnails
under `static/src/thumbnails/<project>/`.

## Workflow

- Always commit and push finished work — don't leave changes only in the
  working tree, and don't wait to be asked.
- Push to the session's designated branch.
- Only open a pull request when explicitly asked.

## Design

- UI work follows the `design-taste-frontend` skill (`.claude/skills/`); use
  `redesign-existing-projects` for audits.
- Tokens live in `tailwind.config.ts`: dark only (`ink`/`surface`/`line`,
  `fg`/`muted`/`subtle`) with one accent, `red`. Fonts are self-hosted in
  `static/fonts`: Bricolage Grotesque (`font-display`), Geist, Geist Mono.
- Shapes: interactive controls are pills, containers `rounded-card`,
  inputs `rounded-field`.
- Motion is CSS only (`static/styles.css`): `.rise`, `.reveal-on-scroll`
  (stagger with `--i`), one marquee. Everything honours reduced motion.
- No em-dashes in visible copy. Project helpers are in `lib/projects.ts`;
  keep `projectSlug` stable, existing URLs depend on it.
