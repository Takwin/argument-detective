// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Argument Detective build configuration.
 *
 * Deployment target is controlled by two environment variables so the same
 * source can ship to a root domain OR to GitHub project Pages without edits:
 *
 *   SITE_URL   Full canonical origin, e.g. https://example.com
 *              or https://<user>.github.io
 *   BASE_PATH  Sub-path the site is served from, e.g. "/" (root)
 *              or "/argument-detective/" (GitHub project Pages).
 *
 * Both default to a root deployment. Never hard-code root-relative links in a
 * way that breaks a sub-path deploy — always resolve URLs through
 * `withBase()` in src/data/site.ts.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://argument-detective.pages.dev';
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  compressHTML: true,
  prefetch: false,
});
