// const { Configuration, OpenAIApi } = require("openai");
// import OpenAI from "openai";
const {OpenAI} = require("openai")

const starter_prompts = [
  {
    role: "system",
    content: "I am going to send you the chapter from a book I am writing."
  },
  {
    role: "system",
    content: "Decide what the most important scene in the chapter is and return a written visualisation of that scene."
  },
  {
    role: "system",
    content: "It should be structured as a prompt for a text to image AI tool."
  },
  {
    role: "system",
    content: "You should first describe what the main characters are doing."
  },
  {
    role: "system",
    content: "and then describe what setting they are in"
  },
  {
    role: "system",
    content: "Only what can be illustrated, nothing metaphysical."
  },
  {
    role: "system",
    content: "The prompt should be concise and no longer than 20 words."
  },
]

async function DSDescriptionGen(chapter, genre, main_character, system_prompts=starter_prompts) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  system_prompts.push({role: "user", content: "This is the chapter"})
  system_prompts.push({role: "user", content: `${chapter}`})
  system_prompts.push({role: "user", content: `the genre of the story is ${genre}`})
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: system_prompts
  })
  system_prompts.push(res.choices[0].message)

  const DCPrompts = res.choices[0].message.content

  return DCPrompts
}

module.exports = DSDescriptionGen