const express = require("express");
const router = express.Router();
const ImagesController = require("../controllers/images");

const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.post("/", ImagesController.RefreshImage);

module.exports = router;