import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { name: 'homepage', path: '/' },
  { name: 'fallacy (distort-or-dodge)', path: '/fallacies/straw-man/' },
  { name: 'fallacy (weak-evidence)', path: '/fallacies/appeal-to-authority/' },
  { name: 'fallacy (unsupported-leap)', path: '/fallacies/false-cause/' },
  { name: 'fallacy (manipulate-frame)', path: '/fallacies/false-dilemma/' },
  { name: 'comparison index', path: '/compare/' },
  { name: 'comparison page', path: '/compare/red-herring-vs-whataboutism/' },
  { name: 'how arguments work', path: '/how-arguments-work/' },
  { name: 'project guide', path: '/project-guide/' },
  { name: 'printable cards', path: '/resources/cards/' },
  { name: 'privacy', path: '/privacy/' },
];

for (const { name, path } of pages) {
  test(`${name} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join('\n')).toEqual([]);
  });
}
