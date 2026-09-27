import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const L1 = [
  'use-ai-responsibly-at-work', 'chatgpt-ask-a-clear-first-question', 'chatgpt-study-mode-learn-a-concept', 'gemini-explain-it-three-ways',
  'gemini-plan-your-ai-learning-path', 'claude-feedback-without-a-rewrite', 'copilot-summarise-and-check', 'perplexity-sources-you-can-check',
  'gemini-notebook-learn-from-the-docs', 'compare-two-ai-tools',
];

async function setStore(page: Page, values: Record<string, unknown>) {
  await page.goto('/learnai/about/');
  await page.evaluate((v) => {
    localStorage.clear();
    for (const [k, val] of Object.entries(v)) localStorage.setItem(`jeyinsights-learnai-${k}`, JSON.stringify(val));
  }, values);
}
const profile = (path = 'ai-engineer') => ({
  v: 1, complete: true, step: 9, path,
  answers: { name: 'Priya', background: 'developer', goal: path, field: 'software', project: 'Build a tool that summarises support tickets for my team', aiExperience: 'weekly', coding: 'write', maths: 'school', weeklyTime: 'steady', learningStyle: 'project' },
});
const axe = async (page: Page) => (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations.map((v) => v.id);

test('projects are locked until the roadmap is built', async ({ page }) => {
  await setStore(page, {});
  await page.goto('/learnai/projects/');
  await expect(page.getByRole('heading', { name: 'Projects open after you build your roadmap' })).toBeVisible();
  await expect(page.locator('.la-pcard')).toHaveCount(8);
  // Nothing is marked done or 'your path' for a new learner
  await expect(page.locator('[data-done-chip]:visible')).toHaveCount(0);
  await expect(page.locator('[data-yours-chip]:visible')).toHaveCount(0);
  await page.getByRole('link', { name: 'Write your first script that calls an AI model' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Write your first script that calls an AI model' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The situation' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Projects open after you build your roadmap' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Steps' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Mark this project as done' })).toBeHidden();
});

test('projects open after the roadmap, with the learner path first', async ({ page }) => {
  await setStore(page, { profile: profile('ai-engineer') });
  await page.goto('/learnai/projects/');
  await expect(page.getByRole('heading', { name: 'Projects open after you build your roadmap' })).toBeHidden();
  await expect(page.locator('[data-path-group]').first()).toHaveAttribute('data-path-group', 'ai-engineer');
  await expect(page.locator('[data-path-group]').first().getByText('Your path')).toBeVisible();
  await page.getByRole('link', { name: 'Build a prompt injection test set for a summariser' }).click();
  await expect(page.getByRole('heading', { name: 'Steps' })).toBeVisible();
  const done = page.locator('[data-complete="project:prompt-injection-test-set"] button');
  await expect(done).toHaveText('Mark this project as done');
  await done.click();
  await expect(done).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/learnai/projects/');
  await expect(page.locator('[data-item="project:prompt-injection-test-set"] [data-done-chip]')).toBeVisible();
  await expect(page.locator('[data-done-chip]:visible')).toHaveCount(1);
  await expect(page.locator('[data-yours-chip]:visible')).toHaveCount(1);
});

test('finishing the roadmap shows the first project and unlocks the library', async ({ page }) => {
  await setStore(page, { profile: { ...profile('ml-data'), complete: false, step: 9 } });
  await page.goto('/learnai/roadmap/');
  // Saved answers with complete false: finish the last question to build the roadmap
  await page.getByRole('button', { name: /Continue where you left off|Start the questions/ }).click();
  await page.getByRole('button', { name: 'Build my roadmap' }).click();
  await expect(page.getByRole('heading', { name: 'Your first project' })).toBeVisible({ timeout: 10_000 });
  await expect(page.getByRole('link', { name: 'Compare two model cards for one use case' })).toBeVisible();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('jeyinsights-learnai-profile')!));
  expect(saved.path).toBe('ml-data');
  await page.getByRole('link', { name: 'Compare two model cards for one use case' }).click();
  await expect(page.getByRole('heading', { name: 'Steps' })).toBeVisible();
});

test('search hides projects until the roadmap is built', async ({ page }) => {
  await setStore(page, {});
  await page.goto('/learnai/learn/');
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog', { name: 'Search Learn AI' });
  await dialog.getByRole('searchbox').fill('prompt injection test set');
  await expect(dialog.getByRole('status')).toContainText(/result/);
  await expect(dialog.getByRole('heading', { name: 'Projects' })).toHaveCount(0);

  await setStore(page, { profile: profile() });
  await page.goto('/learnai/learn/');
  await page.keyboard.press('Control+k');
  await page.getByRole('dialog', { name: 'Search Learn AI' }).getByRole('searchbox').fill('prompt injection test set');
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Projects' })).toBeVisible();
});

test('certificate shows what is left until Level 1 is finished', async ({ page }) => {
  await setStore(page, { progress: { v: 1, done: L1.slice(0, 7).map((s) => `lesson:${s}`) } });
  await page.goto('/learnai/certificate/');
  await expect(page.getByText('You have finished 7 of 10 Level 1 lessons.')).toBeVisible();
  await expect(page.locator('.la-cert__todo li')).toHaveCount(3);
  await expect(page.getByLabel('Your name, as it should appear')).toBeHidden();
});

test('certificate: name check, preview, print and PNG download', async ({ page }) => {
  await setStore(page, { progress: { v: 1, done: L1.map((s) => `lesson:${s}`) } });
  await page.goto('/learnai/certificate/');
  await expect(page.getByRole('heading', { name: 'Well done. You finished Level 1.' })).toBeVisible();
  const input = page.getByLabel('Your name, as it should appear');
  await input.fill('1');
  await page.getByRole('button', { name: 'Show my certificate' }).click();
  await expect(page.getByRole('alert')).toContainText('at least two letters');
  await expect(input).toBeFocused();
  await input.fill("Seán O'Brien");
  await page.getByRole('button', { name: 'Show my certificate' }).click();
  const svg = page.locator('[data-cert-sheet] svg');
  await expect(svg).toBeVisible();
  await expect(svg).toContainText("Seán O'Brien");
  await expect(svg).toContainText('Level 1: Foundations');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download as image (PNG)' }).click(),
  ]);
  expect(download.suggestedFilename()).toBe('learnai-level-1-certificate.png');
  await expect(page.getByText('Image downloaded.')).toBeVisible();
  // Print shows only the certificate
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByRole('heading', { name: 'Well done. You finished Level 1.' })).toBeHidden();
  await expect(svg).toBeVisible();
});

for (const scheme of ['light', 'dark'] as const) {
  test(`projects and certificate pass axe checks (${scheme})`, async ({ page }) => {
    await setStore(page, {});
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto('/learnai/projects/');
    expect(await axe(page)).toEqual([]);
    await page.goto('/learnai/projects/custom-assistant-with-a-gem/');
    expect(await axe(page)).toEqual([]);
    await setStore(page, { profile: profile(), progress: { v: 1, done: L1.map((s) => `lesson:${s}`) } });
    await page.goto('/learnai/projects/custom-assistant-with-a-gem/');
    expect(await axe(page)).toEqual([]);
    await page.goto('/learnai/certificate/');
    await page.getByRole('button', { name: 'Show my certificate' }).click();
    await expect(page.locator('[data-cert-sheet] svg')).toBeVisible();
    expect(await axe(page)).toEqual([]);
  });
}
