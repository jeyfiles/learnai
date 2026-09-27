---
title: Sort AI feedback into accept, change or ignore
order: 7
minutes: 15
skill: Working with feedback
stage: guided
paths: [all]
recallQuestion: Write one scoring rule you made last time. Could someone else check it as yes or no?
workedExample:
  situation: Ines wrote a short cover letter for an AI trainer role and asked an AI tool for feedback, not a rewrite.
  input: "Give me five points of feedback on this cover letter. Do not rewrite it."
  approach:
    - She copied the five points into three columns. Accept, change, ignore.
    - She accepted two points that she agreed with at once.
    - She changed one point to fit her own voice, because the suggested wording sounded stiff.
    - She ignored two points and wrote why, because they asked her to add skills she does not have.
  output: A letter that is still hers, with three improvements and a short note on what she chose not to do.
  whyItWorks: AI feedback is a list of ideas, not a set of orders. Deciding on each point keeps your own voice and stops the tool from adding claims that are not true.
task:
  outcome: One piece of your own writing, with AI feedback sorted into accept, change or ignore.
  steps:
    - Pick something short you wrote, such as a summary, a bio or a post.
    - Ask for feedback without a rewrite, using the prompt below.
    - Put every point into accept, change or ignore, with one line on why.
    - Make the changes yourself.
  prompt: "Give me five specific points of feedback on this text. Number them. Do not rewrite it. Text: [paste your text]"
successChecks:
  - Every point is in one of the three piles, with a reason.
  - You made the edits yourself, in your own words.
  - Nothing in the final text claims something that is not true about you.
ifStuck: If you cannot decide on a point, ask the tool "why does this matter to the reader?" and judge the answer.
connectedLesson: claude-feedback-without-a-rewrite
---
