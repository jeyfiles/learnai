---
# Copy to src/content/workbooks/<slug>.md  ->  /learnai/workbooks/<slug>/
title: Workbook title
level: 1
order: 5
promise: One sentence on what the learner will be able to do.
outcome: What they finish with.
minutes: 60
paths: [all]
tools: [Gemini]
beforeYouStart:
  - What to prepare.
versions:                      # At least 2
  - path: ai-professional
    title: Version name
    brief: How this version differs.
  - path: ai-engineer
    title: Version name
    brief: How this version differs.
parts:                         # At least 2 parts, each with steps like lessons
  - title: Part one
    purpose: Why this part matters.
    steps:
      - title: Step
        action: Do this.
        checkpoint: This is true.
  - title: Part two
    purpose: Why this part matters.
    steps:
      - title: Step
        action: Do this.
        prompt: Optional prompt.
        checkpoint: This is true.
tests:                         # At least 2 ways to check the result
  - Test one
  - Test two
proof:
  - What to save
sources:
  - title: Official help page
    url: https://example.com/help
lastReviewed: 2026-09-26
---
