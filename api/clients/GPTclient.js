const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.GPT_KEY,
  })
);

async function generateStory(prompts) {
  console.log(prompts)
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompts,
    });
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("GPT client error, check your API key");
    const err = new Error(`GPT client error, check your API key`);
    err.status = 500;
    throw err;
  }
}

module.exports = generateStory;