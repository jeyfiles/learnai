// Content schemas for JeyInsights Learn AI.
// Every content file is checked against these rules when the site builds.
// A mistake (a missing field, a wrong level number) stops the build with a clear message.
// Field-by-field guide: docs/CONTENT_GUIDE.md. Starter files: templates/.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Career paths. Content is tagged with the paths it helps most. "all" means every path. */
export const PATH_IDS = [
  'ai-professional',   // Uses AI to do their own field's work better
  'no-code-builder',   // Builds assistants, automations and simple apps without much code
  'ai-engineer',       // Builds software on top of AI models with code
  'ml-data',           // Trains, evaluates and analyses models and data
  'ai-product',        // Plans and manages AI products and projects
] as const;

import { RETIRED } from './lib/retired';
const files = (retired: string[] = []) => ['**/*.md', ...retired.map((f) => `!${f}`)];

const path = z.enum(PATH_IDS);
const pathOrAll = z.union([path, z.literal('all')]);
const level = z.number().int().min(1).max(5);
const text = z.string().trim().min(1);
const source = z.object({ title: text, url: z.url() });
const isoDate = z.coerce.date();

/** One step inside a build, workbook part or project. */
const step = z.object({
  title: text,                         // Short name of the step, shown as a heading
  action: text,                        // What to do, in one or two sentences
  clickPath: z.array(text).optional(), // Buttons or menus to click, in order
  prompt: text.optional(),             // A prompt the learner can copy
  checkpoint: text,                    // How the learner knows the step worked
});

const lessons = defineCollection({
  loader: glob({ pattern: files(RETIRED.lessons), base: './src/content/lessons' }),
  schema: z.object({
    title: text,
    level,
    order: z.number().int().min(1),
    tool: text,                            // Name shown to learners, for example "ChatGPT"
    provider: text,                        // Company, for example "OpenAI"
    toolUrl: z.url().optional(),           // Where to open the tool
    summary: text,                         // One sentence for cards and search
    outcome: text,                         // "You will finish with..."
    minutes: z.number().int().min(5).max(120),
    paths: z.array(pathOrAll).min(1),
    access: text,                          // Sign-up rules: account needed, age limits, regions
    freeTier: z.object({ status: z.enum(['free', 'free-with-limits', 'paid']), note: text }),
    whereToStart: z.array(text).min(1),
    learn: z.array(z.object({ title: text, text })).min(2).max(4), // "Understand it first"
    builds: z.array(z.object({
      id: z.string().regex(/^[a-z0-9-]+$/),
      title: text,
      forPaths: z.array(pathOrAll).min(1),
      scenario: text,
      outcome: text,
      steps: z.array(step).min(3).max(10),
      proof: z.array(text).min(1),         // What to save for your portfolio
    })).min(2).max(3),
    sources: z.array(source).min(1),
    lastReviewed: isoDate,
    reviewNotes: z.array(text).default([]), // Anything not fully confirmed; shown on the page
    draft: z.boolean().default(false),
  }),
});

const workbooks = defineCollection({
  loader: glob({ pattern: files(RETIRED.workbooks), base: './src/content/workbooks' }),
  schema: z.object({
    title: text,
    level,
    order: z.number().int().min(1),
    promise: text,
    outcome: text,
    minutes: z.number().int().min(15).max(240),
    paths: z.array(pathOrAll).min(1),
    tools: z.array(text).min(1),
    beforeYouStart: z.array(text).min(1),
    versions: z.array(z.object({ path: pathOrAll, title: text, brief: text })).min(2),
    parts: z.array(z.object({ title: text, purpose: text, steps: z.array(step).min(1) })).min(2),
    tests: z.array(text).min(2),
    proof: z.array(text).min(1),
    sources: z.array(source).min(1),
    lastReviewed: isoDate,
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: files(), base: './src/content/projects' }),
  schema: z.object({
    title: text,
    level,
    path,                                  // Exactly one career path
    order: z.number().int().min(1),
    promise: text,
    outcome: text,
    scenario: text,
    tools: z.array(text).min(1),
    minutes: z.number().int().min(20).max(600),
    beforeYouStart: z.array(text).min(1),
    steps: z.array(step).min(6),
    tests: z.array(z.object({ name: text, expected: text })).min(2),
    safety: z.array(text).min(1),
    proof: z.array(text).min(1),
    sources: z.array(source).default([]),
    lastReviewed: isoDate,
    draft: z.boolean().default(false),
  }),
});

const practices = defineCollection({
  loader: glob({ pattern: files(), base: './src/content/practices' }),
  schema: z.object({
    title: text,
    order: z.number().int().min(1),
    minutes: z.number().int().min(5).max(30),
    skill: text,
    stage: z.enum(['worked', 'guided', 'independent']),
    paths: z.array(pathOrAll).min(1),
    recallQuestion: text,
    workedExample: z.object({ situation: text, input: text, approach: z.array(text).min(2), output: text, whyItWorks: text }),
    task: z.object({ outcome: text, steps: z.array(text).min(2), prompt: text }),
    successChecks: z.array(text).min(2),
    ifStuck: text,
    connectedLesson: z.string().optional(), // Lesson file name without .md
    draft: z.boolean().default(false),
  }),
});

const levels = defineCollection({
  loader: glob({ pattern: files(), base: './src/content/levels' }),
  schema: z.object({
    number: level,
    outcome: text,
    youWillLearn: z.array(text).min(3),
    tools: z.array(text).min(1),
    evidenceGate: z.array(text).min(2), // Portfolio pieces to finish before moving up
  }),
});

const careers = defineCollection({
  loader: glob({ pattern: files(), base: './src/content/careers' }),
  schema: z.object({
    path,
    order: z.number().int().min(1),
    title: text,
    summary: text,
    suitsYouIf: z.array(text).min(2),
    dayToDay: z.array(text).min(3),
    skills: z.array(text).min(4),
    coding: z.enum(['none', 'some', 'strong']),
    maths: z.enum(['basic', 'some', 'strong']),
    jobTitles: z.array(text).min(2),        // Titles you will see in job posts
    levels: z.array(level).min(1),         // Levels that matter most for this path
    firstPortfolioPieces: z.array(text).min(2),
    sources: z.array(source).default([]),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: files(RETIRED.glossary), base: './src/content/glossary' }),
  schema: z.object({
    term: text,
    category: z.enum(['Basics', 'Prompting', 'Checking answers', 'Tools and features', 'Responsible use', 'Building with AI']),
    definition: text,
    whyItMatters: text,
    example: text,
    related: z.array(z.string()).default([]),
  }),
});

const help = defineCollection({
  loader: glob({ pattern: files(RETIRED.help), base: './src/content/help' }),
  schema: z.object({
    title: text,
    order: z.number().int().min(1),
    category: z.enum(['Careers in AI', 'Responsible use', 'When answers go wrong', 'Using the tools']),
    question: text,
    shortAnswer: text,
    steps: z.array(text).min(2),
    success: text,
    prompt: text.optional(),
    sources: z.array(source).default([]),
  }),
});

export const collections = { lessons, workbooks, projects, practices, levels, careers, glossary, help };
