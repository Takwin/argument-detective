# Content Audit

Confirms all 15 topic records and required fields, and that the editorial
decisions from the handoff were applied. Automated portions are enforced by
`tests/content-completeness.test.ts` and `tests/content-schema.test.ts` (55
tests, all passing) plus build-time cross-entry validation in
`src/data/fallacies.ts`.

## Record completeness (all 15)

Every fallacy record contains: plain (short) definition, careful definition,
move pattern, why-persuasive, **two** diagnosed clear examples with repairs, a
non-example, a borderline case with **two or more** questions, legitimate-use
conditions, **three or more** diagnostic questions, a Spot/Prove/Repair lab, a
project launchpad (essential question, 3+ hunt ideas, 3+ research questions, 3+
product ideas, caution), **two or more** related topics (all resolving to real
slugs), a source status, and further reading. Short definitions are ≤ 220
characters. No placeholder strings (`TODO`, `lorem ipsum`, `TBD`, `coming soon`)
appear in content.

|   # | Topic                    | Slug                 | Family                   | Source status |
| --: | ------------------------ | -------------------- | ------------------------ | ------------- |
|   1 | Straw Man                | straw-man            | Distort or Dodge         | original      |
|   2 | False Dilemma            | false-dilemma        | Manipulate the Frame     | original      |
|   3 | Slippery Slope           | slippery-slope       | Make an Unsupported Leap | original      |
|   4 | Anecdotal Fallacy        | anecdotal-fallacy    | Use Weak Evidence        | original      |
|   5 | Appeal to Authority      | appeal-to-authority  | Use Weak Evidence        | original      |
|   6 | Appeal to Emotion        | appeal-to-emotion    | Manipulate the Frame     | original      |
|   7 | Circular Reasoning       | circular-reasoning   | Make an Unsupported Leap | original      |
|   8 | Bandwagon                | bandwagon            | Use Weak Evidence        | original      |
|   9 | Post Hoc and False Cause | false-cause          | Make an Unsupported Leap | original      |
|  10 | Red Herring              | red-herring          | Distort or Dodge         | original      |
|  11 | Ad Hominem               | ad-hominem           | Distort or Dodge         | original      |
|  12 | Whataboutism             | whataboutism         | Distort or Dodge         | original      |
|  13 | Appeal to Tradition      | appeal-to-tradition  | Use Weak Evidence        | original      |
|  14 | Guilt by Association     | guilt-by-association | Distort or Dodge         | original      |
|  15 | Hasty Generalization     | hasty-generalization | Use Weak Evidence        | original      |

## Editorial decisions applied (from handoff §13)

- **Circular Reasoning:** Both weak PDF examples replaced; includes a
  definitional non-example (triangle) distinct from the argument non-example.
- **Appeal to Authority:** Framed as a _misplaced/unsupported_ appeal; the
  non-example is a relevant expert citing evidence; unrelated-authority factual
  claims used as the clear examples.
- **Bandwagon:** Popularity-as-proof (clear examples) separated from
  popularity-as-practical-information (non-example: choosing a popular
  multiplayer game to find players); crowded-restaurant used as borderline.
- **Appeal to Tradition:** Thanksgiving-style "tradition is the goal" case used
  as the non-example (valid use).
- **Post Hoc / False Cause:** False Cause presented as the broad category, Post
  Hoc as one form; controlled experiment used as the non-example; no unsupported
  superlatives.
- **Whataboutism:** Distinguished from Red Herring and from a legitimate
  consistency check (answer first, then check standards); overlap with
  _tu quoque_ explained.
- **Anecdotal vs. Hasty Generalization:** Distinguished on-page and in a
  dedicated comparison guide.
- **False Dilemma:** Second PDF example replaced with a genuine
  missing-alternatives case (cancel-or-charge); real two-option schedule used as
  the non-example.
- **Red Herring:** First PDF example replaced (copying-vs-workload); neutral
  public-spokesperson example kept.
- **Ad Hominem:** First PDF example replaced; age/experience nuance handled in
  the borderline case; conflict-of-interest handled in the non-example.
- No introductory example is partisan or inflammatory; no unsupported "most
  common in history"-style claims appear.

## Safeguards

- The **fallacy-fallacy** safeguard appears on every fallacy page, on
  `/how-arguments-work/`, and on `/project-guide/` (single source string in
  `src/data/glossary.ts`).
- Every page communicates that a label may depend on context, that more than one
  label can fit, and that a similar move can be legitimate.

## Comparison guides (7)

All present with a one-sentence distinction, a two-column table, an example
fitting each side, one fitting both, one fitting neither, a 3–5 step decision
path, and links to the full pages: anecdotal-vs-hasty-generalization,
red-herring-vs-whataboutism, ad-hominem-vs-guilt-by-association,
bandwagon-vs-appeal-to-authority, false-cause-vs-slippery-slope,
circular-reasoning-vs-weak-evidence, straw-man-vs-strong-disagreement.

## Manual review notes

- Definitions identify the reasoning move, not the person's character.
- Non-examples sit near the boundary (not unrelated good arguments).
- Borderline cases stay genuinely uncertain and ask questions.
- Repairs preserve the speaker's reasonable goal.
- Reading level and sentence length target grades 5–6.
