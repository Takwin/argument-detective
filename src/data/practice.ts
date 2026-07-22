/**
 * Practice quick-check scenarios.
 *
 * Design rules (handoff §9.4):
 * - No accounts, no stored score; all state is current-page only.
 * - Include "Not a fallacy" and "Not enough context" options where appropriate.
 * - Reveal an explanation, never a bare correct/incorrect.
 * - Never claim one unique label when more than one is defensible: options may
 *   be marked `defensible`, and explanations name the alternatives.
 *
 * Option quality:
 * - `best`       — the strongest label for this scenario (exactly one each).
 * - `defensible` — a reasonable label a careful student could argue for.
 * - `not-quite`  — worth another look; the explanation teaches why.
 */

export type PracticeQuality = 'best' | 'defensible' | 'not-quite';

export type PracticeOption = {
  id: string;
  label: string;
  quality: PracticeQuality;
  explanation: string;
};

export type PracticeScenario = {
  id: string;
  title: string;
  /** The argument or exchange under examination. */
  prompt: string;
  question: string;
  options: PracticeOption[];
  /** Wrap-up shown after any answer, and in the no-JS discussion. */
  discussion: string;
};

export const practiceScenarios: readonly PracticeScenario[] = [
  {
    id: 'recess-proposal',
    title: 'The recess proposal',
    prompt:
      'Ava says, "Our class should get five extra minutes of recess on Fridays." Ben replies, "Ava thinks school should be all recess and no learning. That would be a disaster."',
    question: 'Which label fits Ben’s reply best?',
    options: [
      {
        id: 'straw-man',
        label: 'Straw Man',
        quality: 'best',
        explanation:
          'Ava proposed five extra minutes on Fridays. Ben replaced that with "all recess and no learning" and attacked the replacement. Defeating the extreme version never answers the real proposal.',
      },
      {
        id: 'ad-hominem',
        label: 'Ad Hominem',
        quality: 'not-quite',
        explanation:
          'Ben attacks a twisted version of Ava’s idea, not Ava herself. If he had said "Ava is lazy, so ignore her," that would be an ad hominem.',
      },
      {
        id: 'slippery-slope',
        label: 'Slippery Slope',
        quality: 'not-quite',
        explanation:
          'A slippery slope predicts a chain of steps sliding to disaster. Ben builds no chain — he swaps in an extreme claim all at once, which is the straw-man move.',
      },
      {
        id: 'not-a-fallacy',
        label: 'Not a fallacy',
        quality: 'not-quite',
        explanation:
          'Strong disagreement is fine when it answers the real claim. Ben never addresses five minutes on Fridays, so this is not fair disagreement.',
      },
    ],
    discussion:
      'A straw man is proved by comparing the original words with the attacked version. In your project, quote both and show exactly what changed.',
  },
  {
    id: 'twenty-million',
    title: 'Twenty million players',
    prompt:
      '"SkyRealm must be the best-designed game of the year. Twenty million people downloaded it last month."',
    question: 'Which label fits this argument best?',
    options: [
      {
        id: 'bandwagon',
        label: 'Bandwagon',
        quality: 'best',
        explanation:
          'The size of the crowd is doing all the work. Downloads measure popularity, and popularity cannot settle a claim about design quality.',
      },
      {
        id: 'appeal-to-authority',
        label: 'Appeal to Authority',
        quality: 'not-quite',
        explanation:
          'No expert, critic, or high-status source is cited — just a large number of people. Crowd size points to bandwagon, not authority.',
      },
      {
        id: 'hasty-generalization',
        label: 'Hasty Generalization',
        quality: 'not-quite',
        explanation:
          'The problem is not a small sample — twenty million is enormous. The problem is that download counts measure the wrong thing for a claim about design.',
      },
      {
        id: 'not-a-fallacy',
        label: 'Not a fallacy',
        quality: 'not-quite',
        explanation:
          'If the claim were "SkyRealm is very popular" or "it will be easy to find other players," the download count would be good evidence. For "best-designed," it is not.',
      },
    ],
    discussion:
      'Popularity numbers are real evidence — about popularity. Ask what the conclusion claims, then ask whether crowd size can prove that kind of claim.',
  },
  {
    id: 'sleep-researcher',
    title: 'The sleep researcher',
    prompt:
      'A pediatric sleep researcher tells the school board: "Three large studies, including one we ran across twelve districts, found that later start times improved adolescent sleep and attendance. Here are the data and their limits."',
    question: 'An expert is speaking. Which label fits best?',
    options: [
      {
        id: 'not-a-fallacy',
        label: 'Not a fallacy',
        quality: 'best',
        explanation:
          'Relevant expertise, cited evidence, and honest limits together are strong support. Expert testimony goes wrong when it replaces evidence — here it summarizes evidence.',
      },
      {
        id: 'appeal-to-authority',
        label: 'Appeal to Authority',
        quality: 'not-quite',
        explanation:
          'The fallacious form needs a mismatch: the wrong field, no evidence, or "experts may not be questioned." None of that is here — the expertise is relevant and the studies are shown.',
      },
      {
        id: 'appeal-to-emotion',
        label: 'Appeal to Emotion',
        quality: 'not-quite',
        explanation:
          'Sleep and attendance matter to people, but the argument rests on studies, not on triggered feelings.',
      },
      {
        id: 'not-enough-context',
        label: 'Not enough context',
        quality: 'not-quite',
        explanation:
          'More detail is always possible, but the passage already shows relevant expertise, evidence, and limits — enough to judge the reasoning itself.',
      },
    ],
    discussion:
      'The question is never "is an expert speaking?" but "does relevant expertise plus evidence support this exact claim?" Here it does.',
  },
  {
    id: 'budget-question',
    title: 'The budget question',
    prompt:
      'At a club meeting, Jo asks, "Why did we spend more than we planned this month?" Sam answers, "Before that — we need to talk about the broken equipment, because it may be why costs went up."',
    question: 'Sam changes the subject. Which label fits best?',
    options: [
      {
        id: 'not-enough-context',
        label: 'Not enough context',
        quality: 'best',
        explanation:
          'Sam does shift topics — but broken equipment might explain the overspending. If it connects back, this is relevant context, not a dodge. We need to hear what comes next.',
      },
      {
        id: 'red-herring',
        label: 'Red Herring',
        quality: 'defensible',
        explanation:
          'If the equipment issue never returns to answer the budget question, it becomes a distraction. The label depends on where the conversation goes — which is exactly why context matters.',
      },
      {
        id: 'whataboutism',
        label: 'Whataboutism',
        quality: 'not-quite',
        explanation:
          'Sam does not point at someone else’s wrongdoing. He raises a possibly related issue, which is a different move.',
      },
      {
        id: 'circular-reasoning',
        label: 'Circular Reasoning',
        quality: 'not-quite',
        explanation:
          'Nothing here uses the conclusion as its own evidence. No circle — just a subject change that may or may not be relevant.',
      },
    ],
    discussion:
      'Some labels cannot be assigned from one sentence. Before naming a fallacy, ask what came before and after the quote — a detective gathers context first.',
  },
  {
    id: 'new-principal',
    title: 'The new principal',
    prompt:
      '"Ever since the new principal arrived in the fall, test scores have gone down. It’s obvious the principal caused it."',
    question: 'Which label fits this argument best?',
    options: [
      {
        id: 'false-cause',
        label: 'Post Hoc / False Cause',
        quality: 'best',
        explanation:
          'The only evidence is that one thing came after another. Curriculum changes, class sizes, or the tests themselves could explain the scores. "After this, therefore because of this."',
      },
      {
        id: 'slippery-slope',
        label: 'Slippery Slope',
        quality: 'not-quite',
        explanation:
          'No future chain is predicted — this explains something that already happened. Slippery slopes look forward; false cause looks back.',
      },
      {
        id: 'ad-hominem',
        label: 'Ad Hominem',
        quality: 'not-quite',
        explanation:
          'The claim blames the principal’s arrival, not their character. Unfair blame can slide toward a personal attack, but the reasoning failure here is causal.',
      },
      {
        id: 'not-a-fallacy',
        label: 'Not a fallacy',
        quality: 'not-quite',
        explanation:
          'Timing can open an investigation. But "it’s obvious" claims proof, and timing alone cannot provide proof.',
      },
    ],
    discussion:
      'Timing is a clue, not a verdict. "After this" starts an investigation; only evidence that rules out other causes can finish it.',
  },
  {
    id: 'screen-time',
    title: 'Screen-time advice',
    prompt:
      'Dad says, "You should stop playing games an hour before bed — the research says screens disrupt sleep." Kai replies, "Why should I listen to you? You watch TV until midnight."',
    question: 'Which label fits Kai’s reply best?',
    options: [
      {
        id: 'whataboutism',
        label: 'Whataboutism',
        quality: 'best',
        explanation:
          'Kai answers the advice by pointing at Dad’s own habits instead of the claim about screens and sleep. Dad’s TV schedule does not change what the research says.',
      },
      {
        id: 'ad-hominem',
        label: 'Ad Hominem',
        quality: 'defensible',
        explanation:
          'Many books file "you too" (tu quoque) under ad hominem, because it targets the speaker instead of the argument. Both labels describe this move — what matters is that the sleep evidence was never answered.',
      },
      {
        id: 'appeal-to-authority',
        label: 'Appeal to Authority',
        quality: 'not-quite',
        explanation:
          'Dad mentions research, but Kai’s reply does not lean on any authority — it deflects the question back at the speaker.',
      },
      {
        id: 'not-a-fallacy',
        label: 'Not a fallacy',
        quality: 'not-quite',
        explanation:
          'Dad’s own habits might be fair to raise separately — consistency matters. But they do not answer whether the advice is right.',
      },
    ],
    discussion:
      'When a move fits two labels, pick the one that best explains the failure — and say why. The key fact here: the original claim was never answered.',
  },
  {
    id: 'calculator-quiz',
    title: 'One calculator quiz',
    prompt:
      '"If we allow calculators on this one quiz, soon students will use them for everything, and by June nobody will be able to do any math at all."',
    question: 'Which label fits this argument best?',
    options: [
      {
        id: 'slippery-slope',
        label: 'Slippery Slope',
        quality: 'best',
        explanation:
          'One small step is claimed to trigger an unstoppable slide to disaster, with no evidence for the links between "one quiz," "everything," and "no math at all."',
      },
      {
        id: 'appeal-to-emotion',
        label: 'Appeal to Emotion',
        quality: 'defensible',
        explanation:
          'The scary ending is doing real work: fear of "no math at all" is what makes the unsupported chain persuasive. Slippery slopes and fear appeals often travel together.',
      },
      {
        id: 'false-cause',
        label: 'Post Hoc / False Cause',
        quality: 'not-quite',
        explanation:
          'Both involve weak causal thinking, but this argument predicts a future chain rather than explaining a past event. The forward-looking chain is the slippery-slope signature.',
      },
      {
        id: 'not-a-fallacy',
        label: 'Not a fallacy',
        quality: 'not-quite',
        explanation:
          'A prediction supported by evidence for each step would be fine. This one asserts inevitability with no support for any link.',
      },
    ],
    discussion:
      'Chains of consequences are not automatically fallacious. Test each link: possible, probable, or just imaginable? Fear does the persuading when the links are missing.',
  },
  {
    id: 'breakfast-exam',
    title: 'Breakfast and the exam',
    prompt:
      '"My brother skipped breakfast the day of his big exam and got the top score. Skipping breakfast clearly improves test results."',
    question: 'Which label fits best? (More than one may be defensible.)',
    options: [
      {
        id: 'anecdotal-fallacy',
        label: 'Anecdotal Fallacy',
        quality: 'best',
        explanation:
          'One person’s story is asked to prove a general claim about test results. A single vivid case cannot carry that conclusion.',
      },
      {
        id: 'hasty-generalization',
        label: 'Hasty Generalization',
        quality: 'defensible',
        explanation:
          'A sample of one is stretched to everyone. Anecdotal fallacy and hasty generalization often describe the same jump from different angles — the story is the evidence, the overreach is the conclusion.',
      },
      {
        id: 'false-cause',
        label: 'Post Hoc / False Cause',
        quality: 'defensible',
        explanation:
          'It also treats "skipped breakfast, then scored high" as cause and effect. One argument can commit more than one fallacy — a label is a description, not a verdict.',
      },
      {
        id: 'not-a-fallacy',
        label: 'Not a fallacy',
        quality: 'not-quite',
        explanation:
          'The story is real evidence about the brother’s morning. It just cannot carry a claim about test results in general.',
      },
    ],
    discussion:
      'Real arguments often break more than one rule at once. Name the failure you can prove with the speaker’s own words, then mention other labels that also fit.',
  },
  {
    id: 'art-or-broke',
    title: 'Art or bankruptcy',
    prompt: '"Either we cut the art program, or this school goes broke. Which do you choose?"',
    question: 'Which label fits this argument best?',
    options: [
      {
        id: 'false-dilemma',
        label: 'False Dilemma',
        quality: 'best',
        explanation:
          'Two options are presented as the only ones. Budgets usually have many levers — smaller cuts across programs, fundraising, staggered spending. Hiding the middle options is the move.',
      },
      {
        id: 'not-enough-context',
        label: 'Not enough context',
        quality: 'defensible',
        explanation:
          'If the budget truly comes down to exactly these two options, the binary could be genuine. We would need the actual numbers — though the burden is on the speaker to show them.',
      },
      {
        id: 'slippery-slope',
        label: 'Slippery Slope',
        quality: 'not-quite',
        explanation:
          'There is no chain of steps sliding to a distant disaster — just two choices presented as if they were exhaustive right now.',
      },
      {
        id: 'appeal-to-emotion',
        label: 'Appeal to Emotion',
        quality: 'not-quite',
        explanation:
          'Fear of going broke plays a part, but the core trick is erasing the alternatives, not replacing evidence with feeling.',
      },
    ],
    discussion:
      'When someone hands you exactly two options, ask first: who removed the others? Sometimes a binary is real — and it is the speaker’s job to show that.',
  },
  {
    id: 'sunday-dinners',
    title: 'Sunday dinners',
    prompt:
      '"Our family has eaten Sunday dinner together for as long as anyone remembers. Keeping that shared tradition matters to us, so let’s not schedule practices on Sunday evenings."',
    question: 'Which label fits this argument best?',
    options: [
      {
        id: 'not-a-fallacy',
        label: 'Not a fallacy',
        quality: 'best',
        explanation:
          'The goal is preserving a meaningful tradition. When the tradition itself is the stated purpose, its age and continuity are exactly relevant. The reasoning fits its goal.',
      },
      {
        id: 'appeal-to-tradition',
        label: 'Appeal to Tradition',
        quality: 'not-quite',
        explanation:
          'That fallacy uses "we have always done it" to prove something else — that a practice is correct or best. Here nothing else is being proven; the tradition is the point.',
      },
      {
        id: 'bandwagon',
        label: 'Bandwagon',
        quality: 'not-quite',
        explanation: 'No crowd is offered as evidence — just one family’s own valued custom.',
      },
      {
        id: 'appeal-to-emotion',
        label: 'Appeal to Emotion',
        quality: 'not-quite',
        explanation:
          'Feelings are involved, but they are not hiding missing evidence. The values are stated openly — which is exactly what makes this reasonable.',
      },
    ],
    discussion:
      'Before labeling, ask what the speaker is trying to achieve. If the tradition itself is the goal, pointing to the tradition is relevant — not a fallacy.',
  },
] as const;
