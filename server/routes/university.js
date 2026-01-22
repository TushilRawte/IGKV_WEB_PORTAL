const express = require("express");
const router = express.Router();
const universityController = require("../controllers/universityController");

router.route("/").post(universityController.getOverviewUniversity);
// router.route("/count").post(universityController.getVisitorCount);


module.exports = router;