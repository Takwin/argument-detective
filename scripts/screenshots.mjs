/**
 * Capture the visual-QA evidence set (handoff §22.3):
 * - Representative pages at 320x800 (mobile), 768x1024 (tablet), 1440x1000 (desktop).
 * - Homepage with a search returning one result.
 * - Print-preview renderings (print media emulation) for a topic page and cards.
 *
 * Usage:
 *   npm run build && npm run preview &   # serve dist on :4321
 *   node scripts/screenshots.mjs
 *
 * Output: screenshots/<name>-<width>.png
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = process.env.PREVIEW_URL ?? 'http://localhost:4321';
const OUT = 'screenshots';
mkdirSync(OUT, { recursive: true });

const widths = [
  { label: 'mobile', width: 320, height: 800 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1440, height: 1000 },
];

const targets = [
  { name: 'home', path: '/' },
  { name: 'fallacy', path: '/fallacies/false-cause/' },
  { name: 'compare', path: '/compare/red-herring-vs-whataboutism/' },
  { name: 'how-arguments-work', path: '/how-arguments-work/' },
  { name: 'practice', path: '/practice/' },
];

const browser = await chromium.launch();
try {
  // Responsive sweeps.
  for (const vp of widths) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    for (const target of targets) {
      await page.goto(BASE + target.path, { waitUntil: 'networkidle' });
      const file = `${OUT}/${target.name}-${vp.label}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log('saved', file);
    }
    await context.close();
  }

  // Homepage with a one-result search (desktop).
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.getByRole('searchbox').fill('what about');
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/home-search-one-result.png`, fullPage: true });
    console.log('saved', `${OUT}/home-search-one-result.png`);
    await context.close();
  }

  // Print previews (print media emulation, Letter-ish width).
  {
    const context = await browser.newContext({
      viewport: { width: 816, height: 1056 }, // 8.5in x 11in at 96dpi
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.emulateMedia({ media: 'print' });
    const printTargets = [
      { name: 'print-fallacy', path: '/fallacies/false-cause/' },
      { name: 'print-cards', path: '/resources/cards/' },
    ];
    for (const target of printTargets) {
      await page.goto(BASE + target.path, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `${OUT}/${target.name}.png`, fullPage: true });
      console.log('saved', `${OUT}/${target.name}.png`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
