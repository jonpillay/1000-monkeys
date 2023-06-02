const generateStory = require("../clients/GPTclient");
const GPT_prompt_gen = require("../prompts/GPTPromptGen")

const StoryController = {
  Index: async (req, res) => {
    try {
      const prompts = GPT_prompt_gen(req.body)
      const story = generateStory(prompts)
      res.status(200).json({ storyText: story });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = StoryController;
