---
title: Write a one-page spec for an AI feature, with tests
level: 5
path: ai-product
order: 1
promise: Plan one AI feature the way product teams do. The problem, the users, what the AI does, what could go wrong and how you will know it works.
outcome: A one-page feature spec with success measures, a risk list and ten test cases you have run against a chatbot as a rough prototype.
scenario: A company you know, or one you invent, wants to add an AI feature, such as suggested replies in a help desk. You want to show you can turn an idea into a clear plan with tests.
tools: [ChatGPT, Gemini, Claude]
minutes: 240
beforeYouStart:
  - Pick one feature idea and one kind of user. Keep it small.
  - Read two or three real product pages or help pages for similar features, so you know what exists.
steps:
  - title: Write the problem
    action: Write who has the problem, how often, and what it costs them today. Use real facts where you have them and label guesses.
    checkpoint: The problem is two or three sentences, with guesses marked.
  - title: Describe what the AI does
    action: Write what the user gives, what the AI gives back and what the user does next. Say what a person must still check.
    checkpoint: The flow has three steps and names the human check.
  - title: Set success measures
    action: Write two measures of success and one measure of harm, such as "share of suggested replies sent with small edits" and "replies with a wrong fact".
    checkpoint: Each measure could be counted in a real product.
  - title: List the risks
    action: List at least five things that could go wrong, such as wrong facts, private data, bias, misuse and users trusting it too much. Add one way to reduce each.
    checkpoint: Five risks, each with a plan.
  - title: Write ten test cases
    action: Write ten realistic inputs. Include easy ones, hard ones, one that is out of scope and one that tries to misuse the feature. Write what a good output does for each.
    checkpoint: Ten test cases with pass rules.
  - title: Prototype with a chatbot
    action: Write the instructions the feature would use and run your ten test cases in a chatbot. Mark pass or fail.
    prompt: "You suggest replies for [user] in [product]. Use only the information given. Reply in under [length] words. If the request is out of scope or unsafe, say so and suggest a person takes over. Input: [test case]"
    checkpoint: Every test case has a result and a pass or fail.
  - title: Finish the one-page spec
    action: Put the problem, flow, measures, risks and test results on one page. End with what you would test next with real users.
    checkpoint: The spec fits on one page and includes the test results.
tests:
  - name: Human in the loop
    expected: The spec says clearly what a person checks before the output reaches a customer.
  - name: Harm measured
    expected: At least one success measure tracks harm, not only usage.
  - name: Tested, not only planned
    expected: The spec includes results from all ten test cases.
safety:
  - If you use a real company as the example, say clearly that this is your own practice work and not a real plan from that company.
  - Use made-up customer data only.
proof:
  - The one-page spec
  - The ten test cases with results
sources: []
lastReviewed: 2026-09-26
---
