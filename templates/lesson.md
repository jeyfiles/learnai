---
# Copy this file to src/content/lessons/level-N/<your-lesson-slug>.md
# The file name becomes the web address: /learnai/learn/<your-lesson-slug>/
title: Short title that says what the learner will do
level: 1
order: 11                      # Position in the level list
tool: ChatGPT                  # Name shown to learners
provider: OpenAI
toolUrl: https://chatgpt.com
summary: One sentence for cards and search.
outcome: What the learner finishes with.
minutes: 20
paths: [all]                   # all, ai-professional, no-code-builder, ai-engineer, ml-data, ai-product
access: What you need to sign up, such as an account, and any age or country limits.
freeTier:
  status: free                 # free, free-with-limits or paid
  note: What the free plan allows for this lesson.
whereToStart:
  - Go to the tool's web address and sign in.
  - Where to click first.
learn:                         # 2 to 4 short ideas: "Understand it first"
  - title: First idea
    text: Two or three plain sentences.
  - title: Second idea
    text: Two or three plain sentences.
builds:                        # 2 or 3 practice builds
  - id: first-build            # lowercase letters, numbers and hyphens
    title: What this build makes
    forPaths: [all]
    scenario: A realistic student situation in one or two sentences.
    outcome: What the learner has at the end.
    steps:                     # 3 to 10 steps
      - title: Step name
        action: What to do.
        clickPath: [Button one, Menu item]   # optional
        prompt: |                            # optional, shown with a Copy button
          The prompt text. Use [square brackets] for parts to replace.
        checkpoint: How the learner knows the step worked.
    proof:
      - What to save for the portfolio
  - id: second-build
    title: Another build
    forPaths: [ai-engineer]
    scenario: Another situation.
    outcome: Another result.
    steps:
      - title: Step one
        action: Do this.
        checkpoint: This is true.
      - title: Step two
        action: Do this.
        checkpoint: This is true.
      - title: Step three
        action: Do this.
        checkpoint: This is true.
    proof:
      - Evidence
sources:                       # Official help pages
  - title: Official help page title
    url: https://example.com/help
lastReviewed: 2026-09-26       # For your own records; not shown on the page. Update it when you re-check the tool
reviewNotes: []                # Details that may look different on screen; shown in a "Good to know" note
---

Optional closing tip in plain Markdown.
