---
title: Plan a realistic week with Gemini
level: 1
order: 5
tool: Gemini
provider: Google
toolUrl: https://gemini.google.com
summary: Give Gemini your real deadlines and free time, and get a week plan you can actually follow.
outcome: A one-week plan that fits your real timetable, with a backup plan for a bad day.
minutes: 15
learnerTypes: [all]
minAge: 13
ageNote: >-
  Gemini is for ages 13 and over (or the minimum age in your country) with a personal or school
  Google Account.
freeTier:
  status: free
  note: Everything in this lesson works on the free plan.
whereToStart:
  - Go to gemini.google.com and sign in with your Google Account.
  - Click New chat to start fresh.
  - Have your deadlines and your weekly timetable open next to you.
learn:
  - title: Plans fail when they ignore real life
    text: >-
      A plan that fills every free minute breaks on the first busy day. Tell Gemini about travel time,
      sports practice, family duties and when you are usually tired.
  - title: Put the hardest work where you have the most energy
    text: >-
      Say when you focus best. Ask Gemini to place difficult tasks in those slots and easy tasks in the
      rest.
  - title: A backup plan is part of the plan
    text: >-
      Ask for a short "if I miss a day" version. It stops one bad day from wrecking the whole week.
builds:
  - id: exam-week
    title: Plan a week before a test
    forLearners: [school, college-engineering, college-other]
    scenario: >-
      You have two tests and one assignment due in the next eight days, plus school or college,
      travel and other activities.
    outcome: A day-by-day plan with times, and a backup version.
    steps:
      - title: Write down your real week
        action: >-
          List each day with the hours you are busy, when you travel and when you have free time. Add
          each deadline and how ready you feel for it, from 1 to 5.
        checkpoint: You have your week and deadlines written down.
      - title: Ask for a plan
        action: Start a new chat in Gemini and paste this prompt.
        clickPath: [gemini.google.com, New chat]
        prompt: |
          Help me plan my next 7 days. Here is my week: [paste your week].
          My deadlines and how ready I feel (1 to 5): [paste them].
          I focus best in the [morning, afternoon or evening].
          Rules:
          - Do not plan more than [number] hours of study on a school day.
          - Put the hardest subject in my best focus time.
          - Include short breaks and one free evening.
          Give me a day-by-day table with times. Then give a short backup plan for if I miss a day.
        checkpoint: The plan is a table with times and has a backup plan.
      - title: Check it against your timetable
        action: Check each study block against your real week. Fix any block that clashes with something else.
        checkpoint: Nothing in the plan clashes with your timetable.
      - title: Make it lighter if needed
        action: 'If the plan looks too full, ask: "Cut 20 percent. Keep the most important tasks for my tests."'
        checkpoint: The plan feels possible for you, not just on paper.
      - title: Put it where you will see it
        action: Copy the final plan into your calendar, planner or phone notes.
        checkpoint: The plan is saved where you will see it every day.
    proof:
      - Your final week plan
  - id: job-search-week
    title: Plan a week of job or internship applications
    forLearners: [job-seeker, career-switcher, college-engineering, college-other]
    scenario: >-
      You want to apply for internships or jobs, but it keeps sliding because there is no clear plan.
      You have about an hour on most days.
    outcome: A week plan that mixes applications, skill practice and rest.
    steps:
      - title: List what needs doing
        action: List your tasks, such as "update resume", "apply to 5 roles", "practise interview answers" and "learn one skill".
        checkpoint: You have a task list.
      - title: Ask for a balanced plan
        action: Start a new chat and paste this prompt.
        clickPath: [gemini.google.com, New chat]
        prompt: |
          I am looking for [type of role]. I have about [time] on weekdays and [time] at weekends.
          My tasks: [paste your list].
          Make a 7-day plan that mixes applications, skill practice and one rest day.
          Keep each day small enough that I can finish it. Show it as a table.
        checkpoint: Every day has a small, clear set of tasks and there is a rest day.
      - title: Add one tracking column
        action: 'Ask: "Add a column where I can tick each task when it is done."'
        checkpoint: The table has a tick column.
    proof:
      - Your week plan with tick column
sources:
  - title: What you need to sign in to Gemini Apps
    url: https://support.google.com/gemini/answer/13278668?hl=en
lastReviewed: 2026-09-26
reviewNotes: []
---

Review your plan on day 3. If you are behind, do not start over. Ask Gemini to adjust the remaining days.
