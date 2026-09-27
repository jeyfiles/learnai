import { test, expect } from '@playwright/test';

const LESSON = '/learnai/learn/chatgpt-study-mode-learn-a-concept/';

test('Level 1 lists 10 lessons and filters by tool and learner type', async ({ page }) => {
  await page.goto('/learnai/learn/level-1/');
  const cards = page.locator('[data-lesson-card]');
  await expect(cards).toHaveCount(10);
  await page.getByLabel('Tool').selectOption('Perplexity');
  await expect(page.locator('[data-lesson-card]:visible')).toHaveCount(1);
  await page.getByLabel('Tool').selectOption('');
  await page.getByLabel('My path').selectOption('ai-engineer');
  const n = await page.locator('[data-lesson-card]:visible').count();
  expect(n).toBeGreaterThan(0);
  expect(n).toBeLessThanOrEqual(10);
  await expect(page.getByRole('status')).toHaveText(`${n} lessons`);
});

test('build tabs switch builds, update the address and work with arrow keys', async ({ page }) => {
  await page.goto(LESSON);
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(3);
  await expect(page.getByRole('tabpanel')).toHaveCount(1);
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(page).toHaveURL(/build=course-notes-quiz/);
  await tabs.nth(1).press('ArrowRight');
  await expect(tabs.nth(2)).toBeFocused();
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await page.goto(`${LESSON}?build=course-notes-quiz`);
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
});

test('copy button copies the prompt', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(LESSON);
  const panel = page.getByRole('tabpanel');
  await panel.getByRole('button', { name: 'Copy prompt' }).first().click();
  await expect(panel.getByRole('button', { name: /Copied/ }).first()).toBeVisible();
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text).toContain('Help me work it out step by step');
});

test('marking a lesson done is saved and shown on the level list', async ({ page }) => {
  await page.goto(LESSON);
  const btn = page.getByRole('button', { name: 'Mark this lesson as done' });
  await btn.click();
  await expect(page.getByRole('button', { name: /Done/ })).toHaveAttribute('aria-pressed', 'true');
  const saved = await page.evaluate(() => localStorage.getItem('jeyinsights-learnai-progress'));
  expect(JSON.parse(saved!).done).toContain('lesson:chatgpt-study-mode-learn-a-concept');
  await page.goto('/learnai/learn/level-1/');
  const card = page.locator('[data-item="lesson:chatgpt-study-mode-learn-a-concept"]');
  await expect(card.getByText('Done', { exact: true })).toBeVisible();
});

test('lessons show what you need before you start', async ({ page }) => {
  await page.goto('/learnai/learn/claude-feedback-without-a-rewrite/');
  const note = page.getByRole('complementary', { name: 'Before you start' });
  await expect(note).toContainText('Access:');
  await expect(note).toContainText('18 and over');
  await expect(page.getByText('Under 18?')).toHaveCount(0);
});

test('careers page lists five paths and each path page links to its levels', async ({ page }) => {
  await page.goto('/learnai/careers/');
  await expect(page.locator('.la-path')).toHaveCount(5);
  await page.getByRole('link', { name: 'AI engineer' }).first().click();
  await expect(page.locator('h1')).toHaveText('AI engineer');
  await expect(page.getByRole('heading', { name: 'Your first portfolio pieces' })).toBeVisible();
  await expect(page.getByRole('link', { name: /^Level 1:/ })).toBeVisible();
});

test('home page uses the new hero and lists the career paths', async ({ page }) => {
  await page.goto('/learnai/');
  await expect(page.locator('h1')).toHaveText('Build real AI skills, one task at a time');
  await expect(page.locator('.la-paths-list li')).toHaveCount(5);
});

test('every lesson links to at least one official help page and shows no dates', async ({ page }) => {
  await page.goto('/learnai/learn/level-1/');
  const hrefs = await page.locator('[data-lesson-card] h3 a').evaluateAll((as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')));
  for (const href of hrefs) {
    await page.goto(href!);
    await expect(page.getByRole('heading', { name: 'Official help pages' })).toBeVisible();
    await expect(page.getByText('Last checked')).toHaveCount(0);
    await expect(page.getByText(/could not be fully confirmed|September 2026/)).toHaveCount(0);
  }
});

test('glossary search filters terms', async ({ page }) => {
  await page.goto('/learnai/glossary/');
  await expect(page.locator('[data-term]')).toHaveCount(32);
  await page.getByLabel('Find a word').fill('hallucination');
  await expect(page.locator('[data-term]:visible')).toHaveCount(1);
  await page.getByLabel('Find a word').fill('zzzz');
  await expect(page.getByText('No words match')).toBeVisible();
});

test('help guide opens from its address', async ({ page }) => {
  await page.goto('/learnai/help/#made-up-source');
  await expect(page.locator('#made-up-source')).toHaveAttribute('open', '');
  await expect(page.locator('details[open]')).toHaveCount(1);
});

test('workbook shows its parts and can be marked done', async ({ page }) => {
  await page.goto('/learnai/workbooks/build-your-ai-portfolio-page/');
  await expect(page.getByText(/Part 1 of/)).toBeVisible();
  await page.getByRole('button', { name: 'Mark this workbook as done' }).click();
  await page.goto('/learnai/workbooks/');
  await expect(page.locator('[data-item="workbook:build-your-ai-portfolio-page"]').getByText('Done', { exact: true })).toBeVisible();
});

test('Level 3 has the Canva and ElevenLabs lessons, with a Good to know note', async ({ page }) => {
  await page.goto('/learnai/learn/level-3/');
  await expect(page.locator('[data-lesson-card]')).toHaveCount(2);
  await page.goto('/learnai/learn/elevenlabs-spoken-summary/');
  await expect(page.getByRole('complementary', { name: 'Before you start' })).toContainText('18 and over');
  const note = page.getByRole('complementary', { name: 'Good to know' });
  await expect(note).toContainText('AI tools update their screens often');
  await expect(page.getByText('Check this')).toHaveCount(0);
});
