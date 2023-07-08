const generateStory = require("../clients/GPTclient");
const GPTPromptGen = require("../prompts/GPTPromptGen")

const DSDescriptionGen = require("../clients/DS_description_gen")

const generateImage = require("../clients/DSclient")
const DSPromptGen = require('../prompts/DSPromptGen')

const StoryController = {
  CreateChapter: async (req, res) => {
    try {

      let story_prompts = JSON.parse(req.body["GPTPromptHistory"])

      let user_choices = JSON.parse(req.body["userchoices"])
      
      console.log("Controller fired")
      console.log(req.body)

      const GPT_prompts = GPTPromptGen(user_choices, story_prompts) // Prompt gen here needs the prompt history in proper format as well as the user choices
      
      const story_text = await generateStory(GPT_prompts)

      console.log(story_text)

      const DS_descpription = await DSDescriptionGen(story_text, user_choices["genre"], user_choices["character"]) // needs 'system_prompts, chapter, genre, main_character' story text here needs to be only the content, not the full JSON object
      
      console.log(DS_descpription)

      const story_image = await generateImage(DS_descpription)

      console.log(story_image)

    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}

module.exports = StoryController