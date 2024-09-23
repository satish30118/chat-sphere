const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey:
    "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",
});

const openai = new OpenAIApi(configuration);

async function askGPT(question) {
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: question,
    max_tokens: 100,
  });
  console.log(response.data.choices[0].text);
}

askGPT("What is ChatGPT?");
