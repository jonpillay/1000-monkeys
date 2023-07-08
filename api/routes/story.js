const express = require("express");
const router = express.Router();

const StoryController = require("../controllers/story_controller");

router.post("/", StoryController.CreateChapter);

module.exports = router;
