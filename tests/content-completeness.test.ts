import { describe, it, expect } from 'vitest';
import { loadYamlDir, FALLACY_DIR, COMPARISON_DIR, ASSIGNMENT_MAP } from './helpers';

type Fallacy = {
  number: number;
  slug: string;
  title: string;
  shortDefinition: string;
  related: { slug: string }[];
};

type Comparison = {
  slug: string;
  order: number;
  left: { slug?: string };
  right: { slug?: string };
};

const fallacies = loadYamlDir<Fallacy>(FALLACY_DIR).map((e) => e.data);
const comparisons = loadYamlDir<Comparison>(COMPARISON_DIR).map((e) => e.data);
const slugs = new Set(fallacies.map((f) => f.slug));

const PLACEHOLDERS = ['todo', 'lorem ipsum', 'tbd', 'coming soon', 'xxx', 'placeholder'];

describe('collection-level completeness', () => {
  it('has exactly 15 primary fallacy records', () => {
    expect(fallacies).toHaveLength(15);
  });

  it('uses topic numbers 1-15 with no gaps or duplicates', () => {
    const numbers = fallacies.map((f) => f.number).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: 15 }, (_, i) => i + 1));
  });

  it('has unique slugs', () => {
    expect(slugs.size).toBe(15);
  });

  it('matches the authoritative assignment map (number <-> slug)', () => {
    for (const { number, slug } of ASSIGNMENT_MAP) {
      const entry = fallacies.find((f) => f.slug === slug);
      expect(entry, `missing fallacy "${slug}"`).toBeDefined();
      expect(entry?.number, `wrong number for "${slug}"`).toBe(number);
    }
  });

  it('has short definitions of 220 characters or fewer', () => {
    for (const f of fallacies) {
      expect(f.shortDefinition.length, f.slug).toBeLessThanOrEqual(220);
    }
  });

  it('resolves every related slug to a real fallacy, with 2+ related each', () => {
    for (const f of fallacies) {
      expect(f.related.length, `${f.slug} needs 2+ related`).toBeGreaterThanOrEqual(2);
      for (const rel of f.related) {
        expect(slugs.has(rel.slug), `${f.slug} -> unknown related "${rel.slug}"`).toBe(true);
      }
    }
  });
});

describe('comparison guides', () => {
  it('has at least the 7 required comparison guides', () => {
    expect(comparisons.length).toBeGreaterThanOrEqual(7);
  });

  it('has unique order values', () => {
    const orders = comparisons.map((c) => c.order);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it('links any provided side slug to a real fallacy', () => {
    for (const c of comparisons) {
      if (c.left.slug) expect(slugs.has(c.left.slug), `${c.slug} left`).toBe(true);
      if (c.right.slug) expect(slugs.has(c.right.slug), `${c.slug} right`).toBe(true);
    }
  });
});

describe('no placeholder strings in production content', () => {
  const files = [...loadYamlDir(FALLACY_DIR), ...loadYamlDir(COMPARISON_DIR)];
  for (const { file, raw } of files) {
    it(`${file} is free of placeholder text`, () => {
      const lower = raw.toLowerCase();
      for (const token of PLACEHOLDERS) {
        expect(lower.includes(token), `${file} contains "${token}"`).toBe(false);
      }
    });
  }
});
