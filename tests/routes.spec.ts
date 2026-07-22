import { test, expect } from '@playwright/test';

const staticRoutes = [
  '/',
  '/how-arguments-work/',
  '/project-guide/',
  '/compare/',
  '/resources/',
  '/resources/cards/',
  '/resources/project-planner/',
  '/resources/comparison-chart/',
  '/credits/',
  '/privacy/',
  '/accessibility/',
  '/practice/',
];

const fallacySlugs = [
  'straw-man',
  'false-dilemma',
  'slippery-slope',
  'anecdotal-fallacy',
  'appeal-to-authority',
  'appeal-to-emotion',
  'circular-reasoning',
  'bandwagon',
  'false-cause',
  'red-herring',
  'ad-hominem',
  'whataboutism',
  'appeal-to-tradition',
  'guilt-by-association',
  'hasty-generalization',
];

const comparisonSlugs = [
  'anecdotal-vs-hasty-generalization',
  'red-herring-vs-whataboutism',
  'ad-hominem-vs-guilt-by-association',
  'bandwagon-vs-appeal-to-authority',
  'false-cause-vs-slippery-slope',
  'circular-reasoning-vs-weak-evidence',
  'straw-man-vs-strong-disagreement',
];

for (const route of staticRoutes) {
  test(`static route ${route} responds with exactly one h1`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.ok(), `${route} should return 2xx`).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
  });
}

for (const slug of fallacySlugs) {
  test(`fallacy route /fallacies/${slug}/ renders`, async ({ page }) => {
    const res = await page.goto(`/fallacies/${slug}/`);
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(
      page.getByRole('heading', { name: 'Spot it. Prove it. Repair it.' })
    ).toBeVisible();
  });
}

for (const slug of comparisonSlugs) {
  test(`comparison route /compare/${slug}/ renders`, async ({ page }) => {
    const res = await page.goto(`/compare/${slug}/`);
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator('table.data')).toBeVisible();
  });
}

test('homepage search visually hides non-matching cards', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('searchbox');
  await search.fill('what about');
  await expect(page.locator('[data-results-status]')).toHaveText(/Showing 1 of 15/);
  // Assert computed visibility, not just the counter or the hidden property:
  // a CSS display rule overriding [hidden] once left all 15 cards visible.
  await expect(page.locator('[data-fallacy-card]:visible')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Whataboutism' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Straw Man' })).toBeHidden();

  // Clearing restores every card.
  await search.clear();
  await expect(page.locator('[data-fallacy-card]:visible')).toHaveCount(15);
});

test.describe('320px reflow (WCAG 1.4.10)', () => {
  test.use({ viewport: { width: 320, height: 800 } });

  const reflowPages = [
    '/',
    '/fallacies/slippery-slope/', // "Make an Unsupported Leap" badge (longest)
    '/compare/bandwagon-vs-appeal-to-authority/',
    '/practice/',
    '/project-guide/',
  ];

  for (const path of reflowPages) {
    test(`no horizontal overflow at 320px: ${path}`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });
      expect(overflow, `document scrolls horizontally by ${overflow}px`).toBeLessThanOrEqual(0);
    });
  }
});

test('404 page is helpful', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('main').getByRole('link', { name: 'All 15 fallacies' })).toBeVisible();
});

test('practice: checking an answer reveals an explanation, not a bare verdict', async ({
  page,
}) => {
  await page.goto('/practice/');
  const first = page.locator('[data-quick-check]').first();
  await first.getByRole('radio', { name: 'Straw Man' }).check();
  await first.getByRole('button', { name: 'Check my thinking' }).click();
  const feedback = first.locator('[data-qc-feedback]');
  await expect(feedback).toBeVisible();
  await expect(feedback).toContainText('Strong choice');
  await expect(feedback).toContainText('Ava proposed five extra minutes');
  await expect(feedback).toContainText('The bigger picture');
});

test('practice: a defensible answer is not marked wrong', async ({ page }) => {
  await page.goto('/practice/');
  const screenTime = page.locator('[data-quick-check]', { hasText: 'Screen-time advice' });
  await screenTime.getByRole('radio', { name: 'Ad Hominem' }).check();
  await screenTime.getByRole('button', { name: 'Check my thinking' }).click();
  const feedback = screenTime.locator('[data-qc-feedback]');
  await expect(feedback).toContainText('Defensible choice');
  await expect(feedback).toContainText('tu quoque');
});

test('practice: checking with nothing selected asks for a choice', async ({ page }) => {
  await page.goto('/practice/');
  const first = page.locator('[data-quick-check]').first();
  await first.getByRole('button', { name: 'Check my thinking' }).click();
  await expect(first.locator('[data-qc-feedback]')).toContainText('Choose the label');
});
