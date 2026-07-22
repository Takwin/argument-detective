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

test('homepage search filters to one result and clears', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('searchbox');
  await search.fill('what about');
  await expect(page.locator('[data-results-status]')).toHaveText(/Showing 1 of 15/);
  await expect(page.getByRole('heading', { name: 'Whataboutism' })).toBeVisible();
});

test('404 page is helpful', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('main').getByRole('link', { name: 'All 15 fallacies' })).toBeVisible();
});
