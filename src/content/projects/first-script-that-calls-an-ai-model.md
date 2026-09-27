---
title: Write your first script that calls an AI model
level: 5
path: ai-engineer
order: 1
promise: Call an AI model from a short Python script, run it on a small test set and save the results, with your key kept out of the code.
outcome: A small public code repository with a script, a test set of five inputs, the saved outputs and a README that explains what you learned.
scenario: You want to move from using chatbots to building with AI. The first step every AI engineer takes is to call a model from code, feed it several inputs and look at the results side by side.
tools: [Python, Google AI Studio, Gemini API]
minutes: 240
beforeYouStart:
  - Install Python 3 and a code editor such as VS Code.
  - Get a free Gemini API key from Google AI Studio. Read the limits of the free tier on the official pricing and rate limit pages.
  - Know how to run a Python file from a terminal. If you do not, do a short Python basics course first.
steps:
  - title: Keep your key secret
    action: Save your API key as an environment variable called GEMINI_API_KEY. Never paste it into your code or upload it anywhere.
    checkpoint: Your code files do not contain the key, and your repository has a .gitignore that excludes any file with secrets.
  - title: Install the library
    action: Install the official Python library with the command from the Gemini API quickstart.
    prompt: "pip install -U google-genai"
    checkpoint: The install finishes without errors.
  - title: Run the quickstart
    action: Copy the Python example from the official quickstart page into a file and run it. Use the model name shown in the current documentation, because model names change.
    checkpoint: The script prints an answer from the model.
  - title: Make a test set
    action: Create a small file with five inputs for one task, such as summarising a paragraph in one sentence. Make one input very short and one messy.
    checkpoint: You have five inputs, and at least two of them are hard cases.
  - title: Loop and save
    action: Change the script so it sends each input with the same instruction and saves the input and output together in a CSV file.
    checkpoint: One run creates a CSV file with five rows.
  - title: Score the outputs
    action: Add two columns to the CSV. Write pass or fail for two rules you set before the run, such as "one sentence" and "no new facts".
    checkpoint: Every row is scored against both rules.
  - title: Write the README
    action: Explain what the script does, how to run it with your own key, your results and one thing you would improve next.
    checkpoint: Someone else could run your script from the README without asking you.
tests:
  - name: No secrets in the repository
    expected: A search of your repository for your key finds nothing.
  - name: Repeatable
    expected: Running the script again creates a new results file without errors.
  - name: Scored against rules set first
    expected: The README lists the two rules and when you wrote them.
safety:
  - Treat your API key like a password. If it leaks, delete it in Google AI Studio and create a new one.
  - Read the Gemini API terms before you send any data. Do not send private or client data in a practice project.
proof:
  - The public repository link
  - The results CSV with scores
  - The README
sources:
  - title: Gemini API quickstart
    url: https://ai.google.dev/gemini-api/docs/quickstart
  - title: Using Gemini API keys
    url: https://ai.google.dev/gemini-api/docs/api-key
lastReviewed: 2026-09-26
---
