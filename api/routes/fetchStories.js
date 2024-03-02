const express = require("express");
const router = express.Router();
const FetchStoriesController = require("../controllers/fetchStoriesController");

const requireAuth = require('../middleware/requireAuth');

router.post("/genre", FetchStoriesController.GetStoriesByGenre);

router.post("/user", FetchStoriesController.GetStoriesByUser);

router.post("/ID", requireAuth, FetchStoriesController.FetchStoryByID);

module.exports = router;