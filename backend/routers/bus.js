const express = require('express')
const router = express.Router()
const Bus = require('../controllers/bus')
const Location = require('../controllers/location')

router.get('/api/getbuses', Bus.getBuses)
router.post('/api/addbus', Bus.addBus)
router.get('/api/getLocations', Location.getLocations)
router.post('/api/addLocation', Location.addLocation)

module.exports = router
