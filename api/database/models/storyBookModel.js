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
    type: Object,
    default: {}
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
  publishedOn: {
    type: Date,
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

storyBookSchema.statics.updateStory = async function (story_id, updatedImages, updatedTexts, GPTChatHistory, SDPromptHistory, AIEngineVer) {

  await this.updateOne( { _id: story_id },
    {
      $set: {
        chapterText: updatedTexts,
        chapterImageURLs: updatedImages,
        GPTChatHistory: GPTChatHistory,
        SDPromptHistory: SDPromptHistory,
        AIEngine: AIEngineVer
      }
    }
  )
}

storyBookSchema.statics.submitRating = async function (story_id, userID, rating) {

  // const newRating = {}

  // newRating[userID] = rating

  // update the rating array, but return the original document so that the new average can be worked out
  // incrementally, without having to scan the entire array again
  const ratedStoryBook = await this.findOneAndUpdate(
    { _id: story_id },
    { $set: { [`ratings.${userID}`]: rating } },
    { new: true }
  )

  const ratings = ratedStoryBook.ratings
  const ratingsAverage = ratedStoryBook.ratingsAverage

  if (Object.keys(ratings).length == 1) {

    const initAverageRatings = []
    initAverageRatings.push(rating)
    initAverageRatings.push(1)

    const updatedStorybook = await this.findOneAndUpdate(
      { _id: story_id },
      { $set: { ratingsAverage: initAverageRatings } },
      { new: true }
    )

    return updatedStorybook

  } else {
    const count = Object.keys(ratedStoryBook.ratings).length

    const newAverageRating = (ratingsAverage[0] * (count-1) + rating) / count

    const newAverageRatingPair = []
    newAverageRatingPair.push(newAverageRating)
    newAverageRatingPair.push(count)


    try {
      const updatedStorybook = await this.findOneAndUpdate(
        { _id: story_id },
        { $set: { ratingsAverage: newAverageRatingPair } },
        { new: true }
      )
  

      return updatedStorybook

    } catch(error) {
      console.log(error)
    }
  }
}

storyBookSchema.statics.publishStory = async function (story_id, title) {

  await this.updateOne( { _id: story_id },
    {
      $set: {
        title: title,
        published: true,
        publishedOn: Date.now()
      }
    }
  )
}

module.exports = mongoose.model('storyBook', storyBookSchema)