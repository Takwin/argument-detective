import { describe, it, expect } from 'vitest';
import { practiceScenarios } from '../src/data/practice';

/**
 * Integrity checks for the practice quick-check scenarios, mirroring the
 * handoff's §9.4 requirements.
 */

const PLACEHOLDERS = ['todo', 'lorem ipsum', 'tbd', 'coming soon', 'placeholder'];

describe('practice scenarios', () => {
  it('has at least 8 scenarios with unique ids', () => {
    expect(practiceScenarios.length).toBeGreaterThanOrEqual(8);
    const ids = practiceScenarios.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const scenario of practiceScenarios) {
    describe(scenario.id, () => {
      it('has prompt, question, and discussion text', () => {
        expect(scenario.title.length).toBeGreaterThan(0);
        expect(scenario.prompt.length).toBeGreaterThan(20);
        expect(scenario.question.length).toBeGreaterThan(5);
        expect(scenario.discussion.length).toBeGreaterThan(20);
      });

      it('has at least 3 options with unique ids', () => {
        expect(scenario.options.length).toBeGreaterThanOrEqual(3);
        const ids = scenario.options.map((o) => o.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it('has exactly one best option', () => {
        const best = scenario.options.filter((o) => o.quality === 'best');
        expect(best).toHaveLength(1);
      });

      it('gives every option a real explanation, not a bare verdict', () => {
        for (const option of scenario.options) {
          expect(option.label.length).toBeGreaterThan(0);
          expect(option.explanation.length, `${scenario.id}/${option.id}`).toBeGreaterThan(40);
        }
      });

      it('contains no placeholder text', () => {
        const raw = JSON.stringify(scenario).toLowerCase();
        for (const token of PLACEHOLDERS) {
          expect(raw.includes(token), `${scenario.id} contains "${token}"`).toBe(false);
        }
      });
    });
  }

  it('includes "Not a fallacy" as an option in most scenarios', () => {
    const withNotAFallacy = practiceScenarios.filter((s) =>
      s.options.some((o) => o.id === 'not-a-fallacy')
    );
    expect(withNotAFallacy.length).toBeGreaterThanOrEqual(practiceScenarios.length / 2);
  });

  it('has at least one scenario where "Not a fallacy" is the best answer', () => {
    const best = practiceScenarios.filter((s) =>
      s.options.some((o) => o.id === 'not-a-fallacy' && o.quality === 'best')
    );
    expect(best.length).toBeGreaterThanOrEqual(1);
  });

  it('has at least one scenario where "Not enough context" is the best answer', () => {
    const best = practiceScenarios.filter((s) =>
      s.options.some((o) => o.id === 'not-enough-context' && o.quality === 'best')
    );
    expect(best.length).toBeGreaterThanOrEqual(1);
  });

  it('has at least one scenario with multiple defensible labels', () => {
    const multi = practiceScenarios.filter(
      (s) => s.options.filter((o) => o.quality !== 'not-quite').length >= 2
    );
    expect(multi.length).toBeGreaterThanOrEqual(1);
  });
});
