const generateStory = require("../clients/GPTclient");
const GPTPromptGen = require("../prompts/GPTPromptGen")

const DSDescriptionGen = require("../clients/DS_description_gen")

const generateImage = require("../clients/DSclient")
const DSPromptGen = require('../prompts/DSPromptGen')

const StoryController = {
  CreateChapter: async (req, res) => {
    try {
      const GPT_prompts = GPTPromptGen(req.body) // Prompt gen here needs the prompt history in proper format as well as the user choices
      const story_text = await generateStory(GPT_prompts)
      const DS_descpription = await DSDescriptionGen(story_text) // needs 'system_prompts, chapter, genre, main_character' story text here needs to be only the content, not the full JSON object
      const story_image = await generateImage(DS_descpription)
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}