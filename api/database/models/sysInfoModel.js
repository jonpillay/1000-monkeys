const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sysInfoSchema = new Schema({

  AiEngineVer: {
    type: Number
  },
  topTen: {
    type: Array,
    default: []
  }

})

module.exports = mongoose.model('sysInfo', sysInfoSchema)