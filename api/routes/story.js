const express = require("express");
const router = express.Router();

const StoryController = require("../controllers/storyText");

router.post("/", StoryController.Index);

module.exports = router;
