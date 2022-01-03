const Locations = require('../models/locations')

module.exports.getLocations = async (req, res) => {
  try {
    filter = {}
    const location_response = await Locations.find(filter)
    res.status(200).json({ locations: location_response })
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'internal error while fetching busses' })
  }
}

module.exports.addLocation = async (req, res) => {
  try {
    console.log(req.body.add)
    if (req.body.add) {
      const data = await Locations.create({ locations: req.body.add })
      res.status(201).json({ data: data })
    }
  } catch (err) {
    console.log(err)
    // res.status(400).json({ msg: 'error registering bus' })
  }
}
