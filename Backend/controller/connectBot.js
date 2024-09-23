const OpenAI = require("openai");

const client = new OpenAI({
  apiKey:
    "sk-svcacct-Nig3hA1-3EyIjEb1rIyMpL7ck76401rSvStInuFH9G2LAkH9RoSg9WsPZMijXUTT3BlbkFJDn9j95R4j3GPE6ZyJD2xw4E5RS0kEOsgqAu3eobEP_DFSqA65Nk90v0phv57VqgA",
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });
  console.log(chatCompletion.choices[0].message);
}

main();
