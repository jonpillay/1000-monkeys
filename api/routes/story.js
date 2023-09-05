const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/story_controller");

const requireAuth = require('../middleware/requireAuth');
const requireCredits = require("../middleware/requireCredits");

router.post("/", requireAuth, requireCredits, StoryController.CreateChapter);

module.exports = router;
