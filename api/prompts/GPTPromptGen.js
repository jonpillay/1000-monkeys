function GPT_prompt_gen(starter_prompts, inputs_dict) {

  const promptResults = JSON.parse(JSON.stringify(starter_prompts)) 

  for (let key in inputs_dict) {
    if (key == 'name') {
      promptResults.push({
        role: "system",
        content: `My name is ${inputs_dict[key]} I want you to make me the main character in this story`
      })
    } else if (key == 'character') {
      promptResults.push({
        role: "system",
        content: `I want the famous ${inputs_dict[key]} to be the main character in this story`
      })
    } else if (key == 'genre') {
      promptResults.push({
        role: "system",
        content: `I want the genre of this story to be ${inputs_dict[key]}`
      }) 
    } else if (key == 'author') {
      promptResults.push({
        role: "system",
        content: `I want you to write this story in the style of ${inputs_dict[key]}`
      })
    }
  }
  return promptResults
}

export default GPT_prompt_gen