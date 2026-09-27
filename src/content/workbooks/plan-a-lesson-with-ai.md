---
title: Plan a lesson with AI as your assistant
level: 1
order: 4
promise: Plan one lesson with AI help, with activities, a quick check and support for different learners.
outcome: A one-lesson plan, a short quiz and a help sheet, all checked by you.
minutes: 60
learnerTypes:
- educator
tools:
- Gemini
- ChatGPT
beforeYouStart:
- Choose one lesson you will teach soon.
- Have the learning objective and your syllabus notes ready.
- Check your school's rules on using AI for planning.
- Do not include any student names or details.
versions:
- learnerType: educator
  title: School classroom
  brief: A 40 to 45 minute lesson for a school class.
- learnerType: educator
  title: College tutorial
  brief: A one-hour tutorial or lab session for college students.
parts:
- title: Plan the lesson
  purpose: Get a first plan that matches your objective.
  steps:
  - title: Ask for a plan
    action: Paste your objective and constraints.
    clickPath:
    - gemini.google.com
    - New chat
    prompt: 'I teach [subject] to [age group]. Objective: [paste]. Lesson length: [minutes]. Make a timed lesson plan with a hook, one main activity, a pair or group task and a 5-minute check for understanding. Use only ideas that fit this syllabus: [paste key points].'
    checkpoint: You get a timed plan that matches your objective.
  - title: Edit for your class
    action: Change anything that does not fit your students, room or resources.
    checkpoint: The plan fits your real class.
- title: Make the check and the support
  purpose: Create a quick quiz and a help sheet.
  steps:
  - title: Write a short quiz
    action: Ask for five questions with answers.
    clickPath:
    - chatgpt.com
    - New chat
    prompt: 'For this lesson objective: [paste], write five quick check questions with answers: two recall, two explain, one apply. Match the level of [age group].'
    checkpoint: You have five questions with answers.
  - title: Check every answer
    action: Check each answer against your syllabus or textbook.
    checkpoint: All five answers are correct.
  - title: Make a help sheet
    action: Ask for a one-page help sheet with key terms and a worked example for students who need support.
    checkpoint: You have a help sheet you checked.
tests:
- The plan fits your time limit.
- Every quiz answer is correct.
- Nothing in the plan goes beyond your syllabus without you choosing it.
proof:
- Your lesson plan
- Your quiz
- Your help sheet
sources:
- title: 'UNESCO: Guidance for generative AI in education and research'
  url: https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research
lastReviewed: '2026-09-26'
---
