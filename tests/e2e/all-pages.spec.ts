// Every built page: axe WCAG 2.2 AA in light and dark, no sideways scrolling at 320 px, and a visible focus ring.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../../dist', import.meta.url));
const walk = (d: string, out: string[] = []) => {
  for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p, out); else if (p.endsWith('.html')) out.push(p); }
  return out;
};
const PAGES = walk(DIST).map((f) => '/learnai/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, ''));

test.describe.configure({ mode: 'parallel' });

for (const path of PAGES) {
  test(`axe light and dark: ${path}`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'Run once, at desktop size');
    for (const scheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(path);
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      expect(r.violations.map((v) => `${scheme} ${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
    }
  });

  test(`no sideways scroll at 320 px: ${path}`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'Viewport set in the test');
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('keyboard focus is always visible', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Keyboard test at desktop size');
  await page.goto('/learnai/learn/perplexity-sources-you-can-check/');
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    const ring = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return 'none';
      const s = getComputedStyle(el);
      return s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2 ? 'ok' : `${el.tagName}.${el.className}: ${s.outlineStyle} ${s.outlineWidth} ${s.boxShadow}`;
    });
    expect(ring).toBe('ok');
  }
});

test('reduced motion turns off animation', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Once is enough');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/learnai/');
  await page.getByRole('button', { name: 'I am stuck' }).click();
  const anim = await page.locator('.la-dlg__panel').evaluate((el) => getComputedStyle(el).animationName);
  expect(anim).toBe('none');
});
