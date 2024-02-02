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
  }
})

// static methods

storyBookSchema.statics.saveStory = async function (user_id, localStoryPages, genre, character, artstyle, GPTChatHistory) {

  // needs error handling

  console.log(genre)

  const storyPages = JSON.parse(localStoryPages)

  console.log("This is", storyPages)

  const chapterTexts = storyPages['textHistory'] // this is already a list
  const chapterImages = storyPages['imageHistory'] // this is already a list

  const story = await this.create({ user_id: user_id, chapterText: chapterTexts, chapterImageURLs: chapterImages, genre: genre, character: character, artstyle: artstyle, GPTChatHistory: GPTChatHistory })

  storyBookSchema.index({ genre: genre })

  return story
}

storyBookSchema.statics.updateStory = async function (story_id, localStoryPages) {

  // needs error handling

  const storyPages = JSON.parse(localStoryPages)

  const updatedTexts = storyPages['textHistory'] // this is already a list
  const updatedImages = storyPages['imageHistory'] // this is already a list

  console.log(updatedImages)

  await this.updateOne( { _id: story_id },
    {
      $set: {
        chapterTexts: updatedTexts,
        chapterImageURLs: updatedImages
      }
    }
  )
}

module.exports = mongoose.model('storyBook', storyBookSchema)