// Need to decide what to call the save story controller, SaveStoryController doesn't cover ratings updates (althugh saying this SOC would probably call for a
// seperate ratings model.... maybe)

const express = require("express");
const router = express.Router();
const SaveStoryController = require("../controllers/story_persitence_controller");

const requireAuth = require('../middleware/requireAuth');

router.post("/save", requireAuth, SaveStoryController.Save);

module.exports = router;
