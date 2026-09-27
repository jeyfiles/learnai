---
title: Test two AI tools on the same task
level: 1
order: 10
tool: ChatGPT and Gemini
provider: OpenAI and Google
toolUrl: https://chatgpt.com
summary: Give two tools the same task, score their answers against clear criteria, and write up what you found.
outcome: A small scored comparison you can share as a portfolio piece, and your own rule for choosing a tool.
minutes: 35
paths: [all]
access: You need a free OpenAI account and a Google Account.
freeTier:
  status: free
  note: Both tools are free for this lesson.
whereToStart:
  - Open chatgpt.com and gemini.google.com in two tabs, and sign in to both.
  - Start a new chat in each.
  - Open a spreadsheet or a notes app for your scores.
learn:
  - title: Testing is a core AI skill
    text: >-
      Teams that build with AI spend a lot of time checking outputs: is it correct, complete and safe? This is
      often called evaluation. You can start doing it today without any code.
  - title: Decide what "good" means first
    text: >-
      Write your scoring criteria before you read any answers. Otherwise you will favour the answer that sounds
      most confident.
  - title: One test proves little
    text: >-
      A single prompt can be lucky or unlucky. Use at least three test inputs, including one tricky case, before
      you draw a conclusion.
builds:
  - id: scored-comparison
    title: Run a small, scored comparison
    forPaths: [all]
    scenario: >-
      You need to pick a tool for a repeat task, such as summarising articles, drafting emails or explaining
      code. You want evidence, not a guess.
    outcome: A score table for two tools across three test inputs, and a short write-up.
    steps:
      - title: Pick the task and three test inputs
        action: >-
          Choose one task and three inputs: an easy one, a normal one and a tricky one, such as a text with a
          misleading headline.
        checkpoint: You have one task and three inputs.
      - title: Write your criteria first
        action: 'Write 3 or 4 criteria with a 1 to 5 score each, such as "accurate", "complete", "follows the format" and "admits uncertainty".'
        checkpoint: Your criteria are written down before you run anything.
      - title: Use the same prompt in both tools
        action: Paste the same prompt into both tools for each input. Use a new chat for each input.
        clickPath: [New chat]
        prompt: |
          [Your task instruction, for example: Summarise this article in 5 bullet points for a busy manager.
          Keep each bullet under 20 words. If the article makes a claim without evidence, say so.]

          [paste input]
        checkpoint: You have six answers, three from each tool.
      - title: Score every answer
        action: Score each answer against your criteria. Note one sentence of reason for any score of 1 or 2.
        checkpoint: All six answers are scored, with reasons for low scores.
      - title: Write up what you found
        action: >-
          Write a short summary: which tool did better on which criteria, what surprised you, and your rule for
          choosing a tool for this task. Mention that results can change as tools update.
        checkpoint: You have a short write-up with your score table.
    proof:
      - Your score table and write-up, ready to share as a portfolio piece
  - id: prompt-versions
    title: Compare two versions of your own prompt
    forPaths: [ai-engineer, no-code-builder, ai-product]
    scenario: >-
      You wrote a prompt for a task you repeat often. You want to know whether a more detailed version is
      actually better, or just longer.
    outcome: A small test log showing which prompt version wins, and why.
    steps:
      - title: Write version A and version B
        action: Keep your current prompt as version A. Write version B with one change, such as adding an example of a good answer.
        checkpoint: The two versions differ in one clear way.
      - title: Run both on three inputs
        action: Run both versions on the same three inputs in one tool, using a new chat each time.
        clickPath: [New chat]
        checkpoint: You have six answers.
      - title: Score and decide
        action: Score each answer with the same criteria. Pick the winner and write one sentence on why.
        checkpoint: You chose a winner based on scores, not on a feeling.
      - title: Save your prompt log
        action: Save both prompts, the inputs, the scores and your decision in one document.
        checkpoint: You have a prompt test log you can build on.
    proof:
      - Your prompt test log
sources:
  - title: ChatGPT free tier FAQ
    url: https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq
  - title: What you need to sign in to Gemini Apps
    url: https://support.google.com/gemini/answer/13278668?hl=en
lastReviewed: 2026-09-26
reviewNotes: []
---

When you share a comparison, include the date and the tool versions if they are shown. AI tools change often, so a result from this month may not hold next month.
