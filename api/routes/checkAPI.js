const express = require("express");
const router = express.Router();
const CheckAPIController = require("../controllers/checkAPIController");

router.post("/checkinput", CheckAPIController.CheckFormInput);

module.exports = router;