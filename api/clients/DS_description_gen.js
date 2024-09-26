const { Configuration, OpenAIApi } = require("openai");

const starter_prompts = [
  {
    role: "system",
    content: "I am going to send you the chapter from a book I am writing."
  },
  {
    role: "system",
    content: "Decide what the most important scene in the chapter is and return to me a prompt to send to an AI text to image generator so that it can create an excellent illustration of the scene"
  },
  {
    role: "system",
    content: "Mention all characters in the scene and decribe what they are doing."
  },
  {
    role: "system",
    content: "The prompt should be descriptive and concise and no longer that 30 words."
  },
]

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}))

async function DSDescriptionGen(chapter, genre, main_character, system_prompts=starter_prompts) {
  system_prompts.push({role: "user", content: `the main character in the painting is ${main_character}, but also include other characters in the chapter`})
  system_prompts.push({role: "user", content: `describe this "${chapter}"`})
  system_prompts.push({role: "user", content: `the genre of the story is ${genre}`})
  const res = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: system_prompts
  })
  system_prompts.push(res.data.choices[0].message)
  console.log(res.data.choices[0].message.content)
  return res.data.choices[0].message.content
}

module.exports = DSDescriptionGen