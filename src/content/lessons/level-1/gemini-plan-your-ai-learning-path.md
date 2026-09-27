---
title: Plan your AI learning path with Gemini
level: 1
order: 5
tool: Gemini
provider: Google
toolUrl: https://gemini.google.com
summary: Give Gemini your target role, your starting point and your real free time, and get a four-week plan you can actually follow.
outcome: A four-week learning plan for your target AI path, with a weekly build and a backup plan for busy weeks.
minutes: 20
paths: [all]
access: You need a Google Account.
freeTier:
  status: free
  note: Everything in this lesson works on the free plan.
whereToStart:
  - Go to gemini.google.com and sign in with your Google Account.
  - Click New chat to start fresh.
  - Have your weekly schedule and one job posting for your target role open next to you.
learn:
  - title: Plans fail when they ignore real life
    text: >-
      A plan that fills every free hour breaks in the first busy week. Tell Gemini about work, classes,
      travel and family time, and when you are usually too tired to learn.
  - title: Learn, then build, every week
    text: >-
      Watching courses feels like progress. Building something small with what you learned is what employers
      can see. Every week in your plan should end with a small piece of proof.
  - title: Plans should come from real job posts
    text: >-
      Build your plan around what real job postings ask for, not around what a course advert says. Paste a
      real posting so the plan matches the market.
builds:
  - id: four-week-plan
    title: Make a four-week plan for your target role
    forPaths: [all]
    scenario: >-
      You know roughly which AI path you want, but not where to start. You have a few hours a week and one
      job posting that looks like where you want to be.
    outcome: A four-week plan with weekly topics, one small build per week and a backup plan.
    steps:
      - title: Write down your starting point
        action: >-
          Note your background, what you already know about AI, your coding comfort from 1 to 5, and how
          many hours you can give each week.
        checkpoint: You have your starting point written down.
      - title: Ask for the plan
        action: Start a new chat and paste this prompt.
        clickPath: [gemini.google.com, New chat]
        prompt: |
          Help me plan the next 4 weeks of learning toward this role: [target role].
          Here is a real job posting for it: [paste it].
          My background: [paste]. Coding comfort (1 to 5): [number]. Time per week: [hours].
          Rules:
          - Each week has one topic, free learning resources from official sites or universities, and one small build I can show.
          - Put the most important skill from the posting first.
          - Do not plan more than [hours] hours in any week.
          Show it as a table. Then add a short backup plan for a week when I only have half the time.
        checkpoint: The plan is a table with a small build each week and a backup plan.
      - title: Check the resources
        action: >-
          Open every resource in the plan. Remove any that do not exist, cost money you do not want to spend, or
          come from a site selling a course.
        checkpoint: Every resource left in the plan exists and is free.
      - title: Make it realistic
        action: 'If the plan looks too full, ask: "Cut 25 percent. Keep the builds, trim the reading."'
        checkpoint: The plan feels possible for your real week.
      - title: Put week 1 in your calendar
        action: Add the week 1 learning sessions and the build to your calendar.
        checkpoint: Week 1 is in your calendar.
    proof:
      - Your four-week plan
  - id: weekly-rhythm
    title: Set a weekly rhythm of learning, building and applying
    forPaths: [ai-professional, ai-product, no-code-builder]
    scenario: >-
      You are working full time or job hunting. You want a steady rhythm that mixes learning AI, building
      small things and applying for roles.
    outcome: A repeatable weekly rhythm with a tick column you can use every week.
    steps:
      - title: List your weekly tasks
        action: List what you want to do each week, such as "one lesson", "one small build", "apply to three roles" and "one post about what I built".
        checkpoint: You have a task list.
      - title: Ask for a rhythm
        action: Start a new chat and paste this prompt.
        clickPath: [gemini.google.com, New chat]
        prompt: |
          I have about [time] on weekdays and [time] at weekends.
          My weekly tasks: [paste your list].
          Make a simple weekly rhythm that repeats every week, with one rest day.
          Keep each day small enough to finish. Show it as a table with a column for ticking tasks off.
        checkpoint: Every day has a small, clear task and there is a rest day.
      - title: Test it for one week
        action: Follow the rhythm for one week, then ask Gemini to adjust it based on what did not work.
        checkpoint: You have a rhythm you tested for a real week.
    proof:
      - Your weekly rhythm table
sources:
  - title: What you need to sign in to Gemini Apps
    url: https://support.google.com/gemini/answer/13278668?hl=en
lastReviewed: 2026-09-26
reviewNotes: []
---

Review your plan at the end of each week. If you fall behind, do not start over. Ask Gemini to adjust the remaining weeks.
