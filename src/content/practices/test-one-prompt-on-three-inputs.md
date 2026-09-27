---
title: Test one prompt on three different inputs
order: 10
minutes: 20
skill: Evaluation
stage: independent
paths: [ai-engineer, ai-product, no-code-builder]
recallQuestion: What are the three lines of a short case study?
workedExample:
  situation: Marco is building a small AI helper that turns messy notes into a task list. His prompt worked well on the first note he tried.
  input: "Turn these notes into a list of tasks with an owner and a due date. If there is no owner or date, write 'not given'."
  approach:
    - He ran the same prompt on three notes. A tidy one, a very short one and a long one with no dates.
    - The tidy note worked. The short note produced tasks that were not in it.
    - He added a line to the prompt. "Only list tasks that appear in the notes."
    - He ran all three again, and all three passed.
  output: A prompt that works on three kinds of input, and a small test set he can run again after every change.
  whyItWorks: A prompt that works once may fail on different input. Testing on a few varied examples is the simplest form of the evaluation that AI teams do every day.
task:
  outcome: One prompt tested on three different inputs, with one improvement and a retest.
  steps:
    - Pick a prompt you use often, or write one for a repeat task.
    - Find three inputs. One normal, one very short and one messy or unusual.
    - Run the prompt on all three and note where it fails.
    - Change one thing in the prompt and run all three again.
  prompt: "[your prompt] Input: [paste input 1, then run again with input 2 and input 3]"
successChecks:
  - You used three inputs that are clearly different from each other.
  - You changed only one thing before retesting, so you know what made the difference.
  - You saved the three inputs so you can run the test again later.
ifStuck: The most useful test input is usually the one with missing information. See what the tool does when it has less to go on.
connectedLesson: chatgpt-ask-a-clear-first-question
---
