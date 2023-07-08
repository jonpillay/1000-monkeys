const GPT_prompt_gen = (user_choices, story_prompts) => {

  console.log("GPT Prompt gen fired")

  const GPT_starter_prompts = [
    {
      role: "system",
      content: "You are my story writing assistant. I am going to prompt you with simple outline of a chapter and you are going to make it an adventurous chapter for a book we are writing."
    },
    {
      role: "system",
      content: "The chapter should be between 30-50 words long."
    },
    {
      role: "system",
      content: "Begin with chapter 1. Each chapter should have a sequential chapter number and a title."
    },
    {
      role: "system",
      content: "Only return a single chapter everytime I prompt you"
    },
  ]

  const promptResults = JSON.parse(JSON.stringify(GPT_starter_prompts)) 

  for (let key in user_choices) {
    console.log("going through user choices")
    if (key == 'name') {
      promptResults.push({
        role: "system",
        content: `My name is ${user_choices[key]} I want you to make me the main character`
      })
    } else if (key == 'character') {
      promptResults.push({
        role: "system",
        content: `I want the famous ${user_choices[key]} to be the main character`
      })
    } else if (key == 'genre') {
      promptResults.push({
        role: "system",
        content: `I want the genre to be ${user_choices[key]}`
      }) 
    } else if (key == 'author') {
      promptResults.push({
        role: "system",
        content: `I want you to write in the style of ${user_choices[key]}`
      })
    } else if (key == 'location') {
      promptResults.push({
        role: "system",
        content: `I want the location to be ${user_choices[key]}`
      })
    } else if (key == 'prompt') {
      promptResults.push({
        role: "user",
        content: `${user_choices[key]}`
      })
    }
  }

  promptResults.push(story_prompts)

  console.log(promptResults)

  return promptResults
}

module.exports = GPT_prompt_gen