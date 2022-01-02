const express = require('express')
const Bus = require('../models/BusInfo.js')
const router = express.Router()

// console.log()

router.get('/', async (req, res) => {
  // const data = await Bus.find()

  res.send('hello')
})

module.exports = router
