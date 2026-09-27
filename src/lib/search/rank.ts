// Local keyword search for Learn AI. Pure functions: no network, no storage, nothing leaves the device.
// Used by the search dialog (Ctrl or Cmd + K) and the "I am stuck" help drawer.

export type ItemType = 'lesson' | 'workbook' | 'practice' | 'project' | 'career' | 'level' | 'glossary' | 'help';

/** One entry in search-index.json. Short keys keep the file small. */
export interface IndexItem {
  type: ItemType;
  id: string;
  title: string;
  desc: string;   // One line shown under the title
  url: string;
  text: string;   // Extra words to match on (not shown)
  g: string;      // Grounding text: the plain answer shown in the help drawer
  ex?: string;    // A worked example, if the item has one
  steps?: string[];
}

export const TYPE_LABEL: Record<ItemType, string> = {
  lesson: 'Lesson', workbook: 'Workbook', practice: 'Daily practice', project: 'Project',
  career: 'Career path', level: 'Level', glossary: 'Glossary', help: 'Help guide',
};

/** Order of groups in the search dialog. */
export const TYPE_ORDER: ItemType[] = ['lesson', 'workbook', 'practice', 'project', 'career', 'level', 'glossary', 'help'];

const STOP = new Set(('a an and are as at be by can do does for from get got how i if in into is it its me my of on or ' +
  'so that the this to up use using want was what when where which who why will with you your').split(' '));

/** Very small stemmer: enough to match "prompts" with "prompt" and "checking" with "check". */
export function stem(w: string): string {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

export function tokenize(s: string): string[] {
  return s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/).filter((w) => w.length > 1 && !STOP.has(w)).map(stem);
}

export interface Prepared extends IndexItem { _title: string[]; _desc: string[]; _all: string[]; _titleLower: string }

export function prepare(items: IndexItem[]): Prepared[] {
  return items.map((it) => ({
    ...it,
    _title: tokenize(it.title),
    _desc: tokenize(it.desc),
    _all: [...new Set(tokenize(`${it.title} ${it.desc} ${it.text} ${it.g} ${it.id.replace(/-/g, ' ')}`))],
    _titleLower: it.title.toLowerCase(),
  }));
}

/** Does any word match the token? Whole word, or the start of a word for tokens of 3 or more letters. */
const hit = (words: string[], t: string) => words.some((w) => w === t || (t.length >= 3 && w.startsWith(t)));

/** Score one item for a list of query tokens. Returns 0 if a token does not match (when every token is required). */
function scoreItem(it: Prepared, tokens: string[], phrase: string, requireAll: boolean): number {
  let score = 0;
  let matched = 0;
  for (const t of tokens) {
    let s = 0;
    if (hit(it._title, t)) s = 10;
    else if (hit(it._desc, t)) s = 4;
    else if (hit(it._all, t)) s = 2;
    if (s) matched += 1; else if (requireAll) return 0;
    score += s;
  }
  if (!matched) return 0;
  if (phrase.length > 2 && it._titleLower.includes(phrase)) score += 15;
  return score + matched * 3;
}

const byScore = (a: { score: number; it: Prepared }, b: { score: number; it: Prepared }) =>
  b.score - a.score || TYPE_ORDER.indexOf(a.it.type) - TYPE_ORDER.indexOf(b.it.type) || a.it.title.localeCompare(b.it.title);

/**
 * Search for the dialog. Every word must match; if nothing matches, any word may match.
 * Results are sorted by score, capped at `limit`.
 */
export function search(q: string, items: Prepared[], limit = 30): Prepared[] {
  const tokens = tokenize(q);
  if (!tokens.length) return [];
  const phrase = q.trim().toLowerCase();
  let scored = items.map((it) => ({ it, score: scoreItem(it, tokens, phrase, true) })).filter((r) => r.score > 0);
  if (!scored.length) scored = items.map((it) => ({ it, score: scoreItem(it, tokens, phrase, false) })).filter((r) => r.score > 0);
  return scored.sort(byScore).slice(0, limit).map((r) => r.it);
}

/** Groups results by type. A group appears where its best result ranks, so the top result is always shown first. */
export function group(results: Prepared[]): { type: ItemType; items: Prepared[] }[] {
  const order: ItemType[] = [];
  for (const r of results) if (!order.includes(r.type)) order.push(r.type);
  return order.map((type) => ({ type, items: results.filter((r) => r.type === type) }));
}

// ---------- Help drawer ----------

export type HelpMode = 'explain' | 'example' | 'find' | 'fix' | 'hint';

export const MODES: { id: HelpMode; label: string; placeholder: string; guidance: string; types: ItemType[] }[] = [
  {
    id: 'explain', label: 'Explain simply', placeholder: 'For example: what is a context window',
    guidance: 'Type an AI word or idea, such as "embeddings" or "hallucination". You get a plain explanation from the glossary or a lesson.',
    types: ['glossary', 'help', 'lesson', 'level', 'career'],
  },
  {
    id: 'example', label: 'Show an example', placeholder: 'For example: summarise a long report',
    guidance: 'Type a task, such as "check sources" or "write a prompt". You get a worked example from a practice or a lesson.',
    types: ['practice', 'lesson', 'workbook', 'glossary', 'project'],
  },
  {
    id: 'find', label: 'Find a page', placeholder: 'For example: build a portfolio',
    guidance: 'Type what you want to learn or make. You get the lessons, workbooks and practices that fit.',
    types: ['lesson', 'workbook', 'practice', 'project', 'career', 'level', 'help', 'glossary'],
  },
  {
    id: 'fix', label: 'Fix a problem', placeholder: 'For example: it made up a source',
    guidance: 'Describe what went wrong, such as "the answer is too vague" or "I hit a limit". You get steps from the help guides.',
    types: ['help', 'lesson', 'glossary', 'practice'],
  },
  {
    id: 'hint', label: 'Give me a hint', placeholder: 'For example: my prompt gives a different answer each time',
    guidance: 'Tell us where you are stuck. You get one small next step, not the full answer, so you can keep going yourself.',
    types: ['help', 'practice', 'lesson', 'glossary'],
  },
];

export const modeInfo = (m: HelpMode) => MODES.find((x) => x.id === m) ?? MODES[2];

/**
 * Ranks up to `limit` places to go next, for a mode, an optional question and the page the learner is on.
 * Score = keyword score (any word may match) + a bonus for types that suit the mode
 * + a bonus for the page being viewed + a small bonus for words shared with the page title.
 */
export function rankHelp(opts: {
  q: string; mode: HelpMode; items: Prepared[]; currentUrl?: string; contextTitle?: string; limit?: number;
}): Prepared[] {
  const { q, mode, items, currentUrl, contextTitle = '', limit = 6 } = opts;
  const tokens = tokenize(q);
  const ctx = tokenize(contextTitle).filter((t) => t.length > 3);
  const types = modeInfo(mode).types;
  const phrase = q.trim().toLowerCase();
  const scored = items.map((it) => {
    const typeIdx = types.indexOf(it.type);
    if (typeIdx < 0) return { it, score: 0 };
    const kw = tokens.length ? scoreItem(it, tokens, phrase, false) : 0;
    if (tokens.length && !kw) return { it, score: 0 };
    let score = kw + Math.max(1, 6 - typeIdx) * 3;
    const isCurrent = !!currentUrl && it.url === currentUrl;
    if (isCurrent) score += tokens.length ? 2 : 12;
    let ctxHits = 0;
    for (const t of ctx) if (hit(it._all, t)) ctxHits += 1;
    // Words shared with the page title help a little, but never outrank a clear match for the question.
    score += tokens.length ? Math.min(ctxHits, 2) : ctxHits * 2;
    if (mode === 'example' && it.ex) score += 5;
    // With no question, only show places linked to this page, so the list is not random.
    if (!tokens.length && !isCurrent && !ctxHits) return { it, score: 0 };
    return { it, score };
  });
  return scored.filter((r) => r.score > 0).sort(byScore).slice(0, limit).map((r) => r.it);
}

export interface HelpAnswer { from: string; title: string; url: string; text: string; steps: string[] }

/** The short answer shown at the top of the drawer, taken word for word from the best match. */
export function answerFor(mode: HelpMode, top: Prepared | undefined, q: string): HelpAnswer | null {
  if (!top || !tokenize(q).length || mode === 'find') return null;
  const steps = top.steps ?? [];
  const base = { from: TYPE_LABEL[top.type], title: top.title, url: top.url };
  if (mode === 'example') return { ...base, text: top.ex ?? top.g, steps: top.ex ? [] : steps.slice(0, 3) };
  if (mode === 'hint') return { ...base, text: steps[0] ? `Try this next: ${steps[0]}` : top.g, steps: [] };
  return { ...base, text: top.g, steps: steps.slice(0, 3) };
}
