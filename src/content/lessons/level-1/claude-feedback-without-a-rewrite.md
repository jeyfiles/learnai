---
title: Get feedback on your writing without a rewrite
level: 1
order: 6
tool: Claude
provider: Anthropic
toolUrl: https://claude.ai
summary: Ask for honest feedback against clear criteria, and keep the writing yours by asking for comments, not a new version.
outcome: A feedback table for a real piece of writing, and a stronger version you improved yourself.
minutes: 25
paths: [all]
access: >-
  You need a free Anthropic account. Claude is only available to adults aged 18 and over. The same prompts
  work in ChatGPT or Gemini.
freeTier:
  status: free-with-limits
  note: Claude has a free plan with usage limits that reset over time.
whereToStart:
  - Go to claude.ai and sign in, or create a free account.
  - Click New chat.
  - To attach your draft, click the + button in the message box and choose Add files or photos. You can also paste the text.
learn:
  - title: Feedback and rewriting are different
    text: >-
      If the tool rewrites your work, the voice is no longer yours and you learn little. Asking for comments
      keeps you in charge of every change.
  - title: Clear criteria make feedback useful
    text: >-
      "Is this good?" gets a vague answer. "Check this against these four points" gets specific comments you
      can act on.
  - title: You decide what to change
    text: >-
      Some feedback will be wrong or will not fit your goal. Accept, change or ignore each comment on purpose.
builds:
  - id: project-write-up
    title: Improve a project write-up for your portfolio
    forPaths: [all]
    scenario: >-
      You built something small with AI, such as an assistant, an automation or a notebook, and wrote a short
      case study about it. You want it to be clear to a hiring manager.
    outcome: A feedback table and a clearer write-up in your own words.
    steps:
      - title: Share the write-up
        action: Start a new chat and attach or paste your write-up. Remove private details about clients or employers.
        clickPath: [New chat, "+", Add files or photos]
        checkpoint: Your write-up is shared with no private details.
      - title: Ask for comments only
        action: Paste this prompt.
        prompt: |
          This is a portfolio case study about an AI project I built.
          Give me feedback only. Do not rewrite any of my sentences.
          Check it against these points: the problem is clear, what I built is clear, how I tested it is clear,
          the result is measured or shown, and what I would do next is stated.
          Make a table: point, what works, what is weak, one question to help me fix it.
          Then tell me the single most important thing to fix first.
        checkpoint: You get a table of comments and no rewritten paragraphs.
      - title: Decide on each comment
        action: For each row, write "accept", "change" or "ignore", with a few words on why.
        checkpoint: Every comment has a decision from you.
      - title: Write the new version yourself
        action: Make the changes in your own document. Do not paste text from the chat.
        checkpoint: The new version is in your own words.
    proof:
      - The feedback table with your decisions
      - Your improved write-up
  - id: cover-letter-feedback
    title: Check a cover letter for an AI role
    forPaths: [all]
    scenario: >-
      You wrote a cover letter for an AI-related role. You want to know if it clearly shows why you fit.
    outcome: A fit check against the posting, and a stronger letter you wrote.
    steps:
      - title: Share the letter and the posting
        action: Start a new chat and paste the job posting and your letter. Remove your phone number and address.
        clickPath: [New chat]
        checkpoint: Both texts are pasted with no contact details.
      - title: Ask for a fit check
        action: Paste this prompt.
        prompt: |
          Here is a job posting and my cover letter.
          Without rewriting my letter:
          1. List the top 3 things the posting asks for.
          2. For each one, quote the line in my letter that shows it, or say "missing".
          3. Point out any sentence that sounds vague or generic, and ask me a question that would help me make it specific.
        checkpoint: Each requirement is matched to a line in your letter or marked "missing".
      - title: Fill gaps with real examples
        action: For each "missing" item, write one true sentence about something you have done or built. Never invent experience.
        checkpoint: Every new sentence is true and specific to you.
    proof:
      - The fit check list
      - Your improved letter
sources:
  - title: Minimum age requirement
    url: https://support.claude.com/en/articles/13117299-minimum-age-requirement-access-restriction
  - title: Upload files to Claude
    url: https://support.claude.com/en/articles/8241126-upload-files-to-claude
lastReviewed: 2026-09-26
reviewNotes: []
---

Never paste confidential work, client data or anyone else's personal details into a chat, even for feedback.
