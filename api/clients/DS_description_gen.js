const { Configuration, OpenAIApi } = require("openai");

const starter_prompts = [
  {
    role: "system",
    content: "I am going to send you the chapter from a book I am writing."
  },
  {
    role: "system",
    content: "Decide what the most important scene in the chapter is and return to me a written visualisation of that scene."
  },
  {
    role: "system",
    content: "It will be used as a prompt for a text to inmage generator."
  },
  {
    role: "system",
    content: "In the first sentance describe where the main characters are and what they are doing."
  },
  {
    role: "system",
    content: "In the second sentance describe anything around the main characters."
  },
  {
    role: "system",
    content: "The prompt should be concise. Only describe the physical scene, nothing metaphysical."
  },
  {
    role: "system",
    content: "The prompt should be around 20 words."
  },
]

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}))

async function DSDescriptionGen(chapter, genre, main_character, system_prompts=starter_prompts) {
  system_prompts.push({role: "user", content: "This is the chapter"})
  system_prompts.push({role: "user", content: `${chapter}`})
  system_prompts.push({role: "user", content: `the genre of the story is ${genre}`})
  const res = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: system_prompts
  })
  system_prompts.push(res.data.choices[0].message)

  return res.data.choices[0].message.content
}

module.exports = DSDescriptionGen