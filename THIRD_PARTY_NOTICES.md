# Third-Party Notices

Argument Detective ships **no third-party code or assets in its production
output**. The site is plain static HTML, CSS, and a small amount of original
vanilla JavaScript. All icons are original SVGs authored for this project; no
external icon library (such as Lucide) is bundled or referenced.

The packages below are **development and build-time only**. They are not shipped
to visitors, make no runtime network requests, and are listed here to preserve
their licenses.

## Build and development dependencies

| Package               | Purpose                             | License    |
| --------------------- | ----------------------------------- | ---------- |
| astro                 | Static site framework / build tool  | MIT        |
| @astrojs/check        | Type checking for `.astro` files    | MIT        |
| typescript            | Type checking                       | Apache-2.0 |
| zod                   | Schema validation (content + tests) | MIT        |
| js-yaml               | YAML parsing in tests               | MIT        |
| @types/js-yaml        | Type definitions                    | MIT        |
| @types/node           | Type definitions                    | MIT        |
| prettier              | Code formatting                     | MIT        |
| prettier-plugin-astro | Astro formatting support            | MIT        |
| vitest                | Unit / content test runner          | MIT        |
| @playwright/test      | End-to-end + accessibility tests    | Apache-2.0 |
| @axe-core/playwright  | Accessibility assertions            | MPL-2.0    |

Transitive dependencies retain their own licenses; run `npm ls` or inspect
`node_modules/<pkg>/LICENSE` for the full text of any package.

## Fonts

No web fonts are loaded. Typography uses the visitor's local system font stack
(`system-ui` and platform equivalents), so no font files are bundled or fetched.

## Reference sources (not bundled)

The site links to external references for further reading (Internet Encyclopedia
of Philosophy, Stanford Encyclopedia of Philosophy, Purdue OWL, UNC Writing
Center, and the two inspiration sites). Their content is not reproduced; only
hyperlinks are included. See `CONTENT_SOURCES.md`.
