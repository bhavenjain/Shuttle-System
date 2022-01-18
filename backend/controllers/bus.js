const { setMaxListeners } = require('../models/BusInfo')
const Bus = require('../models/BusInfo')

module.exports.getBuses = async (req, res) => {
  try {
    filter = {}
    const bus_response = await Bus.find(filter)
    res.status(200).json({ data: bus_response })
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'internal error while fetching busses' })
  }
}

module.exports.addBus = async (req, res) => {
  try {
    console.log(req.body)
    const data = await Bus.create(req.body)
    res.status(201).json({ data: data })
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'error registering bus' })
  }
}

module.exports.reserveSeat = async (req, res) => {
  try {
    const filter = { _id: req.body.selectedBus._id }
    // console.log(req.body);
    let seat = await Bus.findOne(filter)
    res.status(200).json({ data: seat })
    seat.remaining = seat.remaining - 1
    await seat.save()
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'error reserving a seat' })
  }
}
