
const DSDescriptionGen = require("../clients/DS_description_gen")

const generateImage = require("../clients/DSclient")

const DCPromptDresser = require("../promptGeneration/DCPromptDresser")
const genPromptTags = require("../promptGeneration/DSPromptTagger")
const genNegativePromptString = require('../promptGeneration/genNegativePromptString')


const ImagesController = {
  RefreshImage: async (req, res) => {

    try {
      let user_choices = req.body["userChoices"]

      let story_text = req.body["chapterText"]

      const DS_descpription = await DSDescriptionGen(story_text, user_choices["genre"], user_choices["character"]) // needs 'system_prompts, chapter, genre, main_character' story text here needs to be only the content, not the full JSON object

      const dressed_prompt = DCPromptDresser(DS_descpription, user_choices)

      const tagsObject = genPromptTags(user_choices)

      const finalSDPrompt = dressed_prompt.concat(" " + tagsObject['positiveTagString']).concat(", (artstation)")

      const negativePromptString = genNegativePromptString(tagsObject['negativeTagString'])

      const story_image = await generateImage(finalSDPrompt, negativePromptString)

      res.status(200).json({ page_image: story_image, SD_prompt: finalSDPrompt });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = ImagesController;
