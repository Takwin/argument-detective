import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const familyId = z.enum([
  'distort-or-dodge',
  'weak-evidence',
  'unsupported-leap',
  'manipulate-frame',
]);

const sourceStatus = z.enum(['original', 'adapted', 'mixed']);

const sourceNote = z.object({
  title: z.string().min(1),
  creator: z.string().min(1),
  url: z.string().url(),
  license: z.string().min(1),
  licenseUrl: z.string().url(),
  changes: z.string().min(1),
});

const clearExample = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  diagnosis: z.array(z.string().min(1)).min(1),
  repairedVersion: z.string().min(1),
});

/**
 * Fallacy content schema. Mirrors the FallacyRecord contract in the handoff
 * (section 11.1) and enforces the field-level validation rules in 11.2.
 * Cross-entry rules (related slug resolves, number matches the assignment map,
 * exactly 15 records) are checked in src/data/fallacies.ts and the content
 * tests, because Zod validates one entry at a time.
 */
const fallacies = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/fallacies' }),
  schema: z
    .object({
      number: z.number().int().min(1).max(15),
      slug: z.string().min(1),
      title: z.string().min(1),
      shortTitle: z.string().min(1).optional(),
      family: familyId,
      icon: z.string().min(1),
      aliases: z.array(z.string().min(1)).default([]),
      keywords: z.array(z.string().min(1)).default([]),
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
      related: z
        .array(
          z.object({
            slug: z.string().min(1),
            relationship: z.string().min(1),
          })
        )
        .min(2),
      sourceStatus,
      sourceNotes: z.array(sourceNote).default([]),
      furtherReading: z
        .array(
          z.object({
            label: z.string().min(1),
            url: z.string().url(),
          })
        )
        .default([]),
    })
    .superRefine((data, ctx) => {
      if (
        (data.sourceStatus === 'adapted' || data.sourceStatus === 'mixed') &&
        data.sourceNotes.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `sourceStatus is "${data.sourceStatus}" but no sourceNotes were provided.`,
          path: ['sourceNotes'],
        });
      }
    }),
});

/**
 * Comparison guides. The "right" side of a comparison is not always a full
 * fallacy page (e.g. "Strong Disagreement", "Weak or Missing Evidence"), so
 * each side carries a display label plus an optional slug for linking.
 */
const comparisons = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/comparisons' }),
  schema: z.object({
    slug: z.string().min(1),
    order: z.number().int().min(1),
    left: z.object({ label: z.string().min(1), slug: z.string().min(1).optional() }),
    right: z.object({ label: z.string().min(1), slug: z.string().min(1).optional() }),
    distinction: z.string().min(1),
    rows: z
      .array(
        z.object({
          question: z.string().min(1),
          left: z.string().min(1),
          right: z.string().min(1),
        })
      )
      .min(2),
    fitsLeft: z.string().min(1),
    fitsRight: z.string().min(1),
    fitsBoth: z.string().min(1),
    fitsNeither: z.string().min(1),
    decisionPath: z.array(z.string().min(1)).min(3).max(6),
  }),
});

export const collections = { fallacies, comparisons };
