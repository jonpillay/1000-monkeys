const StoryBook = require('../database/models/storyBookModel')

const FetchStoriesController = {

  GetStoriesByGenre: async (req, res) => {

    console.log(req.body)

    const requestGenre = req.body;

    try {

      console.log("This is from line 13 fetchController", {requestGenre})

      const bookList = await StoryBook.find(requestGenre).exec()

      console.log(bookList)

      res.status(200).json({ filteredList: bookList })
    } catch (error) {
      
      res.status(400).json({error: error.message })
    }
  },

  GetStoriesByUser: async (req, res) => {

    console.log(req.body)

    const requestUser = req.body;

    try {

      console.log({requestUser})

      const bookList = await StoryBook.find(requestUser).exec()

      console.log(bookList)

      res.status(200).json({ filteredList: bookList })
    } catch (error) {
      
      res.status(400).json({error: error.message })
    }
  },

}

module.exports = FetchStoriesController
