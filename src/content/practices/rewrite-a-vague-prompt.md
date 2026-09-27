---
title: Rewrite a vague prompt
order: 1
minutes: 10
skill: Prompting
stage: worked
paths: [all]
recallQuestion: Think of the last question you typed into an AI tool. What did you leave out that the tool had to guess?
workedExample:
  situation: Maya works in hotel operations and wants to move into an AI role. She asked a chatbot for help with guest reviews and got a long, general answer about customer service.
  input: "Help me with guest reviews."
  approach:
    - She named her role and her goal. "I manage a 60 room hotel. I want to find the three most common complaints in last month's reviews."
    - She said what she would give the tool. "I will paste 20 reviews below. Names are removed."
    - She asked for a format she could use straight away. "Give me a table with the complaint, how many reviews mention it, and one short quote."
    - She added one limit. "Only use what is in the reviews. If a complaint appears once, leave it out."
  output: A table with three complaints (slow check-in, noisy rooms near the lift, cold breakfast), a count for each and a quote she could check against the reviews.
  whyItWorks: The first prompt made the tool guess who she was, what she had and what she wanted back. The new prompt answers all three, so the tool has less to guess and she has something she can check.
task:
  outcome: One prompt from your own work or study, rewritten so a stranger could act on it.
  steps:
    - Pick a real question you would ask an AI tool this week. Write it down exactly as you would first type it.
    - Add who you are and what you want to achieve, in one sentence.
    - Add what you will give the tool, and what format you want back.
    - Add one limit, such as a length, a source rule or something to leave out.
    - Run both versions in any AI tool and compare the two answers side by side.
  prompt: "I am a [your role]. I want to [goal]. I will give you [what you will paste]. Please reply with [format, for example a table with three columns]. Only use [limit, for example the text I paste]."
successChecks:
  - Your new prompt says who you are, what you want, what you are giving and what format you want back.
  - The second answer is easier to use than the first, and you can say why in one sentence.
  - You did not paste anything private, such as names, phone numbers or client details.
ifStuck: Read your prompt as if you were a new colleague on their first day. Every question they would ask you is something to add.
connectedLesson: chatgpt-ask-a-clear-first-question
---
