---
title: Summarise one official docs page
order: 8
minutes: 20
skill: Research
stage: guided
paths: [ai-engineer, no-code-builder]
recallQuestion: Name one piece of AI feedback you chose to ignore and say why.
workedExample:
  situation: Ravi is a web developer who wants to build AI features. He needed to understand the limits of a free AI API before a job interview.
  input: "He gave an AI tool the official pricing and limits page, then asked for a summary."
  approach:
    - He asked for the summary as five bullet points, each with the exact line from the page it came from.
    - He checked each quoted line against the page.
    - One bullet said the limit was per day. The quoted line said per minute. He fixed it.
    - He added one question the page did not answer, to ask in the interview.
  output: Five checked bullet points and one smart question for the interviewer.
  whyItWorks: Asking for the exact line next to each point makes the summary easy to check. Official docs are the source employers expect you to use.
task:
  outcome: A five point summary of one official docs page from an AI tool you use, with every point checked.
  steps:
    - Open one official help or docs page for an AI tool, such as its limits, privacy or file upload page.
    - Paste the page or its link into an AI tool with the prompt below.
    - Check each quoted line against the real page.
    - Fix anything wrong and add one question the page does not answer.
  prompt: "Summarise this page in five bullet points. After each point, quote the exact line from the page it comes from. Page: [paste text or link]"
successChecks:
  - Every bullet has a quoted line that you found on the real page.
  - You fixed or removed any bullet the page does not support.
  - You wrote one open question the page does not answer.
ifStuck: If the tool cannot open the link, copy the main text of the page and paste it instead.
connectedLesson: gemini-notebook-learn-from-the-docs
---
