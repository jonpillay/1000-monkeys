const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sysInfoSchema = new Schema({

  AiEngineVer: {
    type: String
  },
  topThirteen: [{
    storybookId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'storyBook'
    },
    rating: {
      avg: { type: Number, required: true },
      votes: { type: Number, required: true }
    }
  }]
});

sysInfoSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    if (count > 0) {
      return next(new Error('There Can Only Be One System Info Document'))
    }
  }
  next()
})

sysInfoSchema.statics.setTopThirteen = async function (newTopThirteen) {

  await this.updateOne(
    {},
    { $set: { topThirteen: newTopThirteen }},
  )

}

module.exports = mongoose.model('sysInfo', sysInfoSchema)