import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const KEY = 'jeyinsights-learnai-daily';
const today = () => {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

test.beforeEach(async ({ page }) => {
  await page.goto('/learnai/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('first visit shows the first worked example and saves the pick', async ({ page }) => {
  const section = page.locator('#today');
  await expect(section.getByRole('heading', { name: 'Rewrite a vague prompt' })).toBeVisible();
  await expect(section.getByText('With a full example')).toBeVisible();
  await expect(section.getByText('0 days in a row')).toBeVisible();
  const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), KEY);
  expect(saved.selection).toEqual({ date: today(), id: 'rewrite-a-vague-prompt' });
});

test('hero button jumps to the practice', async ({ page }) => {
  await page.getByRole('link', { name: "Start today's practice" }).click();
  await expect(page).toHaveURL(/#today$/);
});

test('marking done needs every check, then updates the streak and can be undone', async ({ page }) => {
  const section = page.locator('#today');
  const done = section.getByRole('button', { name: "Mark today's practice done" });
  await done.click();
  await expect(section.getByRole('alert')).toContainText('Tick every check first');
  for (const box of await section.getByRole('checkbox').all()) await box.check();
  await done.click();
  await expect(section.getByText('Done for today.')).toBeVisible();
  await expect(section.getByText('1 day in a row')).toBeVisible();
  await expect(section.locator('.la-td-status')).toBeFocused();
  // Survives a reload and keeps the same practice for the rest of the day
  await page.reload();
  await expect(section.getByRole('heading', { name: 'Rewrite a vague prompt' })).toBeVisible();
  await expect(section.getByText('1 day in a row')).toBeVisible();
  await section.getByRole('button', { name: 'Undo' }).click();
  await expect(section.getByText('0 days in a row')).toBeVisible();
  await expect(section.getByRole('button', { name: "Mark today's practice done" })).toBeVisible();
});

test('notes are saved on the device', async ({ page }) => {
  const notes = page.getByLabel('Your notes (optional)');
  await notes.fill('Adding my role made the answer shorter.');
  await expect(page.getByText('Saved on this device')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Your notes (optional)')).toHaveValue('Adding my role made the answer shorter.');
});

test('a learner with a past streak and four finished practices gets a guided practice', async ({ page }) => {
  await page.evaluate(({ k, t }) => {
    const back = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); const p = (x: number) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; };
    localStorage.setItem(k, JSON.stringify({
      v: 1, selection: null, drafts: {},
      done: { 'rewrite-a-vague-prompt': back(4), 'spot-the-made-up-detail': back(3), 'remove-private-details-first': back(2), 'explain-one-ai-term': back(1) },
      days: [back(4), back(3), back(2), back(1)],
    }));
    void t;
  }, { k: KEY, t: today() });
  await page.reload();
  const section = page.locator('#today');
  await expect(section.getByText('Guided', { exact: true })).toBeVisible();
  await expect(section.getByText('4 days in a row')).toBeVisible();
  await expect(section.getByText('See how someone else did a similar task')).toBeVisible();
});

test('broken saved data does not break the page', async ({ page }) => {
  await page.evaluate((k) => localStorage.setItem(k, '{not json'), KEY);
  await page.reload();
  await expect(page.locator('#today').getByRole('heading', { name: 'Rewrite a vague prompt' })).toBeVisible();
});

test('practice list and a practice page work', async ({ page }) => {
  await page.goto('/learnai/practice/');
  await expect(page.getByRole('heading', { level: 1, name: 'All daily practices' })).toBeVisible();
  await expect(page.locator('[data-practice-card]')).toHaveCount(12);
  await page.getByRole('link', { name: 'Mark untrusted text in a prompt' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Mark untrusted text in a prompt' })).toBeVisible();
  await expect(page.getByText('Need the steps and a starting prompt?')).toBeVisible();
  for (const box of await page.getByRole('checkbox').all()) await box.check();
  await page.getByRole('button', { name: 'Mark this practice done' }).click();
  await expect(page.getByText('It counts towards your daily run.')).toBeVisible();
  await page.goto('/learnai/practice/');
  await expect(page.locator('[data-practice-card="mark-untrusted-text-in-a-prompt"] [data-done-chip]')).toBeVisible();
});

for (const scheme of ['light', 'dark'] as const) {
  test(`today section passes axe checks (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.reload();
    await expect(page.locator('#today .la-td-title')).toBeVisible();
    await page.locator('#today details').evaluateAll((els) => els.forEach((d) => d.setAttribute('open', '')));
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
  test(`practice page passes axe checks after marking done (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto('/learnai/practice/test-one-prompt-on-three-inputs/');
    for (const box of await page.getByRole('checkbox').all()) await box.check();
    await page.getByRole('button', { name: 'Mark this practice done' }).click();
    await page.locator('details').evaluateAll((els) => els.forEach((d) => d.setAttribute('open', '')));
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}
