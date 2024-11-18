// const { Configuration, OpenAI } = require("openai");
// import OpenAI from "openai";
const {OpenAI} = require("openai")

// console.log("Here but no key")
// console.log(process.env.OPENAI_API_KEY)


async function generateStory(prompts) {

  console.log("Shitty here")
  console.log(process.env.OPENAI_API_KEY)

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: prompts,
    });

    console.log(res.choices[0].message.content)

    return res.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.log(error)
      console.log(error.status); // 400
      console.log(error.name); // BadRequestError
      console.log(error.headers); // {server: 'nginx', ...}
    } else {
      console.log(error)
      // console.error("GPT client error, check your API key");
      // const err = new Error(`GPT client error, check your API key`);
      // err.status = 500;
      // throw err;
    }

  }
}

module.exports = generateStory;