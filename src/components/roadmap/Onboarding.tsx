/** @jsxImportSource preact */
// Onboarding: intro, 10 questions, a short "preparing" screen and the personal roadmap.
// Answers are saved on this device only (key: jeyinsights-learnai-profile).
import { useEffect, useRef, useState } from 'preact/hooks';
import { QUESTIONS, EMPTY_ANSWERS, type Answers, type AnswerKey } from '../../lib/roadmap/questions';
import { validateAnswer } from '../../lib/roadmap/validate';
import { buildRoadmap, type Catalogue, type Roadmap } from '../../lib/roadmap/engine';
import { getProfile, saveProfile, clearProfile } from '../../lib/storage';
import { url } from '../../lib/site';

type Stage = 'loading' | 'intro' | 'quiz' | 'preparing' | 'result';

const PREP_STEPS = ['Reading your answers', 'Matching your career path', 'Choosing your lessons', 'Building your four weeks'];
const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Onboarding({ catalogue }: { catalogue: Catalogue }) {
  const [stage, setStage] = useState<Stage>('loading');
  const [answers, setAnswers] = useState<Answers>({ ...EMPTY_ANSWERS });
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [prep, setPrep] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resumable, setResumable] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const firstMount = useRef(true);

  useEffect(() => {
    const saved = getProfile<Answers>();
    if (saved) {
      setAnswers({ ...EMPTY_ANSWERS, ...saved.answers });
      setStep(Math.min(Math.max(saved.step, 0), QUESTIONS.length - 1));
      if (saved.complete) { setStage('result'); return; }
      setResumable(saved.step > 0 || Object.values(saved.answers).some(Boolean));
    }
    setStage('intro');
  }, []);

  // Move focus to the new heading whenever the screen or question changes (not on first load).
  useEffect(() => {
    if (stage === 'loading') return;
    if (firstMount.current) { firstMount.current = false; return; }
    headingRef.current?.focus();
  }, [stage, step]);

  useEffect(() => {
    if (stage !== 'preparing') return;
    const each = reducedMotion() ? 200 : 700;
    setPrep(0);
    const timers = PREP_STEPS.map((_, i) => setTimeout(() => setPrep(i + 1), each * (i + 1)));
    const done = setTimeout(() => setStage('result'), each * (PREP_STEPS.length + 1));
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [stage]);

  const q = QUESTIONS[step];
  const value = answers[q.key];

  const setValue = (key: AnswerKey, v: string) => {
    setAnswers((a) => ({ ...a, [key]: v }));
    if (error) setError('');
  };

  const persist = (next: Partial<{ step: number; complete: boolean; answers: Answers }>) => {
    const a = next.answers ?? answers;
    const complete = next.complete ?? false;
    // Save the chosen career path with a finished roadmap, so Today and Projects can use it.
    const path = complete ? buildRoadmap(a, catalogue).path.path : undefined;
    saveProfile<Answers>({ answers: a, step: next.step ?? step, complete, path });
    document.documentElement.dataset.laRoadmap = complete ? 'done' : 'none';
  };

  const next = (e?: Event) => {
    e?.preventDefault();
    const msg = validateAnswer(q, value);
    if (msg) { setError(msg); inputRef.current?.focus(); return; }
    setError('');
    if (step < QUESTIONS.length - 1) {
      persist({ step: step + 1 });
      setStep(step + 1);
    } else {
      persist({ step, complete: true });
      setStage('preparing');
    }
  };

  const back = () => {
    setError('');
    if (step === 0) { setStage('intro'); return; }
    persist({ step: step - 1 });
    setStep(step - 1);
  };

  const start = (fromStart: boolean) => {
    if (fromStart) { setAnswers({ ...EMPTY_ANSWERS }); setStep(0); }
    setStage('quiz');
  };

  const editAnswers = () => { setStep(0); persist({ step: 0, complete: false }); setStage('quiz'); };
  const reset = () => { clearProfile(); document.documentElement.dataset.laRoadmap = 'none'; setAnswers({ ...EMPTY_ANSWERS }); setStep(0); setConfirmReset(false); setResumable(false); setStage('intro'); };

  if (stage === 'loading') {
    return <p class="la-ob__loading">Loading your roadmap…</p>;
  }

  if (stage === 'intro') {
    return (
      <section class="la-card la-ob__intro" aria-labelledby="ob-intro">
        <h2 id="ob-intro" tabIndex={-1} ref={headingRef}>Ten questions, about five minutes</h2>
        <p>We will ask about your background, the AI path you are aiming for, a real task you care about, and how much time you have. Then you get:</p>
        <ul>
          <li>a suggested career path, or a plan for the one you chose</li>
          <li>a four-week plan with the right lessons and a workbook</li>
          <li>the first portfolio pieces to aim for</li>
        </ul>
        <p class="la-meta">Your answers are saved only in this browser. You can change or delete them at any time.</p>
        <div class="la-btn-row">
          {resumable ? (
            <>
              <button class="la-btn la-btn--primary" type="button" onClick={() => start(false)}>Continue where you left off</button>
              <button class="la-btn la-btn--secondary" type="button" onClick={() => start(true)}>Start again</button>
            </>
          ) : (
            <button class="la-btn la-btn--primary" type="button" onClick={() => start(true)}>Start the questions</button>
          )}
        </div>
      </section>
    );
  }

  if (stage === 'preparing') {
    return (
      <section class="la-card la-ob__prep" aria-labelledby="ob-prep">
        <h2 id="ob-prep" tabIndex={-1} ref={headingRef}>Building your roadmap</h2>
        <ol class="la-ob__prep-list" role="status" aria-live="polite">
          {PREP_STEPS.map((s, i) => (
            <li class={i < prep ? 'is-done' : i === prep ? 'is-active' : ''}>
              <span aria-hidden="true">{i < prep ? '✓' : '•'}</span> {s}{i < prep ? <span class="la-visually-hidden"> (done)</span> : null}
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (stage === 'result') {
    const r = buildRoadmap(answers, catalogue);
    return <Result r={r} headingRef={headingRef} onEdit={editAnswers} onReset={reset} confirmReset={confirmReset} setConfirmReset={setConfirmReset} />;
  }

  // Quiz
  const errId = `ob-err-${q.key}`;
  const helpId = `ob-help-${q.key}`;
  const pct = Math.round(((step + 1) / QUESTIONS.length) * 100);
  return (
    <form class="la-card la-ob__quiz" onSubmit={next} noValidate>
      <div class="la-ob__progress">
        <p class="la-meta">Question {step + 1} of {QUESTIONS.length}</p>
        <div class="la-ob__bar" role="progressbar" aria-label="Progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><i style={{ width: `${pct}%` }} /></div>
      </div>

      {q.type === 'options' ? (
        <fieldset class="la-ob__fieldset" aria-describedby={`${helpId}${error ? ` ${errId}` : ''}`}>
          <legend><h2 id={`ob-q-${q.key}`} tabIndex={-1} ref={headingRef}>{q.title}</h2></legend>
          <p class="la-ob__helper" id={helpId}>{q.helper}</p>
          <div class="la-ob__options">
            {q.options!.map((o, i) => (
              <label class={`la-ob__option ${value === o.value ? 'is-selected' : ''}`}>
                <input type="radio" name={q.key} value={o.value} checked={value === o.value}
                  ref={i === 0 ? (inputRef as any) : undefined}
                  onChange={() => setValue(q.key, o.value)} />
                <span><span class="la-ob__option-label">{o.label}</span>{o.hint && <span class="la-ob__option-hint">{o.hint}</span>}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <div class="la-ob__field">
          <h2 id={`ob-q-${q.key}`} tabIndex={-1} ref={headingRef}>
            <label for={`ob-in-${q.key}`}>{q.title}</label>
          </h2>
          <p class="la-ob__helper" id={helpId}>{q.helper}</p>
          {q.type === 'textarea' ? (
            <textarea id={`ob-in-${q.key}`} rows={4} maxLength={700} placeholder={q.placeholder} value={value}
              ref={inputRef as any} aria-invalid={error ? 'true' : undefined} aria-describedby={`${helpId}${error ? ` ${errId}` : ''}`}
              onInput={(e) => setValue(q.key, (e.target as HTMLTextAreaElement).value)} />
          ) : (
            <input id={`ob-in-${q.key}`} type="text" autocomplete={q.key === 'name' ? 'given-name' : 'off'} maxLength={80}
              placeholder={q.placeholder} value={value} ref={inputRef as any}
              aria-invalid={error ? 'true' : undefined} aria-describedby={`${helpId}${error ? ` ${errId}` : ''}`}
              onInput={(e) => setValue(q.key, (e.target as HTMLInputElement).value)} />
          )}
        </div>
      )}

      <p class="la-ob__error" id={errId} role="alert">{error ? <><span aria-hidden="true">! </span>{error}</> : null}</p>

      <details class="la-ob__why">
        <summary>Why we ask</summary>
        <p>{q.why}</p>
      </details>

      <div class="la-btn-row la-ob__nav">
        <button class="la-btn la-btn--secondary" type="button" onClick={back}>Back</button>
        <button class="la-btn la-btn--primary" type="submit">
          {step === QUESTIONS.length - 1 ? 'Build my roadmap' : q.optional && !value ? 'Skip' : 'Next'}
        </button>
      </div>
    </form>
  );
}

interface ResultProps {
  r: Roadmap;
  headingRef: { current: HTMLHeadingElement | null };
  onEdit: () => void;
  onReset: () => void;
  confirmReset: boolean;
  setConfirmReset: (v: boolean) => void;
}

const hours = (m: number) => (m % 60 ? (m / 60).toFixed(1) : String(m / 60));

function Result({ r, headingRef, onEdit, onReset, confirmReset, setConfirmReset }: ResultProps) {
  const lessonHref = (slug: string) => url(`learn/${slug}`);
  const workbookHref = (slug: string) => url(`workbooks/${slug}`);
  const hrefFor = (kind: string, slug?: string) => (!slug ? undefined : kind === 'workbook' ? workbookHref(slug) : lessonHref(slug));

  return (
    <div class="la-ob__result">
      <section class="la-card la-ob__summary" aria-labelledby="ob-result">
        <p class="la-eyebrow">{r.chosenBy === 'you' ? 'Your chosen path' : 'Suggested path'}</p>
        <h2 id="ob-result" tabIndex={-1} ref={headingRef}>{r.name ? `${r.name}, your path: ` : 'Your path: '}{r.path.title}</h2>
        <p>{r.path.summary}</p>
        <ul class="la-ob__reasons">{r.reasons.map((x) => <li>{x}</li>)}</ul>
        {r.alternative && (
          <p class="la-meta">Also worth a look: <a href={url(`careers/${r.alternative.path}`)}>{r.alternative.title}</a></p>
        )}
        <dl class="la-ob__facts">
          <div><dt>Start at</dt><dd>Level 1</dd></div>
          <div><dt>Aim for</dt><dd>Level {r.targetLevel}</dd></div>
          <div><dt>Your pace</dt><dd>{r.pace.label}</dd></div>
          <div><dt>Learning style</dt><dd>{r.style}</dd></div>
        </dl>
        <div class="la-btn-row">
          <a class="la-btn la-btn--primary" href={lessonHref(r.firstStep.slug)}>Start your first lesson</a>
          <a class="la-btn la-btn--secondary" href={url(`careers/${r.path.path}`)}>Read about this path</a>
        </div>
      </section>

      <section aria-labelledby="ob-weeks">
        <h2 id="ob-weeks">Your first four weeks</h2>
        <p>{r.pace.detail}</p>
        <ol class="la-ob__weeks">
          {r.weeks.map((w) => (
            <li class="la-card">
              <h3><span class="la-ob__week-num">Week {w.number}</span> {w.title}</h3>
              <ul>
                {w.items.map((i) => {
                  const href = hrefFor(i.kind, i.slug);
                  return <li class={`la-ob__item la-ob__item--${i.kind}`}>
                    <span class="la-ob__kind">{i.kind === 'lesson' ? 'Lesson' : i.kind === 'workbook' ? 'Workbook' : i.kind === 'practice' ? 'Practice' : 'Portfolio'}</span>
                    {href ? <a href={href}>{i.label}</a> : <span>{i.label}</span>}
                  </li>;
                })}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {r.gaps.length > 0 && (
        <section class="la-card la-ob__gaps" aria-labelledby="ob-gaps">
          <h2 id="ob-gaps">Worth knowing</h2>
          <ul>{r.gaps.map((g) => <li>{g}</li>)}</ul>
        </section>
      )}

      {r.project && (
        <section class="la-card la-ob__project" aria-labelledby="ob-project">
          <p class="la-eyebrow">Projects are now open</p>
          <h2 id="ob-project">Your first project</h2>
          <h3><a href={url(`projects/${r.project.slug}`)}>{r.project.title}</a></h3>
          <p>{r.project.promise}</p>
          <p class="la-meta">About {hours(r.project.minutes)} hours. Start it after your first two weeks, or earlier if you like to learn by building. <a href={url('projects')}>See all projects</a></p>
        </section>
      )}

      <section class="la-card la-ob__portfolio" aria-labelledby="ob-portfolio">
        <h2 id="ob-portfolio">Portfolio pieces to aim for</h2>
        <ol>{r.portfolioPieces.map((p) => <li>{p}</li>)}</ol>
        <p class="la-meta">{r.fieldNote}</p>
      </section>

      <section class="la-ob__manage" aria-labelledby="ob-manage">
        <h2 id="ob-manage">Change your answers</h2>
        <p>Your roadmap updates as soon as you change your answers. Everything stays on this device.</p>
        <div class="la-btn-row">
          <button class="la-btn la-btn--secondary" type="button" onClick={onEdit}>Change my answers</button>
          {confirmReset ? (
            <>
              <button class="la-btn la-btn--danger" type="button" onClick={onReset}>Yes, delete my answers</button>
              <button class="la-btn la-btn--secondary" type="button" onClick={() => setConfirmReset(false)}>Keep them</button>
            </>
          ) : (
            <button class="la-btn la-btn--secondary" type="button" onClick={() => setConfirmReset(true)}>Delete my answers</button>
          )}
        </div>
      </section>
    </div>
  );
}
