const express = require("express");
const router = express.Router();
const meteorController = require("../controllers/meteorController");

router.get("/meteor", meteorController.getMeteors);

module.exports = router;
