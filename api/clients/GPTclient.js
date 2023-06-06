const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(new Configuration({
  apiKey: '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'
}))

async function generateStory(prompts) {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompts
  })
  return res.data.choices[0].message.content
}

module.exports = generateStory