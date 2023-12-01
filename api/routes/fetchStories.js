const express = require("express");
const router = express.Router();
const FetchStoriesController = require("../controllers/fetchStoriesController");

router.post("/genre", FetchStoriesController.GetStoriesByGenre);

module.exports = router;
