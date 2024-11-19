const express = require("express");
const router = express.Router();
const StoryPersistenceController = require("../controllers/storyPersistenceController");

const requireAuth = require('../middleware/requireAuth');

router.post("/create-story", requireAuth, StoryPersistenceController.SaveStory);

router.post("/update-story", requireAuth, StoryPersistenceController.UpdateStory);

router.post("/submit-rating", requireAuth, StoryPersistenceController.SubmitRating);

router.post("/publish-story", requireAuth, StoryPersistenceController.PublishStory);

module.exports = router;