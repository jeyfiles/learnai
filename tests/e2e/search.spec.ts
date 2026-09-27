import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const axe = async (page: import('@playwright/test').Page) => {
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`);
};

test('the search index is not downloaded until search opens', async ({ page }) => {
  const requested: string[] = [];
  page.on('request', (r) => requested.push(r.url()));
  await page.goto('/learnai/learn/');
  await page.waitForLoadState('networkidle');
  expect(requested.some((u) => u.includes('search-index.json'))).toBe(false);
  expect(requested.some((u) => /Overlays\.[\w-]+\.js/.test(u))).toBe(false);
  await page.getByRole('button', { name: /^Search/ }).click();
  await expect(page.getByRole('dialog', { name: 'Search Learn AI' })).toBeVisible();
  await expect.poll(() => requested.some((u) => u.includes('search-index.json'))).toBe(true);
});

test('Ctrl+K opens search, typing shows grouped results, Enter opens the first', async ({ page }) => {
  await page.goto('/learnai/learn/');
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog', { name: 'Search Learn AI' });
  const input = dialog.getByRole('searchbox');
  await expect(input).toBeFocused();
  await expect(dialog.getByRole('heading', { name: 'Popular places' })).toBeVisible();
  await input.fill('context window');
  await expect(dialog.getByRole('heading', { name: 'Glossary' })).toBeVisible();
  await expect(dialog.getByRole('link', { name: /Context window/ }).first()).toBeVisible();
  await input.press('Enter');
  await expect(page).toHaveURL(/\/learnai\/glossary\/#context-window$/);
  await expect(page.locator('#context-window')).toBeFocused();
  await expect(dialog).toBeHidden();
});

test('arrow keys move through results and Escape returns focus to the button', async ({ page, isMobile }) => {
  await page.goto('/learnai/');
  const btn = page.getByRole('button', { name: /^Search/ });
  await btn.click();
  const dialog = page.getByRole('dialog', { name: 'Search Learn AI' });
  await dialog.getByRole('searchbox').fill('prompt');
  await expect(dialog.getByRole('status')).toContainText(/\d+ results?/);
  await page.keyboard.press('ArrowDown');
  await expect(dialog.locator('a[data-nav]').first()).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(dialog.locator('a[data-nav]').nth(1)).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  await expect(dialog.getByRole('searchbox')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(btn).toBeFocused();
  void isMobile;
});

test('no results shows a helpful message', async ({ page }) => {
  await page.goto('/learnai/');
  await page.getByRole('button', { name: /^Search/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Search Learn AI' });
  await dialog.getByRole('searchbox').fill('qqqzzzxx');
  await expect(dialog.getByText('Nothing matches that yet.')).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'Browse all help guides' })).toBeVisible();
});

test('help drawer: five modes, a grounded answer and a link that opens the guide', async ({ page }) => {
  await page.goto('/learnai/learn/perplexity-sources-you-can-check/');
  const stuck = page.getByRole('button', { name: 'I am stuck' });
  await stuck.click();
  const drawer = page.getByRole('dialog', { name: 'Get unstuck' });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText('You are on:')).toBeVisible();
  const modes = drawer.getByRole('group', { name: 'What kind of help do you want?' }).getByRole('button');
  await expect(modes).toHaveCount(5);
  // With no question, the page being viewed is suggested first
  await expect(drawer.getByRole('heading', { name: 'Linked to this page' })).toBeVisible();
  await drawer.getByRole('button', { name: 'Fix a problem' }).click();
  await expect(drawer.getByRole('button', { name: 'Fix a problem' })).toHaveAttribute('aria-pressed', 'true');
  await drawer.getByLabel('Describe what you need').fill('it made up a source');
  const answer = drawer.locator('.la-hd__answer');
  await expect(answer).toContainText('From the help guide:');
  await expect(answer.locator('ol li').first()).toBeVisible();
  await answer.getByRole('link').click();
  await expect(page).toHaveURL(/\/learnai\/help\/#made-up-source$/);
  await expect(page.locator('#made-up-source')).toHaveAttribute('open', '');
});

test('help drawer remembers nothing it should not and closes with Escape', async ({ page }) => {
  await page.goto('/learnai/');
  const stuck = page.getByRole('button', { name: 'I am stuck' });
  await stuck.click();
  const drawer = page.getByRole('dialog', { name: 'Get unstuck' });
  await drawer.getByRole('button', { name: 'Explain simply' }).click();
  await drawer.getByLabel('Describe what you need').fill('hallucination');
  await expect(drawer.locator('.la-hd__answer')).toContainText('From the glossary:');
  await drawer.getByRole('button', { name: 'Clear' }).click();
  await expect(drawer.getByLabel('Describe what you need')).toHaveValue('');
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(stuck).toBeFocused();
  const keys = await page.evaluate(() => Object.keys(localStorage));
  for (const k of keys) expect(k.startsWith('jeyinsights-learnai-')).toBe(true);
  expect(keys.some((k) => /search|help/.test(k))).toBe(false);
});

test('the hint button on a practice opens the drawer in hint mode for that practice', async ({ page }) => {
  await page.goto('/learnai/practice/rewrite-a-vague-prompt/');
  await page.getByRole('button', { name: 'Get a hint for this practice' }).click();
  const drawer = page.getByRole('dialog', { name: 'Get unstuck' });
  await expect(drawer.getByRole('button', { name: 'Give me a hint' })).toHaveAttribute('aria-pressed', 'true');
  await expect(drawer.getByText('Rewrite a vague prompt').first()).toBeVisible();
});

for (const scheme of ['light', 'dark'] as const) {
  test(`search and help pass axe checks (${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto('/learnai/learn/');
    expect(await axe(page)).toEqual([]);
    await page.getByRole('button', { name: /^Search/ }).click();
    await page.getByRole('dialog', { name: 'Search Learn AI' }).getByRole('searchbox').fill('prompt');
    await expect(page.getByRole('dialog').locator('a[data-nav]').first()).toBeVisible();
    expect(await axe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'I am stuck' }).click();
    const drawer = page.getByRole('dialog', { name: 'Get unstuck' });
    await drawer.getByRole('button', { name: 'Fix a problem' }).click();
    await drawer.getByLabel('Describe what you need').fill('answer is wrong');
    await expect(drawer.locator('.la-hd__answer a')).toBeVisible();
    expect(await axe(page)).toEqual([]);
  });
}
