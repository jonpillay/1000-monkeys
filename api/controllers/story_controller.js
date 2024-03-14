const generateStory = require("../clients/GPTClientReborn");
const GPTPromptGen = require("../prompts/GPTPromptGen")

const DSDescriptionGen = require("../clients/DS_description_gen")

const generateImage = require("../clients/DSclient")
const DSPromptGen = require('../prompts/DSPromptGen')

const creditController = require('./creditsController')


const jwt = require('jsonwebtoken')

const genCreditJWT = (token_id, token_amount) => {
  return jwt.sign({token_id, token_amount}, process.env.JWT_SIGNATURE, {expiresIn: '10m'})
}

const StoryController = {
  CreateChapter: async (req, res) => {
    try {
      console.log("made it here")
      const creditJWT = genCreditJWT(req.user._id, -3)
      const credits_update = await creditController.AdjustCredits(req.user._id, -3, creditJWT)
      console.log("made it here cred check")
      console.log(req.body)
      console.log(typeof req.body)

      const request = req.body
      console.log("made it here prompt parse")
      console.log(request)
      const story_prompts = request["GPTPromptHistory"]
      console.log("made it here prompt parse")
      const user_choices = request["userchoices"]

      console.log("made it here2")

      const GPT_prompts = GPTPromptGen(user_choices, story_prompts) // Prompt gen here needs the prompt history in proper format as well as the user choices
      
      const story_text = await generateStory(GPT_prompts)

      console.log("made it here 3")

      const DS_descpription = await DSDescriptionGen(story_text, user_choices["genre"], user_choices["character"]) // needs 'system_prompts, chapter, genre, main_character' story text here needs to be only the content, not the full JSON object

      const story_image = await generateImage(DS_descpription)
      console.log("This is the user in the credits controller!", credits_update)

      console.log("Pure Credits ", credits_update.credits)

      res.status(200).json({  page_text: story_text, page_image: story_image, credits_update: credits_update.credits });

    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = StoryController