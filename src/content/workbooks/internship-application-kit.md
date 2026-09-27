---
title: Build your internship application kit
level: 1
order: 3
promise: Prepare a tailored resume section, cover letter and interview answers for one real posting.
outcome: A tailored resume section, a cover letter in your voice and three practised interview answers.
minutes: 90
learnerTypes:
- college-engineering
- college-other
- job-seeker
- career-switcher
tools:
- ChatGPT
- Gemini
beforeYouStart:
- Find one real internship or job posting you want to apply for.
- Have your current resume ready, with your phone number and address removed.
- 'Write a short list of things you have actually done: projects, jobs, clubs, volunteering.'
versions:
- learnerType: college-engineering
  title: Engineering internship
  brief: Show projects, labs and technical skills that match the posting.
- learnerType: college-other
  title: Non-technical internship
  brief: Show communication, research and teamwork from coursework and activities.
- learnerType: career-switcher
  title: First role in a new field
  brief: Connect skills from your old work to what the new role needs.
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
  - title: Match your experience
    action: Next to each requirement, write one true example from your list.
    checkpoint: Each requirement has a true example or is marked as a gap.
- title: Tailor your resume and letter
  purpose: Show your real fit in your own words.
  steps:
  - title: Improve resume bullets
    action: Ask for feedback on three bullets without new facts.
    prompt: Here are three resume bullets and the job requirements. Suggest how to make each bullet clearer and more specific. Use only facts I gave you. Ask me a question if you need a number or detail.
    checkpoint: You get suggestions that use only your real experience.
  - title: Draft your letter yourself
    action: Write a short cover letter using your matched examples.
    checkpoint: You have a first draft in your own words.
  - title: Get a fit check
    action: Ask for a fit check without a rewrite.
    prompt: Here is the posting and my cover letter. Without rewriting, show which line covers each main requirement, or say "missing". Point out any sentence that sounds generic.
    checkpoint: Each requirement is matched to a line in your letter or marked missing.
- title: Practise the interview
  purpose: Get comfortable answering out loud.
  steps:
  - title: Get likely questions
    action: Ask for five likely interview questions for this role.
    clickPath:
    - gemini.google.com
    - New chat
    prompt: Based on this posting, list five likely interview questions for a [your level] applicant. Include one about a project and one about teamwork.
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
- Each main requirement is covered in your letter or honestly marked as a gap.
- You can answer three questions without reading.
proof:
- Your tailored resume section
- Your cover letter
- Your three interview answers
sources:
- title: Is ChatGPT safe for all ages?
  url: https://help.openai.com/en/articles/8313401-is-chatgpt-safe-for-all-ages
lastReviewed: '2026-09-26'
---
