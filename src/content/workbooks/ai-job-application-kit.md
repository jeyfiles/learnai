---
title: Build your AI job application kit
level: 1
order: 3
promise: Prepare a tailored resume section, cover letter and interview answers for one real AI-related role.
outcome: A tailored resume section, a cover letter in your own voice and three practised interview answers.
minutes: 90
paths:
- all
tools:
- ChatGPT
- Gemini
beforeYouStart:
- Find one real job posting for an AI-related role you want.
- Have your current resume ready, with your phone number and address removed.
- List the things you have actually done and built, including small AI projects from these lessons.
versions:
- path: ai-professional
  title: AI in your current field
  brief: Show how you already use AI to do your field's work better.
- path: ai-engineer
  title: Technical AI role
  brief: Show what you built, how you tested it and what you learned.
- path: ai-product
  title: AI product or strategy role
  brief: Show how you judge where AI helps and where it does not.
parts:
- title: Understand the posting
  purpose: Know exactly what they are asking for.
  steps:
  - title: Break down the posting
    action: Paste the posting into a new chat and ask for its requirements.
    clickPath:
    - chatgpt.com
    - New chat
    prompt: 'Here is a job posting: [paste]. List the must-have and nice-to-have requirements using only the posting. Mark anything unclear as "not stated".'
    checkpoint: You have a must-have and nice-to-have list.
  - title: Match your evidence
    action: Next to each requirement, write one true example or a portfolio piece that shows it.
    checkpoint: Each requirement has real evidence or is marked as a gap.
- title: Tailor your resume and letter
  purpose: Show your real fit in your own words.
  steps:
  - title: Improve resume bullets
    action: Ask for feedback on three bullets without new facts.
    prompt: Here are three resume bullets and the job requirements. Suggest how to make each bullet clearer and more specific. Use only facts I gave you. Ask me for a number or detail if you need one.
    checkpoint: You get suggestions that use only your real experience.
  - title: Draft your letter yourself
    action: Write a short cover letter that points to your strongest portfolio piece.
    checkpoint: You have a first draft in your own words.
  - title: Get a fit check
    action: Ask for a fit check without a rewrite.
    prompt: Here is the posting and my cover letter. Without rewriting, show which line covers each main requirement, or say "missing". Point out any sentence that sounds generic.
    checkpoint: Each requirement is matched to a line in your letter or marked missing.
- title: Practise the interview
  purpose: Get comfortable talking about AI work.
  steps:
  - title: Get likely questions
    action: Ask for five likely interview questions for this role.
    clickPath:
    - gemini.google.com
    - New chat
    prompt: Based on this posting, list five likely interview questions. Include one about a project I built, one about how I check AI output, and one about a time AI got something wrong.
    checkpoint: You have five questions.
  - title: Answer out loud
    action: Answer three questions out loud, then type what you said.
    checkpoint: You have three written answers.
  - title: Get feedback
    action: Ask for feedback on clarity and specific examples, not new stories.
    prompt: Here are my answers. Give feedback on clarity and whether I used a specific example. Do not invent experience for me.
    checkpoint: You get feedback that keeps your real stories.
tests:
- Every claim in your resume and letter is true.
- Each main requirement is covered or honestly marked as a gap.
- You can answer three questions without reading.
proof:
- Your tailored resume section
- Your cover letter
- Your three interview answers
sources:
- title: ChatGPT free tier FAQ
  url: https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq
lastReviewed: '2026-09-26'
---
