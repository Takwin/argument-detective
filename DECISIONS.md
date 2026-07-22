# Decisions Log

Material deviations from the master handoff and other noteworthy implementation
choices, with reasons and tradeoffs.

## D1 — Project name: "Argument Detective"

- **Decision:** The public product name is **Argument Detective** (subtitle "A
  Field Guide to 15 Logical Fallacies"), not the handoff's working title
  "Reasoning Lab."
- **Reason:** The owner named the project "Argument Detective" when
  commissioning the build. The handoff explicitly centralizes the name so it can
  be changed without touching components.
- **Effect:** All display strings live in `src/data/site.ts`. The tagline "Spot
  it. Prove it. Repair it." and every content, licensing, privacy, and
  pedagogical requirement are unchanged. Rename in one file to change it again.

## D2 — `check` gate excludes end-to-end tests

- **Decision:** `npm run check` runs `format:check → astro check → test → build`.
  Playwright end-to-end and accessibility tests run via a separate
  `npm run test:e2e`, and CI runs them as their own step.
- **Reason:** The handoff notes commands may be modified as package versions
  require. Keeping browser-dependent tests out of the core gate lets the gate run
  anywhere without Playwright browser binaries, while CI still enforces e2e/a11y.
- **Effect:** Nothing is skipped. `test:e2e` and the a11y suite are fully
  implemented and pass locally and in CI.

## D3 — Astro 5 content-layer API

- **Decision:** Content is defined in `src/content.config.ts` using the `glob`
  loader from `astro/loaders` over YAML files, with Zod schemas.
- **Reason:** Astro 5 (installed: 5.18.x) moved content collections to the
  Content Layer API; this is the current, supported convention for YAML data
  collections. The handoff permits adjusting paths to match the current API.
- **Effect:** Matches the intended `content.config.ts` location. Cross-entry
  rules Zod cannot express (exactly 15 records, numbers match the assignment
  map, related slugs resolve) are enforced in `src/data/fallacies.ts` (fails the
  build) and independently in the content tests.

## D4 — Node version

- **Decision:** `.nvmrc` pins Node **22** (current Active LTS); `package.json`
  `engines` allows `>=20`.
- **Reason:** Current LTS at implementation time; 20+ covers the build tooling.
- **Effect:** CI uses the `.nvmrc` version. Local development used Node 24, which
  satisfies `>=20`.

## D5 — Base-path-safe, host-agnostic deployment

- **Decision:** `astro.config.mjs` reads `SITE_URL` and `BASE_PATH` from the
  environment (defaults: root deploy at `https://argument-detective.pages.dev`,
  base `/`). All internal links resolve through `withBase()` in `site.ts`.
- **Reason:** The build must work at a root domain and at a GitHub project-Pages
  sub-path without editing source.
- **Effect:** GitHub Pages deploy passes `BASE_PATH=/<repo>/`; any static host
  can deploy at root with defaults. No root-relative links are hard-coded.

## D6 — Icons are original inline SVGs (no icon library)

- **Decision:** All 15 topic icons and utility icons are original SVGs defined in
  `src/components/Icon.astro`. Lucide was not added.
- **Reason:** Avoids any third-party runtime asset and any risk of imitating a
  reference site's icon system; keeps the bundle tiny and fully original.
- **Effect:** `THIRD_PARTY_NOTICES.md` reflects that no icon library ships.

## D7 — Optional practice (`/practice/`) deferred

- **Decision:** The optional in-browser quick-check practice (handoff P1, "build
  only after P0 passes") is **not** included in this pass. Supporting styles for
  a `QuickCheck` component exist in `components.css` for a future phase.
- **Reason:** P0 is the priority; the handoff lists practice as an optional later
  phase and a possible-non-goal-adjacent feature. Deferring keeps scope tight and
  avoids shipping under-reviewed scenario content.
- **Effect:** No route or link references `/practice/`; there are no broken
  links. Listed as a known future addition, not a defect.

## D8 — `@types/node` added

- **Decision:** Added `@types/node` (dev) and `"node"` to `tsconfig` types.
- **Reason:** `astro check` type-checks `astro.config.mjs`, which reads
  `process.env`.
- **Effect:** Clean `astro check` with zero errors.

## D9 — Privacy page uses the owner's "simple-first" format

- **Decision:** The privacy page leads with a short "What we don't do / What we
  do" block, then the handoff's required plain-language policy including the
  host-log caveat.
- **Reason:** Satisfies both the handoff's required privacy copy and the owner's
  standing preference for a short, reassuring lead. The site is client-only, so
  the "no cookies / no storage / nothing leaves your device" claims are accurate.
- **Effect:** Honest, accurate, and concise; full required language is preserved.
