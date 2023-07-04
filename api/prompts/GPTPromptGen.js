const GPT_prompt_gen = (inputs_dict) => {

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

  for (let key in inputs_dict) {
    if (key == 'name') {
      promptResults.push({
        role: "system",
        content: `My name is ${inputs_dict[key]} I want you to make me the main character`
      })
    } else if (key == 'character') {
      promptResults.push({
        role: "system",
        content: `I want the famous ${inputs_dict[key]} to be the main character`
      })
    } else if (key == 'genre') {
      promptResults.push({
        role: "system",
        content: `I want the genre to be ${inputs_dict[key]}`
      }) 
    } else if (key == 'author') {
      promptResults.push({
        role: "system",
        content: `I want you to write in the style of ${inputs_dict[key]}`
      })
    } else if (key == 'location') {
      promptResults.push({
        role: "system",
        content: `I want the location to be ${inputs_dict[key]}`
      })
    } else if (key == 'prompt') {
      promptResults.push({
        role: "user",
        content: `${inputs_dict[key]}`
      })
    } else if (key == 'messageHistory') {
      promptResults.unshift({
        role: "assistant",
        content: `${inputs_dict[key]}`
      })
    }
  }
  return promptResults
}

module.exports = GPT_prompt_gen