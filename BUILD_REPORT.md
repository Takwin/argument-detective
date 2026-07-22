# Build Report

## Summary

- **Repository:** <https://github.com/Takwin/argument-detective> (public,
  branch `main`)
- **Commit:** `ee392d2` (code-complete, including Codex-review P0 fixes; this
  report is updated in a docs-only follow-up commit)
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
- `npm run test:e2e` (Playwright): PASS (56 tests — routes, practice
  interactions, computed-visibility search filtering, 320px reflow, and
  accessibility)

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
- **Third-party requests (application):** None. Built HTML references only the
  site's own CSS and inlined scripts; no external scripts, styles, fonts, or
  images. External hyperlinks (further reading) are plain links, opened in the
  same tab, with `rel="noopener noreferrer"` where applicable.
- **Edge-injected analytics (found in external review — RESOLVED 2026-07-22):**
  Cloudflare's zone-level Web Analytics on `rinehartexcel.com` had automatic
  setup enabled, injecting `static.cloudflareinsights.com/beacon.min.js` (RUM)
  into HTML served to browsers on the custom domain — contradicting the privacy
  page. The application and Pages project were never the source (verified
  `web_analytics_tag/token: null`; `pages.dev` origin served clean HTML). The
  owner disabled the zone's automatic setup in the Cloudflare dashboard.
  **Post-fix audit:** browser-UA fetches of `/`, `/practice/`,
  `/fallacies/straw-man/`, and `/privacy/` contain zero beacon references, and
  a live browser session shows no third-party script tags and no requests to
  `cloudflareinsights.com` or `/cdn-cgi/rum`. The privacy page's claims now
  match observed network behavior end to end.
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

## Review round (Codex, 2026-07-22)

An external Codex review of the live site found three P0 defects. Status:

1. **Search filtering visually broken** (CSS `display: flex` overrode the
   `hidden` attribute) — **FIXED** in `ee392d2` with a global
   `[hidden] { display: none !important; }` guard; e2e now asserts computed
   visibility (1 visible card on a one-result query, non-matching card hidden,
   clear restores 15).
2. **Edge-injected Cloudflare RUM beacon** contradicting the privacy page —
   **root-caused** to zone-level Web Analytics auto-injection (not the app, not
   the Pages project) and **RESOLVED**: the owner disabled the zone's automatic
   setup; post-fix browser-UA and live-session audits are clean. See
   Privacy/network review above.
3. **320px reflow failure** (330px document width) — **FIXED** in `ee392d2`
   (card header wraps; grid children `min-width: 0`); new 5-page 320×800
   overflow e2e suite passes.

Also addressed: public repository created and linked
(finding 4); screenshot evidence extended with 320px mobile sweeps, a
one-result search state, and print previews (finding 5, partial — see Known
issues).

## Known issues

- **Dev-only dependency advisories:** `npm audit` reports advisories in
  build-time dependencies (esbuild dev server, sharp) that ship with Astro's
  toolchain. They affect the local dev server only and are **not present in the
  static production output** (no server, no `sharp` at runtime). `npm audit fix
--force` would force a breaking Astro downgrade and was not applied.
- **Lighthouse not measured here:** Recommend running Lighthouse against the
  deployed URL to confirm the 95+/100 targets.
- **Manual assistive-tech passes pending:** NVDA/VoiceOver spot checks and a
  physical Letter/A4 print run remain recommended before a formal conformance
  statement (automated axe, keyboard, reflow, and print-media-emulation
  checks are green).

## Files for ChatGPT Sol

- **Repository archive:** the repository directory (zip on request).
- **Build report:** `BUILD_REPORT.md` (this file).
- **Decisions log:** `DECISIONS.md`.
- **Content audit:** `CONTENT_AUDIT.md`.
- **Content sources:** `CONTENT_SOURCES.md`.
- **Screenshots:** `screenshots/` (home, fallacy, compare, how-arguments-work,
  practice × 320px/768px/1440px, plus one-result search state and two print
  previews = 18 images).
