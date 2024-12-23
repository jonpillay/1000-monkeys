// const { Configuration, OpenAI } = require("openai");
// import OpenAI from "openai";
const {OpenAI} = require("openai")

// console.log("Here but no key")
// console.log(process.env.OPENAI_API_KEY)


async function generateStory(prompts) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: prompts,
    });

    // console.log(res)

    return res.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw {
        status: error.status || 500,
        message: "OpenAI API Error",
        details: error.message,
      }
    } else {
      console.log(error)
      throw {
        status: 500,
        message: "Backend Server Issues"
      }
    }

  }
}

module.exports = generateStory;