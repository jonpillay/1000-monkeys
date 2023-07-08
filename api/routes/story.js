import express from "express";
router = express.Router();

const TextController = require("../controllers/storyText");

router.post("/", TextController.Index);

module.exports = router;
