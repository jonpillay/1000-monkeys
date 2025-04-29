const StoryBook = require('../database/models/storyBookModel')
const SysInfo = require('../database/models/sysInfoModel')
const {roundStoryBookVoteAvg, checkTopThirteenAdmission} = require('../helpers/mathFuncts')

const StoryPersistenceController = {
  SaveStory: async (req, res) => {

    const {chapterImages, chapterTexts, genre, character, artstyle, GPTChatHistory, SDPromptHistory, AIEngineVer, author} = req.body

    const user_id = req.user._id

    try {

      const story = await StoryBook.saveStory(user_id, chapterImages, chapterTexts, genre, character, artstyle, GPTChatHistory, SDPromptHistory, AIEngineVer, author)

      res.status(200).json({ message: "Story saved", story_id: story._id  })
    } catch (error) {
      res.status(400).json({error: error.message })
    }
  },

  UpdateStory: async (req, res) => {

    const {story_id, chapterImages, chapterTexts, GPTChatHistory, SDPromptHistory, AIEngineVer} = req.body

    const storyBook = await StoryBook.findById(story_id)

    const user_id = req.user._id

    if (storyBook.user_id != user_id) {
      res.status(400).json({error: "Must be story creator to update" })
    }

    try {

      const story = await StoryBook.updateStory(storyBook._id, chapterImages, chapterTexts, GPTChatHistory, SDPromptHistory, AIEngineVer)

      res.status(200).json({ error: "Story saved"})
    } catch (error) {

      res.status(400).json({error: error.message })
    }
  },

  SubmitRating: async (req, res) => {

    const { story_id, rating } = req.body

    const user_id = req.user._id

    const storyBook = await StoryBook.findById(story_id)

    if (storyBook.user_id == user_id) {
      res.status(400).json({error: "Cannot Rate Own Story" })
    }

    try {

      const updatedStorybook = await StoryBook.submitRating(storyBook._id, user_id, rating)

      const sysInfo = await SysInfo.findOne({})

      console.log(sysInfo)

      roundStoryBookVoteAvg(updatedStorybook)

      // check if there are more than 3 user ratings, if so, check if the candidate storybook should be inserted into the top ten
      if (updatedStorybook.ratingsAverage[1] >= 3) {
        // sysInfo top thirteen array and rating need to be passed into a function, allowing for cleaner control of flow
        const topAdmissionCheck = checkTopThirteenAdmission(sysInfo.topThirteen, updatedStorybook)

        console.log(topAdmissionCheck)

        if (topAdmissionCheck != false) {
          
          await SysInfo.setTopThirteen(topAdmissionCheck)

        }

      }

      res.status(200).json({ updatedRatingsAverage: updatedStorybook.ratingsAverage })
    } catch (error) {
      console.log(error)
      res.status(400).json({error: error.message })
    }

  },

  PublishStory: async (req, res) => {

    const { story_id, title } = req.body

    const user_id = req.user._id

    const storyBook = await StoryBook.findById(story_id)

    if (storyBook.user_id != user_id) {
      res.status(400).json({error: "Only Author Can Publish" })
    }

    try {

      await StoryBook.publishStory(story_id, title)

      res.status(200).json({ message: "Published"})
    } catch (error) {

      res.status(400).json({error: error.message })
    }
  }
}

module.exports = StoryPersistenceController
