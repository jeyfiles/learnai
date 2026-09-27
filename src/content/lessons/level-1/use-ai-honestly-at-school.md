---
title: Use AI honestly at school
level: 1
order: 1
tool: Any AI chat tool
provider: Works with ChatGPT, Gemini, Copilot and others
summary: Find out what your school allows, decide where AI can help you, and write a short note that says how you used it.
outcome: Your own AI rules for schoolwork, and a use note you can attach to an assignment.
minutes: 20
learnerTypes: [all]
minAge: 13
ageNote: >-
  This lesson works with any chat tool you are allowed to use. Most tools need you to be 13 or older,
  and some need a parent's permission until you turn 18.
freeTier:
  status: free
  note: Every tool used here has a free plan. You do not need to pay for anything.
whereToStart:
  - Find your school or college rules on AI. Look in your student handbook, your course page or your class group, or ask your teacher.
  - Open any AI chat tool you are allowed to use, such as ChatGPT, Gemini or Microsoft Copilot.
  - Keep a notes app or a sheet of paper next to you. You will write your own rules in it.
learn:
  - title: Your teacher's rules come first
    text: >-
      Schools and colleges have different rules. Some let you use AI to plan and check your work.
      Some ban it for certain tasks, like take-home tests. If the rules are not clear, ask before you use AI,
      not after.
  - title: Help with thinking is different from doing the work
    text: >-
      Asking AI to explain a topic, quiz you or point out a weak paragraph helps you learn.
      Asking it to write the answer you hand in skips the learning, and usually breaks the rules.
      A simple test: could you explain every line of your work without the tool open?
  - title: Say how you used it
    text: >-
      When you use AI on graded work, add a short note. Name the tool, say what you asked it to do,
      and say what you changed or checked yourself. Many teachers and style guides, including APA,
      ask for this.
builds:
  - id: my-ai-rules
    title: Write your own AI rules for schoolwork
    forLearners: [school, college-engineering, college-other]
    scenario: >-
      You have three pieces of work this month: a history essay, a maths worksheet and a group science
      project. You want to know where AI can help without getting you into trouble.
    outcome: A one-page list of what you will and will not use AI for, based on your school's rules.
    steps:
      - title: Collect the rules
        action: >-
          Find your school's AI rules and copy the key lines into your notes. If there are none,
          write down what your teacher said in class, or send them a short question.
        checkpoint: You have at least one written rule from your school or teacher, or a question ready to send.
      - title: List your real tasks
        action: >-
          Write down three pieces of work you have coming up. Next to each one, note the subject,
          the due date and whether it is graded.
        checkpoint: You have a list of three real tasks.
      - title: Ask the AI to sort helping from doing
        action: Open your chat tool and paste this prompt. Replace the parts in square brackets.
        prompt: |
          I am a student. Here are my school's rules on AI: [paste the rules].
          Here are three tasks I have coming up: [paste your list].
          For each task, make two short lists:
          1. Ways AI could help me learn without doing the work for me.
          2. Ways of using AI that would break these rules or skip the learning.
          If a rule is unclear, say so and suggest a question I could ask my teacher.
          Do not do any of the tasks.
        checkpoint: The answer gives two lists for each task and does not start doing the work.
      - title: Check it against the real rules
        action: >-
          Read each suggestion and compare it with your school's rules. Cross out anything the rules
          do not allow, even if the AI said it was fine. The AI does not know your school.
        checkpoint: Every item left on your list is allowed by your school's rules.
      - title: Write your rules in your own words
        action: >-
          Write five to eight short rules for yourself, such as "I use AI to quiz me before tests" or
          "I never paste AI text into an essay". Keep them where you will see them.
        checkpoint: You have a short list of rules written in your own words.
    proof:
      - Your list of AI rules for schoolwork
      - The question you sent your teacher, if a rule was unclear
  - id: use-note
    title: Write an AI use note for an assignment
    forLearners: [all]
    scenario: >-
      You used a chat tool to get feedback on a lab report draft. Your teacher asks students to say
      when they used AI. You need a short, honest note to add at the end.
    outcome: A short AI use note, and a reference in the style your course uses.
    steps:
      - title: Look back at what you did
        action: >-
          Open the chat you used. Write down the tool's name, the date and what you asked it to do in
          one sentence each.
        checkpoint: You know the tool, the date and what you asked for.
      - title: Note what you changed yourself
        action: >-
          List what you kept, what you changed and what you checked in other places, such as your
          textbook or class notes.
        checkpoint: You can point to at least one thing you checked or changed yourself.
      - title: Draft the note with help
        action: Paste this prompt into your chat tool and fill in the brackets.
        prompt: |
          Help me write a short, honest note for my teacher about how I used AI on an assignment.
          Tool: [name]. Date: [date].
          What I asked it to do: [one sentence].
          What I kept, changed and checked myself: [your list].
          Keep it under 80 words and plain. Do not make my use sound smaller or bigger than it was.
        checkpoint: The draft matches what you really did, with nothing added or left out.
      - title: Add a reference if your course needs one
        action: >-
          Ask your teacher which style to use. APA Style, for example, lists the company, the year,
          the tool name, the words "Large language model" in square brackets and the web address.
          Follow your course's guide exactly.
        checkpoint: Your note and reference follow your course's style, or you have asked which style to use.
    proof:
      - Your AI use note
      - The reference, if your course asked for one
  - id: class-ai-rules
    title: Draft clear AI rules for your class
    forLearners: [educator]
    scenario: >-
      You teach a class that starts a research project next week. Students keep asking what is allowed.
      You want one clear page that matches your school's policy.
    outcome: A one-page AI guide for students, with examples of allowed and not allowed use.
    steps:
      - title: Start from your school's policy
        action: Copy the parts of your school's AI policy that apply to this project into a document.
        checkpoint: You have the policy text that applies to this class.
      - title: Ask for a student-friendly draft
        action: Paste this prompt into your chat tool.
        prompt: |
          I teach [subject] to [age group]. Here is my school's AI policy: [paste it].
          The project is: [one or two sentences].
          Write a one-page guide for students with:
          1. Three examples of allowed AI use for this project.
          2. Three examples that are not allowed.
          3. How to write a short AI use note.
          Use plain words a [age] year old understands. Do not add rules that are not in the policy.
        checkpoint: Every rule in the draft comes from your school's policy.
      - title: Test it with a tricky case
        action: >-
          Think of one grey area, such as a student asking AI to fix grammar in their final draft.
          Check that the guide gives a clear answer, and add one line if it does not.
        checkpoint: The guide answers your grey-area case clearly.
    proof:
      - Your one-page AI guide for the class
sources:
  - title: "APA Style: How to cite ChatGPT"
    url: https://apastyle.apa.org/blog/how-to-cite-chatgpt
  - title: "UNESCO: Guidance for generative AI in education and research"
    url: https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research
lastReviewed: 2026-09-26
reviewNotes: []
---

A quick test before you open a chat tool for schoolwork: could you explain the result to your teacher without the tool open? If not, change how you are using it.
