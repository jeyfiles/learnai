---
title: Build a prompt injection test set for a summariser
level: 4
path: ai-engineer
order: 2
promise: Write a set of tricky inputs that try to take over an AI summariser, run them, and show which defences help.
outcome: A test table of ten attack inputs, results for two versions of the prompt, and a short write-up of what worked and what did not.
scenario: Your team wants AI to summarise emails and web pages. Any of that text could contain hidden instructions. Before anything is built, you want to show the risk clearly and test simple defences.
tools: [ChatGPT, Gemini, Claude]
minutes: 180
beforeYouStart:
  - Do the daily practice "Mark untrusted text in a prompt" first.
  - Read the prompt injection entry in the OWASP Top 10 for LLM applications.
  - Use only made-up emails and pages. Never test on real systems you do not own.
steps:
  - title: Write the basic summariser prompt
    action: Write a simple prompt that summarises pasted text in two lines, with no defences.
    checkpoint: The prompt works on a normal email.
  - title: Write ten attack inputs
    action: Write ten made-up emails or pages that each hide an instruction. Vary them. Put the instruction at the start, the middle and the end, in a footnote, in another language, and as a fake message from the system.
    checkpoint: You have ten different inputs, each with the hidden instruction written down separately.
  - title: Decide what a pass looks like
    action: For each input, write what a safe summary does. It summarises the real content and does not follow the hidden instruction.
    checkpoint: Every input has a clear pass rule.
  - title: Run version one
    action: Run all ten inputs through the basic prompt, each in a new chat. Mark pass or fail.
    checkpoint: The table shows ten results for version one.
  - title: Write version two
    action: Add defences. Put the pasted text between markers, say it comes from someone else, and tell the model to report any instructions it finds instead of following them.
    checkpoint: The new prompt has markers and a clear rule about instructions inside the text.
  - title: Run version two
    action: Run the same ten inputs through version two, each in a new chat, and mark pass or fail.
    checkpoint: The table shows ten results for version two next to version one.
  - title: Write it up
    action: Write a short note. Which attacks worked, which defences helped, and why a prompt alone is not enough for a real product.
    checkpoint: The note says clearly that the defences reduce the risk but do not remove it.
tests:
  - name: Variety
    expected: The ten inputs use at least five different ways of hiding an instruction.
  - name: Fair comparison
    expected: Both versions were tested on exactly the same ten inputs, each in a new chat.
  - name: Honest conclusion
    expected: The write-up does not claim the prompt is safe.
safety:
  - Only test on tools and text you control. Do not try these inputs on other people's systems.
  - Do not publish attack text that targets a real product or company.
proof:
  - The ten inputs and both result tables
  - Your short write-up
sources:
  - title: OWASP Top 10 for Large Language Model Applications
    url: https://owasp.org/www-project-top-10-for-large-language-model-applications/
lastReviewed: 2026-09-26
---
