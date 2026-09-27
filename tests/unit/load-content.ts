// Reads the real content files for tests, the same way the site does (skipping retired files).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { load as loadYaml } from 'js-yaml';
import { RETIRED } from '../../src/lib/retired';
import { toCatalogue } from '../../src/lib/roadmap/catalogue';

const ROOT = join(__dirname, '../../src/content');

export function entries(collection: string) {
  const base = join(ROOT, collection);
  const out: { id: string; data: any }[] = [];
  const walk = (dir: string) => {
    for (const n of readdirSync(dir)) {
      const p = join(dir, n);
      if (statSync(p).isDirectory()) { walk(p); continue; }
      if (!p.endsWith('.md')) continue;
      const rel = relative(base, p).replace(/\\/g, '/');
      if ((RETIRED[collection] ?? []).includes(rel)) continue;
      const fm = readFileSync(p, 'utf8').split(/^---\s*$/m)[1];
      out.push({ id: rel.replace(/\.md$/, ''), data: loadYaml(fm) });
    }
  };
  walk(base);
  return out;
}

export const catalogue = () => toCatalogue(entries('lessons'), entries('workbooks'), entries('careers'), entries('projects'));
