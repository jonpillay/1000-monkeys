import express from "express";
router = express.Router();

const ImagesController = require("../controllers/images");

router.post("/", ImagesController.Index);

module.exports = router;