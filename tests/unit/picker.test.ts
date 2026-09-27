import { describe, it, expect } from 'vitest';
import {
  dateKey, addDays, stageFor, pickPractice, streak, bestStreak, weekRow, markDone, undoDone, cleanDaily, EMPTY_DAILY,
  type PracticeMeta,
} from '../../src/lib/today/picker';

const P: PracticeMeta[] = Array.from({ length: 12 }, (_, i) => ({
  id: `p${i + 1}`,
  order: i + 1,
  stage: i < 4 ? 'worked' : i < 8 ? 'guided' : 'independent',
  paths: i === 5 ? ['ai-engineer'] : ['all'],
}));
const none = { selection: null, done: {} };
const doneMap = (ids: string[], date = '2026-09-01') => Object.fromEntries(ids.map((id) => [id, date]));

describe('dates', () => {
  it('uses the local calendar date', () => {
    expect(dateKey(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
  });
  it('adds days across months and years', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });
});

describe('stageFor', () => {
  it('moves from worked to guided to independent', () => {
    expect([0, 3, 4, 7, 8, 20].map(stageFor)).toEqual(['worked', 'worked', 'guided', 'guided', 'independent', 'independent']);
  });
});

describe('pickPractice', () => {
  it('starts a new learner on the first worked example', () => {
    expect(pickPractice({ today: '2026-09-26', practices: P, state: none })?.id).toBe('p1');
  });
  it('goes through worked examples in order', () => {
    expect(pickPractice({ today: '2026-09-26', practices: P, state: { selection: null, done: doneMap(['p1', 'p2']) } })?.id).toBe('p3');
  });
  it('moves to guided practices after four are finished', () => {
    const got = pickPractice({ today: '2026-09-26', practices: P, state: { selection: null, done: doneMap(['p1', 'p2', 'p3', 'p4']) } });
    expect(got?.stage).toBe('guided');
  });
  it('prefers a practice tagged with the learner path', () => {
    const state = { selection: null, done: doneMap(['p1', 'p2', 'p3', 'p4']) };
    for (const today of ['2026-09-26', '2026-09-27', '2026-09-28']) {
      expect(pickPractice({ today, practices: P, state, path: 'ai-engineer' })?.id).toBe('p6');
    }
  });
  it('is the same all day and can change the next day', () => {
    const state = { selection: null, done: doneMap(['p1', 'p2', 'p3', 'p4']) };
    const a = pickPractice({ today: '2026-09-26', practices: P, state });
    const b = pickPractice({ today: '2026-09-26', practices: P, state });
    const c = pickPractice({ today: '2026-09-27', practices: P, state });
    expect(a?.id).toBe(b?.id);
    expect(a?.id).not.toBe(c?.id);
  });
  it('keeps the saved pick for today, even after it is finished', () => {
    const state = { selection: { date: '2026-09-26', id: 'p1' }, done: { p1: '2026-09-26' } };
    expect(pickPractice({ today: '2026-09-26', practices: P, state })?.id).toBe('p1');
  });
  it('ignores a saved pick from another day', () => {
    const state = { selection: { date: '2026-09-25', id: 'p1' }, done: { p1: '2026-09-25' } };
    expect(pickPractice({ today: '2026-09-26', practices: P, state })?.id).toBe('p2');
  });
  it('never picks a finished practice while others are open', () => {
    const done = doneMap(P.slice(0, 11).map((p) => p.id));
    expect(pickPractice({ today: '2026-09-26', practices: P, state: { selection: null, done } })?.id).toBe('p12');
  });
  it('repeats the practice finished longest ago when all are done', () => {
    const done = Object.fromEntries(P.map((p, i) => [p.id, addDays('2026-09-01', i === 7 ? -10 : i)]));
    expect(pickPractice({ today: '2026-09-26', practices: P, state: { selection: null, done } })?.id).toBe('p8');
  });
  it('ignores finished ids that no longer exist', () => {
    expect(pickPractice({ today: '2026-09-26', practices: P, state: { selection: null, done: doneMap(['old-1', 'old-2', 'old-3', 'old-4']) } })?.id).toBe('p1');
  });
  it('returns nothing for an empty list', () => {
    expect(pickPractice({ today: '2026-09-26', practices: [], state: none })).toBeUndefined();
  });
});

describe('streak', () => {
  const days = ['2026-09-20', '2026-09-23', '2026-09-24', '2026-09-25'];
  it('counts days in a row ending yesterday when today is not done', () => {
    expect(streak(days, '2026-09-26')).toBe(3);
  });
  it('counts today when it is done', () => {
    expect(streak([...days, '2026-09-26'], '2026-09-26')).toBe(4);
  });
  it('drops to zero after a missed day', () => {
    expect(streak(days, '2026-09-27')).toBe(0);
  });
  it('finds the best run', () => {
    expect(bestStreak(days)).toBe(3);
    expect(bestStreak([])).toBe(0);
  });
  it('builds a seven day row ending today', () => {
    const row = weekRow(days, '2026-09-26');
    expect(row).toHaveLength(7);
    expect(row[0].date).toBe('2026-09-20');
    expect(row[6]).toEqual({ date: '2026-09-26', done: false, isToday: true });
    expect(row.filter((d) => d.done)).toHaveLength(4);
  });
});

describe('markDone and undoDone', () => {
  it('records the day once and undo removes it', () => {
    let s = markDone(EMPTY_DAILY, 'p1', '2026-09-26');
    s = markDone(s, 'p2', '2026-09-26');
    expect(s.days).toEqual(['2026-09-26']);
    s = undoDone(s, 'p1', '2026-09-26');
    expect(s.days).toEqual(['2026-09-26']);
    s = undoDone(s, 'p2', '2026-09-26');
    expect(s.days).toEqual([]);
    expect(s.done).toEqual({});
  });
  it('does not undo a practice finished on an earlier day', () => {
    const s = markDone(EMPTY_DAILY, 'p1', '2026-09-25');
    expect(undoDone(s, 'p1', '2026-09-26')).toBe(s);
  });
});

describe('cleanDaily', () => {
  it('repairs broken saved data', () => {
    expect(cleanDaily('nonsense')).toEqual(EMPTY_DAILY);
    const s = cleanDaily({ done: { a: '2026-09-01', b: 5 }, days: ['2026-09-01', 'x'], selection: { date: 'bad', id: 'a' }, drafts: { a: 'hi', b: 3 } });
    expect(s).toEqual({ v: 1, selection: null, done: { a: '2026-09-01' }, days: ['2026-09-01'], drafts: { a: 'hi' } });
  });
});
