const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/story_controller");

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.post("/", StoryController.CreateChapter);

module.exports = router;
