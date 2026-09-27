---
title: Make a study guide from your own sources in Gemini Notebook
level: 1
order: 9
tool: Gemini Notebook (was NotebookLM)
provider: Google
toolUrl: https://notebooklm.google.com
summary: Upload your chapter notes or readings, ask questions that are answered only from them, and build a study guide with citations.
outcome: A notebook of your sources and a study guide where every point links back to your material.
minutes: 25
learnerTypes: [school, college-engineering, college-other, educator]
minAge: 13
ageNote: >-
  Gemini Notebook is for ages 13 and over (or the minimum age in your country) on a personal Google
  Account. School accounts through Google Workspace for Education can use it at any age if the school
  allows it.
freeTier:
  status: free-with-limits
  note: Free accounts can make many notebooks, with limits on sources per notebook and chat questions per day.
whereToStart:
  - Go to notebooklm.google.com. The tool was renamed Gemini Notebook in July 2026, and old links still work.
  - Sign in with your Google Account and click Create new notebook.
  - In the pop-up, choose Upload a source and add your files. You will see three areas, Sources, Chat and Studio.
learn:
  - title: It answers from your sources
    text: >-
      Unlike a normal chat tool, Gemini Notebook bases its answers on the files you add. Each answer
      shows small citation numbers that jump to the exact part of your source.
  - title: If it is not in your sources, it should say so
    text: >-
      Test this on purpose. Ask something your notes do not cover and see whether it admits that.
      This tells you how far to trust it.
  - title: Good sources in, good guide out
    text: >-
      Use your teacher's notes, your textbook chapter or readings from your course. Messy or
      off-topic sources make a messy guide.
builds:
  - id: chapter-guide
    title: Build a study guide for one chapter
    forLearners: [school, college-engineering, college-other]
    scenario: >-
      You have a chapter test coming up. You have the textbook chapter as a PDF and your own class
      notes.
    outcome: A study guide with citations, and a list of questions to revise.
    steps:
      - title: Create a notebook
        action: Create a new notebook and name it after the subject and chapter.
        clickPath: [notebooklm.google.com, Create new notebook]
        checkpoint: A new, empty notebook is open.
      - title: Add your sources
        action: Upload the chapter and your notes. Add only material for this chapter.
        clickPath: [Upload a source]
        checkpoint: Your sources are listed in the Sources area.
      - title: Ask for a guide in the chat
        action: Paste this prompt into the chat box.
        prompt: |
          Using only my sources, make a study guide for this chapter:
          1. The 8 most important ideas, each in one or two sentences.
          2. Key terms with short definitions.
          3. Five questions I should be able to answer before the test.
          Cite the source for each point.
        checkpoint: The guide has citation numbers you can click.
      - title: Check three citations
        action: Click three citation numbers and read the part of your source they point to.
        checkpoint: Each citation points to text that supports the point.
      - title: Test the edge
        action: 'Ask a question your sources do not cover, such as "What does the next chapter say?"'
        checkpoint: The answer says the sources do not cover it, instead of making something up.
      - title: Save the guide
        action: Save the answer as a note in the notebook, or copy it into your own study document.
        checkpoint: Your guide is saved.
    proof:
      - Your study guide
      - A note on whether it admitted when an answer was not in your sources
  - id: reading-guide
    title: Make a reading guide for your class
    forLearners: [educator]
    scenario: >-
      You are assigning three readings and want a short guide that helps students focus, based only
      on those readings.
    outcome: A checked reading guide with questions and page references.
    steps:
      - title: Create a notebook with the readings
        action: Create a new notebook and upload the three readings.
        clickPath: [notebooklm.google.com, Create new notebook, Upload a source]
        checkpoint: All three readings appear as sources.
      - title: Ask for a reading guide
        action: Paste this prompt.
        prompt: |
          Using only these sources, write a reading guide for [age group] students:
          - Two sentences on what each reading is about.
          - Three questions per reading that make students look for evidence.
          - One question that connects all three readings.
          Cite the source for each question.
        checkpoint: Every question has a citation.
      - title: Check and edit
        action: Check each citation and remove any question that is too hard or off target for your class.
        checkpoint: You have checked every question.
    proof:
      - Your edited reading guide
sources:
  - title: Create a notebook in Gemini Notebook
    url: https://support.google.com/notebooklm/answer/16206563?hl=en
  - title: NotebookLM is now Gemini Notebook
    url: https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/
  - title: NotebookLM is now available to younger users
    url: https://blog.google/feed/notebooklm-is-now-available-to-younger-users/
lastReviewed: 2026-09-26
reviewNotes:
  - NotebookLM was renamed Gemini Notebook on 16 July 2026. Some screens and help pages may still show the old name.
---

Only upload material you are allowed to share. Do not upload test papers or other students' work.
