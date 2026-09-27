// Builds search-index.json from the content files. Runs at build time only.
// Kept free of Astro imports so unit tests can build the same index from the real files.
import type { IndexItem } from './rank';

type Entry<T = any> = { id: string; data: T };
interface Sources {
  lessons: Entry[]; workbooks: Entry[]; practices: Entry[]; projects: Entry[];
  careers: Entry[]; levels: Entry[]; glossary: Entry[]; help: Entry[];
  levelInfo: { number: number; slug: string; title: string }[];
  url: (p: string) => string;
}

const slug = (id: string) => id.split('/').pop() as string;
const join = (...parts: (string | string[] | undefined)[]) => parts.flat().filter(Boolean).join(' ');
const stepLine = (s: { title: string; action: string }) => `${s.title}. ${s.action}`;
const live = (e: Entry) => !e.data.draft;

export function buildIndex(src: Sources): IndexItem[] {
  const { url } = src;
  const out: IndexItem[] = [];

  for (const { id, data: d } of src.lessons.filter(live)) {
    const first = d.builds[0];
    out.push({
      type: 'lesson', id: slug(id), title: d.title, url: url(`learn/${slug(id)}`),
      desc: `Level ${d.level} · ${d.tool} · ${d.summary}`,
      text: join(d.tool, d.provider, d.outcome, d.learn.map((l: any) => l.title), d.builds.map((b: any) => [b.title, b.scenario])),
      g: `${d.summary} ${d.outcome}`,
      ex: first ? `${first.scenario} ${first.outcome}` : undefined,
      steps: first ? first.steps.slice(0, 4).map(stepLine) : [],
    });
  }

  for (const { id, data: d } of src.workbooks.filter(live)) {
    out.push({
      type: 'workbook', id: slug(id), title: d.title, url: url(`workbooks/${slug(id)}`),
      desc: `Workbook · About ${d.minutes} minutes · ${d.promise}`,
      text: join(d.outcome, d.tools, d.parts.map((p: any) => [p.title, p.purpose])),
      g: `${d.promise} ${d.outcome}`,
      steps: d.parts.slice(0, 4).map((p: any) => `${p.title}. ${p.purpose}`),
    });
  }

  for (const { id, data: d } of src.practices.filter(live)) {
    const w = d.workedExample;
    out.push({
      type: 'practice', id: slug(id), title: d.title, url: url(`practice/${slug(id)}`),
      desc: `${d.minutes} minutes · ${d.skill} · ${d.task.outcome}`,
      text: join(d.skill, d.recallQuestion, d.successChecks, d.ifStuck),
      g: `${d.task.outcome} ${d.ifStuck}`,
      ex: `${w.situation} ${w.output} ${w.whyItWorks}`,
      steps: d.task.steps.slice(0, 4),
    });
  }

  for (const { id, data: d } of src.projects.filter(live)) {
    out.push({
      type: 'project', id: slug(id), title: d.title, url: url(`projects/${slug(id)}`),
      desc: `Project · Level ${d.level} · ${d.promise}`,
      text: join(d.outcome, d.tools, d.scenario),
      g: `${d.promise} ${d.outcome}`,
      ex: d.scenario,
      steps: d.steps.slice(0, 4).map(stepLine),
    });
  }

  for (const { data: d } of src.careers) {
    out.push({
      type: 'career', id: d.path, title: d.title, url: url(`careers/${d.path}`),
      desc: `Career path · ${d.summary}`,
      text: join(d.jobTitles, d.skills, d.suitsYouIf),
      g: d.summary,
      steps: d.firstPortfolioPieces.slice(0, 3),
    });
  }

  for (const { data: d } of src.levels) {
    const info = src.levelInfo.find((l) => l.number === d.number);
    if (!info) continue;
    out.push({
      type: 'level', id: info.slug, title: `Level ${d.number}: ${info.title}`, url: url(`levels/${info.slug}`),
      desc: d.outcome,
      text: join(d.youWillLearn, d.tools, d.evidenceGate),
      g: d.outcome,
      steps: d.youWillLearn.slice(0, 3),
    });
  }

  for (const { id, data: d } of src.glossary) {
    out.push({
      type: 'glossary', id: slug(id), title: d.term, url: `${url('glossary')}#${slug(id)}`,
      desc: d.definition,
      text: join(d.category, d.whyItMatters),
      g: `${d.definition} ${d.whyItMatters}`,
      ex: d.example,
    });
  }

  for (const { id, data: d } of src.help) {
    out.push({
      type: 'help', id: slug(id), title: d.title, url: `${url('help')}#${slug(id)}`,
      desc: d.shortAnswer,
      text: join(d.category, d.question, d.success),
      g: d.shortAnswer,
      steps: d.steps.slice(0, 4),
    });
  }

  return out;
}
