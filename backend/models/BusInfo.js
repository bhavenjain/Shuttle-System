const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bus = new Schema({
  from: {
    type: String,
    required: false
  },
  to: {
    type: String,
    required: false
  },
  time: {
    type: String,
    required: false
  },
  busNo: {
    type: String,
    required: false
  },
  total: {
    type: Number,
    required: false
  },
  remaining: {
    type: Number,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  fare: {
    type: Number,
    required: false
  }
})

const Bus = mongoose.model('BUS', bus)
module.exports = Bus
