const OpenAI = require("openai");

const client = new OpenAI({
  apiKey:
    "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",
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: "hello" }],
    model: "gpt-3.5-turbo",
  });
  console.log(chatCompletion.choices[0].message);
}

main();
