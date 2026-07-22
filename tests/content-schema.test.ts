import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { loadYamlDir, FALLACY_DIR, COMPARISON_DIR, FAMILY_IDS } from './helpers';

/**
 * Independent schema validation of the raw YAML content, mirroring
 * src/content.config.ts. Running this separately from Astro guards against
 * schema drift and confirms every record satisfies the data contract.
 */

const clearExample = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  diagnosis: z.array(z.string().min(1)).min(1),
  repairedVersion: z.string().min(1),
});

const fallacySchema = z
  .object({
    number: z.number().int().min(1).max(15),
    slug: z.string().min(1),
    title: z.string().min(1),
    shortTitle: z.string().min(1).optional(),
    family: z.enum(FAMILY_IDS as [string, ...string[]]),
    icon: z.string().min(1),
    aliases: z.array(z.string().min(1)),
    keywords: z.array(z.string().min(1)),
    shortDefinition: z.string().min(1).max(220),
    carefulDefinition: z.string().min(1),
    movePattern: z.array(z.string().min(1)).min(2),
    whyPersuasive: z.array(z.string().min(1)).min(1),
    clearExamples: z.array(clearExample).min(2),
    nonExample: z.object({
      title: z.string().min(1),
      text: z.string().min(1),
      explanation: z.string().min(1),
    }),
    borderlineCase: z.object({
      title: z.string().min(1),
      text: z.string().min(1),
      questions: z.array(z.string().min(1)).min(2),
    }),
    legitimateWhen: z.array(z.string().min(1)).min(1),
    diagnosticQuestions: z.array(z.string().min(1)).min(3),
    spotProveRepair: z.object({
      sourceText: z.string().min(1),
      spot: z.string().min(1),
      prove: z.array(z.string().min(1)).min(1),
      repair: z.string().min(1),
    }),
    projectLaunchpad: z.object({
      essentialQuestion: z.string().min(1),
      huntIdeas: z.array(z.string().min(1)).min(3),
      researchQuestions: z.array(z.string().min(1)).min(3),
      productIdeas: z.array(z.string().min(1)).min(3),
      caution: z.string().min(1).optional(),
    }),
    related: z.array(z.object({ slug: z.string().min(1), relationship: z.string().min(1) })).min(2),
    sourceStatus: z.enum(['original', 'adapted', 'mixed']),
    sourceNotes: z.array(
      z.object({
        title: z.string().min(1),
        creator: z.string().min(1),
        url: z.string().url(),
        license: z.string().min(1),
        licenseUrl: z.string().url(),
        changes: z.string().min(1),
      })
    ),
    furtherReading: z.array(z.object({ label: z.string().min(1), url: z.string().url() })),
  })
  .superRefine((data, ctx) => {
    if (
      (data.sourceStatus === 'adapted' || data.sourceStatus === 'mixed') &&
      data.sourceNotes.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'adapted/mixed sourceStatus requires at least one sourceNote',
      });
    }
  });

const comparisonSchema = z.object({
  slug: z.string().min(1),
  order: z.number().int().min(1),
  left: z.object({ label: z.string().min(1), slug: z.string().min(1).optional() }),
  right: z.object({ label: z.string().min(1), slug: z.string().min(1).optional() }),
  distinction: z.string().min(1),
  rows: z
    .array(
      z.object({ question: z.string().min(1), left: z.string().min(1), right: z.string().min(1) })
    )
    .min(2),
  fitsLeft: z.string().min(1),
  fitsRight: z.string().min(1),
  fitsBoth: z.string().min(1),
  fitsNeither: z.string().min(1),
  decisionPath: z.array(z.string().min(1)).min(3).max(6),
});

describe('fallacy YAML files match the schema', () => {
  const entries = loadYamlDir(FALLACY_DIR);
  it('loads 15 fallacy files', () => {
    expect(entries).toHaveLength(15);
  });
  for (const entry of entries) {
    it(`validates ${entry.file}`, () => {
      const result = fallacySchema.safeParse(entry.data);
      if (!result.success) {
        throw new Error(`${entry.file}: ${JSON.stringify(result.error.issues, null, 2)}`);
      }
      expect(result.success).toBe(true);
    });
  }
});

describe('comparison YAML files match the schema', () => {
  const entries = loadYamlDir(COMPARISON_DIR);
  it('loads at least 7 comparison files', () => {
    expect(entries.length).toBeGreaterThanOrEqual(7);
  });
  for (const entry of entries) {
    it(`validates ${entry.file}`, () => {
      const result = comparisonSchema.safeParse(entry.data);
      if (!result.success) {
        throw new Error(`${entry.file}: ${JSON.stringify(result.error.issues, null, 2)}`);
      }
      expect(result.success).toBe(true);
    });
  }
});
