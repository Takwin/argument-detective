/** Argument vocabulary used on the How Arguments Work page and in tooltips. */

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: 'Claim',
    definition: 'A statement someone wants an audience to accept.',
  },
  {
    term: 'Conclusion',
    definition: 'The main claim the argument is trying to establish.',
  },
  {
    term: 'Reason or premise',
    definition: 'A statement offered in support of the conclusion.',
  },
  {
    term: 'Evidence',
    definition:
      'Information used to show that a reason or claim is accurate, such as observations, data, examples, expert findings, records, or reliable testimony.',
  },
  {
    term: 'Assumption',
    definition: 'An unstated idea the argument needs in order to work.',
  },
  {
    term: 'Counterargument',
    definition: 'A reason to question, limit, or reject the conclusion.',
  },
  {
    term: 'Rebuttal',
    definition: 'A response to a counterargument.',
  },
] as const;

/** The three tests every reason should pass to support a conclusion. */
export const supportTests: readonly GlossaryTerm[] = [
  {
    term: 'Acceptable',
    definition: 'Is the reason believable, accurate, and fairly stated?',
  },
  {
    term: 'Relevant',
    definition: 'Does the reason actually bear on the conclusion?',
  },
  {
    term: 'Sufficient',
    definition: 'Is there enough support for a conclusion this broad and certain?',
  },
] as const;

/** The persistent fallacy-fallacy safeguard, reused site-wide. */
export const FALLACY_FALLACY_SAFEGUARD =
  'A weak or fallacious argument does not prove that its conclusion is false. It proves only that this argument did not support the conclusion well enough. The conclusion may still be true for better reasons.';
