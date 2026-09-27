---
title: Learn an AI concept step by step in ChatGPT study mode
level: 1
order: 3
tool: ChatGPT
provider: OpenAI
toolUrl: https://chatgpt.com
summary: Use study mode to work through a hard AI idea with hints and questions, then prove you understand it by explaining it back.
outcome: A short explanation of one AI concept in your own words, checked by study mode and a trusted source.
minutes: 25
paths: [all]
access: You need a free OpenAI account.
freeTier:
  status: free-with-limits
  note: Study mode is free on every plan. Free accounts can upload only a few files each day.
whereToStart:
  - Go to chatgpt.com, sign in and click New chat.
  - To turn on study mode, click the + button next to the message box and choose Study. You can also search for "study" in that menu.
  - To add a file, click + and choose the option to add photos and files.
learn:
  - title: Study mode asks you questions
    text: >-
      Instead of handing you the answer, it gives hints, asks what you think and checks your understanding.
      It feels slower, and that is why it works.
  - title: Explaining it back is the real test
    text: >-
      If you can explain an idea simply, in your own words, you understand it. If you cannot, you have found
      exactly what to learn next.
  - title: Concepts beat tool tricks
    text: >-
      Tools change every few months. Ideas like tokens, training data, overfitting and evaluation stay useful
      for your whole career.
builds:
  - id: core-concept
    title: Work through one core AI concept
    forPaths: [all]
    scenario: >-
      There is one idea you keep getting stuck on, such as how a model is trained, what overfitting means,
      or why models hallucinate.
    outcome: Your own explanation of the concept, checked and corrected.
    steps:
      - title: Turn on study mode
        action: Start a new chat and turn on study mode.
        clickPath: [New chat, "+", Study]
        checkpoint: Study mode is shown as on near the message box.
      - title: Say what you already know
        action: Paste this prompt and fill in the brackets.
        prompt: |
          I want to understand [concept] for a career in [your target area].
          Here is what I already understand: [one or two sentences].
          Here is the part that confuses me: [one sentence].
          Help me work it out step by step. Ask me questions instead of giving the full answer.
        checkpoint: ChatGPT asks you a question about what you know.
      - title: Work through it honestly
        action: Answer each question. Say "I do not know" when you do not know.
        checkpoint: You have gone through at least four questions and hints.
      - title: Explain it back
        action: 'Write the idea in four or five sentences, then send: "Check my explanation. What is missing or wrong?"'
        checkpoint: Study mode tells you what is right and what is missing.
      - title: Check with a trusted source
        action: >-
          Compare your final explanation with a trusted source, such as a university course page or official
          documentation from an AI company.
        checkpoint: Your explanation matches the trusted source.
    proof:
      - Your explanation in your own words, with the source you checked it against
  - id: course-notes-quiz
    title: Quiz yourself on an AI course you are taking
    forPaths: [all]
    scenario: >-
      You are taking a free online AI course and have your own notes from the last module. You want to know
      what actually stuck.
    outcome: Ten questions from your notes, your answers, and a list of topics to revisit.
    steps:
      - title: Prepare one clean file
        action: Put your notes for one module into one document. Remove anything personal.
        checkpoint: You have one file with notes for one module only.
      - title: Upload the notes
        action: Start a new chat and upload the file.
        clickPath: [New chat, "+", Add photos and files]
        checkpoint: The file name appears above the message box.
      - title: Ask for questions, not answers
        action: Paste this prompt and send it with the file.
        prompt: |
          These are my notes from [course, module]. Use only these notes.
          Ask me 10 questions, one at a time. Mix short-answer and "explain why" questions.
          Wait for my answer before the next question.
          After each answer, tell me if I am right, and if I am wrong, give a hint before the answer.
          At the end, list the topics I got wrong.
        checkpoint: ChatGPT asks one question and waits for you.
      - title: Answer from memory
        action: Answer each question without looking at your notes.
        checkpoint: You have answered all 10 questions.
      - title: Check the marking
        action: Check any answer ChatGPT marked wrong against your notes or the course. Note any mistakes it made.
        checkpoint: You have checked the marking and listed topics to revisit.
    proof:
      - Your list of topics to revisit
  - id: read-api-code
    title: Understand a short piece of AI code
    forPaths: [ai-engineer, ml-data]
    scenario: >-
      You found a short code example that calls an AI model, in official documentation or a tutorial. You can
      copy it, but you do not really understand it yet.
    outcome: The code explained line by line in your own words, and one change you made and tested.
    steps:
      - title: Paste the code
        action: Start a new chat in study mode and paste the code example. Remove any API keys first.
        clickPath: [New chat, "+", Study]
        checkpoint: The code is pasted with no keys or passwords.
      - title: Ask to be guided, not told
        action: Paste this prompt under the code.
        prompt: |
          I want to understand this code line by line.
          Do not explain it all at once. Ask me what I think each part does, then correct me.
          At the end, suggest one small change I could make to test my understanding.
        checkpoint: Study mode asks you about the first part of the code.
      - title: Write your own comments
        action: Add a comment above each important line in your own words.
        checkpoint: Every important line has your own comment.
      - title: Make and test the change
        action: Make the suggested change and run the code if you can, or explain what you expect it to do.
        checkpoint: You made one change and know what it should do.
    proof:
      - The code with your own comments
sources:
  - title: Using study mode in ChatGPT
    url: https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt
  - title: File uploads FAQ
    url: https://help.openai.com/en/articles/8555545-file-uploads-faq
lastReviewed: 2026-09-26
reviewNotes:
  - The wording of the upload option under the + button may differ slightly. Look for the option that adds photos and files.
  - OpenAI says study mode does not work in Temporary Chats, GPTs or Projects. Use a normal chat.
---

Never paste API keys, passwords or private data into a chat, even when you are asking about code.
