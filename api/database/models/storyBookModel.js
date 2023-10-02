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
})

// static methods

storyBookSchema.statics.saveStory = async function (user_id, localStoryPages, tag) {

  // needs error handling

  console.log(tag)

  const storyPages = JSON.parse(localStoryPages)

  const chapterTexts = storyPages['textHistory'] // this is already a list
  const chapterImages = storyPages['imageHistory'] // this is already a list

  await this.create({ user_id: user_id, chapterText: chapterTexts, chapterImageURLs: chapterImages, genre: tag })

  // storyBookSchema.index({ genre: tag })
}
module.exports = mongoose.model('storyBookSchema', storyBookSchema)