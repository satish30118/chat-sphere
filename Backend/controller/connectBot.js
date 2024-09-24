const OpenAI = require("openai");

const client = new OpenAI({
  apiKey:
    "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",
});

const askGPT = async (req, res) => {
  const {question} = req.body;
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant who supports Liverpool FC",
        },
        { role: "user", content: question },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 300,
    });
    return res.json(response.choices[0].message.content);
  } catch (error) {
    console.log("Error in Chat Bot call", error);
  }
};

module.exports = askGPT