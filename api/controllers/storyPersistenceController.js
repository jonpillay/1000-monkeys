const StoryBook = require('../database/models/storyBookModel')

const StoryPersistenceController = {
  SaveStory: async (req, res) => {

    const {chapterImages, chapterTexts, genre, character, artstyle, GPTChatHistory} = req.body

    const user_id = req.user._id

    console.log("How save story sees the req objects")
    console.log(user_id)
    console.log(chapterImages)
    console.log(chapterTexts)

    try {

      const story = await StoryBook.saveStory(user_id, chapterImages, chapterTexts, genre, character, artstyle, GPTChatHistory)
      console.log("we do get here")
      res.status(200).json({ message: "Story saved", story_id: story._id  })
    } catch (error) {
      console.log("We failing here")
      res.status(400).json({error: error.message })
    }
  },

  UpdateStory: async (req, res) => {

    const {story_id, chapterImages, chapterTexts} = req.body

    console.log("How update story sees the req objects")
    console.log(user_id)
    console.log(chapterImages)
    console.log(chapterTexts)

    const storyBook = await StoryBook.findById(story_id)

    const user_id = req.user._id

    // console.log("this is the user_id attatched to storyBook obj ", storyBook.user_id)
    // console.log("this is the user_id attatched to request ", user_id)


    if (storyBook.user_id != user_id) {
      res.status(400).json({error: "Must be story creator to update" })
    }

    try {

      const story = await StoryBook.updateStory(storyBook._id, chapterImages, chapterTexts)

      res.status(200).json({ error: "Story saved"})
    } catch (error) {

      res.status(400).json({error: error.message })
    }
  },

}

module.exports = StoryPersistenceController
