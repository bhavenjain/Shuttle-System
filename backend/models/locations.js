const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locations = new Schema({
  locations: [
    {
      type: String,
      required: true
    }
  ]
})

const Locations = mongoose.model('LOCATIONS', locations)
module.exports = Locations
