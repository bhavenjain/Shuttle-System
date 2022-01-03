const Locations = require('../models/locations')

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
