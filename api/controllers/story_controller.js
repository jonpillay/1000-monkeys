const generateStory = require("../clients/GPTclient");
const GPTPromptGen = require("../promptGeneration/GPTPromptGen")

const DSDescriptionGen = require("../clients/DS_description_gen")

const generateImage = require("../clients/DSclient")
const DSPromptGen = require('../promptGeneration/DSPromptGen')

const DCPromptDresser = require('../promptGeneration/DCPromptDresser')
const genPromptTags = require('../promptGeneration/DSPromptTagger')
const genNegativePromptString = require('../promptGeneration/genNegativePromptString')

const creditController = require('./creditsController')

const jwt = require('jsonwebtoken')

const genCreditJWT = (token_id, token_amount) => {
  return jwt.sign({token_id, token_amount}, process.env.JWT_SECRETKEY, {expiresIn: '10m'})
}

const StoryController = {
  CreateChapter: async (req, res) => {
    try {

      const request = req.body

      const story_prompts = request["GPTPromptHistory"]
      const user_choices = request["userchoices"]

      const GPT_prompts = GPTPromptGen(user_choices, story_prompts) // Prompt gen here needs the prompt history in proper format as well as the user choices
      
      const story_text = await generateStory(GPT_prompts)

      const DS_descpription = await DSDescriptionGen(story_text, user_choices["genre"], user_choices["character"]) // needs 'system_prompts, chapter, genre, main_character' story text here needs to be only the content, not the full JSON object

      const dressed_prompt = DCPromptDresser(DS_descpription, user_choices)

      const tagsObject = genPromptTags(user_choices)

      const finalSDPrompt = dressed_prompt.concat(" " + tagsObject['positiveTagString'])

      const negativePromptString = genNegativePromptString(tagsObject['negativeTagString'])

      const story_image = await generateImage(finalSDPrompt, negativePromptString)
      
      const creditJWT = genCreditJWT(req.user._id, -3)
      const credits_update = await creditController.AdjustCredits(req.user._id, -3, creditJWT)

      res.status(200).json({ page_text: story_text, page_image: story_image, credits_update: credits_update.credits, SDPrompt: finalSDPrompt });

    } catch (error) {
      console.error("Create Chapter Error", error)
      return res.status(error.status || 500).json({
        message: error.message || "Server Error, Try Again"
      });
    }
  }
}

module.exports = StoryController