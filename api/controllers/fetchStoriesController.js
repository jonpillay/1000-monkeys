const StoryBook = require('../database/models/storyBookModel')
const {roundVoteAverageList} = require('../helpers/mathFuncts')

const FetchStoriesController = {

  GetStoriesByGenre: async (req, res) => {

    const requestGenre = req.body;

    try {

      const bookList = await StoryBook.find(requestGenre).exec()

      roundVoteAverageList(bookList)

      res.status(200).json({ filteredList: bookList })
    } catch (error) {
      
      res.status(400).json({error: error.message })
    }
  },

  GetStoriesByUser: async (req, res) => {

    const requestUser = req.body;

    try {

      const bookList = await StoryBook.find({user_id: requestUser}).exec()

      res.status(200).json({ filteredList: bookList })
    } catch (error) {
      res.status(400).json({error: error.message })
    }
  },

  FetchStoryByID: async (req, res) => {

    const requestStoryID = req.body.storyID

    const user_id = req.user._id

    try {
      const storyBook = await StoryBook.findById(requestStoryID)

      const author = storyBook.user_id

      if (author != user_id) {
        res.status(401).json({error: "Must be story owner."})
      } else {
        res.status(200).json({ resStoryBook: storyBook })
      }
    } catch (error) {
      res.status(400).json({error: error.message })
    }

  }  

}

module.exports = FetchStoriesController