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
  title: {
    type: String,
  },
  AIEngine: {
    type: String,
  },
  author: {
    type: String,
  }
})

// static methods

storyBookSchema.statics.saveStory = async function (user_id, chapterImages, chapterTexts, genre, character, artstyle, GPTChatHistory, AIEngineVer, author) {

  // needs error handling

  console.log(genre)

  // const chapterTexts = storyPages['textHistory'] // this is already a list
  // const chapterImages = storyPages['imageHistory'] // this is already a list

  const story = await this.create({ user_id: user_id, chapterText: chapterTexts, chapterImageURLs: chapterImages, genre: genre, character: character, artstyle: artstyle, GPTChatHistory: GPTChatHistory, AIEngine: AIEngineVer, author: author })

  storyBookSchema.index({ genre: genre })

  return story
}

storyBookSchema.statics.updateStory = async function (story_id, updatedImages, updatedTexts, GPTChatHistory) {

  console.log("This is the updated image list that gets sent to update " + (typeof updatedImages))
  console.log("This is the updated text list that gets sent to update " + (typeof updatedTexts))

  // needs error handling

  // const storyPages = JSON.parse(localStoryPages)

  // const updatedTexts = storyPages['textHistory'] // this is already a list
  // const updatedImages = storyPages['imageHistory'] // this is already a list

  await this.updateOne( { _id: story_id },
    {
      $set: {
        chapterText: updatedTexts,
        chapterImageURLs: updatedImages,
        GPTChatHistory: GPTChatHistory,
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

module.exports = mongoose.model('storyBook', storyBookSchema)