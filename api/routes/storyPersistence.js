// Need to decide what to call the save story controller, SaveStoryController doesn't cover ratings updates (althugh saying this SOC would probably call for a
// seperate ratings model.... maybe)

const express = require("express");
const router = express.Router();
const StoryPersistenceController = require("../controllers/storyPersistenceController");

const requireAuth = require('../middleware/requireAuth');

router.post("/story", requireAuth, StoryPersistenceController.SaveStory);

module.exports = router;
