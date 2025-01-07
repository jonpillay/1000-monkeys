const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/story_controller");

const requireAuth = require('../middleware/requireAuth');
const requireCredits = require("../middleware/requireCredits");
const requireCleanInput = require("../middleware/requireCleanInput")

router.post("/", requireAuth, requireCleanInput, requireCredits);

module.exports = router;
