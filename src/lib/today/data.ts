// Build-time helper: turns practice entries into the small objects the Today island needs.
import { getCollection } from 'astro:content';
import { url } from '../site';
import { slugOf } from '../content';
import type { PracticeMeta } from './picker';

export interface PracticeData extends PracticeMeta {
  title: string;
  minutes: number;
  skill: string;
  recallQuestion: string;
  workedExample: { situation: string; input: string; approach: string[]; output: string; whyItWorks: string };
  task: { outcome: string; steps: string[]; prompt: string };
  successChecks: string[];
  ifStuck: string;
  lesson?: { href: string; title: string };
}

export async function getPractices(): Promise<PracticeData[]> {
  const [practices, lessons] = await Promise.all([
    getCollection('practices', ({ data }) => !data.draft),
    getCollection('lessons', ({ data }) => !data.draft),
  ]);
  const lessonBySlug = new Map(lessons.map((l) => [slugOf(l.id), l]));
  return practices
    .map(({ id, data }) => {
      const l = data.connectedLesson ? lessonBySlug.get(data.connectedLesson) : undefined;
      if (data.connectedLesson && !l) throw new Error(`Practice "${id}" links to a missing lesson "${data.connectedLesson}".`);
      const { draft: _d, connectedLesson: _c, ...rest } = data;
      return { id: slugOf(id), ...rest, lesson: l ? { href: url(`learn/${slugOf(l.id)}`), title: l.data.title } : undefined };
    })
    .sort((a, b) => a.order - b.order);
}
