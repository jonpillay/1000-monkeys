const client = require("../clients/sdclient");
const { matchSelectionCriteria } = require('../prompts/prompts')
const DSGenerateImage = require("../clients/DSclient")
const fs = require('fs');
const DSPromptGen = require('../prompts/DSPromptGen')
const imgBBUploader = require('../helpers/imgBBUploader')


const ImagesController = {
  Index: async (req, res) => {
    try {
      const prompts = DSPromptGen(req.body)
      console.log(prompts)  
      const result = await DSGenerateImage(prompts.prompts, prompts.art_style);
      res.status(200).json({ imgUrl: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = ImagesController;
