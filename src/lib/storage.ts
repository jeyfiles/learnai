// Small, safe wrapper around localStorage for the browser.
// Every key starts with "jeyinsights-learnai-". Storage can be blocked (private mode, strict settings),
// so every read and write is wrapped and the page keeps working without it.

const PREFIX = 'jeyinsights-learnai-';

export function readJSON<T>(name: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + name);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(name: string, value: unknown): boolean {
  try {
    localStorage.setItem(PREFIX + name, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

interface Progress { v: 1; done: string[] }

export function getProgress(): Progress {
  const p = readJSON<Progress>('progress', { v: 1, done: [] });
  return p && Array.isArray(p.done) ? p : { v: 1, done: [] };
}

export function isDone(item: string): boolean {
  return getProgress().done.includes(item);
}

export function setDone(item: string, done: boolean): Progress {
  const p = getProgress();
  const set = new Set(p.done);
  if (done) set.add(item); else set.delete(item);
  const next: Progress = { v: 1, done: [...set] };
  writeJSON('progress', next);
  return next;
}

/** `path` is the career path the roadmap chose, saved when the roadmap is complete (used by Today and Projects). */
export interface SavedProfile<A> { v: 1; answers: A; complete: boolean; step: number; path?: string }

/** True when the learner has finished the roadmap questions. Projects open after this. */
export function roadmapDone(): boolean {
  const p = getProfile<unknown>();
  return !!p?.complete;
}

export function getProfile<A>(): SavedProfile<A> | null {
  const p = readJSON<SavedProfile<A> | null>('profile', null);
  return p && p.v === 1 && p.answers ? p : null;
}

export function saveProfile<A>(p: Omit<SavedProfile<A>, 'v'>): boolean {
  return writeJSON('profile', { v: 1, ...p });
}

export function clearProfile(): void {
  try { localStorage.removeItem(PREFIX + 'profile'); } catch { /* storage blocked: nothing to clear */ }
}
