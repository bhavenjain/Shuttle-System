const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bookingSchema = new Schema({
  passsengerName: { type: String, required: true },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  busId: {
    type: Schema.Types.ObjectId,
    ref: 'BUS',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  bookingDate: {
    type: String,
    required: true
  }
})

const Booking = mongoose.model('BOOKING', bookingSchema)
module.exports = Booking
