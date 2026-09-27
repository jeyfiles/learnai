// Small script on every page. It waits for Ctrl or Cmd + K, the Search button or an "I am stuck" button,
// and only then loads the search and help code (and the search index).
import type { HelpMode } from '../../lib/search/rank';

type Mod = typeof import('./Overlays');
let mod: Promise<Mod> | null = null;
const load = () => (mod ??= import('./Overlays').catch((e) => { mod = null; throw e; }));
const HELP_PAGE = '/learnai/help/';

const openSearch = (trigger: Element | null) =>
  load().then((m) => m.openSearch(trigger), () => { location.href = HELP_PAGE; });
const openHelp = (mode: HelpMode | undefined, trigger: Element | null) =>
  load().then((m) => m.openHelp(mode, trigger, {
    title: trigger?.getAttribute('data-la-help-title') ?? undefined,
    url: trigger?.getAttribute('data-la-help-url') ?? undefined,
  }), () => { location.href = HELP_PAGE; });

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearch(document.activeElement);
  }
});

document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest?.('[data-la-search-open], [data-la-help-open]');
  if (!el) return;
  e.preventDefault();
  if (el.hasAttribute('data-la-search-open')) openSearch(el);
  else openHelp((el.getAttribute('data-la-help-open') || undefined) as HelpMode | undefined, el);
});

// Start loading early when a pointer or keyboard lands on a trigger, so the dialog opens faster.
const warm = (e: Event) => { if ((e.target as Element).closest?.('[data-la-search-open], [data-la-help-open]')) { load().catch(() => {}); } };
document.addEventListener('pointerover', warm, { passive: true });
document.addEventListener('focusin', warm);

// Show the Mac shortcut on Macs.
if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
  document.querySelectorAll('[data-la-kbd]').forEach((k) => { k.textContent = '⌘ K'; });
}
