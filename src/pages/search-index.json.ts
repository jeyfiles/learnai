// Builds /learnai/search-index.json at build time. The search dialog and help drawer load it
// only when they are opened, so no page downloads the whole library up front.
import { getCollection } from 'astro:content';
import { buildIndex } from '../lib/search/build-index';
import { LEVELS, url } from '../lib/site';

export async function GET() {
  const [lessons, workbooks, practices, projects, careers, levels, glossary, help] = await Promise.all([
    getCollection('lessons'), getCollection('workbooks'), getCollection('practices'), getCollection('projects'),
    getCollection('careers'), getCollection('levels'), getCollection('glossary'), getCollection('help'),
  ]);
  const items = buildIndex({ lessons, workbooks, practices, projects, careers, levels, glossary, help, levelInfo: LEVELS, url });
  return new Response(JSON.stringify({ v: 1, items }), { headers: { 'Content-Type': 'application/json' } });
}
