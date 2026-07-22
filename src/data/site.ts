/**
 * Centralized site configuration.
 *
 * The owner can rename the project or change deployment details here without
 * editing components. Display strings live in one place on purpose.
 */

export const site = {
  /** Public product name. */
  name: 'Argument Detective',
  /** Public subtitle. */
  subtitle: 'A Field Guide to 15 Logical Fallacies',
  /** Core learning loop. */
  tagline: 'Spot it. Prove it. Repair it.',
  /** Meta description used as a default across pages. */
  description:
    'A free, privacy-first field guide to 15 logical fallacies for grades 5-6. Learn to spot the move, prove what went wrong, and repair the argument.',
  /** Owner display name for attribution. */
  owner: 'Roderic Rinehart',
  /** Where the owner links back to (footer signature). */
  ownerUrl: 'https://rinehart-hq.pages.dev/',
  /** Public repository URL (update after first push). */
  repositoryUrl: 'https://github.com/roderic/argument-detective',
  /** Content license. */
  contentLicense: 'CC BY-NC 4.0',
  contentLicenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
  codeLicense: 'MIT',
  /** Classroom-maturity milestone version shown in the footer. */
  publicVersion: '0.5',
  publicVersionLabel: 'MVP',
  /** Contact/feedback method. Empty until the owner supplies one. */
  contactEmail: '',
} as const;

/** Configured canonical origin (no trailing slash), from astro.config.mjs. */
export const SITE_URL: string = import.meta.env.SITE ?? 'https://argument-detective.pages.dev';

/**
 * Configured base path. Astro guarantees `BASE_URL` is set from `base`.
 * Normalized to always start and end with a single slash.
 */
export const BASE_PATH: string = normalizeBase(import.meta.env.BASE_URL ?? '/');

function normalizeBase(base: string): string {
  let value = base.trim();
  if (!value.startsWith('/')) value = '/' + value;
  if (!value.endsWith('/')) value = value + '/';
  return value.replace(/\/{2,}/g, '/');
}

/**
 * Resolve an internal path against the configured base path so links work
 * both at the root and under a GitHub project-Pages sub-path.
 *
 * @example withBase('/fallacies/straw-man/') -> '/argument-detective/fallacies/straw-man/'
 */
export function withBase(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return (BASE_PATH + clean).replace(/\/{2,}/g, '/');
}

/** Absolute canonical URL for a given internal path. */
export function canonical(path: string): string {
  const origin = SITE_URL.replace(/\/$/, '');
  return origin + withBase(path);
}
