const mongoose = require('mongoose')

const Schema = mongoose.Schema

const storyBookSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  chapterText: {
    type: [],
  },
  chapterImageURLs: {
    type: [],
  },
  ratings: {
    type: [],
  },
  genre: {
    type: String,
  },
  character: {
    type: String,
  },
  artstyle: {
    type: String,
  },
  GPTChatHistory: {
    type: [],
  },
  SDPromptHistory: {
    type: [],
  },
  title: {
    type: String,
  },
  AIEngine: {
    type: String,
  },
  author: {
    type: String,
  },
  published: {
    type: Boolean,
    default: false
  }
})

storyBookSchema.index({ published: -1, genre: 1 })

// static methods

storyBookSchema.statics.saveStory = async function (user_id, chapterImages, chapterTexts, genre, character, artstyle, GPTChatHistory, SDPromptHistory, AIEngineVer, author) {

  // needs error handling

  const story = await this.create({ user_id: user_id, chapterText: chapterTexts, chapterImageURLs: chapterImages, genre: genre, character: character, artstyle: artstyle, GPTChatHistory: GPTChatHistory, SDPromptHistory: SDPromptHistory, AIEngine: AIEngineVer, author: author })

  return story
}

storyBookSchema.statics.updateStory = async function (story_id, updatedImages, updatedTexts, GPTChatHistory, SDPromptHistory) {

  await this.updateOne( { _id: story_id },
    {
      $set: {
        chapterText: updatedTexts,
        chapterImageURLs: updatedImages,
        GPTChatHistory: GPTChatHistory,
        SDPromptHistory: SDPromptHistory
      }
    }
  )
}

storyBookSchema.statics.submitRating = async function (story_id, userID, rating) {

  const newRating = {}

  newRating[userID] = rating

  await this.updateOne( { _id: story_id },
    { $push : {ratings: newRating } }
  )
}

storyBookSchema.statics.publishStory = async function (story_id, title) {

  await this.updateOne( { _id: story_id },
    {
      $set: {
        title: title,
        published: true
      }
    }
  )
}

module.exports = mongoose.model('storyBook', storyBookSchema)