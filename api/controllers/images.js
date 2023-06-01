const client = require("../clients/sdclient");

const ImagesController = {
  Index: async (req, res) => {
    try {
      const result = await client.generateImage(req.body.positivePrompt, req.body.negativePrompt);
      res.status(200).json({ imgUrl: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = ImagesController;
