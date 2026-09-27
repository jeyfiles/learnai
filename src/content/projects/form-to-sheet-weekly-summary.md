---
title: Collect feedback with a form and summarise it with AI
level: 4
path: no-code-builder
order: 2
promise: Set up a simple feedback form, collect answers in a spreadsheet and write a weekly summary with AI that you check line by line.
outcome: A live form, a response sheet, a reusable summary prompt and one checked weekly summary, with a note on how the process runs.
scenario: A club, a class or a small team wants regular feedback. People fill in a form, but nobody has time to read every answer. You want a weekly summary that is quick to make and that you can trust.
tools: [Google Forms, Google Sheets, Gemini, ChatGPT]
minutes: 150
beforeYouStart:
  - Sign in to a Google account.
  - Decide who the feedback is from and what you want to learn. Keep it to five questions or fewer.
  - Tell people how their answers will be used, and that AI will help summarise them.
steps:
  - title: Write the questions
    action: Write up to five questions. Use one rating question, one or two choice questions and one or two open text questions. Do not ask for names unless you need them.
    checkpoint: Every question has a clear reason for being there.
  - title: Build the form
    action: Create the form in Google Forms and link it to a new Google Sheet from the Responses tab.
    checkpoint: A test answer you submit appears as a new row in the sheet.
  - title: Collect answers
    action: Share the form and collect at least ten answers. If you are practising, ask friends or write realistic test answers yourself and label them as test data.
    checkpoint: The sheet has at least ten rows.
  - title: Write the summary prompt
    action: Write a prompt that asks for the main themes, how many answers mention each one, and one short quote for each, taken word for word.
    prompt: "Below are feedback answers, one per line. List the three to five main themes. For each theme, give how many answers mention it and one short quote copied exactly. Then list anything that only one person said but that seems important. Do not add anything that is not in the answers. [paste the open text column]"
    checkpoint: The prompt asks for counts and exact quotes, which you can check.
  - title: Run it and check it
    action: Paste the open text answers into the chatbot. Check every count and search the sheet for every quote.
    checkpoint: Every quote exists in the sheet and every count is correct, or you have fixed it.
  - title: Add the numbers yourself
    action: Work out the average rating and the choice counts in the sheet itself, not with the chatbot.
    checkpoint: Your numbers come from sheet formulas you can show.
  - title: Write down the routine
    action: Write the steps someone would follow each week, with the prompt and the checks.
    checkpoint: Someone else could make next week's summary from your note.
tests:
  - name: Quotes are real
    expected: Every quote in the summary appears word for word in the sheet.
  - name: Counts match
    expected: Each theme count matches a manual count of the answers.
  - name: Numbers from the sheet
    expected: Ratings and choice counts are worked out in the sheet, not by the chatbot.
safety:
  - Do not collect names, emails or anything private unless you truly need it.
  - Tell people that AI helps summarise their answers.
  - If you paste answers into a chatbot, remove anything that could identify a person first.
proof:
  - A screenshot of the form and the sheet (with no personal data)
  - The prompt and one checked summary
  - Your weekly routine note
sources: []
lastReviewed: 2026-09-26
---
