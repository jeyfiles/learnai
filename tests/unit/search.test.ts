import { describe, it, expect } from 'vitest';
import { entries } from './load-content';
import { buildIndex } from '../../src/lib/search/build-index';
import { tokenize, stem, prepare, search, group, rankHelp, answerFor, MODES } from '../../src/lib/search/rank';
import { LEVELS, url } from '../../src/lib/site';
// @ts-expect-error plain JS module
import { findProblems } from '../../scripts/check-copy.mjs';

const index = buildIndex({
  lessons: entries('lessons'), workbooks: entries('workbooks'), practices: entries('practices'), projects: entries('projects'),
  careers: entries('careers'), levels: entries('levels'), glossary: entries('glossary'), help: entries('help'),
  levelInfo: LEVELS, url,
});
const items = prepare(index);
const ids = (r: { type: string; id: string }[]) => r.map((x) => `${x.type}:${x.id}`);

describe('tokenize', () => {
  it('drops small and common words and trims endings', () => {
    expect(tokenize('How do I check my Sources?')).toEqual(['check', 'source']);
    expect(stem('prompts')).toBe('prompt');
    expect(stem('checking')).toBe('check');
    expect(stem('class')).toBe('class');
    expect(tokenize('Café, résumé')).toEqual(['cafe', 'resume']);
  });
});

describe('the index', () => {
  it('has every content type that exists', () => {
    const types = new Set(index.map((i) => i.type));
    for (const t of ['lesson', 'workbook', 'practice', 'career', 'level', 'glossary', 'help']) expect(types.has(t as never)).toBe(true);
  });
  it('has unique addresses inside /learnai/', () => {
    expect(new Set(index.map((i) => i.url)).size).toBe(index.length);
    for (const i of index) expect(i.url).toMatch(/^\/learnai\/[a-z0-9/-]+\/(#[a-z0-9-]+)?$/);
  });
  it('follows the writing rules in everything the drawer can show', () => {
    for (const i of index) {
      const shown = [i.title, i.desc, i.g, i.ex ?? '', ...(i.steps ?? [])].join('\n');
      expect(findProblems(shown), i.id).toEqual([]);
    }
    for (const m of MODES) expect(findProblems([m.label, m.placeholder, m.guidance].join('\n')), m.id).toEqual([]);
  });
});

describe('search', () => {
  it('finds a glossary word from the start of the word', () => {
    expect(ids(search('embed', items)).slice(0, 1)).toEqual(['glossary:embeddings']);
  });
  it('puts title matches first', () => {
    expect(ids(search('context window', items))[0]).toBe('glossary:context-window');
  });
  it('finds lessons by tool name', () => {
    const r = search('perplexity', items);
    expect(r[0].type).toBe('lesson');
  });
  it('falls back to any word when no item has every word', () => {
    expect(search('perplexity zebra', items).length).toBeGreaterThan(0);
  });
  it('returns nothing for nonsense or an empty query', () => {
    expect(search('qqqzzz', items)).toEqual([]);
    expect(search('   ', items)).toEqual([]);
    expect(search('the and of', items)).toEqual([]);
  });
  it('caps results and groups them so the best result comes first', () => {
    expect(search('ai', items, 10).length).toBeLessThanOrEqual(10);
    const r = search('context window', items);
    const g = group(r);
    expect(g[0].items[0]).toBe(r[0]);
    expect(g.flatMap((x) => x.items)).toHaveLength(r.length);
  });
});

describe('help drawer ranking', () => {
  it('fix mode sends a made-up source to the help guide', () => {
    const r = rankHelp({ q: 'it made up a source', mode: 'fix', items });
    expect(ids(r)[0]).toBe('help:made-up-source');
    const a = answerFor('fix', r[0], 'it made up a source')!;
    expect(a.from).toBe('Help guide');
    expect(a.steps.length).toBeGreaterThan(0);
    expect(a.steps.length).toBeLessThanOrEqual(3);
  });
  it('a clear question beats the page being viewed', () => {
    const current = index.find((i) => i.id === 'perplexity-sources-you-can-check')!;
    const r = rankHelp({ q: 'it made up a source', mode: 'fix', items, currentUrl: current.url, contextTitle: current.title });
    expect(ids(r)[0]).toBe('help:made-up-source');
  });
  it('explain mode prefers the glossary', () => {
    expect(rankHelp({ q: 'hallucination', mode: 'explain', items })[0].type).toBe('glossary');
  });
  it('example mode prefers items with a worked example', () => {
    const r = rankHelp({ q: 'prompt', mode: 'example', items });
    expect(r[0].ex).toBeTruthy();
  });
  it('only returns types that suit the mode', () => {
    for (const m of MODES) {
      const r = rankHelp({ q: 'prompt check source', mode: m.id, items });
      for (const it of r) expect(m.types).toContain(it.type);
      expect(r.length).toBeLessThanOrEqual(6);
    }
  });
  it('with no question, shows the page being viewed and pages linked to it', () => {
    const current = index.find((i) => i.type === 'lesson' && i.id === 'perplexity-sources-you-can-check')!;
    const r = rankHelp({ q: '', mode: 'find', items, currentUrl: current.url, contextTitle: current.title });
    expect(r[0].url).toBe(current.url);
  });
  it('with no question and no page context, shows nothing rather than a random list', () => {
    expect(rankHelp({ q: '', mode: 'find', items, currentUrl: '/learnai/', contextTitle: '' })).toEqual([]);
  });
  it('hint mode gives one step, find mode gives no answer box', () => {
    const r = rankHelp({ q: 'answer too vague', mode: 'hint', items });
    const a = answerFor('hint', r[0], 'answer too vague')!;
    expect(a.steps).toEqual([]);
    expect(a.text.startsWith('Try this next:') || a.text.length > 0).toBe(true);
    expect(answerFor('find', r[0], 'answer too vague')).toBeNull();
    expect(answerFor('fix', r[0], '')).toBeNull();
  });
});
