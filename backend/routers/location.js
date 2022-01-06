const express = require('express');
const router = express.Router();
const Location = require('../controllers/location');

router.get('/api/getLocations', Location.getLocations);
router.post('/api/addLocation', Location.addLocation);

module.exports = router;
