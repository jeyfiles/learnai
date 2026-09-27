---
title: Write your scoring rules before you ask
order: 6
minutes: 15
skill: Evaluation
stage: guided
paths: [ai-product, ai-engineer]
recallQuestion: Why is it better to choose which cells to check before you read a table?
workedExample:
  situation: Kofi is a support team lead who wants to become an AI product manager. He wanted AI to draft replies to customer complaints and needed a fair way to judge them.
  input: "Before asking, he wrote three rules. 1. Says sorry once, not three times. 2. Gives one clear next step. 3. Under 80 words."
  approach:
    - He wrote the rules first, so the answer could not change what he thought good looked like.
    - He asked the tool for a reply to one real complaint, with names removed.
    - He scored the reply against each rule as pass or fail.
    - It failed the length rule, so he asked for a shorter version and scored it again.
  output: A reply that passed all three rules, plus a small score sheet he could reuse for every future reply.
  whyItWorks: Deciding what good looks like before you see an answer stops you from accepting whatever sounds confident. This is how AI teams test their products.
task:
  outcome: Three scoring rules for one real task, and one AI answer scored against them.
  steps:
    - Choose a task you might hand to AI, such as a reply, a summary or a plan.
    - Write three rules a good answer must pass. Make each one something you can check as yes or no.
    - Ask an AI tool to do the task.
    - Score the answer on each rule, then ask for one improvement if any rule fails.
  prompt: "Here is my task: [task]. A good answer must [rule 1], [rule 2] and [rule 3]. Write the answer, then tell me which rules you think it meets."
successChecks:
  - You wrote all three rules before you saw any answer.
  - Each rule can be checked as yes or no.
  - You scored the answer yourself instead of trusting the tool's own score.
ifStuck: Turn a feeling into a test. "Clear" could become "a reader can say the next step after one read".
connectedLesson: compare-two-ai-tools
---
