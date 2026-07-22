/**
 * The four practical fallacy "families", organized by what goes wrong in the
 * reasoning rather than by traditional (and overlapping) taxonomy.
 */

export type FamilyId =
  'distort-or-dodge' | 'weak-evidence' | 'unsupported-leap' | 'manipulate-frame';

export type Family = {
  id: FamilyId;
  label: string;
  /** The one diagnostic question that defines the family. */
  question: string;
  description: string;
  /** CSS custom-property token used for the family accent color. */
  colorVar: string;
};

export const families: readonly Family[] = [
  {
    id: 'distort-or-dodge',
    label: 'Distort or Dodge',
    question: 'Did the response address the real claim?',
    description:
      'These moves replace, distract from, or attack something other than the actual argument.',
    colorVar: '--family-dodge',
  },
  {
    id: 'weak-evidence',
    label: 'Use Weak Evidence',
    question: 'Is the evidence relevant, representative, and strong enough?',
    description:
      'These moves ask weak evidence to carry a conclusion that is too large or too certain.',
    colorVar: '--family-evidence',
  },
  {
    id: 'unsupported-leap',
    label: 'Make an Unsupported Leap',
    question: 'Does the conclusion actually follow from the reasons?',
    description:
      'These moves jump from premises to a conclusion without building the needed bridge.',
    colorVar: '--family-leap',
  },
  {
    id: 'manipulate-frame',
    label: 'Manipulate the Frame',
    question: 'Is the audience being boxed in or pushed instead of properly informed?',
    description: 'These moves control the choices or emotional pressure around an argument.',
    colorVar: '--family-frame',
  },
] as const;

const familyById = new Map<FamilyId, Family>(families.map((f) => [f.id, f]));

export function getFamily(id: FamilyId): Family {
  const family = familyById.get(id);
  if (!family) throw new Error(`Unknown fallacy family: ${id}`);
  return family;
}

export const familyIds: readonly FamilyId[] = families.map((f) => f.id);
