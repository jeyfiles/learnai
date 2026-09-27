---
title: Learn from official docs and papers in Gemini Notebook
level: 1
order: 9
tool: Gemini Notebook (was NotebookLM)
provider: Google
toolUrl: https://notebooklm.google.com
summary: Load official documentation or a paper into a notebook, ask questions answered only from those sources, and quiz yourself with flashcards.
outcome: A study notebook built from trusted sources, a cited guide, and a flashcard deck you have practised.
minutes: 30
paths: [all]
access: You need a Google Account.
freeTier:
  status: free-with-limits
  note: Free accounts can make many notebooks, with limits on sources per notebook and chat questions per day.
whereToStart:
  - Go to notebooklm.google.com. The tool was renamed Gemini Notebook in July 2026, and old links still work.
  - Sign in with your Google Account and click Create new notebook.
  - In the pop-up, choose Upload a source. You will see three areas, Sources, Chat and Studio.
learn:
  - title: Answers come from your sources
    text: >-
      Gemini Notebook bases its answers on the files and links you add. Each answer shows citation numbers
      that jump to the exact passage. This is a simple version of an idea called grounding.
  - title: Official docs are the best teacher for tools
    text: >-
      Blog posts go out of date fast. The official documentation for an AI tool or model is usually the most
      accurate source. Learning to read docs is a core skill on every AI path.
  - title: Test what it does with missing answers
    text: >-
      Ask something your sources do not cover. A good answer says the sources do not cover it. This tells you
      how far to trust it.
builds:
  - id: docs-notebook
    title: Build a notebook from official documentation
    forPaths: [all]
    scenario: >-
      You want to learn a tool or platform properly, such as an AI company's developer docs, a no-code
      automation tool or a data library. Its official docs are long and scattered.
    outcome: A notebook with the key doc pages, and a cited getting-started guide.
    steps:
      - title: Collect the right pages
        action: Pick 3 to 6 official doc pages, such as the overview, quickstart and key concepts. Copy their links or save them as PDFs.
        checkpoint: You have 3 to 6 official pages, not blogs about them.
      - title: Create a notebook and add them
        action: Create a new notebook named after the tool and add the pages as sources.
        clickPath: [notebooklm.google.com, Create new notebook, Upload a source]
        checkpoint: Your sources appear in the Sources area.
      - title: Ask for a getting-started guide
        action: Paste this prompt into the chat box.
        prompt: |
          Using only these sources, write a getting-started guide for a beginner:
          1. What this tool is for, in two sentences.
          2. The 6 key concepts, one or two sentences each.
          3. The first 5 steps to try it.
          4. Three common mistakes the docs warn about.
          Cite the source for each point.
        checkpoint: The guide has citation numbers you can click.
      - title: Check three citations
        action: Click three citation numbers and read the passage each one points to.
        checkpoint: Each citation supports its point.
      - title: Test the edge
        action: Ask something the docs do not cover, such as the price next year.
        checkpoint: The answer says the sources do not cover it, instead of guessing.
    proof:
      - Your cited getting-started guide
      - A note on how it handled a question the docs did not answer
  - id: paper-flashcards
    title: Turn a paper or course chapter into flashcards
    forPaths: [all]
    scenario: >-
      You are reading an important AI paper or a chapter of a free course, and want the key ideas to stick.
    outcome: A flashcard deck practised until you know which cards you keep missing.
    steps:
      - title: Add the paper or chapter
        action: Create a new notebook and upload the paper or chapter.
        clickPath: [notebooklm.google.com, Create new notebook, Upload a source]
        checkpoint: The source appears in Sources.
      - title: Set up the flashcards
        action: In the Studio panel, click the pencil icon next to Flashcards. Choose a difficulty and add a short focus note.
        clickPath: [Studio, Flashcards, Pencil icon]
        prompt: |
          Make flashcards on the key ideas, terms and results in this source.
          Focus on definitions, how the method works, and what was shown.
          Keep each answer under 30 words.
        checkpoint: The flashcard settings show your difficulty and focus.
      - title: Practise once through
        action: Go through every card and mark each one Got it or Missed it honestly.
        checkpoint: Every card is marked.
      - title: Practise only the misses
        action: Practise only the cards you missed until you get them right.
        checkpoint: You have gone through your missed cards at least twice.
      - title: Check any odd card
        action: If a card looks wrong or confusing, find the matching passage in the source and check it.
        checkpoint: Any card you doubted has been checked.
    proof:
      - The list of ideas on your missed cards, now learned
sources:
  - title: Create a notebook in Gemini Notebook
    url: https://support.google.com/notebooklm/answer/16206563?hl=en
  - title: Generate flashcards or quizzes in Gemini Notebook
    url: https://support.google.com/notebooklm/answer/16958963?hl=en
  - title: NotebookLM is now Gemini Notebook
    url: https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/
lastReviewed: 2026-09-26
reviewNotes:
  - NotebookLM was renamed Gemini Notebook on 16 July 2026. Some screens and help pages may still show the old name.
---

Only add material you are allowed to share. Public docs and papers are fine. Confidential work documents are not.
