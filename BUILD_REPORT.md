# Build Report

## Summary

- **Repository:** Argument Detective (local git repository, branch `main`)
- **Commit:** Initial commit on `main` (`git log -1` for the current hash)
- **Build date:** 2026-07-22
- **Implementation agent:** Claude (Opus 4.8)
- **Production URL:** <https://argumentdetective.rinehartexcel.com> — live on
  Cloudflare Pages (direct upload), custom domain active.

## Completed scope

**P0 (all complete):**

- Homepage with hero, fallacy-fallacy safeguard, search + family filters
  (no-JS fallback), 15 numbered cards, four-family overview, workflow strip, and
  comparison/printable teasers.
- 15 permanent fallacy pages generated from validated YAML via one dynamic route.
- 7 comparison guides + comparison index.
- How Arguments Work, Project Guide.
- Credits, Privacy, Accessibility, 404.
- Printable resources: fallacy cards, project planner, all-topic comparison chart.
- Licensing/attribution, privacy (with host-log caveat), accessibility statement.

**P1 (all complete):**

- Printable comparison chart — complete.
- Optional in-browser practice (`/practice/`) — **complete** (Phase 5, see
  `DECISIONS.md` D7): 10 reviewed scenarios with "Not a fallacy" / "Not enough
  context" options, defensible-label handling, explanation-based feedback,
  page-memory-only state, and a no-JS `<details>` discussion fallback. Linked
  from the homepage, footer, and project guide (nav order kept per spec, D10).

## Commands and results

- `npm ci`: PASS
- `npm run format:check`: PASS (Prettier clean)
- `astro check`: PASS (0 errors, 0 warnings)
- `npm test` (vitest): PASS (110 tests — schema + completeness + practice data)
- `npm run build`: PASS (35 pages)
- `npm run test:e2e` (Playwright): PASS (51 tests — routes, practice
  interactions, and accessibility)

## Generated routes

- Fallacy pages: **15**
- Comparison pages: **7** (+ comparison index)
- Other routes: home, how-arguments-work, project-guide, practice, resources
  (index, cards, project-planner, comparison-chart), credits, privacy,
  accessibility, 404.
- Total HTML pages built: **35**

## Accessibility review

- **Automated:** `@axe-core/playwright` against 12 representative pages
  (homepage, one page per family, comparison index + a comparison, how-arguments,
  project guide, printable cards, privacy, practice) with tags
  wcag2a/2aa/21a/21aa/22aa — **0 serious or critical violations**.
- **Keyboard:** Skip link, visible focus outlines, real `<a>` for all
  navigation, `<button>` only for actions, `aria-current="page"`, Escape closes
  mobile nav. Search updates a polite live region without stealing focus.
- **Screen-reader considerations:** Decorative icons `aria-hidden`; result count
  in `role="status" aria-live="polite"`; example types labeled with text, not
  color alone.
- **Zoom/reflow:** Fluid layout with relative units; tables scroll inside an
  `overflow-x:auto` container; body never scrolls horizontally at 320px.
- **Known limitations:** Manual NVDA/VoiceOver passes recommended before a formal
  conformance claim; the accessibility page states target + review date rather
  than claiming full conformance.

## Privacy/network review

- **Cookies found:** None.
- **Storage used:** None (no localStorage/sessionStorage). Search state is
  in-memory only and clears on refresh.
- **Third-party requests:** None. Built HTML references only the site's own CSS
  and inlined scripts; no external scripts, styles, fonts, or images. External
  hyperlinks (further reading) are plain links, opened in the same tab, with
  `rel="noopener noreferrer"` where applicable.
- **Forms or data transmission:** None sent anywhere. The search box and the
  practice radio forms run entirely in page memory; practice forms prevent
  submission and never transmit, store, or score answers.

## Content review

- **All 15 records complete:** YES (enforced by 55 automated tests + build-time
  cross-entry validation).
- **Source ledger complete:** YES (`CONTENT_SOURCES.md`; all pages `original`).
- **Adapted pages:** None.
- **Pages requiring final editorial attention:** None blocking. Wording is ready
  for ChatGPT Sol's review; all handoff editorial decisions (§13) applied — see
  `CONTENT_AUDIT.md`.

## Performance

- **Client JavaScript:** ~1.9 KB inline on the homepage (search + nav toggle),
  well under the 30 KB target. No external JS files.
- **CSS:** One bundled, cacheable stylesheet. System fonts only — no web-font
  requests. No layout shift from remote assets.
- **Lighthouse:** Not run in this environment (no Chrome measurement harness
  wired here). Expected high given static output, tiny JS, no web fonts, and no
  third-party requests. Recommend a Lighthouse pass on the deployed URL.

## Deployment

- **Host:** Deployed to **Cloudflare Pages** (project `argument-detective`, direct
  upload of `dist/`). GitHub Pages workflow (`.github/workflows/deploy-pages.yml`)
  and CI workflow (`.github/workflows/ci.yml`) also provided; portable to any
  static host.
- **Base path:** `/` (root deploy). Env-driven (`SITE_URL`/`BASE_PATH`) with the
  production canonical baked in as the default.
- **Custom domain status:** **Active** — `argumentdetective.rinehartexcel.com`
  (proxied CNAME in the `rinehartexcel.com` zone → `argument-detective.pages.dev`).
- **Exact deployment steps:** See `README.md` → Deploy. Enable Pages with "GitHub
  Actions" as the source and push to `main`; or `npm run build` and upload `dist/`
  to any static host (set `SITE_URL`/`BASE_PATH` for non-root deploys).

## Deviations from master handoff

See `DECISIONS.md`. Summary: project renamed to **Argument Detective** (owner
request, D1); `check` gate excludes browser e2e which runs as its own script and
in CI (D2); Astro 5 content-layer API (D3); Node 22 in `.nvmrc` (D4); env-driven
base path (D5); original inline SVG icons instead of an icon library (D6);
optional `/practice/` deferred then built as Phase 5 (D7); `@types/node` added
for config typing (D8); privacy page uses the owner's simple-first format while
preserving required copy (D9); practice linked from homepage/footer/project
guide but not the fixed global nav (D10); footer milestone version 0.5 → 0.7
(D11).

## Known issues

- **Dev-only dependency advisories:** `npm audit` reports advisories in
  build-time dependencies (esbuild dev server, sharp) that ship with Astro's
  toolchain. They affect the local dev server only and are **not present in the
  static production output** (no server, no `sharp` at runtime). `npm audit fix
--force` would force a breaking Astro downgrade and was not applied.
- **Lighthouse not measured here:** Recommend running Lighthouse against the
  deployed URL to confirm the 95+/100 targets.

## Files for ChatGPT Sol

- **Repository archive:** the repository directory (zip on request).
- **Build report:** `BUILD_REPORT.md` (this file).
- **Decisions log:** `DECISIONS.md`.
- **Content audit:** `CONTENT_AUDIT.md`.
- **Content sources:** `CONTENT_SOURCES.md`.
- **Screenshots:** `screenshots/` (home, fallacy, compare, how-arguments-work,
  practice × mobile/tablet/desktop = 15 images).
