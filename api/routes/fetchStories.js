const express = require("express");
const router = express.Router();
const FetchStoriesController = require("../controllers/fetchStoriesController");

router.post("/genre", FetchStoriesController.GetStoryByGenre);

module.exports = router;
