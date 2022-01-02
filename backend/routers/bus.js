const express = require("express");
const router = express.Router();
const Bus = require("../controllers/bus");

router.get("/api/bus", Bus.getBuses);

module.exports = router;