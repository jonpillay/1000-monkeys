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
    type: Array,
    default: []
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
  },
  ratingsAverage: {
    type: Array,
    default: []
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

  // update the rating array, but return the original document so that the new average can be worked out
  // incrementally, without having to scan the entire array again
  const ratedStoryBook = await this.findOneAndUpdate(
    { _id: story_id },
    { $push : { ratings: newRating } },
  )

  const ratingsAverage = ratedStoryBook.ratingsAverage

  if (ratingsAverage.length == 0) {

    const initAverageRatings = []
    initAverageRatings.push(rating)
    initAverageRatings.push(1)

    const updatedStorybook = await this.findOneAndUpdate(
      { _id: story_id },
      { $set: { ratingsAverage: initAverageRatings } }
    )
    return updatedStorybook

  } else {
    const count = ratedStoryBook.ratings.length
    const newAverageRating = ((ratingsAverage[0] * count) + rating) / (count+1)

    const newAverageRatingPair = []
    newAverageRatingPair.push(newAverageRating)
    newAverageRatingPair.push(ratedStoryBook.ratings.length)

    const updatedStorybook = await this.findOneAndUpdate(
      { _id: story_id },
      { $set: { ratingsAverage: newAverageRatingPair } },
      { new: true }
    )

    return updatedStorybook
    }
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