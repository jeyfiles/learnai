import { describe, it, expect } from 'vitest';
import { entries } from './load-content';
import { pickPractice, markDone, EMPTY_DAILY, addDays, type DailyState } from '../../src/lib/today/picker';
// @ts-expect-error plain JS module
import { findProblems } from '../../scripts/check-copy.mjs';

const practices = entries('practices').map((p) => ({ id: p.id, ...p.data }));
const lessons = new Set(entries('lessons').map((l) => l.id.split('/').pop()));

describe('practice content', () => {
  it('has 12 practices, four per stage, with unique order numbers', () => {
    expect(practices).toHaveLength(12);
    for (const s of ['worked', 'guided', 'independent']) expect(practices.filter((p) => p.stage === s)).toHaveLength(4);
    expect(new Set(practices.map((p) => p.order)).size).toBe(12);
  });
  it('links only to lessons that exist', () => {
    for (const p of practices) if (p.connectedLesson) expect(lessons.has(p.connectedLesson), p.id).toBe(true);
  });
  it('follows the writing rules in every field', () => {
    for (const p of practices) expect(findProblems(JSON.stringify(p).replace(/\\"/g, '"').replace(/","/g, '\n')), p.id).toEqual([]);
  });
  it('a learner doing one practice a day meets all 12 before any repeat', () => {
    let s: DailyState = EMPTY_DAILY;
    let day = '2026-10-01';
    const seen: string[] = [];
    for (let i = 0; i < 12; i++) {
      const p = pickPractice({ today: day, practices, state: s, path: 'ai-engineer' })!;
      seen.push(p.id);
      s = { ...markDone(s, p.id, day), selection: { date: day, id: p.id } };
      day = addDays(day, 1);
    }
    expect(new Set(seen).size).toBe(12);
    expect(seen.slice(0, 4)).toEqual(practices.filter((p) => p.stage === 'worked').sort((a, b) => a.order - b.order).map((p) => p.id));
  });
});
