import express from "express";
router = express.Router();

const PopulateController = require("../controllers/populate");

router.get("/", PopulateController.Index);

module.exports = router;