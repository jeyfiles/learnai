// Turns content entries into the small catalogue the roadmap engine needs.
// Kept free of Astro imports so unit tests can use it too.
import type { Catalogue, CatCareer } from './engine';

interface LessonData {
  title: string; level: number; tool: string; summary: string; outcome: string; minutes: number;
  paths: string[]; builds: { title: string; forPaths: string[] }[]; draft?: boolean;
}
interface WorkbookData { title: string; promise: string; outcome: string; minutes: number; paths: string[]; draft?: boolean }
type CareerData = Omit<CatCareer, never>;
interface ProjectData { title: string; promise: string; path: string; level: number; order: number; minutes: number; draft?: boolean }

const slugOf = (id: string) => id.split('/').pop() as string;

export function toCatalogue(
  lessons: { id: string; data: LessonData }[],
  workbooks: { id: string; data: WorkbookData }[],
  careers: { id: string; data: CareerData }[],
  projects: { id: string; data: ProjectData }[] = [],
): Catalogue {
  return {
    lessons: lessons.filter((l) => !l.data.draft).map((l) => ({
      slug: slugOf(l.id),
      title: l.data.title,
      level: l.data.level,
      tool: l.data.tool,
      summary: l.data.summary,
      minutes: l.data.minutes,
      paths: l.data.paths,
      buildPaths: [...new Set(l.data.builds.flatMap((b) => b.forPaths))],
      text: [l.data.title, l.data.tool, l.data.summary, l.data.outcome, ...l.data.builds.map((b) => b.title)].join(' ').toLowerCase(),
    })),
    workbooks: workbooks.filter((w) => !w.data.draft).map((w) => ({
      slug: slugOf(w.id),
      title: w.data.title,
      promise: w.data.promise,
      minutes: w.data.minutes,
      paths: w.data.paths,
      text: [w.data.title, w.data.promise, w.data.outcome].join(' ').toLowerCase(),
    })),
    careers: careers.map((c) => ({
      path: c.data.path, title: c.data.title, summary: c.data.summary, coding: c.data.coding,
      maths: c.data.maths, levels: c.data.levels, firstPortfolioPieces: c.data.firstPortfolioPieces,
    })),
    projects: projects.filter((p) => !p.data.draft).map((p) => ({
      slug: slugOf(p.id), title: p.data.title, promise: p.data.promise, path: p.data.path,
      level: p.data.level, order: p.data.order, minutes: p.data.minutes,
    })),
  };
}
