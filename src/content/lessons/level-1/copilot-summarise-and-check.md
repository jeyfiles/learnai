---
title: Summarise a long AI report with Copilot, then check it
level: 1
order: 7
tool: Microsoft Copilot
provider: Microsoft
toolUrl: https://copilot.microsoft.com
summary: Get a short summary of a long PDF, such as a research paper or a model report, then test it against the original so you know you can trust it.
outcome: A checked summary of a long document, with page numbers for every key point.
minutes: 20
paths: [all]
access: You need a personal Microsoft account.
freeTier:
  status: free
  note: The free Copilot app can read files you upload. Limits can change at busy times.
whereToStart:
  - Go to copilot.microsoft.com and sign in with your Microsoft account.
  - Start a new conversation.
  - To add your file, use the upload button in the message box. It is usually a + or a paperclip. Hover over the buttons to see their names.
learn:
  - title: Summaries leave things out
    text: >-
      That is their job. The risk is that they drop the one detail you needed, or blend two ideas into one.
      Asking for page numbers lets you check quickly.
  - title: Check numbers, names and limits
    text: >-
      Benchmark scores, dates, model names and stated limitations are the details AI summaries get wrong most
      often. Check every one against the original.
  - title: A summary is a map, not the reading
    text: >-
      Use it to decide what to read closely. When you will quote or rely on a document, read those parts
      yourself.
builds:
  - id: model-report
    title: Summarise an AI research paper or model report
    forPaths: [all]
    scenario: >-
      A new AI model or research paper is being talked about everywhere. You want to know what it really says
      before you repeat any claims.
    outcome: A summary with page numbers, and three points you checked yourself.
    steps:
      - title: Get the original PDF
        action: Download the paper or report from the official source, such as the company's site or a research archive.
        checkpoint: You have the original PDF, not a blog post about it.
      - title: Upload it
        action: Start a new conversation and upload the PDF.
        clickPath: [copilot.microsoft.com, Upload button in the message box]
        checkpoint: The file name appears in the message box.
      - title: Ask for a summary you can check
        action: Paste this prompt.
        prompt: |
          Summarise this document in 8 bullet points for someone learning about AI.
          After each point, give the page number where it comes from.
          Then list: the main claims, how they were tested, and any limitations the authors state.
          If something is unclear in the document, say so instead of guessing.
        checkpoint: Every bullet point has a page number, and limitations are listed.
      - title: Check three points
        action: Pick three points, including one with a number. Go to the page and read it.
        checkpoint: You have checked three points against the document.
      - title: Correct any mistakes
        action: 'If a point was wrong, tell Copilot: "Point [number] does not match page [number]. Correct it."'
        checkpoint: Every point you checked is now correct.
    proof:
      - Your checked summary, with the three points you verified
  - id: offer-terms
    title: Understand a job offer or contract
    forPaths: [all]
    scenario: >-
      You received a long offer letter, internship agreement or freelance contract. You want to understand the
      key terms before you reply.
    outcome: A plain-English list of the key terms, and questions to ask.
    steps:
      - title: Remove personal details
        action: Make a copy and remove your name, address and ID numbers. Upload the copy.
        clickPath: [copilot.microsoft.com, Upload button in the message box]
        checkpoint: The uploaded copy has no private details.
      - title: Ask for the key terms
        action: Paste this prompt.
        prompt: |
          Explain this document in plain English. List:
          1. Start date, length and working hours.
          2. Pay and any conditions attached to it.
          3. Anything I must do or must not do, including who owns work I create.
          4. Anything that seems unusual or unclear.
          Give the section or page for each point. Do not give legal advice.
        checkpoint: Each point has a section or page reference.
      - title: Check and write questions
        action: Check each point against the original, and write anything unclear as a question for the employer.
        checkpoint: You have checked every point and written your questions.
    proof:
      - Your list of key terms and questions
sources:
  - title: File upload in Microsoft Copilot
    url: https://support.microsoft.com/en-us/topic/file-upload-in-microsoft-copilot-8b7bf432-9576-4b16-9dee-6c19a4169e62
  - title: Microsoft Copilot age limits and parental controls
    url: https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-age-limits-and-parental-controls
lastReviewed: 2026-09-26
reviewNotes:
  - The exact name and icon of the upload button could not be confirmed. Look for a + or paperclip in the message box.
---

AI can explain a document, but it is not a lawyer. For anything that affects your pay, your rights or who owns your work, ask a professional.
