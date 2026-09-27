// Rule-based roadmap engine. A pure function: the same answers always give the same roadmap.
// No AI calls. Everything runs in the browser from a small catalogue built at build time.
import type { Answers } from './questions';

export type PathId = 'ai-professional' | 'no-code-builder' | 'ai-engineer' | 'ml-data' | 'ai-product';

export interface CatLesson {
  slug: string; title: string; level: number; tool: string; summary: string; minutes: number;
  paths: string[]; buildPaths: string[]; text: string;
}
export interface CatWorkbook { slug: string; title: string; promise: string; minutes: number; paths: string[]; text: string }
export interface CatCareer {
  path: PathId; title: string; summary: string;
  coding: 'none' | 'some' | 'strong'; maths: 'basic' | 'some' | 'strong';
  levels: number[]; firstPortfolioPieces: string[];
}
export interface CatProject { slug: string; title: string; promise: string; path: string; level: number; order: number; minutes: number }
export interface Catalogue { lessons: CatLesson[]; workbooks: CatWorkbook[]; careers: CatCareer[]; projects?: CatProject[] }

export interface PlanItem { kind: 'lesson' | 'workbook' | 'practice' | 'portfolio'; label: string; slug?: string }
export interface Week { number: number; title: string; items: PlanItem[] }

export interface Roadmap {
  name: string;
  path: CatCareer;
  chosenBy: 'you' | 'suggested';
  reasons: string[];
  alternative?: CatCareer;
  targetLevel: number;
  pace: { id: string; label: string; detail: string };
  style: string;
  fastTrack: boolean;
  firstStep: CatLesson;
  lessons: CatLesson[];
  workbook: CatWorkbook;
  weeks: Week[];
  gaps: string[];
  fieldNote: string;
  portfolioPieces: string[];
  /** First project for the path. Projects open once the roadmap is built. */
  project?: CatProject;
}

const PATH_ORDER: PathId[] = ['ai-professional', 'no-code-builder', 'ai-engineer', 'ml-data', 'ai-product'];

const RESPONSIBLE = 'use-ai-responsibly-at-work';
const PORTFOLIO_WORKBOOK = 'build-your-ai-portfolio-page';

/** Lessons each path should see first, in order. Unknown slugs are ignored, so content can change safely. */
const PRIORITY: Record<PathId, string[]> = {
  'ai-professional': ['chatgpt-ask-a-clear-first-question', 'compare-two-ai-tools', 'perplexity-sources-you-can-check', 'copilot-summarise-and-check', 'claude-feedback-without-a-rewrite', 'canva-magic-studio-portfolio-visuals'],
  'no-code-builder': ['chatgpt-ask-a-clear-first-question', 'compare-two-ai-tools', 'gemini-notebook-learn-from-the-docs', 'gemini-plan-your-ai-learning-path', 'elevenlabs-spoken-summary', 'canva-magic-studio-portfolio-visuals'],
  'ai-engineer': ['chatgpt-study-mode-learn-a-concept', 'compare-two-ai-tools', 'gemini-notebook-learn-from-the-docs', 'perplexity-sources-you-can-check', 'chatgpt-ask-a-clear-first-question', 'copilot-summarise-and-check'],
  'ml-data': ['chatgpt-study-mode-learn-a-concept', 'gemini-explain-it-three-ways', 'copilot-summarise-and-check', 'gemini-notebook-learn-from-the-docs', 'compare-two-ai-tools', 'perplexity-sources-you-can-check'],
  'ai-product': ['compare-two-ai-tools', 'perplexity-sources-you-can-check', 'copilot-summarise-and-check', 'chatgpt-ask-a-clear-first-question', 'claude-feedback-without-a-rewrite', 'gemini-explain-it-three-ways'],
};

const MAIN_WORKBOOK: Record<PathId, string> = {
  'ai-professional': 'research-brief-with-checked-sources',
  'no-code-builder': 'research-brief-with-checked-sources',
  'ai-engineer': 'explain-an-ai-paper-or-model-card',
  'ml-data': 'explain-an-ai-paper-or-model-card',
  'ai-product': 'explain-an-ai-paper-or-model-card',
};

const PACES = {
  light: { id: 'light', label: '1 to 2 hours a week', detail: 'One lesson a week. Short, steady progress.', perWeek: 1 },
  steady: { id: 'steady', label: '3 to 5 hours a week', detail: 'One lesson a week, plus the daily practice on most days.', perWeek: 1 },
  focused: { id: 'focused', label: '6 to 10 hours a week', detail: 'Two lessons a week, plus a workbook.', perWeek: 2 },
  intensive: { id: 'intensive', label: 'More than 10 hours a week', detail: 'Two lessons a week, a workbook early, and time to build.', perWeek: 2 },
} as const;

const STYLES: Record<string, string> = {
  guided: 'Step by step',
  project: 'Project first',
  concepts: 'Ideas first',
  mixed: 'A balanced mix',
};

const FILLER = new Set('a about ai and any are but can for from have help into just like make more need that the their them then there they this tool tools use using want what when with work would your'.split(' '));

export function keywords(text: string): string[] {
  const w = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return [...new Set(w.filter((x) => x.length > 3 && !FILLER.has(x)))];
}

const has = (re: RegExp, text: string) => re.test(text.toLowerCase());

const CREATIVE = /(image|visual|design|poster|video|audio|voice|podcast|slide|graphic|brand|social|content|thumbnail|presentation)/;
const JOBSEARCH = /(job|interview|resume|cv|apply|applying|application|hiring|recruit|cover letter|linkedin)/;

/** Scores each path from the answers. Used when the learner is not sure, and to suggest an alternative. */
export function scorePaths(a: Answers): Record<PathId, number> {
  const text = `${a.project} ${a.field}`;
  const codes = a.coding === 'write' || a.coding === 'professional';
  const lowCode = a.coding === 'none' || a.coding === 'read';
  const s: Record<PathId, number> = { 'ai-professional': 0, 'no-code-builder': 0, 'ai-engineer': 0, 'ml-data': 0, 'ai-product': 0 };

  if (a.background === 'professional' || a.background === 'returning') s['ai-professional'] += 3;
  if (lowCode) { s['ai-professional'] += 2; s['no-code-builder'] += 2; }
  if (has(/(report|client|customer|team|manager|sales|marketing|finance|account|hr|teach|office|email|legal|health|operations)/, text)) s['ai-professional'] += 2;

  if (has(/(automat|workflow|assistant|chatbot|bot|repeat|integrat|no.?code|zapier|form|spreadsheet)/, text)) s['no-code-builder'] += 3;
  if (a.aiExperience === 'weekly' || a.aiExperience === 'building') s['no-code-builder'] += 1;

  if (codes) s['ai-engineer'] += 4;
  if (a.background === 'developer') s['ai-engineer'] += 2;
  if (has(/(code|coding|api|software|python|javascript|deploy|rag|agent|backend|developer|app)/, text)) s['ai-engineer'] += 2;

  if (a.maths === 'stats' || a.maths === 'strong') s['ml-data'] += 3;
  if (codes) s['ml-data'] += 2;
  if (has(/(data|dataset|model|predict|analys|analyz|statistic|machine learning|train|forecast|research)/, text)) s['ml-data'] += 2;

  if (has(/(product|strategy|user|feature|roadmap|manage|consult|business|startup|stakeholder|market)/, text)) s['ai-product'] += 3;
  if (a.background === 'professional') s['ai-product'] += 1;
  if (a.coding === 'read') s['ai-product'] += 1;

  return s;
}

function rankPaths(a: Answers): PathId[] {
  const s = scorePaths(a);
  return [...PATH_ORDER].sort((x, y) => s[y] - s[x] || PATH_ORDER.indexOf(x) - PATH_ORDER.indexOf(y));
}

function reasonsFor(path: PathId, a: Answers, chosenBy: 'you' | 'suggested'): string[] {
  const r: string[] = [];
  if (chosenBy === 'you') r.push('You chose this path.');
  const codes = a.coding === 'write' || a.coding === 'professional';
  if (path === 'ai-engineer' && codes) r.push('You can already write code, which this path builds on.');
  if (path === 'ml-data' && (a.maths === 'stats' || a.maths === 'strong')) r.push('You are comfortable with maths and data, which this path needs.');
  if ((path === 'ai-professional' || path === 'no-code-builder') && !codes) r.push('You can start without any coding.');
  if (path === 'ai-professional' && a.field) r.push(`It builds directly on your experience in ${a.field.trim()}.`);
  if (path === 'no-code-builder' && has(/(automat|workflow|assistant|bot|repeat)/, a.project)) r.push('Your project is about automating or assisting with work, which is what no-code builders do.');
  if (path === 'ai-product' && has(/(product|user|feature|strategy|business|customer)/, a.project)) r.push('Your project is about users and products.');
  if (r.length === 0) r.push('It fits your answers best overall.');
  return r;
}

function scoreLesson(l: CatLesson, path: PathId, a: Answers, words: string[]): number {
  let score = 0;
  const pri = PRIORITY[path].indexOf(l.slug);
  if (pri >= 0) score += 12 - pri * 2;
  if (l.buildPaths.includes(path)) score += 6;
  score += Math.min(6, words.filter((w) => l.text.includes(w)).length * 2);
  if (a.aiExperience === 'none' && l.slug === 'chatgpt-ask-a-clear-first-question') score += 10;
  if (l.level >= 3 && !has(CREATIVE, `${a.project} ${a.field}`)) score -= 8;
  if (l.level >= 3 && has(CREATIVE, `${a.project} ${a.field}`)) score += 12;
  return score;
}

function orderByStyle(lessons: CatLesson[], style: string): CatLesson[] {
  const first = (slugs: string[]) => {
    const i = lessons.findIndex((l) => slugs.includes(l.slug));
    return i > 0 ? [lessons[i], ...lessons.filter((_, j) => j !== i)] : lessons;
  };
  if (style === 'concepts') return first(['chatgpt-study-mode-learn-a-concept', 'gemini-explain-it-three-ways']);
  if (style === 'guided') return first(['chatgpt-ask-a-clear-first-question']);
  if (style === 'project') return first(['compare-two-ai-tools', 'canva-magic-studio-portfolio-visuals']);
  return lessons;
}

export function buildRoadmap(a: Answers, cat: Catalogue): Roadmap {
  const ranked = rankPaths(a);
  const chosen = (PATH_ORDER as string[]).includes(a.goal);
  const pathId = (chosen ? a.goal : ranked[0]) as PathId;
  const career = cat.careers.find((c) => c.path === pathId) ?? cat.careers[0];
  const altId = ranked.find((p) => p !== pathId);
  const alternative = chosen ? undefined : cat.careers.find((c) => c.path === altId);

  const pace = PACES[(a.weeklyTime as keyof typeof PACES)] ?? PACES.steady;
  const style = STYLES[a.learningStyle] ?? STYLES.mixed;
  const fastTrack = a.aiExperience === 'building' || (a.aiExperience === 'weekly' && (a.coding === 'write' || a.coding === 'professional'));

  const words = keywords(`${a.project} ${a.field}`);
  const pool = cat.lessons.filter((l) => l.slug !== RESPONSIBLE);
  const count = pace.perWeek === 2 ? 6 : 4;
  const picked = pool
    .map((l) => ({ l, s: scoreLesson(l, pathId, a, words) }))
    .sort((x, y) => y.s - x.s || x.l.level - y.l.level || x.l.slug.localeCompare(y.l.slug))
    .slice(0, count)
    .map((x) => x.l);
  const lessons = orderByStyle(picked, a.learningStyle);

  const jobHunting = a.background === 'returning' || has(JOBSEARCH, a.project);
  const wbSlug = jobHunting ? 'ai-job-application-kit' : MAIN_WORKBOOK[pathId];
  const workbook = cat.workbooks.find((w) => w.slug === wbSlug)
    ?? cat.workbooks.find((w) => w.slug !== PORTFOLIO_WORKBOOK) ?? cat.workbooks[0];
  const portfolioWb = cat.workbooks.find((w) => w.slug === PORTFOLIO_WORKBOOK);
  const responsible = cat.lessons.find((l) => l.slug === RESPONSIBLE);

  const lessonItem = (l: CatLesson): PlanItem => ({ kind: 'lesson', label: l.title, slug: l.slug });
  const wbItem = (w: CatWorkbook): PlanItem => ({ kind: 'workbook', label: w.title, slug: w.slug });
  const practice: PlanItem = { kind: 'practice', label: 'Do the daily practice on the Today page on most days' };
  const per = pace.perWeek;
  const queue = [...lessons];
  const take = (n: number) => queue.splice(0, n).map(lessonItem);

  const weeks: Week[] = [];
  const w1: PlanItem[] = [...take(1)];
  if (responsible) w1.push(lessonItem(responsible));
  if (per === 2) w1.push(...take(1));
  if (pace.id !== 'light') w1.push(practice);
  weeks.push({ number: 1, title: 'Build good habits', items: w1 });

  const workbookEarly = a.learningStyle === 'project' || pace.id === 'intensive';
  const w2: PlanItem[] = [...take(per)];
  if (workbookEarly) w2.push(wbItem(workbook));
  if (pace.id !== 'light') w2.push(practice);
  weeks.push({ number: 2, title: 'Learn and test', items: w2 });

  const w3: PlanItem[] = [...take(per)];
  if (!workbookEarly) w3.push(wbItem(workbook));
  if (pace.id !== 'light') w3.push(practice);
  weeks.push({ number: 3, title: 'Go deeper', items: w3 });

  const w4: PlanItem[] = [...take(per)];
  if (portfolioWb) w4.push(wbItem(portfolioWb));
  w4.push({ kind: 'portfolio', label: `Add your first portfolio piece for the ${career.title} path` });
  weeks.push({ number: 4, title: 'Show your work', items: w4 });

  const gaps: string[] = [];
  const lowCode = a.coding === 'none' || a.coding === 'read';
  if (career.coding === 'strong' && lowCode) gaps.push('This path needs strong coding. Plan to learn Python alongside Level 1, even one short session a week.');
  if (career.maths === 'strong' && (a.maths === 'basic' || a.maths === 'school')) gaps.push('This path uses a lot of statistics. Add a free statistics course to your plan after the first month.');
  if (career.coding === 'some' && a.coding === 'none') gaps.push('Being able to read simple code helps on this path. You can pick that up slowly, after Level 1.');
  if (pace.id === 'light' && (pathId === 'ai-engineer' || pathId === 'ml-data')) gaps.push('At 1 to 2 hours a week, this path will take many months. That is fine. Keep going steadily and build small things.');
  if (fastTrack) gaps.push('You already use AI a lot, so move quickly through the lessons you know and spend your time on the portfolio pieces.');

  const field = a.field.trim();
  const fieldNote = field
    ? `Use examples from ${field} in every build. People who understand both AI and a real field are hard to find, and that is your advantage.`
    : 'Use examples from work or study you know well in every build. Real examples make the best portfolio pieces.';

  const project = (cat.projects ?? [])
    .filter((p) => p.path === pathId)
    .sort((x, y) => x.level - y.level || x.order - y.order)[0];

  return {
    name: a.name.trim(),
    path: career,
    chosenBy: chosen ? 'you' : 'suggested',
    reasons: reasonsFor(pathId, a, chosen ? 'you' : 'suggested'),
    alternative,
    targetLevel: Math.max(...career.levels),
    pace: { id: pace.id, label: pace.label, detail: pace.detail },
    style,
    fastTrack,
    firstStep: lessons[0],
    lessons,
    workbook,
    weeks,
    gaps,
    fieldNote,
    portfolioPieces: career.firstPortfolioPieces,
    project,
  };
}
