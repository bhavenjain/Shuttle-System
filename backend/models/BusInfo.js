const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bus = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  busNo: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  remaining: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    required: true
  }
})

const Bus = mongoose.model('BUS', bus)
module.exports = Bus