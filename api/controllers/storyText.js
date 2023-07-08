import generateStory from "../clients/GPTclient"
import GPT_prompt_gen from "../prompts/GPTPromptGen"

const TextController = {
  Index: async (req, res) => {
    try {
      const prompts = GPT_prompt_gen(req.body)
      const story = await generateStory(prompts)
      res.status(200).json({ storyText: story });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = TextController;
