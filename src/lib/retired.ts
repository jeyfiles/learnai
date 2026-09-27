// Content files that were replaced. The build and the tests ignore them, so stale copies on disk cannot break anything.
/**
 * Files replaced during the audience change of 26 Sep 2026.
 * They are ignored here, so the site builds even if they are still on disk. They can be deleted.
 */
export const RETIRED: Record<string, string[]> = {
  lessons: [
    'level-1/use-ai-honestly-at-school.md',
    'level-1/chatgpt-study-mode-practice-questions.md',
    'level-1/gemini-plan-your-study-week.md',
    'level-1/gemini-notebook-study-guide.md',
    'level-1/gemini-notebook-quiz-yourself.md',
  ],
  workbooks: ['exam-ready-in-7-days.md', 'internship-application-kit.md', 'plan-a-lesson-with-ai.md'],
  help: ['is-ai-allowed-for-homework.md', 'teacher-thinks-ai-wrote-it.md', 'under-18-privacy.md'],
  glossary: ['academic-integrity.md'],
};
