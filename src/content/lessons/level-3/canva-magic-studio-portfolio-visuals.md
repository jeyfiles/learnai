---
title: Make portfolio visuals with Canva Magic Studio
level: 3
order: 1
tool: Canva Magic Studio
provider: Canva
toolUrl: https://www.canva.com
summary: Use Canva's AI design tools to turn a project write-up into a clear visual, generate a cover image, and check both before you share them.
outcome: A one-page project visual and a checked AI cover image, ready for your portfolio or a post about your work.
minutes: 30
paths: [all]
access: You need a free Canva account.
freeTier:
  status: free-with-limits
  note: >-
    Free accounts get a small monthly allowance of AI uses. Generating images uses it up much faster
    than text tools, so plan a few careful tries rather than many quick ones.
whereToStart:
  - Go to canva.com and sign in, or create a free account.
  - On the Canva Homepage, select Canva AI to describe a design and get templates made for you. This is Canva's Magic Design.
  - To generate images, go to the Homepage, select More, then Dream Lab.
learn:
  - title: Start from your words, not a blank page
    text: >-
      Magic Design turns a short description, plus any text or images you add, into a set of layouts. You
      then pick one and edit it. The content still has to come from you.
  - title: AI images need checking too
    text: >-
      Generated images can contain odd details, such as warped hands, made-up text or wrong labels on a
      diagram. Zoom in and check every part before you use one.
  - title: Say when an image is AI-made
    text: >-
      A short label such as "Image created with AI in Canva" keeps your portfolio honest. It also shows
      employers that you handle AI content responsibly.
builds:
  - id: project-one-pager
    title: Turn a project write-up into a one-page visual
    forPaths: [all]
    scenario: >-
      You have a short case study from Level 1, such as your scored tool comparison. You want a clean,
      one-page visual that a hiring manager can take in quickly.
    outcome: A one-page visual with your problem, method, result and next step.
    steps:
      - title: Prepare your text first
        action: >-
          Write four short parts from your case study: the problem, what you did, the result and what you
          would do next. Keep each part under 30 words.
        checkpoint: You have four short parts ready to paste.
      - title: Describe the design
        action: On the Canva Homepage, select Canva AI and describe what you want.
        clickPath: [Canva Homepage, Canva AI]
        prompt: |
          A clean one-page case study summary for a portfolio, A4 portrait, simple and professional.
          Four sections: Problem, What I did, Result, Next step. Room for one small chart or image.
        checkpoint: Canva shows you a set of design options.
      - title: Pick a layout and add your words
        action: Choose the simplest layout. Replace every placeholder with your own text from step 1.
        checkpoint: No placeholder text is left anywhere on the page.
      - title: Check it like a reviewer
        action: >-
          Zoom out to see the whole page. Check that the result is the first thing your eye lands on, that
          all text is readable and that every number matches your case study.
        checkpoint: Every number matches your case study and the page reads clearly at a glance.
      - title: Download it
        action: Download the design as a PDF or PNG and add it to your portfolio page.
        clickPath: [Share, Download]
        checkpoint: The file is saved and linked from your portfolio.
    proof:
      - Your one-page project visual
  - id: checked-cover-image
    title: Generate and check a cover image
    forPaths: [all]
    scenario: >-
      You want a cover image for a portfolio post or a project page. You want it to fit your topic without
      misleading anyone.
    outcome: A cover image you checked, labelled as AI-made.
    steps:
      - title: Open Dream Lab
        action: From the Canva Homepage, open Dream Lab.
        clickPath: [Canva Homepage, More, Dream Lab]
        checkpoint: The Dream Lab prompt box is open.
      - title: Write a specific prompt
        action: Describe the image in detail, including what it should not contain.
        prompt: |
          A simple, modern illustration for a blog post about [your project topic].
          Calm colours, plenty of empty space for a title, no text or letters in the image,
          no real people or company logos.
        checkpoint: Dream Lab shows four image options.
      - title: Check every option closely
        action: >-
          Zoom in on each image. Reject any with made-up text, odd shapes, or anything that could be
          mistaken for a real brand or person.
        checkpoint: You picked one image with no errors, or you asked for changes.
      - title: Refine once
        action: 'If needed, ask for one change, for example: "Same image, but with more empty space on the left for a title."'
        checkpoint: The image fits your layout.
      - title: Label it
        action: Use the image in your post or project page and add a short caption saying it was created with AI in Canva.
        checkpoint: The image is used with a clear AI label.
    proof:
      - The cover image in use, with its AI label
sources:
  - title: Use Magic Design to generate design templates
    url: https://www.canva.com/help/use-magic-design/
  - title: Generate images with Dream Lab
    url: https://www.canva.com/help/generate-with-dreamlab/
  - title: AI safety at Canva
    url: https://www.canva.com/policies/ai-safety/
reviewNotes:
  - Canva's help pages say Magic Design is started from Canva AI on the Homepage, and Dream Lab from More on the Homepage. Names and menus can move as Canva updates.
  - Some Magic Studio tools, such as Magic Eraser and Magic Expand, are only on paid plans. This lesson uses tools with free access.
lastReviewed: 2026-09-26
---

Never generate images of real people, or images that copy a real brand, without permission. Keep AI images clearly labelled.
