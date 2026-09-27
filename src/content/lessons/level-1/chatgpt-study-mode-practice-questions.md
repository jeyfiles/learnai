---
title: Turn your notes into practice questions with ChatGPT
level: 1
order: 3
tool: ChatGPT
provider: OpenAI
toolUrl: https://chatgpt.com
summary: Upload your own class notes and use study mode to get questions, hints and feedback instead of ready-made answers.
outcome: A set of practice questions from your own notes, and a list of topics to revise again.
minutes: 25
learnerTypes: [school, college-engineering, college-other, educator]
minAge: 13
ageNote: >-
  ChatGPT is for ages 13 and over. If you are 13 to 17, you need a parent's permission. Teen
  accounts can also set study hours so new chats start in study mode.
freeTier:
  status: free-with-limits
  note: Study mode is free. Free accounts can upload only a few files each day, so upload one clear file.
whereToStart:
  - Go to chatgpt.com, sign in and click New chat.
  - To add a file, click the + button next to the message box and choose the option to add photos and files.
  - To turn on study mode, click + and choose Study. You can also search for "study" in that menu.
learn:
  - title: Your notes are better than a general answer
    text: >-
      When you upload your own notes, the questions match what your teacher taught. Ask ChatGPT to use
      only your notes, so it does not bring in topics from a different syllabus.
  - title: Study mode asks you questions
    text: >-
      In study mode, ChatGPT gives hints, asks follow-up questions and checks your understanding
      instead of just giving the answer. It is slower, and that is the point.
  - title: Getting a question wrong is useful
    text: >-
      Each wrong answer shows you a gap. Keep a list of those gaps. That list is your revision plan.
builds:
  - id: notes-quiz
    title: Quiz yourself from your class notes
    forLearners: [school, college-engineering, college-other]
    scenario: >-
      You have a test on one chapter next week. You have your own notes, either typed or as clear
      photos of your notebook.
    outcome: Ten practice questions from your notes, your answers, and a list of weak topics.
    steps:
      - title: Prepare one clean file
        action: >-
          Put the chapter notes into one document or take two or three clear photos. Remove your name
          and anything personal.
        checkpoint: You have one file or a few photos of the notes for one chapter only.
      - title: Upload the notes
        action: Start a new chat and upload the file.
        clickPath: [New chat, "+", Add photos and files]
        checkpoint: The file name or photo appears above the message box.
      - title: Ask for questions, not answers
        action: Paste this prompt and send it with the file.
        prompt: |
          These are my notes for [subject, chapter]. Use only these notes.
          Ask me 10 questions, one at a time. Mix short-answer and "explain why" questions.
          Wait for my answer before the next question.
          After each answer, tell me if I am right, and if I am wrong, give a hint before the answer.
          At the end, list the topics I got wrong.
        checkpoint: ChatGPT asks one question and waits for you.
      - title: Answer without looking
        action: Answer each question from memory. Do not look at your notes until you have answered.
        checkpoint: You have answered all 10 questions.
      - title: Check the facts
        action: >-
          For every answer ChatGPT marked right or wrong, check it against your notes or textbook.
          If ChatGPT is wrong, write that down too.
        checkpoint: You have checked each marking against your notes.
    proof:
      - Your list of weak topics
      - Any places where ChatGPT marked you wrongly
  - id: study-mode-concept
    title: Learn a hard idea step by step in study mode
    forLearners: [college-engineering, school, college-other]
    scenario: >-
      There is one idea you keep getting stuck on, like Kirchhoff's laws, supply and demand, or how
      enzymes work. Reading the answer again has not helped.
    outcome: A short explanation of the idea in your own words, checked by study mode.
    steps:
      - title: Turn on study mode
        action: Start a new chat and turn on study mode.
        clickPath: [New chat, "+", Study]
        checkpoint: Study mode is shown as on near the message box.
      - title: Say what you already know
        action: Paste this prompt and fill in the brackets.
        prompt: |
          I am studying [topic] for [class or course].
          Here is what I already understand: [one or two sentences].
          Here is the part that confuses me: [one sentence].
          Help me work it out step by step. Ask me questions instead of giving the full answer.
        checkpoint: ChatGPT asks you a question about what you know.
      - title: Work through it
        action: Answer its questions honestly. Say "I do not know" when you do not know.
        checkpoint: You have gone through at least four questions and hints.
      - title: Explain it back
        action: 'Write the idea in three or four sentences, then send: "Check my explanation. What is missing or wrong?"'
        checkpoint: Study mode tells you what is right and what is missing.
      - title: Check with your textbook
        action: Compare your final explanation with your textbook or class notes.
        checkpoint: Your explanation matches your textbook.
    proof:
      - Your explanation in your own words
  - id: teacher-question-bank
    title: Build a question bank from your lesson notes
    forLearners: [educator]
    scenario: >-
      You want a mix of quick-check questions for the end of a lesson, based on your own teaching
      notes and pitched at your class level.
    outcome: A checked set of questions with answers, ready to use in class.
    steps:
      - title: Upload your lesson notes
        action: Start a new chat and upload your notes for one lesson. Remove student names.
        clickPath: [New chat, "+", Add photos and files]
        checkpoint: The file is attached.
      - title: Ask for a question set
        action: Paste this prompt.
        prompt: |
          These are my lesson notes for [subject, topic] for [age group]. Use only these notes.
          Write 8 questions: 3 recall, 3 "explain why" and 2 that apply the idea to a new example.
          Give an answer for each, and name the part of my notes it comes from.
        checkpoint: Every question has an answer and a link back to your notes.
      - title: Check every answer
        action: Read each answer yourself. Fix or remove any that are wrong or too hard for your class.
        checkpoint: You have checked all 8 questions and answers.
    proof:
      - Your checked question set
sources:
  - title: Using study mode in ChatGPT
    url: https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt
  - title: File uploads FAQ
    url: https://help.openai.com/en/articles/8555545-file-uploads-faq
  - title: ChatGPT for Teens
    url: https://help.openai.com/en/articles/20001421-chatgpt-for-teens
lastReviewed: 2026-09-26
reviewNotes:
  - The wording of the upload option under the + button may differ slightly. Look for the option that adds photos and files.
---

Do not upload other people's work, test papers you are not allowed to share, or anything with private details in it.
