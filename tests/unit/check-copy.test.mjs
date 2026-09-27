import { test, assert } from 'vitest';
import { findProblems, textFromHtml } from '../../scripts/check-copy.mjs';

const rules = (t) => findProblems(t).map((p) => p.rule);

test('flags em and en dashes', () => {
  assert.deepEqual(rules('Study hard — then rest.'), ['dash']);
  assert.deepEqual(rules('Pages 10–20'), ['dash']);
});

test('flags contractions with straight and curly apostrophes', () => {
  assert.equal(rules("You don't need code.").length, 1);
  assert.equal(rules('It’s free.').length, 1);
  assert.equal(rules("Let's start.").length, 1);
  assert.equal(rules("I'm stuck").length, 1);
});

test('allows possessives', () => {
  assert.deepEqual(rules("Today's practice uses Jey's notes and your school's rules."), []);
});

test('flags banned phrases as whole words only', () => {
  assert.ok(rules('Unlock your potential').some((r) => r.startsWith('banned')));
  assert.ok(rules('Begin your learning journey').some((r) => r.startsWith('banned')));
  assert.deepEqual(rules('Harnessed? No. Journeyman? Fine.').filter((r) => r.includes('journey')), []);
});

test('flags forbidden brands in any case', () => {
  assert.ok(rules('Built like OUTSKILL').some((r) => r.startsWith('brand')));
});

test('reads visible text and attributes, skips scripts and code', () => {
  const html = `<p>Hello</p><img alt="It's a cat"><script>const x = "don't"</script><code>won't</code>`;
  const text = textFromHtml(html);
  assert.ok(text.includes("It's a cat"));
  assert.ok(!text.includes("don't"));
  assert.ok(!text.includes("won't"));
});
