---
title: Spot the made-up detail
order: 2
minutes: 15
skill: Checking answers
stage: worked
paths: [all]
recallQuestion: Yesterday you added a limit to a prompt. Which kind of limit made the biggest difference to the answer?
workedExample:
  situation: Arjun is a final year commerce student aiming for a data analyst role. He asked an AI tool for three facts about a well known report on AI adoption, with sources.
  input: "Give me three key numbers from a recent report on how many companies use AI, with the source for each."
  approach:
    - He copied each number into a new search, together with the name of the report.
    - For each source, he opened the link and looked for the number on the page itself.
    - He found two numbers on the pages. The third number did not appear anywhere in the report, and the page it pointed to was about something else.
    - He marked the third number as made up and asked the tool again, this time only for numbers it could quote word for word.
  output: A short note with two checked numbers, each with a working link, and one number removed with the reason written next to it.
  whyItWorks: AI tools can write numbers and titles that sound right but do not exist. Opening the source and finding the exact words is the only check that counts.
task:
  outcome: Three facts from an AI answer, each marked as checked, wrong or not found.
  steps:
    - Ask any AI tool for three facts with sources on a topic from your field. Use the prompt below.
    - For each fact, open the source and search the page for the number or quote.
    - Mark each fact as checked, wrong or not found. Write one line on what you saw.
    - If any fact failed, ask the tool again and check the new answer the same way.
  prompt: "Give me three facts about [topic in your field]. For each fact, give the exact sentence from the source and a link I can open. If you are not sure, say so."
successChecks:
  - You opened every source yourself instead of trusting the link text.
  - Each fact is marked checked, wrong or not found, with a reason.
  - You can explain in one sentence why a fact that sounds right still needs a check.
ifStuck: If a page is long, use your browser's find feature (Ctrl F, or Cmd F on a Mac) to search for the number.
connectedLesson: perplexity-sources-you-can-check
---
