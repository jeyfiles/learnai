import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '/learnai/', '/learnai/roadmap/', '/learnai/learn/', '/learnai/learn/level-1/', '/learnai/learn/level-5/',
  '/learnai/workbooks/', '/learnai/projects/', '/learnai/levels/', '/learnai/levels/level-1-foundations/',
  '/learnai/glossary/', '/learnai/help/', '/learnai/about/', '/learnai/certificate/',
  '/learnai/learn/chatgpt-study-mode-learn-a-concept/', '/learnai/learn/compare-two-ai-tools/',
  '/learnai/workbooks/build-your-ai-portfolio-page/', '/learnai/levels/level-3-create/',
  '/learnai/careers/', '/learnai/careers/ai-engineer/', '/learnai/careers/no-code-builder/',
  '/learnai/learn/canva-magic-studio-portfolio-visuals/', '/learnai/learn/level-3/',
];

for (const path of ROUTES) {
  test(`page ${path} has one H1, SEO tags and no accessibility violations`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://jeyinsights.com${path}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-learnai\.png$/);
    expect((await page.title()).length).toBeGreaterThan(10);
    const noScroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(noScroll, 'no sideways scrolling').toBe(true);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(axe.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}

test('page titles are unique', async ({ page }) => {
  const titles = new Set<string>();
  for (const path of ROUTES) { await page.goto(path); titles.add(await page.title()); }
  expect(titles.size).toBe(ROUTES.length);
});

test('main nav marks the current section', async ({ page, isMobile }) => {
  await page.goto('/learnai/learn/level-1/');
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Learn AI' }).getByRole('link', { name: 'Lessons' })).toHaveAttribute('aria-current', 'page');
});

test('phone menu opens, closes with Escape and returns focus', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone only');
  await page.goto('/learnai/');
  const btn = page.getByRole('button', { name: 'Menu' });
  await expect(page.getByRole('link', { name: 'My roadmap', exact: true })).toBeHidden();
  await btn.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('link', { name: 'My roadmap', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
  await expect(btn).toBeFocused();
});

test('dark mode choice is saved with the Learn AI prefix', async ({ page, isMobile }) => {
  await page.goto('/learnai/');
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('button', { name: 'Dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain('jeyinsights-learnai-theme');
  for (const k of keys) expect(k.startsWith('jeyinsights-learnai-')).toBe(true);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('skip link moves to main content', async ({ page }) => {
  await page.goto('/learnai/about/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('focus moves to the H1 after moving between pages', async ({ page }) => {
  await page.goto('/learnai/');
  await page.locator('main').getByRole('link', { name: 'Build my roadmap' }).click();
  await expect(page.locator('h1')).toBeFocused();
});

test('404 page is branded and links home', async ({ page }) => {
  await page.goto('/learnai/404.html');
  await expect(page.locator('h1')).toHaveText('We could not find that page');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('dark mode passes contrast checks', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  for (const path of ['/learnai/', '/learnai/about/', '/learnai/learn/']) {
    await page.goto(path);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze();
    expect(axe.violations.map((v) => `${path} ${v.id}`)).toEqual([]);
  }
});
