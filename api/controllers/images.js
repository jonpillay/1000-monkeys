const client = require("../clients/sdclient");
const { matchSelectionCriteria } = require('../prompts/prompts')

const ImagesController = {
  Index: async (req, res) => {
    try {
      const prompts = matchSelectionCriteria(req.body.sdChoices)    
      const result = await client.generateImage(prompts.positivePrompts, prompts.negativePrompts);
      res.status(200).json({ imgUrl: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = ImagesController;
