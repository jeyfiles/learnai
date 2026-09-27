---
title: Ask for a table and check two cells
order: 5
minutes: 15
skill: Checking answers
stage: guided
paths: [ml-data, ai-professional]
recallQuestion: What is the one test that shows you truly understand a new term?
workedExample:
  situation: Divya is a lab technician learning data skills. She asked for a table comparing three free chart tools.
  input: "Make a table comparing three free tools for making charts from a spreadsheet. Columns are tool, free plan limit, file types it accepts and link to the pricing page."
  approach:
    - She picked two cells at random, one limit and one file type.
    - She opened the pricing page for each and found the real value.
    - One cell was right. The other listed a file type the tool did not accept.
    - She corrected the table and added a note saying which cells she had checked.
  output: A table with two cells marked as checked and one fixed.
  whyItWorks: Tables look precise, which makes errors easy to miss. Checking a sample tells you how much you can trust the rest.
task:
  outcome: A table from an AI tool on a topic in your field, with two cells checked against a real source.
  steps:
    - Ask for a small table on a topic you know something about. Name the columns yourself.
    - Choose two cells before you read the whole table, so you do not only check the ones that look odd.
    - Find the real value for each in an official source.
    - Mark each cell as correct or fixed, and write the source next to it.
  prompt: "Make a table comparing [3 things] in [your field]. Columns: [column 1], [column 2], [column 3], source link. Keep each cell short."
successChecks:
  - You chose the two cells before reading the full table.
  - Each checked cell has a source you opened yourself.
  - You wrote one line on how far you would trust the rest of the table.
ifStuck: Pick cells with a number or a date in them. They are the easiest to check and the most often wrong.
connectedLesson: copilot-summarise-and-check
---
