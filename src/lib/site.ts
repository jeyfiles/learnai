// Site-wide constants for JeyInsights Learn AI.

export const SITE = {
  name: 'JeyInsights Learn AI',
  shortName: 'Learn AI',
  author: 'Jeyadev',
  origin: 'https://jeyinsights.com',
  base: '/learnai/',
  description:
    'Free daily AI practice for people building a career in AI. Use one tool on a real task, check the result and keep the proof. No sign-up. Progress stays on your device.',
  storagePrefix: 'jeyinsights-learnai-',
  ogImage: 'og-learnai.png',
} as const;

/** Build a path inside /learnai/. Always ends with a slash unless it points to a file. */
export function url(path = ''): string {
  const clean = path.replace(/^\/+/, '');
  if (!clean) return SITE.base;
  const [, pathPart = '', rest = ''] = clean.match(/^([^?#]*)(.*)$/) ?? [];
  if (!pathPart) return `${SITE.base}${rest}`;
  const isFile = /\.[a-z0-9]+$/i.test(pathPart);
  const finalPath = isFile || pathPart.endsWith('/') ? pathPart : `${pathPart}/`;
  return `${SITE.base}${finalPath}${rest}`;
}

export function absolute(path = ''): string {
  return `${SITE.origin}${url(path)}`;
}

export const NAV = [
  { label: 'Today', href: url(), match: /^\/learnai\/(practice\/.*)?$/ },
  { label: 'My roadmap', href: url('roadmap'), match: /^\/learnai\/roadmap\// },
  { label: 'Lessons', href: url('learn'), match: /^\/learnai\/(learn|workbooks|levels)\// },
  { label: 'Projects', href: url('projects'), match: /^\/learnai\/projects\// },
  { label: 'Careers', href: url('careers'), match: /^\/learnai\/careers\// },
  { label: 'Help', href: url('help'), match: /^\/learnai\/(help|glossary)\// },
] as const;

export const MAIN_SITE_LINKS = [
  { label: 'JeyInsights home', href: 'https://jeyinsights.com/' },
  { label: 'TNEA Compass', href: 'https://jeyinsights.com/tnea' },
  { label: 'Blog', href: 'https://jeyfiles.github.io/blog/' },
  { label: 'Resources', href: 'https://jeyinsights.com/resources' },
] as const;

export interface LevelInfo {
  number: 1 | 2 | 3 | 4 | 5;
  slug: string;
  title: string;
  short: string;
  summary: string;
  status: 'open' | 'partial' | 'coming-soon';
}

export const LEVELS: LevelInfo[] = [
  {
    number: 1,
    slug: 'level-1-foundations',
    title: 'Foundations',
    short: 'Foundations',
    summary: 'Learn how AI models work, how to ask clearly, and how to test an answer before you trust it.',
    status: 'open',
  },
  {
    number: 2,
    slug: 'level-2-research-and-study',
    title: 'Research and learning',
    short: 'Research and learning',
    summary: 'Learn new AI topics fast from papers, official docs and sources you can check.',
    status: 'coming-soon',
  },
  {
    number: 3,
    slug: 'level-3-create',
    title: 'Create with images, video and voice',
    short: 'Create',
    summary: 'Create images, video and audio with AI, and check them before you publish.',
    status: 'partial',
  },
  {
    number: 4,
    slug: 'level-4-automate-and-agents',
    title: 'Automate and use agents',
    short: 'Automate',
    summary: 'Build assistants and automations that handle repeat work, with a person in charge of the result.',
    status: 'coming-soon',
  },
  {
    number: 5,
    slug: 'level-5-build-and-ship',
    title: 'Build and ship',
    short: 'Build and ship',
    summary: 'Plan, build and share a small working AI app, and turn it into a portfolio project.',
    status: 'coming-soon',
  },
];

/** Career paths, used to tag content and to filter lessons. Ids match PATH_IDS in content.config.ts. */
export const PATHS = [
  { id: 'ai-professional', label: 'AI-powered professional', short: 'AI-powered professionals' },
  { id: 'no-code-builder', label: 'No-code AI builder', short: 'No-code builders' },
  { id: 'ai-engineer', label: 'AI engineer', short: 'AI engineers' },
  { id: 'ml-data', label: 'Machine learning and data', short: 'ML and data' },
  { id: 'ai-product', label: 'AI product and strategy', short: 'AI product' },
] as const;

/** Where learners are starting from. Used by onboarding. */
export const BACKGROUNDS = [
  { id: 'no-tech', label: 'No tech background yet' },
  { id: 'student', label: 'Student, any subject' },
  { id: 'developer', label: 'Developer or engineer' },
  { id: 'professional', label: 'Working professional in another field' },
  { id: 'returning', label: 'Returning to work or between jobs' },
] as const;
