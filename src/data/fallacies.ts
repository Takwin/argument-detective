import { getCollection, type CollectionEntry } from 'astro:content';
import { familyIds } from './families';

export type FallacyEntry = CollectionEntry<'fallacies'>;
export type ComparisonEntry = CollectionEntry<'comparisons'>;

/**
 * The authoritative assignment map. A fallacy's `number` field must match the
 * slug in this list, and there must be exactly these 15 records. This is the
 * cross-entry contract Zod cannot enforce on its own.
 */
export const ASSIGNMENT_MAP: readonly { number: number; slug: string }[] = [
  { number: 1, slug: 'straw-man' },
  { number: 2, slug: 'false-dilemma' },
  { number: 3, slug: 'slippery-slope' },
  { number: 4, slug: 'anecdotal-fallacy' },
  { number: 5, slug: 'appeal-to-authority' },
  { number: 6, slug: 'appeal-to-emotion' },
  { number: 7, slug: 'circular-reasoning' },
  { number: 8, slug: 'bandwagon' },
  { number: 9, slug: 'false-cause' },
  { number: 10, slug: 'red-herring' },
  { number: 11, slug: 'ad-hominem' },
  { number: 12, slug: 'whataboutism' },
  { number: 13, slug: 'appeal-to-tradition' },
  { number: 14, slug: 'guilt-by-association' },
  { number: 15, slug: 'hasty-generalization' },
];

/**
 * Load, validate, and return all 15 fallacies sorted by assignment number.
 * Throws (failing the build) if the cross-entry contract is broken.
 */
export async function getSortedFallacies(): Promise<FallacyEntry[]> {
  const entries = await getCollection('fallacies');
  validateFallacies(entries);
  return [...entries].sort((a, b) => a.data.number - b.data.number);
}

/** Build-time integrity checks across the whole collection. */
export function validateFallacies(entries: FallacyEntry[]): void {
  const errors: string[] = [];

  if (entries.length !== 15) {
    errors.push(`Expected exactly 15 fallacy records, found ${entries.length}.`);
  }

  const numbers = new Set<number>();
  const slugs = new Set<string>();
  const bySlug = new Map<string, FallacyEntry>();

  for (const entry of entries) {
    const { number, slug, family } = entry.data;
    if (numbers.has(number)) errors.push(`Duplicate topic number: ${number}.`);
    if (slugs.has(slug)) errors.push(`Duplicate slug: ${slug}.`);
    numbers.add(number);
    slugs.add(slug);
    bySlug.set(slug, entry);
    if (!familyIds.includes(family)) {
      errors.push(`Fallacy "${slug}" has invalid family "${family}".`);
    }
  }

  // Numbers match the authoritative assignment map.
  for (const { number, slug } of ASSIGNMENT_MAP) {
    const entry = bySlug.get(slug);
    if (!entry) {
      errors.push(`Missing fallacy for assignment slug "${slug}".`);
    } else if (entry.data.number !== number) {
      errors.push(
        `Fallacy "${slug}" has number ${entry.data.number}, but the assignment map expects ${number}.`
      );
    }
  }

  // Related slugs resolve to real fallacies.
  for (const entry of entries) {
    for (const related of entry.data.related) {
      if (!bySlug.has(related.slug)) {
        errors.push(
          `Fallacy "${entry.data.slug}" references unknown related slug "${related.slug}".`
        );
      }
    }
  }

  if (errors.length > 0) {
    throw new Error('Fallacy content validation failed:\n - ' + errors.join('\n - '));
  }
}

/** Previous/next topic in assignment order (wrapping is disabled). */
export function getPrevNext(
  sorted: FallacyEntry[],
  slug: string
): { prev: FallacyEntry | null; next: FallacyEntry | null } {
  const index = sorted.findIndex((e) => e.data.slug === slug);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

/** Map from slug to entry, for resolving related-topic links. */
export function bySlugMap(entries: FallacyEntry[]): Map<string, FallacyEntry> {
  return new Map(entries.map((e) => [e.data.slug, e]));
}

/** All comparison guides, sorted by their `order` field. */
export async function getSortedComparisons(): Promise<ComparisonEntry[]> {
  const entries = await getCollection('comparisons');
  return [...entries].sort((a, b) => a.data.order - b.data.order);
}

/**
 * A compact, JSON-serializable projection of each fallacy used for the
 * client-side search index. Only searchable fields are exposed.
 */
export type SearchRecord = {
  number: number;
  slug: string;
  title: string;
  family: string;
  familyLabel: string;
  shortDefinition: string;
  aliases: string[];
  keywords: string[];
};
