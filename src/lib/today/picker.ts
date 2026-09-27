// Picks today's practice and works out the streak. Pure functions: no storage, no clock.
// The page passes in the date, the saved state and the practice list, so these are easy to test.

export type Stage = 'worked' | 'guided' | 'independent';

export const STAGE_LABEL: Record<Stage, string> = {
  worked: 'With a full example',
  guided: 'Guided',
  independent: 'On your own',
};

export interface PracticeMeta {
  id: string;
  order: number;
  stage: Stage;
  paths: string[]; // career path ids, or 'all'
}

export interface DailyState {
  v: 1;
  selection: { date: string; id: string } | null; // today's pick, kept for the whole day
  done: Record<string, string>; // practice id -> date it was last finished (YYYY-MM-DD)
  days: string[]; // every date with at least one finished practice, oldest first
  drafts: Record<string, string>; // practice id -> reflection text
}

export const EMPTY_DAILY: DailyState = { v: 1, selection: null, done: {}, days: [], drafts: {} };

/** Local calendar date as YYYY-MM-DD (the learner's own day, not UTC). */
export function dateKey(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Whole days since 1970-01-01 for a YYYY-MM-DD key. */
export function dayNumber(key: string): number {
  const [y, m, d] = key.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

export function addDays(key: string, n: number): string {
  const t = new Date((dayNumber(key) + n) * 86_400_000);
  const p = (x: number) => String(x).padStart(2, '0');
  return `${t.getUTCFullYear()}-${p(t.getUTCMonth() + 1)}-${p(t.getUTCDate())}`;
}

/** First practices show a full worked example; support fades as the learner finishes more. */
export function stageFor(finished: number): Stage {
  return finished < 4 ? 'worked' : finished < 8 ? 'guided' : 'independent';
}

const byOrder = <T extends PracticeMeta>(a: T, b: T) => a.order - b.order;

/**
 * Chooses the practice for a given day.
 * 1. Keep the saved pick if it was made today and still exists.
 * 2. Otherwise take practices from the learner's stage that are not finished yet.
 *    Worked examples go in order, because each one builds on the last.
 *    Later stages prefer practices tagged with the learner's career path, then rotate by day.
 * 3. If the stage is used up, take any unfinished practice.
 * 4. If every practice is finished, repeat the one finished longest ago.
 */
export function pickPractice<T extends PracticeMeta>(opts: {
  today: string;
  practices: T[];
  state: Pick<DailyState, 'selection' | 'done'>;
  path?: string;
}): T | undefined {
  const { today, practices, state, path } = opts;
  if (!practices.length) return undefined;
  const all = [...practices].sort(byOrder);

  if (state.selection?.date === today) {
    const kept = all.find((p) => p.id === state.selection!.id);
    if (kept) return kept;
  }

  const finished = new Set(Object.keys(state.done).filter((id) => all.some((p) => p.id === id)));
  const stage = stageFor(finished.size);
  const open = all.filter((p) => !finished.has(p.id));
  let pool = open.filter((p) => p.stage === stage);
  if (!pool.length) pool = open;

  if (!pool.length) {
    // Everything is finished: repeat the oldest one (ties broken by order).
    return [...all].sort((a, b) => (state.done[a.id] ?? '').localeCompare(state.done[b.id] ?? '') || a.order - b.order)[0];
  }

  if (stage === 'worked' && pool[0].stage === 'worked') return pool[0];

  const preferred = path ? pool.filter((p) => p.paths.includes(path)) : [];
  const choices = preferred.length ? preferred : pool;
  return choices[Math.abs(dayNumber(today)) % choices.length];
}

/** Days in a row with a finished practice, ending today (or yesterday if today is not done yet). */
export function streak(days: string[], today: string): number {
  const set = new Set(days);
  let cursor = set.has(today) ? today : addDays(today, -1);
  let n = 0;
  while (set.has(cursor)) { n += 1; cursor = addDays(cursor, -1); }
  return n;
}

/** Longest run of days in a row, for the "best" figure. */
export function bestStreak(days: string[]): number {
  const nums = [...new Set(days)].map(dayNumber).sort((a, b) => a - b);
  let best = 0, run = 0;
  nums.forEach((n, i) => { run = i && n === nums[i - 1] + 1 ? run + 1 : 1; best = Math.max(best, run); });
  return best;
}

/** The last seven days, oldest first, for the week row. */
export function weekRow(days: string[], today: string): { date: string; done: boolean; isToday: boolean }[] {
  const set = new Set(days);
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i - 6);
    return { date, done: set.has(date), isToday: date === today };
  });
}

/** Marks a practice finished today. Returns a new state. */
export function markDone(state: DailyState, id: string, today: string): DailyState {
  const days = state.days.includes(today) ? state.days : [...state.days, today].sort();
  return { ...state, done: { ...state.done, [id]: today }, days: days.slice(-120) };
}

/** Undoes a practice finished today. Earlier days are never changed. */
export function undoDone(state: DailyState, id: string, today: string): DailyState {
  if (state.done[id] !== today) return state;
  const done = { ...state.done };
  delete done[id];
  const otherToday = Object.values(done).includes(today);
  return { ...state, done, days: otherToday ? state.days : state.days.filter((d) => d !== today) };
}

/** Makes saved data safe to use, whatever was found in storage. */
export function cleanDaily(raw: unknown): DailyState {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Partial<DailyState>;
  const isKey = (s: unknown): s is string => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
  const done: Record<string, string> = {};
  for (const [k, v] of Object.entries(r.done ?? {})) if (isKey(v)) done[k] = v;
  const drafts: Record<string, string> = {};
  for (const [k, v] of Object.entries(r.drafts ?? {})) if (typeof v === 'string') drafts[k] = v.slice(0, 2000);
  const sel = r.selection && isKey(r.selection.date) && typeof r.selection.id === 'string' ? r.selection : null;
  return { v: 1, selection: sel, done, days: Array.isArray(r.days) ? r.days.filter(isKey) : [], drafts };
}
