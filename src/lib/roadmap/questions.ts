// The 10 onboarding questions. Wording lives here so it can be edited without touching the UI.
import { BACKGROUNDS, PATHS } from '../site';

export type AnswerKey =
  | 'name' | 'background' | 'goal' | 'field' | 'project'
  | 'aiExperience' | 'coding' | 'maths' | 'weeklyTime' | 'learningStyle';

export type Answers = Record<AnswerKey, string>;

export interface Option { value: string; label: string; hint?: string }

export interface Question {
  key: AnswerKey;
  title: string;
  helper: string;
  why: string;
  type: 'text' | 'textarea' | 'options';
  optional?: boolean;
  placeholder?: string;
  options?: Option[];
}

export const EMPTY_ANSWERS: Answers = {
  name: '', background: '', goal: '', field: '', project: '',
  aiExperience: '', coding: '', maths: '', weeklyTime: '', learningStyle: '',
};

export const QUESTIONS: Question[] = [
  {
    key: 'name',
    title: 'What should we call you?',
    helper: 'Your first name is enough. You can leave this empty.',
    why: 'We only use it to greet you on your roadmap. It stays on this device.',
    type: 'text',
    optional: true,
    placeholder: 'For example: Priya',
  },
  {
    key: 'background',
    title: 'Where are you starting from?',
    helper: 'Pick the one that fits you best today.',
    why: 'Your starting point decides how much we explain and which examples we use.',
    type: 'options',
    options: BACKGROUNDS.map((b) => ({ value: b.id, label: b.label })),
  },
  {
    key: 'goal',
    title: 'Which AI path are you aiming for?',
    helper: 'Not sure yet? That is fine. We will suggest one from your other answers.',
    why: 'Each path needs different skills, so this shapes your lessons and portfolio.',
    type: 'options',
    options: [
      ...PATHS.map((p) => ({ value: p.id, label: p.label })),
      { value: 'unsure', label: 'Not sure yet', hint: 'We will suggest a path for you' },
    ],
  },
  {
    key: 'field',
    title: 'What field do you work or study in now?',
    helper: 'For example: accounting, mechanical engineering, teaching, marketing or retail.',
    why: 'We use your field to suggest examples and to show how your experience carries into AI.',
    type: 'text',
    placeholder: 'For example: accounting',
  },
  {
    key: 'project',
    title: 'Describe one real task or project you would like AI to help with.',
    helper: 'Say what the task is, who it is for, and what you would like to end up with.',
    why: 'A real task makes every lesson more useful, and it can become your first portfolio piece.',
    type: 'textarea',
    placeholder: 'For example: I want to compare two AI tools for summarising customer feedback, so my team can pick one.',
  },
  {
    key: 'aiExperience',
    title: 'How much have you used AI tools so far?',
    helper: 'Be honest. There is no wrong answer.',
    why: 'This sets how quickly you move through the basics.',
    type: 'options',
    options: [
      { value: 'none', label: 'Not at all, or only once or twice' },
      { value: 'tried', label: 'I have tried a few tools' },
      { value: 'weekly', label: 'I use AI tools most weeks' },
      { value: 'building', label: 'I already build things with AI' },
    ],
  },
  {
    key: 'coding',
    title: 'How comfortable are you with code?',
    helper: 'You do not need to code to start.',
    why: 'Some paths need strong coding, others need none. This helps us suggest the right one.',
    type: 'options',
    options: [
      { value: 'none', label: 'I have never written code' },
      { value: 'read', label: 'I can read simple code' },
      { value: 'write', label: 'I can write small scripts' },
      { value: 'professional', label: 'I code for work or big projects' },
    ],
  },
  {
    key: 'maths',
    title: 'How comfortable are you with maths and data?',
    helper: 'Think about statistics, charts and working with numbers.',
    why: 'Machine learning and data roles need more maths than other paths.',
    type: 'options',
    options: [
      { value: 'basic', label: 'Basic, and I prefer to avoid it' },
      { value: 'school', label: 'I am fine with school-level maths' },
      { value: 'stats', label: 'I am comfortable with statistics' },
      { value: 'strong', label: 'Maths is a strength of mine' },
    ],
  },
  {
    key: 'weeklyTime',
    title: 'How much time can you give each week?',
    helper: 'Pick what you can keep up for a month, not your best week.',
    why: 'We size your four-week plan to fit your real time.',
    type: 'options',
    options: [
      { value: 'light', label: '1 to 2 hours' },
      { value: 'steady', label: '3 to 5 hours' },
      { value: 'focused', label: '6 to 10 hours' },
      { value: 'intensive', label: 'More than 10 hours' },
    ],
  },
  {
    key: 'learningStyle',
    title: 'How do you like to learn?',
    helper: 'Pick the one that sounds most like you.',
    why: 'We order your plan so it starts the way you learn best.',
    type: 'options',
    options: [
      { value: 'guided', label: 'Step by step, with clear instructions' },
      { value: 'project', label: 'By building something straight away' },
      { value: 'concepts', label: 'By understanding the ideas first' },
      { value: 'mixed', label: 'A mix of all three' },
    ],
  },
];
