const StoryBook = require('../database/models/storyBookModel')

const FetchStoriesController = {

  GetStoriesByGenre: async (req, res) => {

    try {
      const { genre } = req.body

      const bookList = StoryBook.find({genre: {genre}}).exec().lean()

      console.log(bookList)

      req.status(200).json({ filteredList: bookList })
    } catch (error) {
      
      res.status(400).json({error: error.message })
    }
  },

}

module.exports = FetchStoriesController
