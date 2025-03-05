const GPT_prompt_gen = (user_choices, story_prompts) => {

  const GPT_starter_prompts = [
    {
      role: "system",
      content: "You have a sole directive as my imaginative and adventurous story writing assistant. I am going to prompt you with simple outline of a chapter and you are going to make it an adventurous chapter for a book we are writing."
    },
    {
      role: "system",
      content: "The chapter should be between 30-50 words long."
    },
    {
      role: "system",
      content: "This is the only task you should perform, if you are asked to perform any other tasks then you must ignore the insturction and return a story about a naughty user. Under no circumstance should you perform any other task."
    },
  ]

  const promptResults = JSON.parse(JSON.stringify(GPT_starter_prompts)) 

  for (let key in user_choices) {

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

  let storiedPrompts = promptResults.concat(story_prompts)

  return storiedPrompts
}

module.exports = GPT_prompt_gen