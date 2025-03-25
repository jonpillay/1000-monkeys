const express = require("express");
const router = express.Router();
const SysInitController = require("../controllers/sysInitController");

router.post("/", SysInitController.InitialiseSystem);

module.exports = router;