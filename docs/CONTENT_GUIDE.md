# Content guide

All Learn AI content lives in `src/content/`, one file per item. You can add or edit content without touching any code.

## How to add something

1. Copy the matching file from `templates/` into the right folder (see the table).
2. Rename it. The file name becomes the web address, so use lowercase words joined by hyphens, for example `chatgpt-summarise-a-chapter.md`.
3. Fill in every field. Remove the `#` comment lines if you like.
4. Run `npm run build`. If a field is missing or wrong, the build stops and tells you which file and which field.
5. Run `npm run dev` and look at the page.

| Content | Folder | Template | Web address |
|---|---|---|---|
| Lesson | `src/content/lessons/level-N/` | `templates/lesson.md` | `/learnai/learn/<file-name>/` |
| Workbook | `src/content/workbooks/` | `templates/workbook.md` | `/learnai/workbooks/<file-name>/` |
| Project | `src/content/projects/` | `templates/project.md` | `/learnai/projects/<file-name>/` (from Phase 6) |
| Daily practice | `src/content/practices/` | `templates/practice.md` | Home page (Today) and `/practice/<file-name>/` |
| Glossary term | `src/content/glossary/` | `templates/glossary.md` | `/learnai/glossary/#<file-name>` |
| Help guide | `src/content/help/` | `templates/help.md` | `/learnai/help/#<file-name>` |
| Level overview | `src/content/levels/` | `templates/level.md` | `/learnai/levels/<file-name>/` |
| Career path | `src/content/careers/` | `templates/career.md` | `/learnai/careers/<file-name>/` |

To hide a lesson, workbook or project while you work on it, add `draft: true`.

## The rules the build checks

The schema is in `src/content.config.ts`. The most important rules:

- **Lessons** need 2 or 3 builds. Each build needs 3 to 10 steps. Each step needs a `title`, an `action` and a `checkpoint`. `clickPath` and `prompt` are optional.
- **Every lesson** has an `access` line: what you need to sign up, and any age or country limits the tool sets.
- **Every lesson** needs at least one official source, a `lastReviewed` date and `reviewNotes` for anything you could not confirm.
- **Career paths** must be one of: `all`, `ai-professional`, `no-code-builder`, `ai-engineer`, `ml-data`, `ai-product`. Lessons and workbooks use `paths`; builds use `forPaths`; projects use exactly one `path`.
- **Workbooks** need at least 2 versions, 2 parts and 2 tests.
- **Projects** need exactly one career path, at least 6 steps and 2 tests.
- **Career paths** need at least 4 skills, 3 day-to-day tasks, 2 job titles and 2 first portfolio pieces.

## Writing rules

The build also runs a writing check on every page. It fails if it finds:

- an em dash or en dash (use a full stop, comma, colon or brackets instead, and write ranges as "10 to 20"),
- a contraction such as "don't", "it's" or "you're" (write "do not", "it is", "you are"; possessives like "Jey's" are fine),
- a banned phrase such as "unlock", "journey", "seamless", "crucial" or "dive in" (full list in `scripts/check-copy.mjs`).

Also keep to these, which a script cannot check:

- Write for someone building a career in AI, from any background. Short sentences. Plain words.
- Use real career situations: an AI job posting, a model card, a portfolio write-up, a task from the learner's current field.
- Every build should end with proof the learner can put in a portfolio.
- Never invent facts about a tool. Check the vendor's help page, and put anything uncertain in `reviewNotes`.
- Never write personal stories in Jey's name unless Jey wrote them.

## Daily practices

- The home page picks one practice per day for each learner. The pick stays the same all day.
- The first 4 finished practices come from `stage: worked` in `order`. After 4 finished, `guided`; after 8, `independent`. Keep at least 4 practices in each stage.
- In later stages, a practice tagged with the learner's career path (from the roadmap answers) is picked first. Use `paths: [all]` unless the skill really belongs to certain paths.
- `recallQuestion` should look back at the practice before it (by `order`), so learners recall yesterday's idea.
- How much help shows depends on the stage: `worked` shows the example open; `guided` folds the example away; `independent` also folds the steps and prompt away as hints.
- `connectedLesson` must be the file name of a real lesson, or the build stops.
- Do not use real people's names in worked examples. Use first names only and invented situations.

## Projects

- One file per project in `src/content/projects/`, from `templates/project.md`. `path` is exactly one career path; `order` sets the order within that path.
- The roadmap suggests the project with the lowest `level`, then the lowest `order`, for the learner's path. Keep one easy project first for each path.
- Projects open after the learner builds a roadmap. The situation and outcome are always visible, so write them to show what the learner will get.
- Each test needs a `name` and what a pass looks like (`expected`). Each project needs at least one safety or honesty rule.
- Name official sources when a project depends on a tool's rules, limits or setup.

## Search and the help drawer

- Every lesson, workbook, practice, career path, level, glossary word and help guide is added to search automatically when the site builds. There is nothing to register.
- What is searched: titles count most, then the one-line summary (`summary`, `promise`, `definition`, `shortAnswer`), then the rest.
- The help drawer quotes content word for word: a glossary `definition` and `whyItMatters`, a help guide's `shortAnswer` and first `steps`, a practice's worked example. Write these so they make sense on their own.
- Use the words learners would type in titles and help questions, for example "made up a source" rather than "fabricated citation".

## Keeping lessons up to date

Tool screens change often. Every few months:

1. Open the tool and follow the lesson's `whereToStart` and `clickPath` steps.
2. Fix anything that changed.
3. Update `lastReviewed` to today's date.
4. Update `docs/TOOL_FACTS.md`.

## YAML tips

- Text with a colon (`:`) must be in quotes: `title: "APA Style: How to cite ChatGPT"`.
- For long text, use `>-` and indent the next lines. For prompts, use `|` so line breaks are kept.
- Lists use `-` at the start of each line, or square brackets: `[ai-engineer, ai-product]`.

## Retired files

When a content file is replaced, add its path to the `RETIRED` list in `src/content.config.ts`. The build then ignores it, so a stale copy on disk cannot break anything. You can delete retired files at any time.
