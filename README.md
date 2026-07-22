# Argument Detective

**A Field Guide to 15 Logical Fallacies** — _Spot it. Prove it. Repair it._

A free, privacy-first, noncommercial classroom reference that helps gifted
grade 5–6 students choose, understand, research, distinguish, and explain one of
15 assigned logical fallacies. Built as a durable static site: no accounts, no
database, no analytics, no cookies, and no runtime network requests.

- 15 permanent fallacy pages, each with definitions, diagnosed examples, a
  non-example, a borderline case, legitimate-use conditions, diagnostic
  questions, a Spot/Prove/Repair lab, and a project launchpad.
- 7 comparison guides for commonly confused pairs.
- "How Arguments Work" primer, a step-by-step project guide, and printable
  resources (cards, planner, all-topic chart).
- In-browser search + family filters with a no-JavaScript fallback.
- Targets WCAG 2.2 AA.

## Tech stack

- [Astro](https://astro.build) (static output), TypeScript (strict).
- Astro content collections with Zod-validated YAML records.
- Custom CSS with print styles; a small amount of original vanilla JS.
- System fonts only — no web fonts, no icon library (icons are original SVGs).

## Requirements

- Node.js (see `.nvmrc` — currently 22; `engines` allows `>=20`).
- npm (uses the committed `package-lock.json`).

## Setup

```bash
npm ci
```

## Develop

```bash
npm run dev
```

Then open <http://localhost:4321>.

## Build

```bash
npm run build
```

Static output is written to `dist/`. Preview the production build with:

```bash
npm run preview
```

## Test and quality gates

```bash
npm run check      # prettier check + astro check + unit/content tests + build
npm run test       # vitest: schema + completeness of the 15 records
npm run test:e2e   # playwright: routes + accessibility (needs a browser binary)
npm run format     # prettier --write .
```

For the e2e/accessibility suite the first time:

```bash
npx playwright install chromium
```

## Screenshots

```bash
npm run build
npm run preview      # in one terminal
node scripts/screenshots.mjs   # in another; writes to screenshots/
```

## Deploy

### GitHub Pages (default recommendation)

`.github/workflows/deploy-pages.yml` builds and deploys on every push to `main`.
It reads the origin and base path that GitHub Pages assigns, so it works for both
a user/org site (served at `/`) and a project site (served at
`/<repository-name>/`) with no source changes. Enable Pages in the repository
settings with "GitHub Actions" as the source.

`.github/workflows/ci.yml` runs formatting, type/content checks, unit tests, the
build, and the Playwright e2e/accessibility suite on pull requests and pushes.

### Any other static host (Cloudflare Pages, Netlify, etc.)

The output is plain static files, so migration is simple:

1. `npm run build`
2. Deploy the `dist/` directory to any static host.
3. Set deployment variables if not deploying at a domain root:
   - `SITE_URL` — full canonical origin, e.g. `https://example.com`
   - `BASE_PATH` — sub-path, e.g. `/` (root) or `/argument-detective/`
4. Rebuild and verify internal links and the canonical URL.

For **Cloudflare Pages**: build command `npm run build`, output directory `dist`,
Node version from `.nvmrc`. Leave `SITE_URL`/`BASE_PATH` unset for a root deploy,
or set them as environment variables for a sub-path.

## Renaming the project

All display strings (name, subtitle, tagline, owner, URLs, version) live in
[`src/data/site.ts`](src/data/site.ts). Change them there.

## Editing content

Each fallacy is one YAML file in `src/content/fallacies/`. Comparison guides live
in `src/content/comparisons/`. Edit the fields, then run `npm run check` to
validate. See [`MAINTENANCE`](#maintenance) below.

## Maintenance

### Edit a fallacy

1. Open the matching YAML in `src/content/fallacies/`.
2. Edit content fields.
3. Run `npm run format` and `npm run check`.
4. Preview with `npm run dev`.
5. Update `CONTENT_SOURCES.md` if sources or adaptation status change.
6. Commit and push.

### Add a future fallacy

Do **not** add to the numbered 15 (that would break the stable assignment map).
Add future topics to a separate `advanced` or unnumbered collection.

### Update dependencies

1. Create a branch.
2. Update one major dependency at a time.
3. Run all checks and inspect generated routes and print output.
4. Merge only after CI passes.

### Move hosts

1. `npm run build`.
2. Upload `dist/` to the new host.
3. Set `SITE_URL` and `BASE_PATH`, rebuild, and re-check links.

### Annual content review

Once per school year: check external links, review source-site terms, revisit
examples for clarity, test current browsers and assistive tech, and verify the
privacy claims against the actual host and dependencies.

## Project documents

- [`BUILD_REPORT.md`](BUILD_REPORT.md) — build results and checks.
- [`DECISIONS.md`](DECISIONS.md) — deviations and noteworthy choices.
- [`CONTENT_AUDIT.md`](CONTENT_AUDIT.md) — the 15 records and editorial decisions.
- [`CONTENT_SOURCES.md`](CONTENT_SOURCES.md) — rights ledger.
- [`LICENSE-CODE`](LICENSE-CODE) — MIT (source code).
- [`LICENSE-CONTENT.md`](LICENSE-CONTENT.md) — CC BY-NC 4.0 (educational content).
- [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) — dependency licenses.

## License

- **Code:** MIT — see `LICENSE-CODE`.
- **Content:** Creative Commons Attribution-NonCommercial 4.0 — see
  `LICENSE-CONTENT.md`.

Made by Roderic Rinehart. Independent, noncommercial, and free to use in
classrooms.
