---
title: Write a research brief on an AI topic
level: 1
order: 1
promise: Go from a broad AI topic to a one-page brief where every claim has a source you opened.
outcome: A one-page research brief with five checked sources, written in your own words and ready to publish.
minutes: 75
paths:
- all
tools:
- Perplexity
- ChatGPT
beforeYouStart:
- Pick an AI topic you want to understand or write about, such as AI in your current field.
- Open perplexity.ai and chatgpt.com in two tabs.
- Have a document ready for your notes and sources.
versions:
- path: ai-professional
  title: AI in my field
  brief: How AI is being used in the field you work in now, with real examples.
- path: ai-engineer
  title: Technical explainer
  brief: How one technique works, such as retrieval or fine-tuning, and when to use it.
- path: ai-product
  title: Market snapshot
  brief: What problems one type of AI product solves, who uses it and where it falls short.
parts:
- title: Sharpen the question
  purpose: A narrow question leads to sources you can check.
  steps:
  - title: Write your broad topic
    action: Write your topic in a few words.
    checkpoint: You have a topic.
  - title: Narrow it with help
    action: Ask ChatGPT to suggest narrower questions.
    clickPath:
    - chatgpt.com
    - New chat
    prompt: My topic is [topic]. I am writing for [audience]. Suggest five narrower research questions that can be answered in one page using reliable public sources. Do not answer them.
    checkpoint: You have one clear question you can answer in a page.
- title: Find and check sources
  purpose: Collect sources you have opened and rated.
  steps:
  - title: Search with Perplexity
    action: Ask your chosen question in Perplexity and ask for reliable sources.
    clickPath:
    - perplexity.ai
    - Search box
    prompt: '[Your question] Use official documentation, research papers, government or university sources where possible. Cite each claim. Say where sources disagree.'
    checkpoint: You have an answer with numbered citations.
  - title: Open and rate five sources
    action: Open each source, find the supporting sentence and rate it strong, OK or weak, with a reason.
    checkpoint: You have five rated sources with notes.
  - title: Drop weak claims
    action: Remove any claim you could not find in a source you opened.
    checkpoint: Every claim you keep has a source you read.
- title: Write the brief
  purpose: Turn your notes into your own writing.
  steps:
  - title: Outline first
    action: Write a five-point outline from your notes, without AI.
    checkpoint: You have an outline in your own words.
  - title: Write the page
    action: Write the brief from your outline. Cite each source.
    checkpoint: You have a one-page brief.
  - title: Get a check, not a rewrite
    action: Ask ChatGPT to check for gaps without rewriting.
    clickPath:
    - chatgpt.com
    - New chat
    prompt: Here is my research brief. Do not rewrite it. List any claim that has no citation, any place where a source might be misread, and one question a reader might ask.
    checkpoint: You get comments, not a new version.
tests:
- Every claim in the brief has a source you opened.
- At least three of your five sources are rated strong.
- The brief is written in your own words.
proof:
- Your research brief, ready to post or add to your portfolio
- Your source list with ratings
sources:
- title: Understanding source labels (Perplexity)
  url: https://www.perplexity.ai/help-center/en/articles/20260806-understanding-source-labels
lastReviewed: '2026-09-26'
---
