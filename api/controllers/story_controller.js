import generateStory from "../clients/GPTclient";
import GPTPromptGen from "../prompts/GPTPromptGen";

import DSDescriptionGen from "../clients/DS_description_gen";

import generateImage from "../clients/DSclient"
import  DSPromptGen from '../prompts/DSPromptGen'

const StoryController = {
  CreateChapter: async (req, res) => {
    try {
      console.log(req.body)
      const GPT_prompts = GPTPromptGen(req.body) // Prompt gen here needs the prompt history in proper format as well as the user choices
      const story_text = await generateStory(GPT_prompts)
      const DS_descpription = await DSDescriptionGen(story_text) // needs 'system_prompts, chapter, genre, main_character' story text here needs to be only the content, not the full JSON object
      const story_image = await generateImage(DS_descpription)
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }
}