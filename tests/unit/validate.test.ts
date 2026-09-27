import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../../src/lib/roadmap/questions';
import { validateAnswer, looksLikeGibberish } from '../../src/lib/roadmap/validate';

const q = (key: string) => QUESTIONS.find((x) => x.key === key)!;

describe('onboarding questions', () => {
  it('has exactly 10 questions with unique keys', () => {
    expect(QUESTIONS).toHaveLength(10);
    expect(new Set(QUESTIONS.map((x) => x.key)).size).toBe(10);
  });
  it('every options question has at least two options', () => {
    for (const x of QUESTIONS.filter((x) => x.type === 'options')) expect(x.options!.length).toBeGreaterThanOrEqual(2);
  });
});

describe('looksLikeGibberish', () => {
  it.each(['asdf', 'qwerty qwerty', 'aaaaaaa', 'jjjj kkkk', 'xcvbnm', 'bcdfg hjklm npqrst', 'lol lol lol lol'])('flags "%s"', (t) => {
    expect(looksLikeGibberish(t)).toBe(true);
  });
  it.each(['Accounting', 'HR', 'civil engineering', 'I want to summarise customer feedback for my team every week'])('accepts "%s"', (t) => {
    expect(looksLikeGibberish(t)).toBe(false);
  });
});

describe('validateAnswer', () => {
  it('lets the optional name be empty', () => expect(validateAnswer(q('name'), '')).toBe(''));
  it('accepts a normal first name', () => expect(validateAnswer(q('name'), 'Priya')).toBe(''));
  it('rejects names with numbers or that are too long', () => {
    expect(validateAnswer(q('name'), 'Priya123')).not.toBe('');
    expect(validateAnswer(q('name'), 'a'.repeat(41))).not.toBe('');
  });
  it('requires an option and only accepts listed values', () => {
    expect(validateAnswer(q('background'), '')).toMatch(/choose one answer/);
    expect(validateAnswer(q('background'), 'astronaut')).toMatch(/one of the answers/);
    expect(validateAnswer(q('background'), 'developer')).toBe('');
  });
  it('checks the field', () => {
    expect(validateAnswer(q('field'), '')).not.toBe('');
    expect(validateAnswer(q('field'), 'asdf')).not.toBe('');
    expect(validateAnswer(q('field'), 'HR')).toBe('');
    expect(validateAnswer(q('field'), 'mechanical engineering')).toBe('');
  });
  it('asks for more detail on a thin project', () => {
    expect(validateAnswer(q('project'), 'help with ai')).toMatch(/more detail/);
    expect(validateAnswer(q('project'), 'use ai for my work stuff')).toMatch(/more detail/);
    expect(validateAnswer(q('project'), 'qwerty asdf zxcv qwerty asdf')).toMatch(/real task/);
  });
  it('accepts a real project', () => {
    expect(validateAnswer(q('project'), 'Compare two AI tools for summarising customer feedback so my team can choose one')).toBe('');
  });
  it('limits very long projects', () => {
    expect(validateAnswer(q('project'), 'word '.repeat(200))).toMatch(/under 600/);
  });
  it('never returns text that breaks the writing rules', () => {
    const inputs = ['', 'x', 'asdf', '123', 'a'.repeat(700)];
    for (const x of QUESTIONS) for (const v of inputs) {
      const msg = validateAnswer(x, v);
      expect(msg).not.toMatch(/[—–]/);
      expect(msg).not.toMatch(/\b\w+n't\b|\b(it|you|we|that)'(s|re|ll)\b/i);
    }
  });
});
