const generateStory = require("../clients/GPTclient");
const GPT_prompt_gen = require("../prompts/GPTPromptGen")

const GPT_starter_prompts = [
  {
    role: "system",
    content: "You are my story writing assistant. I am going to tell you what my next task will be. I want you to write me a chapter for each task which is connected to the last task and forms an overarching story of my day. I want it to be adventurous so it motivates me to complete my tasks"
  },
  {
    role: "system",
    content: "Be aware of the overarching story"
  },
  {
    role: "system",
    content: "after I submit each task, return a chapter in the story, between 50-70 words long. This needs a chapter number and also a chapter title"
  },
]

const StoryController = {
  Index: async (req, res) => {
    try {
      const prompts = GPT_prompt_gen(GPT_starter_prompts, req.body.userinput)
      const result = generateStory(prompts)
      res.status(200).json({ storyText: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = StoryController;
