---
title: Research AI claims with sources you can check using Perplexity
level: 1
order: 8
tool: Perplexity
provider: Perplexity AI
toolUrl: https://www.perplexity.ai
summary: Ask one focused research question, open the sources behind the answer and decide which ones you trust.
outcome: A short, sourced answer to a real question about AI, backed by sources you opened and rated yourself.
minutes: 25
paths: [all]
access: You can search without an account. Sign in to keep your history.
freeTier:
  status: free-with-limits
  note: Basic searches are free. The deeper Pro Search is limited on the free plan.
whereToStart:
  - Go to perplexity.ai.
  - Type your question in the search box in the middle of the page and press Enter.
  - Look for the small numbers in the answer. Each one links to a source. Hover over or click a source to see its details.
learn:
  - title: A citation is not proof
    text: >-
      A link next to a sentence shows where the tool looked. It does not prove the source says exactly that,
      or that the source is reliable. You have to open it.
  - title: AI news is full of hype
    text: >-
      Claims like "model X beats every human" often leave out what was measured and how. Go to the original
      paper, benchmark page or company announcement.
  - title: Some sources are stronger than others
    text: >-
      Official documentation, research papers and government sites are usually stronger than blogs or social
      posts. Perplexity labels some sources as Government, Academic or Trusted. Use labels as a hint only.
builds:
  - id: check-a-benchmark-claim
    title: Check a claim about an AI model
    forPaths: [all]
    scenario: >-
      You saw a post saying a new AI model is the best at something, such as coding or maths. You want to know
      what was actually measured before you repeat it.
    outcome: A short verdict on the claim, with the original source.
    steps:
      - title: Copy the exact claim
        action: Copy the claim word for word. Note where you saw it and when.
        checkpoint: You have the exact claim written down.
      - title: Ask Perplexity to trace it
        action: Paste this prompt.
        clickPath: [perplexity.ai, Search box]
        prompt: |
          Someone claimed: "[paste the claim]".
          Find the original source, such as the paper, benchmark results or official announcement.
          Tell me what was measured, on which test, and compared with what.
          Say whether the claim is accurate, partly accurate or misleading, in under 120 words. Cite sources.
        checkpoint: The answer names what was measured and cites sources.
      - title: Open the original
        action: Open the original source and find the result yourself. Check the date and the exact test used.
        checkpoint: You found the result in the original source, or you know it could not be found.
      - title: Write your verdict
        action: 'Write two sentences: what was really shown, and what the post left out.'
        checkpoint: Your verdict is based on the original source.
    proof:
      - Your verdict with a link to the original source
  - id: topic-background
    title: Build a short background on an AI topic
    forPaths: [all]
    scenario: >-
      You want to write a short post or explain a topic, such as AI in healthcare or AI regulation, and need
      three facts you can cite.
    outcome: Three facts, each backed by a source you opened, with the source rated.
    steps:
      - title: Write one narrow question
        action: Turn your topic into one question with a clear answer, and say which sources you want.
        checkpoint: Your question can be answered in a few sentences.
      - title: Ask Perplexity
        action: Paste your question with this instruction.
        clickPath: [perplexity.ai, Search box]
        prompt: |
          [Your question]
          Use official, government, university or peer-reviewed sources where possible.
          Keep the answer under 150 words and cite each claim. If sources disagree, say so.
        checkpoint: The answer has numbered citations.
      - title: Open and rate every source you use
        action: Click each citation, find the supporting sentence, and rate the source strong, OK or weak with a reason.
        checkpoint: Each fact you keep has a source you read and rated.
      - title: Save the facts
        action: Write your three facts in your own words, each with the source title, link and date.
        checkpoint: You have three facts with full source details.
    proof:
      - Your three facts with sources and ratings
  - id: career-facts
    title: Research an AI career path with facts, not hype
    forPaths: [all]
    scenario: >-
      You are weighing up an AI role and want real information on skills and entry routes, not marketing from
      course sellers.
    outcome: A one-page fact sheet on the role, with sources rated.
    steps:
      - title: Ask a focused question
        action: Paste this prompt and fill in the brackets.
        clickPath: [perplexity.ai, Search box]
        prompt: |
          What skills and qualifications do entry-level [job title] roles in [country or city] usually ask for?
          Use job boards, government career sites or professional bodies, not course advertisements.
          Cite each point.
        checkpoint: The answer cites job boards, government sites or professional bodies.
      - title: Remove sales sources
        action: Open each source. Cross out any that sell a course, unless the same fact appears elsewhere.
        checkpoint: Your remaining sources do not sell anything.
      - title: Check five real postings
        action: Search a job board yourself for five real postings and compare their requirements with the answer.
        checkpoint: You compared the answer with five real postings.
    proof:
      - Your career fact sheet with sources
sources:
  - title: Getting started with Perplexity
    url: https://www.perplexity.ai/hub/blog/getting-started-with-perplexity
  - title: Understanding source labels
    url: https://www.perplexity.ai/help-center/en/articles/20260806-understanding-source-labels
lastReviewed: 2026-09-26
reviewNotes:
  - Perplexity has had a menu for choosing source types (for example Academic). It may not show on every plan, so this lesson asks for source types in the prompt instead.
---

If you cannot open a source, or it sits behind a paywall, do not cite it. Find one you can read.
