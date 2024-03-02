const express = require("express");
const router = express.Router();
const FetchStoriesController = require("../controllers/fetchStoriesController");

router.post("/genre", FetchStoriesController.GetStoriesByGenre);

router.post("/user", FetchStoriesController.GetStoriesByUser);

router.post("/ID", FetchStoriesController.FetchStoryByID);

module.exports = router;
