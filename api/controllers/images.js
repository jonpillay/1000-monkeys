const client = require("../clients/sdclient");

const ImagesController = {
  Index: async (req, res) => {
    try {
      const result = await client.generateImage(req.body.positivePrompt, req.body.negativePrompt);
      res.status(200).json({ imgUrl: result });
    } catch (error) {
      const statusCode = error.status ? error.status : 500;
      res.status(statusCode).json({ message: error.message });
    }
  },
};

module.exports = ImagesController;
