import { describe, it, expect } from 'vitest';
import { buildRoadmap, scorePaths } from '../../src/lib/roadmap/engine';
import { EMPTY_ANSWERS, type Answers } from '../../src/lib/roadmap/questions';
import { catalogue } from './load-content';

const cat = catalogue();
const base: Answers = {
  ...EMPTY_ANSWERS,
  name: 'Priya', background: 'professional', goal: 'unsure', field: 'accounting',
  project: 'Summarise monthly finance reports for my manager and check the numbers',
  aiExperience: 'tried', coding: 'none', maths: 'school', weeklyTime: 'steady', learningStyle: 'guided',
};
const run = (over: Partial<Answers>) => buildRoadmap({ ...base, ...over }, cat);

describe('catalogue from real content', () => {
  it('has lessons, workbooks and all five careers', () => {
    expect(cat.lessons.length).toBeGreaterThanOrEqual(10);
    expect(cat.workbooks.length).toBeGreaterThanOrEqual(4);
    expect(cat.careers.map((c) => c.path).sort()).toEqual(['ai-engineer', 'ai-product', 'ai-professional', 'ml-data', 'no-code-builder']);
  });
});

describe('path choice', () => {
  it('uses the path the learner chose', () => {
    const r = run({ goal: 'ai-product' });
    expect(r.path.path).toBe('ai-product');
    expect(r.chosenBy).toBe('you');
    expect(r.alternative).toBeUndefined();
  });
  it('suggests AI-powered professional for a non-coding professional', () => {
    const r = run({});
    expect(r.path.path).toBe('ai-professional');
    expect(r.chosenBy).toBe('suggested');
    expect(r.alternative).toBeDefined();
  });
  it('suggests AI engineer for a developer who codes', () => {
    expect(run({ background: 'developer', coding: 'professional', field: 'software', project: 'Build a small app that answers questions from our API documentation' }).path.path).toBe('ai-engineer');
  });
  it('suggests ML and data for someone strong in maths and code working with data', () => {
    expect(run({ background: 'student', coding: 'write', maths: 'strong', field: 'statistics', project: 'Train a model to predict demand from our sales dataset and explain it' }).path.path).toBe('ml-data');
  });
  it('suggests no-code builder for automation without code', () => {
    expect(run({ background: 'student', coding: 'none', field: 'retail', project: 'Automate the repeat workflow of sorting customer emails with an assistant' }).path.path).toBe('no-code-builder');
  });
  it('scores are deterministic', () => {
    expect(scorePaths(base)).toEqual(scorePaths({ ...base }));
    expect(run({})).toEqual(run({}));
  });
});

describe('plan', () => {
  it('always has four weeks, and week 4 is about showing your work', () => {
    const r = run({});
    expect(r.weeks.map((w) => w.number)).toEqual([1, 2, 3, 4]);
    expect(r.weeks[3].title).toBe('Show your work');
    expect(r.weeks[3].items.some((i) => i.slug === 'build-your-ai-portfolio-page')).toBe(true);
  });
  it('includes responsible use in week 1', () => {
    expect(run({}).weeks[0].items.some((i) => i.slug === 'use-ai-responsibly-at-work')).toBe(true);
  });
  it('gives 4 lessons at a light pace and 6 at an intensive pace, with no repeats', () => {
    const light = run({ weeklyTime: 'light' });
    const heavy = run({ weeklyTime: 'intensive' });
    expect(light.lessons).toHaveLength(4);
    expect(heavy.lessons).toHaveLength(6);
    expect(new Set(heavy.lessons.map((l) => l.slug)).size).toBe(6);
    expect(light.weeks.flatMap((w) => w.items).some((i) => i.kind === 'practice')).toBe(false);
  });
  it('starts beginners with the clear first question lesson', () => {
    expect(run({ aiExperience: 'none', learningStyle: 'guided' }).firstStep.slug).toBe('chatgpt-ask-a-clear-first-question');
  });
  it('starts concept learners with a concept lesson', () => {
    expect(['chatgpt-study-mode-learn-a-concept', 'gemini-explain-it-three-ways']).toContain(run({ goal: 'ml-data', learningStyle: 'concepts' }).firstStep.slug);
  });
  it('only suggests creative Level 3 lessons when the project is creative', () => {
    expect(run({}).lessons.some((l) => l.level === 3)).toBe(false);
    expect(run({ project: 'Make a short explainer video and a poster for our new product launch' }).lessons.some((l) => l.level === 3)).toBe(true);
  });
  it('picks the job application kit for job hunters', () => {
    expect(run({ project: 'Prepare my resume and practise interview answers for AI roles' }).workbook.slug).toBe('ai-job-application-kit');
    expect(run({ background: 'returning' }).workbook.slug).toBe('ai-job-application-kit');
  });
  it('puts the workbook in week 2 for project-first learners', () => {
    const r = run({ learningStyle: 'project' });
    expect(r.weeks[1].items.some((i) => i.kind === 'workbook')).toBe(true);
  });
  it('only links to lessons and workbooks that exist', () => {
    const slugs = new Set([...cat.lessons.map((l) => l.slug), ...cat.workbooks.map((w) => w.slug)]);
    for (const goal of ['unsure', 'ai-professional', 'no-code-builder', 'ai-engineer', 'ml-data', 'ai-product']) {
      for (const weeklyTime of ['light', 'steady', 'focused', 'intensive']) {
        const r = run({ goal, weeklyTime });
        for (const i of r.weeks.flatMap((w) => w.items)) if (i.slug) expect(slugs.has(i.slug)).toBe(true);
      }
    }
  });
});

describe('gaps', () => {
  it('warns about coding for AI engineer without code', () => {
    expect(run({ goal: 'ai-engineer', coding: 'none' }).gaps.join(' ')).toMatch(/strong coding/);
  });
  it('warns about maths for ML without strong maths', () => {
    expect(run({ goal: 'ml-data', maths: 'basic' }).gaps.join(' ')).toMatch(/statistics/);
  });
  it('mentions the fast track for experienced builders', () => {
    const r = run({ aiExperience: 'building' });
    expect(r.fastTrack).toBe(true);
    expect(r.gaps.join(' ')).toMatch(/move quickly/);
  });
  it('writes nothing that breaks the writing rules', () => {
    for (const goal of ['unsure', 'ai-engineer', 'ml-data']) {
      const r = run({ goal, coding: 'none', maths: 'basic', weeklyTime: 'light', aiExperience: 'building' });
      const text = [...r.gaps, ...r.reasons, r.fieldNote, r.pace.detail, ...r.weeks.flatMap((w) => [w.title, ...w.items.map((i) => i.label)])].join(' ');
      expect(text).not.toMatch(/[—–]/);
      expect(text).not.toMatch(/\b\w+n't\b/);
    }
  });
});
