import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import yaml from 'js-yaml';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

export const FALLACY_DIR = join(root, 'src', 'content', 'fallacies');
export const COMPARISON_DIR = join(root, 'src', 'content', 'comparisons');

export type LoadedEntry<T = Record<string, unknown>> = {
  file: string;
  data: T;
  raw: string;
};

export function loadYamlDir<T = Record<string, unknown>>(dir: string): LoadedEntry<T>[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .sort()
    .map((file) => {
      const raw = readFileSync(join(dir, file), 'utf8');
      return { file, raw, data: yaml.load(raw) as T };
    });
}

export const ASSIGNMENT_MAP: { number: number; slug: string }[] = [
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

export const FAMILY_IDS = [
  'distort-or-dodge',
  'weak-evidence',
  'unsupported-leap',
  'manipulate-frame',
];
