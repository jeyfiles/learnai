/** @jsxImportSource preact */
// Search dialog (Ctrl or Cmd + K) and the "I am stuck" help drawer.
// This file loads only when one of them is opened. The search index loads at the same moment.
// Everything runs on the device: no request is made except fetching the index file from this site.
import { render } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import {
  prepare, search, group, rankHelp, answerFor, MODES, modeInfo, TYPE_LABEL,
  type Prepared, type HelpMode, type ItemType,
} from '../../lib/search/rank';
import { url } from '../../lib/site';

// ---------- index loading ----------
let indexPromise: Promise<Prepared[]> | null = null;
function loadIndex(): Promise<Prepared[]> {
  indexPromise ??= fetch(url('search-index.json'))
    .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
    .then((d) => prepare(d.items))
    .catch((e) => { indexPromise = null; throw e; });
  return indexPromise;
}

function useIndex() {
  const [items, setItems] = useState<Prepared[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    // Projects open after the roadmap is built, so they stay out of search until then.
    const locked = document.documentElement.dataset.laRoadmap === 'none';
    loadIndex().then((all) => setItems(locked ? all.filter((i) => i.type !== 'project') : all), () => setFailed(true));
  }, []);
  return { items, failed };
}

/** Announces a short message after typing stops, so screen readers are not flooded. */
function useQuietStatus(message: string, delay = 450) {
  const [said, setSaid] = useState('');
  useEffect(() => { const t = setTimeout(() => setSaid(message), delay); return () => clearTimeout(t); }, [message]);
  return said;
}

const GROUP_LABEL: Record<ItemType, string> = {
  lesson: 'Lessons', workbook: 'Workbooks', practice: 'Daily practices', project: 'Projects',
  career: 'Career paths', level: 'Levels', glossary: 'Glossary', help: 'Help guides',
};

const QUICK = [
  { label: "Today's practice", href: `${url()}#today` },
  { label: 'Level 1 lessons', href: url('learn/level-1') },
  { label: 'My roadmap', href: url('roadmap') },
  { label: 'AI careers', href: url('careers') },
  { label: 'Glossary', href: url('glossary') },
  { label: 'Help guides', href: url('help') },
];

// ---------- shared dialog shell ----------
interface ShellProps {
  labelId: string; title: string; closeLabel: string; variant: 'search' | 'drawer';
  onClosed: (navigating: boolean) => void; initialFocus: () => HTMLElement | null | undefined;
  children: preact.ComponentChildren;
}

function Shell({ labelId, title, closeLabel, variant, onClosed, initialFocus, children }: ShellProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const navigating = useRef(false);
  useEffect(() => {
    const d = ref.current!;
    if (!d.open) d.showModal();
    // Focus the input without scrolling, so the heading and close button stay in view.
    initialFocus()?.focus({ preventScroll: true });
    d.querySelector('.la-dlg__panel')?.scrollTo(0, 0);
    const onClose = () => onClosed(navigating.current);
    d.addEventListener('close', onClose);
    return () => d.removeEventListener('close', onClose);
  }, []);
  // Close when a link inside is followed, including links to another part of the same page.
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a[href]');
    if (a) { navigating.current = true; ref.current?.close(); return; }
    // A click on the backdrop (outside the panel) closes the dialog.
    if (e.target === ref.current) ref.current?.close();
  };
  return (
    <dialog
      ref={ref} class={`la-dlg la-dlg--${variant}`} aria-labelledby={labelId} onClick={onClick}
      // Escape always closes, even when a search box would otherwise use it to clear its text.
      onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); ref.current?.close(); } }}
    >
      <div class="la-dlg__panel">
        <div class="la-dlg__head">
          <h2 id={labelId}>{title}</h2>
          <button type="button" class="la-dlg__close" onClick={() => ref.current?.close()}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" /></svg>
            <span class="la-visually-hidden">{closeLabel}</span>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

/** Up and down arrows move between the input and the result links. */
function arrowNav(e: KeyboardEvent, container: HTMLElement | null) {
  if (!container || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
  const links = [...container.querySelectorAll<HTMLElement>('[data-nav]')];
  if (!links.length) return;
  const i = links.indexOf(document.activeElement as HTMLElement);
  e.preventDefault();
  if (e.key === 'ArrowDown') links[Math.min(i + 1, links.length - 1)].focus();
  else if (i <= 0) container.querySelector<HTMLInputElement>('input')?.focus();
  else links[i - 1].focus();
}

// ---------- search ----------
function SearchDialog({ onClosed }: { onClosed: (n: boolean) => void }) {
  const { items, failed } = useIndex();
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const results = useMemo(() => (items && q.trim() ? search(q, items) : []), [items, q]);
  const groups = group(results);
  const status = failed ? 'Search could not load. Check your connection and try again.'
    : !items ? 'Loading search.'
    : !q.trim() ? ''
    : results.length ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
    : 'No results';
  const said = useQuietStatus(status);

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const first = box.current?.querySelector<HTMLAnchorElement>('a[data-nav]');
    first?.click();
  };

  return (
    <Shell labelId="la-s-title" title="Search Learn AI" closeLabel="Close search" variant="search" onClosed={onClosed} initialFocus={() => input.current}>
      <div ref={box} onKeyDown={(e) => arrowNav(e as KeyboardEvent, box.current)}>
        <form role="search" class="la-dlg__form" onSubmit={onSubmit}>
          <label for="la-s-q" class="la-visually-hidden">Search lessons, practices, AI words and help</label>
          <svg class="la-dlg__icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none" /><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
          <input
            ref={input} id="la-s-q" type="search" autocomplete="off" spellcheck={false}
            placeholder="For example: check sources" value={q}
            onInput={(e) => setQ((e.target as HTMLInputElement).value)}
          />
        </form>
        <p class="la-meta la-dlg__status" role="status">{said}</p>

        {failed && <p>You can still <a href={url('help')} data-nav>browse the help guides</a> or <a href={url('learn')} data-nav>see all lessons</a>.</p>}

        {items && !q.trim() && (
          <div class="la-dlg__section">
            <h3>Popular places</h3>
            <ul class="la-dlg__quick">{QUICK.map((l) => <li key={l.href}><a href={l.href} data-nav>{l.label}</a></li>)}</ul>
          </div>
        )}

        {items && q.trim() && !results.length && (
          <div class="la-dlg__empty">
            <p><strong>Nothing matches that yet.</strong> Try a shorter word, or check the spelling.</p>
            <p><a href={url('help')} data-nav>Browse all help guides</a> or <a href={url('glossary')} data-nav>look up a word in the glossary</a>.</p>
          </div>
        )}

        {groups.map((g) => (
          <div class="la-dlg__section" key={g.type}>
            <h3>{GROUP_LABEL[g.type]}</h3>
            <ul class="la-dlg__results">
              {g.items.map((it) => (
                <li key={it.url}>
                  <a href={it.url} data-nav>
                    <span class="la-dlg__rtitle">{it.title}</span>
                    <span class="la-dlg__rdesc">{it.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p class="la-meta la-dlg__privacy">Search runs on your device. Nothing you type is sent anywhere.</p>
      </div>
    </Shell>
  );
}

// ---------- help drawer ----------
let lastMode: HelpMode = 'find';

interface HelpContext { title?: string; url?: string }

function HelpDrawer({ startMode, context, onClosed }: { startMode?: HelpMode; context: HelpContext; onClosed: (n: boolean) => void }) {
  const { items, failed } = useIndex();
  const [mode, setMode] = useState<HelpMode>(startMode ?? lastMode);
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const contextTitle = useMemo(() => context.title ?? document.querySelector('main h1')?.textContent?.replace(/\s+/g, ' ').trim() ?? '', []);
  const currentUrl = context.url ?? location.pathname;
  const info = modeInfo(mode);

  useEffect(() => { lastMode = mode; }, [mode]);

  const places = useMemo(
    () => (items ? rankHelp({ q, mode, items, currentUrl, contextTitle }) : []),
    [items, q, mode],
  );
  const answer = answerFor(mode, places[0], q);
  const hasQ = q.trim().length > 0;
  const status = failed ? 'Help could not load. Check your connection and try again.'
    : !items ? 'Loading help.'
    : hasQ ? (places.length ? `${places.length} ${places.length === 1 ? 'place' : 'places'} found` : 'Nothing found') : '';
  const said = useQuietStatus(status);

  return (
    <Shell labelId="la-h-title" title="Get unstuck" closeLabel="Close help" variant="drawer" onClosed={onClosed} initialFocus={() => input.current}>
      <div ref={box} class="la-help-drawer" onKeyDown={(e) => arrowNav(e as KeyboardEvent, box.current)}>
        {contextTitle && <p class="la-meta la-hd__context">You are on: <strong>{contextTitle}</strong></p>}

        <div class="la-hd__modes" role="group" aria-label="What kind of help do you want?">
          {MODES.map((m) => (
            <button key={m.id} type="button" class="la-hd__mode" aria-pressed={m.id === mode} onClick={() => setMode(m.id)}>{m.label}</button>
          ))}
        </div>

        <form class="la-dlg__form" onSubmit={(e) => e.preventDefault()}>
          <label for="la-h-q" class="la-hd__label">Describe what you need</label>
          <div class="la-hd__row">
            <input
              ref={input} id="la-h-q" type="search" autocomplete="off" placeholder={info.placeholder} value={q}
              onInput={(e) => setQ((e.target as HTMLInputElement).value)}
            />
            {hasQ && <button type="button" class="la-btn la-btn--secondary la-hd__clear" onClick={() => { setQ(''); input.current?.focus(); }}>Clear</button>}
          </div>
        </form>
        <p class="la-meta la-dlg__status" role="status">{said}</p>

        <div class="la-hd__answer">
          {answer ? (
            <>
              <p class="la-hd__from">From the {answer.from.toLowerCase()}: <a href={answer.url} data-nav>{answer.title}</a></p>
              <p>{answer.text}</p>
              {answer.steps.length > 0 && <ol>{answer.steps.map((s) => <li key={s}>{s}</li>)}</ol>}
            </>
          ) : (
            <p>{hasQ && items && !places.length ? 'Nothing on this site matches that yet. Try fewer words, or pick another kind of help above.' : info.guidance}</p>
          )}
        </div>

        {places.length > 0 && (
          <div class="la-dlg__section">
            <h3>{hasQ ? 'Places to go next' : 'Linked to this page'}</h3>
            <ul class="la-dlg__results">
              {places.map((it) => (
                <li key={it.url}>
                  <a href={it.url} data-nav>
                    <span class="la-dlg__rtype">{TYPE_LABEL[it.type]}</span>
                    <span class="la-dlg__rtitle">{it.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul class="la-hd__more">
          <li><a href={url('help')} data-nav>Browse all help guides</a></li>
          <li><a href={url('glossary')} data-nav>Look up a word in the glossary</a></li>
        </ul>
        <p class="la-meta la-dlg__privacy">Answers come from the pages on this site, not from an AI chatbot. Nothing you type leaves your device.</p>
      </div>
    </Shell>
  );
}

// ---------- mounting ----------
let root: HTMLElement | null = null;
let returnTo: HTMLElement | null = null;

function mount(node: preact.VNode | null) {
  if (!root) { root = document.createElement('div'); root.id = 'la-overlays'; document.body.append(root); }
  render(node, root);
}

function closed(navigating: boolean) {
  mount(null);
  if (!navigating && returnTo && document.contains(returnTo)) returnTo.focus();
  returnTo = null;
}

let seq = 0;
function setReturn(trigger?: Element | null) {
  // If a dialog is already open, keep the original place to return to.
  if (!root?.querySelector('dialog[open]')) returnTo = (trigger as HTMLElement) ?? null;
}

export function openSearch(trigger?: Element | null) {
  setReturn(trigger);
  mount(null);
  mount(<SearchDialog key={++seq} onClosed={closed} />);
}

export function openHelp(mode?: HelpMode, trigger?: Element | null, context: HelpContext = {}) {
  setReturn(trigger);
  mount(null);
  mount(<HelpDrawer key={++seq} startMode={mode} context={context} onClosed={closed} />);
}

export { loadIndex };
