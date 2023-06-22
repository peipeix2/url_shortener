const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema ({
  original_url: {
    type: String,
    required: true
  },
  shortened_url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)