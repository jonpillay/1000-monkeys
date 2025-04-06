
const DSDescriptionGen = require("../clients/DS_description_gen")

const generateImage = require("../clients/DSclient")

const DCPromptDresser = require("../promptGeneration/DCPromptDresser")
const genPromptTags = require("../promptGeneration/DSPromptTagger")
const genNegativePromptString = require('../promptGeneration/genNegativePromptString')

const creditController = require('./creditsController')

const jwt = require('jsonwebtoken')

const genCreditJWT = (token_id, token_amount) => {
  return jwt.sign({token_id, token_amount}, process.env.JWT_SECRETKEY, {expiresIn: '10m'})
}

const ImagesController = {
  RefreshImage: async (req, res) => {

    try {
      let user_choices = req.body["userChoices"]

      let story_text = req.body["chapterText"]

      const DS_descpription = await DSDescriptionGen(story_text, user_choices["genre"], user_choices["character"]) // needs 'system_prompts, chapter, genre, main_character' story text here needs to be only the content, not the full JSON object

      const dressed_prompt = DCPromptDresser(DS_descpription, user_choices)

      const tagsObject = await genPromptTags(user_choices)

      const finalSDPrompt = dressed_prompt.concat(" " + tagsObject['positiveTagString']).concat(", (artstation)")

      const negativePromptString = genNegativePromptString(tagsObject['negativeTagString'])

      const story_image = await generateImage(finalSDPrompt, negativePromptString)

      const creditJWT = genCreditJWT(req.user._id, -2)
      const credits_update = await creditController.AdjustCredits(req.user._id, -2, creditJWT)

      res.status(200).json({ page_image: story_image, SD_prompt: finalSDPrompt, credits_update: credits_update.credits });
    } catch (error) {
      console.log("error from the images controller")
      console.log(error)
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = ImagesController;