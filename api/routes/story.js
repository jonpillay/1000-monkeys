const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/story_controller");

const requireAuth = require('../middleware/requireAuth');
const requireCredits = require("../middleware/requireCredits");
const requireCleanInput = require("../middleware/requireCleanInput")

router.post("/create-chapter", requireAuth, requireCleanInput, requireCredits, StoryController.CreateChapter);

module.exports = router;
