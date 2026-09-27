---
title: Explain an AI paper or model card in plain words
level: 1
order: 2
promise: Read one official AI document properly and explain what it shows, how it was tested and where it falls short.
outcome: A one-page plain-English explainer of an AI paper or model card, with page references.
minutes: 90
paths:
- all
tools:
- Gemini Notebook (was NotebookLM)
- ChatGPT
beforeYouStart:
- Choose one official document, such as a model card, a system card or a research paper from the company or authors.
- Download it as a PDF from the official source.
- Sign in to notebooklm.google.com and chatgpt.com.
versions:
- path: all
  title: Model card or system card
  brief: What the model is for, how it was tested, and its stated limits and risks.
- path: ml-data
  title: Research paper
  brief: The problem, the method, the results and what the authors say is still unsolved.
parts:
- title: Build a notebook
  purpose: Keep the answers tied to the document.
  steps:
  - title: Create a notebook
    action: Create a new notebook and upload the document.
    clickPath:
    - notebooklm.google.com
    - Create new notebook
    - Upload a source
    checkpoint: The document appears in Sources.
  - title: Get the structure
    action: Ask for a map of the document.
    prompt: Using only this source, list its main sections and what each one covers in one sentence. Cite each one.
    checkpoint: You have a section list with citations.
- title: Pull out what matters
  purpose: Find the claims, the tests and the limits.
  steps:
  - title: Ask the four key questions
    action: Ask these questions one at a time and save each answer.
    prompt: 'Using only this source: 1. What is this for? 2. What are the main claims? 3. How were they tested, and on what data or benchmarks? 4. What limitations or risks do the authors state? Cite every point.'
    checkpoint: You have four cited answers.
  - title: Check every citation
    action: Click each citation and read the passage.
    checkpoint: Every point matches the document.
  - title: Find one thing you do not understand
    action: Pick one term or result you do not understand and learn it with study mode in ChatGPT.
    clickPath:
    - chatgpt.com
    - New chat
    - +
    - Study
    checkpoint: You can explain that one thing in your own words.
- title: Write the explainer
  purpose: Show that you understood it.
  steps:
  - title: Write it yourself
    action: 'Write a one-page explainer with four headings: what it is, what it claims, how it was tested, and its limits. Add page references.'
    checkpoint: You have a one-page explainer in your own words.
  - title: Get a fairness check
    action: Ask ChatGPT whether your explainer overstates or understates anything, without rewriting it.
    clickPath:
    - chatgpt.com
    - New chat
    prompt: 'Here is a document summary I wrote and the key passages it is based on: [paste]. Without rewriting it, tell me where I might overstate or understate what the document shows.'
    checkpoint: You get a list of points to check, not a new version.
tests:
- Every claim in your explainer has a page reference.
- The limits section includes what the authors themselves say.
- Someone outside AI could understand your first paragraph.
proof:
- Your one-page explainer, ready to publish or add to your portfolio
sources:
- title: Create a notebook in Gemini Notebook
  url: https://support.google.com/notebooklm/answer/16206563?hl=en
- title: Using study mode in ChatGPT
  url: https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt
lastReviewed: '2026-09-26'
---
