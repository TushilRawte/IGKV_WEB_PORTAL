const express = require("express");
const router = express.Router();
const VarietyReleasedController = require("../controllers/varietyReleasedController");


router.route("/:id").post(VarietyReleasedController.getVarietyData);
router.route("/crop").get(VarietyReleasedController.getCropData);
router.route("/dash").get(VarietyReleasedController.getDasboard);


module.exports = router