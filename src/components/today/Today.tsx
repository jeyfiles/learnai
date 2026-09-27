/** @jsxImportSource preact */
// Daily practice. On the home page it picks today's practice; on a practice page it shows that one practice.
// Progress is saved on this device only (key: jeyinsights-learnai-daily).
import { useEffect, useRef, useState } from 'preact/hooks';
import {
  pickPractice, dateKey, streak, bestStreak, weekRow, markDone, undoDone, cleanDaily, STAGE_LABEL, EMPTY_DAILY,
  type DailyState,
} from '../../lib/today/picker';
import type { PracticeData } from '../../lib/today/data';
import { readJSON, writeJSON, getProfile } from '../../lib/storage';

interface Props {
  practices: PracticeData[];
  mode: 'today' | 'single';
  helpHref: string;
  allHref: string;
  roadmapHref: string;
}

const practicePath = (id: string) => `/learnai/practice/${id}/`;
const PATH_IDS = ['ai-professional', 'no-code-builder', 'ai-engineer', 'ml-data', 'ai-product'];

function niceDate(key: string, withDay = true) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    ...(withDay ? { weekday: 'long' } : {}), day: 'numeric', month: 'long', timeZone: 'UTC',
  });
}
const weekdayLetter = (key: string) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' });
};

function CopyPrompt({ text }: { text: string }) {
  const [msg, setMsg] = useState('');
  const copy = async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.append(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      ta.remove();
    }
    setMsg(ok ? 'Copied' : 'Select and copy');
    setTimeout(() => setMsg(''), 2000);
  };
  return (
    <figure class="la-td-prompt">
      <figcaption class="la-td-prompt__label">Prompt to copy</figcaption>
      <pre class="la-td-prompt__text"><code>{text}</code></pre>
      <button class="la-td-prompt__copy la-no-print" type="button" onClick={copy}>
        {msg || 'Copy'}<span class="la-visually-hidden"> prompt</span>
      </button>
      <span class="la-visually-hidden" role="status">{msg === 'Copied' ? 'Prompt copied' : msg ? 'Copy did not work. Select the text and copy it.' : ''}</span>
    </figure>
  );
}

function Example({ p }: { p: PracticeData }) {
  const e = p.workedExample;
  return (
    <div class="la-td-example">
      <p>{e.situation}</p>
      <p class="la-td-label">What they started with</p>
      <blockquote class="la-td-quote">{e.input}</blockquote>
      <p class="la-td-label">What they did</p>
      <ol>{e.approach.map((a) => <li key={a}>{a}</li>)}</ol>
      <p class="la-td-label">What they got</p>
      <p>{e.output}</p>
      <p class="la-td-why"><strong>Why it works.</strong> {e.whyItWorks}</p>
    </div>
  );
}

export default function Today({ practices, mode, helpHref, allHref, roadmapHref }: Props) {
  const [state, setState] = useState<DailyState | null>(null);
  const [today, setToday] = useState('');
  const [path, setPath] = useState<string | undefined>();
  const [checks, setChecks] = useState<boolean[]>([]);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const t = dateKey(new Date());
    const s = cleanDaily(readJSON('daily', EMPTY_DAILY));
    // Prefer the path the finished roadmap chose; fall back to the goal answer.
    const profile = getProfile<{ goal?: string }>();
    const goal = (profile?.complete && profile.path) || profile?.answers?.goal;
    const pth = goal && PATH_IDS.includes(goal) ? goal : undefined;
    setToday(t); setPath(pth);
    if (mode === 'today') {
      const pick = pickPractice({ today: t, practices, state: s, path: pth });
      if (pick && (s.selection?.date !== t || s.selection.id !== pick.id)) {
        s.selection = { date: t, id: pick.id };
        writeJSON('daily', s);
      }
    }
    setState(s);
  }, []);

  const practice = mode === 'single'
    ? practices[0]
    : state ? pickPractice({ today, practices, state, path }) : undefined;

  useEffect(() => { if (practice) setChecks(practice.successChecks.map(() => false)); }, [practice?.id]);

  if (!practice) {
    return (
      <div class="la-td la-td--loading" aria-busy="true">
        <p class="la-meta">Loading today's practice.</p>
      </div>
    );
  }

  const st = state ?? EMPTY_DAILY;
  const doneToday = !!today && st.done[practice.id] === today;
  const doneBefore = st.done[practice.id] && !doneToday ? st.done[practice.id] : '';
  const days = st.days;
  const current = today ? streak(days, today) : 0;
  const best = bestStreak(days);
  const row = today ? weekRow(days, today) : [];
  const stage = practice.stage;
  const H = mode === 'today' ? 'h4' : 'h2';

  const save = (next: DailyState) => { setState(next); writeJSON('daily', next); };

  const onDraft = (text: string) => {
    const next = { ...st, drafts: { ...st.drafts, [practice.id]: text.slice(0, 2000) } };
    setState(next);
    setSaved('');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => { setSaved(writeJSON('daily', next) ? 'Saved on this device' : 'Could not save. Your browser may be blocking storage.'); }, 500);
  };

  const finish = () => {
    if (checks.some((c) => !c)) {
      setError('Tick every check first. If one does not pass yet, improve your result and try again.');
      return;
    }
    setError('');
    save(markDone(st, practice.id, today));
    requestAnimationFrame(() => statusRef.current?.focus());
  };
  const undo = () => {
    save(undoDone(st, practice.id, today));
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const streakWords = (n: number) => `${n} ${n === 1 ? 'day' : 'days'}`;

  return (
    <div class="la-td" data-practice={practice.id}>
      <div class="la-td-top">
        <div>
          {mode === 'today' && <p class="la-eyebrow">{today ? niceDate(today) : 'Today'}</p>}
          {mode === 'today' && <h3 class="la-td-title">{practice.title}</h3>}
          <p class="la-td-meta">
            <span class="la-chip">{practice.minutes} minutes</span>
            <span class="la-chip">{practice.skill}</span>
            <span class="la-chip">{STAGE_LABEL[stage]}</span>
          </p>
          {mode === 'today' && path && (
            <p class="la-meta">Chosen with your roadmap answers in mind. <a href={roadmapHref}>See my roadmap</a></p>
          )}
        </div>
        {mode === 'today' && (
          <div class="la-td-streak" aria-labelledby="la-td-streak-title">
            <p id="la-td-streak-title" class="la-td-streak__num"><strong>{streakWords(current)}</strong> in a row</p>
            <ol class="la-td-week" aria-label="Your last seven days">
              {row.map((d) => (
                <li key={d.date} class={`la-td-day${d.done ? ' is-done' : ''}${d.isToday ? ' is-today' : ''}`}>
                  <span aria-hidden="true">{weekdayLetter(d.date)}</span>
                  <span class="la-visually-hidden">{niceDate(d.date)}{d.isToday ? ' (today)' : ''}: {d.done ? 'practised' : 'no practice'}</span>
                </li>
              ))}
            </ol>
            <p class="la-meta">Best run: {streakWords(best)}</p>
          </div>
        )}
      </div>

      <section class="la-td-block" aria-labelledby={`la-td-warm-${practice.id}`}>
        <H id={`la-td-warm-${practice.id}`}>Warm up</H>
        <p>{practice.recallQuestion}</p>
        <p class="la-meta">Take one minute. Answer in your head or on paper, then carry on.</p>
      </section>

      <section class="la-td-block" aria-labelledby={`la-td-ex-${practice.id}`}>
        <H id={`la-td-ex-${practice.id}`}>Worked example</H>
        {stage === 'worked'
          ? <Example p={practice} />
          : (
            <details class="la-td-details">
              <summary>See how someone else did a similar task</summary>
              <Example p={practice} />
            </details>
          )}
      </section>

      <section class="la-td-block" aria-labelledby={`la-td-task-${practice.id}`}>
        <H id={`la-td-task-${practice.id}`}>Your task</H>
        <p><strong>You will make:</strong> {practice.task.outcome}</p>
        {stage === 'independent'
          ? (
            <details class="la-td-details">
              <summary>Need the steps and a starting prompt?</summary>
              <ol>{practice.task.steps.map((s) => <li key={s}>{s}</li>)}</ol>
              <CopyPrompt text={practice.task.prompt} />
            </details>
          )
          : (
            <>
              <ol>{practice.task.steps.map((s) => <li key={s}>{s}</li>)}</ol>
              <CopyPrompt text={practice.task.prompt} />
            </>
          )}
      </section>

      <section class="la-td-block" aria-labelledby={`la-td-check-${practice.id}`}>
        <H id={`la-td-check-${practice.id}`}>Check your result</H>
        <fieldset class="la-td-checks">
          <legend class="la-visually-hidden">Tick each check your result passes</legend>
          {practice.successChecks.map((c, i) => (
            <label key={c} class="la-td-check">
              <input
                type="checkbox"
                checked={doneToday || !!checks[i]}
                disabled={doneToday}
                onChange={(e) => { const next = [...checks]; next[i] = (e.target as HTMLInputElement).checked; setChecks(next); if (error) setError(''); }}
              />
              <span>{c}</span>
            </label>
          ))}
        </fieldset>
        <label class="la-td-notes-label" for={`la-td-notes-${practice.id}`}>Your notes (optional)</label>
        <p class="la-meta" id={`la-td-notes-help-${practice.id}`}>What did you learn? What would you do differently? Notes stay on this device.</p>
        <textarea
          id={`la-td-notes-${practice.id}`}
          class="la-td-notes"
          rows={4}
          maxLength={2000}
          aria-describedby={`la-td-notes-help-${practice.id}`}
          value={st.drafts[practice.id] ?? ''}
          onInput={(e) => onDraft((e.target as HTMLTextAreaElement).value)}
        />
        <p class="la-meta" role="status">{saved}</p>
      </section>

      <div class="la-td-finish">
        {error && <p class="la-td-error" role="alert">{error}</p>}
        <div ref={statusRef} tabIndex={-1} class="la-td-status" role="status">
          {doneToday && (
            <p><strong>Done for today.</strong> {mode === 'today' ? `Your run is now ${streakWords(current)}. Come back tomorrow for a new practice.` : 'It counts towards your daily run.'}</p>
          )}
          {!doneToday && doneBefore && <p>You finished this on {niceDate(doneBefore, false)}. Doing it again counts for today.</p>}
        </div>
        {doneToday
          ? <button type="button" class="la-btn la-btn--secondary" onClick={undo}>Undo</button>
          : <button type="button" class="la-btn la-btn--primary" onClick={finish}>{mode === 'today' ? "Mark today's practice done" : 'Mark this practice done'}</button>}
      </div>

      <section class="la-td-block la-td-help" aria-labelledby={`la-td-stuck-${practice.id}`}>
        <H id={`la-td-stuck-${practice.id}`}>If you get stuck</H>
        <p>{practice.ifStuck}</p>
        <ul class="la-td-links">
          {practice.lesson && <li>Go deeper: <a href={practice.lesson.href}>{practice.lesson.title}</a></li>}
          <li>
            <button type="button" class="la-td-linkbtn" data-la-help-open="hint" data-la-help-title={practice.title} data-la-help-url={practicePath(practice.id)} aria-haspopup="dialog">Get a hint for this practice</button>
          </li>
          <li><a href={helpHref}>Help guides for common problems</a></li>
          <li><a href={allHref}>See all daily practices</a></li>
        </ul>
      </section>
    </div>
  );
}
