---
title: Build a custom assistant for one job with a Gemini Gem
level: 4
path: no-code-builder
order: 1
promise: Build a reusable assistant with its own instructions for one clear job, and test it on tricky inputs before anyone else uses it.
outcome: A working Gem with written instructions, a test sheet of eight inputs with results, and a short guide for the people who will use it.
scenario: A small team keeps asking you the same kind of question, for example how to word a customer reply or how to fill in a form. You want an assistant that answers in the team's style, and you want to know where it fails.
tools: [Gemini]
minutes: 180
beforeYouStart:
  - Sign in to Gemini with a Google account. Check the Gems help page to see whether your account can create Gems.
  - Pick one narrow job for the assistant. "Write replies to delivery complaints" is better than "help with customers".
  - Collect two or three good examples of the output you want, cleaned of private details.
steps:
  - title: Write the job in one sentence
    action: Write who the assistant helps, with what, and what it must never do.
    checkpoint: One sentence that includes a clear "never" rule.
  - title: Draft the instructions
    action: Write the assistant's instructions. Include its role, the steps it follows, the format of every answer, your good examples and what to do when it does not know.
    prompt: "You help [who] with [job]. For every request, first [step one], then [step two]. Reply in [format], under [length] words. Use the tone in these examples: [examples]. If you do not have enough information, ask one question instead of guessing. Never [rule]."
    checkpoint: The instructions include an example, a format and a rule for when information is missing.
  - title: Create the Gem
    action: In Gemini, create a new Gem, give it a clear name and paste your instructions.
    checkpoint: The Gem opens and answers a simple test request.
  - title: Write eight test inputs
    action: Write two normal requests, two with missing information, two that are outside the job, one that is rude and one that asks it to break your "never" rule.
    checkpoint: You have eight inputs in a table, each with what a good answer should do.
  - title: Run the tests
    action: Start a new chat with the Gem for each input. Mark each answer as pass or fail against what a good answer should do.
    checkpoint: Every row of your table has a pass or fail and a short note.
  - title: Fix and retest
    action: Change the instructions to fix the most important failure. Run all eight tests again.
    checkpoint: The second run has more passes, and the "never" rule holds.
  - title: Write a short user guide
    action: Write five lines for your team. What the Gem is for, what it is not for, and how to check its answers.
    checkpoint: A new team member could use the Gem safely after reading the guide.
tests:
  - name: Refuses outside its job
    expected: The two requests outside the job get a polite redirect, not a made-up answer.
  - name: Asks when information is missing
    expected: The two requests with missing information get a question back.
  - name: Holds the rule
    expected: The request to break your "never" rule is declined in both test runs.
safety:
  - Do not put private customer data into the Gem's instructions or test inputs.
  - Tell users the assistant can be wrong and that a person must check every answer before it is sent.
proof:
  - The final instructions
  - The test table from both runs
  - The five line user guide
sources:
  - title: Get started with Gems in Gemini Apps
    url: https://support.google.com/gemini/answer/15236321
  - title: Tips for creating custom Gems
    url: https://support.google.com/gemini/answer/15235603
lastReviewed: 2026-09-26
---
