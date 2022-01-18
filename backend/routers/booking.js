const express = require('express')
const router = express.Router()
const Booking = require('../controllers/booking')

router.post('/api/addbooking', Booking.addBooking)
router.post('/api/deletebooking', Booking.deleteBooking)

module.exports = router
