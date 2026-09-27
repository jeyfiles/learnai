import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function answerAll(page: Page, over: Record<string, string> = {}) {
  const a = {
    name: 'Priya', background: 'Working professional in another field', goal: 'Not sure yet', field: 'accounting',
    project: 'Summarise monthly finance reports for my manager and check every number',
    aiExperience: 'I have tried a few tools', coding: 'I have never written code', maths: 'I am fine with school-level maths',
    weeklyTime: '3 to 5 hours', learningStyle: 'Step by step, with clear instructions', ...over,
  };
  const next = () => page.getByRole('button', { name: /^(Next|Skip|Build my roadmap)$/ }).click();
  await page.getByLabel('What should we call you?').fill(a.name); await next();
  for (const key of ['background', 'goal'] as const) { await page.getByLabel(a[key]).check(); await next(); }
  await page.getByLabel('What field do you work or study in now?').fill(a.field); await next();
  await page.getByLabel(/Describe one real task/).fill(a.project); await next();
  for (const key of ['aiExperience', 'coding', 'maths', 'weeklyTime', 'learningStyle'] as const) { await page.getByLabel(a[key]).check(); await next(); }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/learnai/roadmap/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('full onboarding builds a roadmap and saves it on the device', async ({ page }) => {
  await page.getByRole('button', { name: 'Start the questions' }).click();
  await expect(page.getByText('Question 1 of 10')).toBeVisible();
  await answerAll(page);
  await expect(page.getByRole('heading', { name: 'Building your roadmap' })).toBeVisible();
  const heading = page.getByRole('heading', { name: /Priya, your path: AI-powered professional/ });
  await expect(heading).toBeVisible({ timeout: 10_000 });
  await expect(heading).toBeFocused();
  await expect(page.getByText('Suggested path')).toBeVisible();
  await expect(page.locator('.la-ob__weeks > li')).toHaveCount(4);
  await expect(page.getByRole('link', { name: 'Start your first lesson' })).toHaveAttribute('href', /\/learnai\/learn\//);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('jeyinsights-learnai-profile') || 'null'));
  expect(saved.complete).toBe(true);
  expect(saved.answers.field).toBe('accounting');
  // Reload shows the saved roadmap straight away
  await page.reload();
  await expect(page.getByRole('heading', { name: /your path: AI-powered professional/ })).toBeVisible();
});

test('validation stops empty and nonsense answers with a clear message', async ({ page }) => {
  await page.getByRole('button', { name: 'Start the questions' }).click();
  await page.getByRole('button', { name: 'Skip' }).click(); // name is optional
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('alert')).toContainText('Please choose one answer');
  await expect(page.getByText('Question 2 of 10')).toBeVisible();
  await page.getByLabel('Student, any subject').check();
  await expect(page.getByRole('alert')).toBeEmpty();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('AI engineer').check();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('What field do you work or study in now?').fill('asdf');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('alert')).toContainText('does not look like a field');
  await expect(page.getByLabel('What field do you work or study in now?')).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('What field do you work or study in now?').fill('computer science');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel(/Describe one real task/).fill('help with ai');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('alert')).toContainText('more detail');
});

test('a chosen path is respected and gaps are explained', async ({ page }) => {
  await page.getByRole('button', { name: 'Start the questions' }).click();
  await answerAll(page, { goal: 'Machine learning and data', maths: 'Basic, and I prefer to avoid it', learningStyle: 'By understanding the ideas first' });
  await expect(page.getByRole('heading', { name: /your path: Machine learning and data/ })).toBeVisible({ timeout: 10_000 });
  await expect(page.getByText('Your chosen path')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Worth knowing' })).toBeVisible();
  await expect(page.getByText(/needs strong coding/)).toBeVisible();
});

test('Back keeps answers, and progress resumes after a reload', async ({ page }) => {
  await page.getByRole('button', { name: 'Start the questions' }).click();
  await page.getByLabel('What should we call you?').fill('Arun');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Developer or engineer').check();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByLabel('Developer or engineer')).toBeChecked();
  await page.reload();
  await page.getByRole('button', { name: 'Continue where you left off' }).click();
  await expect(page.getByText('Question 2 of 10')).toBeVisible();
});

test('answers can be changed and deleted', async ({ page }) => {
  await page.getByRole('button', { name: 'Start the questions' }).click();
  await answerAll(page);
  await expect(page.getByRole('heading', { name: /your path:/ })).toBeVisible({ timeout: 10_000 });
  await page.getByRole('button', { name: 'Delete my answers' }).click();
  await page.getByRole('button', { name: 'Yes, delete my answers' }).click();
  await expect(page.getByRole('button', { name: 'Start the questions' })).toBeVisible();
  const saved = await page.evaluate(() => localStorage.getItem('jeyinsights-learnai-profile'));
  expect(saved).toBeNull();
});

test('onboarding screens pass accessibility checks', async ({ page }) => {
  const scan = async () => {
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  };
  await scan();
  await page.getByRole('button', { name: 'Start the questions' }).click();
  await scan();
  await page.getByRole('button', { name: 'Skip' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await scan(); // options question with an error showing
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole('button', { name: 'Start the questions' }).click();
  await answerAll(page);
  await expect(page.getByRole('heading', { name: /your path:/ })).toBeVisible({ timeout: 10_000 });
  await scan();
});
