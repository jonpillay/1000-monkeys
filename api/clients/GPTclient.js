import { config } from "dotenv";
config()

import { Configuration, OpenAIApi } from "openai"

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.GPT_KEY
}))

async function generateStory(prompts) {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompts
  })
  console.log(res.data.choices[0].message.content)
}

export default generateStory