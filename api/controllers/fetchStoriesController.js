const StoryBook = require('../database/models/storyBookModel')

const FetchStoriesController = {

  GetStoriesByGenre: async (req, res) => {

    console.log(req.body)

    const requestGenre = req.body;

    try {

      console.log({requestGenre})

      const bookList = await StoryBook.find(requestGenre).exec()

      console.log(bookList)

      res.status(200).json({ filteredList: bookList })
    } catch (error) {
      
      res.status(400).json({error: error.message })
    }
  },

}

module.exports = FetchStoriesController
