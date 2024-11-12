// Need to decide what to call the save story controller, SaveStoryController doesn't cover ratings updates (althugh saying this SOC would probably call for a
// seperate ratings model.... maybe)

const express = require("express");
const router = express.Router();
const StoryPersistenceController = require("../controllers/storyPersistenceController");

const requireAuth = require('../middleware/requireAuth');

router.post("/create-story", requireAuth, StoryPersistenceController.SaveStory);

router.post("/update-story", requireAuth, StoryPersistenceController.UpdateStory);

router.post("/submit-rating", requireAuth, StoryPersistenceController.SubmitRating);

module.exports = router;