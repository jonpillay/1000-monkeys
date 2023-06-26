const client = require("../clients/sdclient");
const DSGenerateImage = require("../clients/DSclient")
const DSPromptGen = require('../prompts/DSPromptGen')


const ImagesController = {
  Index: async (req, res) => {
    try {
      const prompts = DSPromptGen(req.body)
      const result = await DSGenerateImage(prompts.prompts, prompts.art_style);
      res.status(200).json({ imgUrl: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = ImagesController;
