import retrieveAllDropdowns from '../prompts/prompts'

const PopulateController = {
  Index: (req, res) => {
    try {
      res.status(200).json(retrieveAllDropdowns());
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

module.exports = PopulateController;
