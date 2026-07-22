/**
 * Capture mobile / tablet / desktop screenshots of representative pages.
 *
 * Usage:
 *   npm run build && npm run preview &   # serve dist on :4321
 *   node scripts/screenshots.mjs
 *
 * Output: screenshots/<page>-<width>.png
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = process.env.PREVIEW_URL ?? 'http://localhost:4321';
const OUT = 'screenshots';
mkdirSync(OUT, { recursive: true });

const widths = [
  { label: 'mobile', width: 375, height: 812 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1440, height: 1000 },
];

const targets = [
  { name: 'home', path: '/' },
  { name: 'fallacy', path: '/fallacies/false-cause/' },
  { name: 'compare', path: '/compare/red-herring-vs-whataboutism/' },
  { name: 'how-arguments-work', path: '/how-arguments-work/' },
];

const browser = await chromium.launch();
try {
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
} finally {
  await browser.close();
}
