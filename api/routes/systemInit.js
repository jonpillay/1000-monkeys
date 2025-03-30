const express = require("express");
const router = express.Router();
const SysInitController = require("../controllers/sysInitController");
const rateLimit = require("express-rate-limit");
const requestIp = require('request-ip');

router.use(requestIp.mw());

const sysInitLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many requests, please try again later.",
    keyGenerator: (req) => req.clientIp || req.ip,
  });

router.post("/", sysInitLimiter, SysInitController.InitialiseSystem);

module.exports = router;