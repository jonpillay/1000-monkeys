const client = require("../clients/sdclient");

const ImagesController = {
  Index: async (req, res) => {
    let result;
    try {
      result = await client.generateImage("positive", "negative");
      res.status(200).json({ imgUrl: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = ImagesController;
