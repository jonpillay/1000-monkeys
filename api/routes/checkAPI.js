const express = require("express");
const router = express.Router();
const CheckAPIController = require("../controllers/checkAPIController");

router.post("/sanitiseinput", CheckAPIController.SanitiseFormInput);
router.post("/checkegg", CheckAPIController.CheckEggInput);

module.exports = router;