---
title: Get exam-ready in 7 days
level: 1
order: 1
promise: Turn your notes into a 7-day revision plan, a study guide and daily self-tests.
outcome: A 7-day plan, a checked study guide and a list of weak topics that gets shorter each day.
minutes: 60
learnerTypes:
- school
- college-engineering
- college-other
tools:
- Gemini
- Gemini Notebook (was NotebookLM)
beforeYouStart:
- Know your exam date and which chapters it covers.
- Collect your notes and textbook chapters as files or clear photos.
- Sign in to gemini.google.com and notebooklm.google.com with your Google Account.
- Remove your name and anything personal from the files.
versions:
- learnerType: school
  title: School exam
  brief: One subject, three to five chapters, with a board or school exam at the end.
- learnerType: college-engineering
  title: Engineering semester exam
  brief: Problem-heavy subject with formulas and derivations, where practice problems matter most.
- learnerType: college-other
  title: College theory exam
  brief: Essay or short-answer exam where you need to explain ideas and give examples.
parts:
- title: Build your study notebook
  purpose: Put all your material in one place so answers come from your course.
  steps:
  - title: Create a notebook
    action: Create a new notebook named after the subject and exam.
    clickPath:
    - notebooklm.google.com
    - Create new notebook
    checkpoint: A new notebook is open.
  - title: Add your sources
    action: Upload your notes and chapters for this exam only.
    clickPath:
    - Upload a source
    checkpoint: Your sources appear in the Sources area.
  - title: Get a chapter map
    action: Ask for a map of the material so you can see what is big and what is small.
    prompt: Using only my sources, list every topic in these chapters. For each one, say if it is big, medium or small, and cite where it appears.
    checkpoint: You have a list of topics with rough sizes and citations.
- title: Make a realistic plan
  purpose: Spread the topics over 7 days around your real life.
  steps:
  - title: Rate each topic
    action: Next to each topic from the map, write how ready you feel, from 1 to 5.
    checkpoint: Every topic has a rating.
  - title: Ask Gemini for the plan
    action: Start a new chat in Gemini and paste this prompt with your topics and ratings.
    clickPath:
    - gemini.google.com
    - New chat
    prompt: 'Make a 7-day revision plan. Topics and how ready I feel (1 to 5): [paste]. My free time each day: [paste]. Put weak topics early, mix two different topics within each day, add a short self-test every day, and keep the last day light for review.'
    checkpoint: You get a 7-day table with the weakest topics first and a lighter last day.
  - title: Check it fits
    action: Check the plan against your real timetable and fix any clashes.
    checkpoint: The plan fits your week.
- title: Test yourself every day
  purpose: Use short quizzes to find and fix gaps.
  steps:
  - title: Make flashcards for the day
    action: In your notebook, open the Studio panel and make flashcards for that day's topics.
    clickPath:
    - Studio
    - Flashcards
    - Pencil icon
    checkpoint: You have a small deck for today.
  - title: Practise and record misses
    action: Go through the deck and write down every card you miss.
    checkpoint: You have today's list of missed topics.
  - title: Review before bed
    action: Spend ten minutes on the misses from today and yesterday.
    checkpoint: Your missed list is shorter than yesterday's.
tests:
- Every topic in the exam syllabus appears in your plan.
- Three facts from your study guide match your textbook when you check them.
- Your missed list gets shorter over the week.
proof:
- Your 7-day plan
- Your daily lists of missed topics
sources:
- title: Generate flashcards or quizzes in Gemini Notebook
  url: https://support.google.com/notebooklm/answer/16958963?hl=en
- title: Create a notebook in Gemini Notebook
  url: https://support.google.com/notebooklm/answer/16206563?hl=en
lastReviewed: '2026-09-26'
---
