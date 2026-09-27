// Helpers for reading content collections at build time.
import { getCollection, type CollectionEntry } from 'astro:content';
import { PATHS } from './site';

export type Lesson = CollectionEntry<'lessons'>;
export type Workbook = CollectionEntry<'workbooks'>;
export type Project = CollectionEntry<'projects'>;

/** The last part of an entry id, used in web addresses. */
export const slugOf = (id: string) => id.split('/').pop() as string;

export async function getLessons(level?: number): Promise<Lesson[]> {
  const all = await getCollection('lessons', ({ data }) => !data.draft && (level ? data.level === level : true));
  return all.sort((a, b) => a.data.level - b.data.level || a.data.order - b.data.order);
}

export async function getWorkbooks(): Promise<Workbook[]> {
  const all = await getCollection('workbooks', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.level - b.data.level || a.data.order - b.data.order);
}

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  const pathOrder = PATHS.map((p) => p.id as string);
  return all.sort((a, b) => pathOrder.indexOf(a.data.path) - pathOrder.indexOf(b.data.path) || a.data.order - b.data.order);
}

const LABELS: Record<string, string> = Object.fromEntries(PATHS.map((t) => [t.id, t.label]));
LABELS.all = 'Every path';
const SHORT: Record<string, string> = Object.fromEntries(PATHS.map((t) => [t.id, t.short]));

export const pathLabel = (id: string) => LABELS[id] ?? id;

/** Short, readable list such as "No-code builders and AI engineers". */
export function pathList(ids: readonly string[]): string {
  if (ids.includes('all')) return 'Every path';
  const names = ids.map((id) => SHORT[id] ?? id);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0];
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export const FREE_TIER_LABEL = {
  free: 'Free',
  'free-with-limits': 'Free, with limits',
  paid: 'Paid plan needed',
} as const;
