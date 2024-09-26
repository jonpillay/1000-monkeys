const { Configuration, OpenAIApi } = require("openai");

const starter_prompts = [
  {
    role: "system",
    content: "You are my Audio Description assistant. You purpose is to read text, then decide what the most important scene in the text is and then return an Audio Description text of of that scene which is 15 to 20 words long."
  },
  {
    role: "system",
    content: "Remember to mention all the characters."
  },
  {
    role: "system",
    content: "Do not return anything longer than 15 words"
  },
]

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}))

async function DSDescriptionGen(chapter, genre, main_character, system_prompts=starter_prompts) {
  system_prompts.push({role: "user", content: `the main character in the painting is ${main_character}, but also include other characters in the chapter`})
  system_prompts.push({role: "user", content: `pick the main scene from this chapter to describe = ${chapter}`})
  system_prompts.push({role: "user", content: `the genre of the story is ${genre}`})
  const res = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: system_prompts
  })
  system_prompts.push(res.data.choices[0].message)
  return res.data.choices[0].message.content
}

module.exports = DSDescriptionGen