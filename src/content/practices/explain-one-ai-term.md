---
title: Explain one AI term in two sentences
order: 4
minutes: 10
skill: AI concepts
stage: worked
paths: [all]
recallQuestion: Name two kinds of detail you should turn into labels before pasting text into an AI tool.
workedExample:
  situation: Tomas is a teacher moving into instructional design for AI products. A job advert asked for someone who can explain "retrieval augmented generation" to customers.
  input: "Explain retrieval augmented generation to a school head teacher in two sentences, with one everyday example."
  approach:
    - He asked for two sentences and a named reader, so the answer had to be short and plain.
    - He read the answer and underlined every word a head teacher might not know.
    - He asked the tool to replace those words, then checked the meaning against the glossary entry on this site.
    - He wrote the final version in his own words, without looking at the screen.
  output: "It is a way for an AI tool to look things up in your own documents before it answers, instead of relying only on what it learned in training. It is like a new staff member who checks the school handbook before answering a parent's question."
  whyItWorks: Writing it in his own words is the real test. If he could not do it without the screen, he did not understand it yet.
task:
  outcome: A two sentence explanation of one AI term, in your own words, for a named reader.
  steps:
    - Pick one AI term you have seen in a job advert or article, such as embeddings, fine-tuning or model card.
    - Ask an AI tool to explain it in two sentences for a reader you name, using the prompt below.
    - Check the meaning against the glossary on this site or one official source.
    - Close the tool and write your own two sentences from memory.
  prompt: "Explain [AI term] to [a named reader, for example my manager in finance] in two sentences. Add one everyday example. Avoid jargon."
successChecks:
  - Your explanation is two sentences and has one everyday example.
  - You checked the meaning against a second source.
  - You wrote the final version from memory, in your own words.
ifStuck: Start your first sentence with "It is a way to" and your second with "It is like".
connectedLesson: gemini-explain-it-three-ways
---
