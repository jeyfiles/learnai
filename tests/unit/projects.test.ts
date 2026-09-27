import { describe, it, expect } from 'vitest';
import { entries, catalogue } from './load-content';
import { buildRoadmap } from '../../src/lib/roadmap/engine';
import { EMPTY_ANSWERS, type Answers } from '../../src/lib/roadmap/questions';
import { certificateSvg, checkName, cleanName, nameSize, escapeXml } from '../../src/lib/certificate';
import { PATHS } from '../../src/lib/site';
// @ts-expect-error plain JS module
import { findProblems } from '../../scripts/check-copy.mjs';

const projects = entries('projects');

describe('project content', () => {
  it('has 6 to 9 projects and at least one for every career path', () => {
    expect(projects.length).toBeGreaterThanOrEqual(6);
    expect(projects.length).toBeLessThanOrEqual(9);
    for (const p of PATHS) expect(projects.some((x) => x.data.path === p.id), p.id).toBe(true);
  });
  it('gives every project enough steps, tests, safety rules and proof', () => {
    for (const { id, data } of projects) {
      expect(data.steps.length, id).toBeGreaterThanOrEqual(6);
      expect(data.tests.length, id).toBeGreaterThanOrEqual(2);
      expect(data.safety.length, id).toBeGreaterThanOrEqual(1);
      expect(data.proof.length, id).toBeGreaterThanOrEqual(1);
    }
  });
  it('has unique order numbers within each path', () => {
    for (const p of PATHS) {
      const orders = projects.filter((x) => x.data.path === p.id).map((x) => x.data.order);
      expect(new Set(orders).size).toBe(orders.length);
    }
  });
});

describe('roadmap picks a first project', () => {
  const base: Answers = {
    ...EMPTY_ANSWERS, background: 'professional', field: 'accounting', project: 'Summarise monthly finance reports for my manager and check every number',
    aiExperience: 'tried', coding: 'none', maths: 'school', weeklyTime: 'steady', learningStyle: 'guided',
  };
  for (const p of PATHS) {
    it(`for ${p.id}`, () => {
      const r = buildRoadmap({ ...base, goal: p.id }, catalogue());
      expect(r.project?.path).toBe(p.id);
    });
  }
  it('works without any projects', () => {
    const r = buildRoadmap({ ...base, goal: 'ai-engineer' }, { ...catalogue(), projects: [] });
    expect(r.project).toBeUndefined();
  });
});

describe('certificate', () => {
  it('accepts real names in many forms', () => {
    for (const n of ['Priya', "Seán O'Brien", 'Anne-Marie Dupont', 'J. R. Mehta', 'முருகன்', 'Zoë Kowalczyk']) expect(checkName(n), n).toBe('');
  });
  it('rejects empty, too short, digits and symbols', () => {
    for (const n of ['', ' ', 'A', '12345', 'Jo <script>', 'name@example.com']) expect(checkName(n), n).not.toBe('');
  });
  it('cleans spaces and caps length', () => {
    expect(cleanName('  Ana   Silva  ')).toBe('Ana Silva');
    expect(cleanName('x'.repeat(80))).toHaveLength(60);
  });
  it('shrinks long names', () => {
    expect(nameSize('Ana')).toBeGreaterThan(nameSize('Anastasia Konstantinopoulou-Papadimitriou'));
  });
  it('escapes the name inside the SVG', () => {
    const svg = certificateSvg({ name: 'Tom & "Jerry"', date: '26 September 2026', levelTitle: 'Foundations', lessonCount: 10 });
    expect(svg).toContain('Tom &amp; &quot;Jerry&quot;');
    expect(svg).not.toContain('Tom & "Jerry"');
    expect(escapeXml('<a>')).toBe('&lt;a&gt;');
  });
  it('follows the writing rules', () => {
    const svg = certificateSvg({ name: 'Priya', date: '26 September 2026', levelTitle: 'Foundations', lessonCount: 10 });
    const text = svg.replace(/<[^>]+>/g, '\n');
    expect(findProblems(text)).toEqual([]);
  });
});
