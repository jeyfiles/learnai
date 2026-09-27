// Answer checks for onboarding. Returns an empty string when the answer is fine,
// or a short, friendly message that says how to fix it.
import type { Question } from './questions';

const words = (s: string) => s.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];

const FILLER = new Set(
  'a about ai and any be but can do for help i in it just me my need of on or so some something stuff that the thing this to use want with would'.split(' '),
);

const KEYBOARD_RUNS = /(qwer|wert|erty|rtyu|tyui|yuio|uiop|asdf|sdfg|dfgh|fghj|ghjk|hjkl|zxcv|xcvb|cvbn|vbnm)/i;
const JUNK_WORDS = /^(asdf+|qwer+|zxcv+|abc+|xyz+|blah+|test+|lorem|ipsum|idk|na+|none|nothing|lol+|hmm+|aaa+|xxx+)\d*$/i;

/** True when text looks like keyboard mashing or placeholder text rather than a real answer. */
export function looksLikeGibberish(text: string): boolean {
  const w = words(text);
  const joined = w.join('');
  if (!joined) return true;
  const letters = [...joined].filter((c) => /\p{L}/u.test(c));
  const latin = joined.match(/[a-z]/gi) ?? [];
  const vowels = latin.filter((c) => /[aeiouy]/i.test(c));
  const distinctLetters = new Set(letters.map((c) => c.toLowerCase())).size;
  const distinctWords = new Set(w).size;
  const shortShare = w.length ? w.filter((x) => x.length <= 2).length / w.length : 0;
  const mostlyLatin = letters.length > 0 && latin.length / letters.length > 0.8;

  return (
    (letters.length >= 6 && distinctLetters <= 3) ||
    (w.length >= 4 && distinctWords <= 2) ||
    (w.length >= 6 && shortShare > 0.65) ||
    w.some((x) => x.length >= 4 && (JUNK_WORDS.test(x) || KEYBOARD_RUNS.test(x))) ||
    w.some((x) => /(.)\1{3,}/.test(x)) ||
    (mostlyLatin && latin.length >= 10 && vowels.length / latin.length < 0.15)
  );
}

export function validateAnswer(q: Question, raw: string): string {
  const value = (raw ?? '').trim();

  if (!value) {
    if (q.optional) return '';
    return q.type === 'options' ? 'Please choose one answer to continue.' : 'Please answer this question to continue.';
  }

  if (q.type === 'options') {
    return q.options?.some((o) => o.value === value) ? '' : 'Please choose one of the answers shown.';
  }

  if (q.key === 'name') {
    const letters = [...value].filter((c) => /\p{L}/u.test(c)).length;
    if (letters < 2 || value.length > 40 || /\d/.test(value) || /[<>{}@]/.test(value)) {
      return 'Please use letters only, up to 40 characters, or leave this empty.';
    }
    if (looksLikeGibberish(value) && value.length > 4) return 'That does not look like a name. You can leave this empty if you prefer.';
    return '';
  }

  if (q.key === 'field') {
    if (value.length < 2 || value.length > 80) return 'Please name your field in a few words, for example "accounting" or "civil engineering".';
    if (looksLikeGibberish(value)) return 'That does not look like a field of work or study. Try a few plain words, such as "retail" or "biology".';
    return '';
  }

  if (q.key === 'project') {
    const w = words(value);
    const meaningful = new Set(w.filter((x) => x.length > 2 && !FILLER.has(x)));
    if (value.length > 600) return 'Please keep this under 600 characters. One or two sentences is plenty.';
    if (looksLikeGibberish(value)) return 'That does not look like a real task yet. Describe it in plain words, for example what you do, for whom and what you want to end up with.';
    if (value.length < 25 || w.length < 5 || meaningful.size < 3) {
      return 'Please add a little more detail: what the task is, who it is for, and what you would like to end up with.';
    }
    return '';
  }

  return '';
}
