---
title: Ask ChatGPT a clear first question
level: 1
order: 2
tool: ChatGPT
provider: OpenAI
toolUrl: https://chatgpt.com
summary: Turn a vague request into a clear one by giving ChatGPT your goal, your level, your material and what a good answer looks like.
outcome: A clear, reusable prompt pattern and a useful first answer for a real task.
minutes: 20
paths: [all]
access: You need a free OpenAI account.
freeTier:
  status: free-with-limits
  note: Everyday chats are free. Some tools, like file uploads, have daily limits on the free plan.
whereToStart:
  - Go to chatgpt.com and sign in, or create a free account.
  - Click New chat so that an old conversation does not mix into your task.
  - Find the message box at the bottom of the screen. That is where you type or paste your prompt.
learn:
  - title: The model only knows what you tell it
    text: >-
      It does not know your background, your goal or what you already understand. A short, vague question
      gets a long, general answer. Real detail gets a useful one.
  - title: A clear prompt has four parts
    text: >-
      Who you are, what you need, what material to use, and what the answer should look like. Plain
      sentences work best. This pattern is the base of almost every AI skill that comes later.
  - title: The first answer is a draft
    text: >-
      Read it, then ask for changes. "Shorter", "assume I know Python" or "give me a real example" are all
      good follow-ups.
builds:
  - id: learn-a-term
    title: Get an AI idea explained at your level
    forPaths: [all]
    scenario: >-
      You keep seeing a term like "transformer", "embedding" or "fine-tuning" in AI posts and videos. You
      have read a few explanations but none of them fit your level.
    outcome: A clear explanation at your level, and a note on what to learn next.
    steps:
      - title: Try the vague version first
        action: 'In a new chat, type only the term, for example "explain transformers". Read the answer, then scroll back up.'
        clickPath: [New chat]
        checkpoint: You can see that the answer is general and does not know your background.
      - title: Write a clear prompt
        action: Start a new chat and paste this prompt. Replace the parts in square brackets.
        clickPath: [New chat]
        prompt: |
          I am [your background, for example "a commerce graduate with no coding experience"].
          I want to understand [term] because [your reason, for example "I want to move into an AI product role"].
          Here is what I already know: [one or two sentences].
          Explain [term] in under 200 words, with one everyday comparison and one real example of where it is used.
          Then list two things I should learn next, in order.
        checkpoint: The answer fits your background and ends with two next steps.
      - title: Check one claim
        action: >-
          Pick one fact from the answer and check it on an official source, such as the company's own
          documentation or a university course page.
        checkpoint: You have checked one claim against a trusted source.
      - title: Ask one follow-up
        action: 'Ask for one change, for example: "Now explain it again as if I know basic Python."'
        checkpoint: The explanation changes in the way you asked.
      - title: Save the prompt pattern
        action: Save your prompt with the brackets put back. You will use this pattern for every new term.
        checkpoint: You have a reusable prompt saved.
    proof:
      - Your reusable prompt pattern
      - The explanation and your one checked fact
  - id: job-posting
    title: Decode an AI job posting
    forPaths: [all]
    scenario: >-
      You found a job posting for an AI role you are interested in. It is full of skills and tools you half
      understand, and you want to know what it really asks for.
    outcome: A plain-English list of what the role needs, and a short list of gaps to work on.
    steps:
      - title: Copy the posting
        action: Copy the full job description into a notes app.
        checkpoint: You have the full posting text ready.
      - title: Ask for a plain-English version
        action: Start a new chat and paste this prompt.
        clickPath: [New chat]
        prompt: |
          Here is a job posting: [paste it].
          I am [your background].
          1. Explain what this person would do on a normal day, in plain words.
          2. Split the requirements into "must have" and "nice to have", using only what the posting says.
          3. Explain any tool or term I might not know in one line each.
          If something is not stated in the posting, say "not stated" instead of guessing.
        checkpoint: The answer separates must-have from nice-to-have and marks things as "not stated".
      - title: Mark your gaps
        action: Next to each must-have, write "have it", "partly" or "not yet".
        checkpoint: Every must-have has an honest rating.
      - title: Turn gaps into a plan
        action: 'Ask: "For my two biggest gaps, suggest one small project I could finish in a week to start closing each one."'
        checkpoint: You have two small project ideas linked to real gaps.
    proof:
      - Your gap list for one real AI role
      - Two small project ideas
sources:
  - title: ChatGPT free tier FAQ
    url: https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq
lastReviewed: 2026-09-26
reviewNotes: []
---

If an answer feels too general, add one real detail: your background, your goal or the level you want. If it feels too long, add "in under 150 words".
