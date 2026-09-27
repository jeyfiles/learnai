---
title: Quiz yourself with flashcards in Gemini Notebook
level: 1
order: 10
tool: Gemini Notebook (was NotebookLM)
provider: Google
toolUrl: https://notebooklm.google.com
summary: Turn your sources into flashcards and quizzes, practise the ones you miss, and check any answer that looks wrong.
outcome: A deck of flashcards and a quiz from your own material, and a short list of topics you still miss.
minutes: 20
learnerTypes: [school, college-engineering, college-other, educator]
minAge: 13
ageNote: >-
  Gemini Notebook is for ages 13 and over (or the minimum age in your country) on a personal Google
  Account, and for any age on school accounts where the school allows it.
freeTier:
  status: free-with-limits
  note: Flashcards and quizzes work on the free plan, within daily limits.
whereToStart:
  - Go to notebooklm.google.com and open a notebook that has your sources, or create one.
  - Find the Studio panel. It lists the things you can make from your sources.
  - Choose Flashcards or Quizzes. To set the difficulty or focus first, click the pencil icon next to it.
learn:
  - title: Testing yourself beats rereading
    text: >-
      Trying to remember an answer, even when you get it wrong, helps you remember it later. Rereading
      your notes feels productive but sticks less.
  - title: Practise the misses
    text: >-
      Mark each card as got it or missed it. Then practise only the ones you missed. That is where your
      time is best spent.
  - title: Cards can be wrong
    text: >-
      The cards come from your sources, but a card can still mix up two ideas. If an answer looks odd,
      check it in your notes before you learn it.
builds:
  - id: exam-flashcards
    title: Make flashcards before a test
    forLearners: [school, college-engineering, college-other]
    scenario: >-
      You have a test in a few days on material you have already added to a notebook, such as a
      chapter or a set of lecture notes.
    outcome: A flashcard deck at the right level, practised until you know your weak cards.
    steps:
      - title: Open your notebook
        action: Open the notebook for this subject. Make sure only the right chapter's sources are ticked.
        clickPath: [notebooklm.google.com, Your notebook, Sources]
        checkpoint: Only the sources for this test are selected.
      - title: Set up the flashcards
        action: In the Studio panel, click the pencil icon next to Flashcards. Choose a difficulty and add a short focus note.
        clickPath: [Studio, Flashcards, Pencil icon]
        prompt: |
          Make flashcards for a [class or year] test on [topic].
          Focus on definitions, formulas and cause-and-effect.
          Keep each answer under 30 words.
        checkpoint: The flashcard settings show your difficulty and focus.
      - title: Practise once through
        action: Go through every card. Mark each one Got it or Missed it honestly.
        checkpoint: Every card is marked.
      - title: Practise only the misses
        action: Choose to practise only the cards you missed. Repeat until you get them right.
        checkpoint: You have gone through your missed cards at least twice.
      - title: Check any odd card
        action: If a card's answer looks wrong or confusing, find the matching part of your sources and check it.
        checkpoint: Any card you doubted has been checked.
    proof:
      - A list of the topics on your missed cards
  - id: lab-quiz
    title: Quiz yourself on a lab or practical
    forLearners: [college-engineering, school]
    scenario: >-
      You have a lab session or practical exam coming up. You have the lab manual or procedure sheet
      for it.
    outcome: A quiz on the procedure and safety steps, with your score and the steps you missed.
    steps:
      - title: Add the lab manual
        action: Create a new notebook and upload the lab procedure.
        clickPath: [notebooklm.google.com, Create new notebook, Upload a source]
        checkpoint: The lab procedure appears in Sources.
      - title: Make a focused quiz
        action: In the Studio panel, click the pencil icon next to Quizzes and describe what to test.
        clickPath: [Studio, Quizzes, Pencil icon]
        prompt: |
          Quiz me on this lab procedure: the order of steps, the safety precautions,
          what each reading or measurement is for, and common mistakes.
          Medium difficulty.
        checkpoint: The quiz covers steps, safety and readings.
      - title: Take the quiz
        action: Answer every question. Use the explain option on any you get wrong.
        checkpoint: You have finished the quiz and read the explanations for wrong answers.
      - title: Write your safety list
        action: Write the safety steps from memory, then compare with the manual.
        checkpoint: Your safety list matches the manual.
    proof:
      - Your quiz score and the steps you missed
      - Your safety list
  - id: class-review
    title: Create a review quiz for your class
    forLearners: [educator]
    scenario: >-
      You want a quick review quiz at the end of a unit, based on your own unit materials.
    outcome: A checked quiz you can adapt for class.
    steps:
      - title: Add your unit materials
        action: Create a notebook with your unit notes and readings.
        clickPath: [notebooklm.google.com, Create new notebook, Upload a source]
        checkpoint: Your unit materials are in Sources.
      - title: Generate a quiz
        action: In the Studio panel, set up a quiz for your class level and generate it.
        clickPath: [Studio, Quizzes, Pencil icon]
        checkpoint: A quiz appears in the Studio panel.
      - title: Check every question
        action: Take the quiz yourself and check each answer against your materials. Note any to fix before class.
        checkpoint: You have checked every question and answer.
    proof:
      - Your checked quiz and any fixes
sources:
  - title: Generate flashcards or quizzes in Gemini Notebook
    url: https://support.google.com/notebooklm/answer/16958963?hl=en
  - title: Create a notebook in Gemini Notebook
    url: https://support.google.com/notebooklm/answer/16206563?hl=en
lastReviewed: 2026-09-26
reviewNotes:
  - NotebookLM was renamed Gemini Notebook on 16 July 2026. Some screens may still show the old name.
---

Short, regular practice works better than one long session. Ten minutes of flashcards a day for a week beats two hours the night before.
